import { allProjects } from "content-collections";
import type { Metadata } from "next";
import { PageLayout, PageHeader } from "@/components/PageLayout";
import { ProjectCard } from "@/components/ProjectCard";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of digital products, from fintech applications to developer tools.",
};

export default function ProjectsPage() {
  const liveProjects = allProjects.filter((p) => p.status === "live");
  const experimentProjects = allProjects.filter((p) => p.status === "experiment");
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
            {liveProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} priority={index === 0} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Experiment Projects */}
      {experimentProjects.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.statusDot} data-status="experiment" />
            Experiments
          </h2>
          <div className={styles.grid}>
            {experimentProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
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
            {archivedProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
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
            {learningProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>
      )}
    </PageLayout>
  );
}
