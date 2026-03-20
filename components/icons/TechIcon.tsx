/**
 * components/icons/TechIcon.tsx
 *
 * Renders technology icons using official SVG paths from `simple-icons`.
 * https://simpleicons.org
 *
 * Instead of named imports (which break when simple-icons renames slugs
 * between major versions), we import the entire namespace and do a runtime
 * lookup by slug key. This means:
 *   - Adding a new tech = one line in SLUG_MAP
 *   - Version bumps that rename slugs = fix one string, not an import
 *   - Missing icons degrade gracefully to a text chip, never throw
 *
 * Slug reference: https://github.com/simple-icons/simple-icons/blob/develop/slugs.md
 * Run `Object.keys(SI).filter(k => k.startsWith('si'))` in a Node REPL to
 * inspect all available slugs in your installed version.
 */

import React from "react";
import * as SI from "simple-icons";
import type { SimpleIcon } from "simple-icons";

import { detectTech, TECH_LABELS, TECH_URLS, type Tech } from "@/lib/platform";

interface Props {
  name: string;
  size?: number;
  className?: string;
  label?: string;
  showLabel?: boolean;
}

/**
 * Maps our internal Tech keys to simple-icons slug strings.
 * The runtime lookup is: SI[`si${slug}`] — so "Nextdotjs" → SI.siNextdotjs.
 * To find the correct slug for any brand, check slugs.md linked above or
 * run: Object.keys(SI).find(k => k.toLowerCase().includes('yourtech'))
 */
const SLUG_MAP: Record<Tech, string> = {
  react: "React",
  nextjs: "Nextdotjs",
  vue: "Vuedotjs",
  nuxt: "Nuxt", // was siNuxtdotjs in older versions → siNuxt
  svelte: "Svelte",
  angular: "Angular",
  laravel: "Laravel",
  php: "Php",
  nodejs: "Nodedotjs",
  express: "Express",
  fastapi: "Fastapi",
  python: "Python",
  typescript: "Typescript",
  javascript: "Javascript",
  html: "Html5",
  tailwind: "Tailwindcss",
  mysql: "Mysql",
  postgres: "Postgresql",
  redis: "Redis",
  mongodb: "Mongodb",
  docker: "Docker",
  git: "Git",
  github: "Github",
  swift: "Swift",
  kotlin: "Kotlin",
  graphql: "Graphql",
  sanity: "Sanity",
  framer: "Framer",
  figma: "Figma",
  d3: "D3dotjs", // if your version lacks this, change to "D3"
  aws: "Amazonaws", // simple-icons slug is "amazonaws", not "amazonwebservices"
  vercel: "Vercel",
  vite: "Vite",
  mui: "Mui",
  inertia: "Inertia",
};

/** Resolve a SimpleIcon from the namespace by slug, or null if not found. */
function resolveIcon(slug: string): SimpleIcon | null {
  const key = `si${slug}` as keyof typeof SI;
  const icon = SI[key];
  // SimpleIcon objects always have a .path string property
  if (icon && typeof (icon as SimpleIcon).path === "string") {
    return icon as SimpleIcon;
  }
  return null;
}

export default function TechIcon({
  name,
  size = 14,
  className = "",
  label,
  showLabel = true,
}: Props) {
  const tech = detectTech(name);
  const isUrl = name.startsWith("http");

  // Unrecognized tech — render plain text chip, linked if URL
  if (!tech) {
    const fallbackLabel =
      label ?? (isUrl ? new URL(name).hostname.replace("www.", "") : name);
    const fallbackHref = isUrl ? name : undefined;

    if (fallbackHref) {
      return (
        <a
          href={fallbackHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`chip inline-flex items-center gap-1.5 ${className}`}
        >
          {fallbackLabel}
        </a>
      );
    }
    return (
      <span className={`chip inline-flex items-center gap-1.5 ${className}`}>
        {fallbackLabel}
      </span>
    );
  }

  const slug = SLUG_MAP[tech];
  const icon = resolveIcon(slug);
  const ariaLabel = label ?? TECH_LABELS[tech];
  const href = TECH_URLS[tech];

  // Icon not found in installed simple-icons version — degrade to text chip
  if (!icon) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        title={ariaLabel}
        className={`chip inline-flex items-center gap-1.5 ${className}`}
      >
        {showLabel ? ariaLabel : "?"}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      title={ariaLabel}
      className={`chip inline-flex items-center gap-1.5 flex-shrink-0 ${className}`}
    >
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <title>{icon.title}</title>
        <path d={icon.path} />
      </svg>

      {showLabel && <span>{ariaLabel}</span>}
    </a>
  );
}
