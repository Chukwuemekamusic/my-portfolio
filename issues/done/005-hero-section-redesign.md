## Parent PRD

`issues/prd.md`

## What to build

Redesign the hero section in `app/page.tsx` end-to-end: new heading scale, character-split entrance animation, animated role rotator, radial background glow, magnetic CTA button, and a scroll indicator. This slice also introduces two reusable components — `SplitText` and `MagneticButton` — used exclusively by the hero in this PRD's scope.

**Heading:** Replace `text-4xl sm:text-5xl` with `clamp(3rem, 12vw, 10rem)` and `font-black`. Split across two lines: first name plain, last name with an accent gradient (`bg-clip-text text-transparent bg-gradient-to-r`). Requires the `font-display` Tailwind class from `issues/002-typography-module.md` and the accent tokens from `issues/001-design-token-system.md`.

**SplitText component:** A reusable component that accepts a string, splits it into individual character `<span>` elements, and animates each in using Framer Motion `staggerChildren` at 0.03s per character (opacity + y transform).

**Role rotator:** Below the tagline, a Framer Motion `AnimatePresence` component cycles through "Full-Stack Developer", "Blockchain Engineer", "Smart Contract Auditor" with enter/exit animations.

**Radial glow:** An absolutely-positioned `div` behind the heading with `background: radial-gradient(ellipse, var(--brand-accent-glow) 0%, transparent 70%)` and a `blur` filter. `pointer-events: none`.

**MagneticButton component:** Wraps the "View Projects" CTA. Tracks `mousemove` position relative to the button bounding rect and applies a Framer Motion spring `x/y` transform (max ±10px). Resets on `mouseleave`. No effect on touch devices.

**Scroll indicator:** A subtle animated chevron or line at the bottom of the hero viewport.

## Acceptance criteria

- [ ] Hero heading renders at the `clamp()`-based size on desktop, tablet, and mobile without overflow
- [ ] Last name renders with the accent gradient
- [ ] Hero name animates in character-by-character on page load with visible stagger
- [ ] The role rotator cycles through all three roles with smooth enter/exit animations
- [ ] A radial glow is visible behind the heading in dark mode; subtle but present in light mode
- [ ] Hovering the "View Projects" button causes it to follow the cursor within ±10px
- [ ] The magnetic effect does not activate on touch devices
- [ ] A scroll indicator is visible at the bottom of the hero viewport
- [ ] The hero section is visually correct in both light and dark mode
- [ ] No mobile overflow at 375px viewport width

## Blocked by

- Blocked by `issues/001-design-token-system.md` (requires accent tokens for gradient and glow)
- Blocked by `issues/002-typography-module.md` (requires `font-display` Tailwind class)

## User stories addressed

- User story 3
- User story 4
- User story 9
- User story 18
- User story 19
- User story 20
