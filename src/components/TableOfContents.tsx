"use client";

import { useState, useEffect } from "react";
import styles from "./TableOfContents.module.css";

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
    <nav className={styles.toc} aria-label="Table of contents">
      <h4 className={styles.title}>On this page</h4>
      <ul className={styles.list}>
        {headings.map(({ level, text, slug }) => (
          <li
            key={slug}
            className={`${styles.item} ${level === 3 ? styles.nested : ""}`}
          >
            <a
              href={`#${slug}`}
              className={`${styles.link} ${activeSlug === slug ? styles.active : ""}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(slug)?.scrollIntoView({
                  behavior: "smooth",
                });
                setActiveSlug(slug);
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
