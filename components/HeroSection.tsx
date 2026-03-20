"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SocialIcon from "@/components/icons/SocialIcon";
import TelemetryReadout from "@/components/ui/TelemetryReadout";
import StatusLED from "@/components/ui/StatusLED";
import { EASE_MECH, EASE_BOOT, HERO_TELEMETRY } from "@/lib/constants";
import type { ProfileData } from "@/src/types";

interface Props {
  profile: ProfileData;
}

export default function HeroSection({ profile }: Props) {
  const {
    firstName,
    lastName,
    nickname,
    profilePictureUrl,
    aboutDescription,
    resumeUrl,
    socialLinks,
  } = profile;

  const socialHrefs = [
    socialLinks?.github && socialLinks.github,
    socialLinks?.linkedin && socialLinks.linkedin,
    socialLinks?.instagram && socialLinks.instagram,
    socialLinks?.email && `mailto:${socialLinks.email}`,
  ].filter(Boolean) as string[];

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-56px)] max-w-[1280px] mx-auto px-8 py-16 flex items-center"
    >
      {/* Dot-grid background pattern */}
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      {/* Diagonal stripe accent — pure CSS, no images */}
      <div
        className="stripe-bg absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Vertical red rule — left margin indicator */}
      <div
        style={{
          position: "absolute",
          left: "2rem",
          top: "10%",
          bottom: "10%",
          width: "2px",
          background:
            "linear-gradient(to bottom, transparent, var(--color-red) 20%, var(--color-red) 80%, transparent)",
          opacity: 0.3,
        }}
      />

      <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-16 items-center w-full">
        {/* ── Copy block ─────────────────────────────────────────── */}
        <div>
          {/* System ID badge */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: EASE_MECH }}
            className="inline-flex items-center gap-3 border px-3 py-2 mb-8"
            style={{ borderColor: "var(--color-red)", borderLeftWidth: "3px" }}
          >
            <StatusLED variant="green" />
            <span className="telem-label" style={{ fontSize: "0.6rem" }}>
              ECU_ONLINE — DRIVER_PROFILE_LOADED
            </span>
          </motion.div>

          {/* Primary heading — Barlow Condensed, massive */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_BOOT, delay: 0.08 }}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(3.6rem, 8vw, 7.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              color: "var(--color-ink)",
              marginLeft: "20px",
            }}
          >
            {firstName}&nbsp;
            <span style={{ color: "var(--color-red)" }}>{lastName}</span>
          </motion.h1>

          {/* Subtitle — monospace role descriptor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE_MECH, delay: 0.22 }}
            className="flex items-center gap-4 mt-4 mb-6"
          >
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "var(--color-red)",
              }}
            />
            <span
              className="telem-label"
              style={{ fontSize: "0.75rem", color: "var(--color-amber)" }}
            >
              FULL_STACK_DEVELOPER // WEB_ENGINEER
            </span>
          </motion.div>

          {/* About text */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_BOOT, delay: 0.3 }}
            className="text-[0.92rem] leading-[1.8] max-w-[500px] mb-10 ml-4"
            style={{ color: "var(--color-ink-dim)" }}
          >
            {aboutDescription}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_BOOT, delay: 0.4 }}
            className="flex items-center gap-4 flex-wrap mb-8"
          >
            <a href="#work" className="btn-primary">
              View Units
            </a>
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Resume PDF
              </a>
            )}
          </motion.div>

          {/* Social links */}
          {socialHrefs.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="flex items-center gap-5"
            >
              {socialHrefs.map((href) => (
                <SocialIcon
                  key={href}
                  href={href}
                  size={30}
                  style={{ color: "var(--color-ink-dim)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-red)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-ink-dim)")
                  }
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* ── Right panel: profile image + telemetry ──────────── */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE_BOOT, delay: 0.15 }}
          className="hidden md:flex flex-col gap-0"
        >
          {/* Profile image frame — instrument bezel style */}
          <div
            style={{
              width: "350px",
              height: "440px",
              position: "relative",
              border: "1px solid var(--color-border)",
              borderTop: "3px solid var(--color-red)",
            }}
          >
            {/* Corner ticks — schematic decoration */}
            {["top-0 right-0", "bottom-0 right-0"].map((pos) => (
              <span
                key={pos}
                className={`absolute ${pos} w-3 h-3 border-r border-b`}
                style={{ borderColor: "var(--color-red)", opacity: 0.5 }}
              />
            ))}
            <span
              className="absolute top-0 left-0 w-3 h-3 border-l border-t"
              style={{ borderColor: "var(--color-red)", opacity: 0.5 }}
            />
            <span
              className="absolute bottom-0 left-0 w-3 h-3 border-l border-b"
              style={{ borderColor: "var(--color-red)", opacity: 0.5 }}
            />

            {/* Frame label */}
            <div
              className="absolute top-0 left-0 right-0 px-3 py-1.5 flex items-center justify-between"
              style={{
                background: "var(--color-surface)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <span className="telem-label" style={{ fontSize: "0.55rem" }}>
                DRIVER_ID
              </span>
              <span
                className="telem-label"
                style={{ fontSize: "0.55rem", color: "var(--color-red)" }}
              >
                ◉ REC
              </span>
            </div>

            {profilePictureUrl ? (
              <Image
                src={profilePictureUrl}
                alt={`${firstName} ${lastName}`}
                fill
                sizes="320px"
                className="object-cover object-top"
                style={{ paddingTop: "28px" }}
                priority
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  paddingTop: "28px",
                  background: "var(--color-surface)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "6rem",
                    fontWeight: 900,
                    color: "var(--color-red)",
                    opacity: 0.15,
                    letterSpacing: "-0.05em",
                  }}
                >
                  {firstName[0]}
                  {lastName[0]}
                </span>
              </div>
            )}

            {/* Nickname badge */}
            {nickname && (
              <div
                className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center gap-2"
                style={{
                  background: "rgba(10,10,12,0.9)",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <StatusLED variant="green" />
                <span className="telem-label" style={{ fontSize: "0.6rem" }}>
                  {nickname}
                </span>
              </div>
            )}
          </div>

          {/* Telemetry readouts below the image */}
          <div
            className="grid grid-cols-3"
            style={{ width: "350px", borderTop: "none" }}
          >
            {HERO_TELEMETRY.map((item, i) => (
              <TelemetryReadout
                key={item.label}
                label={item.label}
                value={item.value}
                unit={item.unit}
                accent={i === 0}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom separator with label */}
      <div
        className="absolute bottom-0 left-8 right-8 flex items-center gap-4"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <span
          className="telem-label py-2"
          style={{
            fontSize: "0.55rem",
            color: "var(--color-red)",
            opacity: 0.5,
          }}
        >
          SCROLL_TO_EXPLORE // ↓
        </span>
      </div>
    </section>
  );
}
