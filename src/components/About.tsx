"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import styles from "./About.module.css";

const techStack = [
  { name: "TypeScript", category: "language" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "PostgreSQL", category: "database" },
  { name: "Supabase", category: "backend" },
  { name: "Figma", category: "design" },
  { name: "Framer", category: "design" },
];

// Paragraph with scroll-based word reveal
function ScrollParagraph({ text, scrollYProgress, className }: {
  text: string;
  scrollYProgress: MotionValue<number>;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <p className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} />
        );
      })}
    </p>
  );
}

// Single word component
function Word({ word, range, progress }: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span className={styles.word} style={{ opacity }}>
      {word}
    </motion.span>
  );
}

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const para1 = "Product Engineer with 7+ years building digital products across Argentina, Denmark, Andorra, and the US. I've led UX teams, managed products, and shipped code in fintech, e-commerce, and operations.";
  const para2 = "I work best in the ambiguous space between \"idea\" and \"shipped product\". I design interfaces, write code, and make decisions when there's no playbook.";
  const para3 = "Currently building tools that help people navigate complex financial systems.";

  return (
    <section ref={containerRef} className={styles.about} id="about">
      <div className={styles.container}>
        <motion.h2
          className={styles.label}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          About
        </motion.h2>

        <div className={styles.content}>
          <ScrollParagraph
            text={para1}
            scrollYProgress={scrollYProgress}
            className={styles.bio}
          />

          <ScrollParagraph
            text={para2}
            scrollYProgress={scrollYProgress}
            className={styles.bio}
          />

          <ScrollParagraph
            text={para3}
            scrollYProgress={scrollYProgress}
            className={styles.bioMuted}
          />
        </div>

        <motion.div
          className={styles.stack}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.stackLabel}>Tech I use</span>
          <div className={styles.stackGrid}>
            {techStack.map((tech, index) => (
              <motion.span
                key={tech.name}
                className={styles.techBadge}
                data-category={tech.category}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.4,
                  type: "spring" as const,
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.08,
                  backgroundColor: "var(--accent-muted)",
                }}
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
