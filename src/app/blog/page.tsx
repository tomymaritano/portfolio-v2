import { allPosts } from "content-collections";
import { BlogSearch } from "@/components/BlogSearch";
import Link from "next/link";
import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on product engineering, AI, and building things that ship.",
};

export default function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/" className={styles.backLink}>
            ← Back
          </Link>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.description}>
            Thoughts on product engineering, AI, and building things that ship.
          </p>
        </header>

        <BlogSearch
          posts={posts.map((p) => ({
            slug: p.slug,
            title: p.title,
            description: p.description,
            tags: p.tags,
          }))}
        />

        <div className={styles.posts}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={styles.postCard}
            >
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
          ))}
        </div>
      </div>
    </main>
  );
}
