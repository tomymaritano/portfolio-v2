import { NextResponse } from "next/server";

export const revalidate = 300; // 5 minutes

interface ActivityItem {
  type: string;
  label: string;
  time: string;
  icon: string;
}

async function fetchGitHubActivity(): Promise<ActivityItem | null> {
  try {
    const res = await fetch(
      "https://api.github.com/users/tomymaritano/events?per_page=10",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) return null;

    const events = await res.json();
    const pushEvent = events.find(
      (e: { type: string }) => e.type === "PushEvent"
    );

    if (!pushEvent) return null;

    const repoName = pushEvent.repo.name.split("/").pop();
    return {
      type: "github",
      label: `Pushed to ${repoName}`,
      time: pushEvent.created_at,
      icon: "🔨",
    };
  } catch {
    return null;
  }
}

function getLatestBlogActivity(): ActivityItem {
  return {
    type: "blog",
    label: "New blog post published",
    time: new Date("2026-03-20T10:00:00Z").toISOString(),
    icon: "✍️",
  };
}

function getDeployActivity(): ActivityItem {
  const sha = process.env.VERCEL_GIT_COMMIT_SHA;
  const label = sha ? `Deployed ${sha.slice(0, 7)}` : "Site deployed";
  const time =
    process.env.VERCEL_GIT_COMMIT_AUTHOR_DATE ||
    new Date().toISOString();

  return {
    type: "deploy",
    label,
    time,
    icon: "🚀",
  };
}

export async function GET() {
  const [github] = await Promise.all([fetchGitHubActivity()]);

  const activities: ActivityItem[] = [];

  if (github) activities.push(github);
  activities.push(getLatestBlogActivity());
  activities.push(getDeployActivity());

  // Sort by most recent first
  activities.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  return NextResponse.json(activities);
}
