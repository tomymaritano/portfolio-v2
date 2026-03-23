"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  searchCommands,
  addRecentCommand,
  getRecentCommands,
  findCommand,
} from "@/lib/commands";
import type { Command, CommandCategory } from "@/lib/commands";
import styles from "./CommandPalette.module.css";

const categoryLabels: Record<CommandCategory, string> = {
  navigation: "Navigate",
  search: "Search",
  social: "Social",
  action: "Actions",
  info: "Info",
  fun: "Fun",
};

const categoryOrder: CommandCategory[] = [
  "navigation",
  "info",
  "action",
  "social",
  "fun",
];

function groupByCategory(commands: Command[]): Map<CommandCategory, Command[]> {
  const grouped = new Map<CommandCategory, Command[]>();
  for (const cmd of commands) {
    const list = grouped.get(cmd.category) || [];
    list.push(cmd);
    grouped.set(cmd.category, list);
  }
  return grouped;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchCommands(search), [search]);

  const recentIds = useMemo(() => (open ? getRecentCommands() : []), [open]);
  const recentCommands = useMemo(
    () => recentIds.map(findCommand).filter(Boolean) as Command[],
    [recentIds]
  );

  const grouped = useMemo(() => groupByCategory(results), [results]);

  // Build flat list for keyboard navigation
  const flatList = useMemo(() => {
    const list: Command[] = [];
    if (!search && recentCommands.length > 0) {
      list.push(...recentCommands);
    }
    for (const cat of categoryOrder) {
      const items = grouped.get(cat);
      if (items) list.push(...items.slice(0, 5));
    }
    return list;
  }, [search, recentCommands, grouped]);

  const handleSelect = useCallback(
    async (command: Command) => {
      addRecentCommand(command.id);
      const result = await command.action();

      if (result.type === "navigate") {
        if (result.url.startsWith("http") || result.url.startsWith("mailto:")) {
          window.open(result.url, "_blank");
        } else {
          router.push(result.url);
        }
      }
      // For action/text/data types, palette just closes

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
        setSelectedIndex((prev) => (prev < flatList.length - 1 ? prev + 1 : 0));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : flatList.length - 1));
      }

      if (e.key === "Enter" && flatList[selectedIndex]) {
        handleSelect(flatList[selectedIndex]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, flatList, selectedIndex, handleSelect]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  let runningIndex = -1;

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
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Search input */}
            <div className={styles.inputWrapper}>
              <svg
                className={styles.searchIcon}
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
              <input
                ref={inputRef}
                type="text"
                className={styles.input}
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <kbd className={styles.kbd}>ESC</kbd>
            </div>

            {/* Results */}
            <div className={styles.list}>
              {flatList.length === 0 ? (
                <div className={styles.empty}>No results found</div>
              ) : (
                <>
                  {/* Recent section */}
                  {!search && recentCommands.length > 0 && (
                    <div className={styles.section}>
                      <div className={styles.sectionLabel}>Recent</div>
                      {recentCommands.map((cmd) => {
                        runningIndex++;
                        const idx = runningIndex;
                        return (
                          <button
                            key={`recent-${cmd.id}`}
                            className={`${styles.item} ${idx === selectedIndex ? styles.selected : ""}`}
                            onClick={() => handleSelect(cmd)}
                            onMouseEnter={() => setSelectedIndex(idx)}
                          >
                            <span className={styles.icon}>{cmd.icon}</span>
                            <span className={styles.label}>{cmd.name}</span>
                            <span className={styles.description}>{cmd.description}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Category sections */}
                  {categoryOrder.map((cat) => {
                    const items = grouped.get(cat);
                    if (!items || items.length === 0) return null;
                    return (
                      <div key={cat} className={styles.section}>
                        <div className={styles.sectionLabel}>
                          {categoryLabels[cat]}
                        </div>
                        {items.slice(0, 5).map((cmd) => {
                          runningIndex++;
                          const idx = runningIndex;
                          return (
                            <button
                              key={cmd.id}
                              className={`${styles.item} ${idx === selectedIndex ? styles.selected : ""}`}
                              onClick={() => handleSelect(cmd)}
                              onMouseEnter={() => setSelectedIndex(idx)}
                            >
                              <span className={styles.icon}>{cmd.icon}</span>
                              <span className={styles.label}>{cmd.name}</span>
                              <span className={styles.description}>{cmd.description}</span>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              <span><kbd>↑↓</kbd> navigate</span>
              <span><kbd>↵</kbd> select</span>
              <span><kbd>esc</kbd> close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
