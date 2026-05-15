"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const navLinkBase =
  "font-mono text-[0.6875rem] uppercase tracking-[0.08em] py-1 transition-colors";
const footerLink =
  "font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-[var(--text-subtle)] hover:text-foreground transition-colors";

export function Navbar() {
  const pathname = usePathname();
  const navLinks = siteConfig.nav.links;

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav
        className="mx-auto flex max-w-[720px] items-center justify-between gap-6 px-5 py-3.5 md:px-8"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="text-sm font-medium tracking-[-0.005em] text-foreground"
        >
          {siteConfig.firstName} {siteConfig.lastName}
        </Link>

        <div className="ml-auto hidden items-center gap-6 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                navLinkBase,
                "hover:text-foreground",
                isActive(href) ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="-mr-2 p-2 text-foreground transition-colors hover:text-[var(--accent)] md:hidden"
              aria-label="Open menu"
              suppressHydrationWarning
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex w-full max-w-sm flex-col gap-0 bg-background p-0"
          >
            <SheetHeader className="border-b border-border px-5 py-3.5">
              <SheetTitle className="text-sm font-medium tracking-[-0.005em] text-foreground">
                {siteConfig.firstName} {siteConfig.lastName}
              </SheetTitle>
            </SheetHeader>

            <nav
              className="flex flex-1 flex-col px-5 py-6"
              aria-label="Mobile primary"
            >
              {navLinks.map(({ href, label }) => (
                <SheetClose asChild key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "border-b border-border py-3.5 font-sans text-2xl font-medium tracking-[-0.015em] last:border-0 transition-colors",
                      isActive(href)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {label}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border p-5">
              <div className="flex flex-wrap gap-5">
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLink}
                >
                  GitHub
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLink}
                >
                  LinkedIn
                </a>
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLink}
                >
                  X
                </a>
                <a href={`mailto:${siteConfig.email}`} className={footerLink}>
                  Email
                </a>
              </div>
              <ThemeToggle />
            </footer>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
