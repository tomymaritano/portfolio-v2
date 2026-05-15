"use client";

import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

const linkClass =
  "font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground";

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-[var(--text-subtle)]">
        Share
      </span>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
        X
      </a>
      <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
        LinkedIn
      </a>
      <button type="button" onClick={copyLink} className={linkClass}>
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
