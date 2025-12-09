"use client";

import { motion } from "framer-motion";
import nowData from "@/content/now.json";
import styles from "./page.module.css";

const now = nowData;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function NowPage() {
  return (
    <div className={styles.page}>
      <motion.div
        className={styles.container}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.header className={styles.header} variants={itemVariants}>
          <span className={styles.badge}>Current</span>
          <h1 className={styles.title}>Now</h1>
          <p className={styles.description}>
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
          </p>
        </motion.header>

        {/* Focus */}
        <motion.section className={styles.section} variants={itemVariants}>
          <h2 className={styles.sectionTitle}>Focus</h2>
          <p className={styles.focusText}>{now.focus}</p>
        </motion.section>

        {/* Building */}
        <motion.section className={styles.section} variants={itemVariants}>
          <h2 className={styles.sectionTitle}>Building</h2>
          <ul className={styles.list}>
            {now.building.map((item, index) => (
              <motion.li
                key={item.name}
                className={styles.listItem}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemDescription}>{item.description}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Learning */}
        <motion.section className={styles.section} variants={itemVariants}>
          <h2 className={styles.sectionTitle}>Learning</h2>
          <ul className={styles.list}>
            {now.learning.map((item, index) => (
              <motion.li
                key={item.name}
                className={styles.listItem}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemDescription}>{item.description}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Reading */}
        <motion.section className={styles.section} variants={itemVariants}>
          <h2 className={styles.sectionTitle}>Reading</h2>
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
        </motion.section>

        {/* Location */}
        <motion.section className={styles.section} variants={itemVariants}>
          <h2 className={styles.sectionTitle}>Location</h2>
          <p className={styles.locationText}>{now.location}</p>
        </motion.section>

        {/* Footer */}
        <motion.footer className={styles.footer} variants={itemVariants}>
          <p className={styles.updated}>
            Last updated: <time>{now.lastUpdated}</time>
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
