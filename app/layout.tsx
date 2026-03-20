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

export const metadata: Metadata = {
  title: { default: "Portfolio", template: "%s · Portfolio" },
  description: "Full-stack developer — precision engineering for the web.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: { type: "website", locale: "en_US" },
  robots: { index: true, follow: true },
};

/**
 * Viewport config — themeColor MUST live here, not in the metadata export.
 * This is required as of Next.js 14+ (and enforced as a warning in Next.js 16).
 * Controls the mobile browser chrome background color.
 */
export const viewport: Viewport = {
  themeColor: "#0A0A0C",
};

/**
 * Anti-flash script — runs before React hydration to apply the correct
 * theme class, preventing a FOUC (flash of unstyled content).
 * Dark is the default; we only remove it if the user explicitly chose light.
 */
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('portfolio-theme');
    if (t === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Barlow Condensed — the JDM display font */}
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
        {/* Theme anti-flash: runs synchronously before hydration */}
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
