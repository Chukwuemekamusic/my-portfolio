## Parent PRD

`issues/prd.md`

## What to build

Add a subtle noise grain texture overlay to the entire site via a CSS-only `body::after` pseudo-element. The grain replaces the current flat solid-color backgrounds with visual depth and signals that the design is intentional.

The grain is implemented as a base64-encoded SVG noise pattern in `globals.css`. It must be:
- Fixed position (scrolls with the page, not the content)
- `pointer-events: none` so it does not interfere with any interactions
- Z-indexed above page content but below interactive elements (modals, dropdowns, tooltips)
- Opacity `0.03` in dark mode, `0.02` in light mode

No new assets, no JavaScript, no new npm packages.

## Acceptance criteria

- [ ] A noise grain texture is visible as a subtle overlay on all pages in both light and dark mode
- [ ] The overlay does not intercept click or touch events on any interactive element
- [ ] The overlay does not appear on top of modal dialogs or dropdown menus
- [ ] Opacity is `0.03` in dark mode and `0.02` in light mode
- [ ] The implementation is a single CSS rule in `globals.css` with no JavaScript
- [ ] No new files or assets are added to `public/`

## Blocked by

None — can start immediately.

## User stories addressed

- User story 8
