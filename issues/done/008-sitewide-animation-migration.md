## Parent PRD

`issues/prd.md`

## What to build

A cross-cutting polish pass: audit every remaining `{ opacity: 0, y: 20 }` (or equivalent fade) section-entrance animation across the site and migrate them to the `clip-path: inset(0 0 100% 0)` → `clip-path: inset(0 0 0% 0)` unfold pattern established in `issues/005-hero-section-redesign.md` and `issues/006-project-cards-redesign.md`.

Targets include (but are not limited to):
- The three about cards in the home page hero section (`app/page.tsx`)
- Section headings across all pages (Skills & Expertise heading, Projects heading)
- Any remaining Framer Motion `initial: { opacity: 0, y: 20 }` variants not already migrated by earlier slices

This slice is done last to avoid merge conflicts with the hero, card, and skills slices that are modifying the same components.

The goal is a visually consistent animation language across the entire site — no page should have a mix of old fade-ins and new clip-path unfolds.

## Acceptance criteria

- [ ] All section-entrance animations across the site use the clip-path unfold pattern
- [ ] No `{ opacity: 0, y: 20 }` entrance animations remain in any page or component (excluding micro-interactions like button feedback, which are not section entrances)
- [ ] All migrated animations trigger correctly on scroll using `whileInView` (where applicable)
- [ ] The about cards on `app/page.tsx` animate in with the clip-path pattern
- [ ] Section headings on the skills and projects pages animate in with the clip-path pattern
- [ ] No regressions introduced in hero, project card, or skills marquee animations

## Blocked by

- Blocked by `issues/005-hero-section-redesign.md`
- Blocked by `issues/006-project-cards-redesign.md`
- Blocked by `issues/007-skills-marquee.md`

## User stories addressed

- User story 15 (extended — consistent animation quality across all pages)
- User story 1 (contributes to the overall polished, non-templated impression)
