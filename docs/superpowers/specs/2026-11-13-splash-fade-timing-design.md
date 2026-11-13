# Splash fade timing — design

Date: 2026-11-13
Status: approved (revised)

## Intent

Make the landing page appear smoothly at the end of the splash, instead of
suddenly when the logo reaches the navbar.

## Design

Start the existing splash-panel fade during the logo's flight and keep the
splash mounted until the panel's 500 ms opacity transition completes. Keep the
pre-hydration `pending` flash guard, but remove the active `true` state's opaque
body overlay and hero hiding rules in `src/app/layout.js` and
`src/app/globals.css`; the mounted splash panel itself covers the page and can
reveal the hero background as it fades. Preserve the logo movement, existing
hero text reveal, scroll lock, and intro lifecycle.

## Approaches

1. **Overlap the existing panel fade with the logo flight (recommended):**
   adjust timing constants and active-state visibility rules, keeping the
   implementation and choreography focused.
2. **Coordinate a separate hero reveal with the logo flight:** offers finer
   control but requires broader behavior changes and is unnecessary for the
   reported abrupt reveal.

## Constraints and non-goals

Keep the logo's existing transition duration and easing, preserve the
pre-hydration guard, avoid changing when the intro starts or its
once-per-session behavior, and ensure the overlay is not removed before its fade
completes. No redesign or unrelated motion changes.

## Verification

Run the relevant existing checks and confirm the panel fades over the visible
hero background and completes before teardown.
