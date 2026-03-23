import { baseMetadata } from "@/lib/seo";

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { sanityFetch } from "@/src/sanity/client";
import { profileQuery } from "@/src/sanity/queries";
import type { ProfileData } from "@/src/types";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  // Light mode canvas color — matches --color-canvas default
  themeColor: "#F5F2EE",
};

/**
 * Anti-flash script — runs synchronously before React hydration.
 * Light is now the default. We only add `.dark` if the user has
 * explicitly chosen dark, or their system preference is dark and
 * they haven't stored a preference yet.
 */
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('portfolio-theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
    // If t === 'light' or no preference + system is light: do nothing,
    // the <html> element has no .dark class by default.
  } catch(e) {}
})();
`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await sanityFetch<ProfileData>({
    query: profileQuery,
    tags: ["profile"],
    revalidate: 3600,
  });

  const fullName = profile
    ? `${profile.firstName} ${profile.lastName}`
    : undefined;

  return (
    // No className="dark" here — light is the default, dark is added by the
    // anti-flash script only when needed.
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ background: "var(--color-canvas)", color: "var(--color-ink)" }}
      >
        <ThemeProvider>
          <Navbar logoUrl={profile?.logoUrl ?? undefined} name={fullName} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
