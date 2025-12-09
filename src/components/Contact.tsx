"use client";

import { motion } from "framer-motion";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <span className={styles.label}>Contact</span>

        <h2 className={styles.title}>Let&apos;s build something together</h2>

        <p className={styles.description}>
          I&apos;m open to new opportunities, collaborations, and interesting
          conversations about product and engineering.
        </p>

        <div className={styles.actions}>
          <motion.a
            href="mailto:tomas@maritano.dev"
            className={styles.primaryButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className={styles.buttonIcon}>✉</span>
            Send me an email
          </motion.a>

          <div className={styles.secondaryLinks}>
            <motion.a
              href="https://linkedin.com/in/tomasmaritano"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryLink}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
            >
              LinkedIn
            </motion.a>
            <span className={styles.dot}>·</span>
            <motion.a
              href="https://github.com/tomasmaritano"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryLink}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
            >
              GitHub
            </motion.a>
            <span className={styles.dot}>·</span>
            <motion.a
              href="https://x.com/tomasmaritano"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryLink}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
            >
              X
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
