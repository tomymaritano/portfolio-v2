# Voice

This file describes the voice and editorial rules for the site. It is read by
two audiences: the owner-editor (writing manually) and the automated pipeline
that produces daily log entries.

## Who reads this

- The owner, when drafting or editing essays.
- The LLM pipeline that generates daily `/log` entries from git activity.

Both must follow the same rules so the two streams read like one person.

## Positioning

Writer-engineer based in Buenos Aires. Works on fintech, developer tools, and
clinical AI. Builds product-grade frontends and writes about the decisions
behind them. Influences for voice: Patrick Collison (editorial minimalism).
Influences for prose: _to be filled by owner_.

## Voice rules

- First person, present tense by default.
- English only.
- No emojis.
- No marketing adjectives: avoid "passionate", "cutting-edge", "leverage",
  "seamless", "robust", "powerful", "world-class".
- Prefer specifics over abstractions. Name the tool, the bug, the file.
- Dry humour is fine. Performative wit is not.
- Sentences earn their length. Default short.
- No headlines that promise. Headlines describe.
- Cite when borrowing an idea. Link to the source.

## Essays vs Log

**Essays** (`/writing`) are considered, edited, sparse. A few per month at most.
They take a position. They have a thesis. They can be revisited and updated.

**Log** (`/log`) entries are factual, dated, dryly told. They describe what
shipped that day across the repos, not what the day _felt_ like. They are not
diary entries.

## When to skip a day (no entry written)

Skip writing an entry entirely when **any** of these is true:

- 0 meaningful commits (e.g. only typo fixes, version bumps, dependency upgrades, formatting, lockfile updates, generated files, automated CI commits).
- Every commit message looks like "wip", "fix", ".", or has no semantic content.
- The day's changes are not understandable to someone outside the repo.
- The work is part of an unfinished branch that hasn't merged — wait for the merge day.

A skipped day produces no MDX file. Better silent than filler.

## Length tiers (for log entries)

Calibrate length to actual activity. Commit count is a proxy, but the real measure is **how much landed**. A single big PR can be a heavier entry than 30 commits across rebases. Use judgment, but anchor on these tiers:

| Tier | Trigger (rough) | Word target | Shape |
|---|---|---|---|
| **Micro** | 1–5 meaningful commits, 1 repo | 25–45 words | One paragraph, one sentence summarizing the change, one sentence on why or what's next |
| **Standard** | 6–15 commits, or 1 merged PR, or multi-repo work | 50–100 words | One paragraph, possibly two. Name the repos. Concrete details. |
| **Heavy** | 16+ commits, or a substantial PR merge, or shipping a feature end-to-end | 120–200 words | Two short paragraphs allowed. Set up the context, then describe what shipped. Can include a sentence on what's left. |

Always pick the **smallest** tier that fits. Don't pad a Standard day into a Heavy entry just because the day was long. Padding kills the voice.

## Skip vs Micro decision

The hardest call. Default to Skip unless:

- A user-visible change shipped, or
- A non-trivial bug was fixed, or
- A meaningful refactor happened (not just code formatting), or
- A new repo/project was created or archived.

If only mechanical changes happened (renaming variables, applying linters, updating deps), skip.

## Images in log entries

Most entries are pure text. Images only show up for **heavy tier** entries — and even there, sparingly. Goal: visual rhythm on long entries, not decoration.

**Rules:**

- Only heavy-tier entries may include images. Micro and standard never do.
- Max 2 images per entry. Often 1 is right. Never 3+.
- Place mid-body between paragraphs, not at the top.
- Use the Pollinations.ai URL pattern (no API key, generates on-demand, free):
  ```
  ![alt text](https://image.pollinations.ai/prompt/{url-encoded-prompt}?width=1200&height=630&nologo=true&model=flux)
  ```
- **Prompts must enforce editorial style.** Append these style hints to every prompt:
  `editorial illustration, minimal line art, muted palette, soft monochrome, no people, no text, abstract, restrained`
- Prompts should describe the *concept* of what shipped, not literal scenes. Examples:
  - Good: `branches merging into a single line` for a multi-PR merge day
  - Good: `nested rectangles forming a layout grid` for a CSS rewrite
  - Bad: `developer at desk coding on laptop, screens, sunset`
  - Bad: anything photo-realistic, anything with humans
- Alt text describes the concept in plain English, ≤ 80 chars.
- If you can't think of a non-cliché visual prompt, skip the image.

## Pipeline guardrails (for automated log entries)

- Never invent intent. Only report what changed.
- Collapse multiple commits per repo per day into one sentence.
- Tag with repo names in the `repos` frontmatter array.
- If the day touched fewer than 3 repos, name them inline in the body.
- Refer to repos by their short name (e.g. `portfolio-v2`, not `tomymaritano/portfolio-v2`).
- Never speculate about reasons for a change unless the commit message or PR
  description states them.
- If a change is reverted later the same day, say so, and do not write the
  original change as if it shipped.
- The `summary` field is a one-liner ≤ 100 chars. It should read as if pulled from a changelog.
