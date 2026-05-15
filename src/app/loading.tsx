export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-[720px] flex-col items-center justify-center px-5 py-16">
      <div className="flex items-center gap-2" aria-hidden="true">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--text-subtle)] [animation-delay:-0.32s]" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--text-subtle)] [animation-delay:-0.16s]" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--text-subtle)]" />
      </div>
      <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted-foreground">
        Loading
      </p>
      <span className="sr-only">Loading</span>
    </div>
  );
}
