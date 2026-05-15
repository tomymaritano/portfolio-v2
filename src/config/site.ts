/**
 * Site Configuration
 *
 * Edit this file to customize the portfolio template.
 * All personal information and settings are centralized here.
 */

export const siteConfig = {
  // Personal Info
  name: "Tomás Maritano",
  firstName: "Tomás",
  lastName: "Maritano",
  role: "Product Engineer",
  tagline: "Product engineer and writer. I build software and write about the decisions behind it.",
  location: "Buenos Aires, Argentina",

  // Contact
  email: "tomymaritano@gmail.com",
  calendly: "https://calendly.com/tomymaritano",

  // Social Links
  social: {
    github: "https://github.com/tomymaritano",
    linkedin: "https://linkedin.com/in/tomymaritano",
    twitter: "https://x.com/tomymaritano",
  },

  // Site Meta
  meta: {
    title: "Tomás Maritano",
    description: "Product engineer and writer. Fintech, developer tools, and interfaces that get out of the way.",
    domain: "https://tomasmaritano.com",
    image: "/og-image.png",
    locale: "en_US",
  },

  // Navigation
  nav: {
    links: [
      { label: "Writing", href: "/writing" },
      { label: "Log", href: "/log" },
      { label: "Projects", href: "/projects" },
      { label: "About", href: "/about" },
    ],
  },

  // Footer
  footer: {
    copyright: "All rights reserved.",
    links: [
      { label: "GitHub", href: "https://github.com/tomymaritano" },
      { label: "LinkedIn", href: "https://linkedin.com/in/tomymaritano" },
      { label: "Twitter", href: "https://x.com/tomymaritano" },
    ],
  },
} as const;

// Type exports for TypeScript support
export type SiteConfig = typeof siteConfig;
