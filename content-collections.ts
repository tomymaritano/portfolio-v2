import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import { z } from "zod";

const projectSchema = z.object({
  slug: z.string(),
  name: z.string(),
  tagline: z.string(),
  status: z.enum(["live", "archived", "learning"]),
  topics: z.array(z.string()),
  complexity: z.enum(["foundational", "intermediate", "advanced"]),
  image: z.string().optional(),
});

const postSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(true),
});

const decisionSchema = z.object({
  id: z.string(),
  constraint: z.enum([
    "ambiguity",
    "time_pressure",
    "bad_data",
    "legacy",
    "stakeholder_conflict",
  ]),
  context: z.string(),
  decision: z.string(),
  projectSlug: z.string().optional(),
});

const adrSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  status: z.enum(["accepted", "superseded", "deprecated", "proposed"]),
  context: z.string(),
  decision: z.string(),
  consequences: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
});

const projects = defineCollection({
  name: "projects",
  directory: "src/content/projects",
  include: "**/*.mdx",
  schema: projectSchema,
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    });
    return {
      ...document,
      mdx,
    };
  },
});

const decisions = defineCollection({
  name: "decisions",
  directory: "src/content/decisions",
  include: "**/*.mdx",
  schema: decisionSchema,
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    });
    return {
      ...document,
      mdx,
    };
  },
});

const adrs = defineCollection({
  name: "adrs",
  directory: "src/content/adrs",
  include: "**/*.mdx",
  schema: adrSchema,
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    });
    return {
      ...document,
      mdx,
    };
  },
});

const posts = defineCollection({
  name: "posts",
  directory: "src/content/posts",
  include: "**/*.mdx",
  schema: postSchema,
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    });
    // Calculate reading time (average 200 words per minute)
    const words = document.content.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);
    // Extract headings for table of contents
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const headings: { level: number; text: string; slug: string }[] = [];
    let match;
    while ((match = headingRegex.exec(document.content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const slug = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      headings.push({ level, text, slug });
    }
    return {
      ...document,
      mdx,
      readingTime,
      headings,
    };
  },
});

export default defineConfig({
  collections: [projects, decisions, adrs, posts],
});
