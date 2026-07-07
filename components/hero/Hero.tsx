"use client";

import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";
import { MagneticButton } from "../ui/magnetic-button";
import { useLoading } from "@/app/hooks/useLoading";

const HeroScene = dynamic(() => import("../hero/HeroScene"), { ssr: false });

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const scene: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: "easeOut", delay: 0.2 },
  },
};

// Radial cutout: transparent at the exact center where the text sits,
// solid further out — so the form reads as "behind" the words instead
// of fighting them for contrast.
const fadeMask =
  "radial-gradient(circle at center, transparent 0%, transparent 22%, black 60%)";

export default function Hero() {
  const { ready } = useLoading();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 3D LAYER — centered behind the text, full-bleed within the section */}
      <motion.div
        variants={scene}
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        className="pointer-events-none absolute inset-0 z-0"
        style={{ WebkitMaskImage: fadeMask, maskImage: fadeMask }}
      >
        <HeroScene />
      </motion.div>

      {/* CONTENT — full width, centered, no more left-column constraint */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        className="relative z-10 w-full px-6 text-center"
      >
        <motion.p
          variants={fadeUp}
          className="text-sm font-medium uppercase tracking-[0.22em] text-[#2D1F16]/55"
        >
          Full-Stack Developer
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mx-auto mt-5 max-w-4xl font-heading text-5xl leading-[1.02] tracking-tight text-[#2D1F16] md:text-8xl"
        >
          Issam
          <br />
          <span className="italic font-normal">Kharbache</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[#2D1F16]/65"
        >
          I turn ideas into reliable web applications, focusing on thoughtful
          design, clean architecture, and software that's built to scale.
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3 text-[#2D1F16]/45">
          <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="h-10 w-px bg-[#2D1F16]/30" />
        </div>
      </motion.div>
    </section>
  );
}
