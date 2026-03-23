export type CommandCategory = "navigation" | "search" | "social" | "action" | "info" | "fun";

export type CommandResult =
  | { type: "navigate"; url: string }
  | { type: "text"; content: string }
  | { type: "action"; done: boolean; message?: string }
  | { type: "data"; key: string; payload: Record<string, unknown> };

export interface Command {
  id: string;
  name: string;
  description: string;
  category: CommandCategory;
  keywords: string[];
  icon: string;
  action: (args?: string[]) => CommandResult | Promise<CommandResult>;
}
