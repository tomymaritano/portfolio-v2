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
    id: "goto-projects",
    name: "Projects",
    description: "View all projects",
    category: "navigation",
    keywords: ["projects", "work", "portfolio", "proyectos"],
    icon: "📦",
    action: () => ({ type: "navigate", url: "/projects" }),
  },
  {
    id: "goto-blog",
    name: "Blog",
    description: "Read blog posts",
    category: "navigation",
    keywords: ["blog", "posts", "articles", "writing"],
    icon: "📝",
    action: () => ({ type: "navigate", url: "/blog" }),
  },
];
