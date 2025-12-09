# Portfolio v2

A modern, minimal portfolio template built with Next.js 16, React 19, and TypeScript. Designed for Product Engineers, Developers, and Designers who want a clean, professional online presence.

## Use as a Template

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/tomasmaritano/portfolio.git my-portfolio
   cd my-portfolio
   npm install
   ```

2. **Configure your site** - Edit `src/config/site.ts`:
   ```typescript
   export const siteConfig = {
     // Personal Info
     name: "Your Name",
     role: "Your Role",
     tagline: "What you do",
     taglineAccent: "Your unique value.",
     location: "Your City, Country",
     email: "you@example.com",
     calendly: "https://calendly.com/yourhandle/intro",

     // Social Links
     social: {
       github: "https://github.com/yourhandle",
       linkedin: "https://linkedin.com/in/yourhandle",
       twitter: "https://x.com/yourhandle",
     },

     // ... rest of config
   };
   ```

3. **Add your content**:
   - Replace `public/images/profile.jpg` with your photo
   - Edit testimonials in `src/content/testimonials.json`
   - Add blog posts in `src/content/posts/`
   - Add projects in `src/content/projects/`

4. **Customize colors** - Edit `src/styles/globals.css`:
   ```css
   :root {
     --accent: #10b981; /* Your brand color */
   }
   ```

5. **Deploy**
   ```bash
   npm run build
   vercel
   ```

### Files to Customize

| File | What to Change |
|------|----------------|
| `src/config/site.ts` | Name, role, social links, meta |
| `src/content/testimonials.json` | Your testimonials |
| `src/content/now.json` | Your /now page content |
| `public/images/profile.jpg` | Your profile photo |
| `public/og-image.png` | Your OG image |
| `public/favicon.ico` | Your favicon |
| `public/robots.txt` | Your domain in sitemap URL |
| `src/styles/globals.css` | Colors, fonts |

---

## Tech Stack

### Core
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vanilla Extract** - Zero-runtime CSS-in-JS

### Content
- **Content Collections** - MDX content management
- **MDX** - Markdown with JSX support

### Features
- **Framer Motion** - Animations
- **Geist Font** - Typography
- **Fuse.js** - Fuzzy search
- **Shiki** - Syntax highlighting

### Analytics & Performance
- **Vercel Analytics** - Privacy-friendly analytics
- **Vercel Speed Insights** - Core Web Vitals monitoring

## Features

### Blog
- MDX-based posts with frontmatter
- Reading time calculation
- Table of Contents (auto-generated)
- Copy code button
- Share buttons (Twitter, LinkedIn, Copy)
- Reading progress bar
- Fuzzy search with Fuse.js
- JSON-LD structured data for SEO
- Dynamic OG images per post
- RSS feed (`/feed.xml`)

### Navigation
- Command Palette (`Cmd+K` / `Ctrl+K`)
- View Transitions API
- Interactive Terminal (press backtick `)

### Theme
- Dark/Light mode toggle
- System preference detection
- Persistent theme (localStorage)

### SEO
- Full metadata configuration
- Open Graph images
- Twitter cards
- JSON-LD schema (BlogPosting)
- XML Sitemap
- RSS feed
- robots.txt

## Project Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── [slug]/
│   │   │   ├── page.tsx
│   │   │   ├── page.module.css
│   │   │   └── opengraph-image.tsx
│   │   └── page.tsx
│   ├── projects/
│   ├── think/
│   ├── feed.xml/
│   │   └── route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── sitemap.ts
├── components/
│   ├── BlogSearch.tsx
│   ├── CodeBlock.tsx
│   ├── CommandPalette.tsx
│   ├── Giscus.tsx
│   ├── MDXContent.tsx
│   ├── ReadingProgress.tsx
│   ├── ShareButtons.tsx
│   ├── TableOfContents.tsx
│   ├── Terminal.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
├── content/
│   ├── posts/
│   ├── projects/
│   └── decisions/
└── styles/
    └── globals.css
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Content Management

### Blog Posts

Create `.mdx` files in `src/content/posts/`:

```mdx
---
slug: my-post
title: "My Post Title"
description: "A brief description"
date: "2025-01-01"
image: "/images/post-image.jpg"
tags: ["Tag1", "Tag2"]
published: true
---

Your content here...
```

### Projects

Create `.mdx` files in `src/content/projects/`:

```mdx
---
slug: project-name
name: "Project Name"
tagline: "Short description"
status: "live" | "archived" | "learning"
topics: ["React", "TypeScript"]
complexity: "foundational" | "intermediate" | "advanced"
---

Project description...
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Open Command Palette |
| `` ` `` (backtick) | Open Terminal |
| `↑` `↓` | Navigate in Command Palette |
| `Enter` | Select in Command Palette |
| `Esc` | Close modals |

## Components

### ShareButtons
Share post to Twitter, LinkedIn, or copy link.

### ReadingProgress
Progress bar showing scroll position on blog posts.

### BlogSearch
Fuzzy search powered by Fuse.js.

### TableOfContents
Auto-generated from H2/H3 headings with scroll spy.

### CodeBlock
Code blocks with copy-to-clipboard button.

### CommandPalette
Spotlight-style navigation (`Cmd+K`).

### Giscus
GitHub Discussions-based comments (requires configuration).

## Performance

- Static Site Generation (SSG)
- Edge runtime for dynamic routes
- Zero-runtime CSS (Vanilla Extract)
- Automatic image optimization
- View Transitions API enabled

## Deploy

Optimized for Vercel:

```bash
vercel
```

Or connect GitHub for automatic deployments.

## License

MIT
