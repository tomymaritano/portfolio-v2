import type { Command } from "../types";
import { siteConfig } from "@/config/site";

export const infoCommands: Command[] = [
  {
    id: "about",
    name: "About",
    description: "Who I am",
    category: "info",
    keywords: ["about", "bio", "me", "quien", "sobre"],
    icon: "👤",
    action: () => ({
      type: "text",
      content: `${siteConfig.name} — ${siteConfig.role}\n${siteConfig.tagline} ${siteConfig.taglineAccent}\n\n📍 ${siteConfig.location}\n✉️  ${siteConfig.email}`,
    }),
  },
  {
    id: "skills",
    name: "Skills",
    description: "Tech stack overview",
    category: "info",
    keywords: ["skills", "tech", "stack", "technologies", "habilidades"],
    icon: "⚡",
    action: () => ({
      type: "text",
      content:
        "Languages: TypeScript, JavaScript, Python\nFrontend: React, Next.js, Framer Motion\nBackend: Node.js, PostgreSQL, Supabase\nDesign: Figma, Framer\nDevOps: Vercel, Docker, GitHub Actions",
    }),
  },
  {
    id: "contact",
    name: "Contact",
    description: "How to reach me",
    category: "info",
    keywords: ["contact", "reach", "call", "contacto"],
    icon: "📬",
    action: () => ({
      type: "text",
      content: `✉️  ${siteConfig.email}\n📅 ${siteConfig.calendly}\n🐙 ${siteConfig.social.github}\n💼 ${siteConfig.social.linkedin}`,
    }),
  },
];
