"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { siteConfig } from "@/config/site";
import { TextReveal } from "./TextReveal";
import styles from "./Hero.module.css";

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
            src={siteConfig.hero.photo}
            alt={siteConfig.name}
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
            <TextReveal text={siteConfig.name} delay={0.2} />
          </h1>

          <motion.p
            className={styles.role}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {siteConfig.role}
          </motion.p>

          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {siteConfig.tagline}
            <br />
            <span className={styles.taglineAccent}>
              {siteConfig.taglineAccent}
            </span>
          </motion.p>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
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
