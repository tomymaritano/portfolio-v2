import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Tomás Maritano — product engineer and writer based in Buenos Aires.",
};

const bio = [
  { year: "2017", text: "Started building client sites at Su Web Express in Buenos Aires." },
  { year: "2020", text: "Moved to Copenhagen. Frontend at Wolt." },
  { year: "2022", text: "Full-stack engineer at Grandvalira in Andorra — tourism tech." },
  { year: "2023", text: "Senior frontend at Valere Realms — Web3." },
  { year: "2024", text: "Frontend at Unicoin — crypto and fintech." },
  { year: "2026", text: "Frontend & Design Engineer at Psynth — clinical AI." },
];

const sectionHeading =
  "m-0 mb-5 border-b border-border pb-2.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-muted-foreground";

const proseBody =
  "font-serif text-[var(--prose-size)] leading-[var(--prose-leading)] text-muted-foreground max-w-[var(--prose-measure)]";

export default function AboutPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-80px)] max-w-[720px] px-5 pt-12 pb-24 md:px-8">
      <section className="mb-16">
        <p className="m-0 max-w-[60ch] font-serif text-[1.25rem] leading-[1.45] text-foreground sm:text-[1.375rem]">
          Product engineer and writer based in Buenos Aires. I build software and write
          about the decisions behind it.
        </p>
      </section>

      <section className="mb-14">
        <h2 className={sectionHeading}>Now</h2>
        <div className={proseBody}>
          <p className="m-0">
            Currently at Psynth, building the frontend and design system for a clinical
            assessment platform. The throughline of the last decade — fintech in
            Argentina, delivery tools in Copenhagen, tourism tech in Andorra, crypto at
            Unicoin — has been the same problem from different angles: make complex
            systems feel obvious.
          </p>
        </div>
      </section>

      <section className="mb-14">
        <h2 className={sectionHeading}>Bio</h2>
        <div className="flex flex-col gap-3">
          {bio.map(({ year, text }) => (
            <div
              key={year}
              className="grid grid-cols-[56px_1fr] items-baseline gap-3 sm:grid-cols-[64px_1fr] sm:gap-4"
            >
              <span className="font-mono text-[0.75rem] text-[var(--text-subtle)]">{year}</span>
              <span className="font-serif text-base leading-[1.5] text-muted-foreground">{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className={sectionHeading}>What I think about</h2>
        <div className={proseBody}>
          <ul className="m-0 mb-5 ml-5 list-disc">
            <li className="mb-1.5">Developer tools and the interfaces engineers spend their day in.</li>
            <li className="mb-1.5">Fintech in Latin America — what works, what doesn&apos;t, why.</li>
            <li className="mb-1.5">AI inside regulated domains: clinical, financial, legal.</li>
            <li className="mb-1.5">Taste in software, and why most products feel the same.</li>
            <li className="mb-1.5">Working with LLMs as a daily-driver tool rather than a novelty.</li>
          </ul>
          <p className="m-0">
            Most of these end up as essays in{" "}
            <Link href="/writing" className="text-foreground underline decoration-[var(--text-subtle)] decoration-1 underline-offset-[0.2em] transition-colors hover:decoration-[var(--accent)]">
              writing
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mb-14">
        <h2 className={sectionHeading}>How I work</h2>
        <div className={proseBody}>
          <p className="m-0">
            I ship small, often, and write the change down. I prefer specifics to
            abstractions. I default to plain language and only reach for jargon when the
            jargon does load-bearing work. I&apos;d rather show the code than describe it.
          </p>
        </div>
      </section>

      <section className="mb-14">
        <h2 className={sectionHeading}>Elsewhere</h2>
        <nav className="flex flex-wrap gap-6">
          {[
            { href: siteConfig.social.github, label: "GitHub" },
            { href: siteConfig.social.linkedin, label: "LinkedIn" },
            { href: siteConfig.social.twitter, label: "X" },
            { href: `mailto:${siteConfig.email}`, label: "Email" },
            { href: "/feed.xml", label: "RSS" },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="border-b border-border pb-0.5 font-mono text-[0.8125rem] text-muted-foreground transition-colors hover:border-[var(--text-subtle)] hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
      </section>

      <section className="mb-14">
        <h2 className={sectionHeading}>Colophon</h2>
        <div className={proseBody}>
          <p className="m-0">
            This site is built with Next.js, MDX, Tailwind v4, and shadcn/ui. Set in
            Fraunces (serif) and Plus Jakarta Sans (sans). Deployed on Vercel. Source on{" "}
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-[var(--text-subtle)] decoration-1 underline-offset-[0.2em] transition-colors hover:decoration-[var(--accent)]"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
