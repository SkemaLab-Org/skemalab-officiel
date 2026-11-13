function prefersReducedMotion() {
	if (typeof window === "undefined" || !window.matchMedia) return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function markIntroSeen() {
	// No-op
}

export function shouldRunIntro() {
	if (typeof window === "undefined") return false;
	if (window.location.pathname !== "/") return false;
	if (prefersReducedMotion()) return false;
	return true;
}
