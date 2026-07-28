import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SITE_URL, contact, profile } from "@/data/portfolio-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const DESCRIPTION =
  "Full-stack engineer with five years shipping web and mobile products across fintech, edtech, and consumer SaaS — React, Next.js, React Native, Node.js, and Go. Currently moving into AI engineering.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Never block a user from zooming.
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f4" },
    { media: "(prefers-color-scheme: dark)", color: "#131211" },
  ],
};

export const metadata: Metadata = {
  // Required for OG/Twitter image URLs to resolve absolutely.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Full-Stack Engineer",
    "AI Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Node.js",
    "Go",
    "AWS",
    "Lagos",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  applicationName: `${profile.name} — Portfolio`,
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    siteName: `${profile.name} — ${profile.title}`,
    title: `${profile.name} — ${profile.title}`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: DESCRIPTION,
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
  alternates: {
    canonical: SITE_URL,
  },
  manifest: "/manifest.json",
};

/**
 * Applies the stored theme before first paint.
 *
 * This has to be a blocking inline script: doing it in a `useEffect` means the
 * browser paints the light theme first, so dark-mode visitors get a white
 * flash on every navigation.
 */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})();`;

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.shortName,
  url: SITE_URL,
  jobTitle: profile.title,
  email: `mailto:${contact.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  sameAs: [contact.github, contact.linkedin],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Node.js",
    "NestJS",
    "Go",
    "PostgreSQL",
    "AWS",
    "Generative AI",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          inter.variable,
          mono.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
