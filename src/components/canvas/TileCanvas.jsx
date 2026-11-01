"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "@/components/ThemeProvider";

/**
 * One small canvas per service tile. Each variant animates the same idea the
 * exercise names: a ring being built, a wave being grown, blocks settling into
 * order. All three share the loop, DPR and visibility rules below.
 */

const DPR_CAP = 2;
const STATIC_TIME = 2.4;

function readAccent() {
  if (typeof window === "undefined") return "#3ad9bf";
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent")
    .trim();
  return value || "#3ad9bf";
}

function drawRing(ctx, w, h, t) {
  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w * 0.3, h * 0.4);

  ctx.strokeStyle = "currentColor";
  ctx.globalAlpha = 0.18;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  const sweep = Math.PI * 1.15;
  const start = t * 0.9;
  ctx.globalAlpha = 0.9;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy, radius, start, start + sweep);
  ctx.stroke();

  ctx.globalAlpha = 0.55;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.42, start + Math.PI, start + Math.PI * 2.6);
  ctx.stroke();

  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, 1.8, 0, Math.PI * 2);
  ctx.fill();
}

function drawWave(ctx, w, h, t) {
  const cy = h / 2;
  const step = Math.max(1.5, w / 160);

  for (let row = 0; row < 2; row += 1) {
    ctx.globalAlpha = row === 0 ? 0.95 : 0.4;
    ctx.lineWidth = row === 0 ? 1.8 : 1;
    ctx.lineCap = "round";
    ctx.beginPath();

    for (let x = 0; x <= w; x += step) {
      const p = x / w;
      const envelope = Math.sin(Math.PI * p);
      const amp = h * 0.26 * envelope;
      const y =
        cy +
        Math.sin(p * Math.PI * 4 - t * 1.6 + row * 0.9) * amp +
        (row === 0 ? 0 : 3);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.stroke();
  }

  ctx.globalAlpha = 1;
}

function drawBlocks(ctx, w, h, t) {
  const columns = 7;
  const rows = 2;
  const size = Math.min(w / (columns * 1.9), h / (rows * 2.4));
  const gapX = size * 0.9;
  const gapY = size * 1.1;
  const totalW = columns * size + (columns - 1) * gapX;
  const totalH = rows * size + (rows - 1) * gapY;
  const startX = (w - totalW) / 2;
  const startY = (h - totalH) / 2;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const phase = column * 0.55 + row * Math.PI;
      const wave = (Math.sin(t * 1.5 - phase) + 1) / 2;
      ctx.globalAlpha = 0.14 + wave * 0.7;
      ctx.fillRect(
        startX + column * (size + gapX),
        startY + row * (size + gapY),
        size,
        size,
      );
    }
  }

  ctx.globalAlpha = 1;
}

const DRAWERS = {
  dev: drawRing,
  marketing: drawWave,
  automation: drawBlocks,
};

export default function TileCanvas({ variant, className = "" }) {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const draw = DRAWERS[variant] || drawWave;
    let raf = 0;
    let elapsed = STATIC_TIME;
    let last = 0;
    let inView = true;
    let mounted = true;
    let width = 1;
    let height = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // The tint comes from the theme token so it follows the family.
      ctx.strokeStyle = readAccent();
      ctx.fillStyle = ctx.strokeStyle;
      ctx.clearRect(0, 0, width, height);
      draw(ctx, width, height, elapsed);
    };

    const shouldRun = () => mounted && inView && !document.hidden && !reduce;

    const tick = (now) => {
      raf = 0;
      if (!shouldRun()) return;
      if (last) elapsed += Math.min((now - last) / 1000, 0.1);
      last = now;
      ctx.clearRect(0, 0, width, height);
      draw(ctx, width, height, elapsed);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf || !shouldRun()) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    };

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(resize)
        : null;
    if (observer) observer.observe(canvas);

    const intersection =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              inView = entries.some((entry) => entry.isIntersecting);
              if (inView) start();
              else stop();
            },
            { threshold: 0 },
          )
        : null;
    if (intersection) intersection.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    resize();

    if (reduce) draw(ctx, width, height, STATIC_TIME);
    else start();

    return () => {
      mounted = false;
      stop();
      observer?.disconnect();
      intersection?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [variant, theme, reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-[74px] w-full ${className}`}
    />
  );
}
