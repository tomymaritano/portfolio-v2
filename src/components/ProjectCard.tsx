import Link from "next/link";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  slug: string;
  name: string;
  tagline: string;
  status: string;
  topics: string[];
  image?: string;
}

export function ProjectCard({ project }: { project: ProjectCardProps }) {
  const { slug, name, tagline, status, topics, image } = project;
  return (
    <Link href={`/projects/${slug}`} className={styles.card}>
      {image && (
        <div className={styles.imageWrapper}>
          <img src={image} alt={name} className={styles.image} loading="lazy" />
        </div>
      )}
      <div className={styles.body}>
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
      </div>
    </Link>
  );
}
