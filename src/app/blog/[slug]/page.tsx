import { allPosts } from "content-collections";
import { MDXContent } from "@/components/MDXContent";
import { TableOfContents } from "@/components/TableOfContents";
import { ShareButtons } from "@/components/ShareButtons";
import { ReadingProgress } from "@/components/ReadingProgress";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import styles from "./page.module.css";

const siteUrl = "https://tomasmaritano.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allPosts
    .filter((post) => post.published)
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug && p.published);

  if (!post) {
    notFound();
  }

  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Tomas Maritano",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Tomas Maritano",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <main className={styles.main}>
        <div className={styles.layout}>
          <article className={styles.article}>
            <header className={styles.header}>
              <Link href="/blog" className={styles.backLink}>
                ← Back to blog
              </Link>
              <div className={styles.meta}>
                <time className={styles.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className={styles.separator}>·</span>
                <span className={styles.readingTime}>{post.readingTime} min read</span>
                {post.tags.length > 0 && (
                  <div className={styles.tags}>
                    {post.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.description}>{post.description}</p>
            </header>

            <div className={styles.content}>
              <MDXContent code={post.mdx} />
            </div>

            <footer className={styles.footer}>
              <ShareButtons title={post.title} url={postUrl} />
              <Link href="/blog" className={styles.backLink}>
                ← Back to all posts
              </Link>
            </footer>
          </article>

          {post.headings && post.headings.length >= 2 && (
            <aside className={styles.sidebar}>
              <TableOfContents headings={post.headings} />
            </aside>
          )}
        </div>
      </main>
    </>
  );
}
