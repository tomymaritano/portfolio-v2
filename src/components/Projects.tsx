"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import styles from "./Projects.module.css";

interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: "live" | "archived" | "learning" | "experiment";
  topics: string[];
  complexity: "foundational" | "intermediate" | "advanced";
  image?: string;
  featured?: boolean;
}

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  // Show featured projects first, then take first 2
  const featuredProjects = [...projects]
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    .slice(0, 2);

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className={styles.label}>Featured Work</span>
          <p className={styles.description}>
            Projects I&apos;ve built from concept to production
          </p>
        </motion.header>

        <div className={styles.grid}>
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index === 0} index={index} />
          ))}
        </div>

        {projects.length > 2 && (
          <motion.div
            className={styles.viewAll}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link href="/projects" className={styles.viewAllLink}>
              View all projects →
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
