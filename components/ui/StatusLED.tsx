/**
 * components/ui/StatusLED.tsx
 *
 * Atomic blinking LED indicator.
 * Visually mimics instrument cluster status lights.
 */

interface Props {
  variant?: "green" | "amber" | "red";
  className?: string;
}

export default function StatusLED({
  variant = "green",
  className = "",
}: Props) {
  return (
    <span
      className={`led ${variant === "amber" ? "amber" : variant === "red" ? "red" : ""} ${className}`}
      aria-hidden="true"
    />
  );
}
