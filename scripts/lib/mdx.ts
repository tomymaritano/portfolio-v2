import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { GeneratedEntry } from "./llm";

export interface WriteResult {
  written: boolean;
  reason: "wrote" | "skipped-manual" | "skipped-unchanged";
  path: string;
}

const FRONTMATTER_FALSE_RE = /^generated:\s*false\b/m;

export function writeLogEntry(opts: {
  repoRoot: string;
  date: string;
  entry: GeneratedEntry;
}): WriteResult {
  const path = resolve(opts.repoRoot, "src/content/logs", `${opts.date}.mdx`);

  if (existsSync(path)) {
    const existing = readFileSync(path, "utf-8");
    if (FRONTMATTER_FALSE_RE.test(existing)) {
      return { written: false, reason: "skipped-manual", path };
    }
  }

  const next = renderMdx(opts.date, opts.entry);

  if (existsSync(path) && readFileSync(path, "utf-8") === next) {
    return { written: false, reason: "skipped-unchanged", path };
  }

  writeFileSync(path, next, "utf-8");
  return { written: true, reason: "wrote", path };
}

function renderMdx(date: string, entry: GeneratedEntry): string {
  const reposYaml = entry.repos.length > 0
    ? `[${entry.repos.map((r) => `"${escapeYaml(r)}"`).join(", ")}]`
    : "[]";

  return `---
date: "${date}"
summary: ${yamlString(entry.summary)}
repos: ${reposYaml}
commits: ${entry.commits}
generated: true
---

${entry.body}
`;
}

function escapeYaml(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function yamlString(value: string): string {
  const escaped = escapeYaml(value);
  return `"${escaped}"`;
}
