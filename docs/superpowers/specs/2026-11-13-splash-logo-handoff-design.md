# Splash logo hand-off — design

Date: 2026-11-13
Status: approved (option 1, "Morph & settle")

## Intent

The first-visit splash currently shows the word "skemalab" in display type, then fades
out and reveals the hero. The mark the site actually uses is the bilingual wordmark in
`src/assets/logo2.png`, shown top-left in the navbar. The splash should end by handing
that same mark over to its navbar slot, so the intro reads as the brand settling into
place rather than a title card being swapped for a page.

## Scope

- `src/components/IntroStage.jsx` — rewrite the stage around the wordmark and the hand-off.
- `src/components/Navbar.jsx` — expose the navbar mark as the animation anchor and keep it
  hidden until the hand-off lands.
- `src/components/sections/Hero.jsx` — let the hero reveal start when the logo starts
  travelling instead of when the splash unmounts.
- `src/app/globals.css` — only if a keyframe/token is needed; prefer inline motion values.

Not in scope: the intro's once-per-session rule, reduced-motion opt-out, scroll lock,
route behaviour, other pages.

## Decisions

1. **Same surface as the hero.** The splash stage becomes `#07110e` (the hero's own
   colour) instead of the theme's page colour. The intro only ever runs on `/`, where the
   hero and the navbar are both hard-dark, so the mark is the cream wordmark
   (`logo2.png`) and the background behind the logo never changes colour. This removes
   the light-theme case where a cream wordmark would sit on a cream page.
2. **Measure, don't compute.** The navbar mark carries a data attribute
   (`data-intro-anchor="nav"`). At exit the splash reads its `getBoundingClientRect()` and
   flies the stage logo to exactly that rect (translate + uniform scale, transform-origin
   at the logo's top-left). This survives RTL (mark moves right), mobile header height
   (`h-16` vs `min-[1100px]:h-20`), scrollbar width and any future navbar padding change.
3. **Never two logos.** The real navbar mark is hidden (opacity only — the rect stays
   measurable) for the duration of the intro and fades in as the flying logo lands. The
   flag is published the way the repo already publishes chrome state:
   `document.documentElement.dataset.intro` plus a `skemalab:intro` CustomEvent, with the
   hiding rule in CSS.
4. **Choreography (option 1).** Logo rises in centred, holds, then travels to the navbar
   slot while the hero copy reveals from below. The splash panel's background dissolves
   during the flight (same colour as the hero, so only the revealing hero copy reads as a
   change); the flying logo stays above it. The stage unmounts on arrival and the hero
   continues its existing stagger.
5. **Fallbacks.** If the anchor is missing or unmeasurable, fade the stage out as today.
   Reduced motion never reaches the stage (`shouldRunIntro` already gates it). Timings
   stay inside the repo's motion grammar (exponential ease-out, ≤ 800 ms per move).

## Timeline (from mount)

| t (ms) | event |
| --- | --- |
| 180 | logo rises in (opacity + y + slight scale), 700 ms expo |
| 1850 | flight starts (hero stays hidden until landing), panel background fades |
| ~2650 | logo lands, navbar mark fades in |


Note (updated): total intro length +500 ms vs. the original. The landing page (hero) stays
fully hidden until the stage unmounts — no hero reveal during the flight — so nothing shows
before the intro stage.

## Open at build time

Exact hold length, splash logo size (`clamp`, width-capped for 360 px viewports) and the
panel dissolve curve are the implementer's to tune against the hero's existing stagger.
