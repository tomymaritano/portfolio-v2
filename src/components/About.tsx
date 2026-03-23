import { siteConfig } from "@/config/site";
import styles from "./About.module.css";

const stack = {
  Languages: ["TypeScript", "JavaScript", "Python"],
  Frameworks: ["React", "Next.js", "Node.js"],
  Tools: ["Vercel", "Prisma", "PostgreSQL", "Docker"],
};

export function About() {
  return (
    <div className={styles.about}>
      <div className={styles.bio}>
        <div className={styles.identity}>
          <img src={siteConfig.hero.photo} alt={siteConfig.name} className={styles.avatar} />
          <div>
            <h1 className={styles.name}>{siteConfig.name}</h1>
            <p className={styles.location}>{siteConfig.role} · {siteConfig.location}</p>
          </div>
        </div>
        <p className={styles.text}>
          I build products that users love and businesses need. Currently focused on fintech
          and developer tools. I care about shipping fast without cutting corners — the kind
          of software that feels good to use and is built to last.
        </p>
        <p className={styles.text}>
          Previously built software for tourism, Web3, and delivery platforms across Latin
          America and Europe.
        </p>
        <div className={styles.socials}>
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">X</a>
          <a href={`mailto:${siteConfig.email}`}>Email</a>
        </div>
      </div>

      <div className={styles.stack}>
        <h2 className={styles.sectionTitle}>Stack</h2>
        {Object.entries(stack).map(([category, items]) => (
          <div key={category} className={styles.stackGroup}>
            <span className={styles.stackLabel}>{category}</span>
            <div className={styles.pills}>
              {items.map((item) => (
                <span key={item} className={styles.pill}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
