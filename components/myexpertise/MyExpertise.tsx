"use client";

import { motion } from "framer-motion";
import { Code2, ServerCog, LayoutDashboard, Gauge } from "lucide-react";

type Expertise = {
  icon: typeof Code2;
  title: string;
  description: string;
};

const EXPERTISE: Expertise[] = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description:
      "I enjoy building complete web applications, from intuitive user interfaces to the backend systems that keep everything running smoothly. Seeing all the pieces come together is one of my favorite parts of development.",
  },
  {
    icon: ServerCog,
    title: "Backend & APIs",
    description:
      "I like working behind the scenes—designing APIs, structuring databases, and building reliable systems that quietly do their job without getting in the way.",
  },
  {
    icon: LayoutDashboard,
    title: "Business Applications",
    description:
      "I enjoy creating software that helps people work more efficiently, whether that's a dashboard, a booking platform, or an internal tool that simplifies everyday tasks.",
  },
  {
    icon: Gauge,
    title: "Performance & Architecture",
    description:
      "I care about writing software that's easy to maintain, performs well, and continues to feel reliable as a project grows over time.",
  },
];

export default function Expertise() {
  return (
    <section
      id="expertise"
      className="relative overflow-hidden px-6 py-24 md:py-32"
      style={{
        background: `
    radial-gradient(circle at 20% 20%, rgba(255,246,232,.75), transparent 35%),
    radial-gradient(circle at 80% 90%, rgba(245,158,11,.08), transparent 35%),
    linear-gradient(180deg, #edd9bd 0%, #ead4b6 50%, #e6ceb0 100%)
  `,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.5,
          }}
          // Base opacity-0 prevents any flash of unstyled content before JS hydrates
          className="mb-20 max-w-xl opacity-0"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[#F59E0B]" />
            <p className="text-xs font-semibold font-heading uppercase tracking-[0.2em] text-[#F59E0B]">
              Expertise
            </p>
          </div>

          <h2 className="text-4xl tracking-tight text-[#2D1F16] md:text-5xl font-light">
            The things I enjoy building most.
          </h2>

          <p className="mt-5 text-base leading-relaxed text-[#2D1F16]/50">
            From frontend interfaces to backend infrastructure, these are the
            areas where I do my best work.
          </p>
        </motion.div>

        {/* STAGGERED GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
          {EXPERTISE.map(({ icon: Icon, title, description }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.5,
                delay: i * 0.15,
              }}
              className={`group relative flex flex-col p-8 opacity-0 transition-all duration-500 ease-out hover:-translate-y-1 md:mt-0 border-dashed border-2 border-black ${
                i % 2 !== 0 ? "md:mt-16" : ""
              }`}
            >
              {/* Soft, borderless card background that only appears on hover */}
              <div className="absolute inset-0 z-0 bg-primary/20 opacity-0 shadow-[0_20px_50px_-20px_rgba(45,31,22,0.15)] backdrop-blur-sm transition-opacity duration-500 ease-out group-hover:opacity-100" />

              {/* Content Layer */}
              <div className="relative z-10 flex h-full flex-col">
                {/* Top Row: Raw Icon & Ghost Number */}
                <div className="mb-6 flex items-start justify-between">
                  {/* Raw icon, no box, dynamic color on hover */}
                  <Icon
                    size={32}
                    strokeWidth={1.5}
                    className="text-[#2D1F16] transition-colors duration-500 group-hover:text-[#F59E0B]"
                  />
                  {/* Ghost number - much more vibrant on hover */}
                  <span className="text-5xl font-bold tracking-tighter text-[#2D1F16]/5 transition-colors duration-500 group-hover:text-[#F59E0B]">
                    0{i + 1}
                  </span>
                </div>

                {/* Typography */}
                <h3 className="text-2xl font-medium tracking-tight text-[#2D1F16]">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#2D1F16]/60">
                  {description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
