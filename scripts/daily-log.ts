import { resolve } from "node:path";
import { fetchActivity } from "./lib/github";
import { generateLogEntry, getProvider, readVoiceGuide } from "./lib/llm";
import { writeLogEntry } from "./lib/mdx";

const BA_TZ = "America/Argentina/Buenos_Aires";
const BA_UTC_OFFSET_HOURS = 3;
const WINDOW_HOURS = 24;
const USERNAME_FALLBACK = "tomymaritano";
const RATE_LIMIT_DELAY_MS = 4500;

interface CliArgs {
  date?: string;
  from?: string;
  to?: string;
}

function parseArgs(argv: string[]): CliArgs {
  const out: CliArgs = {};
  for (const a of argv) {
    const m = a.match(/^--(date|from|to)=(.+)$/);
    if (m) out[m[1] as "date" | "from" | "to"] = m[2];
  }
  return out;
}

function buenosAiresDateNow(now: Date): string {
  return now.toLocaleDateString("en-CA", { timeZone: BA_TZ });
}

function baDayWindow(dateStr: string): { start: Date; end: Date } {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error(`Invalid date "${dateStr}". Expected YYYY-MM-DD.`);
  }
  const start = new Date(`${dateStr}T${String(BA_UTC_OFFSET_HOURS).padStart(2, "0")}:00:00.000Z`);
  const end = new Date(start.getTime() + WINDOW_HOURS * 3600 * 1000);
  return { start, end };
}

function* dateRange(fromStr: string, toStr: string): Generator<string> {
  const { start: from } = baDayWindow(fromStr);
  const { start: to } = baDayWindow(toStr);
  if (from > to) throw new Error(`--from (${fromStr}) is after --to (${toStr}).`);
  for (let cur = from; cur <= to; cur = new Date(cur.getTime() + WINDOW_HOURS * 3600 * 1000)) {
    yield cur.toISOString().slice(0, 10);
  }
}

function envRequired(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing required env: ${name}`);
    process.exit(2);
  }
  return v;
}

async function processDay(opts: {
  date: string;
  windowStart: Date;
  windowEnd: Date;
  username: string;
  token: string;
  repoRoot: string;
  voiceGuide: string;
}) {
  const { date, windowStart, windowEnd, username, token, repoRoot, voiceGuide } = opts;

  console.log(`[daily-log] ${date} → window ${windowStart.toISOString()} → ${windowEnd.toISOString()}`);

  const activity = await fetchActivity({
    username,
    token,
    windowStart,
    windowEnd,
    includePrivate: true,
  });

  console.log(`[daily-log] ${date} → ${activity.totalCommits} commits across ${activity.repos.length} repos`);

  if (activity.totalCommits === 0 && activity.repos.length === 0) {
    console.log(`[daily-log] ${date} → no activity, skipping`);
    return;
  }

  const entry = await generateLogEntry({ activity, voiceGuide, date });

  if (!entry) {
    console.log(`[daily-log] ${date} → LLM returned SKIP`);
    return;
  }

  const result = writeLogEntry({ repoRoot, date, entry });

  switch (result.reason) {
    case "wrote":
      console.log(`[daily-log] ${date} → wrote ${result.path}`);
      break;
    case "skipped-manual":
      console.log(`[daily-log] ${date} → ${result.path} is hand-edited (generated: false), skipped`);
      break;
    case "skipped-unchanged":
      console.log(`[daily-log] ${date} → unchanged`);
      break;
  }
}

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const now = new Date();

  const username = process.env.GH_USERNAME || USERNAME_FALLBACK;
  const token = envRequired("ACTIVITY_GITHUB_TOKEN");
  const provider = getProvider();
  if (provider === "claude") envRequired("ANTHROPIC_API_KEY");
  else envRequired("GITHUB_MODELS_TOKEN");

  const repoRoot = resolve(process.cwd());
  const voiceGuide = readVoiceGuide(repoRoot);

  if (args.from || args.to) {
    if (!args.from || !args.to) {
      console.error(`Backfill mode requires both --from=YYYY-MM-DD and --to=YYYY-MM-DD.`);
      process.exit(2);
    }
    const dates = [...dateRange(args.from, args.to)];
    console.log(`[daily-log] backfill mode: ${dates.length} day(s) from ${args.from} to ${args.to}, provider=${provider}`);

    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const { start, end } = baDayWindow(date);
      try {
        await processDay({ date, windowStart: start, windowEnd: end, username, token, repoRoot, voiceGuide });
      } catch (err) {
        console.error(`[daily-log] ${date} → failed:`, err);
      }
      if (i < dates.length - 1) await sleep(RATE_LIMIT_DELAY_MS);
    }

    console.log(`[daily-log] backfill complete: ${dates.length} day(s) processed`);
    return;
  }

  const date = args.date ?? buenosAiresDateNow(now);
  const { start, end } = args.date
    ? baDayWindow(args.date)
    : { start: new Date(now.getTime() - WINDOW_HOURS * 3600 * 1000), end: now };

  console.log(`[daily-log] single-day mode: date=${date} username=${username} provider=${provider}`);
  await processDay({ date, windowStart: start, windowEnd: end, username, token, repoRoot, voiceGuide });
}

main().catch((err) => {
  console.error("[daily-log] failed:", err);
  process.exit(1);
});
