## Parent PRD

`issues/prd.md`

## What to build

Upgrade `components/header.tsx` with three visual improvements that together make the header feel modern, intentional, and humanizing:

**Glass morphism:** Replace the current `bg-background/95` solid background with a semi-transparent background + `backdrop-filter: blur(20px) saturate(180%)`. Add a 1px bottom border using `--brand-accent-border` (the 20% opacity accent token from `issues/001-design-token-system.md`).

**Animated active-link indicator:** Add a Framer Motion `layoutId` shared element — a pill or underline — that animates smoothly between the currently active nav link as the route changes. The indicator should slide, not jump.

**"Available for work" status dot + logo mark:** Add a pulsing green dot (`#22c55e`, 8px, CSS `animation: pulse 2s infinite`) in the header's left slot alongside a minimal `JA` monospace text mark styled with the brand accent color. This replaces the currently empty left side of the header.

## Acceptance criteria

- [ ] Header background is semi-transparent with blur when content scrolls beneath it
- [ ] A 1px bottom border is visible using the accent color at reduced opacity
- [ ] The active nav link has a visible indicator (pill or underline)
- [ ] Navigating between routes causes the indicator to animate smoothly to the new active link (not jump)
- [ ] A pulsing green dot is visible in the header on all screen sizes
- [ ] A `JA` logo mark is visible in the header left slot, styled with the accent color
- [ ] The mobile menu (hamburger) continues to function correctly
- [ ] The header renders correctly in both light and dark mode

## Blocked by

- Blocked by `issues/001-design-token-system.md` (requires `--brand-accent-border` token)

## User stories addressed

- User story 10
- User story 11
- User story 12
