import { PageLayout, PageHeader } from "@/components/PageLayout";
import styles from "./page.module.css";

export default function SystemsPage() {
  return (
    <PageLayout size="md">
      <PageHeader
        badge="Architecture"
        title="Technical Systems"
        description="How I design and build systems that scale."
      />

      <div className={styles.comingSoon}>
        <span className={styles.comingBadge}>Coming Soon</span>
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
    </PageLayout>
  );
}
