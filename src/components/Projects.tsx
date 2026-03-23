import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import styles from "./Projects.module.css";

interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: string;
  topics: string[];
  featured?: boolean;
}

export function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const totalCount = projects.length;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Featured Projects</h2>
        <Link href="/projects" className={styles.viewAll}>View all &rarr;</Link>
      </div>
      <div className={styles.grid}>
        {featured.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
        <Link href="/projects" className={styles.moreCard}>
          +{totalCount - featured.length} more projects &rarr;
        </Link>
      </div>
    </section>
  );
}
