"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import styles from "./CommandPalette.module.css";

interface Command {
  id: string;
  label: string;
  href?: string;
  action?: () => void;
  icon: React.ReactNode;
  shortcut?: string;
}

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ProjectsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const BlogIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

const ThinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const HireIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const RssIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 11a9 9 0 0 1 9 9" />
    <path d="M4 4a16 16 0 0 1 16 16" />
    <circle cx="5" cy="19" r="1" />
  </svg>
);

const UsesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const GuestbookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const NowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const DecisionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M9 14l2 2 4-4" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const CopyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const toggleTheme = useCallback(() => {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");
    html.setAttribute("data-theme", current === "dark" ? "light" : "dark");
    localStorage.setItem("theme", current === "dark" ? "light" : "dark");
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(siteConfig.email);
  }, []);

  const commands: Command[] = [
    // Navigation
    { id: "home", label: "Go to Home", href: "/", icon: <HomeIcon /> },
    { id: "projects", label: "Go to Projects", href: "/projects", icon: <ProjectsIcon /> },
    { id: "blog", label: "Go to Blog", href: "/blog", icon: <BlogIcon /> },
    { id: "uses", label: "Go to Uses", href: "/uses", icon: <UsesIcon /> },
    { id: "think", label: "Go to Think", href: "/think", icon: <ThinkIcon /> },
    { id: "guestbook", label: "Go to Guestbook", href: "/guestbook", icon: <GuestbookIcon /> },
    { id: "now", label: "Go to Now", href: "/now", icon: <NowIcon /> },
    { id: "decisions", label: "Go to Decision Log", href: "/decisions", icon: <DecisionIcon /> },
    { id: "hire", label: "Go to Hire Me", href: "/hire", icon: <HireIcon /> },
    // Theme
    { id: "theme-light", label: "Switch to Light Mode", action: toggleTheme, icon: <SunIcon /> },
    { id: "theme-dark", label: "Switch to Dark Mode", action: toggleTheme, icon: <MoonIcon /> },
    // Social & External
    { id: "github", label: "Open GitHub", action: () => window.open(siteConfig.social.github, "_blank"), icon: <GitHubIcon /> },
    { id: "linkedin", label: "Open LinkedIn", action: () => window.open(siteConfig.social.linkedin, "_blank"), icon: <LinkedInIcon /> },
    { id: "twitter", label: "Open X (Twitter)", action: () => window.open(siteConfig.social.twitter, "_blank"), icon: <TwitterIcon /> },
    { id: "copy-email", label: "Copy Email Address", action: copyEmail, icon: <CopyIcon /> },
    { id: "rss", label: "Subscribe to RSS Feed", href: "/feed.xml", icon: <RssIcon /> },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = useCallback(
    (command: Command) => {
      if (command.href) {
        router.push(command.href);
      } else if (command.action) {
        command.action();
      }
      setOpen(false);
      setSearch("");
      setSelectedIndex(0);
    },
    [router]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }

      if (!open) return;

      if (e.key === "Escape") {
        setOpen(false);
        setSearch("");
        setSelectedIndex(0);
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
      }

      if (e.key === "Enter" && filteredCommands[selectedIndex]) {
        handleSelect(filteredCommands[selectedIndex]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, filteredCommands, selectedIndex, handleSelect]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className={styles.container}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
          >
            <div className={styles.inputWrapper}>
              <svg
                className={styles.searchIcon}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className={styles.input}
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
              <kbd className={styles.kbd}>ESC</kbd>
            </div>
            <div className={styles.list}>
              {filteredCommands.length === 0 ? (
                <div className={styles.empty}>No results found</div>
              ) : (
                filteredCommands.map((cmd, index) => (
                  <button
                    key={cmd.id}
                    className={`${styles.item} ${
                      index === selectedIndex ? styles.selected : ""
                    }`}
                    onClick={() => handleSelect(cmd)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <span className={styles.icon}>{cmd.icon}</span>
                    <span className={styles.label}>{cmd.label}</span>
                    {cmd.shortcut && (
                      <kbd className={styles.shortcut}>{cmd.shortcut}</kbd>
                    )}
                  </button>
                ))
              )}
            </div>
            <div className={styles.footer}>
              <span>
                <kbd>↑↓</kbd> to navigate
              </span>
              <span>
                <kbd>↵</kbd> to select
              </span>
              <span>
                <kbd>esc</kbd> to close
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
