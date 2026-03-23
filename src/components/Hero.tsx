import { siteConfig } from "@/config/site";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.identity}>
        <img
          src={siteConfig.hero.photo}
          alt={siteConfig.name}
          className={styles.avatar}
        />
        <div>
          <h1 className={styles.name}>{siteConfig.name}</h1>
          <p className={styles.role}>Product Engineer · Buenos Aires</p>
        </div>
      </div>
      <p className={styles.bio}>
        Fintech, developer tools, and interfaces that get out of the way.
      </p>
      <div className={styles.socials}>
        <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">X</a>
        <a href={`mailto:${siteConfig.email}`}>Email</a>
      </div>
    </section>
  );
}
