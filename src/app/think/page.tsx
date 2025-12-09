import Link from "next/link";
import { PageLayout, PageHeader } from "@/components/PageLayout";
import styles from "./page.module.css";

interface Constraint {
  id: string;
  name: string;
  description: string;
  examples: string[];
}

const constraints: Constraint[] = [
  {
    id: "ambiguity",
    name: "Ambiguity",
    description: "When requirements are unclear and the path forward is uncertain",
    examples: ["Undefined scope", "Changing stakeholder expectations", "Unknown user needs"],
  },
  {
    id: "time_pressure",
    name: "Time Pressure",
    description: "When deadlines are aggressive and trade-offs are inevitable",
    examples: ["MVP decisions", "Quick iterations", "Resource constraints"],
  },
  {
    id: "bad_data",
    name: "Bad Data",
    description: "When the information you need is unreliable, incomplete, or wrong",
    examples: ["Unreliable APIs", "Inconsistent sources", "Missing historical data"],
  },
  {
    id: "legacy",
    name: "Legacy Systems",
    description: "When you need to modernize while keeping things running",
    examples: ["Tech debt", "Migration strategies", "Backward compatibility"],
  },
  {
    id: "stakeholder_conflict",
    name: "Stakeholder Conflict",
    description: "When different people want different things",
    examples: ["Competing priorities", "Resource allocation", "Vision alignment"],
  },
];

export default function ThinkPage() {
  return (
    <PageLayout size="md">
      <PageHeader
        badge="Process"
        title="How I Think About Constraints"
        description="Every decision happens under constraints. Choose a constraint to see how I approach it."
      />

      <div className={styles.constraintsGrid}>
        {constraints.map((constraint) => (
          <Link
            key={constraint.id}
            href={`/think/${constraint.id}`}
            className={styles.constraintCard}
          >
            <h2 className={styles.constraintName}>{constraint.name}</h2>
            <p className={styles.constraintDescription}>{constraint.description}</p>
            <ul className={styles.examplesList}>
              {constraint.examples.map((example, i) => (
                <li key={i} className={styles.example}>
                  {example}
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
