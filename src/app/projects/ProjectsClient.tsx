"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Status = "all" | "live" | "experiment" | "learning" | "archived";

interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: string;
  topics: string[];
}

const filters: { label: string; value: Status }[] = [
  { label: "All", value: "all" },
  { label: "Live", value: "live" },
  { label: "Experiment", value: "experiment" },
  { label: "Learning", value: "learning" },
  { label: "Archived", value: "archived" },
];

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Status>("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.status === active);

  return (
    <>
      <nav className="mb-6 flex flex-wrap gap-1" aria-label="Filter projects">
        {filters.map((f) => {
          const isActive = active === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setActive(f.value)}
              aria-pressed={isActive}
              className={cn(
                "cursor-pointer rounded-[var(--radius-sm)] border bg-transparent px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] transition-colors",
                isActive
                  ? "border-[var(--text-subtle)] text-foreground"
                  : "border-border text-muted-foreground hover:border-[var(--text-subtle)] hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          );
        })}
      </nav>

      <ul className="m-0 list-none p-0">
        {filtered.map((p) => (
          <li key={p.slug} className="border-b border-border last:border-0">
            <Link
              href={`/projects/${p.slug}`}
              className="group grid grid-cols-1 items-baseline gap-1 py-3.5 text-foreground sm:grid-cols-[160px_1fr_auto] sm:gap-4"
            >
              <span className="font-sans text-[0.9375rem] font-medium text-foreground decoration-[var(--text-subtle)] decoration-1 underline-offset-[0.25em] group-hover:underline">
                {p.name}
              </span>
              <span className="font-serif text-[0.9375rem] leading-[1.45] text-muted-foreground">
                {p.tagline}
              </span>
              <span className="whitespace-nowrap self-start font-mono text-[0.625rem] uppercase tracking-[0.06em] text-[var(--text-subtle)] sm:self-baseline">
                {p.status}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="m-0 py-8 font-serif italic text-muted-foreground">No projects with this status.</p>
      )}
    </>
  );
}
