"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
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

        <h2 className={styles.title}>{siteConfig.contact.title}</h2>

        <p className={styles.description}>
          {siteConfig.contact.description}
        </p>

        <div className={styles.actions}>
          <motion.a
            href={siteConfig.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {siteConfig.contact.calendlyText}
          </motion.a>
          <span className={styles.microCopy}>{siteConfig.contact.calendlyMicro}</span>

          <motion.a
            href={`mailto:${siteConfig.email}`}
            className={styles.emailButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {siteConfig.contact.emailText}
          </motion.a>

          <div className={styles.secondaryLinks}>
            <motion.a
              href={siteConfig.social.linkedin}
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
              href={siteConfig.social.github}
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
              href={siteConfig.social.twitter}
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
