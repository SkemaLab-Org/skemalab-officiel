"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { markIntroSeen } from "@/lib/intro";
import logoDark from "@/assets/logo2.png";

const LINE_IN_MS = 220;
const FLIGHT_START_MS = 1850;
const PANEL_OUT_MS = 2650;
const DONE_MS = 3100;

/**
 * One-line opening stage. Mounted only when the hero decides the intro should
 * run. Rendered through a portal so `position: fixed` resolves against the
 * viewport instead of the transformed `PageTransition` wrapper.
 */
export default function IntroStage({ onDone }) {
	const [lineIn, setLineIn] = useState(false);
	const [flying, setFlying] = useState(false);
	const [panelOut, setPanelOut] = useState(false);
	const [transform, setTransform] = useState(null);
	const logoRef = useRef(null);
	const doneRef = useRef(onDone);

	useEffect(() => {
		doneRef.current = onDone;
	});

	useEffect(() => {
		window.scrollTo(0, 0);
		const previousOverflow = document.body.style.overflow;
		const previousHtmlOverflow = document.documentElement.style.overflow;
		document.body.style.overflow = "hidden";
		document.documentElement.style.overflow = "hidden";
		document.documentElement.dataset.intro = "true";
		window.dispatchEvent(new CustomEvent("skemalab:intro", { detail: true }));
		window.dispatchEvent(
			new CustomEvent("skemalab:scroll-lock", { detail: true }),
		);

		const preventDefault = (e) => e.preventDefault();
		const preventKeys = (e) => {
			if (
				[
					" ",
					"ArrowUp",
					"ArrowDown",
					"PageUp",
					"PageDown",
					"Home",
					"End",
				].includes(e.key)
			) {
				e.preventDefault();
			}
		};

		window.addEventListener("wheel", preventDefault, { passive: false });
		window.addEventListener("touchmove", preventDefault, { passive: false });
		window.addEventListener("keydown", preventKeys);

		const timers = [
			window.setTimeout(() => setLineIn(true), LINE_IN_MS),
			window.setTimeout(() => {
				const logo = logoRef.current;
				const anchor = document.querySelector('[data-intro-anchor="nav"]');
				if (logo && anchor) {
					const a = anchor.getBoundingClientRect();
					const l = logo.getBoundingClientRect();
					if (a.width > 0 && a.height > 0 && l.height > 0) {
						setTransform({
							dx: a.left - l.left,
							dy: a.top - l.top,
							scale: a.height / l.height,
						});
					}
				}
				setFlying(true);
			}, FLIGHT_START_MS),
			window.setTimeout(() => setPanelOut(true), PANEL_OUT_MS),
			window.setTimeout(() => {
				markIntroSeen();
				window.removeEventListener("wheel", preventDefault);
				window.removeEventListener("touchmove", preventDefault);
				window.removeEventListener("keydown", preventKeys);
				document.body.style.overflow = previousOverflow;
				document.documentElement.style.overflow = previousHtmlOverflow;
				window.dispatchEvent(
					new CustomEvent("skemalab:scroll-lock", { detail: false }),
				);
				delete document.documentElement.dataset.intro;
				window.dispatchEvent(
					new CustomEvent("skemalab:intro", { detail: false }),
				);
				doneRef.current?.();
			}, DONE_MS),
		];

		return () => {
			timers.forEach((timer) => window.clearTimeout(timer));
			window.removeEventListener("wheel", preventDefault);
			window.removeEventListener("touchmove", preventDefault);
			window.removeEventListener("keydown", preventKeys);
			document.body.style.overflow = previousOverflow;
			document.documentElement.style.overflow = previousHtmlOverflow;
			window.dispatchEvent(
				new CustomEvent("skemalab:scroll-lock", { detail: false }),
			);
			delete document.documentElement.dataset.intro;
			window.dispatchEvent(
				new CustomEvent("skemalab:intro", { detail: false }),
			);
		};
	}, []);

	if (typeof document === "undefined") return null;

	const flightTransform =
		flying && transform
			? `translate(${transform.dx}px, ${transform.dy}px) scale(${transform.scale})`
			: lineIn
				? "translateY(0px) scale(1)"
				: "translateY(14px) scale(0.96)";

	return createPortal(
		<div
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 z-[130] flex items-center justify-center"
		>
			<div
				className="absolute inset-0 bg-[#07110e] transition-opacity duration-500 ease-out-expo"
				style={{ opacity: panelOut ? 0 : 1 }}
			/>
			<span
				ref={logoRef}
				className="relative select-none inline-flex items-center transition-[transform,opacity] ease-out-expo"
				style={{
					opacity: lineIn ? 1 : 0,
					transform: flightTransform,
					transformOrigin: "top left",
					transitionDuration: flying ? "800ms" : "700ms",
					transitionTimingFunction: "cubic-bezier(.16,1,.3,1)",
				}}
			>
				<Image
					src={logoDark}
					alt=""
					priority
					className="h-[clamp(2.5rem,9vw,5rem)] w-auto max-w-[72vw] object-contain"
					sizes="(max-width: 640px) 240px, 400px"
				/>
			</span>
		</div>,
		document.body,
	);
}
