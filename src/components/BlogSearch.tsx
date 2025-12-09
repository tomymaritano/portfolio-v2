"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import styles from "./BlogSearch.module.css";

interface Post {
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

interface BlogSearchProps {
  posts: Post[];
  onSearchChange?: (hasResults: boolean, results: Post[]) => void;
}

export function BlogSearch({ posts, onSearchChange }: BlogSearchProps) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "description", "tags"],
        threshold: 0.3,
        includeScore: true,
      }),
    [posts]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).map((result) => result.item);
  }, [query, fuse]);

  const isSearching = query.trim().length > 0;

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
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

      {isSearching && (
        <>
          <div className={styles.results}>
            {results.length === 0 ? (
              <p className={styles.noResults}>No posts found for &quot;{query}&quot;</p>
            ) : (
              <p className={styles.count}>
                {results.length} {results.length === 1 ? "post" : "posts"} found
              </p>
            )}
          </div>

          {results.length > 0 && (
            <div className={styles.posts}>
              {results.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.post}>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postDescription}>{post.description}</p>
                  {post.tags.length > 0 && (
                    <div className={styles.tags}>
                      {post.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
