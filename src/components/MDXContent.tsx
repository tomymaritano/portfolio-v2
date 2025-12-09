"use client";

import { useMDXComponent } from "@content-collections/mdx/react";
import { CodeBlock } from "./CodeBlock";

interface MDXContentProps {
  code: string;
  className?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function createHeading(level: 2 | 3) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    const text = typeof children === "string" ? children : "";
    const slug = slugify(text);
    const Tag = `h${level}` as const;
    return <Tag id={slug}>{children}</Tag>;
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

const components = {
  pre: ({ children, ...props }: React.ComponentProps<"pre">) => (
    <CodeBlock {...props}>{children}</CodeBlock>
  ),
  h2: createHeading(2),
  h3: createHeading(3),
};

export function MDXContent({ code, className }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return (
    <div className={className}>
      <Component components={components} />
    </div>
  );
}
