"use client";

import { motion, Variants } from "framer-motion";
import { useLoading } from "@/app/hooks/useLoading";
import { Link } from "react-scroll";

type NavbarLogoProps = {
  onClick?: () => void;
};

const NAME = "Issam";
const LETTER_STAGGER = 0.04;
const LETTER_DURATION = 0.15;
const START_DELAY = 0.3;

const TYPING_DONE =
  START_DELAY + LETTER_STAGGER * (NAME.length - 1) + LETTER_DURATION;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: LETTER_STAGGER,
      delayChildren: START_DELAY,
    },
  },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 4 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: LETTER_DURATION, ease: "easeOut" },
  },
};

export default function Logo({ onClick }: NavbarLogoProps) {
  const { ready } = useLoading();

  return (
    <Link
      className="cursor-pointer"
      spy={true}
      smooth={true}
      duration={500}
      ignoreCancelEvents={false}
      spyThrottle={500}
      to="hero"
      offset={-100}
      onClick={onClick}
    >
      <div className="relative inline-block">
        <motion.span
          variants={container}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
          className="font-extrabold font-heading text-2xl text-[#2D1F16]"
        >
          {NAME.split("").map((char, i) => (
            <motion.span key={i} variants={letter} className="inline-block">
              {char}
            </motion.span>
          ))}
        </motion.span>

        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={ready ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: TYPING_DONE, duration: 0.2, ease: "backOut" }}
          className="absolute -right-3 bottom-1 h-2 w-2 rounded-full bg-[#F59E0B]"
        />

        <motion.span
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
          transition={{
            delay: TYPING_DONE,
            duration: 1,
            times: [0, 0.1, 0.5, 0.6],
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
          className="absolute -right-6 bottom-1 w-2 border-2 border-[#3a2b22]"
        />
      </div>
    </Link>
  );
}
