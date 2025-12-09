import Link from "next/link";
import { notFound } from "next/navigation";
import { allDecisions } from "content-collections";
import { MDXContent } from "@/components/MDXContent";
import styles from "./page.module.css";

type Constraint = "ambiguity" | "time_pressure" | "bad_data" | "legacy" | "stakeholder_conflict";

const constraintInfo: Record<Constraint, { name: string; description: string }> = {
  ambiguity: {
    name: "Ambiguity",
    description: "When requirements are unclear and the path forward is uncertain",
  },
  time_pressure: {
    name: "Time Pressure",
    description: "When deadlines are aggressive and trade-offs are inevitable",
  },
  bad_data: {
    name: "Bad Data",
    description: "When the information you need is unreliable, incomplete, or wrong",
  },
  legacy: {
    name: "Legacy Systems",
    description: "When you need to modernize while keeping things running",
  },
  stakeholder_conflict: {
    name: "Stakeholder Conflict",
    description: "When different people want different things",
  },
};

interface PageProps {
  params: Promise<{ constraint: string }>;
}

export async function generateStaticParams() {
  return Object.keys(constraintInfo).map((constraint) => ({
    constraint,
  }));
}

export default async function ConstraintPage({ params }: PageProps) {
  const { constraint } = await params;

  if (!Object.keys(constraintInfo).includes(constraint)) {
    notFound();
  }

  const info = constraintInfo[constraint as Constraint];
  const decisions = allDecisions.filter((d) => d.constraint === constraint);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/think" className={styles.backLink}>
            ← All constraints
          </Link>
          <div className={styles.constraintLabel}>{info.name}</div>
          <h1 className={styles.title}>Thinking Under {info.name}</h1>
          <p className={styles.subtitle}>{info.description}</p>
        </header>

        {decisions.length > 0 ? (
          <div className={styles.decisionsSection}>
            <h2 className={styles.sectionTitle}>Decisions Made</h2>
            <div className={styles.decisionsList}>
              {decisions.map((decision) => (
                <article key={decision.id} className={styles.decisionCard}>
                  <header className={styles.decisionHeader}>
                    <h3 className={styles.decisionTitle}>{decision.decision}</h3>
                    {decision.projectSlug && (
                      <Link
                        href={`/projects/${decision.projectSlug}`}
                        className={styles.projectLink}
                      >
                        View project →
                      </Link>
                    )}
                  </header>
                  <p className={styles.decisionContext}>{decision.context}</p>
                  <MDXContent code={decision.mdx} className={styles.decisionContent} />
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No decisions documented for this constraint yet.</p>
            <p className={styles.emptyHint}>
              This is where I&apos;ll add real examples of decisions made under this constraint.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
