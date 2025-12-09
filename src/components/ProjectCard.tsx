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
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className={styles.card}>
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
    </Link>
  );
}
