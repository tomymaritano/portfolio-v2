import Fuse from "fuse.js";
import type { Command, CommandResult } from "./types";
import { navigationCommands } from "./commands/navigation";
import { socialCommands } from "./commands/social";
import { infoCommands } from "./commands/info";
import { actionCommands } from "./commands/actions";

export type { Command, CommandResult };
export type { CommandCategory } from "./types";

const allCommands: Command[] = [
  ...navigationCommands,
  ...socialCommands,
  ...infoCommands,
  ...actionCommands,
];

const fuse = new Fuse(allCommands, {
  keys: [
    { name: "name", weight: 2 },
    { name: "keywords", weight: 1.5 },
    { name: "description", weight: 1 },
  ],
  threshold: 0.4,
  includeScore: true,
});

export function getCommands(): Command[] {
  return allCommands;
}

export function searchCommands(query: string): Command[] {
  if (!query.trim()) return allCommands;
  return fuse.search(query).map((result) => result.item);
}

export function findCommand(idOrName: string): Command | undefined {
  return allCommands.find(
    (cmd) => cmd.id === idOrName || cmd.name.toLowerCase() === idOrName.toLowerCase()
  );
}

export async function executeCommand(
  idOrName: string,
  args?: string[]
): Promise<CommandResult | null> {
  const cmd = findCommand(idOrName);
  if (!cmd) return null;
  return cmd.action(args);
}

// Recent commands (localStorage)
const RECENT_KEY = "portfolio:cmd-recent";
const MAX_RECENT = 5;

export function getRecentCommands(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(RECENT_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addRecentCommand(commandId: string): void {
  if (typeof window === "undefined") return;
  try {
    const recent = getRecentCommands().filter((id) => id !== commandId);
    recent.unshift(commandId);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
  } catch {
    // localStorage not available
  }
}
