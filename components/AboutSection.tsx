"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TechIcon from "@/components/icons/TechIcon";
import type { ProfileData } from "@/src/types";

interface Props {
  profile: ProfileData;
}

const ease = [0.4, 0, 0.2, 1] as const;

export default function AboutSection({ profile }: Props) {
  const {
    firstName,
    lastName,
    aboutDescription,
    profilePictureUrl,
    techStack,
  } = profile;

  return (
    <section
      id="about"
      className="py-[7rem] px-10 max-w-[1200px] mx-auto grid md:grid-cols-[1fr_1.3fr] gap-24 items-start"
    >
      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease }}
        className="relative"
      >
        <div
          className="w-full flex items-center justify-center overflow-hidden relative"
          style={{ aspectRatio: "3/4", background: "var(--color-peach-dim)" }}
        >
          {profilePictureUrl ? (
            <Image
              src={profilePictureUrl}
              alt={`${firstName} ${lastName}`}
              fill
              sizes="(max-width: 900px) 100vw, 400px"
              className="object-cover object-top"
            />
          ) : (
            <span
              className="select-none absolute right-4 bottom-4 opacity-[0.12]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "8rem",
                color: "var(--color-hanko)",
                writingMode: "vertical-rl",
              }}
            >
              {firstName[0]}
              {lastName[0]}
            </span>
          )}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease, delay: 0.15 }}
      >
        <div className="flex items-baseline gap-6 mb-8">
          <span
            className="text-[0.68rem] tracking-[0.14em] uppercase pl-4 border-l-2"
            style={{
              borderColor: "var(--color-hanko)",
              color: "var(--color-muted)",
            }}
          >
            About
          </span>
        </div>

        <p
          className="text-[1.55rem] font-medium leading-[1.5] mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {firstName} {lastName}
        </p>

        <p
          className="text-[0.88rem] leading-[1.85] mb-8"
          style={{ color: "var(--color-muted)" }}
        >
          {aboutDescription}
        </p>

        {/* Tech stack — TechIcon handles name/URL detection and renders SVG icon */}
        {techStack?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {techStack.map((item) => (
              <TechIcon key={item} name={item} size={13} showLabel />
            ))}
          </div>
        )}

        <a
          href="#contact"
          className="inline-block px-7 py-3 text-[0.78rem] tracking-widest uppercase no-underline transition-all duration-200 hover:opacity-80 hover:-translate-y-px"
          style={{
            background: "var(--color-ink)",
            color: "var(--color-canvas)",
          }}
        >
          Get in Touch
        </a>
      </motion.div>
    </section>
  );
}
