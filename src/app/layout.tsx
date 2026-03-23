import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/config/site";
import { Toaster } from "sonner";
import "@/styles/globals.css";

// Dynamic imports for non-critical components (code splitting)
const CommandPalette = dynamic(() => import("@/components/CommandPalette").then(mod => mod.CommandPalette));

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.meta.domain),
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  title: {
    default: siteConfig.meta.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.meta.description,
  keywords: [
    "Product Engineer",
    "Full Stack Developer",
    "TypeScript",
    "React",
    "Next.js",
    "Fintech",
    siteConfig.location,
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.meta.domain }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.meta.locale,
    url: siteConfig.meta.domain,
    siteName: siteConfig.name,
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    images: [
      {
        url: siteConfig.meta.image,
        width: 1200,
        height: 630,
        alt: siteConfig.meta.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    images: [siteConfig.meta.image],
    creator: `@${siteConfig.social.twitter.split("/").pop()}`,
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
  manifest: "/manifest.json",
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
          <Navbar />
          <CommandPalette />
          <main style={{ paddingTop: "80px" }}>{children}</main>
          <Footer />
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--surface-elevated)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                fontFamily: "var(--font-sans)",
              },
            }}
          />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
