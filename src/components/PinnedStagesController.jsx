"use client";

import { useEffect } from "react";

/**
 * PinnedStagesController
 *
 * Drives the pinned sticky stage scroll animations exactly as in Kilnwave.
 * Runs a single rAF-throttled scroll listener that calculates normalized progress
 * (0.0 to 1.0) for each stage via getBoundingClientRect() and writes `--p` to the element
 * and `--page-progress` to the document root.
 */
export default function PinnedStagesController() {
	useEffect(() => {
		const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (RM) return undefined;

		const root = document.documentElement;

		function clamp01(v) {
			return v < 0 ? 0 : v > 1 ? 1 : v;
		}

		function stageP(el) {
			if (!el) return 0;
			const r = el.getBoundingClientRect();
			const travel = Math.max(1, r.height - window.innerHeight);
			return clamp01(-r.top / travel);
		}

		let ticking = false;

		function sync() {
			const scrollY = window.scrollY || window.pageYOffset;
			const scrollHeight = Math.max(1, root.scrollHeight - window.innerHeight);
			root.style.setProperty(
				"--page-progress",
				(scrollY / scrollHeight).toFixed(5),
			);

			const heroEl = document.getElementById("hero");
			if (heroEl) {
				heroEl.style.setProperty("--p", stageP(heroEl).toFixed(4));
			}

			const engEl = document.getElementById("engine");
			if (engEl) {
				engEl.style.setProperty("--p", stageP(engEl).toFixed(4));
			}
			const fieldEl = document.getElementById("field");
			if (fieldEl) {
				fieldEl.style.setProperty("--p", stageP(fieldEl).toFixed(4));
			}

			const claimEl = document.getElementById("claim");
			if (claimEl) {
				claimEl.style.setProperty("--p", stageP(claimEl).toFixed(4));
			}

			const servicesEl = document.getElementById("services-stage");
			if (servicesEl) {
				servicesEl.style.setProperty("--p", stageP(servicesEl).toFixed(4));
			}
		}

		function onScroll() {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				sync();
				ticking = false;
			});
		}

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		sync();

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);

	return null;
}
