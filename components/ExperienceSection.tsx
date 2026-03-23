"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import StatusLED from "@/components/ui/StatusLED";
import { EASE_BOOT } from "@/lib/constants";
import type { ExperienceData } from "@/src/types";

interface Props {
  experiences: ExperienceData[];
}

export default function ExperienceSection({ experiences }: Props) {
  // Helper to format YYYY-MM to a readable string, handling ongoing roles
  const formatTimeframe = (start: string | null, end: string | null) => {
    if (!start) return "UNKNOWN_DATE";
    const parseDate = (d: string) =>
      new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    const startStr = parseDate(start).toUpperCase();
    const endStr = end ? parseDate(end).toUpperCase() : "PRESENT";
    return `${startStr} // ${endStr}`;
  };

  return (
    <section id="experience" className="py-24 px-8 max-w-[1280px] mx-auto">
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
            MODULE_01A // CAREER_TELEMETRY
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
            Experience
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: EASE_BOOT, delay: i * 0.1 }}
            className="panel grid md:grid-cols-[200px_1fr] gap-6 p-6 md:p-8"
            style={{ borderLeft: "3px solid var(--color-amber)" }}
          >
            {/* Left Column: Metadata */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <StatusLED variant={exp.endDate ? "amber" : "green"} />
                <span className="telem-label" style={{ fontSize: "0.6rem" }}>
                  {exp.category}
                </span>
              </div>

              <div
                className="telem-label"
                style={{ color: "var(--color-ink-dim)" }}
              >
                {formatTimeframe(exp.startDate, exp.endDate)}
              </div>

              {exp.logoUrl && (
                <div className="mt-auto hidden md:block w-38 h-38 relative opacity-80 grayscale">
                  <Image
                    src={exp.logoUrl}
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            {/* Right Column: Content */}
            <div className="flex flex-col">
              <h3
                className="mb-1 uppercase"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "1.6rem",
                  letterSpacing: "0.01em",
                  color: "var(--color-ink)",
                }}
              >
                {exp.title}
              </h3>

              {exp.company && (
                <p
                  className="telem-label mb-4"
                  style={{ color: "var(--color-red)", fontSize: "0.7rem" }}
                >
                  @ {exp.company}
                </p>
              )}

              <p
                className="text-[0.9rem] leading-[1.8] max-w-[800px]"
                style={{ color: "var(--color-ink-dim)" }}
              >
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
