import type { Command } from "../types";
import { siteConfig } from "@/config/site";

export const infoCommands: Command[] = [
  {
    id: "info-summary",
    name: "Summary",
    description: "Who I am, in one line",
    category: "info",
    keywords: ["summary", "about", "bio", "me", "quien"],
    icon: "👤",
    action: () => ({
      type: "text",
      content: `${siteConfig.name} — ${siteConfig.role}\n${siteConfig.tagline}\n\n📍 ${siteConfig.location}\n✉️  ${siteConfig.email}`,
    }),
  },
  {
    id: "email",
    name: "Email",
    description: "Email address",
    category: "info",
    keywords: ["email", "mail", "reach", "contact"],
    icon: "✉️",
    action: () => ({
      type: "text",
      content: siteConfig.email,
    }),
  },
];
