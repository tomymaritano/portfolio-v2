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
      <div className={styles.container}>
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className={styles.label}>Blog</span>
          <p className={styles.title}>Recent thoughts</p>
        </motion.header>

        <div className={styles.posts}>
          {latestPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              className={styles.post}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
                filter: "blur(4px)"
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)"
              }}
              whileHover={{ x: 8, scale: 1.02 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                delay: index * 0.12,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
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
      </div>
    </section>
  );
}
