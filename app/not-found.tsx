/**
 * app/not-found.tsx
 *
 * Rendered by Next.js whenever notFound() is thrown or a route is unmatched.
 *
 * Design intent:
 *  - Ghost "404" numeral at massive scale — opacity 0.06, acts as a background glyph
 *  - "SIGNAL_LOST" headline overlaps it, creating depth without extra DOM layers
 *  - Telemetry readout grid mirrors the HeroSection instrument cluster
 *  - Corner bracket accents frame the viewport (reused from HeroSection style)
 *  - No framer-motion — this page should be static and instant to render
 */

import Link from "next/link";
import StatusLED from "@/components/ui/StatusLED";

export default function NotFound() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--color-canvas)" }}
      aria-label="Page not found"
    >
      {/* ── Background textures ── */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      <div
        className="absolute inset-0 stripe-bg pointer-events-none"
        style={{ opacity: 0.5 }}
      />

      {/* ── Corner bracket accents ── */}
      <span
        aria-hidden="true"
        className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2"
        style={{ borderColor: "var(--color-red)" }}
      />
      <span
        aria-hidden="true"
        className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2"
        style={{ borderColor: "var(--color-red)" }}
      />
      <span
        aria-hidden="true"
        className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2"
        style={{ borderColor: "var(--color-red)" }}
      />
      <span
        aria-hidden="true"
        className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2"
        style={{ borderColor: "var(--color-red)" }}
      />

      <div className="relative z-10 text-center px-8 max-w-lg w-full">
        {/* Status badge */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <StatusLED variant="red" />
          <span
            className="telem-label"
            style={{ color: "var(--color-red)", fontSize: "0.62rem" }}
          >
            FAULT_CODE // ROUTE_NOT_FOUND
          </span>
        </div>

        {/* Ghost 404 numeral — decorative only */}
        <p
          aria-hidden="true"
          className="uppercase leading-none select-none pointer-events-none"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(8rem, 22vw, 15rem)",
            color: "var(--color-ink)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            opacity: 0.06,
          }}
        >
          404
        </p>

        {/* Headline — overlaps the ghost numeral via negative margin */}
        <div style={{ marginTop: "calc(-1 * clamp(4rem, 11vw, 7.5rem))" }}>
          <h1
            className="uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "var(--color-ink)",
              letterSpacing: "0.04em",
              lineHeight: 1,
            }}
          >
            SIGNAL_<span style={{ color: "var(--color-red)" }}>LOST</span>
          </h1>

          {/* Subtitle rule */}
          <div className="flex items-center justify-center gap-3 mt-3 mb-8">
            <div
              aria-hidden="true"
              style={{
                width: "32px",
                height: "1px",
                background: "var(--color-red)",
              }}
            />
            <span
              className="telem-label"
              style={{ fontSize: "0.65rem", color: "var(--color-amber)" }}
            >
              PAGE_OFFLINE // UNIT_UNRESPONSIVE
            </span>
            <div
              aria-hidden="true"
              style={{
                width: "32px",
                height: "1px",
                background: "var(--color-red)",
              }}
            />
          </div>
        </div>

        {/* Telemetry instrument grid */}
        <div
          className="grid grid-cols-3 max-w-xs mx-auto mb-10 border"
          style={{ borderColor: "var(--color-border)" }}
          aria-label="Error details"
        >
          {[
            { label: "HTTP_CODE", value: "404", accent: true },
            { label: "STATUS", value: "OFFLINE", accent: false },
            { label: "RETRY", value: "0", accent: false },
          ].map(({ label, value, accent }, i) => (
            <div
              key={label}
              className="flex flex-col gap-1 p-3"
              style={{
                borderRight: i < 2 ? "1px solid var(--color-border)" : "none",
                background: "var(--color-surface)",
              }}
            >
              <span className="telem-label" style={{ fontSize: "0.52rem" }}>
                {label}
              </span>
              <span
                className="readout"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: accent ? "var(--color-red)" : "var(--color-ink)",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Recovery CTAs */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/" className="btn-primary">
            RETURN_TO_BASE
          </Link>
          <Link href="/#work" className="btn-ghost">
            VIEW_UNITS
          </Link>
        </div>

        {/* Footer label */}
        <p
          className="telem-label mt-10"
          style={{ fontSize: "0.55rem", color: "var(--color-ink-ghost)" }}
        >
          PORTFOLIO_ENGINE // FAULT_HANDLER_v1.0
        </p>
      </div>
    </div>
  );
}
