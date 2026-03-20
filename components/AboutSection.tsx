"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TechIcon from "@/components/icons/TechIcon";
import TelemetryReadout from "@/components/ui/TelemetryReadout";
import StatusLED from "@/components/ui/StatusLED";
import { EASE_BOOT } from "@/lib/constants";
import type { ProfileData } from "@/src/types";

interface Props {
  profile: ProfileData;
}

export default function AboutSection({ profile }: Props) {
  const {
    firstName,
    lastName,
    aboutDescription,
    profilePictureUrl,
    techStack,
  } = profile;

  return (
    <section id="about" className="py-24 px-8 max-w-[1280px] mx-auto">
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
            MODULE_03 // DRIVER_PROFILE
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
            About
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start">
        {/* ── Left: Profile image in spec-sheet frame ─────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE_BOOT }}
        >
          {/* Image frame */}
          <div
            style={{
              width: "330px",
              border: "1px solid var(--color-border)",
              borderTop: "3px solid var(--color-amber)",
              position: "relative",
            }}
          >
            {/* Frame corners */}
            <span
              className="absolute top-0 right-0 w-3 h-3 border-r border-b"
              style={{ borderColor: "var(--color-amber)", opacity: 0.5 }}
            />
            <span
              className="absolute bottom-0 left-0 w-3 h-3 border-l border-b"
              style={{ borderColor: "var(--color-amber)", opacity: 0.5 }}
            />

            {/* Header label */}
            <div
              className="flex items-center justify-between px-3 py-2"
              style={{
                background: "var(--color-surface-hi)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <span
                className="telem-label"
                style={{ fontSize: "0.55rem", color: "var(--color-amber)" }}
              >
                PROFILE_PHOTO
              </span>
              <StatusLED variant="green" />
            </div>

            {/* Image */}
            <div
              style={{
                position: "relative",
                aspectRatio: "3/4",
                background: "var(--color-surface)",
              }}
            >
              {profilePictureUrl ? (
                <Image
                  src={profilePictureUrl}
                  alt={`${firstName} ${lastName}`}
                  fill
                  sizes="260px"
                  className="object-cover object-top"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center stripe-bg">
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "5rem",
                      fontWeight: 900,
                      color: "var(--color-amber)",
                      opacity: 0.12,
                    }}
                  >
                    {firstName[0]}
                    {lastName[0]}
                  </span>
                </div>
              )}

              {/* Coordinate overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 px-3 py-1.5"
                style={{
                  background: "rgba(10,10,12,0.85)",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <p className="telem-label" style={{ fontSize: "0.52rem" }}>
                  {firstName.toUpperCase()}_{lastName.toUpperCase()} // DRIVER
                </p>
              </div>
            </div>

            {/* Telemetry strip below */}
            <div
              className="grid grid-cols-2"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <TelemetryReadout label="STATUS" value="ACTIVE" accent />
              <TelemetryReadout label="ROLE" value="FULLSTACK" />
            </div>
          </div>
        </motion.div>

        {/* ── Right: Info + tech stack ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE_BOOT, delay: 0.12 }}
        >
          {/* Name */}
          <h3
            className="mb-1 uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "2.4rem",
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            {firstName}&nbsp;
            <span style={{ color: "var(--color-red)" }}>{lastName}</span>
          </h3>

          {/* About text — readable paragraph */}
          <p
            className="text-[0.9rem] leading-[1.85] mb-8 max-w-[600px]"
            style={{ color: "var(--color-ink-dim)" }}
          >
            {aboutDescription}
          </p>

          {/* Section label */}
          <p
            className="telem-label mb-3"
            style={{ color: "var(--color-amber)", fontSize: "0.6rem" }}
          >
            TECH_STACK // INSTALLED_MODULES
          </p>

          {/* Tech stack */}
          {techStack?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {techStack.map((item) => (
                <TechIcon key={item} name={item} size={20} showLabel />
              ))}
            </div>
          )}

          {/* CTA */}
          <a href="#contact" className="btn-primary">
            Open Comms
          </a>
        </motion.div>
      </div>
    </section>
  );
}
