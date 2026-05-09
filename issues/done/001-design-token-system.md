## Parent PRD

`issues/prd.md`

## What to build

Replace the unchanged shadcn monochrome defaults in `globals.css` with an electric purple (`#7c5cfc`) accent token family that works in both light and dark mode. The new tokens must coexist with shadcn's existing component tokens so no existing UI components break.

Define the following CSS custom properties:
- `--brand-accent` — full-intensity purple
- `--brand-accent-dim` — 15% opacity version for card backgrounds
- `--brand-accent-glow` — 40% opacity version for glow effects
- `--brand-accent-border` — 20% opacity version for card/header borders

In dark mode: full-intensity values. In light mode: reduced intensity (higher lightness, lower saturation) to remain accessible against white backgrounds.

Remap the existing shadcn `--accent` token to use `--brand-accent` so that shadcn components (Badge, Button, etc.) inherit the new identity without needing per-component class overrides.

## Acceptance criteria

- [ ] `--brand-accent` and its three derived tokens are defined for both `:root` (light) and `.dark` in `globals.css`
- [ ] The shadcn `--accent` token resolves to the brand accent color in both modes
- [ ] Existing shadcn components (Button, Badge, Card) render without visual regressions in both light and dark mode
- [ ] The accent color passes WCAG AA contrast ratio against the light mode background
- [ ] No new npm packages are required

## Blocked by

None — can start immediately.

## User stories addressed

- User story 6
- User story 7
