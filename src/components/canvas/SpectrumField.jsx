"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "@/components/ThemeProvider";

/**
 * The signature panel: a generated spectrum where one contiguous run is
 * selected. Non-selected bars sit at low foreground alpha so the accent band
 * and its marker are the only saturated thing on the page.
 */

const BAR_COUNT = 72;
const DPR_CAP = 2;
const STATIC_TIME = 5.2;

function readColors() {
	if (typeof window === "undefined") {
		return { fg: "#f2ede2", accent: "#3ad9bf" };
	}
	const styles = getComputedStyle(document.documentElement);
	return {
		fg: styles.getPropertyValue("--fg").trim() || "#f2ede2",
		accent: styles.getPropertyValue("--accent").trim() || "#3ad9bf",
	};
}

export default function SpectrumField({ caption, readout, scrollProgress }) {
	const canvasRef = useRef(null);
	const { theme } = useTheme();
	const reduce = useReducedMotion();
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return undefined;
		const ctx = canvas.getContext("2d");
		if (!ctx) return undefined;

		let raf = 0;
		let elapsed = STATIC_TIME;
		let last = 0;
		let inView = true;
		let mounted = true;
		let width = 1;
		let height = 1;
		let colors = readColors();
		let currentProgress = 0.25;

		const draw = (time) => {
			ctx.clearRect(0, 0, width, height);
			if (!width || !height) return;

			const gap = Math.max(2, width / BAR_COUNT / 1.9);
			const barWidth = (width - gap * (BAR_COUNT - 1)) / BAR_COUNT;
			const lo = 0.04 + currentProgress * 0.62;
			const hi = lo + 0.24;
			const startIndex = Math.round(lo * BAR_COUNT);
			const endIndex = Math.round(hi * BAR_COUNT);
			const top = 10;
			// Leave a strip at the bottom for the mono caption pair, so the bars
			// never sit behind readable text.
			const bottomInset = 46;
			const baseline = height - bottomInset;
			const usable = Math.max(12, baseline - top);

			for (let i = 0; i < BAR_COUNT; i += 1) {
				const p = i / (BAR_COUNT - 1);
				const envelope = Math.sin(Math.PI * p);
				const selected = i >= startIndex && i < endIndex;
				const hot = selected;
				const a =
					Math.abs(Math.sin(p * 9 + time * 1.15)) * 0.55 +
					Math.abs(Math.sin(p * 23 - time * 0.7)) * 0.3;
				let v = hot
					? 0.3 + a * 0.52 + Math.abs(Math.sin(time * 1.7 + p * 15)) * 0.2
					: Math.max(0.04, a * envelope * 0.86);
				if (v > 0.97) v = 0.97;
				const barHeight = usable * v;
				const x = i * (barWidth + gap);
				const y = baseline - barHeight;

				ctx.globalAlpha = hot ? 0.95 : 0.16;
				ctx.fillStyle = hot ? colors.accent : colors.fg;
				ctx.fillRect(x, y, barWidth, barHeight);
			}

			// Marker box sweeping over selected frequency band
			ctx.globalAlpha = 0.55;
			ctx.strokeStyle = colors.accent;
			ctx.lineWidth = 1;
			const markerX = startIndex * (barWidth + gap) - 4;
			const markerW = (endIndex - startIndex) * (barWidth + gap) + 4;
			ctx.strokeRect(markerX, top - 2, markerW, usable + 4);
			ctx.globalAlpha = 1;
		};

		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			width = Math.max(1, Math.round(rect.width));
			height = Math.max(1, Math.round(rect.height));
			const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			colors = readColors();
			draw(elapsed);
		};

		const shouldRun = () => mounted && inView && !document.hidden && !reduce;

		const tick = (now) => {
			raf = 0;
			if (!shouldRun()) return;
			if (last) elapsed += Math.min((now - last) / 1000, 0.1);
			last = now;
			draw(elapsed);
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
			typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
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
		let unsubScroll = () => {};
		if (scrollProgress) {
			const updateProgress = (latest) => {
				currentProgress = Math.max(
					0,
					Math.min(1, typeof latest === "number" ? latest : 0),
				);
				if (shouldRun()) draw(elapsed);
			};
			if (typeof scrollProgress.on === "function") {
				unsubScroll = scrollProgress.on("change", updateProgress);
			} else if (typeof scrollProgress.onChange === "function") {
				unsubScroll = scrollProgress.onChange(updateProgress);
			}
		}

		resize();

		if (reduce) draw(STATIC_TIME);
		else start();

		return () => {
			mounted = false;
			stop();
			observer?.disconnect();
			intersection?.disconnect();
			unsubScroll();
			document.removeEventListener("visibilitychange", onVisibility);
		};
	}, [theme, reduce, scrollProgress]);

	return (
		<figure className="relative m-0 border border-line bg-page">
			<div className="h-[clamp(200px,32vw,340px)] w-full">
				<canvas
					ref={canvasRef}
					aria-hidden="true"
					className="block size-full"
				/>
			</div>
			<figcaption className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 sm:inset-x-6 sm:bottom-5">
				<span className="label-mono text-muted">{caption}</span>
				<span className="label-mono text-accent">{readout}</span>
			</figcaption>
		</figure>
	);
}
