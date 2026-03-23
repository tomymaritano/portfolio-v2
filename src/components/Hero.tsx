import { siteConfig } from "@/config/site";
import styles from "./Hero.module.css";

const bio = [
  { year: "2017", text: "Started building client websites at Su Web Express" },
  { year: "2020", text: "Moved to Copenhagen — frontend at Wolt" },
  { year: "2022", text: "Full-stack at Grandvalira (Andorra) — tourism tech" },
  { year: "2023", text: "Frontend at Valere Realms — Web3" },
  { year: "2024", text: "Product Engineer at Unicoin — fintech" },
];

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

      <div className={styles.introBox}>
        Shipping software that feels obvious in hindsight.
      </div>

      <div className={styles.about}>
        <h2 className={styles.sectionTitle}>About</h2>
        <p className={styles.text}>
          Product engineer focused on fintech, developer tools, and thoughtful interfaces.
          From building client sites in Buenos Aires to shipping trading platforms, the thread
          has always been the same — make complex things feel simple.
        </p>
        <p className={styles.text}>
          Currently at Unicoin working on crypto and fintech products. Previously built
          software for tourism in Andorra, delivery in Copenhagen, and Web3 startups.
        </p>
      </div>

      <div className={styles.timeline}>
        <h2 className={styles.sectionTitle}>Bio</h2>
        {bio.map(({ year, text }) => (
          <div key={year} className={styles.timelineEntry}>
            <span className={styles.year}>{year}</span>
            <span className={styles.timelineText}>{text}</span>
          </div>
        ))}
      </div>

      <div className={styles.socials}>
        <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">X</a>
        <a href={`mailto:${siteConfig.email}`}>Email</a>
      </div>
    </section>
  );
}
