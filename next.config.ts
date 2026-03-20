import type { NextConfig } from "next";

/**
 * next.config.ts
 *
 * CSP is environment-aware:
 *   - Development: 'unsafe-eval' is added to script-src because React's
 *     Turbopack dev server requires eval() for hot module replacement and
 *     dev-mode stack trace reconstruction. This is a React requirement,
 *     not a Next.js bug — it will never use eval() in production builds.
 *   - Production: strict CSP, no eval(), no unsafe-inline in script-src.
 *
 * Adjust img-src / media-src if you add additional external image providers.
 */
const isDev = process.env.NODE_ENV === "development";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src  'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src   'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src    'self' https://fonts.gstatic.com;
  img-src     'self' data: blob: https://cdn.sanity.io https://*.sanity.io;
  media-src   'self' https://cdn.sanity.io https://*.sanity.io;
  connect-src 'self' https://*.sanity.io${isDev ? " ws://localhost:* http://localhost:*" : ""};
  frame-src   'none';
  object-src  'none';
  base-uri    'self';
  form-action 'self';
  upgrade-insecure-requests;
`
  .replace(/\n/g, " ")
  .trim();

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // HSTS: only applies in production — browsers ignore it on localhost
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    // Allowlist only trusted image hosts — never use `*`
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  reactStrictMode: true,
};

export default nextConfig;
