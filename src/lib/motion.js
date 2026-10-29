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

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.base, ease: EASE.out } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
};

/** Line mask — used for display headings split by line. */
export const maskUp = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: DURATION.slow, ease: EASE.out } },
};

export function staggerContainer(stagger = 0.08, delayChildren = 0) {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
};

/** Horizontal rule that draws itself in. */
export const lineDraw = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
};

/** Section-level copy fade used by AnimatePresence panels. */
export const panelSwap = {
  enter: { opacity: 0, y: 14 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
  exit: { opacity: 0, y: -10, transition: { duration: DURATION.fast } },
};

export const SPRING = { type: "spring", stiffness: 240, damping: 26, mass: 0.6 };
