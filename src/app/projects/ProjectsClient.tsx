"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import styles from "./page.module.css";

type Status = "all" | "live" | "experiment" | "learning" | "archived";

interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: string;
  topics: string[];
}

const filters: { label: string; value: Status }[] = [
  { label: "All", value: "all" },
  { label: "Live", value: "live" },
  { label: "Experiment", value: "experiment" },
  { label: "Learning", value: "learning" },
  { label: "Archived", value: "archived" },
];

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Status>("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.status === active);

  return (
    <>
      <div className={styles.filters}>
        {filters.map((f) => (
          <button
            key={f.value}
            className={`${styles.pill} ${active === f.value ? styles.active : ""}`}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className={styles.empty}>No projects with this status.</p>
      )}
    </>
  );
}
