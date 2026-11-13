const INTRO_FORCE_KEY = "skemalab-force-intro";

function hasForceIntro() {
	if (typeof window === "undefined") return false;
	try {
		const forced = window.sessionStorage.getItem(INTRO_FORCE_KEY) === "1";
		if (forced) {
			window.sessionStorage.removeItem(INTRO_FORCE_KEY);
		}
		return forced;
	} catch {
		return false;
	}
}

function prefersReducedMotion() {
	if (typeof window === "undefined" || !window.matchMedia) return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function markIntroSeen() {
	// No-op
}

export function shouldRunIntro() {
	if (prefersReducedMotion()) return false;
	if (typeof window === "undefined") return true;

	if (hasForceIntro()) return true;

	const navEntry = window.performance?.getEntriesByType("navigation")?.[0];
	const navType = navEntry?.type;

	if (navType === "reload") {
		return false;
	}

	return true;
}

if (typeof window !== "undefined") {
	window.addEventListener("keydown", (event) => {
		if (
			event.key === "F5" ||
			((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "r")
		) {
			try {
				window.sessionStorage.setItem(INTRO_FORCE_KEY, "1");
			} catch {}
		}
	});
}
