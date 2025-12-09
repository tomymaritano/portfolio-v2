"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { siteConfig } from "@/config/site";
import { TextReveal } from "./TextReveal";
import styles from "./Hero.module.css";

const floatingMessages = [
  // Product & UX work
  { text: "UX redesign shipped 🚀", type: "sent", position: "pos1", delay: 0, rotate: -2, duration: 5 },
  { text: "Users love the new flow!", type: "received", position: "pos2", delay: 0.5, rotate: 1, duration: 6 },
  { text: "Prototype ready for review", type: "sent", position: "pos3", delay: 1, rotate: 2, duration: 5.5 },
  { text: "Conversions up 40%", type: "received", position: "pos4", delay: 1.5, rotate: -1, duration: 4.5 },

  // Startup & Business
  { text: "MVP deployed to prod", type: "sent", position: "pos5", delay: 2, rotate: 1, duration: 5 },
  { text: "Investors impressed!", type: "received", position: "pos6", delay: 2.5, rotate: -2, duration: 6 },
  { text: "Feature complete ✓", type: "sent", position: "pos7", delay: 3, rotate: -1, duration: 4.5 },
  { text: "Product-market fit 🎯", type: "received", position: "pos8", delay: 3.5, rotate: 2, duration: 5.5 },

  // Technical conversations
  { text: "Next.js app optimized", type: "sent", position: "pos9", delay: 4, rotate: 2, duration: 5 },
  { text: "Performance looks great", type: "received", position: "pos10", delay: 4.5, rotate: -1, duration: 5.5 },
  { text: "API integration done", type: "sent", position: "pos11", delay: 5, rotate: -2, duration: 6 },
  { text: "Tests all passing 💚", type: "received", position: "pos12", delay: 5.5, rotate: 1, duration: 4.5 },

  // Team & Leadership
  { text: "Design system updated", type: "sent", position: "pos13", delay: 6, rotate: 1, duration: 5.5 },
  { text: "Team velocity 📈", type: "received", position: "pos14", delay: 6.5, rotate: -2, duration: 5 },
  { text: "Sprint goals achieved", type: "sent", position: "pos15", delay: 7, rotate: 2, duration: 6 },
  { text: "Stakeholders aligned ✓", type: "received", position: "pos16", delay: 7.5, rotate: -1, duration: 4.5 },

  // User feedback & Growth
  { text: "User research insights", type: "sent", position: "pos17", delay: 8, rotate: -1, duration: 5 },
  { text: "NPS score: 72!", type: "received", position: "pos18", delay: 8.5, rotate: 2, duration: 5.5 },
  { text: "Shipped to 10k users", type: "sent", position: "pos19", delay: 9, rotate: 1, duration: 6 },
  { text: "Retention looks solid", type: "received", position: "pos20", delay: 9.5, rotate: -2, duration: 4.5 },
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
      {/* Floating message bubbles */}
      <div className={styles.floatingMessages}>
        {floatingMessages.map((msg, index) => (
          <motion.div
            key={index}
            className={`${styles.messageBubble} ${styles[msg.type]} ${styles[msg.position]}`}
            initial={{ opacity: 0, scale: 0.8, y: 10, rotate: 0 }}
            animate={{
              opacity: [0, msg.type === "sent" ? 0.85 : 0.65, msg.type === "sent" ? 0.85 : 0.65, 0],
              scale: [0.8, 1, 1, 0.95],
              y: [10, 0, -5, -10],
              rotate: [0, msg.rotate, msg.rotate, 0],
            }}
            transition={{
              duration: msg.duration,
              delay: msg.delay,
              repeat: Infinity,
              repeatDelay: msg.duration,
              ease: "easeInOut"
            }}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>

      <motion.div
        className={styles.content}
        style={{ y, opacity }}
      >
        {/* Photo with animated ring */}
        <motion.div
          className={styles.photoWrapper}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.2
          }}
          whileHover={{ scale: 1.05 }}
        >
          <div className={styles.photoRing} />
          <Image
            src={siteConfig.hero.photo}
            alt={siteConfig.name}
            width={120}
            height={120}
            className={styles.photo}
            priority
          />
        </motion.div>

        <div className={styles.intro}>
          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          >
            {siteConfig.name}
          </motion.h1>

          <motion.p
            className={styles.role}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {siteConfig.role}
          </motion.p>

          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {siteConfig.tagline}
            <br />
            <motion.span
              className={styles.taglineAccent}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              {siteConfig.taglineAccent}
            </motion.span>
          </motion.p>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.a
              href={siteConfig.hero.ctas.primary.href}
              className={styles.ctaPrimary}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {siteConfig.hero.ctas.primary.label}
            </motion.a>
            <motion.a
              href={siteConfig.hero.ctas.secondary.href}
              className={styles.ctaSecondary}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {siteConfig.hero.ctas.secondary.label}
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
