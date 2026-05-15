import { siteConfig } from "@/config/site";

export function IdentityBlock() {
  return (
    <section className="mb-16">
      <h1 className="m-0 font-serif text-[2rem] font-normal leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2.5rem]">
        {siteConfig.name}
      </h1>
      <p className="mb-3 mt-4 max-w-[52ch] font-serif text-[1.125rem] leading-[1.5] text-muted-foreground">
        {siteConfig.tagline}
      </p>
      <p className="m-0 font-mono text-[0.75rem] tracking-[0.02em] text-[var(--text-subtle)]">
        {siteConfig.role} — {siteConfig.location}
      </p>
    </section>
  );
}
