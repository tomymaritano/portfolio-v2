"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Navbar.module.css";

function useTypingAnimation() {
  const firstName = siteConfig.firstName.toLowerCase();
  const lastName = siteConfig.lastName.toLowerCase();
  const [displayText, setDisplayText] = useState(firstName);
  const [phase, setPhase] = useState<"showing" | "deleting" | "typing">("showing");

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === "showing") {
      // Wait 3 seconds before starting to delete
      timeout = setTimeout(() => setPhase("deleting"), 3000);
    } else if (phase === "deleting") {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 80);
      } else {
        setPhase("typing");
      }
    } else if (phase === "typing") {
      if (displayText.length < lastName.length) {
        timeout = setTimeout(() => {
          setDisplayText(lastName.slice(0, displayText.length + 1));
        }, 100);
      }
      // Stay on lastName permanently
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase, firstName, lastName]);

  return displayText;
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/blog", label: "Blog" },
  { href: "/now", label: "Now" },
  { href: "/hire", label: "Hire" },
];

export function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoText = useTypingAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const openCommandPalette = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
        <nav className={styles.nav}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>
              {logoText}
              <span className={styles.logoDot}>.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${
                  pathname === item.href ? styles.active : ""
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    className={styles.activeIndicator}
                    layoutId="activeNav"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Switcher */}
            <button
              className={styles.langButton}
              onClick={() => setLocale(locale === "en" ? "es" : "en")}
              aria-label="Toggle language"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>{locale.toUpperCase()}</span>
            </button>

            {/* Command Palette Trigger */}
            <button
              className={styles.cmdButton}
              onClick={openCommandPalette}
              aria-label="Open command palette"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className={styles.cmdText}>Search</span>
              <kbd className={styles.kbd}>
                <span>⌘</span>K
              </kbd>
            </button>

            {/* Mobile Menu Button */}
            <button
              className={styles.mobileMenuButton}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ""}`}>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className={styles.mobileBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`${styles.mobileNavLink} ${
                      pathname === item.href ? styles.active : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className={styles.mobileDivider}
              />
              <motion.button
                className={styles.mobileCmdButton}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(openCommandPalette, 100);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navItems.length + 1) * 0.05 }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>Search & Commands</span>
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
