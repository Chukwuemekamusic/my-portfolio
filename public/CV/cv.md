# Joseph Anyaegbunam

**Backend Engineer | Full-Stack | Data Pipelines | Python | Distributed Systems**

joseph.emeka.dev@gmail.com · Glasgow, UK · +447359498514 ·
[linkedin.com/in/joseph-anyaegbunam-b1a430253](https://www.linkedin.com/in/joseph-anyaegbunam-b1a430253/) ·
[github.com/chukwuemekamusic](https://github.com/chukwuemekamusic) ·
[joseph-anyaegbunam.dev](https://joseph-anyaegbunam.dev)

---

## PROFILE

Backend and full-stack engineer with hands-on experience building production-grade ETL pipelines, distributed systems, and scalable APIs. Following a decade in music production and studio management, a deliberate pivot into software engineering — completing an MSc in Information Technology with Distinction and the Best Graduating Student Award — has led to focused backend and blockchain engineering work, with expanding DevOps capability (CKA in progress). Strong Python foundation, practical experience across DeFi protocols and smart contract architecture, and a systematic approach to testing and system reliability.

---

## TECHNICAL SKILLS

| Category           | Technologies                                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Languages**      | Python, Solidity, TypeScript, JavaScript                                                                                                    |
| **Backend**        | FastAPI, SQLAlchemy (async), Pydantic, RESTful APIs, JWT auth, Node.js, WebSockets                                                          |
| **Data & ETL**     | ETL pipeline design, Celery, PostgreSQL, Redis, MinIO (S3-compatible), pandas, NumPy, scikit-learn, PySpark (familiar), AWS Glue (familiar) |
| **DevOps & Infra** | Docker, Docker Compose, GitHub Actions (CI/CD), Nginx, Linux, Kubernetes (CKA in progress), VPS environments                                |
| **Blockchain**     | Solidity, Foundry, OpenZeppelin, DeFi protocols, EIP-2535 (Diamond), UUPS, The Graph Protocol, Viem, Ethers.js                              |
| **Web & Frontend** | React, Next.js 14, Tailwind CSS                                                                                                             |
| **Testing**        | pytest, Foundry (unit / integration / invariant / fork), TDD                                                                                |

---

## PROFESSIONAL EXPERIENCE

**Blockchain Developer (Intern)** | MyAI | USA (Remote) | _Jul 2025 – Jan 2026_

- Designed and implemented a novel multi-token batch redemption feature on a live reward protocol, enabling customers to combine multiple reward tokens in a single transaction and eliminating the need for manual sequential conversions.
- Introduced a centralised accounting source of truth to track token swap state across Treasury and client reward token contracts, ensuring consistent state across multiple protocol components.
- Built a comprehensive Foundry test suite covering the existing codebase prior to implementation, with full edge-case coverage including partial redemptions and mixed token combinations — feature passed all test criteria ahead of scheduled integration.
- Applied modular smart contract patterns (EIP-2535 Diamond Standard) to extend protocol functionality without disrupting existing client integrations.

**Full Stack Developer** | Livingstone Off-the-Street Initiative | Lagos, Nigeria | _Sep 2024 – Mar 2025_

- Led end-to-end development of a platform handling sensitive personal data — donor records, youth beneficiary information, school sponsorship tracking, and mentor-mentee scheduling — for an NGO supporting at-risk youth.
- Designed a structured PostgreSQL schema separating programmes, donors, schools, and individuals, with Role-Based Access Control (RBAC) enforced at the admin layer to ensure staff accessed only data relevant to their function.
- Built automated financial workflows integrating payment gateways, reducing manual reconciliation overhead and providing leadership with real-time visibility into programme performance and donor activity.
- Delivered a scalable RESTful API managing complex relationships across programmes, donors, schools, and beneficiaries, with a React frontend and full SEO implementation.
- Developed a dynamic CMS enabling administrative staff to update the public-facing website and post programme information without developer involvement.

**Music Producer & Studio Owner** | Self-employed | Nigeria | _2011 – 2022_

- Operated a professional recording studio and music production business for over a decade — managing client projects, studio operations, and freelance production engagements — before a deliberate pivot into software engineering.

---

## SELECTED PROJECTS

**ReportFlow — Async ETL Data Processing & Reporting Pipeline**

_Python, FastAPI, Celery, Redis, PostgreSQL, MinIO, Docker, GitHub Actions_

- Designed an end-to-end ETL pipeline: extracting tenant-scoped data from PostgreSQL, transforming through aggregation and business logic, and loading formatted PDF outputs into MinIO object storage.
- Architected a distributed multi-worker Celery task queue with priority-based job lanes, handling concurrent jobs across isolated tenants without performance degradation.
- Implemented production-grade reliability: exponential backoff retries, idempotency key checking across Redis and PostgreSQL, rate limiting, and real-time job progress via WebSocket (Redis pub/sub).
- Containerised the full stack with Docker Compose; configured a GitHub Actions CI pipeline for automated testing and linting on every pull request.

**Isolated Lending Market Protocol**

_Solidity, TypeScript, Next.js, Foundry_

- Architected an isolated lending protocol on Base L2 with MEV-resistant Dutch auction liquidation and a dual-source oracle system (Chainlink + Uniswap V3 TWAP) with staleness and deviation guards.
- Reduced per-market deployment gas costs by ~95% using OpenZeppelin minimal proxy pattern (EIP-1167); wrote 58+ unit, integration, invariant, and fork tests in Foundry.

**Decentralised Crowdfunding Platform**

_Solidity, Next.js 14, TypeScript, The Graph Protocol, IPFS/Pinata, Foundry, Ethers.js_

- Built a full-stack Web3 dApp from smart contract to frontend: campaign lifecycle management, secure donation handling with reentrancy protection, and struct packing for gas efficiency — deployed and verified on Sepolia testnet.
- Integrated The Graph Protocol to index six on-chain event types (donations, campaign creation, withdrawals) via a custom subgraph, eliminating the need for a centralised database and enabling real-time frontend queries.
- Implemented IPFS/Pinata for decentralised media storage and contract-level pagination; achieved ~40% gas savings through struct packing and targeted optimisation.

---

## EDUCATION

**MSc Information Technology — Distinction** | Robert Gordon University, Aberdeen, UK | 2022 – 2023

_Best Graduating Student Award, School of Computing_

**BSc Electrical & Electronics Engineering** | Igbinedion University, Okada, Nigeria | 2006 – 2011

---

## CERTIFICATIONS & PROFESSIONAL DEVELOPMENT

|                                              |                                                             |
| -------------------------------------------- | ----------------------------------------------------------- |
| **CKA (Certified Kubernetes Administrator)** | In Progress — 2026                                          |
| **Cyfrin Updraft**                           | Foundry Fundamentals, Advanced Foundry, Uniswap — 2023–2024 |
