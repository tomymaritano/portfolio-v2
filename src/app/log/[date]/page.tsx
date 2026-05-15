import { allLogs } from "content-collections";
import { MDXContent } from "@/components/MDXContent";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ date: string }>;
}

export async function generateStaticParams() {
  return allLogs.map((log) => ({ date: log.date }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const log = allLogs.find((l) => l.date === date);

  if (!log) return { title: "Log entry not found" };

  return {
    title: `${log.date} — Log`,
    description: log.summary,
    openGraph: {
      title: `${log.date} — Log`,
      description: log.summary,
      type: "article",
      publishedTime: log.date,
    },
  };
}

export default async function LogEntryPage({ params }: Props) {
  const { date } = await params;
  const sortedLogs = [...allLogs].sort((a, b) => b.date.localeCompare(a.date));
  const index = sortedLogs.findIndex((l) => l.date === date);

  if (index === -1) notFound();

  const log = sortedLogs[index];
  const newer = index > 0 ? sortedLogs[index - 1] : null;
  const older = index < sortedLogs.length - 1 ? sortedLogs[index + 1] : null;

  return (
    <main className="mx-auto min-h-screen max-w-[720px] px-5 pt-12 pb-24 md:px-8">
      <Link
        href="/log"
        className="mb-10 inline-block font-mono text-[0.75rem] tracking-[0.02em] text-[var(--text-subtle)] transition-colors hover:text-foreground"
      >
        &larr; Back to log
      </Link>

      <header className="mb-8">
        <time className="mb-3 block font-mono text-[0.75rem] text-[var(--text-subtle)]">
          {log.date}
        </time>
        <h1 className="mb-4 font-serif text-[1.375rem] font-normal leading-[1.3] tracking-[-0.02em] text-foreground sm:text-[1.5rem]">
          {log.summary}
        </h1>
        {log.repos.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {log.repos.map((repo) => (
              <span
                key={repo}
                className="rounded-[var(--radius-sm)] border border-border px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.04em] text-muted-foreground"
              >
                {repo}
              </span>
            ))}
          </div>
        )}
      </header>

      <article className="prose">
        <MDXContent code={log.mdx} />
      </article>

      <footer className="mt-12 border-t border-border pt-6">
        <div className="flex justify-between gap-4">
          {older ? (
            <Link
              href={`/log/${older.date}`}
              className="font-mono text-[0.75rem] text-muted-foreground transition-colors hover:text-foreground"
            >
              &larr; {older.date}
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link
              href={`/log/${newer.date}`}
              className="ml-auto font-mono text-[0.75rem] text-muted-foreground transition-colors hover:text-foreground"
            >
              {newer.date} &rarr;
            </Link>
          )}
        </div>
      </footer>
    </main>
  );
}
