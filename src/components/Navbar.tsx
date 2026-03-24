"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Caveat } from "next/font/google";
import { ThemeToggle } from "@/components/ThemeToggle";
import styles from "./Navbar.module.css";

const handwriting = Caveat({ subsets: ["latin"], weight: ["700"] });

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav}>
        <Link href="/" className={`${styles.logo} ${handwriting.className}`}>
          Tomy Maritano
        </Link>

        <div className={styles.links}>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.link} ${pathname.startsWith(href) ? styles.active : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className={styles.actions}>
          <ThemeToggle />
          <kbd className={styles.kbd}>⌘K</kbd>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.burger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.mobileLink} ${pathname.startsWith(href) ? styles.active : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className={styles.mobileActions}>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
