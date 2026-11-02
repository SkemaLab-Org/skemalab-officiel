"use client";

import { useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import PageTransition from "@/components/PageTransition";
import { CalendlyProvider } from "@/components/CalendlyProvider";
import { useI18n } from "@/components/I18nProvider";

/**
 * Persistent site chrome. Lives in the root layout so the header and footer
 * never remount between routes; only the page body crossfades.
 */
export default function SiteShell({ children }) {
	const { t } = useI18n();
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 140,
		damping: 30,
		restDelta: 0.001,
	});

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
			return undefined;
		const lamp = document.getElementById("body-lamp");
		if (!lamp) return undefined;

		const onPointerMove = (e) => {
			if (e.pointerType === "touch") return;
			lamp.style.setProperty("--mx", `${e.clientX}px`);
			lamp.style.setProperty("--my", `${e.clientY}px`);
			lamp.dataset.lit = "true";
		};

		const onPointerLeave = () => {
			delete lamp.dataset.lit;
		};

		window.addEventListener("pointermove", onPointerMove, { passive: true });
		document.addEventListener("mouseleave", onPointerLeave);
		return () => {
			window.removeEventListener("pointermove", onPointerMove);
			document.removeEventListener("mouseleave", onPointerLeave);
		};
	}, []);

	return (
		<CalendlyProvider>
			<div id="top" className="flex min-h-svh flex-col">
				<div id="body-lamp" aria-hidden="true" className="body-lamp" />
				<motion.div
					id="rail"
					aria-hidden="true"
					className="fixed top-0 left-0 right-0 h-[2px] z-[95] origin-left bg-accent pointer-events-none"
					style={{ scaleX }}
				/>
				<a
					href="#main"
					className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-on-brand"
				>
					{t.common.skipToContent}
				</a>
				<Navbar />
				<main id="main" className="flex-1">
					<PageTransition>{children}</PageTransition>
				</main>
				<Footer />
				<aside aria-label={t.common.contactShortcut || "Contact rapide"}>
					<WhatsAppFloat />
				</aside>
			</div>
		</CalendlyProvider>
	);
}
