import fs from "node:fs";

const imageHosts = JSON.parse(
  fs.readFileSync(new URL("./src/lib/blog/image-hosts.json", import.meta.url), "utf8"),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fewer legacy polyfills for modern browsers (PageSpeed "Legacy JavaScript")
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: imageHosts.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
  // Content is read at runtime (ISR) and on-demand generation: make sure the
  // Markdown/JSON files are bundled with the serverless functions.
  outputFileTracingIncludes: {
    "/*": ["./content/**/*", "./src/lib/blog/image-hosts.json"],
  },
  async redirects() {
    return [
      // Blog URLs without a locale fall back to French, the site default.
      // Specific routes are declared first so they are not swallowed by :slug.
      { source: "/blog", destination: "/fr/blog", permanent: false },
      {
        source: "/blog/page/:n",
        destination: "/fr/blog/page/:n",
        permanent: false,
      },
      {
        source: "/blog/category/:category",
        destination: "/fr/blog/category/:category",
        permanent: false,
      },
      // Tags are metadata now: old tag URLs fall back to the blog index.
      {
        source: "/blog/tag/:tag",
        destination: "/fr/blog",
        permanent: false,
      },
      {
        source: "/:locale(fr|en|ar)/blog/tag/:tag",
        destination: "/:locale/blog",
        permanent: false,
      },
      {
        source: "/blog/rss.xml",
        destination: "/fr/blog/rss.xml",
        permanent: false,
      },
      {
        source: "/blog/:slug",
        destination: "/fr/blog/:slug",
        permanent: false,
      },
    ];
  },
  async headers() {
    const isDev = process.env.NODE_ENV !== "production";

    const scriptSrc = [
      "'self'",
      "'unsafe-inline'",
      ...(isDev ? ["'unsafe-eval'"] : []),
    ].join(" ");

    const connectSrc = ["'self'", ...(isDev ? ["ws:", "wss:"] : [])].join(" ");

    const imgSrc = [
      "'self'",
      "data:",
      "blob:",
      ...imageHosts.map((hostname) => `https://${hostname}`),
    ].join(" ");

    const frameSrc = [
      "'self'",
      "https://calendly.com",
      "https://*.calendly.com",
    ].join(" ");

    const csp = [
      "default-src 'self'",
      `script-src ${scriptSrc}`,
      "style-src 'self' 'unsafe-inline'",
      `img-src ${imgSrc}`,
      "font-src 'self' data:",
      `connect-src ${connectSrc}`,
      `frame-src ${frameSrc}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
