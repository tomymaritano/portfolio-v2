import { allProjects } from "content-collections";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.name} | Tomas Maritano`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <main className="mx-auto min-h-screen max-w-[720px] px-5 pt-12 pb-24 md:px-8">
      <Link
        href="/projects"
        className="mb-10 inline-block font-mono text-[0.75rem] tracking-[0.02em] text-[var(--text-subtle)] transition-colors hover:text-foreground"
      >
        &larr; Back to projects
      </Link>

      <header className="mb-10 border-b border-border pb-6">
        <div className="mb-3 flex items-baseline gap-4">
          <h1 className="font-serif text-[1.625rem] font-normal leading-[1.2] tracking-[-0.02em] text-foreground sm:text-[2rem]">
            {project.name}
          </h1>
          <span className="whitespace-nowrap rounded-[var(--radius-sm)] border border-border px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.06em] text-muted-foreground">
            {project.status}
          </span>
        </div>
        <p className="mb-4 font-serif text-[1.0625rem] leading-[1.5] text-muted-foreground">
          {project.tagline}
        </p>
        {project.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-[var(--radius-sm)] border border-border px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.04em] text-muted-foreground"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </header>

      {project.image && (
        <img
          src={project.image}
          alt={project.name}
          className="mb-8 w-full rounded-[var(--radius-md)] border border-border"
        />
      )}

      <article className="prose">
        <MDXContent code={project.mdx} />
      </article>
    </main>
  );
}
