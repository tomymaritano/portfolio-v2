import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Activity } from "./github";

export interface GeneratedEntry {
  summary: string;
  body: string;
  repos: string[];
  commits: number;
}

export type Provider = "github" | "claude";

const GITHUB_ENDPOINT = "https://models.github.ai/inference/chat/completions";
const GITHUB_MODEL_DEFAULT = "openai/gpt-4o-mini";
const CLAUDE_MODEL_DEFAULT = "claude-opus-4-7";

interface GenerateOpts {
  activity: Activity;
  voiceGuide: string;
  date: string;
}

export function getProvider(): Provider {
  const raw = (process.env.LLM_PROVIDER ?? "github").toLowerCase();
  if (raw !== "github" && raw !== "claude") {
    throw new Error(`Invalid LLM_PROVIDER "${raw}". Use "github" or "claude".`);
  }
  return raw;
}

export async function generateLogEntry(opts: GenerateOpts): Promise<GeneratedEntry | null> {
  if (opts.activity.totalCommits === 0 && opts.activity.repos.length === 0) {
    return null;
  }
  return getProvider() === "claude" ? generateWithClaude(opts) : generateWithGitHub(opts);
}

// ---------- GitHub Models (default, free) ----------

const GITHUB_OUTPUT_INSTRUCTIONS = `
You will be given engineering activity for a single calendar day across one engineer's repositories.

Your job: decide whether the day is worth posting, and if so, produce ONE log entry that reads as if the engineer typed it. Follow the voice rules above and the length tiers below.

Respond with a JSON object matching this exact schema:

{
  "skip": boolean,         // true if the day is not worth a public entry
  "tier": "micro" | "standard" | "heavy" | "skip",
  "summary": string,       // one-line summary, ≤ 100 chars, no trailing period unless it's a real sentence
  "body": string           // body in plain markdown, calibrated to tier (see below)
}

LENGTH TIERS — pick the smallest that fits:

- "skip" — set when ALL changes are mechanical (only typo fixes, version bumps, dependency bumps, formatting, lockfile updates, generated files, "wip"/"fix"/"." commits, automated CI commits, or work on an unfinished branch that did not merge). Better silent than filler. When skip, "summary" and "body" can be empty strings.

- "micro" — 1–5 meaningful commits in 1 repo. Body 25–45 words. One paragraph: one sentence summarizing the change, one sentence on context or what's next.

- "standard" — 6–15 commits, OR 1 merged PR, OR multi-repo work. Body 50–100 words. One paragraph, maybe two. Name the repos. Use concrete details.

- "heavy" — 16+ commits, OR a substantial PR merged, OR shipping a feature end-to-end. Body 120–200 words. Two short paragraphs allowed. Set up context, describe what shipped, optional sentence on what's left. May include 1–2 inline images (see IMAGES below).

DECISION RULES:

- Default to "skip" if you're unsure whether something user-visible or meaningful happened.
- Don't pad: a Standard day should NOT be inflated into a Heavy entry just because there were many commits.
- Don't strip: a Heavy ship day should NOT be flattened into a Micro entry just to be terse.
- Commit count is a proxy. What matters: did something land that a reader outside the repo could understand?

IMAGES (heavy tier only):

- Only "heavy" entries may include inline images. Micro and standard NEVER do. If unsure, omit images.
- Maximum 2 images per heavy entry. Often 1 is right.
- Place images mid-body between paragraphs, never at the top.
- Use this exact markdown syntax:
  ![alt](https://image.pollinations.ai/prompt/PROMPT_URL_ENCODED?width=1200&height=630&nologo=true&model=flux)
- PROMPT_URL_ENCODED must be the URL-encoded form of: "{concept}, editorial illustration, minimal line art, muted palette, soft monochrome, no people, no text, abstract, restrained"
- The {concept} must describe the *idea* of what shipped, not a literal scene. Examples:
  - GOOD concept: "branches merging into a single line" (for a multi-PR merge)
  - GOOD concept: "nested rectangles forming a layout grid" (for a CSS rewrite)
  - BAD: "developer at desk", anything with humans, anything photo-realistic
- Alt text is plain English, ≤ 80 chars, describes the concept.
- If you can't think of a non-cliché visual concept, skip the image. Text-only heavy entries are fine.

VOICE RULES:

- Refer to repos by short name only.
- Do not invent intent or motivation. Only summarize what changed.
- If a change was reverted later the same day, mention it; do not write it as if it shipped.
- Never use marketing adjectives ("seamless", "robust", "powerful", "leverage", "passionate").
- First person, present tense, dry. No emojis.
- No headings inside the body. No bullet lists unless it really helps clarity.
- Return ONLY the JSON object. No prose, no markdown fences, no preamble.
`;

interface GitHubChoice {
  message: { role: string; content: string | null };
  finish_reason?: string;
}

interface GitHubResponse {
  choices?: GitHubChoice[];
  error?: { message?: string; code?: string };
}

async function generateWithGitHub(opts: GenerateOpts): Promise<GeneratedEntry | null> {
  const token = process.env.GITHUB_MODELS_TOKEN;
  if (!token) throw new Error("GITHUB_MODELS_TOKEN not set");

  const model = process.env.GH_MODEL || GITHUB_MODEL_DEFAULT;
  const systemPrompt = buildSystemPrompt(opts.voiceGuide, GITHUB_OUTPUT_INSTRUCTIONS);
  const userPrompt = `Date: ${opts.date}\n\nActivity:\n\n${formatForPrompt(opts.activity)}`;

  const res = await fetch(GITHUB_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2026-03-10",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 1024,
      temperature: 0.5,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub Models ${res.status} ${res.statusText}: ${text}`);
  }

  const json = (await res.json()) as GitHubResponse;
  if (json.error) throw new Error(`GitHub Models error: ${json.error.message ?? json.error.code}`);

  const content = json.choices?.[0]?.message?.content?.trim();
  if (!content) return null;

  let parsed: { skip?: boolean; summary?: string; body?: string };
  try {
    parsed = JSON.parse(content);
  } catch (err) {
    throw new Error(`GitHub Models returned invalid JSON: ${content.slice(0, 200)}`);
  }

  if (parsed.skip === true) return null;
  if (!parsed.summary || !parsed.body) return null;

  return {
    summary: parsed.summary.trim(),
    body: parsed.body.trim(),
    repos: opts.activity.repos.map((r) => r.repo),
    commits: opts.activity.totalCommits,
  };
}

// ---------- Anthropic Claude (opt-in) ----------

const CLAUDE_OUTPUT_INSTRUCTIONS = `
You will be given engineering activity for a single calendar day across one engineer's repositories.

Your job: decide whether the day is worth posting, and if so, produce ONE log entry that reads as if the engineer typed it. Follow the voice rules above and the length tiers below.

LENGTH TIERS — pick the smallest that fits:

- SKIP — set when ALL changes are mechanical (only typo fixes, version bumps, dependency bumps, formatting, lockfile updates, generated files, "wip"/"fix"/"." commits, automated CI commits, or work on an unfinished branch that did not merge). When SKIP, output literally "SKIP" and nothing else.

- micro — 1–5 meaningful commits in 1 repo. Body 25–45 words. One paragraph.

- standard — 6–15 commits, OR 1 merged PR, OR multi-repo work. Body 50–100 words. One paragraph, maybe two. Name the repos.

- heavy — 16+ commits, OR a substantial PR merged, OR shipping a feature end-to-end. Body 120–200 words. Two short paragraphs allowed. May include 1–2 inline images (see IMAGES below).

DECISION RULES: default to SKIP if unsure something user-visible happened. Don't pad. Don't strip. Commit count is a proxy — what matters is whether something landed that a reader outside the repo could understand.

IMAGES (heavy tier only):

- Only "heavy" entries may include inline images. Micro and standard NEVER do.
- Maximum 2 images per heavy entry. Often 1 is right.
- Place mid-body between paragraphs, never at the top.
- Use this exact markdown syntax:
  ![alt](https://image.pollinations.ai/prompt/PROMPT_URL_ENCODED?width=1200&height=630&nologo=true&model=flux)
- PROMPT_URL_ENCODED is the URL-encoded form of: "{concept}, editorial illustration, minimal line art, muted palette, soft monochrome, no people, no text, abstract, restrained"
- {concept} = the idea of what shipped, abstracted. Examples: "branches merging into a single line", "nested rectangles forming a layout grid". NEVER literal scenes or humans.
- Alt text plain English, ≤ 80 chars.
- If you can't think of a non-cliché concept, skip the image.

OUTPUT FORMAT — exactly these sections, no preamble:

TIER: <micro | standard | heavy>
SUMMARY: <one-line summary, ≤ 100 chars, no trailing period unless it's a real sentence>
BODY:
<body in plain markdown, calibrated to tier above. No headings inside body. No bullet lists unless it really helps clarity.>

VOICE RULES:
- Refer to repos by short name only.
- Do not invent intent or motivation. Only summarize what changed.
- If a change was reverted later the same day, mention it; do not write it as if it shipped.
- Never use marketing adjectives ("seamless", "robust", "powerful", "leverage", "passionate").
- First person, present tense, dry. No emojis.
`;

async function generateWithClaude(opts: GenerateOpts): Promise<GeneratedEntry | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");

  const client = new Anthropic();
  const model = process.env.CLAUDE_MODEL || CLAUDE_MODEL_DEFAULT;
  const systemPrompt = buildSystemPrompt(opts.voiceGuide, CLAUDE_OUTPUT_INSTRUCTIONS);

  const stream = await client.messages.stream({
    model,
    max_tokens: 1024,
    thinking: { type: "adaptive" },
    output_config: { effort: "low" },
    system: [
      {
        type: "text",
        text: systemPrompt,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      {
        role: "user",
        content: `Date: ${opts.date}\n\nActivity:\n\n${formatForPrompt(opts.activity)}`,
      },
    ],
  });

  const final = await stream.finalMessage();
  const text = final.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  if (!text || text.trim().toUpperCase() === "SKIP") return null;

  return parseClaudeEntry(text, opts.activity);
}

function parseClaudeEntry(text: string, activity: Activity): GeneratedEntry | null {
  const summaryMatch = text.match(/SUMMARY:\s*(.+)/);
  const bodyMatch = text.match(/BODY:\s*\n?([\s\S]+)$/);

  if (!summaryMatch || !bodyMatch) return null;

  const summary = summaryMatch[1].trim();
  const body = bodyMatch[1].trim();
  if (!summary || !body) return null;

  return {
    summary,
    body,
    repos: activity.repos.map((r) => r.repo),
    commits: activity.totalCommits,
  };
}

// ---------- Shared helpers ----------

function buildSystemPrompt(voiceGuide: string, outputInstructions: string): string {
  return `You are writing a daily engineering log entry on behalf of the engineer.
The voice and editorial rules below are the contract for this output.

--- VOICE GUIDE ---
${voiceGuide}
--- END VOICE GUIDE ---

${outputInstructions}`;
}

function formatForPrompt(activity: Activity): string {
  if (activity.repos.length === 0) {
    return `No commits or merged PRs in the window. Activity is empty.`;
  }

  const blocks: string[] = [];
  for (const r of activity.repos) {
    const head = `### ${r.repo}` + (r.language ? ` (${r.language})` : "");
    const lines = [head];
    if (r.description) lines.push(`Description: ${r.description}`);
    if (r.pullRequestsMerged.length > 0) {
      lines.push(`Merged PRs:`);
      for (const pr of r.pullRequestsMerged) {
        lines.push(`  - #${pr.number}: ${pr.title}`);
      }
    }
    if (r.commits.length > 0) {
      lines.push(`Commits:`);
      for (const c of r.commits) {
        lines.push(`  - ${c.sha} ${c.message}`);
      }
    }
    blocks.push(lines.join("\n"));
  }
  return blocks.join("\n\n");
}

export function readVoiceGuide(repoRoot: string): string {
  const path = resolve(repoRoot, "docs", "voice.md");
  return readFileSync(path, "utf-8");
}
