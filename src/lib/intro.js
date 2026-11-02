export const INTRO_SESSION_KEY = "skemalab-intro-seen";

/** Reads the session marker without assuming storage is available. */
export function hasSeenIntro() {
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

export function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The opening stage is a first-visit experience: once per session, never for
 * visitors who asked the system for reduced motion.
 */
export function shouldRunIntro() {
  return !prefersReducedMotion() && !hasSeenIntro();
}
