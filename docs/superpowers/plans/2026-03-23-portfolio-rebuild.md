# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strip the portfolio from 13 pages to 6, delete broken/unused features, and restyle with a clean Raycast-meets-Linear aesthetic.

**Architecture:** Refactor in place. Three phases: (1) delete everything that's going away, (2) rewrite kept components to match new design, (3) create the new /about page. Each task produces a buildable commit.

**Tech Stack:** Next.js 16, TypeScript, CSS Modules, Framer Motion, content-collections, next-themes, cmdk, sonner, Fuse.js, Geist Sans/Mono.

**Spec:** `docs/superpowers/specs/2026-03-23-portfolio-rebuild-design.md`

---

## Phase 1: Delete & Clean

### Task 1: Delete pages, API routes, and content collections

**Files:**
- Delete: `src/app/terminal/` (entire directory)
- Delete: `src/app/guestbook/` (entire directory)
- Delete: `src/app/now/` (entire directory)
- Delete: `src/app/hire/` (entire directory)
- Delete: `src/app/uses/` (entire directory)
- Delete: `src/app/think/` (entire directory)
- Delete: `src/app/decisions/` (entire directory)
- Delete: `src/app/case-study/` (entire directory)
- Delete: `src/app/api/guestbook/` (entire directory)
- Delete: `src/app/api/newsletter/` (entire directory)
- Delete: `src/content/adrs/` (entire directory)
- Delete: `src/content/decisions/` (entire directory, if exists)
- Delete: `src/content/now.json`
- Delete: `src/content/testimonials.json` (if exists)
- Modify: `content-collections.ts` — remove `decisions` and `adrs` collections
- Modify: `src/app/sitemap.ts` — remove deleted pages
- Modify: `src/app/feed.xml/route.ts` — verify it only references `posts` (no changes expected)

- [ ] **Step 1: Delete page directories**

```bash
rm -rf src/app/terminal src/app/guestbook src/app/now src/app/hire src/app/uses src/app/think src/app/decisions src/app/case-study
```

- [ ] **Step 2: Delete API routes**

```bash
rm -rf src/app/api/guestbook src/app/api/newsletter
```

- [ ] **Step 3: Delete content collections and data files**

```bash
rm -rf src/content/adrs src/content/decisions
rm -f src/content/now.json src/content/testimonials.json
```

- [ ] **Step 4: Update content-collections.ts**

Remove the `decisions` and `adrs` collection definitions. Keep only `projects` and `posts`. Remove any imports of the deleted collection schemas.

- [ ] **Step 5: Update sitemap.ts**

Replace the current sitemap with only these static pages:
- `/` (priority 1.0, weekly)
- `/projects` (priority 0.8, weekly)
- `/blog` (priority 0.9, weekly)
- `/about` (priority 0.7, monthly)

Keep dynamic routes for `/blog/[slug]` and `/projects/[slug]`. Remove all references to deleted pages (hire, now, think, uses, guestbook, decisions, terminal, case-study).

- [ ] **Step 6: Verify feed.xml route**

Read `src/app/feed.xml/route.ts` and confirm it only imports `allPosts`. No changes expected — but if it references `allDecisions` or `allAdrs`, remove those references.

- [ ] **Step 7: Run build to verify**

```bash
npm run build
```

Expected: Build succeeds. Some warnings are OK, errors are not.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "chore: delete unused pages, API routes, and content collections"
```

---

### Task 2: Delete unused components, hooks, and libs

**Files:**
- Delete: `src/components/CursorEffect.tsx` + `src/components/CursorEffect.module.css`
- Delete: `src/components/EasterEggs.tsx`
- Delete: `src/components/Testimonials.tsx` + `src/components/Testimonials.module.css`
- Delete: `src/components/TextReveal.tsx` + CSS (if exists)
- Delete: `src/components/Skeleton.tsx` + `src/components/Skeleton.module.css`
- Delete: `src/components/ReadingProgress.tsx` + `src/components/ReadingProgress.module.css`
- Delete: `src/components/BlogSearch.tsx` + `src/components/BlogSearch.module.css`
- Delete: `src/components/CaseStudy.tsx` + `src/components/CaseStudy.module.css`
- Delete: `src/components/ProjectHero.tsx` + `src/components/ProjectHero.module.css`
- Delete: `src/components/Newsletter.tsx` + `src/components/Newsletter.module.css`
- Delete: `src/components/GitHubStats.tsx` + `src/components/GitHubStats.module.css`
- Delete: `src/hooks/useSoundEffects.ts`
- Delete: `src/lib/i18n/` (entire directory)
- Modify: `src/app/layout.tsx` — remove CursorEffect, EasterEggs, NowPlaying dynamic imports and I18nProvider
- Modify: `src/app/layout.tsx` — remove Instrument Serif font import and `--font-serif` variable
- Modify: `src/components/index.ts` — remove any exports referencing deleted components

- [ ] **Step 1: Delete component files**

```bash
rm -f src/components/CursorEffect.tsx src/components/CursorEffect.module.css
rm -f src/components/EasterEggs.tsx
rm -f src/components/Testimonials.tsx src/components/Testimonials.module.css
rm -f src/components/TextReveal.tsx src/components/TextReveal.module.css
rm -f src/components/Skeleton.tsx src/components/Skeleton.module.css
rm -f src/components/ReadingProgress.tsx src/components/ReadingProgress.module.css
rm -f src/components/BlogSearch.tsx src/components/BlogSearch.module.css
rm -f src/components/CaseStudy.tsx src/components/CaseStudy.module.css
rm -f src/components/ProjectHero.tsx src/components/ProjectHero.module.css
rm -f src/components/Newsletter.tsx src/components/Newsletter.module.css
rm -f src/components/GitHubStats.tsx src/components/GitHubStats.module.css
```

- [ ] **Step 2: Delete hooks and libs**

```bash
rm -f src/hooks/useSoundEffects.ts
rm -rf src/lib/i18n
```

- [ ] **Step 3: Update layout.tsx**

Remove these from `src/app/layout.tsx`:
1. The `Instrument_Serif` import from `next/font/google` and the `instrumentSerif` variable declaration
2. The `instrumentSerif.variable` from the `<html>` className
3. The dynamic imports for `NowPlaying`, `CursorEffect`, `EasterEggs`
4. The `<NowPlaying />`, `<CursorEffect />`, `<EasterEggs />` JSX
5. The `I18nProvider` import and `<I18nProvider>` wrapper around children
6. The `import { I18nProvider } from "@/lib/i18n/context"` line

After edits, the layout body should look like:

```tsx
<body>
  <ThemeProvider>
    <Navbar />
    <CommandPalette />
    <main style={{ paddingTop: "80px" }}>{children}</main>
    <Footer />
    <Toaster
      theme="dark"
      position="bottom-right"
      toastOptions={{
        style: {
          background: "var(--surface-elevated)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          fontFamily: "var(--font-sans)",
        },
      }}
    />
  </ThemeProvider>
  <Analytics />
  <SpeedInsights />
</body>
```

- [ ] **Step 4: Update components/index.ts**

Review `src/components/index.ts` and remove any exports that reference deleted components. Currently exports Hero, About, Projects, ProjectCard, Experience, Contact — all stay.

- [ ] **Step 5: Grep for broken imports**

```bash
grep -r "CursorEffect\|EasterEggs\|Testimonials\|TextReveal\|Skeleton\|ReadingProgress\|BlogSearch\|CaseStudy\|ProjectHero\|Newsletter\|GitHubStats\|useSoundEffects\|i18n" src/ --include="*.tsx" --include="*.ts" -l
```

Fix any remaining imports pointing to deleted files.

- [ ] **Step 6: Run build to verify**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "chore: delete unused components, hooks, and i18n"
```

---

### Task 3: Trim command palette commands

**Files:**
- Modify: `src/lib/commands/commands/navigation.ts`
- Modify: `src/lib/commands/commands/actions.ts`
- Modify: `src/lib/commands/commands/info.ts`
- Review: `src/lib/commands/commands/social.ts` (verify no deleted page references)

- [ ] **Step 1: Update navigation.ts**

Keep only these navigation commands:
- `goto-home` (/)
- `goto-projects` (/projects)
- `goto-blog` (/blog)
- `goto-about` (/about) — **new**, replace `goto-now`

Remove: `goto-now`, `goto-hire`, `goto-uses`, `goto-guestbook`, `goto-terminal`.

Add the new about command:

```ts
{
  id: "goto-about",
  name: "About",
  description: "About me",
  category: "navigation",
  keywords: ["about", "bio", "me", "quien", "sobre"],
  icon: "👤",
  action: () => ({ type: "navigate", url: "/about" }),
},
```

- [ ] **Step 2: Update actions.ts**

Remove the `party` command (Easter egg, out of scope). Remove the `clear` command (terminal-only). Keep `theme-toggle` and `spotify`.

- [ ] **Step 3: Update info.ts**

Keep `about`, `skills`, `contact` commands. Remove `whoami` (terminal gimmick). Verify none of the remaining commands reference deleted pages.

- [ ] **Step 4: Run build to verify**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: trim command palette to match reduced page set"
```

---

## Phase 2: Restyle Kept Components

### Task 4: Update globals.css color tokens

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Update dark mode color tokens**

In `globals.css`, update the `:root` (dark mode) CSS variables to match the spec:

```css
--bg: #09090b;
--surface: #111113;
--border: #1e1e22;
--text: #fafafa;
--text-secondary: #a1a1aa;
--text-muted: #71717a;
--text-subtle: #52525b;
--accent: #34d399;
```

Keep existing `--surface-hover`, `--surface-elevated`, `--accent-hover`, etc. and adjust them to be consistent with the new base tokens. Keep the existing `--space-*`, `--radius-*`, `--duration-*`, and `--shadow-*` tokens as-is.

Remove the noise/grain texture overlay from `body::before` if present.

Remove `--font-serif` variable and any Instrument Serif references.

- [ ] **Step 2: Verify light mode tokens still work**

The spec says keep light mode as-is. Verify the `[data-theme="light"]` section still has coherent values. No changes expected.

- [ ] **Step 3: Run build to verify**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "style: update design tokens to match new aesthetic"
```

---

### Task 5: Rewrite Navbar

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Navbar.module.css`

- [ ] **Step 1: Rewrite Navbar.tsx**

Replace the current Navbar with a simplified version:
- Logo: plain text "TM" (no typing animation)
- Nav links: Projects, Blog, About (3 items only)
- Active route indicator (simple underline or white text, not spring animation)
- ThemeToggle component
- ⌘K badge: `<kbd>` styled element
- Mobile: hamburger menu with just the 3 links + ThemeToggle
- Remove: language switcher, cycling name animation, complex scroll behavior

Keep it a client component (needs `usePathname` for active states).

The structure:

```tsx
<header className={styles.header}>
  <nav className={styles.nav}>
    <Link href="/" className={styles.logo}>TM</Link>
    <div className={styles.links}>
      <Link href="/projects">Projects</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/about">About</Link>
    </div>
    <div className={styles.actions}>
      <ThemeToggle />
      <kbd className={styles.kbd}>⌘K</kbd>
    </div>
  </nav>
</header>
```

- [ ] **Step 2: Rewrite Navbar.module.css**

Clean styles:
- Fixed header with `background: var(--bg)` and bottom border `1px solid var(--border)`
- Centered nav, max-width to match content
- Links: 13px, `color: var(--text-muted)`, active state `color: var(--text)`
- Logo: 15px, weight 600, `color: var(--text)`
- ⌘K badge: monospace, 10px, `background: var(--surface)`, border
- Mobile: simple slide-down menu, no complex animations

- [ ] **Step 3: Run build to verify**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "style: simplify navbar to clean TM + 3 links design"
```

---

### Task 6: Rewrite Footer

**Files:**
- Modify: `src/components/Footer.tsx`
- Modify: `src/components/Footer.module.css`

- [ ] **Step 1: Rewrite Footer.tsx**

Simplified footer with two columns:
- Left: `© {year} Tomás Maritano`
- Right: GitHub, LinkedIn, X links

```tsx
<footer className={styles.footer}>
  <span className={styles.copyright}>© {new Date().getFullYear()} Tomás Maritano</span>
  <div className={styles.links}>
    <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
    <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
    <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer">X</a>
  </div>
</footer>
```

- [ ] **Step 2: Rewrite Footer.module.css**

```css
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-top: 1px solid var(--border);
}
.copyright { color: var(--text-subtle); font-size: 12px; }
.links { display: flex; gap: 16px; }
.links a { color: var(--text-subtle); font-size: 12px; text-decoration: none; }
.links a:hover { color: var(--text-muted); }
```

- [ ] **Step 3: Run build to verify**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "style: simplify footer to copyright + social links"
```

---

### Task 7: Rewrite Hero section

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Hero.module.css`

- [ ] **Step 1: Rewrite Hero.tsx**

Replace the current Hero (floating messages, gradient ring, animated text) with the spec design:

```tsx
import Link from "next/link";
import { siteConfig } from "@/config/site";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.identity}>
        <div className={styles.avatar}>
          <img src={siteConfig.hero.photo} alt={siteConfig.name} />
        </div>
        <div>
          <div className={styles.name}>{siteConfig.name}</div>
          <div className={styles.location}>{siteConfig.role} · {siteConfig.location}</div>
        </div>
      </div>
      <h1 className={styles.tagline}>{siteConfig.tagline}</h1>
      <p className={styles.description}>
        Product engineer focused on fintech, developer tools, and thoughtful UI. TypeScript, React, Next.js.
      </p>
      <div className={styles.ctas}>
        <Link href="/projects" className={styles.primary}>View Projects</Link>
        <Link href="/blog" className={styles.ghost}>Read Blog</Link>
      </div>
    </section>
  );
}
```

No Framer Motion needed — static hero, no animations.

- [ ] **Step 2: Write Hero.module.css**

Styles matching the spec mockup:
- `.hero`: `padding: 80px 0 64px; max-width: 640px;`
- `.identity`: flex row, gap 12px, avatar 48px circle
- `.tagline`: 36px, weight 400, letter-spacing -0.02em, `color: var(--text)`
- `.description`: 15px, `color: var(--text-secondary)`, line-height 1.7
- `.primary`: `background: var(--text); color: var(--bg);` padding 8px 20px, radius 8px, 13px weight 500
- `.ghost`: transparent bg, `color: var(--text-muted)`, border 1px `var(--border)`

- [ ] **Step 3: Run build to verify**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "style: rewrite hero to clean avatar + tagline + CTAs"
```

---

### Task 8: Rewrite ProjectCard and Projects components

**Files:**
- Modify: `src/components/ProjectCard.tsx`
- Modify: `src/components/ProjectCard.module.css`
- Modify: `src/components/Projects.tsx`
- Modify: `src/components/Projects.module.css`

- [ ] **Step 1: Rewrite ProjectCard.tsx**

A clean card with: name, status badge, description, tech tags.

```tsx
import Link from "next/link";
import styles from "./ProjectCard.module.css";

interface Props {
  slug: string;
  name: string;
  tagline: string;
  status: string;
  topics: string[];
}

export function ProjectCard({ project }: { project: Props }) {
  const { slug, name, tagline, status, topics } = project;
  return (
    <Link href={`/projects/${slug}`} className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <span className={`${styles.badge} ${styles[status]}`}>{status}</span>
      </div>
      <p className={styles.tagline}>{tagline}</p>
      <div className={styles.topics}>
        {topics.slice(0, 3).map((t) => (
          <span key={t} className={styles.topic}>{t}</span>
        ))}
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Write ProjectCard.module.css**

Card style from spec: `background: #111113; border: 1px solid #1e1e22; border-radius: 12px; padding: 24px;`. Status badge colors: `live` = green, `experiment` = blue/cyan, `archived` = stone, `learning` = amber.

- [ ] **Step 3: Rewrite Projects.tsx (Home section)**

Show 3 featured projects + a "+N more" card. Section header with "Featured Projects" and "View all →" link.

```tsx
import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import styles from "./Projects.module.css";

interface Props {
  projects: Array<{ slug: string; name: string; tagline: string; status: string; topics: string[]; featured: boolean }>;
}

export function Projects({ projects }: Props) {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const totalCount = projects.length;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Featured Projects</h2>
        <Link href="/projects" className={styles.viewAll}>View all →</Link>
      </div>
      <div className={styles.grid}>
        {featured.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
        <Link href="/projects" className={styles.moreCard}>
          +{totalCount - featured.length} more projects →
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Write Projects.module.css**

Grid: 2-column, gap 16px. Section header: flex space-between. `.moreCard`: same card size, centered text, `color: var(--text-subtle)`.

- [ ] **Step 5: Run build to verify**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "style: rewrite project cards and featured projects section"
```

---

### Task 9: Rewrite BlogSection, Experience, Contact for Home

**Files:**
- Modify: `src/components/BlogSection.tsx`
- Modify: `src/components/BlogSection.module.css`
- Modify: `src/components/Experience.tsx`
- Modify: `src/components/Experience.module.css`
- Modify: `src/components/Contact.tsx`
- Modify: `src/components/Contact.module.css`

- [ ] **Step 1: Rewrite BlogSection.tsx**

Simple list: title left, date right. No cards, no images. Section header with "Recent Writing" and "View all →".

```tsx
import Link from "next/link";
import styles from "./BlogSection.module.css";

interface Post {
  slug: string;
  title: string;
  date: string;
}

export function BlogSection({ posts }: { posts: Post[] }) {
  const recent = posts.slice(0, 3);
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recent Writing</h2>
        <Link href="/blog" className={styles.viewAll}>View all →</Link>
      </div>
      <div className={styles.list}>
        {recent.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.row}>
            <span className={styles.postTitle}>{post.title}</span>
            <span className={styles.date}>
              {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write BlogSection.module.css**

Rows with bottom border. Title 15px, date monospace 12px right-aligned. Hover: text goes white.

- [ ] **Step 3: Rewrite Experience.tsx**

Data-driven from `experience.json`. Two modes: compact (for Home — no descriptions) and full (for /about — with descriptions).

```tsx
import experienceData from "@/content/experience.json";
import styles from "./Experience.module.css";

export function Experience({ variant = "compact" }: { variant?: "compact" | "full" }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Experience</h2>
      <div className={styles.list}>
        {experienceData.map((job) => (
          <div key={job.company} className={styles.entry}>
            <span className={styles.period}>{job.period}</span>
            <div className={styles.details}>
              <div className={styles.role}>{job.role}</div>
              <div className={styles.company}>{job.company} · {job.location}</div>
              {variant === "full" && job.highlights && (
                <p className={styles.description}>{job.highlights.join(". ")}.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Note: The `experience.json` fields are: `company`, `role`, `period`, `duration`, `location`, `type`, `highlights[]`. The code above uses `company`, `role`, `period`, `location`, `highlights` — all real fields.

- [ ] **Step 4: Write Experience.module.css**

Entry: flex row. Period: monospace, 12px, `color: var(--text-subtle)`, min-width 110px. Role: 15px weight 500. Company: 13px `color: var(--text-muted)`. Description (full only): 13px `color: var(--text-subtle)`.

- [ ] **Step 5: Rewrite Contact.tsx**

Centered CTA section:

```tsx
import { siteConfig } from "@/config/site";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Let's work together</h2>
      <p className={styles.description}>Got a project in mind? Let's talk.</p>
      <a href={`mailto:${siteConfig.email}`} className={styles.button}>
        Get in touch
      </a>
    </section>
  );
}
```

- [ ] **Step 6: Write Contact.module.css**

Centered text, section padding 64px. Button: primary style (white bg, dark text, 13px weight 500, padding 10px 24px, radius 8px).

- [ ] **Step 7: Run build to verify**

```bash
npm run build
```

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "style: rewrite blog section, experience, and contact for home"
```

---

### Task 10: Rewrite Home page with dividers

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.module.css`

- [ ] **Step 1: Rewrite page.tsx**

Wire up all the restyled sections with gradient dividers between them:

```tsx
import { allProjects, allPosts } from "content-collections";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { BlogSection } from "@/components/BlogSection";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import styles from "./page.module.css";

export default function Home() {
  const projects = allProjects;
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className={styles.main}>
      <Hero />
      <div className={styles.divider} />
      <Projects projects={projects} />
      <div className={styles.divider} />
      <BlogSection posts={posts} />
      <div className={styles.divider} />
      <Experience variant="compact" />
      <div className={styles.divider} />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 2: Write page.module.css**

```css
.main {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 32px;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent);
  margin: 0;
}
```

- [ ] **Step 3: Run build to verify**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: wire up home page with restyled sections and dividers"
```

---

### Task 11: Rewrite /projects page

**Files:**
- Modify: `src/app/projects/page.tsx`
- Create: `src/app/projects/page.module.css` (if doesn't exist)
- Create: `src/app/projects/ProjectsClient.tsx` (client component for filters)

- [ ] **Step 1: Create ProjectsClient.tsx**

Client component with filter pills and grid:

```tsx
"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import styles from "./page.module.css";

type Status = "all" | "live" | "experiment" | "learning" | "archived";

interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: string;
  topics: string[];
}

const filters: { label: string; value: Status }[] = [
  { label: "All", value: "all" },
  { label: "Live", value: "live" },
  { label: "Experiment", value: "experiment" },
  { label: "Learning", value: "learning" },
  { label: "Archived", value: "archived" },
];

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Status>("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.status === active);

  return (
    <>
      <div className={styles.filters}>
        {filters.map((f) => (
          <button
            key={f.value}
            className={`${styles.pill} ${active === f.value ? styles.active : ""}`}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Rewrite projects/page.tsx**

Server component wrapper:

```tsx
import { allProjects } from "content-collections";
import { ProjectsClient } from "./ProjectsClient";
import styles from "./page.module.css";

export const metadata = {
  title: "Projects",
  description: "Things I've built, shipped, and experimented with.",
};

export default function ProjectsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>Things I've built, shipped, and experimented with.</p>
      </div>
      <ProjectsClient projects={allProjects} />
    </main>
  );
}
```

- [ ] **Step 3: Write page.module.css**

Header, filter pills (active = white bg), 2-col grid, responsive (1 col on mobile).

- [ ] **Step 4: Run build to verify**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: rewrite /projects page with status filter pills"
```

---

### Task 12: Rewrite /projects/[slug] detail page

**Files:**
- Modify: `src/app/projects/[slug]/page.tsx`
- Create: `src/app/projects/[slug]/page.module.css` (if doesn't exist)

- [ ] **Step 1: Rewrite the page**

Clean project detail: back link, title + badge, tagline, tech pills, links, MDX body. **Preserve the existing `generateStaticParams` and `generateMetadata` functions** — they handle static generation and SEO correctly. Only rewrite the default export (the page component JSX).

Key structure:
- Back link: `← Back to projects`
- H1 + status badge inline
- Tagline as subtitle
- Tech topics as monospace pills
- Live/source links if available in project data
- Divider
- MDX content via `<MDXContent>` component

- [ ] **Step 2: Write page.module.css**

Max-width 640px for body. Header styling matching spec. Badge colors matching ProjectCard.

- [ ] **Step 3: Run build to verify**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "style: rewrite project detail page to clean header + MDX"
```

---

### Task 13: Rewrite /blog page

**Files:**
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/blog/BlogClient.tsx`
- Modify or create: `src/app/blog/page.module.css`

- [ ] **Step 1: Rewrite BlogClient.tsx**

Client component with search input and post list. Use Fuse.js for search (already a dependency).

Each post row: title + date (right), description below, tag pills below. Bottom border between rows.

- [ ] **Step 2: Rewrite blog/page.tsx**

Server component wrapper:

```tsx
import { allPosts } from "content-collections";
import { BlogClient } from "./BlogClient";

export const metadata = {
  title: "Blog",
  description: "Thoughts on building software, tools, and products.",
};

export default function BlogPage() {
  const posts = allPosts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return <BlogClient posts={posts} />;
}
```

- [ ] **Step 3: Write page.module.css**

Search input styled as card (surface bg, border, radius 8px). Post rows with border-bottom. Tags as monospace pills. Responsive.

- [ ] **Step 4: Run build to verify**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: rewrite /blog page with search and clean list layout"
```

---

### Task 14: Restyle /blog/[slug] detail page

**Files:**
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: `src/components/TableOfContents.tsx`
- Modify: `src/components/TableOfContents.module.css`
- Modify: `src/components/ShareButtons.tsx`
- Modify: `src/components/ShareButtons.module.css`

- [ ] **Step 1: Restyle blog post page**

Update the blog detail page to:
- Remove ReadingProgress import
- Remove JSON-LD structured data if it over-complicates (or keep — it's good SEO)
- Add back link `← Back to blog`
- Show date + reading time in monospace
- Show title (h1, 28px)
- Show tag pills
- Inline TOC card (not sidebar)
- MDX body at ~640px max-width
- Share links at bottom

- [ ] **Step 2: Restyle TableOfContents as inline card**

Change from sidebar to inline card style:

```css
.toc {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 32px;
}
.tocLabel {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-subtle);
  margin-bottom: 10px;
}
.tocLink {
  color: var(--text-muted);
  font-size: 13px;
  line-height: 2;
}
```

- [ ] **Step 3: Simplify ShareButtons**

Clean text links: "Share:" label + X, LinkedIn, Copy link. No icons, just underlined text links.

- [ ] **Step 4: Run build to verify**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "style: restyle blog detail with inline TOC and clean share links"
```

---

## Phase 3: New About Page

### Task 15: Create /about page

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/about/page.module.css`
- Modify: `src/components/About.tsx` — rewrite for /about page (bio + stack + social)
- Modify: `src/components/About.module.css`
- Modify: `src/components/NowPlaying.tsx` — restyle as inline card
- Modify: `src/components/NowPlaying.module.css`

- [ ] **Step 1: Rewrite About.tsx component**

Bio section with larger avatar, name, location, paragraphs, social links. Plus tech stack grouped by category.

```tsx
import { siteConfig } from "@/config/site";
import styles from "./About.module.css";

const stack = {
  Languages: ["TypeScript", "JavaScript", "Python"],
  Frameworks: ["React", "Next.js", "Node.js"],
  Tools: ["Vercel", "Prisma", "PostgreSQL", "Docker"],
};

export function About() {
  return (
    <div className={styles.about}>
      {/* Bio */}
      <div className={styles.bio}>
        <div className={styles.identity}>
          <img src={siteConfig.hero.photo} alt={siteConfig.name} className={styles.avatar} />
          <div>
            <h1 className={styles.name}>{siteConfig.name}</h1>
            <p className={styles.location}>{siteConfig.role} · {siteConfig.location}</p>
          </div>
        </div>
        <p className={styles.text}>
          I build products that users love and businesses need. Currently focused on fintech
          and developer tools. I care about shipping fast without cutting corners — the kind
          of software that feels good to use and is built to last.
        </p>
        <p className={styles.text}>
          Previously built software for tourism, Web3, and delivery platforms across Latin
          America and Europe.
        </p>
        <div className={styles.socials}>
          <a href={siteConfig.social.github}>GitHub</a>
          <a href={siteConfig.social.linkedin}>LinkedIn</a>
          <a href={siteConfig.social.twitter}>X</a>
          <a href={`mailto:${siteConfig.email}`}>Email</a>
        </div>
      </div>

      {/* Stack */}
      <div className={styles.stack}>
        <h2 className={styles.sectionTitle}>Stack</h2>
        {Object.entries(stack).map(([category, items]) => (
          <div key={category} className={styles.stackGroup}>
            <span className={styles.stackLabel}>{category}</span>
            <div className={styles.pills}>
              {items.map((item) => (
                <span key={item} className={styles.pill}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write About.module.css**

Avatar 80px circle. Name 28px weight 500. Bio text 15px `color: var(--text-secondary)`. Social links underlined. Stack: category labels monospace uppercase 11px. Pills with subtle border.

- [ ] **Step 3: Restyle NowPlaying.tsx as inline card**

Modify NowPlaying to work as an inline card (not floating widget):
- Remove fixed positioning
- Card style: `background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px 24px`
- Album art (48px rounded), song title, artist, animated equalizer bars
- Max-width ~420px
- "Not playing" fallback with Spotify icon

- [ ] **Step 4: Create about/page.tsx**

Wire up all sections with dividers:

```tsx
import { About } from "@/components/About";
import { GitHubCalendar } from "@/components/GitHubCalendar";
import { NowPlaying } from "@/components/NowPlaying";
import { Experience } from "@/components/Experience";
import styles from "./page.module.css";

export const metadata = {
  title: "About",
  description: "Product Engineer based in Buenos Aires. Building fintech and developer tools.",
};

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <About />
      <div className={styles.divider} />
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Activity</h2>
        <div className={styles.card}>
          <GitHubCalendar username="tomymaritano" />
        </div>
      </section>
      <div className={styles.divider} />
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Listening</h2>
        <NowPlaying />
      </section>
      <div className={styles.divider} />
      <Experience variant="full" />
    </main>
  );
}
```

- [ ] **Step 5: Write about/page.module.css**

Max-width 640px, centered. Same divider style as home. Section headings 18px weight 500. Card wrapper for GitHubCalendar with surface bg + border.

- [ ] **Step 6: Run build to verify**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: create /about page with bio, stack, GitHub, Spotify, experience"
```

---

## Phase 4: Final Polish

### Task 16: Responsive pass and final verification

**Files:**
- Potentially modify: any CSS module that needs mobile breakpoints

- [ ] **Step 1: Add responsive breakpoints**

Review all new CSS modules and add `@media (max-width: 768px)` rules:
- Home project grid: 1 column
- Navbar: mobile menu
- Hero: reduce padding and font sizes
- Experience: stack period above role on mobile
- Footer: stack vertically

- [ ] **Step 2: Run full verification**

```bash
npm run build
```

Then `npm run dev` and manually verify all 17 criteria from the spec:
1. Build passes clean
2. Dark mode by default (no flash)
3. ⌘K command palette works
4. Theme toggle works
5. All 6 pages render
6. Project filters work
7. Blog search works
8. Blog TOC shows
9. GitHub Calendar on /about
10. Spotify on /about
11. Share buttons on blog posts
12. No console errors
13. Responsive on mobile
14. Deleted pages return 404
15. RSS feed works
16. Sitemap correct
17. OG images generate

- [ ] **Step 3: Fix any issues found**

Address any issues from the verification pass.

- [ ] **Step 4: Final commit**

```bash
git add -A && git commit -m "style: responsive polish and final verification fixes"
```
