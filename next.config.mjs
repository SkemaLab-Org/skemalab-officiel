/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
      {
        protocol: "https",
        hostname: "www.magnific.com",
      },
      {
        protocol: "https",
        hostname: "magnific.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
    ],
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
      "https://images.unsplash.com",
      "https://img.magnific.com",
      "https://www.magnific.com",
      "https://magnific.com",
      "https://img.freepik.com",
    ].join(" ");

    // Iframe-only Calendly embed (scripts run inside the iframe origin)
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
