import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { sanityFetch } from "@/src/sanity/client";
import { profileQuery } from "@/src/sanity/queries";
import type { ProfileData } from "@/src/types";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "./globals.css";

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
  description:
    "A statically generated developer portfolio built with Next.js and Sanity CMS.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: { type: "website", locale: "en_US" },
  robots: { index: true, follow: true },
};

// Anti-flash script — applies stored theme before React hydration.
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e){}
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <Navbar logoUrl={profile?.logoUrl ?? undefined} name={fullName} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
