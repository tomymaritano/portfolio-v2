import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { GeistMono } from "geist/font/mono";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/config/site";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

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
      className={cn(jakarta.variable, GeistMono.variable, fraunces.variable, "font-sans antialiased")}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <Navbar />
          <CommandPalette />
          {children}
          <Footer />
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--surface-elevated)",
                border: "1px solid var(--rule)",
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
