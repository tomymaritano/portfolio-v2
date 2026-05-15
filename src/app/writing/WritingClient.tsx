"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/PageHeader";

interface Post {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  image?: string;
}

export function WritingClient({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "description", "tags"],
        threshold: 0.3,
        includeScore: true,
      }),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;
    return fuse.search(query).map((result) => result.item);
  }, [query, fuse, posts]);

  const search = (
    <Input
      type="search"
      placeholder="Search…"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      aria-label="Search writing"
      className="h-8 w-full font-mono text-xs sm:w-[220px]"
    />
  );

  return (
    <main className="mx-auto min-h-[calc(100vh-80px)] max-w-[720px] px-5 pt-12 pb-24 md:px-8">
      <PageHeader
        title="Writing"
        subtitle="Essays on building software, tools, and products."
        actions={search}
      />

      <ul className="m-0 list-none p-0">
        {filteredPosts.map((post) => (
          <li key={post.slug} className="border-b border-border last:border-0">
            <Link
              href={`/writing/${post.slug}`}
              className="group grid grid-cols-1 items-baseline gap-1 py-4 text-foreground sm:grid-cols-[110px_1fr] sm:gap-4"
            >
              <time className="whitespace-nowrap font-mono text-[0.75rem] text-[var(--text-subtle)]">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </time>
              <div className="flex min-w-0 flex-col gap-1">
                <span className="font-serif text-[1.0625rem] leading-[1.4] text-foreground decoration-[var(--text-subtle)] decoration-1 underline-offset-[0.25em] group-hover:underline">
                  {post.title}
                </span>
                {post.description && (
                  <span className="line-clamp-2 font-serif text-[0.9375rem] leading-[1.5] text-muted-foreground">
                    {post.description}
                  </span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {filteredPosts.length === 0 && (
        <p className="m-0 py-8 font-serif text-[0.9375rem] italic text-muted-foreground">
          {query.trim() ? "No posts match your search." : "No posts yet."}
        </p>
      )}
    </main>
  );
}
