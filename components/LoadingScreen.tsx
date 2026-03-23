"use client";

/**
 * components/LoadingScreen.tsx
 *
 * Full-screen boot-sequence splash.
 *
 * Responsibilities:
 *  - Animates a stepped progress counter (0 → 100 %) over ~2.8 s
 *  - Reveals boot-log lines in sync with progress
 *  - Renders a CRT-style overlay, dot-grid, and scrolling telemetry ticker
 *  - Calls onComplete() after a 350 ms hold at 100 %, then fades out
 *
 * Design constraints:
 *  - All colours are CSS-variable references — works in both light and dark mode
 *  - Reuses .telem-label, .dot-grid, .stripe-bg, .readout, .led keyframes from globals.css
 *  - The inline @keyframes ticker-scroll is scoped to the shadow DOM of this element
 *    so it cannot bleed into the rest of the page
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_BOOT } from "@/lib/constants";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROGRESS_STEPS = [5, 12, 21, 35, 47, 58, 70, 82, 91, 97, 100] as const;

const BOOT_LINES = [
  "SYS: BIOS v2.6.1 — POST COMPLETE",
  "NET: LINK_OK — 1000BASE-T FULL-DUPLEX",
  "ECU: TELEMETRY_MODULE — ONLINE",
  "SYS: PORTFOLIO_ENGINE — INITIALIZING",
  "CACHE: WARMING — STANDBY",
  "SYS: READY — LAUNCHING",
] as const;

const TICKER_ITEMS = [
  { label: "RPM", value: "8200" },
  { label: "OIL_TEMP", value: "98.4°C" },
  { label: "BOOST", value: "1.2 BAR" },
  { label: "GEAR", value: "N" },
  { label: "FUEL", value: "45%" },
  { label: "THROTTLE", value: "0%" },
  { label: "LAP", value: "00:00.000" },
  { label: "SECTOR", value: "— —" },
] as const;

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
  onComplete?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Step the progress forward every 230 ms
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setStepIdx((prev) => {
        const next = prev + 1;
        if (next >= PROGRESS_STEPS.length) {
          clearInterval(timerRef.current!);
          // Hold at 100 % briefly so the user registers it
          setTimeout(() => {
            setExiting(true);
            setTimeout(() => onComplete?.(), 500);
          }, 350);
        }
        return next;
      });
    }, 230);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [onComplete]);

  // Mirror stepIdx → progress value
  useEffect(() => {
    if (stepIdx < PROGRESS_STEPS.length) {
      setProgress(PROGRESS_STEPS[stepIdx]);
    }
  }, [stepIdx]);

  const visibleLineCount = Math.min(
    Math.ceil((progress / 100) * BOOT_LINES.length),
    BOOT_LINES.length,
  );

  // Double the ticker for a seamless infinite scroll
  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, exit: { duration: 0.45 } }}
          className="fixed inset-0 flex flex-col overflow-hidden"
          style={{ background: "var(--color-canvas)", zIndex: 9999 }}
          aria-label="System loading"
          aria-live="polite"
        >
          {/* ── CRT scanline overlay ── */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              zIndex: 1,
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.035) 2px, rgba(0,0,0,0.035) 4px)",
            }}
          />

          {/* ── Dot grid ── */}
          <div
            className="fixed inset-0 dot-grid pointer-events-none"
            style={{ zIndex: 1 }}
          />

          {/* ── Header bar ──────────────────────────────────────── */}
          <header
            className="relative shrink-0 h-12 flex items-center justify-between px-6"
            style={{
              zIndex: 2,
              background: "var(--color-surface)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <div className="flex items-center gap-2.5">
              {/* Pulsing red LED — matches the "led red" CSS class animation */}
              <span className="led red" aria-hidden="true" />
              <span
                className="telem-label"
                style={{ color: "var(--color-red)", fontSize: "0.63rem" }}
              >
                SYSTEM_INIT // PORTFOLIO_BOOT
              </span>
            </div>
            <span className="telem-label" style={{ fontSize: "0.55rem" }}>
              NODE_04 // PORTFOLIO_S
            </span>
          </header>

          {/* ── Main content ────────────────────────────────────── */}
          <main
            className="relative flex-1 flex items-center justify-center px-8"
            style={{
              zIndex: 2,
              animation: "flicker 3s step-end infinite",
            }}
          >
            <div className="w-full max-w-sm flex flex-col gap-8">
              {/* Brand block */}
              <div className="text-center space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE_BOOT }}
                  className="inline-block telem-label px-2.5 py-1 mb-3"
                  style={{
                    background: "var(--color-red)",
                    color: "#fff",
                    fontSize: "0.57rem",
                    letterSpacing: "0.16em",
                  }}
                >
                  HIGH_PERFORMANCE_INTERFACE
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE_BOOT, delay: 0.08 }}
                  className="uppercase leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(2.6rem, 6vw, 3.4rem)",
                    letterSpacing: "0.02em",
                    color: "var(--color-ink)",
                  }}
                >
                  SYS_<span style={{ color: "var(--color-red)" }}>BOOT</span>
                </motion.h1>

                <p
                  className="telem-label"
                  style={{ fontSize: "0.57rem", letterSpacing: "0.2em" }}
                >
                  INITIALIZING PORTFOLIO ENGINE
                </p>
              </div>

              {/* Instrument cluster */}
              <div className="space-y-3">
                {/* Percentage readout */}
                <div
                  className="flex justify-between items-end pb-3"
                  style={{ borderBottom: "2px solid var(--color-surface-hi)" }}
                >
                  <span className="telem-label" style={{ fontSize: "0.58rem" }}>
                    LOAD_SEQUENCE
                  </span>
                  <div className="flex items-baseline">
                    <span
                      className="readout"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 900,
                        fontSize: "4.5rem",
                        lineHeight: 1,
                        color: "var(--color-ink)",
                      }}
                    >
                      {progress}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "1.6rem",
                        color: "var(--color-red)",
                        marginLeft: "0.2rem",
                      }}
                    >
                      %
                    </span>
                  </div>
                </div>

                {/* Stepped progress bar */}
                <div
                  className="relative h-10 overflow-hidden"
                  style={{ background: "var(--color-surface)" }}
                >
                  {/* Quarter-mark dividers */}
                  <div className="absolute inset-0 flex pointer-events-none">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: "25%",
                          borderRight: "1px solid var(--color-border)",
                        }}
                      />
                    ))}
                  </div>

                  {/* Filling bar */}
                  <div
                    className="absolute top-0 left-0 h-full overflow-hidden"
                    style={{
                      width: `${progress}%`,
                      background: "var(--color-red)",
                      boxShadow: "0 0 18px var(--color-red-glow)",
                      transition: "width 0.2s steps(1)",
                    }}
                  >
                    {/* Hazard diagonal stripes inside the fill */}
                    <div
                      className="absolute inset-0"
                      style={{
                        opacity: 0.18,
                        background:
                          "repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)",
                      }}
                    />
                  </div>

                  {/* Text overlay — mix-blend-difference so it's readable on both fill states */}
                  <div
                    className="absolute inset-0 flex items-center justify-between px-3"
                    style={{ mixBlendMode: "difference" }}
                  >
                    <span
                      className="telem-label text-white"
                      style={{ fontSize: "0.56rem" }}
                    >
                      TRANSFERRING_DATA_PACKETS
                    </span>
                    <span
                      className="telem-label text-white"
                      style={{ fontSize: "0.53rem" }}
                    >
                      v1.0.0
                    </span>
                  </div>
                </div>

                {/* Boot log terminal */}
                <div
                  className="p-3 space-y-1.5"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    minHeight: "6.8rem",
                  }}
                >
                  {BOOT_LINES.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={
                        i < visibleLineCount
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: -6 }
                      }
                      transition={{ duration: 0.18 }}
                      className="telem-label"
                      style={{
                        fontSize: "0.58rem",
                        color:
                          i === visibleLineCount - 1
                            ? "var(--color-amber)"
                            : "var(--color-ink-dim)",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--color-red)",
                          marginRight: "0.4rem",
                        }}
                        aria-hidden="true"
                      >
                        ▸
                      </span>
                      {line}
                    </motion.p>
                  ))}
                </div>

                {/* Status readout cells */}
                <div className="grid grid-cols-2 gap-2">
                  <div
                    style={{
                      background: "var(--color-surface)",
                      borderLeft: "3px solid var(--color-red)",
                      padding: "0.6rem 0.75rem",
                    }}
                  >
                    <p
                      className="telem-label mb-1"
                      style={{ fontSize: "0.52rem" }}
                    >
                      MODULE_STATUS
                    </p>
                    <p
                      className="telem-label"
                      style={{ fontSize: "0.66rem", color: "var(--color-ink)" }}
                    >
                      {progress < 40
                        ? "LOADING_CORE"
                        : progress < 80
                          ? "SYNCING_DATA"
                          : progress < 100
                            ? "FINALIZING"
                            : "READY"}
                    </p>
                  </div>

                  <div
                    style={{
                      background: "var(--color-surface)",
                      borderLeft: "3px solid var(--color-border)",
                      padding: "0.6rem 0.75rem",
                    }}
                  >
                    <p
                      className="telem-label mb-1"
                      style={{ fontSize: "0.52rem" }}
                    >
                      NETWORK_SYNC
                    </p>
                    <p
                      className="telem-label"
                      style={{
                        fontSize: "0.66rem",
                        color:
                          progress === 100
                            ? "var(--color-sys-green)"
                            : "var(--color-ink)",
                      }}
                    >
                      {progress < 100 ? "PENDING..." : "CONNECTED"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer ID strip */}
              <div
                className="flex justify-between items-center"
                style={{ opacity: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    style={{
                      width: "6px",
                      height: "6px",
                      background: "var(--color-red)",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="telem-label"
                    style={{ fontSize: "0.53rem", letterSpacing: "0.18em" }}
                  >
                    READY_FOR_CONNECTION
                  </span>
                </div>
                <span
                  className="telem-label"
                  style={{ fontSize: "0.53rem", color: "var(--color-red)" }}
                >
                  [ X-779 / DASH ]
                </span>
              </div>
            </div>
          </main>

          {/* ── Scrolling telemetry ticker ───────────────────────── */}
          <footer
            className="relative shrink-0 h-8 flex items-center overflow-hidden"
            style={{
              zIndex: 2,
              background: "var(--color-surface-hi)",
              borderTop: "1px solid var(--color-border)",
            }}
            aria-hidden="true"
          >
            <div
              className="whitespace-nowrap flex"
              style={{ animation: "loading-ticker 20s linear infinite" }}
            >
              {tickerItems.map((item, i) => (
                <span
                  key={i}
                  className="telem-label flex items-center gap-2 px-4"
                  style={{
                    fontSize: "0.58rem",
                    borderRight: "1px solid var(--color-border)",
                  }}
                >
                  <span style={{ color: "var(--color-red)", fontWeight: 700 }}>
                    {item.label}
                  </span>
                  <span style={{ color: "var(--color-ink)" }}>
                    {item.value}
                  </span>
                </span>
              ))}
            </div>

            {/* Scoped keyframe — won't pollute the global stylesheet */}
            <style>{`
              @keyframes loading-ticker {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
