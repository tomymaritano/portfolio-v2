import Link from "next/link";

interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: "live" | "archived" | "learning" | "experiment";
}

export function SelectedWork({ projects, limit = 4 }: { projects: Project[]; limit?: number }) {
  const featured = projects.slice(0, limit);

  return (
    <section className="mb-16">
      <header className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
        <h2 className="m-0 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          Selected work
        </h2>
        <Link
          href="/projects"
          className="font-mono text-[0.6875rem] tracking-[0.05em] text-[var(--text-subtle)] transition-colors hover:text-foreground"
        >
          all projects &rarr;
        </Link>
      </header>

      <ul className="m-0 list-none p-0">
        {featured.map((project) => (
          <li
            key={project.slug}
            className="border-b border-border last:border-0"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group grid grid-cols-1 items-baseline gap-1 py-3.5 text-foreground sm:grid-cols-[140px_1fr_auto] sm:gap-4"
            >
              <span className="font-sans text-[0.9375rem] font-medium text-foreground decoration-[var(--text-subtle)] decoration-1 underline-offset-[0.25em] group-hover:underline">
                {project.name}
              </span>
              <span className="font-serif text-[0.9375rem] leading-[1.45] text-muted-foreground">
                {project.tagline}
              </span>
              <span className="whitespace-nowrap self-start font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-[var(--text-subtle)] sm:self-baseline">
                {project.status}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
