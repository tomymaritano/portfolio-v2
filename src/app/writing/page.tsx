import { allPosts } from "content-collections";
import type { Metadata } from "next";
import { WritingClient } from "./WritingClient";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays on building software, tools, and products.",
};

export default function WritingPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      tags: post.tags,
      date: post.date,
    }));

  return <WritingClient posts={posts} />;
}
