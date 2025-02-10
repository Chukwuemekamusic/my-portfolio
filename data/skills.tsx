import {
  SiPython,
  // SiJavascript,
  SiReact,
  SiNodedotjs,
  SiDjango,
  SiSolidity,
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
} from "react-icons/si";

export const techSkills = [
  { name: "Python", icon: <SiPython className="w-5 h-5 text-yellow-500" /> },
  // {
  //   name: "JavaScript",
  //   icon: <SiJavascript className="w-5 h-5 text-yellow-400" />,
  // },
  { name: "React", icon: <SiReact className="w-5 h-5 text-blue-500" /> },
  { name: "Node.js", icon: <SiNodedotjs className="w-5 h-5 text-green-500" /> },
  { name: "Django", icon: <SiDjango className="w-5 h-5 text-green-600" /> },
  { name: "Solidity", icon: <SiSolidity className="w-5 h-5 text-gray-500" /> },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="w-5 h-5 text-black dark:text-white" />,
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql className="w-5 h-5 text-blue-600" />,
  },
  {
    name: "TailwindCSS",
    icon: <SiTailwindcss className="w-5 h-5 text-teal-400" />,
  },
];
