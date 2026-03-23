// src/lib/seo.ts
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Your Name | Backend Software Engineer",
    template: "%s | Your Name",
  },
  description:
    "Backend-focused software developer specializing in robust system architecture, secure API integrations, and scalable web solutions.",
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: SITE_URL,
    siteName: "Your Name Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Ensure you put a 1200x630 image in your public folder
        width: 1200,
        height: 630,
        alt: "Your Name - Backend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name | Backend Software Engineer",
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
