"use client";

import { useId } from "react";

function safeId(id) {
  return id.replace(/:/g, "");
}

/**
 * Moroccan Zellige Seamless Lattice Background Pattern
 * Based on authentic 8-fold Moroccan geometric star tiling (Khatim Al-Sulayman)
 */
export function MoroccanZelligeLattice({
  className = "",
  opacity = 1,
  strokeColor = "currentColor",
  strokeWidth = 1,
  size = 96,
  fadeMask = true,
  idPrefix,
}) {
  const reactId = safeId(useId());
  const patternId = idPrefix
    ? `${idPrefix}-zellige-${size}`
    : `moroccan-zellige-${reactId}`;
  const maskId = idPrefix ? `${idPrefix}-radial-mask` : `radial-mask-${reactId}`;
  const gradientId = idPrefix
    ? `${idPrefix}-radial-gradient`
    : `pattern-radial-mask-${reactId}`;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg className="h-full w-full" width="100%" height="100%">
        <defs>
          <pattern
            id={patternId}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <g
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect
                x={size * 0.25}
                y={size * 0.25}
                width={size * 0.5}
                height={size * 0.5}
              />
              <rect
                x={size * 0.25}
                y={size * 0.25}
                width={size * 0.5}
                height={size * 0.5}
                transform={`rotate(45 ${size * 0.5} ${size * 0.5})`}
              />

              <line x1="0" y1="0" x2={size * 0.25} y2={size * 0.25} />
              <line x1={size} y1="0" x2={size * 0.75} y2={size * 0.25} />
              <line x1="0" y1={size} x2={size * 0.25} y2={size * 0.75} />
              <line x1={size} y1={size} x2={size * 0.75} y2={size * 0.75} />

              <line
                x1={size * 0.5}
                y1="0"
                x2={size * 0.5}
                y2={size * 0.15}
              />
              <line
                x1={size * 0.5}
                y1={size * 0.85}
                x2={size * 0.5}
                y2={size}
              />
              <line
                x1="0"
                y1={size * 0.5}
                x2={size * 0.15}
                y2={size * 0.5}
              />
              <line
                x1={size * 0.85}
                y1={size * 0.5}
                x2={size}
                y2={size * 0.5}
              />

              <polygon
                points={`
                  ${size * 0.5},${size * 0.42}
                  ${size * 0.58},${size * 0.5}
                  ${size * 0.5},${size * 0.58}
                  ${size * 0.42},${size * 0.5}
                `}
                fill={strokeColor}
                fillOpacity="0.12"
              />
            </g>
          </pattern>

          {fadeMask ? (
            <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="60%" stopColor="#fff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.8" />
            </radialGradient>
          ) : null}
        </defs>

        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
          mask={fadeMask ? `url(#${maskId})` : undefined}
        />
        {fadeMask ? (
          <mask id={maskId}>
            <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
          </mask>
        ) : null}
      </svg>
    </div>
  );
}

/**
 * Luxury Architectural Ribbon & Wave Motif (Haut de Gamme)
 * Non-animated flowing harmonic satin ribbon lines in emerald, teal & champagne gold
 */
export function LuxuryRibbonMotif({
  className = "",
  width = 720,
  height = 420,
  opacity = 0.8,
  fill = false,
  idPrefix,
}) {
  const reactId = safeId(useId());
  const prefix = idPrefix || `ribbon-${reactId}`;
  const satinId = `${prefix}-satin-fill`;
  const strokeMainId = `${prefix}-stroke-main`;
  const strokeGoldId = `${prefix}-stroke-gold`;
  const glowId = `${prefix}-glow`;

  return (
    <div
      className={
        fill
          ? `pointer-events-none absolute inset-0 overflow-hidden ${className}`
          : `pointer-events-none inline-block select-none overflow-visible ${className}`
      }
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        width={fill ? "100%" : width}
        height={fill ? "100%" : height}
        viewBox="0 0 720 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio={fill ? "xMaxYMid slice" : "xMidYMid meet"}
        className={fill ? "h-full w-full overflow-visible" : "overflow-visible"}
      >
        <defs>
          <linearGradient
            id={satinId}
            x1="0"
            y1="0"
            x2="720"
            y2="420"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#089587" stopOpacity="0.18" />
            <stop offset="45%" stopColor="#0D655C" stopOpacity="0.1" />
            <stop offset="75%" stopColor="#C5A880" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#089587" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient
            id={strokeMainId}
            x1="50"
            y1="360"
            x2="680"
            y2="60"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#089587" stopOpacity="0.15" />
            <stop offset="30%" stopColor="#089587" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#C5A880" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0D655C" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient
            id={strokeGoldId}
            x1="120"
            y1="390"
            x2="640"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#C5A880" stopOpacity="0.1" />
            <stop offset="40%" stopColor="#C5A880" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#089587" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#089587" stopOpacity="0.15" />
          </linearGradient>

          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#089587" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#0D655C" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#089587" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="380" cy="210" rx="260" ry="140" fill={`url(#${glowId})`} />

        <path
          d="M 40 340 C 180 390, 290 80, 480 150 C 580 185, 640 120, 700 80 L 680 110 C 620 160, 560 215, 460 180 C 270 120, 160 410, 20 360 Z"
          fill={`url(#${satinId})`}
        />

        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M 20 360 C 160 410, 270 120, 460 180 C 560 215, 620 160, 680 110"
            stroke={`url(#${strokeGoldId})`}
            strokeWidth="1.8"
          />
          <path
            d="M 40 340 C 180 390, 290 80, 480 150 C 580 185, 640 120, 700 80"
            stroke={`url(#${strokeMainId})`}
            strokeWidth="2.2"
          />
          <path
            d="M 60 325 C 195 375, 305 70, 495 135 C 595 170, 650 105, 710 65"
            stroke={`url(#${strokeMainId})`}
            strokeWidth="1"
            opacity="0.65"
          />
          <path
            d="M 80 310 C 210 360, 320 60, 510 120 C 610 155, 660 90, 715 50"
            stroke={`url(#${strokeGoldId})`}
            strokeWidth="0.85"
            strokeDasharray="4 3"
            opacity="0.55"
          />
          <path
            d="M 10 375 C 150 425, 255 140, 440 200 C 540 235, 600 180, 660 130"
            stroke={`url(#${strokeMainId})`}
            strokeWidth="1.2"
            opacity="0.5"
          />
          <path
            d="M 5 390 C 140 440, 240 160, 420 220 C 520 255, 580 200, 640 150"
            stroke={`url(#${strokeGoldId})`}
            strokeWidth="0.75"
            opacity="0.35"
          />
          <path
            d="M 180 60 C 280 130, 410 320, 560 270 C 630 245, 670 190, 700 140"
            stroke={`url(#${strokeGoldId})`}
            strokeWidth="1.4"
            opacity="0.6"
          />
          <path
            d="M 195 75 C 295 145, 420 330, 570 280 C 640 255, 680 205, 710 155"
            stroke={`url(#${strokeMainId})`}
            strokeWidth="0.9"
            opacity="0.45"
          />
        </g>

        <g opacity="0.8">
          <circle cx="480" cy="150" r="3" fill="#C5A880" />
          <circle
            cx="480"
            cy="150"
            r="7"
            stroke="#C5A880"
            strokeWidth="0.75"
            opacity="0.5"
          />
          <circle cx="460" cy="180" r="2.5" fill="#089587" />
          <circle cx="290" cy="80" r="2.5" fill="#C5A880" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Moroccan Corner Architectural Ornament
 * Delicate Moorish arch corner flourish for luxury cards
 */
export function MoroccanCornerOrnament({
  className = "",
  size = 28,
  color = "#089587",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M2 38V14C2 7.37258 7.37258 2 14 2H38"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M8 38V16C8 11.5817 11.5817 8 16 8H38"
        stroke={color}
        strokeWidth="0.8"
        strokeDasharray="2 3"
        opacity="0.35"
      />
      <circle cx="14" cy="14" r="2.5" fill={color} opacity="0.9" />
    </svg>
  );
}
