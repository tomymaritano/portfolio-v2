"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  level: number;
  text: string;
  slug: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeSlug, setActiveSlug] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ slug }) => {
      const element = document.getElementById(slug);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="sticky top-20" aria-label="Table of contents">
      <p className="m-0 mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted-foreground">
        On this page
      </p>
      <ul className="m-0 list-none border-l border-border p-0">
        {headings.map(({ level, text, slug }) => (
          <li key={slug} className={cn(level === 3 ? "pl-4" : "")}>
            <a
              href={`#${slug}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(slug)?.scrollIntoView({ behavior: "smooth" });
                setActiveSlug(slug);
              }}
              className={cn(
                "-ml-px block border-l-2 py-1 pl-4 font-sans text-[0.8125rem] leading-[1.4] transition-colors",
                activeSlug === slug
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
