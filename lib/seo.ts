// src/lib/seo.ts
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  alternates: {
    canonical: "/",
  },

  title: {
    default: "Your Name | Backend Software Engineer",
    template: "%s | Your Name",
  },
  description:
    "Backend-focused software developer specializing in robust system architecture, secure API integrations, and scalable web solutions.",
  authors: [{ name: "Your Name" }],
  creator: "Your Name",

  // ADD THIS VERIFICATION BLOCK HERE
  verification: {
    google: "82im-e9-L_59BaPF769W6V5QR14Pr8cZkK95aT8ovbw",
  },

  openGraph: {
    type: "website",
    locale: "en_PH",
    url: SITE_URL,
    siteName: "Your Name Portfolio",
    images: [
      {
        url: "/og-image.jpg",
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
