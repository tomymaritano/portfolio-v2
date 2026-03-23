import Link from "next/link";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  slug: string;
  name: string;
  tagline: string;
  status: string;
  topics: string[];
}

export function ProjectCard({ project }: { project: ProjectCardProps }) {
  const { slug, name, tagline, status, topics } = project;
  return (
    <Link href={`/projects/${slug}`} className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <span className={`${styles.badge} ${styles[status] || ""}`}>{status}</span>
      </div>
      <p className={styles.tagline}>{tagline}</p>
      <div className={styles.topics}>
        {topics.slice(0, 3).map((t) => (
          <span key={t} className={styles.topic}>{t}</span>
        ))}
      </div>
    </Link>
  );
}
