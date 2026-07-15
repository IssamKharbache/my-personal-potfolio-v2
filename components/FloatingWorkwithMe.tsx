"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useWorkWithMe } from "@/context/WorkWithMeContext";
import { Link } from "react-scroll";

const EASE = [0.16, 1, 0.3, 1] as const;

// Only the dock/undock MOMENT gets an animated tween. While settled in
// either state, position updates apply instantly so the button never lags
// behind the page while you scroll.
const MORPH_DURATION = 0.8;

const CORNER = { width: 172, height: 44, margin: 24 };

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function FloatingWorkWithMe() {
  const { isDocked, anchorRef } = useWorkWithMe();
  const [rect, setRect] = useState<Rect | null>(null);
  const [isMorphing, setIsMorphing] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const prevDocked = useRef(isDocked);

  // Track breakpoint — the corner pill hides on small screens (not enough
  // room), but the docked-in-card version should still show there.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsSmallScreen(mq.matches);
    const listener = (e: MediaQueryListEvent) => setIsSmallScreen(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    function measure() {
      if (isDocked && anchorRef.current) {
        const r = anchorRef.current.getBoundingClientRect();
        setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
      } else {
        setRect({
          top: CORNER.margin,
          left: window.innerWidth - CORNER.width - CORNER.margin,
          width: CORNER.width,
          height: CORNER.height,
        });
      }
    }

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [isDocked, anchorRef]);

  // Flip on the animated morph only for the brief window right after
  // isDocked actually changes value.
  useEffect(() => {
    if (prevDocked.current !== isDocked) {
      prevDocked.current = isDocked;
      setIsMorphing(true);
      const t = setTimeout(() => setIsMorphing(false), MORPH_DURATION * 1000);
      return () => clearTimeout(t);
    }
  }, [isDocked]);

  if (!rect) return null;
  if (!isDocked && isSmallScreen) return null;

  return (
    <motion.div
      animate={{
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      }}
      transition={
        isMorphing ? { duration: MORPH_DURATION, ease: EASE } : { duration: 0 }
      }
      style={{ position: "fixed", zIndex: 50 }}
      className={`group fixed flex items-center justify-center gap-2 rounded-full bg-[#2D1F16] text-[#faf7f2] shadow-lg shadow-[#2D1F16]/20 transition-colors duration-300 hover:bg-[#241a12] ${
        isDocked ? "text-base" : "text-sm"
      }`}
    >
      <Link
        to={"contact"}
        spy
        smooth
        offset={-100}
        className="group relative flex cursor-pointer items-center gap-6 focus-visible:outline-none py-7 px-2"
        aria-hidden
      >
        Work with me
      </Link>
      <svg
        width={isDocked ? 16 : 12}
        height={isDocked ? 16 : 12}
        viewBox="0 0 14 14"
        fill="none"
        className="shrink-0 text-[#F59E0B] transition-transform duration-300 group-hover:translate-x-0.5"
      >
        <path
          d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
