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
    title: "Money Saving App",
    description:
      "A web app that helps users set and achieve savings goals over 6 months or a year. It generates dynamic weekly savings options, tracks progress, and provides a summary of savings made.",
    tech: ["React", "Django", "Redux", "PostgreSQL", "OAuth"],
    majorTech: ["Backend", "Frontend", "Fullstack"],
    github: "https://github.com/Chukwuemekamusic/money-saver-app",
    demo: "https://moneysaverapp.netlify.app/",
    image: "/moneySaver.png",
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
  // {
  //   title: "Industrial Predictive Maintenance",
  //   description:
  //     "AI-powered dashboard predicting equipment failures using IoT sensor data and ML models.",
  //   tech: ["Python", "TensorFlow", "React", "Tableau"],
  //   majorTech: ["Machine Learning", "Data Science", "AI"],
  //   github: "#",
  //   image: "/moneySaver.png",
  // },
  // {
  //   title: "Token Vesting DApp",
  //   description:
  //     "Blockchain solution for managing token vesting schedules with customizable cliff periods.",
  //   tech: ["Solidity", "Next.js", "The Graph", "TypeChain", "Ethers.js"],
  //   majorTech: ["Blockchain", "Fullstack"],
  //   github: "#",
  //   demo: "#",
  //   image: "/moneySaver.png",
  // },
];
