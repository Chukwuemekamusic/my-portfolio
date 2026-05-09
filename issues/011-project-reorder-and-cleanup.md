## Parent PRD

`issues/prd.md`

## What to build

Reorder the projects array in `data/projects.ts` and remove the Diamond Storage Subscription Proxy entry. No project content, descriptions, tech tags, or links change — order and deletion only.

New order:
1. ReportFlow — ETL Data Processing & Reporting Pipeline
2. NGO Management Platform - LOTSI
3. Isolated Lending Market Protocol
4. Decentralised Crowdfunding Platform
5. Smart Lottery (Raffle) Contract System

Diamond Storage Subscription Proxy is deleted entirely.

## Acceptance criteria

- [ ] Projects array has exactly 5 entries
- [ ] ReportFlow is first
- [ ] LOTSI (NGO Management Platform) is second
- [ ] Isolated Lending Market Protocol is third
- [ ] Decentralised Crowdfunding Platform is fourth
- [ ] Smart Lottery is fifth
- [ ] Diamond Storage Subscription Proxy entry is absent from the file
- [ ] No project descriptions, tech tags, links, or images are modified
- [ ] `npm run build` passes

## Blocked by

None — can start immediately.

## User stories addressed

- User story 5 (first project is backend/data engineering)
- User story 6 (second project is full-stack product)
- User story 12 (projects section not dominated by blockchain-only entries)
