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
  image?: string;
}

export function BlogClient({ posts }: { posts: Post[] }) {
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
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Blog</h1>
          <p className={styles.pageSubtitle}>
            Thoughts on building software, tools, and products.
          </p>
        </div>
        <input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.grid}>
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={styles.card}
          >
            {post.image && (
              <div className={styles.imageWrapper}>
                <img src={post.image} alt={post.title} className={styles.image} loading="lazy" />
              </div>
            )}
            <div className={styles.cardBody}>
              <time className={styles.postDate}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <h2 className={styles.postTitle}>{post.title}</h2>
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
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className={styles.empty}>
          {query.trim() ? "No posts match your search." : "No posts yet."}
        </p>
      )}
    </main>
  );
}
