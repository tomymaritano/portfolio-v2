"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  searchCommands,
  addRecentCommand,
  getRecentCommands,
  findCommand,
} from "@/lib/commands";
import type { Command as Cmd, CommandCategory } from "@/lib/commands";
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

function groupByCategory(commands: Cmd[]): Map<CommandCategory, Cmd[]> {
  const grouped = new Map<CommandCategory, Cmd[]>();
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
  const router = useRouter();

  const allCommands = useMemo(() => searchCommands(""), []);
  const grouped = useMemo(() => groupByCategory(allCommands), [allCommands]);

  const recentIds = useMemo(() => (open ? getRecentCommands() : []), [open]);
  const recentCommands = useMemo(
    () => recentIds.map(findCommand).filter(Boolean) as Cmd[],
    [recentIds]
  );

  const handleSelect = useCallback(
    async (commandId: string) => {
      const command = findCommand(commandId);
      if (!command) return;

      addRecentCommand(command.id);
      const result = await command.action();

      if (result.type === "navigate") {
        if (result.url.startsWith("http") || result.url.startsWith("mailto:")) {
          window.open(result.url, "_blank");
        } else {
          router.push(result.url);
        }
      } else if (result.type === "action" && result.message) {
        toast(result.message);
      } else if (result.type === "text" && result.content) {
        toast(result.content);
      }

      setOpen(false);
      setSearch("");
    },
    [router]
  );

  // Global ⌘K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
            <Command
              label="Command palette"
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setOpen(false);
                  setSearch("");
                }
              }}
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
                <Command.Input
                  className={styles.input}
                  placeholder="Type a command or search..."
                  value={search}
                  onValueChange={setSearch}
                  autoFocus
                />
                <kbd className={styles.kbd}>ESC</kbd>
              </div>

              {/* Results */}
              <Command.List className={styles.list}>
                <Command.Empty className={styles.empty}>
                  No results found
                </Command.Empty>

                {/* Recent section */}
                {!search && recentCommands.length > 0 && (
                  <Command.Group
                    heading="Recent"
                    className={styles.section}
                  >
                    {recentCommands.map((cmd) => (
                      <Command.Item
                        key={`recent-${cmd.id}`}
                        value={`recent ${cmd.name} ${cmd.description}`}
                        onSelect={() => handleSelect(cmd.id)}
                        className={styles.item}
                      >
                        <span className={styles.icon}>{cmd.icon}</span>
                        <span className={styles.label}>{cmd.name}</span>
                        <span className={styles.description}>
                          {cmd.description}
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {/* Category sections */}
                {categoryOrder.map((cat) => {
                  const items = grouped.get(cat);
                  if (!items || items.length === 0) return null;
                  return (
                    <Command.Group
                      key={cat}
                      heading={categoryLabels[cat]}
                      className={styles.section}
                    >
                      {items.map((cmd) => (
                        <Command.Item
                          key={cmd.id}
                          value={`${cmd.name} ${cmd.description} ${cmd.keywords?.join(" ") ?? ""}`}
                          onSelect={() => handleSelect(cmd.id)}
                          className={styles.item}
                        >
                          <span className={styles.icon}>{cmd.icon}</span>
                          <span className={styles.label}>{cmd.name}</span>
                          <span className={styles.description}>
                            {cmd.description}
                          </span>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  );
                })}
              </Command.List>

              {/* Footer */}
              <div className={styles.footer}>
                <span>
                  <kbd>↑↓</kbd> navigate
                </span>
                <span>
                  <kbd>↵</kbd> select
                </span>
                <span>
                  <kbd>esc</kbd> close
                </span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
