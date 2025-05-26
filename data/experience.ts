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
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "Tesco Colleague",
    company: "Tesco Extra",
    location: "Aberdeen, United Kingdom",
    startDate: "2023",
    endDate: "2024/12",
    description: [
      "Managed stock organization and customer service, ensuring efficient operations and positive shopping experience.",
    ],
  },
];
