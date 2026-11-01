"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const FALLBACK = {
  accent: "#3ad9bf",
  brand: "#17a08c",
  muted: "#a2b8b1",
  line: "rgba(242,237,226,0.12)",
  gold: "#c5a880",
};

function readPalette(element) {
  if (typeof window === "undefined") return FALLBACK;
  const styles = window.getComputedStyle(element);
  const read = (name, fallback) =>
    styles.getPropertyValue(name).trim() || fallback;

  return {
    accent: read("--accent", FALLBACK.accent),
    brand: read("--brand", FALLBACK.brand),
    muted: read("--muted", FALLBACK.muted),
    line: read("--line", FALLBACK.line),
    gold: FALLBACK.gold,
  };
}

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function drawBuild(ctx, w, h, time, palette, reduce) {
  const pad = Math.max(16, Math.min(w, h) * 0.11);
  const cols = 4;
  const rows = 3;
  const cellW = (w - pad * 2) / cols;
  const cellH = (h - pad * 2) / rows;
  const cycle = reduce ? 0.86 : (time * 0.16) % 1;
  const scanX = pad + cycle * (w - pad * 2);

  ctx.lineWidth = 1;
  ctx.strokeStyle = palette.line;
  ctx.globalAlpha = 0.9;

  for (let col = 1; col < cols; col += 1) {
    const x = pad + col * cellW;
    ctx.beginPath();
    ctx.moveTo(x, pad);
    ctx.lineTo(x, h - pad);
    ctx.stroke();
  }
  for (let row = 1; row < rows; row += 1) {
    const y = pad + row * cellH;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(w - pad, y);
    ctx.stroke();
  }

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const index = row * cols + col;
      const threshold = (col / cols) * 0.55 + (row / rows) * 0.45;
      const reveal = reduce ? 1 : clamp(cycle * 1.65 - threshold, 0, 1);
      const x = pad + col * cellW + 5;
      const y = pad + row * cellH + 5;
      const boxW = cellW - 10;
      const boxH = cellH - 10;

      ctx.globalAlpha = 0.08 + reveal * 0.22;
      ctx.strokeStyle = palette.muted;
      ctx.strokeRect(x, y, boxW, boxH);

      if (reveal > 0.4) {
        ctx.globalAlpha = (reveal - 0.4) * 0.5;
        ctx.fillStyle = index === 6 ? palette.brand : palette.muted;
        ctx.fillRect(
          x + boxW * 0.16,
          y + boxH * 0.62,
          boxW * 0.68 * reveal,
          Math.max(2, boxH * 0.07),
        );
      }

      if (index === 6) {
        ctx.globalAlpha = 0.55 + Math.sin(time * 1.4) * 0.15;
        ctx.strokeStyle = palette.accent;
        ctx.strokeRect(x - 2, y - 2, boxW + 4, boxH + 4);
      }
    }
  }

  ctx.globalAlpha = 0.45;
  ctx.strokeStyle = palette.accent;
  ctx.beginPath();
  ctx.moveTo(scanX, pad);
  ctx.lineTo(scanX, h - pad);
  ctx.stroke();

  ctx.globalAlpha = 0.6;
  ctx.fillStyle = palette.accent;
  ctx.beginPath();
  ctx.arc(scanX, pad + (h - pad * 2) * 0.5, 2.2, 0, Math.PI * 2);
  ctx.fill();
}

function drawGrow(ctx, w, h, time, palette, reduce) {
  const pad = Math.max(18, Math.min(w, h) * 0.12);
  const baseline = h - pad;
  const usableH = h - pad * 2;
  const points = 28;

  ctx.lineWidth = 1;
  ctx.strokeStyle = palette.line;
  ctx.globalAlpha = 0.9;
  for (let i = 1; i <= 3; i += 1) {
    const y = pad + (usableH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(w - pad, y);
    ctx.stroke();
  }

  const coords = [];
  for (let i = 0; i < points; i += 1) {
    const x = pad + (i / (points - 1)) * (w - pad * 2);
    const progress = i / (points - 1);
    const lift =
      0.16 +
      progress * 0.68 +
      Math.sin(i * 0.62 + time * 0.9) * 0.035 +
      Math.sin(i * 1.7 - time * 0.4) * 0.018;
    const y = baseline - clamp(lift, 0.08, 0.95) * usableH;
    coords.push([x, y]);

    ctx.globalAlpha = 0.1 + progress * 0.16;
    ctx.fillStyle = palette.brand;
    const barW = Math.max(2, (w - pad * 2) / points / 2.4);
    ctx.fillRect(x - barW / 2, y, barW, baseline - y);
  }

  ctx.globalAlpha = 0.075;
  ctx.fillStyle = palette.accent;
  ctx.beginPath();
  ctx.moveTo(coords[0][0], baseline);
  coords.forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.lineTo(coords[coords.length - 1][0], baseline);
  ctx.closePath();
  ctx.fill();

  ctx.globalAlpha = 0.92;
  ctx.strokeStyle = palette.accent;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  coords.forEach(([x, y], index) => {
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  const pulse = reduce ? 0.92 : (time * 0.24) % 1;
  const pulseIndex = Math.min(
    points - 1,
    Math.max(0, Math.round(pulse * (points - 1))),
  );
  const [px, py] = coords[pulseIndex];

  ctx.globalAlpha = 0.16;
  ctx.fillStyle = palette.accent;
  ctx.beginPath();
  ctx.arc(px, py, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.fillStyle = palette.accent;
  ctx.beginPath();
  ctx.arc(px, py, 3.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.55;
  ctx.strokeStyle = palette.gold;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(px, py, 6.5, 0, Math.PI * 2);
  ctx.stroke();

  ctx.globalAlpha = 0.9;
  ctx.strokeStyle = palette.line;
  ctx.beginPath();
  ctx.moveTo(pad, baseline);
  ctx.lineTo(w - pad, baseline);
  ctx.stroke();
}

function drawAutomate(ctx, w, h, time, palette, reduce) {
  const pad = Math.max(18, Math.min(w, h) * 0.12);
  const nodes = [
    [0.18, 0.28],
    [0.18, 0.72],
    [0.5, 0.5],
    [0.82, 0.26],
    [0.82, 0.74],
  ].map(([x, y]) => [pad + x * (w - pad * 2), pad + y * (h - pad * 2)]);

  const edges = [
    [0, 2],
    [1, 2],
    [2, 3],
    [2, 4],
    [0, 1],
  ];

  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.55;
  ctx.strokeStyle = palette.line;
  edges.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a][0], nodes[a][1]);
    ctx.lineTo(nodes[b][0], nodes[b][1]);
    ctx.stroke();
  });

  edges.forEach(([a, b], index) => {
    const [x1, y1] = nodes[a];
    const [x2, y2] = nodes[b];
    const progress = reduce ? 0.5 : (time * 0.36 + index * 0.21) % 1;
    const px = x1 + (x2 - x1) * progress;
    const py = y1 + (y2 - y1) * progress;

    ctx.globalAlpha = 0.18;
    ctx.fillStyle = palette.accent;
    ctx.beginPath();
    ctx.arc(px, py, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 0.95;
    ctx.beginPath();
    ctx.arc(px, py, 2.2, 0, Math.PI * 2);
    ctx.fill();
  });

  nodes.forEach(([x, y], index) => {
    const active = index === 2;
    ctx.globalAlpha = active ? 0.95 : 0.6;
    ctx.strokeStyle = active ? palette.accent : palette.muted;
    ctx.lineWidth = active ? 1.6 : 1;
    ctx.beginPath();
    ctx.arc(x, y, active ? 8 : 5.5, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = 0.18;
    ctx.fillStyle = active ? palette.accent : palette.muted;
    ctx.beginPath();
    ctx.arc(x, y, active ? 8 : 5.5, 0, Math.PI * 2);
    ctx.fill();
  });

  const pulse = reduce ? 0.5 : 0.5 + Math.sin(time * 1.6) * 0.5;
  ctx.globalAlpha = 0.35 + pulse * 0.35;
  ctx.strokeStyle = palette.accent;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(nodes[2][0], nodes[2][1], 14 + pulse * 4, 0, Math.PI * 2);
  ctx.stroke();
}

function drawMeasure(ctx, w, h, time, palette, reduce) {
  const cx = w * 0.5;
  const cy = h * 0.5;
  const base = Math.min(w, h) * 0.34;
  const rotation = reduce ? 0.8 : time * 0.32;

  ctx.lineWidth = 1;

  for (let i = 0; i < 24; i += 1) {
    const angle = (i / 24) * Math.PI * 2 + rotation * 0.18;
    const inner = base * 1.14;
    const outer = base * (i % 6 === 0 ? 1.26 : 1.2);
    ctx.globalAlpha = i % 6 === 0 ? 0.55 : 0.22;
    ctx.strokeStyle = i % 6 === 0 ? palette.accent : palette.muted;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
    ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
    ctx.stroke();
  }

  [0.48, 0.72, 0.98].forEach((scale, index) => {
    ctx.globalAlpha = 0.14;
    ctx.strokeStyle = palette.line;
    ctx.beginPath();
    ctx.arc(cx, cy, base * scale, 0, Math.PI * 2);
    ctx.stroke();

    const start = rotation + index * 1.1;
    const sweep = Math.PI * (0.42 + index * 0.13);
    ctx.globalAlpha = index === 2 ? 0.9 : 0.42;
    ctx.strokeStyle = index === 2 ? palette.accent : palette.brand;
    ctx.lineWidth = index === 2 ? 2 : 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, base * scale, start, start + sweep);
    ctx.stroke();
  });

  const hand = rotation * 1.4;
  ctx.globalAlpha = 0.32;
  ctx.strokeStyle = palette.gold;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(hand) * base * 1.02, cy + Math.sin(hand) * base * 1.02);
  ctx.stroke();

  ctx.globalAlpha = 0.18;
  ctx.fillStyle = palette.accent;
  ctx.beginPath();
  ctx.arc(cx, cy, 11, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.fillStyle = palette.accent;
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fill();
}

const DRAWERS = {
  build: drawBuild,
  grow: drawGrow,
  automate: drawAutomate,
  measure: drawMeasure,
};

export default function EngineCanvas({ mode = "build", className = "" }) {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const draw = DRAWERS[mode] || drawBuild;
    let palette = readPalette(canvas);
    let width = 1;
    let height = 1;
    let dpr = 1;
    let raf = null;
    let visible = true;
    let last = 0;
    const started = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      draw(ctx, width, height, reduce ? 0.6 : (performance.now() - started) / 1000, palette, reduce);
    };

    const frame = (now) => {
      raf = null;
      if (!visible || document.hidden) {
        raf = requestAnimationFrame(frame);
        return;
      }
      if (now - last < 32) {
        raf = requestAnimationFrame(frame);
        return;
      }
      last = now;
      ctx.clearRect(0, 0, width, height);
      draw(ctx, width, height, (now - started) / 1000, palette, reduce);
      raf = requestAnimationFrame(frame);
    };

    const begin = () => {
      if (reduce || raf) return;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) begin();
        else stop();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else begin();
    };

    const themeObserver = new MutationObserver(() => {
      palette = readPalette(canvas);
      if (reduce) resize();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(resize)
      : null;
    resizeObserver?.observe(canvas);

    document.addEventListener("visibilitychange", onVisibility);
    resize();
    begin();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver?.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [mode, reduce]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
