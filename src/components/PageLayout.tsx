import styles from "./PageLayout.module.css";

interface PageLayoutProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function PageLayout({ children, size = "md", className = "" }: PageLayoutProps) {
  return (
    <div className={`${styles.layout} ${styles[size]} ${className}`}>
      {children}
    </div>
  );
}

interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: React.ReactNode;
}

export function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      {badge && <span className={styles.badge}>{badge}</span>}
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
    </header>
  );
}

interface PageSectionProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function PageSection({ children, title, className = "" }: PageSectionProps) {
  return (
    <section className={`${styles.section} ${className}`}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      {children}
    </section>
  );
}
