// components/experience-timeline.tsx
import { Experience } from "@/data/experience";
import { motion } from "framer-motion";

export function ExperienceTimeline({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-5 h-full w-px bg-slate-200 dark:bg-slate-700" />

      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex gap-8 mb-8"
        >
          {/* Timeline Dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="relative"
          >
            <div className="w-4 h-4 rounded-full bg-slate-900 dark:bg-slate-100 border-2 border-slate-900 dark:border-slate-100" />
          </motion.div>

          {/* Experience Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="flex-1"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                {exp.title} · {exp.company}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {exp.location} · {exp.startDate} – {exp.endDate}
              </p>
              <ul className="mt-2 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
              {exp.tech && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {exp.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
