import Link from "next/link";
import { allProjects } from "content-collections";
import type { Metadata } from "next";
import { PageLayout, PageHeader } from "@/components/PageLayout";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of digital products, from fintech applications to developer tools.",
};

export default function ProjectsPage() {
  const liveProjects = allProjects.filter((p) => p.status === "live");
  const archivedProjects = allProjects.filter((p) => p.status === "archived");
  const learningProjects = allProjects.filter((p) => p.status === "learning");

  return (
    <PageLayout size="lg">
      <PageHeader
        badge="Portfolio"
        title="Projects"
        description="A collection of products I've built, from concept to deployment. Each project represents a different challenge and set of learnings."
      />

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{allProjects.length}</span>
            <span className={styles.statLabel}>Total Projects</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{liveProjects.length}</span>
            <span className={styles.statLabel}>Live</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{archivedProjects.length}</span>
            <span className={styles.statLabel}>Archived</span>
          </div>
        </div>

        {/* Live Projects */}
        {liveProjects.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.statusDot} data-status="live" />
              Live Projects
            </h2>
            <div className={styles.grid}>
              {liveProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Archived Projects */}
        {archivedProjects.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.statusDot} data-status="archived" />
              Archived
            </h2>
            <div className={styles.grid}>
              {archivedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Learning Projects */}
        {learningProjects.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.statusDot} data-status="learning" />
              Learning Experiments
            </h2>
            <div className={styles.grid}>
              {learningProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        )}
    </PageLayout>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof allProjects)[number];
}) {
  return (
    <Link href={`/projects/${project.slug}`} className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardStatus} data-status={project.status}>
          {project.status}
        </span>
        <span className={styles.cardComplexity}>{project.complexity}</span>
      </div>
      <h3 className={styles.cardTitle}>{project.name}</h3>
      <p className={styles.cardTagline}>{project.tagline}</p>
      <div className={styles.cardTopics}>
        {project.topics.slice(0, 3).map((topic) => (
          <span key={topic} className={styles.topic}>
            {topic}
          </span>
        ))}
      </div>
    </Link>
  );
}
