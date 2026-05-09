## Parent PRD

`issues/prd.md`

## What to build

Establish a new typographic identity using Instrument Serif (display headings) and IBM Plex Mono (body/UI text). Import both fonts via `next/font/google` in `app/layout.tsx`, expose them as CSS variables, and wire them into Tailwind so the rest of the site can use `font-display` and `font-mono` utility classes.

Apply `font-display` to `h1` and `h2` globally via a Tailwind base layer rule. Apply `font-mono` as the default body font, replacing the current Arial/Helvetica fallback and Geist defaults.

Use `display: swap` to prevent layout blocking. Constrain weight ranges to avoid unnecessary font file downloads (Instrument Serif: 400, 700; IBM Plex Mono: 400, 500, 700).

## Acceptance criteria

- [ ] Instrument Serif loads via `next/font/google` with no external `<link>` tag in the HTML
- [ ] IBM Plex Mono loads via `next/font/google` with no external `<link>` tag in the HTML
- [ ] CSS variables `--font-display` and `--font-mono` are defined and available site-wide
- [ ] `tailwind.config.ts` exposes `fontFamily.display` and `fontFamily.mono` pointing to the CSS variables
- [ ] `h1` and `h2` elements render in Instrument Serif across all pages
- [ ] Body text renders in IBM Plex Mono across all pages
- [ ] No layout shift is observable on page load (font `display: swap` is set)
- [ ] The font change does not cause any existing page to overflow its container at mobile breakpoints

## Blocked by

None — can start immediately.

## User stories addressed

- User story 5
- User story 21
