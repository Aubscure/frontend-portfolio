"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { ProfileData } from "@/src/types";

interface Props {
  logoUrl?: ProfileData["logoUrl"];
  name?: string;
}

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ logoUrl, name }: Props) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-10 h-[60px] frost">
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={name ?? "Logo"}
            width={28}
            height={28}
            className="object-contain"
          />
        ) : (
          <span
            className="flex items-center justify-center w-7 h-7 text-white text-sm font-bold"
            style={{
              background: "var(--color-hanko)",
              fontFamily: "var(--font-display)",
            }}
          >
            {name ? name[0].toUpperCase() : "●"}
          </span>
        )}
        {name && (
          <span
            className="text-[1.05rem] font-semibold tracking-wide"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-ink)",
            }}
          >
            {name}
          </span>
        )}
      </Link>

      <ul className="hidden md:flex items-center gap-8 list-none">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              className="hanko-line text-[0.72rem] tracking-widest uppercase no-underline transition-colors duration-200"
              style={{ color: "var(--color-muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-ink)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-muted)")
              }
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="card flex items-center justify-center w-[34px] h-[34px] cursor-pointer bg-transparent text-sm transition-all duration-200 hover:scale-105"
        style={{ color: "var(--color-muted)" }}
      >
        {dark ? "☀" : "☽"}
      </button>
    </nav>
  );
}
