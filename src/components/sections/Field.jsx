"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useI18n } from "@/components/I18nProvider";
import { useTheme } from "@/components/ThemeProvider";

/**
 * Stage 3 · Field (Spectrum Sweep Stage)
 * Pinned sticky stage (340svh with sticky pin 100svh)
 * 84 frequency bars sweeping dynamically with scroll travel.
 */
export default function Field() {
	const { t } = useI18n();
	const { theme } = useTheme();
	const reduce = useReducedMotion();
	const isDark = theme !== "light";
	const canvasRef = useRef(null);

	const [liveHz, setLiveHz] = useState("840 Hz");
	const [liveTag, setLiveTag] = useState("Session 0442 · résonance active");

	const title = t.fieldSection?.title || "Le signal est l'interface.";
	const subtitle =
		t.fieldSection?.subtitle ||
		"Activez un levier, le reste de votre système continue d'opérer sans friction.";
	const tagPrefix = t.fieldSection?.tagPrefix || "Session 0442 · analyse de";

	useEffect(() => {
		const sc = canvasRef.current;
		if (!sc) return undefined;
		const sctx = sc.getContext("2d");
		if (!sctx) return undefined;

		let raf = 0;
		let mounted = true;
		const stageEl = document.getElementById("field");

		function fit(c) {
			const d = Math.min(window.devicePixelRatio || 1, 2);
			const r = c.getBoundingClientRect();
			c.width = Math.max(1, Math.round(r.width * d));
			c.height = Math.max(1, Math.round(r.height * d));
			return d;
		}

		let sd = fit(sc);
		const onResize = () => {
			sd = fit(sc);
		};
		window.addEventListener("resize", onResize, { passive: true });

		let start = 0;

		function sdraw(now) {
			if (!mounted) return;
			if (!start) start = now;
			const t = (now - start) * 0.001;

			// Calculate progress directly from DOM geometry
			let fieldP = 0.25;
			if (stageEl) {
				const r = stageEl.getBoundingClientRect();
				const travel = Math.max(1, r.height - window.innerHeight);
				fieldP = Math.max(0, Math.min(1, -r.top / travel));
			}

			const w = sc.width;
			const h = sc.height;
			const BARS = 84;
			const bw = w / BARS;
			sctx.clearRect(0, 0, w, h);

			const lo = 0.04 + fieldP * 0.62;
			const hi = lo + 0.24;

			for (let i = 0; i < BARS; i += 1) {
				const u = i / BARS;
				const env = Math.sin(u * Math.PI);
				const a =
					Math.abs(Math.sin(u * 9 + t * 1.15)) * 0.55 +
					Math.abs(Math.sin(u * 23 - t * 0.7)) * 0.3;
				const hot = u > lo && u < hi;
				let v = hot
					? 0.3 + a * 0.52 + Math.abs(Math.sin(t * 1.7 + u * 15)) * 0.2
					: Math.max(0.04, a * env * 0.86);
				if (v > 0.97) v = 0.97;

				const hotColor = isDark
					? "rgba(58, 217, 191, 0.95)"
					: "rgba(10, 107, 94, 0.95)";
				const idleColor = isDark
					? "rgba(255, 255, 255, 0.16)"
					: "rgba(8, 28, 23, 0.14)";
				sctx.fillStyle = hot ? hotColor : idleColor;
				sctx.fillRect(
					i * bw + bw * 0.22,
					h - v * h * 0.86,
					bw * 0.56,
					v * h * 0.86,
				);
			}

			// Selection bounding box
			sctx.strokeStyle = isDark
				? "rgba(58, 217, 191, 0.45)"
				: "rgba(10, 107, 94, 0.5)";
			sctx.lineWidth = Math.max(1, sd);
			sctx.strokeRect(lo * w, 0, (hi - lo) * w, h);

			const loHz = Math.round(60 + lo * 15000);
			const hiHz = Math.round(60 + hi * 15000);
			setLiveHz(`${loHz} Hz`);
			setLiveTag(`${tagPrefix} ${loHz} à ${hiHz} Hz`);

			if (!reduce) {
				raf = requestAnimationFrame(sdraw);
			}
		}

		raf = requestAnimationFrame(sdraw);

		return () => {
			mounted = false;
			if (raf) cancelAnimationFrame(raf);
			window.removeEventListener("resize", onResize);
		};
	}, [reduce, tagPrefix, isDark]);

	return (
		<section className="stage" id="field">
			<div className="pin">
				<div className="field-in">
					<div className="field-head">
						<h2 className="font-display font-light text-fg">{title}</h2>
						<span className="label-mono text-muted">{subtitle}</span>
					</div>
					<div className="strip">
						<canvas ref={canvasRef} id="spectrum" aria-hidden="true" />
						<span className="strip-tag" id="stripTag">
							{liveTag}
						</span>
						<span className="strip-read" id="readout">
							{liveHz}
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
