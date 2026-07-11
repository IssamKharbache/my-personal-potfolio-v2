"use client";

import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Background track */}
      <div className="fixed left-80 top-0 z-30 hidden h-screen w-[1.5px] bg-gray-200 lg:block" />

      {/* Animated progress fill */}
      <motion.div
        className="fixed left-80 top-0 z-30 hidden w-[1.5px] origin-top bg-linear-to-b from-amber-400 to-orange-500 lg:block"
        style={{
          scaleY: progress,
          height: "100vh",
        }}
      />
    </>
  );
};

export default ScrollProgress;
