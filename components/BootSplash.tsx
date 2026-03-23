"use client";

/**
 * components/BootSplash.tsx
 *
 * Shows <LoadingScreen> exactly once per browser session (sessionStorage flag).
 * On repeat visits within the same tab session the splash is skipped entirely.
 *
 * Pattern:
 *  - Children always render (good for SEO / Next.js hydration).
 *  - LoadingScreen is fixed-position and overlays on top when active.
 *  - Once AnimatePresence finishes its exit transition, the overlay is
 *    unmounted from the DOM — no lingering z-index stacking issues.
 *
 * Usage in layout.tsx:
 *
 *   import BootSplash from "@/components/BootSplash";
 *
 *   <ThemeProvider>
 *     <BootSplash>
 *       <Navbar ... />
 *       {children}
 *     </BootSplash>
 *   </ThemeProvider>
 */

import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

const SESSION_KEY = "portfolio-booted";

interface Props {
  children: React.ReactNode;
}

export default function BootSplash({ children }: Props) {
  // Controlled by useEffect so there is zero SSR/hydration mismatch:
  // on the server and during the initial paint, showSplash is false and
  // children are visible. The effect runs client-side only.
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      setShowSplash(true);
    }
  }, []);

  const handleComplete = () => {
    // Mark this session so the splash is not shown again until the tab closes
    sessionStorage.setItem(SESSION_KEY, "1");
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <LoadingScreen onComplete={handleComplete} />}
      {children}
    </>
  );
}
