"use client";

/**
 * app/error.tsx
 *
 * Next.js App Router error boundary.
 * Must be a "use client" component — Next.js requires this so it can
 * receive the `error` prop and call `reset()` interactively.
 *
 * Security notes:
 *  - error.message is rendered as plain text; it is not sanitised HTML,
 *    so XSS is not a concern. No dangerouslySetInnerHTML is used.
 *  - error.digest is the server-side hash Next.js generates for production
 *    errors. It is safe to display — it reveals nothing about the
 *    implementation while still being useful for log correlation.
 *  - We never log the full error object to a user-visible surface.
 *
 * Design intent:
 *  - Red "CRITICAL_FAULT" badge over diagonal stripe background
 *  - Error message displayed in a monospace readout panel
 *  - Two recovery paths: restart the failed module (reset), return to root
 */

import { useEffect } from "react";
import StatusLED from "@/components/ui/StatusLED";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  // Log to console in development; in production wire this to your
  // preferred observability platform (Sentry, Datadog, etc.)
  useEffect(() => {
    console.error("[PORTFOLIO_ERROR]", error);
  }, [error]);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--color-canvas)" }}
      aria-label="An error occurred"
      role="alert"
    >
      {/* ── Background textures ── */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      {/* Horizontal fault-line — subtle, signals "something is wrong" */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 pointer-events-none"
        style={{
          top: "50%",
          height: "1px",
          background: "var(--color-red)",
          opacity: 0.1,
          transform: "translateY(-50%)",
        }}
      />

      {/* ── Corner brackets (asymmetric — intentionally broken-looking) ── */}
      <span
        aria-hidden="true"
        className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2"
        style={{ borderColor: "var(--color-red)" }}
      />
      <span
        aria-hidden="true"
        className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2"
        style={{ borderColor: "var(--color-red)" }}
      />

      <div className="relative z-10 text-center px-8 max-w-lg w-full">
        {/* Critical fault badge */}
        <div
          className="inline-flex items-center gap-3 border px-4 py-2.5 mb-8"
          style={{
            borderColor: "var(--color-red)",
            borderLeftWidth: "3px",
            background: "var(--color-red-glow)",
          }}
        >
          <StatusLED variant="red" />
          <span
            className="telem-label"
            style={{ color: "var(--color-red)", fontSize: "0.62rem" }}
          >
            CRITICAL_FAULT // SYSTEM_EXCEPTION
          </span>
        </div>

        {/* Ghost "ERR" glyph — decorative */}
        <p
          aria-hidden="true"
          className="uppercase leading-none select-none pointer-events-none"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(5rem, 16vw, 11rem)",
            color: "var(--color-red)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            opacity: 0.06,
          }}
        >
          ERR
        </p>

        {/* Headline */}
        <div style={{ marginTop: "calc(-1 * clamp(2.5rem, 8vw, 5.5rem))" }}>
          <h1
            className="uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              letterSpacing: "0.02em",
              lineHeight: 1,
              color: "var(--color-ink)",
            }}
          >
            ENGINE_<span style={{ color: "var(--color-red)" }}>FAULT</span>
          </h1>

          <div className="flex items-center justify-center gap-3 mt-3 mb-6">
            <div
              aria-hidden="true"
              style={{
                width: "24px",
                height: "1px",
                background: "var(--color-red)",
              }}
            />
            <span
              className="telem-label"
              style={{ fontSize: "0.65rem", color: "var(--color-amber)" }}
            >
              UNEXPECTED_EXCEPTION_CAUGHT
            </span>
            <div
              aria-hidden="true"
              style={{
                width: "24px",
                height: "1px",
                background: "var(--color-red)",
              }}
            />
          </div>
        </div>

        {/* Error detail panel */}
        <div
          className="text-left p-4 mb-8 border"
          style={{
            background: "var(--color-surface)",
            borderColor: "var(--color-border)",
            borderLeft: "3px solid var(--color-red)",
          }}
        >
          <p
            className="telem-label mb-2"
            style={{ fontSize: "0.55rem", color: "var(--color-red)" }}
          >
            FAULT_DESCRIPTOR
          </p>

          {/* error.message is plain text — no XSS risk */}
          <p
            className="readout break-all"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-ink-dim)",
              fontSize: "0.75rem",
              lineHeight: 1.6,
            }}
          >
            {error.message || "Unknown exception — no descriptor available."}
          </p>

          {/* Digest hash — production-only, safe to show */}
          {error.digest && (
            <p
              className="telem-label mt-3"
              style={{ fontSize: "0.53rem", color: "var(--color-ink-ghost)" }}
            >
              DIGEST: {error.digest}
            </p>
          )}
        </div>

        {/* Recovery actions */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* reset() remounts the failed route segment — no full page reload */}
          <button
            onClick={reset}
            className="btn-primary"
            aria-label="Retry loading this page"
          >
            RESTART_MODULE
          </button>
          <a href="/" className="btn-ghost" aria-label="Return to home page">
            RETURN_TO_BASE
          </a>
        </div>

        <p
          className="telem-label mt-8"
          style={{ fontSize: "0.53rem", color: "var(--color-ink-ghost)" }}
        >
          PORTFOLIO_ENGINE // FAULT_HANDLER_v1.0
        </p>
      </div>
    </div>
  );
}
