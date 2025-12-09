"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getInitials } from "@/lib/utils";
import styles from "./Footer.module.css";

const footerLinks = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Uses", href: "/uses" },
  ],
  more: [
    { label: "Guestbook", href: "/guestbook" },
    { label: "Think", href: "/think" },
    { label: "Hire Me", href: "/hire" },
    { label: "RSS", href: "/feed.xml" },
  ],
  social: [
    { label: "GitHub", href: siteConfig.social.github, external: true },
    { label: "LinkedIn", href: siteConfig.social.linkedin, external: true },
    { label: "X (Twitter)", href: siteConfig.social.twitter, external: true },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>{getInitials(siteConfig.name)}</span>
              <span className={styles.logoText}>{siteConfig.name}</span>
            </Link>
            <p className={styles.tagline}>
              {siteConfig.role} building digital products from 0 to 1.
            </p>
          </div>

          {/* Navigation */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Navigate</h4>
            <ul className={styles.list}>
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>More</h4>
            <ul className={styles.list}>
              {footerLinks.more.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Connect</h4>
            <ul className={styles.list}>
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {link.label}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={styles.externalIcon}
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {currentYear} {siteConfig.name}. {siteConfig.footer.copyright}
          </p>
          <p className={styles.builtWith}>
            Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.techLink}
            >
              Next.js
            </a>
            {" & "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.techLink}
            >
              Vercel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
