import { allPosts } from "content-collections";
import { MDXContent } from "@/components/MDXContent";
import { ShareButtons } from "@/components/ShareButtons";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { Metadata } from "next";

const siteUrl = "https://tomasmaritano.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allPosts
    .filter((post) => post.published)
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function WritingPostPage({ params }: Props) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug && p.published);

  if (!post) notFound();

  const postUrl = `${siteUrl}/writing/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: "Tomas Maritano", url: siteUrl },
    publisher: { "@type": "Person", name: "Tomas Maritano" },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
  };

  return (
    <>
      <Script
        id={`jsonld-${post.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>
      <main className="mx-auto min-h-screen max-w-[720px] px-5 pt-12 pb-24 md:px-8">
        <Link
          href="/writing"
          className="mb-10 inline-block font-mono text-[0.75rem] tracking-[0.02em] text-[var(--text-subtle)] transition-colors hover:text-foreground"
        >
          &larr; Back to writing
        </Link>

        <header className="mb-10 border-b border-border pb-6">
          <div className="mb-4 flex items-center gap-2">
            <time className="font-mono text-[0.75rem] text-[var(--text-subtle)]">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="font-mono text-[0.75rem] text-[var(--text-subtle)]">·</span>
            <span className="font-mono text-[0.75rem] text-[var(--text-subtle)]">
              {post.readingTime} min read
            </span>
          </div>
          <h1 className="mb-4 font-serif text-[1.625rem] font-normal leading-[1.2] tracking-[-0.02em] text-foreground sm:text-[2rem]">
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[var(--radius-sm)] border border-border px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.04em] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="mb-8 w-full rounded-[var(--radius-md)] border border-border"
          />
        )}

        <article className="prose">
          <MDXContent code={post.mdx} />
        </article>

        <footer className="mt-14 flex flex-col gap-6 border-t border-border pt-6">
          <ShareButtons title={post.title} url={postUrl} />
          <Link
            href="/writing"
            className="font-mono text-[0.75rem] tracking-[0.02em] text-[var(--text-subtle)] transition-colors hover:text-foreground"
          >
            &larr; Back to all essays
          </Link>
        </footer>
      </main>
    </>
  );
}
