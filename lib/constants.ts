/**
 * lib/constants.ts
 *
 * Single source of truth for all shared constants:
 * animation easing curves, navigation config, and display strings.
 */

// ─── Animation ────────────────────────────────────────────────────────────────

/** Tachometer snap — immediate acceleration, smooth stop */
export const EASE_MECH = [0.25, 1, 0.5, 1] as const;

/** System boot reveal — content scans in from left */
export const EASE_BOOT = [0.16, 1, 0.3, 1] as const;

/** Hard cut — used for instant hover inversions */
export const EASE_SNAP = [0.55, 0, 0.45, 1] as const;

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Units", href: "#work", id: "SYS_01" },
  { label: "Profile", href: "#about", id: "SYS_02" },
  { label: "Comms", href: "#contact", id: "SYS_03" },
] as const;

// ─── Boot sequence messages ───────────────────────────────────────────────────

export const BOOT_LINES = [
  "SYS: BIOS v2.6.1 — LOADING",
  "NET: LINK_OK — 1000BASE-T FULL-DUPLEX",
  "SYS: PORTFOLIO_ENGINE — INITIALIZED",
  "ECU: TELEMETRY_STREAM — ACTIVE",
] as const;

// ─── Telemetry readout display ────────────────────────────────────────────────

export const HERO_TELEMETRY = [
  { label: "STATUS", value: "ONLINE", unit: "" },
  { label: "EXP", value: "5+", unit: "YR" },
  { label: "UPTIME", value: "99.9", unit: "%" },
] as const;
