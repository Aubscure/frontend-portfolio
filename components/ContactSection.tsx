"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SocialIcon from "@/components/icons/SocialIcon";
import type { SocialLinks } from "@/src/types";

interface ContactSectionProps {
  socialLinks: SocialLinks;
}

export default function ContactSection({ socialLinks }: ContactSectionProps) {
  // Hydration state prevents server/client mismatch during rendering
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleEmailClick = () => {
    if (socialLinks?.email) {
      // Constructs the mailto execution only in browser memory to thwart scrapers
      window.location.href = `mailto:${socialLinks.email}`;
    }
  };

  // Graceful degradation
  if (!socialLinks) return null;

  return (
    <section
      id="contact"
      className="py-32 px-8 max-w-3xl mx-auto text-center flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="space-y-12 w-full"
      >
        {/* Uses the font-display and text-ink variables dynamically */}
        <h2 className="text-4xl md:text-6xl font-bold text-ink tracking-tight font-display">
          Let's Build Something.
        </h2>

        {socialLinks.email && (
          <div className="pt-8">
            <button
              onClick={handleEmailClick}
              // Consumes your semantic color tokens: bg-hanko, text-canvas, ring-hanko
              className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-medium bg-hanko text-canvas rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 active:scale-95 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-hanko focus:ring-offset-2 focus:ring-offset-canvas"
              aria-label="Send an email"
            >
              <span className="relative z-10 tracking-widest uppercase text-sm font-bold">
                {isMounted ? "Send an Email" : "Initializing..."}
              </span>
            </button>
          </div>
        )}

        {/* Dynamic Social Links Mapping */}
        <div className="pt-16 flex flex-wrap justify-center gap-x-12 gap-y-8 items-center max-w-2xl mx-auto">
          {Object.entries(socialLinks)
            // 1. Remove the email field from this loop
            // 2. Ensure the value exists and is a string
            .filter(
              ([key, value]) =>
                key !== "email" &&
                typeof value === "string" &&
                value.length > 0,
            )
            .map(([key, url]) => (
              <SocialIcon
                key={key}
                href={url as string}
                size={20}
                // Passes your custom interaction classes directly into the anchor tag
                className="text-muted hover:text-ink transition-colors duration-200 active:scale-95 hanko-line pl-4 text-left"
              />
            ))}
        </div>
      </motion.div>
    </section>
  );
}
