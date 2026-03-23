import Link from "next/link";
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
          <div className={styles.name}>{siteConfig.name}</div>
          <div className={styles.location}>
            {siteConfig.role} · {siteConfig.location}
          </div>
        </div>
      </div>
      <h1 className={styles.tagline}>{siteConfig.tagline}</h1>
      <p className={styles.description}>
        Fintech, developer tools, and interfaces that get out of the way. Based in Buenos Aires.
      </p>
      <div className={styles.ctas}>
        <Link href="/projects" className={styles.primary}>
          View Projects
        </Link>
        <Link href="/blog" className={styles.ghost}>
          Read Blog
        </Link>
      </div>
    </section>
  );
}
