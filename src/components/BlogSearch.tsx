"use client";

import { useState, useEffect } from "react";
import styles from "./BlogSearch.module.css";

interface BlogSearchProps {
  onQueryChange: (query: string) => void;
  placeholder?: string;
  resultCount?: number;
}

export function BlogSearch({
  onQueryChange,
  placeholder = "Search posts...",
  resultCount
}: BlogSearchProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    onQueryChange(query);
  }, [query, onQueryChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setQuery("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <svg
          className={styles.icon}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <button
            className={styles.clear}
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {query.trim() && resultCount !== undefined && (
        <div className={styles.results}>
          {resultCount === 0 ? (
            <p className={styles.noResults}>No posts found for &quot;{query}&quot;</p>
          ) : (
            <p className={styles.count}>
              {resultCount} {resultCount === 1 ? "post" : "posts"} found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
