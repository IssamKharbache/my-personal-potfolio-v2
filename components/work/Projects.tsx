"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/Projects";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Projects() {
  return (
    <section
      id="work"
      className="relative overflow-hidden px-6 py-24 md:py-32 mx-auto max-w-6xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-24 flex items-baseline justify-between border-b border-[#2D1F16]/10 pb-8 md:mb-32 "
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-[#F59E0B]" />
          <p className="text-xs font-semibold font-heading uppercase tracking-[0.2em] text-[#F59E0B]">
            Work
          </p>
        </div>
      </motion.div>

      <div className="flex flex-col">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={
              i === 0
                ? ""
                : "mt-24 border-t border-[#2D1F16]/10 pt-24 md:mt-32 md:pt-32"
            }
          >
            <ProjectCard project={project} reversed={i % 2 === 1} />
          </div>
        ))}
      </div>
    </section>
  );
}
