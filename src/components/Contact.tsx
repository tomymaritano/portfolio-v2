import { siteConfig } from "@/config/site";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Let&apos;s work together</h2>
      <p className={styles.description}>Got a project in mind? Let&apos;s talk.</p>
      <a href={`mailto:${siteConfig.email}`} className={styles.button}>
        Get in touch
      </a>
    </section>
  );
}
