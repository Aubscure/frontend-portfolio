/**
 * lib/platform.ts
 *
 * Utilities for detecting social platform from a URL or mailto: string,
 * and for detecting tech stack entries from a name or URL.
 *
 * Extracted from icon components so detection logic can be tested
 * independently and reused without importing React.
 */

// ─── Social Platform ─────────────────────────────────────────────────────────

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "instagram"
  | "twitter"
  | "facebook"
  | "youtube"
  | "dribbble"
  | "email"
  | "globe";

export const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  twitter: "Twitter / X",
  facebook: "Facebook",
  youtube: "YouTube",
  dribbble: "Dribbble",
  email: "Email",
  globe: "Website",
};

export function detectSocialPlatform(href: string): SocialPlatform {
  if (href.startsWith("mailto:")) return "email";
  try {
    const { hostname } = new URL(href);
    const h = hostname.replace("www.", "");
    if (h.includes("github.com")) return "github";
    if (h.includes("linkedin.com")) return "linkedin";
    if (h.includes("instagram.com")) return "instagram";
    if (h.includes("twitter.com") || h.includes("x.com")) return "twitter";
    if (h.includes("facebook.com")) return "facebook";
    if (h.includes("youtube.com")) return "youtube";
    if (h.includes("dribbble.com")) return "dribbble";
  } catch {
    // Not a valid URL, fall through to globe
  }
  return "globe";
}

// ─── Tech Stack ──────────────────────────────────────────────────────────────

export type Tech =
  | "react"
  | "nextjs"
  | "vue"
  | "nuxt" // Added Nuxt
  | "svelte"
  | "angular"
  | "laravel"
  | "php"
  | "nodejs"
  | "express"
  | "fastapi"
  | "python"
  | "typescript"
  | "javascript"
  | "tailwind"
  | "mysql"
  | "postgres"
  | "redis"
  | "mongodb"
  | "docker"
  | "git"
  | "github"
  | "swift"
  | "kotlin"
  | "graphql"
  | "sanity"
  | "framer"
  | "figma"
  | "d3"
  | "aws"
  | "vercel"
  | "vite"
  | "mui"
  | "html"
  | "inertia";

export const TECH_LABELS: Record<Tech, string> = {
  react: "React",
  nextjs: "Next.js",
  vue: "Vue",
  nuxt: "Nuxt", // Added Nuxt
  svelte: "Svelte",
  angular: "Angular",
  laravel: "Laravel",
  php: "PHP",
  nodejs: "Node.js",
  express: "Express",
  fastapi: "FastAPI",
  python: "Python",
  typescript: "TypeScript",
  javascript: "JavaScript",
  tailwind: "Tailwind",
  mysql: "MySQL",
  postgres: "PostgreSQL",
  redis: "Redis",
  mongodb: "MongoDB",
  docker: "Docker",
  git: "Git",
  github: "GitHub",
  swift: "Swift",
  kotlin: "Kotlin",
  graphql: "GraphQL",
  sanity: "Sanity",
  framer: "Framer",
  figma: "Figma",
  d3: "D3.js",
  aws: "AWS",
  vercel: "Vercel",
  vite: "Vite",
  mui: "Material UI",
  inertia: "Inertia.js",
  html: "HTML",
};

export const TECH_URLS: Record<Tech, string> = {
  react: "https://react.dev",
  nextjs: "https://nextjs.org",
  vue: "https://vuejs.org",
  nuxt: "https://nuxt.com", // Added Nuxt
  svelte: "https://svelte.dev",
  angular: "https://angular.dev",
  laravel: "https://laravel.com",
  php: "https://www.php.net",
  nodejs: "https://nodejs.org",
  express: "https://expressjs.com",
  fastapi: "https://fastapi.tiangolo.com",
  python: "https://www.python.org",
  typescript: "https://www.typescriptlang.org",
  javascript: "https://javascript.com/",
  tailwind: "https://tailwindcss.com",
  mysql: "https://www.mysql.com",
  postgres: "https://www.postgresql.org",
  redis: "https://redis.io",
  mongodb: "https://www.mongodb.com",
  docker: "https://www.docker.com",
  git: "https://git-scm.com",
  github: "https://github.com",
  swift: "https://developer.apple.com/swift/",
  kotlin: "https://kotlinlang.org",
  graphql: "https://graphql.org",
  sanity: "https://www.sanity.io",
  framer: "https://www.framer.com",
  figma: "https://www.figma.com",
  d3: "https://d3js.org",
  aws: "https://aws.amazon.com",
  vercel: "https://vercel.com",
  vite: "https://vite.dev",
  mui: "https://mui.com",
  html: "https://html.com/",
  inertia: "https://inertiajs.com",
};

export function detectTech(input: string): Tech | null {
  const s = input.toLowerCase().trim();

  if (s.startsWith("http")) {
    try {
      const { hostname } = new URL(s);
      const h = hostname.replace("www.", "");
      if (h.includes("react.dev")) return "react";
      if (h.includes("nextjs.org")) return "nextjs";
      if (h.includes("vuejs.org")) return "vue";
      if (h.includes("nuxt.com") || h.includes("nuxtjs.org")) return "nuxt"; // Added Nuxt
      if (h.includes("svelte.dev")) return "svelte";
      if (h.includes("angular")) return "angular";
      if (h.includes("laravel.com")) return "laravel";
      if (h.includes("php.net")) return "php";
      if (h.includes("nodejs.org")) return "nodejs";
      if (h.includes("expressjs.com")) return "express";
      if (h.includes("fastapi")) return "fastapi";
      if (h.includes("python.org")) return "python";
      if (h.includes("typescriptlang")) return "typescript";
      if (h.includes("javascript.com") || h.includes("developer.mozilla.org"))
        return "javascript";
      if (h.includes("tailwindcss.com")) return "tailwind";
      if (h.includes("postgresql.org")) return "postgres";
      if (h.includes("redis.io")) return "redis";
      if (h.includes("mongodb.com")) return "mongodb";
      if (h.includes("docker.com")) return "docker";
      if (h.includes("github.com")) return "github";
      if (h.includes("graphql.org")) return "graphql";
      if (h.includes("sanity.io")) return "sanity";
      if (h.includes("framer.com")) return "framer";
      if (h.includes("figma.com")) return "figma";
      if (h.includes("d3js.org")) return "d3";
      if (h.includes("aws.amazon")) return "aws";
      if (h.includes("vercel.com")) return "vercel";
      if (h.includes("vite.dev")) return "vite";
      if (h.includes("mui.com")) return "mui";
      if (h.includes("inertiajs.com")) return "inertia";
      if (h.includes("html.com")) return "html";
    } catch {
      /* noop */
    }
    return null;
  }

  if (s === "react" || s === "reactjs") return "react";
  if (s === "next" || s === "next.js" || s === "nextjs") return "nextjs";
  if (s === "vue" || s === "vuejs" || s === "vue.js") return "vue";
  if (s === "nuxt" || s === "nuxtjs" || s === "nuxt.js") return "nuxt"; // Added Nuxt
  if (s === "svelte") return "svelte";
  if (s === "angular") return "angular";
  if (s === "laravel") return "laravel";
  if (s === "php") return "php";
  if (s === "node" || s === "node.js" || s === "nodejs") return "nodejs";
  if (s === "express" || s === "express.js") return "express";
  if (s === "fastapi") return "fastapi";
  if (s === "python") return "python";
  if (s === "typescript" || s === "ts") return "typescript";
  if (s === "javascript" || s === "js") return "javascript";
  if (s === "tailwind" || s === "tailwindcss") return "tailwind";
  if (s === "mysql") return "mysql";
  if (s.includes("postgres") || s === "pg") return "postgres";
  if (s === "redis") return "redis";
  if (s === "mongodb" || s === "mongo") return "mongodb";
  if (s === "docker") return "docker";
  if (s === "git") return "git";
  if (s === "github") return "github";
  if (s === "swift") return "swift";
  if (s === "kotlin") return "kotlin";
  if (s === "graphql") return "graphql";
  if (s === "sanity") return "sanity";
  if (s === "framer" || s === "framer motion") return "framer";
  if (s === "figma") return "figma";
  if (s === "d3" || s === "d3.js") return "d3";
  if (s === "aws") return "aws";
  if (s === "vercel") return "vercel";
  if (s === "vite" || s === "vitejs") return "vite";
  if (s === "mui" || s === "material ui" || s === "material-ui") return "mui";
  if (s === "inertia" || s === "inertia.js" || s === "inertiajs")
    return "inertia";
  if (s === "html" || s === "html.com" || s === "html5") return "html";

  return null;
}
