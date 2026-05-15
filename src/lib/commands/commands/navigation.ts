import type { Command } from "../types";

export const navigationCommands: Command[] = [
  {
    id: "goto-home",
    name: "Home",
    description: "Go to home page",
    category: "navigation",
    keywords: ["home", "index", "main", "inicio"],
    icon: "🏠",
    action: () => ({ type: "navigate", url: "/" }),
  },
  {
    id: "goto-writing",
    name: "Writing",
    description: "Read essays",
    category: "navigation",
    keywords: ["writing", "essays", "blog", "posts", "articles"],
    icon: "📝",
    action: () => ({ type: "navigate", url: "/writing" }),
  },
  {
    id: "goto-log",
    name: "Log",
    description: "Daily engineering activity",
    category: "navigation",
    keywords: ["log", "journal", "daily", "activity", "now"],
    icon: "📒",
    action: () => ({ type: "navigate", url: "/log" }),
  },
  {
    id: "goto-projects",
    name: "Projects",
    description: "View all projects",
    category: "navigation",
    keywords: ["projects", "work", "portfolio", "proyectos"],
    icon: "📦",
    action: () => ({ type: "navigate", url: "/projects" }),
  },
  {
    id: "goto-about",
    name: "About",
    description: "About Tomás",
    category: "navigation",
    keywords: ["about", "bio", "who", "sobre"],
    icon: "🪪",
    action: () => ({ type: "navigate", url: "/about" }),
  },
];
