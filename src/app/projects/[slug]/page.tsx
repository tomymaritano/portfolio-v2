import { allProjects } from "content-collections";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import Link from "next/link";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.name} | Tomas Maritano`,
    description: project.tagline,
  };
}

const statusClass: Record<string, string> = {
  live: styles.live,
  experiment: styles.experiment,
  learning: styles.learning,
  archived: styles.archived,
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <main className={styles.main}>
      <Link href="/projects" className={styles.backLink}>
        &larr; Back to projects
      </Link>

      <header className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{project.name}</h1>
          <span
            className={`${styles.statusBadge} ${statusClass[project.status] || ""}`}
          >
            {project.status}
          </span>
        </div>
        <p className={styles.tagline}>{project.tagline}</p>
        <div className={styles.topics}>
          {project.topics.map((topic) => (
            <span key={topic} className={styles.topic}>
              {topic}
            </span>
          ))}
        </div>
      </header>

      <article className={styles.content}>
        <MDXContent code={project.mdx} />
      </article>
    </main>
  );
}
