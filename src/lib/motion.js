/**
 * Shared motion system.
 *
 * Rules enforced here:
 * - only transform / opacity / clip-path are animated;
 * - durations stay between 0.24s and 0.8s;
 * - one easing family (exponential ease-out) keeps every section in rhythm.
 */

export const EASE = {
  /** Primary entrance easing — fast start, long settle. */
  out: [0.16, 1, 0.3, 1],
  /** Symmetric easing for crossfades and exits. */
  inOut: [0.65, 0, 0.35, 1],
  /** Legacy soft curve kept for continuity with the previous build. */
  soft: [0.22, 1, 0.36, 1],
};

export const DURATION = {
  fast: 0.28,
  base: 0.52,
  slow: 0.8,
};

/** Reveal viewport: trigger once, a little before the element is centred. */
export const VIEWPORT = { once: true, margin: "-10% 0px -10% 0px" };

export const SPRING = { type: "spring", stiffness: 240, damping: 26, mass: 0.6 };
