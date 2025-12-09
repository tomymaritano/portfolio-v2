import { PageLayout, PageHeader } from "@/components/PageLayout";
import styles from "./page.module.css";

interface Reason {
  title: string;
  description: string;
  evidence: string;
}

const reasons: Reason[] = [
  {
    title: "I ship under constraints",
    description:
      "Most of my work happens in environments with limited time, unclear requirements, or unreliable data. I've learned to make decisions that are good enough to move forward, while leaving room to adjust.",
    evidence: "See how I handled bad data in DólarGaucho →",
  },
  {
    title: "I think in systems, not features",
    description:
      "Before building, I understand how pieces connect. This means fewer surprises later, better architecture decisions, and systems that scale without rewrites.",
    evidence: "See my approach to technical systems →",
  },
  {
    title: "I own the outcome, not just the code",
    description:
      "Writing code is the easy part. Understanding what to build, why it matters, and how to validate it—that's where I focus. The goal is impact, not output.",
    evidence: "See how I think about product decisions →",
  },
  {
    title: "I communicate trade-offs clearly",
    description:
      "Every decision has costs. I make those visible, so stakeholders can make informed choices. No hidden tech debt, no 'we'll fix it later' without a plan.",
    evidence: "See real trade-offs I've documented →",
  },
];

const values = [
  "Clarity over cleverness",
  "Progress over perfection",
  "Decisions over debates",
  "Systems over features",
  "Ownership over handoffs",
];

export default function HirePage() {
  return (
    <PageLayout size="sm">
      <PageHeader
        badge="Work with me"
        title="Why People Hire Me"
        description="I build products that work under real-world constraints. Here's what that means in practice."
      />

      <section className={styles.reasonsSection}>
        <div className={styles.reasonsList}>
          {reasons.map((reason, index) => (
            <article key={index} className={styles.reasonCard}>
              <h2 className={styles.reasonTitle}>{reason.title}</h2>
              <p className={styles.reasonDescription}>{reason.description}</p>
              <span className={styles.reasonEvidence}>{reason.evidence}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.valuesSection}>
        <h2 className={styles.sectionTitle}>How I Work</h2>
        <ul className={styles.valuesList}>
          {values.map((value, index) => (
            <li key={index} className={styles.valueItem}>
              {value}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Want to work together?</h2>
        <p className={styles.ctaText}>
          I&apos;m open to interesting projects where I can own outcomes,
          not just write code. If you have something that needs building
          under real constraints, let&apos;s talk.
        </p>
        <div className={styles.ctaLinks}>
          <a
            href="mailto:hello@example.com"
            className={styles.primaryCta}
          >
            Get in touch
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryCta}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryCta}
          >
            GitHub
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
