"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SocialIcon from "@/components/icons/SocialIcon";
import StatusLED from "@/components/ui/StatusLED";
import { EASE_BOOT } from "@/lib/constants";
import type { SocialLinks } from "@/src/types";

interface Props {
  socialLinks: SocialLinks;
}

export default function ContactSection({ socialLinks }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleEmailClick = () => {
    if (socialLinks?.email) {
      window.location.href = `mailto:${socialLinks.email}`;
    }
  };

  if (!socialLinks) return null;

  const socialEntries = Object.entries(socialLinks).filter(
    ([key, value]) =>
      key !== "email" && typeof value === "string" && value.length > 0,
  );

  return (
    <section id="contact" className="py-24 px-8 max-w-[1280px] mx-auto">
      {/* Section header */}
      <div
        className="flex items-end justify-between mb-12 pb-4"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div>
          <p
            className="telem-label mb-2"
            style={{ color: "var(--color-red)", fontSize: "0.62rem" }}
          >
            MODULE_04 // COMMS_TERMINAL
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              textTransform: "uppercase",
              lineHeight: 1,
              letterSpacing: "0.02em",
              color: "var(--color-ink)",
            }}
          >
            Contact
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* ── Terminal prompt block ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE_BOOT }}
        >
          <div
            className="border p-6"
            style={{
              borderColor: "var(--color-border)",
              borderTop: "3px solid var(--color-red)",
              background: "var(--color-surface)",
            }}
          >
            {/* Terminal header */}
            <div
              className="flex items-center gap-2 pb-4 mb-4"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <StatusLED variant="green" />
              <span
                className="telem-label"
                style={{ fontSize: "0.58rem", color: "var(--color-sys-green)" }}
              >
                COMMS_LINK — OPEN
              </span>
            </div>

            {/* Fake terminal output */}
            <div className="space-y-1 mb-6">
              {[
                "> INIT comms_module --driver=you",
                "> STATUS: ready_to_receive",
                "> AWAITING transmission...",
              ].map((line, i) => (
                <p
                  key={i}
                  className="telem-label"
                  style={{
                    fontSize: "0.65rem",
                    color:
                      i === 2 ? "var(--color-amber)" : "var(--color-ink-dim)",
                  }}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Heading */}
            <p
              className="mb-3 uppercase"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "1.6rem",
                lineHeight: 1.1,
                color: "var(--color-ink)",
              }}
            >
              Let&apos;s Build Something Fast.
            </p>

            <p
              className="text-[0.85rem] leading-[1.75] mb-6"
              style={{ color: "var(--color-ink-dim)" }}
            >
              Whether it&apos;s a new project, a collaboration, or just a
              technical conversation — open a channel and let&apos;s get moving.
            </p>

            {socialLinks.email && (
              <button
                onClick={handleEmailClick}
                className="btn-primary"
                aria-label="Send an email"
                disabled={!isMounted}
              >
                {isMounted ? "TRANSMIT_EMAIL" : "INITIALIZING..."}
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Social channels panel ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE_BOOT, delay: 0.12 }}
          className="flex flex-col gap-0"
        >
          {/* Panel header */}
          <div
            className="px-4 py-2.5 flex items-center gap-2"
            style={{
              background: "var(--color-surface-hi)",
              border: "1px solid var(--color-border)",
              borderBottom: "none",
              borderTop: "3px solid var(--color-amber)",
            }}
          >
            <StatusLED variant="amber" />
            <span
              className="telem-label"
              style={{ fontSize: "0.58rem", color: "var(--color-amber)" }}
            >
              EXTERNAL_CHANNELS
            </span>
          </div>

          {/* Social link rows */}
          {socialEntries.map(([key, url], i) => (
            <SocialIcon
              key={key}
              href={url as string}
              size={17}
              showLabel
              className="bezel px-4 py-4 transition-colors duration-150"
              style={{
                border: "1px solid var(--color-border)",
                borderTop: i === 0 ? "1px solid var(--color-border)" : "none",
                color: "var(--color-ink-dim)",
                background: "var(--color-surface)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "var(--color-ink)";
                (e.currentTarget as HTMLElement).style.background =
                  "var(--color-surface-hi)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "var(--color-ink-dim)";
                (e.currentTarget as HTMLElement).style.background =
                  "var(--color-surface)";
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
