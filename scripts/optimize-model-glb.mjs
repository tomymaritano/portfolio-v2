import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const inputPath = process.argv[2] ?? "public/3dmodel.glb";
const outputPath = process.argv[3] ?? "public/3dmodel-optimized.glb";

const CHUNK_TYPE_JSON = "JSON";
const CHUNK_TYPE_BIN = "BIN\0";

function parseGlb(buffer) {
  const magic = buffer.toString("utf8", 0, 4);
  const version = buffer.readUInt32LE(4);

  if (magic !== "glTF" || version !== 2) {
    throw new Error("Unsupported GLB format.");
  }

  let offset = 12;
  const jsonLength = buffer.readUInt32LE(offset);
  offset += 4;
  const jsonType = buffer.toString("utf8", offset, offset + 4);
  offset += 4;

  if (jsonType !== CHUNK_TYPE_JSON) {
    throw new Error("Missing JSON chunk.");
  }

  const jsonChunk = buffer.slice(offset, offset + jsonLength);
  offset += jsonLength;

  const binLength = buffer.readUInt32LE(offset);
  offset += 4;
  const binType = buffer.toString("utf8", offset, offset + 4);
  offset += 4;

  if (binType !== CHUNK_TYPE_BIN) {
    throw new Error("Missing BIN chunk.");
  }

  return {
    json: JSON.parse(jsonChunk.toString("utf8").trim()),
    binChunk: buffer.slice(offset, offset + binLength),
  };
}

function padBuffer(buffer, fill = 0x00) {
  const remainder = buffer.length % 4;
  if (!remainder) return buffer;
  return Buffer.concat([buffer, Buffer.alloc(4 - remainder, fill)]);
}

function mapImageRoles(json) {
  const textures = json.textures ?? [];
  const rolesByImage = new Map();

  const setRole = (textureIndex, role) => {
    if (textureIndex == null) return;
    const texture = textures[textureIndex];
    if (!texture || texture.source == null) return;
    rolesByImage.set(texture.source, role);
  };

  for (const material of json.materials ?? []) {
    setRole(material.pbrMetallicRoughness?.baseColorTexture?.index, "baseColor");
    setRole(material.pbrMetallicRoughness?.metallicRoughnessTexture?.index, "metallicRoughness");
    setRole(material.normalTexture?.index, "normal");
    setRole(material.emissiveTexture?.index, "emissive");
  }

  return rolesByImage;
}

function buildMagickArgs(inputFile, outputFile, role, mimeType) {
  const common = [inputFile, "-strip"];

  if (mimeType === "image/jpeg") {
    const maxSize = role === "emissive" ? "1024x1024>" : "2048x2048>";
    const quality = role === "emissive" ? "78" : "82";

    return [
      ...common,
      "-resize",
      maxSize,
      "-sampling-factor",
      "4:2:0",
      "-interlace",
      "Plane",
      "-quality",
      quality,
      outputFile,
    ];
  }

  const maxSize = role === "metallicRoughness" ? "1024x1024>" : "2048x2048>";

  return [
    ...common,
    "-resize",
    maxSize,
    "-define",
    "png:compression-filter=5",
    "-define",
    "png:compression-level=9",
    "-define",
    "png:compression-strategy=1",
    outputFile,
  ];
}

function optimizeEmbeddedImages(json, binChunk) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-glb-opt-"));
  const rolesByImage = mapImageRoles(json);
  const optimizedByBufferView = new Map();
  const report = [];

  try {
    for (const [imageIndex, image] of (json.images ?? []).entries()) {
      const bufferView = json.bufferViews?.[image.bufferView];
      if (!bufferView) continue;

      const role = rolesByImage.get(imageIndex) ?? "generic";
      const extension = image.mimeType === "image/jpeg" ? "jpg" : "png";
      const sourceFile = path.join(tempDir, `source-${imageIndex}.${extension}`);
      const optimizedFile = path.join(tempDir, `optimized-${imageIndex}.${extension}`);
      const sourceBytes = binChunk.slice(
        bufferView.byteOffset ?? 0,
        (bufferView.byteOffset ?? 0) + bufferView.byteLength,
      );

      fs.writeFileSync(sourceFile, sourceBytes);
      execFileSync("magick", buildMagickArgs(sourceFile, optimizedFile, role, image.mimeType), {
        stdio: "ignore",
      });

      const optimizedBytes = fs.readFileSync(optimizedFile);
      optimizedByBufferView.set(image.bufferView, optimizedBytes);
      report.push({
        imageIndex,
        role,
        before: sourceBytes.length,
        after: optimizedBytes.length,
      });
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  return { optimizedByBufferView, report };
}

function rebuildGlb(json, binChunk, optimizedByBufferView) {
  const rebuiltChunks = [];
  const rebuiltViews = [];
  let byteOffset = 0;

  for (const [index, bufferView] of (json.bufferViews ?? []).entries()) {
    const start = bufferView.byteOffset ?? 0;
    const end = start + bufferView.byteLength;
    const bytes = optimizedByBufferView.get(index) ?? binChunk.slice(start, end);
    const paddedBytes = padBuffer(bytes);

    rebuiltChunks.push(paddedBytes);
    rebuiltViews.push({
      ...bufferView,
      byteOffset,
      byteLength: bytes.length,
    });

    byteOffset += paddedBytes.length;
  }

  const rebuiltBin = Buffer.concat(rebuiltChunks);
  const rebuiltJson = {
    ...json,
    bufferViews: rebuiltViews,
    buffers: [{ ...(json.buffers?.[0] ?? {}), byteLength: rebuiltBin.length }],
  };

  const jsonBuffer = padBuffer(Buffer.from(JSON.stringify(rebuiltJson)), 0x20);
  const header = Buffer.alloc(12);
  const jsonHeader = Buffer.alloc(8);
  const binHeader = Buffer.alloc(8);

  header.write("glTF", 0, 4, "utf8");
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(12 + 8 + jsonBuffer.length + 8 + rebuiltBin.length, 8);

  jsonHeader.writeUInt32LE(jsonBuffer.length, 0);
  jsonHeader.write(CHUNK_TYPE_JSON, 4, 4, "utf8");

  binHeader.writeUInt32LE(rebuiltBin.length, 0);
  binHeader.write(CHUNK_TYPE_BIN, 4, 4, "utf8");

  return Buffer.concat([header, jsonHeader, jsonBuffer, binHeader, rebuiltBin]);
}

function formatBytes(bytes) {
  const units = ["B", "KB", "MB"];
  let value = bytes;
  let unit = 0;

  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }

  return `${value.toFixed(unit === 0 ? 0 : 2)} ${units[unit]}`;
}

const inputBuffer = fs.readFileSync(inputPath);
const { json, binChunk } = parseGlb(inputBuffer);
const { optimizedByBufferView, report } = optimizeEmbeddedImages(json, binChunk);
const optimizedGlb = rebuildGlb(json, binChunk, optimizedByBufferView);

fs.writeFileSync(outputPath, optimizedGlb);

console.log(`Input:  ${inputPath} (${formatBytes(inputBuffer.length)})`);
console.log(`Output: ${outputPath} (${formatBytes(optimizedGlb.length)})`);

for (const item of report) {
  console.log(
    `image-${item.imageIndex} [${item.role}] ${formatBytes(item.before)} -> ${formatBytes(item.after)}`,
  );
}
