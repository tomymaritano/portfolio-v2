"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { TextReveal } from "./TextReveal";
import styles from "./Hero.module.css";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/tomasmaritano" },
  { name: "LinkedIn", href: "https://linkedin.com/in/tomasmaritano" },
  { name: "X", href: "https://x.com/tomasmaritano" },
  { name: "Email", href: "mailto:tomas@maritano.dev" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className={styles.hero}>
      <motion.div
        className={styles.content}
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className={styles.photoWrapper}
          whileHover={{ scale: 1.05, rotate: 2 }}
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
          <motion.div
            className={styles.photoGlow}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <div className={styles.intro}>
          <h1 className={styles.name}>
            <TextReveal text="Tomas Maritano" delay={0.2} />
          </h1>

          <motion.p
            className={styles.role}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Product Engineer
          </motion.p>

          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
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
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className={styles.socialLink}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
              whileHover={{ y: -3, color: "var(--accent)" }}
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
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{ opacity }}
      >
        <span className={styles.scrollText}>scroll</span>
        <motion.span
          className={styles.scrollArrow}
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
