## Parent PRD

`issues/prd.md`

## What to build

Rewrite the body copy in `app/about/page.tsx` to three sentences that reflect the backend-first identity. The page is not currently linked or rendered in the live portfolio — this update future-proofs it for when the user decides to surface it.

The three sentences should cover:
1. Backend-first engineering identity and primary areas of work (APIs, data pipelines, smart contracts)
2. The music production background — brief, humanising, one clause
3. Current DevOps trajectory (Kubernetes, CKA in progress)

The existing page structure (section, heading, prose layout) is preserved — only the paragraph text changes.

## Acceptance criteria

- [ ] First paragraph opens with engineering identity, not academic credentials
- [ ] Music production background is mentioned in one clause, not a full sentence of its own
- [ ] CKA / Kubernetes trajectory is referenced in the closing sentence
- [ ] "Passionate about full-stack development, data analysis, and building blockchain solutions" is removed
- [ ] Page structure and layout classes are unchanged
- [ ] Page remains unlinked from the main navigation
- [ ] `npm run build` passes

## Blocked by

None — can start immediately.

## User stories addressed

- User story 11 (non-traditional background humanised in one sentence)
