import Link from "next/link";
import styles from "./BlogSection.module.css";

interface Post {
  slug: string;
  title: string;
  date: string;
}

export function BlogSection({ posts }: { posts: Post[] }) {
  const recent = posts.slice(0, 3);
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recent Writing</h2>
        <Link href="/blog" className={styles.viewAll}>View all &rarr;</Link>
      </div>
      <div className={styles.list}>
        {recent.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.row}>
            <span className={styles.postTitle}>{post.title}</span>
            <span className={styles.date}>
              {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
