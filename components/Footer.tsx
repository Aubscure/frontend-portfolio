"use client";

import SocialIcon from "@/components/icons/SocialIcon";
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

  return (
    <footer
      className="border-t px-10 py-12 max-w-[1200px] mx-auto flex items-center justify-between flex-wrap gap-6"
      style={{ borderColor: "var(--color-border)" }}
    >
      <p
        className="text-[0.82rem]"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-muted)",
        }}
      >
        &copy; {new Date().getFullYear()} {firstName} {lastName}
      </p>

      {links.length > 0 && (
        <nav className="flex gap-5" aria-label="Footer social links">
          {links.map((href) => (
            <SocialIcon
              key={href}
              href={href}
              size={18}
              style={{ color: "var(--color-muted)" }}
              className="transition-colors duration-200"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-hanko)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-muted)")
              }
            />
          ))}
        </nav>
      )}
    </footer>
  );
}
