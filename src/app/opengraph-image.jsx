import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/content";

export const alt = "Skemalab | Studio Digital — Build · Grow · Automate";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "#080c0e",
          backgroundImage:
            "radial-gradient(circle at 90% 10%, rgba(16, 185, 129, 0.18) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(14, 165, 233, 0.12) 0%, transparent 40%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header with Logo and Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "44px",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              Skema
            </span>
            <span
              style={{
                fontSize: "44px",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#089587",
              }}
            >
              لاب
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              borderRadius: "4px",
              background: "rgba(8, 149, 135, 0.15)",
              border: "1px solid rgba(8, 149, 135, 0.4)",
              fontSize: "15px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#ffffff",
            }}
          >
            🇲🇦 Studio Digital Marocain · Essaouira
          </div>
        </div>

        {/* Center Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "56px",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            Développement · Marketing · Automatisation
          </div>

          <div
            style={{
              fontSize: "24px",
              lineHeight: 1.4,
              color: "rgba(255, 255, 255, 0.65)",
              maxWidth: "900px",
            }}
          >
            {siteConfig.description}
          </div>
        </div>

        {/* Footer Pills & URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "24px",
              fontSize: "18px",
              color: "#089587",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            <span>01 BUILD</span>
            <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>·</span>
            <span>02 GROW</span>
            <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>·</span>
            <span>03 AUTOMATE</span>
          </div>

          <div
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.9)",
              letterSpacing: "0.02em",
            }}
          >
            skemalab.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
