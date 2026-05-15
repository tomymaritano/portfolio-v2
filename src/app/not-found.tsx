import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-[720px] flex-col items-start justify-center px-5 py-16 md:px-8">
      <p className="m-0 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--text-subtle)]">
        404
      </p>
      <h1 className="mt-4 font-serif text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[2.5rem]">
        Page not found
      </h1>
      <p className="mt-4 max-w-[52ch] font-serif text-[1.125rem] leading-[1.5] text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <nav className="mt-8 flex flex-wrap gap-6" aria-label="Back navigation">
        <Link
          href="/"
          className="font-mono text-[0.75rem] uppercase tracking-[0.08em] text-foreground underline decoration-[var(--text-subtle)] decoration-1 underline-offset-[0.3em] transition-colors hover:decoration-foreground"
        >
          Home
        </Link>
        <Link
          href="/writing"
          className="font-mono text-[0.75rem] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Writing
        </Link>
        <Link
          href="/projects"
          className="font-mono text-[0.75rem] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Projects
        </Link>
      </nav>
    </main>
  );
}
