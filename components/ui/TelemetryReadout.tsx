/**
 * components/ui/TelemetryReadout.tsx
 *
 * Renders a single telemetry datum in the style of a race-car data logger:
 *   LABEL
 *   VALUE UNIT
 *
 * Used in HeroSection and AboutSection for driver-profile stats.
 */

interface Props {
  label: string;
  value: string | number;
  unit?: string;
  accent?: boolean; // highlight value in red accent
  className?: string;
}

export default function TelemetryReadout({
  label,
  value,
  unit,
  accent = false,
  className = "",
}: Props) {
  return (
    <div
      className={`flex flex-col gap-0.5 p-4 border border-[var(--color-border)] ${className}`}
      style={{ background: "var(--color-surface)" }}
    >
      <span className="telem-label">{label}</span>
      <span
        className="readout text-2xl font-bold leading-none"
        style={{
          fontFamily: "var(--font-mono)",
          color: accent ? "var(--color-red)" : "var(--color-ink)",
        }}
      >
        {value}
        {unit && (
          <span
            className="text-sm ml-1 font-normal"
            style={{ color: "var(--color-ink-dim)" }}
          >
            {unit}
          </span>
        )}
      </span>
    </div>
  );
}
