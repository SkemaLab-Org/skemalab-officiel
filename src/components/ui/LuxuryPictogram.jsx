"use client";

import clsx from "clsx";

/**
 * Luxury Pictogram & Icon System
 * Features multi-layered faceted geometric badge frames and custom SVG symbology
 * Icons ALWAYS maintain their rich brand colors (emerald teal & champagne gold) on hover
 */
export default function LuxuryPictogram({
  type = "dev",
  size = "md", // "sm" | "md" | "lg"
  className = "",
  glow = true,
}) {
  const sizeMap = {
    sm: "h-10 w-10 min-w-10",
    md: "h-14 w-14 min-w-14",
    lg: "h-18 w-18 min-w-18",
  };

  const iconSizes = {
    sm: 18,
    md: 26,
    lg: 34,
  };

  const renderIcon = () => {
    const s = iconSizes[size] || 26;
    const baseIconClass =
      "text-[#089587] transition-all duration-300 group-hover:scale-105 group-hover:brightness-110";

    switch (type) {
      case "dev":
      case "build":
        return (
          <svg
            width={s}
            height={s}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={baseIconClass}
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
            <line x1="10" y1="19" x2="14" y2="5" stroke="#C5A880" strokeWidth="1.8" />
          </svg>
        );

      case "marketing":
      case "grow":
        return (
          <svg
            width={s}
            height={s}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={baseIconClass}
          >
            <path d="M3 20h18" />
            <path d="M3 16l6-6 4 4 8-8" />
            <polygon points="17 6 21 6 21 10" fill="#089587" fillOpacity="0.25" />
            <circle cx="21" cy="6" r="2.5" fill="#C5A880" stroke="#089587" strokeWidth="1" />
          </svg>
        );

      case "automation":
      case "automate":
        return (
          <svg
            width={s}
            height={s}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={baseIconClass}
          >
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <circle cx="6.5" cy="17.5" r="3.5" stroke="#C5A880" strokeWidth="1.6" />
            <path d="M10 6.5h4" strokeDasharray="2 1" />
            <path d="M17.5 10v4" strokeDasharray="2 1" />
            <path d="M10 17.5H14" />
          </svg>
        );

      case "process-1":
      case "diagnostic":
        return (
          <svg
            width={s}
            height={s}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={baseIconClass}
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
            <circle cx="12" cy="12" r="2" fill="#C5A880" />
          </svg>
        );

      case "process-2":
      case "architecture":
        return (
          <svg
            width={s}
            height={s}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={baseIconClass}
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        );

      case "process-3":
      case "sprint":
        return (
          <svg
            width={s}
            height={s}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={baseIconClass}
          >
            <polygon
              points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
              fill="#089587"
              fillOpacity="0.25"
            />
          </svg>
        );

      case "process-4":
      case "scale":
        return (
          <svg
            width={s}
            height={s}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={baseIconClass}
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        );

      case "morocco-seal":
        return (
          <svg
            width={s}
            height={s}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={baseIconClass}
          >
            <rect x="4" y="4" width="16" height="16" transform="rotate(45 12 12)" stroke="#C5A880" />
            <rect x="4" y="4" width="16" height="16" />
            <circle cx="12" cy="12" r="2.5" fill="#089587" />
          </svg>
        );

      default:
        return (
          <svg
            width={s}
            height={s}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className={baseIconClass}
          >
            <circle cx="12" cy="12" r="10" />
            <polygon points="12 8 16 12 12 16 8 12 12 8" />
          </svg>
        );
    }
  };

  return (
    <div
      className={clsx(
        "relative flex shrink-0 items-center justify-center transition-all duration-500",
        sizeMap[size] || sizeMap.md,
        className
      )}
    >
      {/* Outer Faceted Geometric Frame — Preserves luxury surface and icon colors on hover */}
      <div
        className={clsx(
          "absolute inset-0 rounded-[4px] border transition-all duration-500",
          glow
            ? "border-[#089587]/40 bg-surface/90 shadow-[0_4px_16px_rgba(8,149,135,0.14)] group-hover:border-[#089587] group-hover:bg-surface group-hover:shadow-[0_8px_24px_rgba(8,149,135,0.25)]"
            : "border-line bg-page/80 group-hover:border-[#089587]/60 group-hover:bg-page"
        )}
      />

      {/* Subtle secondary geometric rotated square accent */}
      <div
        className="pointer-events-none absolute inset-1 rotate-45 rounded-[2px] border border-[#089587]/25 opacity-40 transition-all duration-500 group-hover:rotate-90 group-hover:border-[#089587]/50 group-hover:opacity-75"
        aria-hidden="true"
      />

      {/* Center Icon Symbol (Retains rich emerald & gold colors, never turns white) */}
      <div className="relative z-10 flex items-center justify-center">
        {renderIcon()}
      </div>
    </div>
  );
}
