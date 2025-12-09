import { allPosts } from "content-collections";
import type { Metadata } from "next";
import { PageLayout, PageHeader } from "@/components/PageLayout";
import { BlogClient } from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on product engineering, AI, and building things that ship.",
};

export default function BlogPage() {
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

  return (
    <PageLayout size="md">
      <PageHeader
        badge="Writing"
        title="Blog"
        description="Thoughts on product engineering, AI, and building things that ship."
      />

      <BlogClient posts={posts} />
    </PageLayout>
  );
}
