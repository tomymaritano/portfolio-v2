# Portfolio Aesthetic Overhaul — "Premium Dark Tooling"

> Raycast-inspired aesthetic + unique features + dead code cleanup

## 1. Aesthetic Direction

**Reference**: Raycast.com — premium dark tooling, atmospheric depth, refined micro-interactions.

**Accent color**: Cool mint green `#34D399` (refined from current emerald `#10b981`), secondary cyan `#06b6d4`.

### 1.1 Color System Overhaul

**Rule**: Every token using the old emerald `#10b981` / `rgb(16,185,129)` MUST be updated to the new mint `#34D399` / `rgb(52,211,153)`. This includes all `rgba()` constructions.

```
Token                    Current                          New
──────────────────────── ──────────────────────────────── ────────────────────────────────
--bg                     #09090b                          #050505
--bg-subtle              #0c0c0f                          #080809
--surface                #111113                          #0a0a0c
--surface-hover          #161618                          #111114
--surface-elevated       (new)                            #0f0f12
--border                 #1f1f23                          rgba(255,255,255,0.06)
--border-hover           #2a2a2e                          rgba(255,255,255,0.1)
--grid-color             rgba(255,255,255,0.03)           rgba(255,255,255,0.02)
--accent                 #10b981                          #34D399
--accent-hover           #059669                          #6EE7B7
--accent-muted           rgba(16,185,129,0.15)            rgba(52,211,153,0.12)
--accent-rgb             16, 185, 129                     52, 211, 153
--accent-glow            (new)                            rgba(52,211,153,0.15)
--gradient-accent        (new)                            linear-gradient(135deg, #34D399, #06b6d4)
--cyan                   #06b6d4                          #06b6d4 (unchanged)
--cyan-muted             rgba(6,182,212,0.15)             rgba(6,182,212,0.12)
--text                   #fafafa                          #e8e8ed
--text-secondary         #a1a1aa                          #8f8f9d
--text-muted             #8b8b93                          #5c5c6a
--text-subtle            #52525b                          #3a3a44

Shadows:
--shadow-sm              0 1px 2px rgba(0,0,0,0.4)       0 1px 2px rgba(0,0,0,0.5)
--shadow-md              0 4px 12px rgba(0,0,0,0.5)      0 4px 12px rgba(0,0,0,0.6)
--shadow-lg              0 8px 30px rgba(0,0,0,0.6)      0 8px 30px rgba(0,0,0,0.7)
--shadow-glow            0 0 20px rgba(16,185,129,0.15)   0 0 20px rgba(52,211,153,0.12)

Cards:
--card-bg                rgba(17,17,19,0.6)               rgba(10,10,12,0.5)
--card-bg-hover          rgba(22,22,24,0.8)               rgba(15,15,18,0.7)
--card-border            rgba(255,255,255,0.08)            rgba(255,255,255,0.06)
--card-border-hover      (new)                            rgba(52,211,153,0.3)
--card-shadow-hover      0 0 40px rgba(16,185,129,0.1)... 0 0 30px rgba(52,211,153,0.08), 0 8px 32px rgba(0,0,0,0.3)

Header:
--header-bg              rgba(9,9,11,0.8)                 rgba(5,5,5,0.7)
```

**`--surface-elevated` usage**: Command Palette background, Terminal page background, card image overlay gradient target.

**Light mode**: Adjust accent to `#059669` (darker green for WCAG AA contrast on white). All other light tokens keep the same relative relationship to dark. Light mode is secondary priority — implement after dark is finalized.

### 1.2 Atmosphere & Depth

**Noise grain overlay** on `body::before`:
- Inline SVG noise pattern (base64 encoded feTurbulence)
- `opacity: 0.03`, `pointer-events: none`
- `position: fixed`, `inset: 0`, **`z-index: 1`** (low — must not stack above modals, command palette, or mobile menu)
- Fixed position, covers viewport

**Gradient glow orbs**:
- Hero section: radial gradient orb (accent color, 400px radius, opacity 0.07) centered behind content
- Contact section: same treatment, creates visual bookend
- Implemented as `::after` pseudo-elements on the sections, `z-index: 0`, `pointer-events: none`

**Section dividers** — replace all `border-top: 1px solid var(--border)` with gradient fade. Implementation: remove `border-top` from each section's CSS module and add a shared utility class or per-section `::before`:
```css
.sectionDivider::before {
  content: "";
  display: block;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
}
```
Each section that currently has `border-top` gets this class added. The existing padding-top on sections provides the spacing below the divider — no margin-bottom needed on the pseudo-element.

### 1.3 Typography Refinements

Keep Geist Sans + Geist Mono + Instrument Serif (already installed).

Changes:
- Hero name: `4.5rem`, `font-weight: 800`, `letter-spacing: -0.05em`
- Hero role: gradient text `mint → cyan` using `background-clip: text`
- Section labels (mono uppercase): keep but reduce to `0.625rem`, increase `letter-spacing: 0.15em`
- Blog post titles: `font-weight: 600` (currently 500)
- Instrument Serif: use for the contact section title "Let's work together" and testimonial large quote mark

### 1.4 Hero Refinements

**Photo ring** — replace `border: 2px dashed` + `@keyframes spin` with animated conic gradient border:
- Use `@property --angle` for smooth rotation: `@property --angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }`
- `background: conic-gradient(from var(--angle), #34D399, #06b6d4, transparent 50%, #34D399)`
- `@keyframes spin` is REMOVED entirely, replaced by `@keyframes rotate-gradient { to { --angle: 360deg; } }`
- **Fallback for browsers without `@property`**: use the existing `transform: rotate(360deg)` animation on a pseudo-element with a static `conic-gradient`. The visual is slightly different (whole element rotates vs gradient rotates) but acceptable.
- Implementation: `.photoRing` becomes a pseudo-element with the gradient as background, masked to show only the border area using `mask: radial-gradient(circle, transparent 56px, black 57px)`

Other hero changes:
- Name: bigger, bolder (4.5rem/800)
- Role text: gradient `mint → cyan`
- CTAs: primary gets `background: rgba(52,211,153,0.1)`, `border: 1px solid rgba(52,211,153,0.2)`, glow on hover `box-shadow: 0 0 20px var(--accent-glow)`; secondary keeps underline style
- Floating messages: reduce opacity to 0.4 (sent) / 0.25 (received), add `filter: blur(0.5px)`, make more atmospheric
- Add gradient glow orb behind hero content

### 1.5 Cards & Surfaces

**ProjectCard**:
- Remove `rotate(0.5deg)` from hover — replace with `translateY(-2px)` only
- Remove `rotate()` from whileInView animation — just scale + opacity + blur
- Hover border: **gradient pseudo-element technique** (NOT `border-image`, which is clipped by `overflow: hidden`). Use `::before` absolutely positioned with `inset: -1px`, gradient background, `border-radius` matching card, and `z-index: -1`
- Add image overlay: `::after` on `.imageWrapper` with `background: linear-gradient(transparent 60%, var(--surface-elevated))`, `position: absolute`, `inset: 0`
- Shadow on hover: `0 0 30px rgba(52,211,153,0.08)`

**Testimonial cards**:
- Replace giant quote icon with gradient left border (`3px`, accent gradient via `border-left` + `border-image: var(--gradient-accent) 1`)
- Hover: border width grows to `4px`, subtle `translateY(-1px)`

**Tech badges** (About section):
- Hover glow: `box-shadow: 0 0 12px var(--accent-glow)`
- Category colors remain but get slightly refined

### 1.6 Navbar

- Scrolled state: `backdrop-filter: blur(20px) saturate(1.8)` (the Raycast trick)
- Background: `rgba(5, 5, 5, 0.7)` when scrolled
- Border-bottom: gradient fade instead of solid line
- Active indicator: replace 4px dot with pill shape (`padding: 2px 8px`, `background: var(--accent-muted)`, `border-radius: var(--radius-full)`)

### 1.7 Contact Section

- Title: use Instrument Serif (`font-family: var(--font-serif)`) for "Let's work together" — editorial accent
- Primary button: gradient background `mint → cyan`, glow on hover
- Add glow orb behind section (mirrors hero)

### 1.8 Footer

- Replace `background: var(--bg-subtle)` with subtle gradient `var(--bg) → var(--bg-subtle)`
- Top border: gradient fade (same pattern as section dividers)
- Slightly increase spacing for more breathing room

### 1.9 Micro-interactions

- All hover transitions: `200ms cubic-bezier(0.4, 0, 0.2, 1)` (replace current `150ms ease`)
- Blog post hover bar: animate with gradient (not solid accent)
- Change `once: false` to `once: true` on most `whileInView` animations — elements animate in once and stay (cleaner experience)
- Reduce stagger delays slightly for snappier feel

---

## 2. New Features

### 2.1 Unified Command Engine

A shared module that powers both the Command Palette and the CLI page.

**Location**: `src/lib/commands/`

```
src/lib/commands/
  index.ts          — command registry, execute(), search()
  types.ts          — Command, CommandResult types (NO React imports)
  commands/
    navigation.ts   — goto pages (home, projects, blog, etc.)
    search.ts       — search posts, projects by title/tag
    social.ts       — open github, linkedin, twitter
    theme.ts        — toggle dark/light
    spotify.ts      — show now playing
    info.ts         — about, contact, location, stack
    github.ts       — show github stats
    fun.ts          — easter eggs (party mode, etc.)
```

**Command interface** (pure data — no React types in lib layer):
```ts
interface Command {
  id: string;
  name: string;
  description: string;
  category: "navigation" | "search" | "social" | "action" | "info" | "fun";
  keywords: string[];
  icon?: string; // emoji or icon name string
  action: (args?: string[]) => CommandResult;
}

type CommandResult =
  | { type: "navigate"; url: string }
  | { type: "text"; content: string }
  | { type: "action"; done: boolean; message?: string }
  | { type: "data"; key: string; payload: Record<string, unknown> }
```

The `type: "data"` variant replaces the old `type: "component"` idea. The key is a string identifier (e.g., `"spotify-now-playing"`, `"github-stats"`) and the component layer maps keys to React components. This keeps the lib layer free of React imports.

**Component rendering map** (lives in `src/components/command-renderers/`):
```ts
// src/components/command-renderers/index.ts
const renderers: Record<string, (payload: Record<string, unknown>) => React.ReactNode> = {
  "spotify-now-playing": (data) => <NowPlayingCard {...data} />,
  "github-stats": (data) => <GitHubStatsCard {...data} />,
  // ...
};
```

Both the Command Palette and CLI page import this renderer map to display `type: "data"` results.

**Search**: Fuse.js (already installed) for fuzzy matching across command names + keywords.

### 2.2 Command Palette — Supercharged

Replace current `CommandPalette.tsx` with a Raycast-style launcher.

**Visual design**:
- Modal overlay with `backdrop-filter: blur(8px)`
- Palette container: `background: var(--surface-elevated)`, gradient border via pseudo-element, `border-radius: var(--radius-lg)`, max-width `640px`, centered
- Search input at top with accent focus ring
- Results area below, max-height `400px` with scroll

**Result sections**:
- Results are grouped by `command.category`
- Section headers: category name in mono uppercase, `0.625rem`, muted color
- Each section shows max 5 results; sections with 0 matches are hidden entirely
- **"Recent" section**: top of results. Stored in `localStorage` under key `portfolio:cmd-recent`. Schema: `string[]` of command IDs, max 5 entries, LIFO order. Populated when any command is executed.

**Each result row**:
- Icon (emoji) + command name (bold) + description (muted) in a single row
- Keyboard-highlighted row gets `background: var(--surface-hover)`, accent left border
- Enter executes, arrow keys navigate, Esc closes

**When a command returns a result**:
- `type: "navigate"`: palette closes, router navigates
- `type: "text"`: palette closes, nothing displayed (text is for terminal only)
- `type: "action"`: palette closes, action is performed (e.g., theme toggle)
- `type: "data"`: palette closes, nothing displayed (data rendering is for terminal only)

The palette is a **launcher** — it triggers commands and closes. Rich output rendering is the terminal's job.

### 2.3 Interactive CLI Page (`/terminal`)

A full-page terminal emulator styled to match the portfolio's premium dark theme.

**Page metadata**:
```ts
export const metadata: Metadata = {
  title: "Terminal",
  description: "Interactive terminal — explore the portfolio with commands",
  robots: { index: true, follow: true }, // indexable, it's a feature
};
```

**Add to sitemap**: yes. **Add to Navbar**: yes, as a nav item (replaces nothing, just adds "Terminal" link).

**Design**:
- Full-viewport dark terminal window with title bar (three colored dots + "tomás@portfolio ~ %")
- Background: `var(--surface-elevated)` with subtle inner glow
- Monospace text (Geist Mono), `--accent` color for prompt `❯`, `--text` for output
- Typing animation for responses (character by character, 20ms/char)
- Command history stored in React state (arrow up/down cycles, max 50 entries, session only)
- Welcome message with styled ASCII art intro + "Type `help` to get started"
- `help` command lists all available commands in categorized table

**Tab autocomplete**:
- Single match: auto-fills the command
- Multiple matches: shows all matching commands below input as a horizontal list, next Tab cycles through them
- Arguments are NOT autocompleted (only command names)

**Commands available** (all powered by unified command engine):
```
help                — list all commands in categorized table
about               — show bio text
projects            — list projects with status + link
blog                — list 5 recent posts with dates
skills              — show tech stack badges (rendered as text list)
contact             — show email + calendly + socials
spotify             — now playing (fetches from /api/spotify/now-playing)
github              — github contribution stats
theme [dark|light]  — toggle or set theme
clear               — clear terminal output
party               — activate party mode
whoami              — show locale (navigator.language) + timezone (Intl.DateTimeFormat)
```

`whoami` uses **only browser-available data**: `navigator.language`, `Intl.DateTimeFormat().resolvedOptions().timeZone`, and `screen.width × screen.height`. No IP geolocation, no third-party API calls.

### 2.4 Live Activity Feed

A compact component that shows a real-time-feeling stream of activity.

**Data aggregation**: **Server-side API route** at `/api/activity` that fetches and caches:
```ts
// src/app/api/activity/route.ts
// Fetches from multiple sources, returns unified list
// Cache: revalidate = 300 (5 minutes) to avoid GitHub rate limits
```

**Data sources**:
- **GitHub**: fetch `/users/tomymaritano/events` (public, no auth needed). Extract latest push event. Rate limit: 60/hr unauthenticated — the 5-minute cache means max 12 requests/hr.
- **Blog**: latest published post from content collections (available at build time, passed as static data)
- **Spotify**: call existing `/api/spotify/now-playing` internally
- **Deploy time**: use `process.env.VERCEL_GIT_COMMIT_SHA` or build timestamp

**Design**:
- Horizontal scrolling strip below hero CTAs
- Each item: category icon (emoji) + label + relative time ("2h ago")
- Newest item has a subtle pulse dot animation (like a live indicator)
- Compact: single line height, `font-size: 0.75rem`, mono font

**Location**: `src/components/ActivityFeed.tsx` (client component that fetches from `/api/activity`)

### 2.5 Enhanced Chat (Free — Built From Scratch)

There is **no existing chat UI component** — only the API route at `/api/chat/route.ts`. The chat UI must be built from scratch.

**Components**:
- `src/components/Chat.tsx` — main chat container (floating button + slide-up window)
- `src/components/Chat.module.css` — styles

**UI Design**:
- Floating circle button, bottom-right corner, `z-index: 50`
- Click opens slide-up chat window with glassmorphism (`backdrop-filter: blur(20px)`, gradient border)
- Window: `320px wide`, `480px max-height`, fixed position
- Message bubbles: user messages right-aligned (accent background), bot messages left-aligned (surface background)
- Typing animation: bot responses appear character by character (30ms/char)
- Quick reply chips below latest bot message (e.g., "About me", "Projects", "Contact")
- Chat history: stored in React state (session only, no persistence)
- Close button + minimize

**Backend**: existing `/api/chat/route.ts` — no changes needed, already supports bilingual FAQ matching.

### 2.6 Custom GitHub Heatmap

**This REPLACES the existing `GitHubCalendar.tsx`** — not a second component. The existing `GitHubCalendar.tsx` and `GitHubCalendar.module.css` are deleted and replaced with `GitHubHeatmap.tsx` and `GitHubHeatmap.module.css`.

**Data source**: keep the existing proxy approach (`github-contributions-api.jogruber.de`) that `GitHubCalendar.tsx` already uses — it's reliable and avoids GitHub GraphQL auth complexity.

**Design**:
- Color scale: 5 levels using portfolio tokens: `var(--bg)`, `rgba(52,211,153,0.1)`, `rgba(52,211,153,0.25)`, `rgba(52,211,153,0.5)`, `var(--accent)`
- Each cell: 10×10px squares with 2px gap, `border-radius: 2px`
- Tooltip on hover: date + contribution count (CSS-only tooltip or simple title attr)
- Month labels: Geist Mono, `0.625rem`, `--text-subtle`
- **Fix existing bug**: month labels now dynamically align to the correct week columns (current implementation uses hardcoded array)
- Day-of-week labels on left: Mon, Wed, Fri (Geist Mono, `0.5625rem`)
- Responsive: horizontal scroll container on mobile with `-webkit-overflow-scrolling: touch`

**Location**: `src/components/GitHubHeatmap.tsx` (replaces `GitHubCalendar.tsx`)
**Update imports**: any file importing `GitHubCalendar` must be updated to `GitHubHeatmap`.

---

## 3. Code Cleanup

### 3.1 Delete Dead Code

| File | Reason |
|------|--------|
| `src/components/ViewCounter.tsx` | Unused, references non-existent API |
| `src/components/ViewCounter.module.css` | Paired with dead component |
| `src/components/Giscus.tsx` | Unused comment system |
| `src/components/LanguageSwitcher.tsx` | Redundant, already inline in Navbar |
| `src/components/LanguageSwitcher.module.css` | Paired with dead component |
| `src/components/GitHubCalendar.tsx` | Replaced by GitHubHeatmap |
| `src/components/GitHubCalendar.module.css` | Paired with replaced component |

### 3.2 Clean Utilities

In `src/lib/utils.ts`, **first grep all files for each function name** to confirm zero usages. Then remove confirmed-unused functions. Expected to remove:
- `getInitials()`
- `truncate()`
- `slugify()`
- `capitalize()`
- `isServer`
- `isClient`

**`formatDate()`**: verify with grep — if used in blog templates or MDX pages, KEEP it. If unused, remove.

Keep `cn()` which is actively used.

### 3.3 Fix Stubs

- **Guestbook API**: Remove commented-out KV code. Add clear comment: `// DEV ONLY: in-memory storage, data resets on deploy`. Return header `X-Storage-Mode: memory` so it's visible in dev tools.
- **Newsletter API**: When no provider env vars are configured, return `{ error: "Newsletter not configured" }` with status 503 instead of fake 200 success.
- **Systems page**: Remove `/systems` route entirely (it's a "Coming Soon" placeholder with no timeline).

### 3.4 Experimental Flag

In `next.config.ts`, the `experimental.viewTransition` flag: check Next.js 16 docs. If stable, move to top-level `viewTransition: true`. If still experimental, leave as-is with a TODO comment.

---

## 4. Implementation Order

**All work happens on a feature branch** (`feat/aesthetic-overhaul`). The site will be in intermediate visual states between steps — this is expected and acceptable on a branch. Merge to main only after Step 11.

1. **Cleanup** — delete dead code, fix stubs, clean utils (low risk, quick wins)
2. **Design tokens + atmosphere** — update ALL tokens in globals.css at once, add noise grain, gradient dividers, glow orbs. Components will look slightly off until restyled — this is expected.
3. **Hero restyle** — new typography, photo ring, CTAs, floating messages
4. **Navbar restyle** — glassmorphism, active indicator, gradient border
5. **Cards restyle** — ProjectCard, Testimonials, tech badges
6. **Contact + Footer restyle** — serif title, gradient button, footer gradient
7. **Blog + Experience restyle** — post list, timeline refinements
8. **Command engine** — build the shared lib module (depends on: nothing)
9. **Command Palette** — rebuild with new design (depends on: Step 8 + Step 2 tokens)
10. **CLI page** — build `/terminal` (depends on: Step 8)
11. **Activity Feed** — build component + API route
12. **GitHub Heatmap** — build replacement component
13. **Chat UI** — build from scratch
14. **Polish pass** — animations, responsive, edge cases, cross-browser test

**Dependency note**: Steps 8-13 (features) depend on Step 2 (tokens) being done. Steps 9-13 are independent of each other and can be parallelized.

---

## 5. Non-Goals

- No paid AI APIs
- No database setup (keep things simple/free)
- Light mode is secondary (dark is the primary experience)
- No i18n changes (already working)
- No new content pages beyond /terminal
- No IP geolocation or third-party tracking in whoami
