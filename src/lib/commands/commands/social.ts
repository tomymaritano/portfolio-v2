import type { Command } from "../types";
import { siteConfig } from "@/config/site";

export const socialCommands: Command[] = [
  {
    id: "open-github",
    name: "GitHub",
    description: "Open GitHub profile",
    category: "social",
    keywords: ["github", "gh", "code", "repos"],
    icon: "🐙",
    action: () => ({ type: "navigate", url: siteConfig.social.github }),
  },
  {
    id: "open-linkedin",
    name: "LinkedIn",
    description: "Open LinkedIn profile",
    category: "social",
    keywords: ["linkedin", "li", "professional", "network"],
    icon: "💼",
    action: () => ({ type: "navigate", url: siteConfig.social.linkedin }),
  },
  {
    id: "open-twitter",
    name: "X (Twitter)",
    description: "Open X profile",
    category: "social",
    keywords: ["twitter", "x", "tweet", "social"],
    icon: "🐦",
    action: () => ({ type: "navigate", url: siteConfig.social.twitter }),
  },
  {
    id: "email",
    name: "Email",
    description: `Send email to ${siteConfig.email}`,
    category: "social",
    keywords: ["email", "mail", "contact", "correo"],
    icon: "✉️",
    action: () => ({ type: "navigate", url: `mailto:${siteConfig.email}` }),
  },
];
