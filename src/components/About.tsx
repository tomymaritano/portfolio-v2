"use client";

import { motion } from "framer-motion";
import { BentoGrid } from "./BentoGrid";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function About() {
  return (
    <section className={styles.about} id="about">
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.span className={styles.label} variants={itemVariants}>
          About
        </motion.span>

        <motion.div className={styles.content} variants={itemVariants}>
          <p className={styles.bio}>
            Product Engineer with 7+ years building digital products across
            <strong> Argentina</strong>, <strong>Denmark</strong>, <strong>Andorra</strong>,
            and <strong>the US</strong>. I&apos;ve led UX teams, managed products, and shipped
            code in fintech, e-commerce, and operations.
          </p>

          <p className={styles.bio}>
            I work best in the ambiguous space between &quot;idea&quot; and &quot;shipped product&quot;.
            I design interfaces, write code, and make decisions when there&apos;s no playbook.
          </p>

          <p className={styles.bioMuted}>
            Currently building tools that help people navigate complex financial systems.
          </p>
        </motion.div>

        <motion.div className={styles.bentoWrapper} variants={itemVariants}>
          <BentoGrid />
        </motion.div>

        <motion.div className={styles.stack} variants={itemVariants}>
          <span className={styles.stackLabel}>Tech I use</span>
          <div className={styles.stackGrid}>
            {techStack.map((tech) => (
              <motion.span
                key={tech.name}
                className={styles.techBadge}
                data-category={tech.category}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
