import { PageLayout, PageHeader } from "@/components/PageLayout";
import styles from "./page.module.css";

interface SkillCategory {
  name: string;
  description: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "AI & LLMs",
    description: "Building with and leveraging AI tools",
    skills: [
      "Prompt Engineering",
      "Claude",
      "ChatGPT",
      "Cursor",
      "LLM Prototyping",
      "AI-Assisted Development",
    ],
  },
  {
    name: "Frontend",
    description: "Modern web interfaces and applications",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Svelte",
      "Angular",
      "Zustand",
      "Redux",
      "Vite",
      "TanStack Query",
    ],
  },
  {
    name: "Design Systems",
    description: "UI libraries and visual tooling",
    skills: [
      "Tailwind CSS",
      "Radix UI",
      "Chakra UI",
      "Styled Components",
      "Framer Motion",
      "Figma",
      "CSS Modules",
    ],
  },
  {
    name: "Backend",
    description: "Server-side and data infrastructure",
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "REST APIs",
      "CI/CD",
      "Authentication",
      "Supabase",
      "Neon",
    ],
  },
  {
    name: "Product & UX",
    description: "From discovery to delivery",
    skills: [
      "Product Discovery",
      "Prototyping",
      "UX Flows",
      "Wireframing",
      "Usability Testing",
      "Roadmapping",
      "User Research",
    ],
  },
  {
    name: "Tooling",
    description: "Developer experience and workflows",
    skills: [
      "Git",
      "Electron",
      "Webflow",
      "Figma-to-Code",
      "Vitest",
      "Playwright",
      "Storybook",
    ],
  },
];

export default function SkillsPage() {
  return (
    <PageLayout size="md">
      <PageHeader
        badge="Capabilities"
        title="Skills & Tools"
        description="Technologies and methodologies I use to build products. Constantly evolving with the industry."
      />

      <section className={styles.skillsGrid}>
        {skillCategories.map((category) => (
          <article key={category.name} className={styles.categoryCard}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryName}>{category.name}</h2>
              <p className={styles.categoryDescription}>
                {category.description}
              </p>
            </div>
            <ul className={styles.skillsList}>
              {category.skills.map((skill) => (
                <li key={skill} className={styles.skillItem}>
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className={styles.philosophySection}>
        <h2 className={styles.sectionTitle}>How I Think About Skills</h2>
        <div className={styles.philosophyContent}>
          <p>
            Tools change. Principles don&apos;t. I focus on understanding
            <em> why</em> things work, not just <em>how</em> to use them.
          </p>
          <p>
            This means I can pick up new technologies quickly and make informed
            decisions about when to adopt them—or when to stick with what works.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
