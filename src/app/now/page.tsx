"use client";

import { motion } from "framer-motion";
import { PageLayout, PageHeader, PageSection } from "@/components/PageLayout";
import nowData from "@/content/now.json";
import styles from "./page.module.css";

const now = nowData;

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function NowPage() {
  return (
    <PageLayout size="md">
      <PageHeader
        badge="Current"
        title="Now"
        description={
          <>
            What I&apos;m focused on right now. Inspired by Derek Sivers&apos;{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              /now page movement
            </a>
            .
          </>
        }
      />

      {/* Focus */}
      <PageSection title="Focus">
        <p className={styles.focusText}>{now.focus}</p>
      </PageSection>

      {/* Building */}
      <PageSection title="Building">
        <ul className={styles.list}>
          {now.building.map((item, index) => (
            <motion.li
              key={item.name}
              className={styles.listItem}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemDescription}>{item.description}</span>
            </motion.li>
          ))}
        </ul>
      </PageSection>

      {/* Learning */}
      <PageSection title="Learning">
        <ul className={styles.list}>
          {now.learning.map((item, index) => (
            <motion.li
              key={item.name}
              className={styles.listItem}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemDescription}>{item.description}</span>
            </motion.li>
          ))}
        </ul>
      </PageSection>

      {/* Reading */}
      <PageSection title="Reading">
        <motion.a
          href={now.reading.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.readingCard}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <span className={styles.bookTitle}>{now.reading.title}</span>
          <span className={styles.bookAuthor}>by {now.reading.author}</span>
          <span className={styles.arrow}>→</span>
        </motion.a>
      </PageSection>

      {/* Location */}
      <PageSection title="Location">
        <p className={styles.locationText}>{now.location}</p>
      </PageSection>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.updated}>
          Last updated: <time>{now.lastUpdated}</time>
        </p>
      </footer>
    </PageLayout>
  );
}
