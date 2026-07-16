"use client";

import { motion, Variants } from "framer-motion";
import { useLoading } from "@/app/hooks/useLoading";

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
    <section
      id="hero"
      style={{
        background: `
    radial-gradient(circle at top left, #fff6e8 0%, transparent 40%),
    radial-gradient(circle at bottom right, rgba(180,83,9,.08), transparent 35%),
    linear-gradient(180deg, #f6e8d4 0%, #edd9bd 100%)
  `,
      }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
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
          Full Stack Developer
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mx-auto mt-5 max-w-4xl font-bold text-5xl leading-[1.02] tracking-tight text-[#2D1F16] md:text-8xl"
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
