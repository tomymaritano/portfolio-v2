"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectCard.module.css";

interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: "live" | "archived" | "learning";
  topics: string[];
  complexity: "foundational" | "intermediate" | "advanced";
  image?: string;
}

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  index?: number;
}

export function ProjectCard({ project, priority = false, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <Link href={`/projects/${project.slug}`} className={styles.card}>
        <div className={styles.imageWrapper}>
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
              className={styles.image}
              priority={priority}
            />
          ) : (
            <div className={styles.placeholder}>
              <span>{project.name[0]}</span>
            </div>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.status} data-status={project.status}>
              {project.status}
            </span>
            <span className={styles.complexity}>{project.complexity}</span>
          </div>

          <h3 className={styles.title}>{project.name}</h3>
          <p className={styles.tagline}>{project.tagline}</p>

          <div className={styles.topics}>
            {project.topics.slice(0, 3).map((topic) => (
              <span key={topic} className={styles.topic}>
                {topic}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
