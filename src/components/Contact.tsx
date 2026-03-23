import { siteConfig } from "@/config/site";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Get in touch</h2>
      <p className={styles.description}>Have something interesting? Let&apos;s talk.</p>
      <a href={`mailto:${siteConfig.email}`} className={styles.button}>
        Get in touch
      </a>
    </section>
  );
}
