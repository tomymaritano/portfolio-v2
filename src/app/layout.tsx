import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Terminal } from "@/components/Terminal";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CommandPalette } from "@/components/CommandPalette";
import { NowPlaying } from "@/components/NowPlaying";
import { AIChat } from "@/components/AIChat";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorEffect } from "@/components/CursorEffect";
import { EasterEggs } from "@/components/EasterEggs";
import { I18nProvider } from "@/lib/i18n/context";
import "@/styles/globals.css";

const siteUrl = "https://tomasmaritano.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  title: {
    default: "Tomas Maritano — Product Engineer",
    template: "%s | Tomas Maritano",
  },
  description:
    "I build digital products from 0→1. Systems thinker. Design-minded developer. Focused on fintech and developer tools.",
  keywords: [
    "Product Engineer",
    "Full Stack Developer",
    "TypeScript",
    "React",
    "Next.js",
    "Fintech",
    "Buenos Aires",
  ],
  authors: [{ name: "Tomas Maritano", url: siteUrl }],
  creator: "Tomas Maritano",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Tomas Maritano",
    title: "Tomas Maritano — Product Engineer",
    description:
      "I build digital products from 0→1. Systems thinker. Design-minded developer.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tomas Maritano — Product Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tomas Maritano — Product Engineer",
    description:
      "I build digital products from 0→1. Systems thinker. Design-minded developer.",
    images: ["/og-image.png"],
    creator: "@tomasmaritano",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <I18nProvider>
            <Navbar />
            <ThemeToggle />
            <CommandPalette />
            <main style={{ paddingTop: "80px" }}>{children}</main>
            <Footer />
            <NowPlaying />
            <AIChat />
            <Terminal />
            <CursorEffect />
            <EasterEggs />
          </I18nProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
