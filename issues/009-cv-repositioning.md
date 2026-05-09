## Parent PRD

`issues/prd.md`

## What to build

Update `public/CV/cv.md` to align with the backend-first identity agreed in the PRD. Three targeted edits: the headline, the location, and the opening profile paragraph.

- Headline changes from `Backend Engineer | Full-Stack | Data Pipelines | Python | Distributed Systems` to `Backend Engineer | Full-Stack | Blockchain | DevOps`
- Location changes from `Glasgow, UK` to `Aberdeen, UK`
- Profile paragraph is restructured so it opens with what Joseph builds (backend systems, blockchain, DevOps) rather than the academic pivot. The MSc/award reference is compressed to an inline parenthetical — `(MSc with Distinction, Best Graduating Student)` — rather than a long em-dash clause that dominates the sentence.

No other CV sections (experience, projects, education, certifications) are changed.

## Acceptance criteria

- [ ] CV headline reads exactly: `Backend Engineer | Full-Stack | Blockchain | DevOps`
- [ ] Location reads `Aberdeen, UK` (not Glasgow)
- [ ] Profile paragraph opens with engineering output, not the career pivot story
- [ ] MSc Distinction and Best Graduating Student Award remain visible as a compact inline reference
- [ ] No other CV content is altered
- [ ] `npm run build` passes

## Blocked by

None — can start immediately.

## User stories addressed

- User story 1 (backend identity leads)
- User story 4 (CV and portfolio tell the same story)
- User story 8 (academic achievement visible but not the centrepiece)
- User story 9 (correct location)
