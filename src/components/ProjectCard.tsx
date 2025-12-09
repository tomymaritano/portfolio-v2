"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./ProjectCard.module.css";

interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: "live" | "archived" | "learning";
  topics: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={`/projects/${project.slug}`} className={styles.link}>
        <div className={styles.screenshot}>
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>{project.name[0]}</span>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.name}>{project.name}</h3>
            <span className={styles.status} data-status={project.status}>
              {project.status}
            </span>
          </div>

          <p className={styles.tagline}>{project.tagline}</p>

          <div className={styles.topics}>
            {project.topics.slice(0, 3).map((topic) => (
              <span key={topic} className={styles.topic}>
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.arrow}>
          <span>→</span>
        </div>
      </Link>
    </motion.article>
  );
}
