// Tailwind CSS v4: theme configuration is declared in globals.css via @theme.
// This file is kept as a minimal stub for IDE tooling compatibility.
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sanity/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {},
  plugins: [],
};

export default config;
