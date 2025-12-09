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
  tagline: "I build products that users love",
  taglineAccent: "and businesses need.",
  location: "Buenos Aires, Argentina",

  // Contact
  email: "tomas@maritano.dev",
  calendly: "https://calendly.com/tomasmaritano/intro",

  // Social Links
  social: {
    github: "https://github.com/tomasmaritano",
    linkedin: "https://linkedin.com/in/tomasmaritano",
    twitter: "https://x.com/tomasmaritano",
  },

  // Site Meta
  meta: {
    title: "Tomás Maritano - Product Engineer",
    description: "Product Engineer building user-focused experiences. Combining technical depth with product thinking to ship fast and iterate based on real feedback.",
    domain: "https://tomasmaritano.com",
    image: "/og-image.png",
    locale: "en_US",
  },

  // Navigation
  nav: {
    links: [
      { label: "Work", href: "#projects" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    cta: {
      label: "Let's talk",
      href: "#contact",
    },
  },

  // Hero Section
  hero: {
    photo: "/images/profile.jpg",
    badge: "Available for work",
    ctas: {
      primary: {
        label: "View projects",
        href: "#projects",
      },
      secondary: {
        label: "Let's talk",
        href: "#contact",
      },
    },
  },

  // Contact Section
  contact: {
    title: "Let's work together",
    description: "I'm currently open to new opportunities. Whether you have a project in mind or just want to chat, I'd love to hear from you.",
    calendlyText: "Schedule a call",
    calendlyMicro: "15 min to get to know each other",
    emailText: "Or send me an email",
  },

  // Footer
  footer: {
    copyright: "All rights reserved.",
    links: [
      { label: "GitHub", href: "https://github.com/tomasmaritano" },
      { label: "LinkedIn", href: "https://linkedin.com/in/tomasmaritano" },
      { label: "Twitter", href: "https://x.com/tomasmaritano" },
    ],
  },
} as const;

// Type exports for TypeScript support
export type SiteConfig = typeof siteConfig;
