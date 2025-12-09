"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const hasImage = project.image && !imageError;

  return (
    <Link href={`/projects/${project.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {hasImage ? (
          <Image
            src={project.image!}
            alt={project.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.image}
            priority={priority}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderIcon}>{project.name.charAt(0)}</span>
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
  );
}
