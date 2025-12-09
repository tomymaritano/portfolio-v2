import { allAdrs } from "content-collections";
import { PageLayout, PageHeader } from "@/components/PageLayout";
import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Decision Log | Tomas Maritano",
  description: "Architecture Decision Records - documenting technical decisions with context, trade-offs, and outcomes.",
};

export default function DecisionsPage() {
  const sortedAdrs = [...allAdrs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const statusColors: Record<string, string> = {
    accepted: "accepted",
    proposed: "proposed",
    superseded: "superseded",
    deprecated: "deprecated",
  };

  return (
    <PageLayout size="md">
      <PageHeader
        badge="Engineering"
        title="Decision Log"
        description="Architecture Decision Records documenting technical choices with context, trade-offs, and outcomes."
      />

      <div className={styles.list}>
        {sortedAdrs.map((adr) => (
          <Link
            key={adr.slug}
            href={`/decisions/${adr.slug}`}
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <span
                className={styles.status}
                data-status={statusColors[adr.status]}
              >
                {adr.status}
              </span>
              <time className={styles.date}>
                {new Date(adr.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              </time>
            </div>
            <h2 className={styles.title}>{adr.title}</h2>
            <p className={styles.context}>{adr.context}</p>
            <div className={styles.tags}>
              {adr.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {sortedAdrs.length === 0 && (
        <p className={styles.empty}>No decisions documented yet.</p>
      )}
    </PageLayout>
  );
}
