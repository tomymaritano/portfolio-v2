"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { siteConfig } from "@/config/site";
import { TextReveal } from "./TextReveal";
import styles from "./Hero.module.css";

const floatingMessages = [
  { text: "Ship it 🚀", position: "top-left", delay: 0 },
  { text: "Let's iterate", position: "top-right", delay: 0.5 },
  { text: "MVP first", position: "middle-left", delay: 1 },
  { text: "User feedback?", position: "middle-right", delay: 1.5 },
  { text: "Clean code ✓", position: "bottom-left", delay: 2 },
  { text: "Deployed!", position: "bottom-right", delay: 2.5 },
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
            className={`${styles.messageBubble} ${styles[msg.position.replace("-", "")]}`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: [0, 0.15, 0.15, 0],
              scale: [0.8, 1, 1, 0.9],
              y: [20, 0, -10, -20]
            }}
            transition={{
              duration: 8,
              delay: msg.delay,
              repeat: Infinity,
              repeatDelay: 4,
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
