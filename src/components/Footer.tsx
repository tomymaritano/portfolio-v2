import Link from "next/link";
import { siteConfig } from "@/config/site";

const footerLink =
  "font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-[var(--text-subtle)] hover:text-foreground transition-colors";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-[720px] flex-col gap-5 px-5 py-8 md:px-8">
        <p className="font-serif text-[0.9375rem] leading-relaxed text-muted-foreground m-0 max-w-[60ch]">
          Built with Next.js and MDX. Set in Fraunces and Plus Jakarta Sans. Source on{" "}
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-[var(--text-subtle)] decoration-1 underline-offset-2 transition-colors hover:decoration-[var(--accent)]"
          >
            GitHub
          </a>
          .
        </p>
        <nav
          className="flex flex-wrap gap-5"
          aria-label="Secondary"
        >
          <Link href="/about" className={footerLink}>About</Link>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={footerLink}
          >
            GitHub
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={footerLink}
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className={footerLink}
          >
            X
          </a>
          <a href={`mailto:${siteConfig.email}`} className={footerLink}>Email</a>
          <a href="/feed.xml" className={footerLink}>RSS</a>
        </nav>
        <p className="font-mono text-[0.6875rem] tracking-[0.04em] text-[var(--text-subtle)] m-0">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
