import { allLogs } from "content-collections";
import { MDXContent } from "@/components/MDXContent";
import { PageHeader } from "@/components/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log",
  description: "Daily engineering activity, written automatically from git history.",
};

function formatMonth(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

export default function LogPage() {
  const logs = [...allLogs].sort((a, b) => b.date.localeCompare(a.date));

  const grouped = new Map<string, typeof logs>();
  for (const log of logs) {
    const month = formatMonth(log.date);
    if (!grouped.has(month)) grouped.set(month, []);
    grouped.get(month)!.push(log);
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-80px)] max-w-[720px] px-5 pt-12 pb-24 md:px-8">
      <PageHeader
        title="Log"
        subtitle="Daily engineering activity. Short, dated, mostly written by a small automation that reads git history."
      />

      {logs.length === 0 ? (
        <p className="py-8 font-serif italic text-muted-foreground">No entries yet.</p>
      ) : (
        Array.from(grouped.entries()).map(([month, monthLogs]) => (
          <section key={month} className="mb-14">
            <h2 className="m-0 mb-5 border-b border-border pb-2.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              {month}
            </h2>
            <ul className="m-0 flex list-none flex-col gap-10 p-0">
              {monthLogs.map((log) => (
                <li
                  key={log.date}
                  id={log.date}
                  className="group scroll-mt-20"
                >
                  <div className="mb-2.5 flex items-baseline gap-2.5">
                    <time className="font-mono text-[0.75rem] tracking-[0.02em] text-[var(--text-subtle)]">
                      {log.date}
                    </time>
                    <Link
                      href={`/log/${log.date}`}
                      className="font-mono text-[0.75rem] text-[var(--text-subtle)] opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
                      aria-label="Permalink"
                    >
                      #
                    </Link>
                  </div>
                  <p className="m-0 mb-3 font-serif text-[1.0625rem] leading-[1.45] text-foreground">
                    {log.summary}
                  </p>
                  <div className="prose font-serif text-[var(--prose-size)] leading-[var(--prose-leading)] text-muted-foreground max-w-[var(--prose-measure)]">
                    <MDXContent code={log.mdx} />
                  </div>
                  {log.repos.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
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
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </main>
  );
}
