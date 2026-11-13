const INTRO_SESSION_KEY = "skemalab-intro-seen";

function hasSeenIntro() {
	if (typeof window === "undefined") return false;
	try {
		return window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
	} catch {
		return false;
	}
}

export function markIntroSeen() {
	if (typeof window === "undefined") return;
	try {
		window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
	} catch {
		/* private mode */
	}
}

function prefersReducedMotion() {
	if (typeof window === "undefined" || !window.matchMedia) return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function shouldRunIntro() {
	if (prefersReducedMotion()) return false;
	if (typeof window === "undefined") return true;

	const navEntry = window.performance?.getEntriesByType("navigation")?.[0];
	const isSoftReload = navEntry?.type === "reload";
	const hasSeen = hasSeenIntro();

	if (isSoftReload && hasSeen) {
		return false;
	}
	if (hasSeen && !isSoftReload) {
		return false;
	}
	return true;
}

if (typeof window !== "undefined") {
	window.addEventListener("keydown", (event) => {
		if (
			((event.ctrlKey || event.metaKey) &&
				event.key.toLowerCase() === "r" &&
				event.shiftKey) ||
			(event.key === "F5" && event.shiftKey)
		) {
			try {
				window.sessionStorage.removeItem(INTRO_SESSION_KEY);
			} catch {}
		}
	});
}
