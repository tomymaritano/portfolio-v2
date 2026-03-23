"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import styles from "./page.module.css";

interface Post {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
}

interface BlogClientProps {
  posts: Post[];
}

export function BlogClient({ posts }: BlogClientProps) {
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

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;
    return fuse.search(query).map((result) => result.item);
  }, [query, fuse, posts]);

  return (
    <main className={styles.main}>
      <h1 className={styles.pageTitle}>Blog</h1>
      <p className={styles.pageSubtitle}>
        Thoughts on building software, tools, and products.
      </p>

      <input
        type="search"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.posts}>
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={styles.postRow}
          >
            <div className={styles.postHeader}>
              <span className={styles.postTitle}>{post.title}</span>
              <time className={styles.postDate}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
            <p className={styles.postDescription}>{post.description}</p>
            {post.tags.length > 0 && (
              <div className={styles.postTags}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.postTag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className={styles.empty}>
          {query.trim() ? "No posts match your search." : "No posts yet. Check back soon!"}
        </p>
      )}
    </main>
  );
}
