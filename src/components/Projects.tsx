"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import styles from "./Projects.module.css";

interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: "live" | "archived" | "learning";
  topics: string[];
}

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  // Show only featured projects (first 4)
  const featuredProjects = projects.slice(0, 4);

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.label}>Featured Work</span>
          <p className={styles.description}>
            Projects I&apos;ve built from concept to production
          </p>
        </motion.div>

        <div className={styles.grid}>
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {projects.length > 4 && (
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
