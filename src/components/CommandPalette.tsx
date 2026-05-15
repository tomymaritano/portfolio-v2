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

const sectionClass =
  "mb-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.1em] [&_[cmdk-group-heading]]:text-[var(--text-subtle)]";

const itemClass =
  "flex w-full cursor-pointer items-center gap-2.5 rounded-[var(--radius-md)] px-3 py-2 text-sm text-muted-foreground transition-colors data-[selected=true]:bg-[var(--surface-hover)] data-[selected=true]:text-foreground hover:bg-[var(--surface-hover)] hover:text-foreground";

const kbdClass =
  "font-mono text-[9px] rounded border border-border bg-background px-1 py-0.5 text-[var(--text-subtle)]";

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
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="fixed left-1/2 top-[18%] z-[101] w-[90%] max-w-[560px] -translate-x-1/2 overflow-hidden rounded-[var(--radius-xl)] border border-border bg-[var(--surface)] shadow-2xl"
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
              <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="shrink-0 text-[var(--text-subtle)]"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <Command.Input
                  className="flex-1 border-none bg-transparent text-sm text-foreground outline-none placeholder:text-[var(--text-subtle)]"
                  placeholder="Type a command or search..."
                  value={search}
                  onValueChange={setSearch}
                  autoFocus
                />
                <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-subtle)]">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-80 overflow-y-auto p-2">
                <Command.Empty className="p-8 text-center text-sm text-[var(--text-subtle)]">
                  No results found
                </Command.Empty>

                {!search && recentCommands.length > 0 && (
                  <Command.Group heading="Recent" className={sectionClass}>
                    {recentCommands.map((cmd) => (
                      <Command.Item
                        key={`recent-${cmd.id}`}
                        value={`recent ${cmd.name} ${cmd.description}`}
                        onSelect={() => handleSelect(cmd.id)}
                        className={itemClass}
                      >
                        <span className="flex w-[18px] shrink-0 items-center justify-center text-sm">
                          {cmd.icon}
                        </span>
                        <span className="whitespace-nowrap font-medium">{cmd.name}</span>
                        <span className="flex-1 truncate text-right text-[11px] text-[var(--text-subtle)]">
                          {cmd.description}
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {categoryOrder.map((cat) => {
                  const items = grouped.get(cat);
                  if (!items || items.length === 0) return null;
                  return (
                    <Command.Group
                      key={cat}
                      heading={categoryLabels[cat]}
                      className={sectionClass}
                    >
                      {items.map((cmd) => (
                        <Command.Item
                          key={cmd.id}
                          value={`${cmd.name} ${cmd.description} ${cmd.keywords?.join(" ") ?? ""}`}
                          onSelect={() => handleSelect(cmd.id)}
                          className={itemClass}
                        >
                          <span className="flex w-[18px] shrink-0 items-center justify-center text-sm">
                            {cmd.icon}
                          </span>
                          <span className="whitespace-nowrap font-medium">{cmd.name}</span>
                          <span className="flex-1 truncate text-right text-[11px] text-[var(--text-subtle)]">
                            {cmd.description}
                          </span>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  );
                })}
              </Command.List>

              <div className="flex gap-4 border-t border-border px-4 py-2.5">
                <span className="flex items-center gap-1.5 text-[11px] text-[var(--text-subtle)]">
                  <kbd className={kbdClass}>↑↓</kbd> navigate
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-[var(--text-subtle)]">
                  <kbd className={kbdClass}>↵</kbd> select
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-[var(--text-subtle)]">
                  <kbd className={kbdClass}>esc</kbd> close
                </span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
