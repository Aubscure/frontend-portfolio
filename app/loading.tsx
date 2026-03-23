/**
 * app/loading.tsx
 *
 * Next.js App Router Suspense fallback.
 * Shown automatically while server components in the same route segment
 * are still streaming / fetching data.
 *
 * Kept deliberately lightweight — no framer-motion, no heavy animations.
 * The full boot splash (BootSplash / LoadingScreen) handles the first-visit
 * experience; this is just a polite "hang on" indicator for subsequent
 * navigations or ISR revalidation.
 *
 * Reuses only globals.css primitives:
 *   .telem-label, .skeleton, .led, CSS variables
 */

export default function Loading() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center gap-6"
      style={{ background: "var(--color-canvas)", zIndex: 100 }}
      aria-label="Loading"
      aria-live="polite"
    >
      {/* Dot grid — passive texture, no animation cost */}
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-5">
        {/* Status badge */}
        <div
          className="flex items-center gap-2.5 border px-4 py-2"
          style={{
            borderColor: "var(--color-border)",
            borderLeft: "3px solid var(--color-amber)",
            background: "var(--color-surface)",
          }}
        >
          {/* Amber LED — "in progress" state, matching the led.amber class */}
          <span className="led amber" aria-hidden="true" />
          <span
            className="telem-label"
            style={{ color: "var(--color-amber)", fontSize: "0.63rem" }}
          >
            LOADING_MODULE...
          </span>
        </div>

        {/* Skeleton progress bar */}
        <div
          className="skeleton"
          style={{
            width: "220px",
            height: "3px",
            borderRadius: 0,
          }}
          aria-hidden="true"
        />

        {/* Telemetry sub-label */}
        <span
          className="telem-label"
          style={{ fontSize: "0.55rem", color: "var(--color-ink-ghost)" }}
        >
          PORTFOLIO_ENGINE // DATA_STREAM_ACTIVE
        </span>
      </div>
    </div>
  );
}
