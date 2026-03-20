"use client";

import SocialIcon from "@/components/icons/SocialIcon";
import StatusLED from "@/components/ui/StatusLED";
import type { ProfileData } from "@/src/types";

interface Props {
  profile: ProfileData;
}

export default function Footer({ profile }: Props) {
  const { firstName, lastName, socialLinks } = profile;

  const links = [
    socialLinks?.github && socialLinks.github,
    socialLinks?.linkedin && socialLinks.linkedin,
    socialLinks?.instagram && socialLinks.instagram,
    socialLinks?.email && `mailto:${socialLinks.email}`,
  ].filter(Boolean) as string[];

  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-0"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      {/* Red bottom rule — instrument panel closing bezel */}
      <div className="max-w-[1280px] mx-auto px-8 py-5 flex items-center justify-between flex-wrap gap-4">
        {/* Left: System info */}
        <div className="flex items-center gap-4">
          <StatusLED variant="green" />
          <div>
            <p
              className="telem-label"
              style={{ fontSize: "0.58rem", color: "var(--color-ink-dim)" }}
            >
              {`${firstName.toUpperCase()}_${lastName.toUpperCase()} // PORTFOLIO_v1.0`}
            </p>
            <p
              className="telem-label"
              style={{ fontSize: "0.55rem", color: "var(--color-ink-ghost)" }}
            >
              &copy; {year} — ALL_RIGHTS_RESERVED
            </p>
          </div>
        </div>

        {/* Center: Build info */}
        <p
          className="telem-label hidden md:block"
          style={{ fontSize: "0.55rem", color: "var(--color-ink-ghost)" }}
        >
          BUILT_WITH: NEXT.JS // TAILWIND // SANITY_CMS
        </p>

        {/* Right: Social icons */}
        {links.length > 0 && (
          <nav
            className="flex items-center gap-4"
            aria-label="Footer social links"
          >
            {links.map((href) => (
              <SocialIcon
                key={href}
                href={href}
                size={16}
                style={{ color: "var(--color-ink-dim)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-red)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-ink-dim)")
                }
              />
            ))}
          </nav>
        )}
      </div>

      {/* Bottom accent strip */}
      <div
        style={{
          height: "3px",
          background:
            "linear-gradient(to right, var(--color-red), var(--color-amber), transparent)",
          opacity: 0.6,
        }}
      />
    </footer>
  );
}
