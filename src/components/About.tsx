"use client";

import { motion } from "framer-motion";
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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
  },
};

export function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <motion.span
          className={styles.label}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
        >
          About
        </motion.span>

        <div className={styles.content}>
          <motion.p
            className={styles.bio}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            Product Engineer with 7+ years building digital products across
            <strong> Argentina</strong>, <strong>Denmark</strong>, <strong>Andorra</strong>,
            and <strong>the US</strong>. I&apos;ve led UX teams, managed products, and shipped
            code in fintech, e-commerce, and operations.
          </motion.p>

          <motion.p
            className={styles.bio}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            I work best in the ambiguous space between &quot;idea&quot; and &quot;shipped product&quot;.
            I design interfaces, write code, and make decisions when there&apos;s no playbook.
          </motion.p>

          <motion.p
            className={styles.bioMuted}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            Currently building tools that help people navigate complex financial systems.
          </motion.p>
        </div>

        <motion.div
          className={styles.stack}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
        >
          <span className={styles.stackLabel}>Tech I use</span>
          <div className={styles.stackGrid}>
            {techStack.map((tech, index) => (
              <motion.span
                key={tech.name}
                className={styles.techBadge}
                data-category={tech.category}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
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
