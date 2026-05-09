## Parent PRD

`issues/prd.md`

## What to build

Three targeted upgrades to `components/project-card.tsx` that collectively make the projects page feel significantly more polished:

**Image hover reveal:** Restore the currently commented-out `<Image>` element. Position it absolutely behind the card content with `inset: 0`. On hover, reveal it via `clip-path: inset(0 100% 0 0)` → `clip-path: inset(0 0% 0 0)` using Framer Motion `whileHover`. Cards without an `image` field in `data/projects.ts` (e.g. ReportFlow) skip the reveal and keep the current text-only layout. Audit the projects page layout wrapper (`app/projects/page.tsx`) to confirm no ancestor has `overflow: hidden` set during the animation.

**Branded tech tags:** Replace plain `<Badge variant="outline">` tags with branded versions. Build a static lookup map (tech name → hex color) covering the tech stack used across all projects (Solidity, Python, React, Next.js, TypeScript, Django, PostgreSQL, Docker, Foundry, etc.). Each tag gets a tinted background and border using the mapped color, plus the matching react-icons `si` icon prepended. Use the already-installed `react-icons` v5.4 package.

**Clip-path entrance animation:** Replace `initial: { opacity: 0, y: 20 }` with `initial: { clipPath: "inset(0 0 100% 0)" }` → `animate: { clipPath: "inset(0 0 0% 0)" }` for the card entrance. The card appears to "unfold" upward as it enters the viewport.

## Acceptance criteria

- [ ] Projects with an `image` field show the screenshot revealed via clip-path animation on hover
- [ ] Projects without an `image` field render without the image reveal and without errors
- [ ] The image reveal animation is smooth and does not clip or jump
- [ ] Each tech tag displays the correct brand color for its technology
- [ ] Each tech tag displays the correct react-icons `si` icon (or falls back gracefully if an icon is unavailable)
- [ ] Card entrance uses the clip-path unfold animation, not the opacity/y fade
- [ ] Cards render correctly in both light and dark mode
- [ ] No layout overflow on the projects page at mobile breakpoints

## Blocked by

- Blocked by `issues/001-design-token-system.md` (accent tokens used for tag tinting)

## User stories addressed

- User story 13
- User story 14
- User story 15
