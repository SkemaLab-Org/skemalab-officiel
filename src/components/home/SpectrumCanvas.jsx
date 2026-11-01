"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export const BAR_COUNT = 72;
export const STATIC_CENTER = 50;
const GOLD = "#c5a880";

const FALLBACK = {
  accent: "#3ad9bf",
  brand: "#17a08c",
  muted: "#a2b8b1",
  line: "rgba(242,237,226,0.12)",
};

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

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
  };
}

/* Deterministic signal field: the same index always reads the same height so
   the selected channel keeps a stable silhouette while the field breathes. */
function barHeight(index, time, center) {
  const a = Math.abs(Math.sin(index * 0.31 + time * 0.65));
  const b = Math.abs(Math.sin(index * 0.09 - time * 0.42 + 1.4));
  const c = Math.abs(Math.sin(index * 0.73 + time * 1.1));
  const lift = Math.max(0, 1 - Math.abs(index - center) / 6);
  const base = 0.16 + a * 0.32 + b * 0.26 + c * 0.08;
  return clamp(base * (1 + lift * 0.4) + lift * 0.1, 0.08, 0.99);
}

function draw(ctx, width, height, time, palette, reduce, rawCenter) {
  const padX = Math.max(8, width * 0.012);
  const padTop = Math.max(16, height * 0.16);
  const padBottom = Math.max(20, height * 0.13);
  const baseline = height - padBottom;
  const usableH = Math.max(1, baseline - padTop);
  const step = (width - padX * 2) / BAR_COUNT;
  const barW = Math.max(1.6, step * 0.5);
  const t = reduce ? 0.8 : time;
  const center = clamp(rawCenter, 0, BAR_COUNT - 1);

  const nearest = Math.round(center);
  const bandStart = clamp(nearest - 4, 0, BAR_COUNT - 1);
  const bandEnd = clamp(nearest + 4, 0, BAR_COUNT - 1);
  const activeX = padX + bandStart * step;
  const activeW = (bandEnd - bandStart + 1) * step;
  const activeY = padTop - Math.max(8, height * 0.06);

  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.55;
  ctx.strokeStyle = palette.line;

  [0.25, 0.5, 0.75, 1].forEach((ratio) => {
    const y = baseline - usableH * ratio;
    ctx.beginPath();
    ctx.moveTo(padX, y);
    ctx.lineTo(width - padX, y);
    ctx.stroke();
  });

  ctx.globalAlpha = 0.07;
  ctx.fillStyle = palette.accent;
  ctx.fillRect(activeX, activeY, activeW, baseline - activeY);

  for (let index = 0; index < BAR_COUNT; index += 1) {
    const local = 1 - Math.min(1, Math.abs(index - center) / 5.5);
    const isActive = local > 0;
    const value = barHeight(index, t, center);
    const x = padX + index * step + (step - barW) / 2;
    const barH = value * usableH;
    const y = baseline - barH;

    ctx.globalAlpha = isActive ? 0.55 + local * 0.4 : 0.34 + value * 0.22;
    ctx.fillStyle = isActive
      ? palette.accent
      : index % 6 === 0
        ? palette.brand
        : palette.muted;
    ctx.fillRect(x, y, barW, barH);

    if (isActive) {
      ctx.globalAlpha = 0.28 * local;
      ctx.fillRect(x, y, barW, Math.max(2, barH * 0.16));
    }
  }

  ctx.globalAlpha = 0.9;
  ctx.strokeStyle = palette.accent;
  ctx.strokeRect(
    activeX + 0.5,
    activeY + 0.5,
    activeW - 1,
    baseline - activeY - 1,
  );

  ctx.globalAlpha = 0.65;
  ctx.beginPath();
  ctx.moveTo(activeX, activeY - 6);
  ctx.lineTo(activeX, activeY);
  ctx.lineTo(activeX + 8, activeY - 6);
  ctx.stroke();

  ctx.globalAlpha = 0.9;
  ctx.fillStyle = GOLD;
  ctx.fillRect(activeX + activeW - 4, activeY - 4, 4, 4);

  const scanX = padX + center * step + step / 2;
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = palette.accent;
  ctx.beginPath();
  ctx.moveTo(scanX, padTop - 4);
  ctx.lineTo(scanX, baseline);
  ctx.stroke();

  ctx.globalAlpha = 0.9;
  ctx.fillStyle = palette.accent;
  ctx.beginPath();
  ctx.arc(scanX, padTop - 8, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.9;
  ctx.strokeStyle = palette.line;
  ctx.beginPath();
  ctx.moveTo(padX, baseline + 0.5);
  ctx.lineTo(width - padX, baseline + 0.5);
  ctx.stroke();
}

export default function SpectrumCanvas({ center = null, className = "" }) {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let palette = readPalette(canvas);
    let width = 1;
    let height = 1;
    let raf = null;
    let visible = true;
    let last = 0;
    const started = performance.now();

    const activeCenter = () => {
      if (!center) return STATIC_CENTER;
      const value = center.get();
      return Number.isFinite(value) ? value : STATIC_CENTER;
    };

    const render = (now) => {
      ctx.clearRect(0, 0, width, height);
      draw(
        ctx,
        width,
        height,
        reduce ? 0 : (now - started) / 1000,
        palette,
        reduce,
        activeCenter(),
      );
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render(performance.now());
    };

    const frame = (now) => {
      raf = null;
      if (!visible || document.hidden) {
        raf = requestAnimationFrame(frame);
        return;
      }
      if (now - last < 40) {
        raf = requestAnimationFrame(frame);
        return;
      }
      last = now;
      render(now);
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

    const themeObserver = new MutationObserver(() => {
      palette = readPalette(canvas);
      if (reduce) render(performance.now());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    const onVisibility = () => {
      if (document.hidden) stop();
      else begin();
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
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
  }, [center, reduce]);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className={className} />
  );
}
