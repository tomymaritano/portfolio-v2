import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.description}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className={styles.links}>
          <Link href="/" className={styles.primaryLink}>
            ← Back to home
          </Link>
          <Link href="/projects" className={styles.secondaryLink}>
            View projects
          </Link>
        </div>

        {/* Terminal hint */}
        <div className={styles.hint}>
          <span className={styles.hintIcon}>💡</span>
          <span>
            Press <code>`</code> to open the terminal and explore
          </span>
        </div>
      </div>
    </main>
  );
}
