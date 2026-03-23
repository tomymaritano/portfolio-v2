import Link from "next/link";
import styles from "./BlogSection.module.css";

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string;
}

export function BlogSection({ posts }: { posts: Post[] }) {
  const recent = posts.slice(0, 3);
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Writing</h2>
        <Link href="/blog" className={styles.viewAll}>View all &rarr;</Link>
      </div>
      <div className={styles.grid}>
        {recent.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
            {post.image && (
              <div className={styles.imageWrapper}>
                <img src={post.image} alt={post.title} className={styles.image} loading="lazy" />
              </div>
            )}
            <div className={styles.cardBody}>
              <span className={styles.date}>
                {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p className={styles.description}>{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
