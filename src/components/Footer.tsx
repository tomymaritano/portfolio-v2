import { siteConfig } from "@/config/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>
        &copy; {new Date().getFullYear()} {siteConfig.name}
      </span>
      <div className={styles.links}>
        <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">X</a>
      </div>
    </footer>
  );
}
