export interface Project {
  title: string;
  description: string;
  tech: string[];
  majorTech: majorTech[]; // Broad categories
  github?: string;
  demo?: string;
  image?: string;
}

type majorTech =
  | "Fullstack"
  | "Frontend"
  | "Backend"
  | "Blockchain"
  | "Data Science"
  | "Machine Learning"
  | "AI"
  | "Game dev";

// data/projects.ts
export const projects: Project[] = [
  {
    title: "ReportFlow — ETL Data Processing & Reporting Pipeline",
    description:
      "End-to-end async ETL pipeline extracting tenant-scoped data from PostgreSQL, transforming through aggregation and business logic, and loading formatted PDF outputs into MinIO object storage. Features a distributed multi-worker Celery task queue with priority-based job lanes, exponential backoff retries, idempotency key checking, rate limiting, and real-time job progress via WebSocket (Redis pub/sub). Containerised with Docker Compose and a GitHub Actions CI pipeline.",
    tech: [
      "Python",
      "FastAPI",
      "Celery",
      "Redis",
      "PostgreSQL",
      "MinIO",
      "Docker",
      "GitHub Actions",
      "WebSockets",
    ],
    majorTech: ["Backend"],
    github: "https://github.com/Chukwuemekamusic/reportflow",
  },
  {
    title: "NGO Management Platform - LOTSI",
    description:
      "Full-stack platform for an NGO supporting at-risk youth, handling sensitive personal data across donor records, beneficiary information, school sponsorship tracking, and mentor-mentee scheduling. Features a structured PostgreSQL schema with Role-Based Access Control, automated financial workflows with payment gateway integration, a scalable RESTful API, and a dynamic CMS for staff to manage the public-facing site without developer involvement.",
    tech: [
      "TypeScript",
      "Next.js",
      "Prisma",
      "React",
      "PostgreSQL",
      "Tailwind CSS",
      "RESTful API",
    ],
    majorTech: ["Fullstack", "Frontend", "Backend"],
    github: "",
    image: "/lotsi.jpg",
  },
  {
    title: "Isolated Lending Market Protocol",
    description:
      "Isolated lending protocol on Base L2 with MEV-resistant Dutch auction liquidation and a dual-source oracle system combining Chainlink and Uniswap V3 TWAP with staleness and deviation guards. Reduced per-market deployment gas costs by ~95% using OpenZeppelin minimal proxy pattern (EIP-1167). Covered by 58+ unit, integration, invariant, and fork tests written in Foundry.",
    tech: [
      "Solidity",
      "Foundry",
      "TypeScript",
      "Next.js",
      "Chainlink",
      "Uniswap V3",
      "OpenZeppelin",
      "EIP-1167",
    ],
    majorTech: ["Blockchain", "Fullstack"],
    github: "https://github.com/Chukwuemekamusic/isolated-lending-market",
    demo: "https://ism-protocol.vercel.app/",
  },
  {
    title: "Decentralised Crowdfunding Platform",
    description:
      "Full-stack Web3 dApp from smart contract to frontend: campaign lifecycle management, secure donation handling with reentrancy protection, and struct packing for gas efficiency — deployed and verified on Sepolia testnet. Integrated The Graph Protocol to index six on-chain event types (donations, campaign creation, withdrawals) via a custom subgraph, eliminating the need for a centralised database. Implemented IPFS/Pinata for decentralised media storage; achieved ~40% gas savings through struct packing.",
    tech: [
      "Solidity",
      "Next.js",
      "TypeScript",
      "The Graph Protocol",
      "IPFS",
      "Pinata",
      "Foundry",
      "Ethers.js",
    ],
    majorTech: ["Blockchain", "Fullstack"],
    github: "https://github.com/Chukwuemekamusic/my_crowdfunding",
    demo: "https://my-crowdfunding.vercel.app/",
  },
  {
    title: "Smart Lottery (Raffle) Contract System",
    description:
      "Decentralized, provably fair lottery system with Chainlink VRF v2.5 for verifiable randomness and Chainlink Automation for automated draws. Features comprehensive testing, gas optimization, and production deployment on Sepolia testnet.",
    tech: [
      "Solidity",
      "Foundry",
      "Chainlink VRF v2.5",
      "Chainlink Automation",
      "OpenZeppelin",
    ],
    majorTech: ["Blockchain"],
    github: "https://github.com/Chukwuemekamusic/smart-lottery",
    image: "/smart-lottery.jpg",
    demo: "https://sepolia.etherscan.io/address/0x2f0a079981ac1baa4fee85619f1f09bb12d9e9e4",
  },
];

// {
//   title: "Learning Management System (LMS)",
//   description:
//     "A comprehensive platform for managing online courses, featuring user authentication, course creation, and progress tracking.",
//   tech: [
//     "TypeScript",
//     "Next.js",
//     "Prisma",
//     "Tailwind CSS",
//     "React",
//     "PostgreSQL",
//     "Mux",
//   ],
//   github: "https://github.com/Chukwuemekamusic/lms",
//   majorTech: ["Fullstack", "Frontend", "Backend"],
//   image: "/lms.png",
// },
