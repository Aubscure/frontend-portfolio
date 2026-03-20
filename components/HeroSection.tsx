"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SocialIcon from "@/components/icons/SocialIcon";
import type { ProfileData } from "@/src/types";

interface Props {
  profile: ProfileData;
}

const ease = [0.4, 0, 0.2, 1] as const;

export default function HeroSection({ profile }: Props) {
  const {
    firstName,
    lastName,
    nickname,
    profilePictureUrl,
    aboutDescription,
    resumeUrl,
    socialLinks,
  } = profile;

  const fullName = `${firstName} ${lastName}`;

  const socialHrefs = [
    socialLinks?.github && socialLinks.github,
    socialLinks?.linkedin && socialLinks.linkedin,
    socialLinks?.instagram && socialLinks.instagram,
    socialLinks?.email && `mailto:${socialLinks.email}`,
  ].filter(Boolean) as string[];

  return (
    <section
      id="hero"
      className="grid md:grid-cols-2 items-center gap-16 px-10 py-24 max-w-[1200px] mx-auto min-h-[calc(100vh-60px)]"
    >
      {/* Copy */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="badge-pulse inline-flex items-center gap-2 border px-3.5 py-1.5 text-[0.68rem] tracking-widest uppercase mb-6"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-muted)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
          Available for projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="text-[clamp(2.8rem,5vw,4.2rem)] leading-[1.12] font-semibold -tracking-[0.02em] mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {firstName}&apos;s digital
          <br />
          work — crafted with
          <br />
          <em className="not-italic" style={{ color: "var(--color-hanko)" }}>
            quiet precision.
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="text-base leading-[1.75] max-w-[440px] mb-10"
          style={{ color: "var(--color-muted)" }}
        >
          {aboutDescription}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="flex items-center gap-4 flex-wrap"
        >
          <a
            href="#work"
            className="inline-block px-7 py-3 text-[0.78rem] tracking-widest uppercase transition-all duration-200 hover:opacity-80 hover:-translate-y-px no-underline"
            style={{
              background: "var(--color-ink)",
              color: "var(--color-canvas)",
            }}
          >
            View Work
          </a>
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-7 py-3 border text-[0.78rem] tracking-widest uppercase transition-all duration-200 hover:-translate-y-px no-underline"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-ink)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "var(--color-ink)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--color-border)")
              }
            >
              Resume
            </a>
          )}
        </motion.div>

        {/* Social links — auto-detected icons */}
        {socialHrefs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
            className="flex items-center gap-5 mt-8"
          >
            {socialHrefs.map((href) => (
              <SocialIcon
                key={href}
                href={href}
                size={20}
                className="transition-colors duration-200"
                style={{ color: "var(--color-muted)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-hanko)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-muted)")
                }
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.45 }}
        className="hidden md:flex justify-center items-center relative"
      >
        <div className="float-idle relative w-[320px] h-[380px]">
          <div
            className="absolute inset-0 transition-colors duration-300"
            style={{
              background: "var(--color-peach-dim)",
              clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
            }}
          />
          <div className="absolute inset-[20px_20px_0_20px] flex items-end justify-center overflow-hidden">
            {profilePictureUrl ? (
              <Image
                src={profilePictureUrl}
                alt={fullName}
                fill
                sizes="300px"
                className="object-cover object-top"
                priority
              />
            ) : (
              <span
                className="select-none leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "6rem",
                  fontWeight: 700,
                  color: "var(--color-hanko)",
                  opacity: 0.18,
                }}
              >
                {firstName[0]}
                {lastName[0]}
              </span>
            )}
          </div>

          {nickname && (
            <div
              className="card absolute -bottom-4 -left-4 px-4 py-2.5 text-[0.68rem] tracking-[0.06em] uppercase"
              style={{
                background: "var(--color-canvas)",
                color: "var(--color-muted)",
              }}
            >
              {nickname}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
