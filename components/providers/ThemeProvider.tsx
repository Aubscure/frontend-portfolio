"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light", // light default
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function applyTheme(t: Theme) {
  document.documentElement.classList.toggle("dark", t === "dark");
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Light is the default. The anti-flash script in layout.tsx handles the
  // initial SSR/hydration pass — this state syncs on mount.
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-theme") as Theme | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    // Respect stored preference; fall back to system; default to light.
    const resolved = stored ?? (systemPrefersDark ? "dark" : "light");
    setTheme(resolved);
    applyTheme(resolved);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      applyTheme(next);
      localStorage.setItem("portfolio-theme", next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
