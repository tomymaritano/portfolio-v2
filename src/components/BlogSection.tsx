"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./BlogSection.module.css";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

interface BlogSectionProps {
  posts: Post[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  const latestPosts = posts.slice(0, 3);

  return (
    <section className={styles.section} id="blog">
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.header}>
          <span className={styles.label}>Blog</span>
          <h2 className={styles.title}>Recent thoughts</h2>
        </div>

        <div className={styles.posts}>
          {latestPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              className={styles.post}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ x: 4 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                <time className={styles.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <span className={styles.arrow}>→</span>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          className={styles.viewAll}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <Link href="/blog" className={styles.viewAllLink}>
            View all posts →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
