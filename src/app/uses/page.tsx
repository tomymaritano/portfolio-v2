import type { Metadata } from "next";
import { PageLayout, PageHeader } from "@/components/PageLayout";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Uses",
  description: "The tools, software, and hardware I use daily for development and design.",
};

const uses = {
  development: {
    title: "Development",
    items: [
      { name: "VS Code", description: "Primary code editor with Vim keybindings" },
      { name: "Warp", description: "Modern terminal with AI features" },
      { name: "Arc Browser", description: "Main browser for development" },
      { name: "GitHub Copilot", description: "AI pair programming assistant" },
      { name: "Claude", description: "AI assistant for complex problems" },
      { name: "Figma", description: "Design and prototyping" },
      { name: "TablePlus", description: "Database management" },
      { name: "Postman", description: "API testing and documentation" },
    ],
  },
  stack: {
    title: "Tech Stack",
    items: [
      { name: "TypeScript", description: "Primary programming language" },
      { name: "React / Next.js", description: "Frontend framework of choice" },
      { name: "Node.js", description: "Backend runtime" },
      { name: "PostgreSQL", description: "Primary database" },
      { name: "Prisma", description: "ORM for database access" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework" },
      { name: "Vercel", description: "Deployment platform" },
      { name: "GitHub Actions", description: "CI/CD pipelines" },
    ],
  },
  hardware: {
    title: "Hardware",
    items: [
      { name: "MacBook Pro 14\"", description: "M3 Pro, 18GB RAM" },
      { name: "Studio Display", description: "27\" 5K Retina display" },
      { name: "Keychron K2", description: "Mechanical keyboard, Gateron Browns" },
      { name: "Logitech MX Master 3", description: "Ergonomic mouse" },
      { name: "Sony WH-1000XM4", description: "Noise-canceling headphones" },
      { name: "Herman Miller Aeron", description: "Ergonomic chair" },
    ],
  },
  productivity: {
    title: "Productivity",
    items: [
      { name: "Notion", description: "Notes, docs, and project management" },
      { name: "Linear", description: "Issue tracking and project planning" },
      { name: "Raycast", description: "Spotlight replacement with superpowers" },
      { name: "1Password", description: "Password management" },
      { name: "CleanShot X", description: "Screenshots and recordings" },
      { name: "Spotify", description: "Music for focus and coding" },
    ],
  },
};

export default function UsesPage() {
  return (
    <PageLayout size="md">
      <PageHeader
        badge="Setup"
        title="Uses"
        description={
          <>
            A living document of the tools, software, and hardware that power my daily workflow.
            Inspired by <a href="https://uses.tech" target="_blank" rel="noopener noreferrer" className={styles.link}>uses.tech</a>.
          </>
        }
      />

      <div className={styles.sections}>
        {Object.entries(uses).map(([key, section]) => (
          <section key={key} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <ul className={styles.list}>
              {section.items.map((item) => (
                <li key={item.name} className={styles.item}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemDescription}>{item.description}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageLayout>
  );
}
