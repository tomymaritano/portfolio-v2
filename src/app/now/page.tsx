import type { Metadata } from "next";
import { PageLayout, PageHeader } from "@/components/PageLayout";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm currently focused on, building, and learning.",
};

const now = {
  focus: "Building product experiences in fintech",
  building: [
    { name: "Portfolio v2", description: "This site you're looking at" },
    { name: "DólarGaucho", description: "Real-time currency tracking for Argentina" },
  ],
  learning: [
    { name: "System Design", description: "Scalable architecture patterns" },
    { name: "AI/ML", description: "LLMs and practical applications" },
  ],
  reading: {
    title: "Shape Up",
    author: "Basecamp",
    link: "https://basecamp.com/shapeup",
  },
  location: "Buenos Aires, Argentina",
  lastUpdated: "December 2024",
};

export default function NowPage() {
  return (
    <PageLayout size="sm">
      <PageHeader
        badge="Current"
        title="Now"
        description="What I'm focused on right now. Inspired by Derek Sivers' /now page movement."
      />

      {/* Focus */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.icon}>🎯</span>
          Focus
        </h2>
        <p className={styles.focusText}>{now.focus}</p>
      </section>

      {/* Building */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.icon}>🔨</span>
          Building
        </h2>
        <ul className={styles.list}>
          {now.building.map((item) => (
            <li key={item.name} className={styles.listItem}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemDescription}>{item.description}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Learning */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.icon}>📚</span>
          Learning
        </h2>
        <ul className={styles.list}>
          {now.learning.map((item) => (
            <li key={item.name} className={styles.listItem}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemDescription}>{item.description}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Reading */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.icon}>📖</span>
          Reading
        </h2>
        <a
          href={now.reading.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.readingCard}
        >
          <span className={styles.bookTitle}>{now.reading.title}</span>
          <span className={styles.bookAuthor}>by {now.reading.author}</span>
        </a>
      </section>

      {/* Location */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.icon}>📍</span>
          Location
        </h2>
        <p className={styles.locationText}>{now.location}</p>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.updated}>
          Last updated: <time>{now.lastUpdated}</time>
        </p>
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.aboutNow}
        >
          What is a /now page?
        </a>
      </footer>
    </PageLayout>
  );
}
