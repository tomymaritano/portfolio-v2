import { allProjects } from "content-collections";
import { ProjectsClient } from "./ProjectsClient";
import styles from "./page.module.css";

export const metadata = {
  title: "Projects",
  description: "Things I've built, shipped, and experimented with.",
};

export default function ProjectsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>Things I&apos;ve built, shipped, and experimented with.</p>
      </div>
      <ProjectsClient projects={allProjects} />
    </main>
  );
}
