"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import { Project } from "@/app/types/project";

interface ProjectCardProps {
  project: Project;
  /** True for every second project — flips the row so the image sits on the left */
  reversed?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 56 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

// Maps common stack names to skillicons.dev slugs. Falls back to a
// lowercase/alphanumeric guess of the name if it isn't in the table —
// add entries here as you add new technologies to your projects.
const SKILL_ICON_SLUGS: Record<string, string> = {
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  typescript: "ts",
  javascript: "js",
  tailwind: "tailwind",
  tailwindcss: "tailwind",
  "node.js": "nodejs",
  node: "nodejs",
  express: "express",
  mongodb: "mongodb",
  postgresql: "postgres",
  postgres: "postgres",
  graphql: "graphql",
  figma: "figma",
  framer: "framer",
  "framer motion": "framer",
  vue: "vue",
  python: "python",
  django: "django",
  docker: "docker",
  aws: "aws",
  firebase: "firebase",
  redux: "redux",
  sass: "sass",
  css: "css",
  html: "html",
  vite: "vite",
  vercel: "vercel",
  supabase: "supabase",
  prisma: "prisma",
  three: "threejs",
  "three.js": "threejs",
  swift: "swift",
  kotlin: "kotlin",
  go: "go",
  rust: "rust",
  java: "java",
  mysql: "mysql",
  redis: "redis",
};

function toSkillIconSlug(tech: string) {
  const key = tech.trim().toLowerCase();
  return SKILL_ICON_SLUGS[key] ?? key.replace(/[^a-z0-9]/g, "");
}

export function ProjectCard({ project, reversed = false }: ProjectCardProps) {
  const {
    title,
    description,
    technologies,
    image,
    imageAlt,
    href,
    githubHref,
  } = project;

  const frameRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setSupportsHover(query.matches);
    const listener = (event: MediaQueryListEvent) =>
      setSupportsHover(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, {
    stiffness: 280,
    damping: 30,
    mass: 0.6,
  });
  const springY = useSpring(cursorY, {
    stiffness: 280,
    damping: 30,
    mass: 0.6,
  });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = frameRef.current?.getBoundingClientRect();
    if (!bounds) return;
    cursorX.set(event.clientX - bounds.left);
    cursorY.set(event.clientY - bounds.top);
  }

  const stackIconsUrl = `https://skillicons.dev/icons?i=${technologies
    .map(toSkillIconSlug)
    .join(",")}`;

  return (
    <motion.article
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className={`flex min-h-screen items-center gap-16 lg:gap-24 ${
        reversed ? "md:flex-row-reverse" : "md:flex-row"
      } flex-col`}
    >
      {/* Text column */}
      <div className="w-full md:w-2/5 lg:pr-8">
        <motion.h3
          variants={fieldVariants}
          custom={0}
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="font-serif text-4xl leading-[1.05] tracking-tight text-[#2D1F16] md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h3>

        <motion.p
          variants={fieldVariants}
          custom={0.1}
          className="mt-6 max-w-xl text-lg leading-8 text-[#2D1F16]/70"
        >
          {description}
        </motion.p>

        {/* Stack — shown as icons instead of a text list */}
        <motion.div
          variants={fieldVariants}
          custom={0.15}
          className="mt-10 border-t border-[#2D1F16]/10 pt-6"
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#2D1F16]/40">
            Stack
          </p>
          <img
            src={stackIconsUrl}
            alt={technologies.join(", ")}
            className="mt-3 h-9 w-auto"
          />
        </motion.div>

        <motion.div
          variants={fieldVariants}
          custom={0.2}
          className="mt-10 flex items-center gap-8"
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm tracking-wide text-[#2D1F16]"
          >
            <span className="relative">
              View project
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#2D1F16] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </span>
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="text-[#F59E0B]"
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <path
                d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </a>

          {githubHref && (
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm tracking-wide text-[#2D1F16]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="shrink-0"
              >
                <path d="M12 0.5C5.65 0.5 0.5 5.65 0.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.67 0-1.25.44-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.4-2.7 5.37-5.27 5.66.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.35-5.15-11.5-12-11.5Z" />
              </svg>
              <span className="relative">
                GitHub
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#2D1F16] transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </span>
            </a>
          )}
        </motion.div>
      </div>

      <div className="w-full md:w-3/5">
        <motion.div
          ref={frameRef}
          onPointerMove={handlePointerMove}
          onPointerEnter={() => setIsHovering(true)}
          onPointerLeave={() => setIsHovering(false)}
          variants={fieldVariants}
          custom={0.1}
          className="relative overflow-hidden  border border-[#2D1F16]/10 bg-[#faf7f2] shadow-xl"
          style={{ cursor: supportsHover ? "none" : "auto" }}
        >
          <motion.div
            animate={{ scale: isHovering ? 1.03 : 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative aspect-16/10 w-full"
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover object-top transition-transform duration-700"
              sizes="(min-width:1024px) 60vw, 100vw"
            />
          </motion.div>

          {supportsHover && (
            <motion.div
              className="pointer-events-none absolute left-0 top-0 flex h-20 w-20 items-center justify-center rounded-full bg-white text-[11px] uppercase tracking-widest text-[#2D1F16] shadow-lg"
              style={{
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: isHovering ? 1 : 0,
                scale: isHovering ? 1 : 0.7,
              }}
            >
              View
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.article>
  );
}
