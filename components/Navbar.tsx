"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import StatusLED from "@/components/ui/StatusLED";
import { NAV_LINKS } from "@/lib/constants";
import type { ProfileData } from "@/src/types";

interface Props {
  logoUrl?: ProfileData["logoUrl"];
  name?: string;
}

export default function Navbar({ logoUrl, name }: Props) {
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-theme");
    if (stored === "light") {
      document.documentElement.classList.remove("dark");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
    }

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("portfolio-theme", next ? "dark" : "light");
  };

  return (
    <nav
      className="sticky top-0 z-50 hud-bar"
      style={{
        borderBottom: scrolled
          ? "1px solid var(--color-border)"
          : "1px solid transparent",
      }}
    >
      {/* Top-edge red accent line — instrument bezel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "var(--color-red)",
          opacity: 0.85,
        }}
      />

      <div className="max-w-[1280px] mx-auto px-8 h-[56px] flex items-center justify-between">
        {/* ── Logo / Name ─ */}
        <Link href="/" className="flex items-center gap-3 no-underline group">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={name ?? "Logo"}
              width={26}
              height={26}
              className="object-contain"
            />
          ) : (
            <span
              className="flex items-center justify-center w-7 h-7 text-xs font-black"
              style={{
                background: "var(--color-red)",
                color: "#fff",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.04em",
              }}
            >
              {name ? name[0].toUpperCase() : "◉"}
            </span>
          )}
          {name && (
            <span
              className="text-[0.78rem] font-bold tracking-[0.18em] uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-ink)",
              }}
            >
              {name}
            </span>
          )}
        </Link>

        {/* ── Nav Links + status indicator ─ */}
        <div className="hidden md:flex items-center gap-1">
          {/* System OK indicator */}
          <div
            className="flex items-center gap-2 mr-6 border px-3 py-1.5"
            style={{ borderColor: "var(--color-border)" }}
          >
            <StatusLED variant="green" />
            <span className="telem-label" style={{ fontSize: "0.58rem" }}>
              SYS_ONLINE
            </span>
          </div>

          {NAV_LINKS.map(({ label, href, id }) => (
            <a
              key={href}
              href={href}
              className="bezel group relative flex items-center gap-1.5 px-4 py-1.5 no-underline transition-colors duration-150"
              style={{ color: "var(--color-ink-dim)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-ink)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-ink-dim)")
              }
            >
              <span
                className="text-[0.55rem] mr-0.5"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-red)",
                  opacity: 0.6,
                }}
              >
                {id}
              </span>
              <span
                className="text-[0.72rem] tracking-[0.12em] uppercase font-semibold"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {label}
              </span>
            </a>
          ))}
        </div>

        {/* ── Theme toggle — instrument switch ─ */}
        <button
          onClick={toggleTheme}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          className="flex items-center justify-center w-8 h-8 border transition-all duration-150"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-ink-dim)",
            background: "transparent",
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor =
              "var(--color-red)";
            (e.currentTarget as HTMLElement).style.color = "var(--color-red)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor =
              "var(--color-border)";
            (e.currentTarget as HTMLElement).style.color =
              "var(--color-ink-dim)";
          }}
        >
          {dark ? "◑" : "◐"}
        </button>
      </div>
    </nav>
  );
}
