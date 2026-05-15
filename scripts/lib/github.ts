import { Octokit } from "@octokit/rest";

export interface CommitSummary {
  sha: string;
  message: string;
  date: string;
  additions?: number;
  deletions?: number;
}

export interface RepoActivity {
  repo: string;
  description: string | null;
  language: string | null;
  commits: CommitSummary[];
  pullRequestsMerged: Array<{ number: number; title: string }>;
}

export interface Activity {
  username: string;
  windowStart: string;
  windowEnd: string;
  totalCommits: number;
  repos: RepoActivity[];
}

const COMMIT_TRUNCATE = 200;

function shortMessage(msg: string): string {
  const firstLine = msg.split("\n")[0].trim();
  if (firstLine.length <= COMMIT_TRUNCATE) return firstLine;
  return firstLine.slice(0, COMMIT_TRUNCATE - 1) + "…";
}

export async function fetchActivity(opts: {
  username: string;
  token: string;
  windowStart: Date;
  windowEnd: Date;
  includePrivate?: boolean;
}): Promise<Activity> {
  const { username, token, windowStart, windowEnd } = opts;
  const includePrivate = opts.includePrivate ?? true;

  const octokit = new Octokit({ auth: token });

  const allRepos = await octokit.paginate(octokit.repos.listForAuthenticatedUser, {
    per_page: 100,
    sort: "pushed",
    affiliation: "owner",
    visibility: includePrivate ? "all" : "public",
  });

  const ownedNonForks = allRepos.filter(
    (r) => r.owner.login === username && !r.fork && !r.archived
  );

  const since = windowStart.toISOString();
  const until = windowEnd.toISOString();

  const repoActivity: RepoActivity[] = [];

  for (const repo of ownedNonForks) {
    if (repo.pushed_at && new Date(repo.pushed_at) < windowStart) continue;

    let commits: CommitSummary[] = [];
    try {
      const raw = await octokit.paginate(octokit.repos.listCommits, {
        owner: username,
        repo: repo.name,
        author: username,
        since,
        until,
        per_page: 100,
      });
      commits = raw.map((c) => ({
        sha: c.sha.slice(0, 7),
        message: shortMessage(c.commit.message),
        date: c.commit.author?.date ?? c.commit.committer?.date ?? since,
      }));
    } catch (err) {
      const e = err as { status?: number };
      if (e.status === 404 || e.status === 409) continue;
      throw err;
    }

    let merged: Array<{ number: number; title: string }> = [];
    try {
      const search = await octokit.search.issuesAndPullRequests({
        q: `repo:${username}/${repo.name} is:pr is:merged merged:${since}..${until} author:${username}`,
        per_page: 30,
      });
      merged = search.data.items.map((p) => ({ number: p.number, title: p.title }));
    } catch {
      merged = [];
    }

    if (commits.length === 0 && merged.length === 0) continue;

    repoActivity.push({
      repo: repo.name,
      description: repo.description,
      language: repo.language,
      commits,
      pullRequestsMerged: merged,
    });
  }

  return {
    username,
    windowStart: since,
    windowEnd: until,
    totalCommits: repoActivity.reduce((n, r) => n + r.commits.length, 0),
    repos: repoActivity,
  };
}

export function formatActivityForLLM(activity: Activity): string {
  if (activity.repos.length === 0) {
    return `No activity from ${activity.username} between ${activity.windowStart} and ${activity.windowEnd}.`;
  }

  const lines: string[] = [];
  lines.push(`Window: ${activity.windowStart} → ${activity.windowEnd}`);
  lines.push(`Total commits: ${activity.totalCommits} across ${activity.repos.length} repo(s)`);
  lines.push("");

  for (const r of activity.repos) {
    lines.push(`## ${r.repo}` + (r.language ? ` [${r.language}]` : ""));
    if (r.description) lines.push(`> ${r.description}`);
    if (r.pullRequestsMerged.length > 0) {
      lines.push(`Merged PRs:`);
      for (const pr of r.pullRequestsMerged) {
        lines.push(`- #${pr.number} ${pr.title}`);
      }
    }
    if (r.commits.length > 0) {
      lines.push(`Commits (${r.commits.length}):`);
      for (const c of r.commits) {
        lines.push(`- ${c.sha} ${c.message}`);
      }
    }
    lines.push("");
  }

  return lines.join("\n");
}
