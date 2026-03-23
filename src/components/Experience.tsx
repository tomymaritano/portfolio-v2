import experienceData from "@/content/experience.json";
import styles from "./Experience.module.css";

export function Experience({ variant = "compact" }: { variant?: "compact" | "full" }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Experience</h2>
      <div className={styles.list}>
        {experienceData.map((job) => (
          <div key={job.company} className={styles.entry}>
            <span className={styles.period}>{job.period}</span>
            <div className={styles.details}>
              <div className={styles.role}>{job.role}</div>
              <div className={styles.company}>{job.company} · {job.location}</div>
              {variant === "full" && job.highlights && (
                <p className={styles.description}>{job.highlights.join(". ")}.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
