export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  tech?: string[]; // Optional: Add tech stack used
}

export const experiences: Experience[] = [
  {
    title: "Freelance Software Developer (Volunteer)",
    company: "Livingstone Off-the-Street Initiative",
    location: "Lagos, Nigeria",
    startDate: "2024/06",
    endDate: "Present",
    description: [
      "Developing digital solutions for a non-profit organization dedicated to supporting underprivileged youths.",
      "Spearheading the development of a dynamic website to enhance NGO visibility.",
      "Designing and implementing a robust database system to manage organizational data.",
    ],
    tech: ["Next.js", "PostgreSQL"],
  },
  {
    title: "Tesco Colleague",
    company: "Tesco Extra",
    location: "Aberdeen, United Kingdom",
    startDate: "2023",
    endDate: "2024/12",
    description: [
      "Collaborated with a team to ensure timely stocking and organization of goods.",
      "Addressed customer inquiries promptly, demonstrating excellent communication and problem-solving skills.",
      "Maintained accuracy in stock placement, enhancing the overall customer experience.",
    ],
  },
];
