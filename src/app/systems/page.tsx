import Link from "next/link";
import styles from "./page.module.css";

export default function SystemsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/" className={styles.backLink}>
            ← Back to home
          </Link>
          <h1 className={styles.title}>Technical Systems</h1>
          <p className={styles.subtitle}>
            How I design and build systems that scale.
          </p>
        </header>

        <div className={styles.comingSoon}>
          <div className={styles.badge}>Coming Soon</div>
          <h2 className={styles.comingSoonTitle}>Under Construction</h2>
          <p className={styles.comingSoonText}>
            This section will document my approach to technical architecture,
            system design patterns, and implementation strategies.
          </p>
          <div className={styles.preview}>
            <h3 className={styles.previewTitle}>What to expect:</h3>
            <ul className={styles.previewList}>
              <li>Architecture decision records</li>
              <li>System design patterns I use</li>
              <li>Technology choices and trade-offs</li>
              <li>Scaling strategies</li>
              <li>Performance optimization approaches</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
