# Portfolio v2

Personal portfolio built with Next.js 16, React 19, and TypeScript.

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
