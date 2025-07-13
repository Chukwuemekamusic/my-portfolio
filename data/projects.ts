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
    title: "Diamond Storage Subscription Proxy",
    description:
      "Advanced upgradeable proxy contract using Diamond Storage pattern for subscription management. Features gas-efficient storage access, atomic operations, and seamless upgrades without state loss.",
    tech: [
      "Solidity",
      "Foundry",
      "Diamond Storage",
      "Proxy Patterns",
      "OpenZeppelin",
    ],
    majorTech: ["Blockchain"],
    github:
      "https://github.com/Chukwuemekamusic/diamond-storage-subscription-proxy",
    image: "/diamond-storage.jpg",
  },
  {
    title: "NGO Management Platform - LOTSI",
    description:
      "Comprehensive full-stack solution for Livingstone Off-the-Street Initiative featuring admin dashboard, beneficiary management, public website with volunteer registration, and donation processing.",
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
    github: "", // Leave empty or remove if not public
    image: "/lotsi.jpg",
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
      "Gas Optimization",
    ],
    majorTech: ["Blockchain"],
    github: "https://github.com/Chukwuemekamusic/smart-lottery",
    image: "/smart-lottery.jpg", // You'll need to create this
    demo: "https://sepolia.etherscan.io/address/0x2f0a079981ac1baa4fee85619f1f09bb12d9e9e4", // Link to verified contract
  },
  {
    title: "Crowdfunding DApp",
    description:
      "Decentralized crowdfunding platform on Ethereum with secure smart contracts and IPFS integration. Designed and tested locally with Hardhat",
    tech: ["Solidity", "Next.js", "Hardhat", "Tailwind", "Web3.js"],
    majorTech: ["Blockchain", "Fullstack"],
    github: "https://github.com/Chukwuemekamusic/my_crowdfunding",
    image: "/lms.png",
  },
  {
    title: "Learning Management System (LMS)",
    description:
      "A comprehensive platform for managing online courses, featuring user authentication, course creation, and progress tracking.",
    tech: [
      "TypeScript",
      "Next.js",
      "Prisma",
      "Tailwind CSS",
      "React",
      "PostgreSQL",
      "Mux",
    ],
    github: "https://github.com/Chukwuemekamusic/lms",
    majorTech: ["Fullstack", "Frontend", "Backend"],
    image: "/lms.png",
  },
  {
    title: "DiscussU Platform",
    description:
      "A collaborative platform where students create and join cross-school discussion rooms within their institution. Built with research-backed features including custom access controls and social networking elements to enhance academic collaboration and peer learning.",
    tech: ["React", "Django", "PostgreSQL"],
    majorTech: ["Backend", "Frontend", "Fullstack"],
    github: "https://github.com/Chukwuemekamusic/DiscussU-react_frontend",
    image: "/lms.png",
  },
  {
    title: "AI-Powered Tic-Tac-Toe",
    description:
      "An interactive Tic-Tac-Toe game with both AI and multiplayer modes. Built with Python and Pygame, featuring a minimax algorithm AI opponent for challenging gameplay.",
    tech: ["Python", "Pygame", "Minimax Algorithm"],
    majorTech: ["AI", "Game dev"],
    github: "https://github.com/Chukwuemekamusic/tictactoe_AI",
    image: "/moneySaver.png",
  },
];
