// import React, { useState } from 'react';
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// type MajorTech = 'Blockchain' | 'Frontend' | 'Backend' | 'AI/ML' | 'Database' | 'DevOps';

// interface ProjectFilter {
//    projects: {
//         title: string;
//         description: string;
//         tech: string[];
//         github?: string;
//         demo?: string;
//         image?: string;
//       }
// }

// const ProjectFilter = ({ projects, onFilterChange }) => {
//   const [selectedMajorTech, setSelectedMajorTech] = useState('');
//   const [techSearch, setTechSearch] = useState('');

//   const handleMajorTechChange = (value) => {
//     setSelectedMajorTech(value);
//     onFilterChange({ majorTech: value, techSearch });
//   };

//   const handleTechSearchChange = (e) => {
//     setTechSearch(e.target.value);
//     onFilterChange({ majorTech: selectedMajorTech, techSearch: e.target.value });
//   };

//   return (
//     <div className="flex gap-4">
//       <Select value={selectedMajorTech} onValueChange={handleMajorTechChange}>
//         <SelectTrigger className="w-40">
//           <SelectValue placeholder="Category" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="">All</SelectItem>
//           {Object.keys(techCategories).map(category => (
//             <SelectItem key={category} value={category}>
//               {category}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <Input
//         type="text"
//         placeholder="Search technologies..."
//         value={techSearch}
//         onChange={handleTechSearchChange}
//         className="w-64"
//       />
//     </div>
//   );
// };

// export default ProjectFilter;
