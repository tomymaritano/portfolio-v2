import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  date: string;
}

export function WritingList({ posts, limit = 5 }: { posts: Post[]; limit?: number }) {
  const recent = posts.slice(0, limit);

  return (
    <section className="mb-16">
      <header className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
        <h2 className="m-0 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          Writing
        </h2>
        <Link
          href="/writing"
          className="font-mono text-[0.6875rem] tracking-[0.05em] text-[var(--text-subtle)] transition-colors hover:text-foreground"
        >
          all writing &rarr;
        </Link>
      </header>

      {recent.length === 0 ? (
        <p className="m-0 font-serif text-[0.9375rem] italic text-muted-foreground">
          Nothing yet.
        </p>
      ) : (
        <ul className="m-0 list-none p-0">
          {recent.map((post) => (
            <li
              key={post.slug}
              className="border-b border-border last:border-0"
            >
              <Link
                href={`/writing/${post.slug}`}
                className="group grid grid-cols-1 items-baseline gap-1 py-3.5 text-foreground sm:grid-cols-[110px_1fr] sm:gap-4"
              >
                <time className="whitespace-nowrap font-mono text-[0.75rem] text-[var(--text-subtle)]">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </time>
                <span className="font-serif text-base leading-[1.4] text-foreground decoration-[var(--text-subtle)] decoration-1 underline-offset-[0.25em] group-hover:underline">
                  {post.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
