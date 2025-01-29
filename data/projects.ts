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
  | "AI";

// data/projects.ts
export const projects: Project[] = [
  {
    title: "Crowdfunding DApp",
    description:
      "Decentralized crowdfunding platform on Ethereum with secure smart contracts and IPFS integration.",
    tech: ["Solidity", "React", "Hardhat", "Tailwind", "Web3.js"],
    majorTech: ["Blockchain", "Fullstack"],
    github: "https://github.com/Chukwuemekamusic/crowdfunding-dapp",
    demo: "#",
    image: "/lms.png",
  },
  {
    title: "Money Saving App",
    description:
      "Full-stack savings tracker with OAuth2 authentication, SMTP notifications, and goal analytics.",
    tech: ["React", "Django", "Redux", "PostgreSQL", "OAuth"],
    majorTech: ["Backend", "Frontend", "Fullstack"],
    github: "https://github.com/Chukwuemekamusic/money-saver",
    image: "/moneySaver.png",
  },
  {
    title: "DiscussU Platform",
    description:
      "Academic discussion forum with real-time messaging, role-based access, and topic clustering.",
    tech: ["React", "Django", "PostgreSQL"],
    majorTech: ["Backend", "Frontend", "Fullstack"],
    github: "#",
    image: "/lms.png",
    demo: "#",
  },
  {
    title: "Industrial Predictive Maintenance",
    description:
      "AI-powered dashboard predicting equipment failures using IoT sensor data and ML models.",
    tech: ["Python", "TensorFlow", "React", "Tableau"],
    majorTech: ["Machine Learning", "Data Science", "AI"],
    github: "#",
    image: "/moneySaver.png",
  },
  {
    title: "Token Vesting DApp",
    description:
      "Blockchain solution for managing token vesting schedules with customizable cliff periods.",
    tech: ["Solidity", "Next.js", "The Graph", "TypeChain", "Ethers.js"],
    majorTech: ["Blockchain", "Fullstack"],
    github: "#",
    demo: "#",
    image: "/moneySaver.png",
  },
];
