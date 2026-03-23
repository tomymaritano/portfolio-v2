import { siteConfig } from "@/config/site";
import styles from "./Hero.module.css";

const bio = [
  { year: "2017", text: "Started building client websites at Su Web Express, Buenos Aires" },
  { year: "2020", text: "Moved to Copenhagen — frontend developer at Wolt" },
  { year: "2022", text: "Full-stack engineer at Grandvalira (Andorra) — tourism tech" },
  { year: "2023", text: "Senior frontend at Valere Realms — Web3" },
  { year: "2024", text: "Frontend developer at Unicoin — crypto & fintech" },
  { year: "2026", text: "Frontend & Design Engineer at Psynth — clinical AI platform" },
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
          From building client sites in Buenos Aires to shipping trading platforms and clinical
          AI tools, the thread has always been the same — make complex things feel simple.
        </p>
        <p className={styles.text}>
          Currently at Psynth building frontend and design systems for a clinical assessment
          platform. Previously shipped crypto products at Unicoin, tourism tech in Andorra,
          and delivery tools at Wolt in Copenhagen.
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
