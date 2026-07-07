"use client";
import { motion } from "framer-motion";

export default function CompileLogo() {
  return (
    <motion.div className="relative inline-block">
      <motion.span
        className={`font-extrabold font-heading text-7xl text-[#2D1F16]`}
        initial={{
          filter: "contrast(1)",
          opacity: 1,
        }}
        animate={{
          filter: "contrast(0)",
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      >
        Issam
      </motion.span>
      <motion.span
        className="absolute -right-3 bottom-2 h-2.5 w-2.5 rounded-full bg-[#F59E0B]"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 0.8 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          delay: 0.1,
        }}
      />
    </motion.div>
  );
}
