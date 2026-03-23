# Portfolio Rebuild — Design Spec

## Context

The current portfolio has 13 pages, ~30 components, and feels scattered. Features that don't work (ActivityFeed, Chat, GitHubHeatmap) ship broken. Too many extras dilute the core message. The site needs to be stripped down to what matters and rebuilt with focus.

**Audience:** Developer community — show what I build and establish reputation.

**Approach:** Refactor in place. Delete what's not needed, restructure what stays, and polish the visual design. The codebase has solid foundations (content-collections, design system, Spotify integration, command engine) — the problem is scope, not code quality.

## Pages (6 total)

| Route | Purpose | Rendering |
|-------|---------|-----------|
| `/` | Hero + Featured Projects (3-4) + Recent Posts (3) + Experience (compact) + CTA | SSG |
| `/projects` | All projects with status filter (All/Live/Experiment/Archived), 2-col grid | SSG |
| `/projects/[slug]` | Project detail — header + tech stack + MDX body | SSG (`generateStaticParams`) |
| `/blog` | All posts with search, list layout (title + date + description + tags) | SSG |
| `/blog/[slug]` | Post detail — date + reading time + TOC + MDX body + share links | SSG (`generateStaticParams`) |
| `/about` | Bio + Tech Stack + GitHub Calendar + Spotify (inline) + Experience (full) | SSG (calendar/spotify client-fetched) — **new page** (no existing `src/app/about/`) |

### Pages to delete

`/terminal`, `/guestbook`, `/now`, `/hire`, `/uses`, `/think`, `/decisions`, `/case-study`

## Layout Structure

```
layout.tsx
├── Navbar (logo "TM", Projects, Blog, About links, ThemeToggle, ⌘K hint badge)
├── CommandPalette (global, ⌘K trigger — cmdk)
├── {children}
├── Footer (copyright + social links: GitHub, LinkedIn, X)
├── Toaster (sonner, bottom-right)
├── Analytics + SpeedInsights
```

### Removed from layout

- Chat widget (deleted)
- NowPlaying floating widget (moved inline to /about)
- CursorEffect (deleted)
- EasterEggs (deleted)
- I18nProvider (deleted — single language)

## Aesthetic Direction

**Hybrid Raycast-meets-Linear.** Dark mode default, clean sans-serif (Geist Sans) with monospace details (Geist Mono) for badges, dates, code, and status indicators. Mint green accent (#34D399) used sparingly for status badges and active states only.

### Design Principles

1. **No gradients, no glow, no noise texture.** Pure structure + typography.
2. **Monospace for metadata** — dates, status badges, tech tags, reading time, keyboard shortcuts.
3. **Sans-serif for content** — headings, body text, descriptions.
4. **Instrument Serif removed** — not used in the new design. Remove the `Instrument_Serif` import and `--font-serif` variable from `layout.tsx`.
5. **Gradient fade dividers** between sections: `linear-gradient(90deg, transparent, #27272a 20%, #27272a 80%, transparent)`.
6. **Card style**: `background: #111113; border: 1px solid #1e1e22; border-radius: 12px; padding: 24px`.
7. **Max content width**: ~640px for reading pages (blog detail, project detail, about bio).
8. **Spacing rhythm**: 48-80px between major sections, 24-32px between subsections.

### Color Tokens (dark mode)

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | #09090b | Page background |
| `--surface` | #111113 | Cards, elevated surfaces |
| `--border` | #1e1e22 | Card borders, dividers |
| `--text` | #fafafa | Primary text |
| `--text-secondary` | #a1a1aa | Body text, descriptions |
| `--text-muted` | #71717a | Secondary info (company names, subtitles) |
| `--text-subtle` | #52525b | Tertiary info (dates, metadata) |
| `--accent` | #34d399 | Status badges, active indicators |

### Light Mode

Keep existing light mode CSS variables from `globals.css` as-is. No redesign — the dark theme is primary. Light mode just needs to not look broken when toggled.

### Typography

| Use | Font | Size | Weight |
|-----|------|------|--------|
| Page title (h1) | Geist Sans | 28-36px | 400-500 |
| Section heading (h2) | Geist Sans | 18-20px | 500 |
| Body text | Geist Sans | 14-15px | 400 |
| Metadata (dates, tags, status) | Geist Mono | 10-12px | 400 |
| Kbd hints | Geist Mono | 10px | 400 |

## Page Designs

### Home (`/`)

**Hero section:**
- Left-aligned. Avatar (48px circle) + name/location beside it.
- Tagline as h1 (36px, weight 400, letter-spacing -0.02em).
- One-line description in secondary text color.
- Two CTAs: "View Projects" (primary: white bg, dark text) and "Read Blog" (ghost: border only).

**Featured Projects:**
- Section header: "Featured Projects" left + "View all →" right.
- 2-column grid of project cards. Each card: name + status badge, description, tech tags (monospace).
- Show 3 featured projects + 1 "+N more projects →" card linking to /projects.

**Recent Writing:**
- Section header: "Recent Writing" left + "View all →" right.
- Simple list rows: post title (15px) left + date (monospace, 12px) right. No descriptions, no tags, no cards. Clean horizontal lines.
- Show 3 most recent published posts.

**Experience (compact):**
- Section header: "Experience".
- Each entry: date range (monospace, left column, ~100px) + role title + company/industry. No descriptions — those go on /about.
- Show all entries.

**CTA:**
- Centered. "Let's work together" heading, short description, single "Get in touch" button (primary style). Links to email or Calendly.

### Projects (`/projects`)

**Header:** Title "Projects" + subtitle.

**Filters:** Horizontal pill buttons — All (active/white), Live, Experiment, Learning, Archived. Maps to the `status` field in the project schema (`live | archived | learning | experiment`). Client-side filtering.

**Grid:** 2-column card grid. Same card style as Home featured section. All projects shown, filtered by status.

### Project Detail (`/projects/[slug]`)

**Header area:**
- "← Back to projects" link.
- Project name (h1, 28px) + status badge inline.
- Tagline as subtitle.
- Tech stack as monospace pills.
- "Live site ↗" and "Source ↗" links (underlined, secondary color).

**Body:** Horizontal divider, then MDX content at ~640px max-width.

### Blog (`/blog`)

**Header:** Title "Blog" + subtitle.

**Search:** Input with search icon. Client-side filtering via Fuse.js (already in dependencies).

**List:** Each post is a row with bottom border:
- Title (15px, weight 500) left + date (monospace, 11px) right.
- Description below (13px, subtle color).
- Tag pills below description (monospace, 10px, subtle bg).

### Blog Detail (`/blog/[slug]`)

**Header area:**
- "← Back to blog" link.
- Date + reading time (monospace, 12px).
- Post title (h1, 28px).
- Tag pills.

**TOC:** Inline card with "On this page" label + heading links. Only shown if 2+ headings.

**Body:** Horizontal divider, then MDX content at ~640px max-width. Existing `MDXContent` component with `CodeBlock` for syntax highlighting.

**Footer:** Share links (X, LinkedIn, Copy link) with divider above.

### About (`/about`)

**Bio section:**
- Larger avatar (80px) + name (h1) + location.
- 2 short paragraphs describing role, focus, background.
- Social links as underlined text (GitHub, LinkedIn, X, Email).

**Stack section:**
- Heading "Stack".
- Grouped by category: Languages, Frameworks, Tools. Category labels in monospace uppercase.
- Tech items as pill badges with subtle border.

**Activity section:**
- Heading "Activity".
- GitHub Calendar component inside a card container. Uses existing `GitHubCalendar` component (client-side fetched).

**Listening section:**
- Heading "Listening".
- Spotify Now Playing as inline card (not floating widget): album art + song title + artist + animated equalizer bars. "Not playing" fallback state.
- Uses existing Spotify integration (`/api/spotify/now-playing`).

**Experience section (full):**
- Heading "Experience".
- Same layout as Home but with description text for each role.
- Date range (monospace) | Role + Company + Description.

## Components

### Keep (modify as needed)

| Component | Changes |
|-----------|---------|
| `Navbar` | Simplify: logo "TM", 3 nav links (Projects, Blog, About), ThemeToggle, ⌘K badge |
| `Footer` | Simplify: copyright + 3 social links |
| `Hero` | Rewrite to match new design — no gradient ring, no badge, no animated text |
| `CommandPalette` | Already migrated to cmdk. Trim commands to match reduced page set |
| `ThemeProvider` | Already migrated to next-themes. Keep as-is |
| `ThemeToggle` | Already migrated. Keep as-is |
| `ProjectCard` | Simplify to match new card design |
| `GitHubCalendar` | Move from Home to /about. Keep client-side fetching |
| `NowPlaying` | Move from layout (floating) to /about (inline card). Restyle |
| `MDXContent` | Keep as-is |
| `CodeBlock` | Keep as-is |
| `ShareButtons` | Simplify styling to match new design |
| `TableOfContents` | Restyle as inline card |
| `BlogSection` | Rewrite as simple list (no cards) |
| `Experience` | Keep data-driven from experience.json. Add compact/full variants |
| `Contact` | Simplify to centered CTA |
| `About` | Rewrite for /about page (bio + stack + social links) |
| `Projects` | Rewrite with status filter pills |
| `PageLayout` | Keep for consistent page padding |

### Delete

| Component | Reason |
|-----------|--------|
| `CursorEffect` | Gimmick, not aligned with clean aesthetic |
| `EasterEggs` | Out of scope (no CSS module) |
| `Testimonials` | Out of scope |
| `TextReveal` | Not used in new design |
| `Skeleton` | Unused |
| `ReadingProgress` | Removed — adds visual noise |
| `BlogSearch` | Fold search logic into /blog page directly |
| `CaseStudy` | Page deleted |
| `ProjectHero` | Not used in new project detail design |
| `Newsletter` + CSS | Out of scope |
| `GitHubStats` | Out of scope |

### New components

None — the design is intentionally built from existing primitives.

## Files to Delete

### Pages
- `src/app/terminal/` (page.tsx, TerminalClient.tsx)
- `src/app/guestbook/` (page.tsx, GuestbookForm.tsx, GuestbookEntries.tsx, page.module.css)
- `src/app/now/` (page.tsx)
- `src/app/hire/` (page.tsx)
- `src/app/uses/` (page.tsx)
- `src/app/think/` (page.tsx, [constraint]/page.tsx)
- `src/app/decisions/` (page.tsx, [slug]/page.tsx)
- `src/app/case-study/` (page.tsx)

### API routes
- `src/app/api/guestbook/`
- `src/app/api/newsletter/`

### Components
- `src/components/CursorEffect.tsx` + CSS
- `src/components/EasterEggs.tsx` + CSS (if exists)
- `src/components/Testimonials.tsx` + CSS
- `src/components/TextReveal.tsx` + CSS
- `src/components/Skeleton.tsx` + CSS
- `src/components/ReadingProgress.tsx` + CSS
- `src/components/BlogSearch.tsx` + CSS
- `src/components/CaseStudy.tsx` + CSS
- `src/components/ProjectHero.tsx` + CSS
- `src/components/Newsletter.tsx` + CSS
- `src/components/GitHubStats.tsx` + CSS

### Hooks
- `src/hooks/useSoundEffects.ts`

### Libs
- `src/lib/i18n/` (context.tsx, dictionaries.ts)

### Content collections
- `src/content/adrs/` (all files)
- `src/content/decisions/` (all files, if separate from adrs)

### Data files
- `src/content/now.json`
- `src/content/testimonials.json` (if exists)

## Commands Engine Updates

Trim `src/lib/commands/` to only include commands relevant to the 6-page site:

**Keep:** Navigation commands (/, /projects, /blog, /about), social links (GitHub, LinkedIn, X, Email), theme toggle, Spotify now playing.

**Remove:** Terminal-specific commands, guestbook, newsletter, hire, uses, now, decisions, think, party mode, clear, and any other commands referencing deleted pages.

## Content Collections Updates

Update `content-collections.ts`:
- Keep: Projects collection, Posts collection.
- Remove: ADRs collection, Decisions collection.

## Tech Stack (unchanged)

- Next.js 16 (App Router)
- TypeScript
- CSS Modules + CSS Variables
- Framer Motion (for page transitions and micro-interactions only)
- Content-Collections (MDX)
- Geist Sans + Geist Mono (drop Instrument Serif)
- next-themes (dark default, `data-theme` attribute)
- cmdk (command palette)
- sonner (toasts)
- @ark-ui/react (available for future use)
- Fuse.js (search)
- Vercel Analytics + Speed Insights

## Verification Criteria

1. `npm run build` passes clean — no TypeScript errors
2. Site loads in dark mode by default (no flash)
3. ⌘K opens command palette, all commands work
4. Theme toggle works (dark ↔ light)
5. All 6 pages render correctly
6. Projects page filters work
7. Blog search works
8. Blog detail shows TOC when 2+ headings
9. About page shows GitHub Calendar (client-fetched)
10. About page shows Spotify now playing (client-fetched)
11. Share buttons work on blog posts
12. No console errors
13. Responsive on mobile widths (single column, adapted spacing)
14. All deleted pages return 404
15. RSS feed still works (`/feed.xml`)
16. Sitemap reflects only the 6 pages + dynamic routes
17. OG images still generate for blog posts
