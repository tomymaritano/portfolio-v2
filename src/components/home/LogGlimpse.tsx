import Link from "next/link";

interface LogEntry {
  date: string;
  summary: string;
}

export function LogGlimpse({ entries, limit = 3 }: { entries: LogEntry[]; limit?: number }) {
  const recent = entries.slice(0, limit);

  return (
    <section className="mb-16">
      <header className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
        <h2 className="m-0 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          Log
        </h2>
        <Link
          href="/log"
          className="font-mono text-[0.6875rem] tracking-[0.05em] text-[var(--text-subtle)] transition-colors hover:text-foreground"
        >
          full log &rarr;
        </Link>
      </header>

      {recent.length === 0 ? (
        <p className="m-0 font-serif text-[0.9375rem] italic text-muted-foreground">
          Nothing logged yet.
        </p>
      ) : (
        <ul className="m-0 list-none p-0">
          {recent.map((entry) => (
            <li
              key={entry.date}
              className="border-b border-border last:border-0"
            >
              <Link
                href={`/log/${entry.date}`}
                className="group grid grid-cols-1 items-baseline gap-1 py-3.5 text-foreground sm:grid-cols-[110px_1fr] sm:gap-4"
              >
                <time className="whitespace-nowrap font-mono text-[0.75rem] text-[var(--text-subtle)]">
                  {entry.date}
                </time>
                <span className="font-serif text-base leading-[1.4] text-foreground decoration-[var(--text-subtle)] decoration-1 underline-offset-[0.25em] group-hover:underline">
                  {entry.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
