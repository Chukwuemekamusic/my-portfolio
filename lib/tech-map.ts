// Tech name -> badge colours/icon. Keys double as the canonical tech names the
// AI draft generator is steered towards, so new techs should be added here.
import {
  SiPython,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiPostgresql,
  SiDocker,
  SiRedis,
  SiDjango,
  SiFastapi,
  SiMongodb,
  SiRedux,
  SiPrisma,
  SiNodedotjs,
  SiGithubactions,
  SiTailwindcss,
  SiSolidity,
  SiIpfs,
} from "react-icons/si";

export type TechInfo = {
  color: string;
  bg: string;
  icon?: React.ElementType;
};

export const techMap: Record<string, TechInfo> = {
  Python: { color: "#3776AB", bg: "rgba(55,118,171,0.12)", icon: SiPython },
  TypeScript: { color: "#3178C6", bg: "rgba(49,120,198,0.12)", icon: SiTypescript },
  React: { color: "#61DAFB", bg: "rgba(97,218,251,0.12)", icon: SiReact },
  "Next.js": { color: "#7c5cfc", bg: "rgba(124,92,252,0.12)", icon: SiNextdotjs },
  PostgreSQL: { color: "#336791", bg: "rgba(51,103,145,0.12)", icon: SiPostgresql },
  Docker: { color: "#2496ED", bg: "rgba(36,150,237,0.12)", icon: SiDocker },
  Redis: { color: "#DC382D", bg: "rgba(220,56,45,0.12)", icon: SiRedis },
  Django: { color: "#092E20", bg: "rgba(9,46,32,0.12)", icon: SiDjango },
  FastAPI: { color: "#009688", bg: "rgba(0,150,136,0.12)", icon: SiFastapi },
  MongoDB: { color: "#47A248", bg: "rgba(71,162,72,0.12)", icon: SiMongodb },
  Redux: { color: "#764ABC", bg: "rgba(118,74,188,0.12)", icon: SiRedux },
  Prisma: { color: "#5A67D8", bg: "rgba(90,103,216,0.12)", icon: SiPrisma },
  "Node.js": { color: "#339933", bg: "rgba(51,153,51,0.12)", icon: SiNodedotjs },
  "GitHub Actions": { color: "#2088FF", bg: "rgba(32,136,255,0.12)", icon: SiGithubactions },
  "Tailwind CSS": { color: "#06B6D4", bg: "rgba(6,182,212,0.12)", icon: SiTailwindcss },
  Solidity: { color: "#7c5cfc", bg: "rgba(124,92,252,0.12)", icon: SiSolidity },
  IPFS: { color: "#65C2CB", bg: "rgba(101,194,203,0.12)", icon: SiIpfs },
  Foundry: { color: "#7B3FE4", bg: "rgba(123,63,228,0.12)" },
  Chainlink: { color: "#375BD2", bg: "rgba(55,91,210,0.12)" },
  "Chainlink VRF v2.5": { color: "#375BD2", bg: "rgba(55,91,210,0.12)" },
  "Chainlink Automation": { color: "#375BD2", bg: "rgba(55,91,210,0.12)" },
  OpenZeppelin: { color: "#4E5EE4", bg: "rgba(78,94,228,0.12)" },
  "The Graph Protocol": { color: "#6747ED", bg: "rgba(103,71,237,0.12)" },
  "Ethers.js": { color: "#3C3C3D", bg: "rgba(60,60,61,0.12)" },
  "Uniswap V3": { color: "#FF007A", bg: "rgba(255,0,122,0.12)" },
  Celery: { color: "#37814A", bg: "rgba(55,129,74,0.12)" },
  MinIO: { color: "#C72E49", bg: "rgba(199,46,73,0.12)" },
  WebSockets: { color: "#4a4a4a", bg: "rgba(74,74,74,0.12)" },
  Pinata: { color: "#E5006C", bg: "rgba(229,0,108,0.12)" },
  "EIP-1167": { color: "#627EEA", bg: "rgba(98,126,234,0.12)" },
  "Diamond Storage": { color: "#627EEA", bg: "rgba(98,126,234,0.12)" },
  "Proxy Patterns": { color: "#627EEA", bg: "rgba(98,126,234,0.12)" },
  "RESTful API": { color: "#4a90d9", bg: "rgba(74,144,217,0.12)" },
};

export const knownTechNames = Object.keys(techMap);
