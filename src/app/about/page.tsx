import type { Metadata } from "next";
import { About } from "@/components/About";
import { GitHubCalendar } from "@/components/GitHubCalendar";
import { NowPlaying } from "@/components/NowPlaying";
import { Experience } from "@/components/Experience";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Product Engineer based in Buenos Aires. Building fintech and developer tools.",
};

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <About />
      <div className={styles.divider} />
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Activity</h2>
        <div className={styles.card}>
          <GitHubCalendar username="tomymaritano" />
        </div>
      </section>
      <div className={styles.divider} />
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Listening</h2>
        <NowPlaying />
      </section>
      <div className={styles.divider} />
      <Experience variant="full" />
    </main>
  );
}
