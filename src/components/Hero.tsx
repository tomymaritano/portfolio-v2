"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Hero.module.css";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/tomasmaritano" },
  { name: "LinkedIn", href: "https://linkedin.com/in/tomasmaritano" },
  { name: "X", href: "https://x.com/tomasmaritano" },
  { name: "Email", href: "mailto:tomas@maritano.dev" },
];

export function Hero() {
  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className={styles.photoWrapper}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image
            src="/images/profile.png"
            alt="Tomas Maritano"
            width={160}
            height={160}
            className={styles.photo}
            priority
          />
        </motion.div>

        <div className={styles.intro}>
          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Tomas Maritano
          </motion.h1>

          <motion.p
            className={styles.role}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Product Engineer
          </motion.p>

          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            I turn ambiguity into shipped products.
            <br />
            <span className={styles.taglineAccent}>
              From fintech APIs to habit trackers, I build what others only plan.
            </span>
          </motion.p>
        </div>

        <motion.nav
          className={styles.links}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className={styles.socialLink}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {link.name}
            </motion.a>
          ))}
        </motion.nav>
      </motion.div>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <span className={styles.scrollText}>scroll</span>
        <motion.span
          className={styles.scrollArrow}
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
