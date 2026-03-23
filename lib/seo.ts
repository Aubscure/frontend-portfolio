// src/lib/seo.ts
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Crystal Aubrey Amante | Backend Software Engineer",
    template: "%s | Crystal Aubrey Amante",
  },
  description:
    "Backend-focused software developer specializing in robust system architecture, secure API integrations, and scalable web solutions.",
  authors: [{ name: "Crystal Aubrey Amante" }],
  creator: "Crystal Aubrey Amante",
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: SITE_URL,
    siteName: "Crystal Aubrey Amante Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Ensure you put a 1200x630 image in your public folder
        width: 1200,
        height: 630,
        alt: "Crystal Aubrey Amante - Backend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crystal Aubrey Amante | Backend Software Engineer",
    description:
      "Backend-focused software developer specializing in robust system architecture.",
    images: ["/og-image.jpg"],
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
};
