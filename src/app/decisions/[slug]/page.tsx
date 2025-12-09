import { allAdrs } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageLayout } from "@/components/PageLayout";
import styles from "../page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allAdrs.map((adr) => ({
    slug: adr.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const adr = allAdrs.find((a) => a.slug === slug);

  if (!adr) return { title: "Decision Not Found" };

  return {
    title: `${adr.title} | Decision Log`,
    description: adr.context,
  };
}

export default async function DecisionPage({ params }: Props) {
  const { slug } = await params;
  const adr = allAdrs.find((a) => a.slug === slug);

  if (!adr) notFound();

  const statusColors: Record<string, string> = {
    accepted: "accepted",
    proposed: "proposed",
    superseded: "superseded",
    deprecated: "deprecated",
  };

  return (
    <PageLayout size="sm">
      <div className={styles.detail}>
        <header className={styles.detailHeader}>
          <Link href="/decisions" className={styles.backLink}>
            ← Back to decisions
          </Link>
          <div className={styles.meta}>
            <span
              className={styles.status}
              data-status={statusColors[adr.status]}
            >
              {adr.status}
            </span>
            <time className={styles.date}>
              {new Date(adr.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h1 className={styles.detailTitle}>{adr.title}</h1>
          <div className={styles.tags}>
            {adr.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Context</span>
            <p className={styles.summaryValue}>{adr.context}</p>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Decision</span>
            <p className={styles.summaryValue}>{adr.decision}</p>
          </div>
        </div>

        {adr.consequences.length > 0 && (
          <div className={styles.consequences}>
            <h2 className={styles.consequencesTitle}>Consequences</h2>
            <ul className={styles.consequencesList}>
              {adr.consequences.map((consequence, i) => {
                const type = consequence.toLowerCase().startsWith("pro:")
                  ? "pro"
                  : consequence.toLowerCase().startsWith("con:")
                    ? "con"
                    : "neutral";
                return (
                  <li key={i} className={styles.consequence} data-type={type}>
                    {consequence}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <article className={styles.content}>
          <MDXContent code={adr.mdx} />
        </article>

        <footer className={styles.footer}>
          <Link href="/decisions" className={styles.backLink}>
            ← Back to all decisions
          </Link>
        </footer>
      </div>
    </PageLayout>
  );
}
