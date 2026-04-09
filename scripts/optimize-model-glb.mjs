import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const inputPath = process.argv[2] ?? "public/3dmodel.glb";
const outputPath = process.argv[3] ?? inputPath;

const CHUNK_TYPE_JSON = "JSON";
const CHUNK_TYPE_BIN = "BIN\0";

function parseGlb(buffer) {
  const magic = buffer.toString("utf8", 0, 4);
  const version = buffer.readUInt32LE(4);

  if (magic !== "glTF" || version !== 2) {
    throw new Error("Unsupported GLB format.");
  }

  let offset = 12;

  const jsonChunkLength = buffer.readUInt32LE(offset);
  offset += 4;
  const jsonChunkType = buffer.toString("utf8", offset, offset + 4);
  offset += 4;

  if (jsonChunkType !== CHUNK_TYPE_JSON) {
    throw new Error("Missing JSON chunk.");
  }

  const jsonChunk = buffer.slice(offset, offset + jsonChunkLength);
  offset += jsonChunkLength;

  const binChunkLength = buffer.readUInt32LE(offset);
  offset += 4;
  const binChunkType = buffer.toString("utf8", offset, offset + 4);
  offset += 4;

  if (binChunkType !== CHUNK_TYPE_BIN) {
    throw new Error("Missing BIN chunk.");
  }

  const binChunk = buffer.slice(offset, offset + binChunkLength);
  const json = JSON.parse(jsonChunk.toString("utf8").trim());

  return { json, binChunk };
}

function padBuffer(buffer, byte = 0x00) {
  const pad = (4 - (buffer.length % 4)) % 4;
  if (!pad) return buffer;
  return Buffer.concat([buffer, Buffer.alloc(pad, byte)]);
}

function makeRoleMap(json) {
  const rolesByImage = new Map();
  const textures = json.textures ?? [];
  const materials = json.materials ?? [];

  const assign = (textureIndex, role) => {
    if (textureIndex == null) return;
    const texture = textures[textureIndex];
    if (!texture || texture.source == null) return;
    rolesByImage.set(texture.source, role);
  };

  for (const material of materials) {
    assign(material.pbrMetallicRoughness?.baseColorTexture?.index, "baseColor");
    assign(
      material.pbrMetallicRoughness?.metallicRoughnessTexture?.index,
      "metallicRoughness",
    );
    assign(material.normalTexture?.index, "normal");
    assign(material.emissiveTexture?.index, "emissive");
  }

  return rolesByImage;
}

function makeMagickArgs(inputFile, outputFile, role, mimeType) {
  const common = [inputFile, "-strip"];

  if (mimeType === "image/jpeg") {
    const maxSize = role === "emissive" ? "1024x1024>" : "2048x2048>";
    return [
      ...common,
      "-resize",
      maxSize,
      "-sampling-factor",
      "4:2:0",
      "-interlace",
      "Plane",
      "-quality",
      role === "emissive" ? "78" : "82",
      outputFile,
    ];
  }

  const maxSize =
    role === "metallicRoughness" ? "1024x1024>" : role === "normal" ? "2048x2048>" : "2048x2048>";

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

function optimizeImages(json, binChunk) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-glb-opt-"));
  const rolesByImage = makeRoleMap(json);
  const bufferViews = json.bufferViews ?? [];
  const optimized = new Map();
  const report = [];

  try {
    for (const [imageIndex, image] of (json.images ?? []).entries()) {
      const bufferView = bufferViews[image.bufferView];
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
      execFileSync("magick", makeMagickArgs(sourceFile, optimizedFile, role, image.mimeType), {
        stdio: "ignore",
      });

      const optimizedBytes = fs.readFileSync(optimizedFile);
      optimized.set(image.bufferView, optimizedBytes);
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

  return { optimized, report };
}

function rebuildGlb(json, binChunk, optimizedImages) {
  const rebuiltViews = [];
  const rebuiltBuffers = [];

  for (const [index, bufferView] of (json.bufferViews ?? []).entries()) {
    const start = bufferView.byteOffset ?? 0;
    const end = start + bufferView.byteLength;
    const bytes = optimizedImages.get(index) ?? binChunk.slice(start, end);
    const padded = padBuffer(bytes);
    const byteOffset = rebuiltBuffers.reduce((sum, chunk) => sum + chunk.length, 0);

    rebuiltBuffers.push(padded);
    rebuiltViews.push({
      ...bufferView,
      byteOffset,
      byteLength: bytes.length,
    });
  }

  const rebuiltBin = Buffer.concat(rebuiltBuffers);
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

const sourceBuffer = fs.readFileSync(inputPath);
const { json, binChunk } = parseGlb(sourceBuffer);
const { optimized, report } = optimizeImages(json, binChunk);
const rebuiltGlb = rebuildGlb(json, binChunk, optimized);

const finalOutputPath =
  path.resolve(inputPath) === path.resolve(outputPath)
    ? path.join(path.dirname(outputPath), `${path.basename(outputPath, ".glb")}.optimized.glb`)
    : outputPath;

fs.writeFileSync(finalOutputPath, rebuiltGlb);

console.log(`Input:  ${inputPath} (${formatBytes(sourceBuffer.length)})`);
console.log(`Output: ${finalOutputPath} (${formatBytes(rebuiltGlb.length)})`);
console.log("");

for (const item of report) {
  console.log(
    `image-${item.imageIndex} [${item.role}] ${formatBytes(item.before)} -> ${formatBytes(item.after)}`,
  );
}
