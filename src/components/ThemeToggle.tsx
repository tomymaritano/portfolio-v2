"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const buttonClass =
  "flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-border bg-transparent text-foreground transition-colors hover:border-[var(--text-subtle)] hover:text-[var(--accent)]";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  return (
    <motion.button
      type="button"
      className={buttonClass}
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="text-sm leading-none"
      >
        {theme === "dark" ? "☀" : "☾"}
      </motion.span>
    </motion.button>
  );
}
