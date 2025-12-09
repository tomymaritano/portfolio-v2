"use client";

import { useState, useMemo, useCallback } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BlogSearch } from "@/components/BlogSearch";
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

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const isFiltering = query.trim().length > 0;

  return (
    <>
      <BlogSearch
        onQueryChange={handleQueryChange}
        resultCount={isFiltering ? filteredPosts.length : undefined}
      />

      <motion.div className={styles.posts} layout>
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.3,
                delay: isFiltering ? index * 0.05 : 0,
                layout: { duration: 0.3 }
              }}
            >
              <Link href={`/blog/${post.slug}`} className={styles.postCard}>
                <article>
                  <div className={styles.postMeta}>
                    <time className={styles.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    {post.tags.length > 0 && (
                      <div className={styles.tags}>
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <p className={styles.postDescription}>{post.description}</p>
                  <span className={styles.readMore}>Read more →</span>
                </article>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredPosts.length === 0 && !isFiltering && (
        <p className={styles.empty}>No posts yet. Check back soon!</p>
      )}
    </>
  );
}
