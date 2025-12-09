"use client";

import { useEffect, useState } from "react";
import styles from "./ViewCounter.module.css";

interface ViewCounterProps {
  slug: string;
  increment?: boolean;
}

export function ViewCounter({ slug, increment = true }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch(`/api/views/${slug}`, {
          method: increment ? "POST" : "GET",
        });
        if (res.ok) {
          const data = await res.json();
          setViews(data.views);
        }
      } catch {
        // Silently fail - views are not critical
      }
    };

    fetchViews();
  }, [slug, increment]);

  return (
    <span className={styles.views}>
      {views !== null ? (
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          {views.toLocaleString()} views
        </>
      ) : (
        <span className={styles.skeleton} />
      )}
    </span>
  );
}
