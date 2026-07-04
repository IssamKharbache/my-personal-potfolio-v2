"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LoadingContext } from "@/context/LoadingContext";
import CompileLogo from "../CompileLogo";

const INK = "#2D1F16";
const CREAM = "#FFF8F0";
const AMBER = "#F59E0B";

const DURATION = 2000; // ms before morph starts

const BOOT_STEPS = [
  "resolving dependencies",
  "compiling components",
  "optimizing assets",
  "deploying build",
];

export default function LoadingScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "morph" | "done">("loading");
  const prefersReducedMotion = useReducedMotion();

  // progress, eased rather than linear so it reads as real work
  useEffect(() => {
    if (phase !== "loading") return;
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("morph");
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // move to done after the morph/dissolve finishes
  useEffect(() => {
    if (phase === "morph") {
      const t = setTimeout(
        () => setPhase("done"),
        prefersReducedMotion ? 300 : 900,
      );
      return () => clearTimeout(t);
    }
  }, [phase, prefersReducedMotion]);

  const stepIndex = Math.min(
    Math.floor((progress / 100) * BOOT_STEPS.length),
    BOOT_STEPS.length - 1,
  );

  const isLoading = phase === "loading" || phase === "morph";
  const isMorphing = phase === "morph";
  // the navbar's CompileLogo waits on this — it starts typing the moment
  // this overlay begins morphing away, so it reads as one continuous
  // animation instead of two separate ones
  const handoffReady = phase === "morph" || phase === "done";

  return (
    <LoadingContext.Provider value={{ ready: handoffReady }}>
      <AnimatePresence>
        {isLoading && prefersReducedMotion && (
          <motion.div
            key="loading-overlay-reduced"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-999 flex items-center justify-center"
            style={{ background: CREAM }}
          >
            <CompileLogo size="lg" force />
          </motion.div>
        )}

        {isLoading && !prefersReducedMotion && (
          <motion.div
            key="loading-overlay"
            className="fixed z-999 flex items-center justify-center overflow-hidden border border-transparent"
            style={{
              background: "rgba(255, 248, 240, 0.65)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 8px 30px rgba(45,31,22,0.06)",
            }}
            initial={{
              top: 0,
              left: "50%",
              x: "-50%",
              width: "100%",
              height: "100%",
              borderRadius: 0,
            }}
            animate={
              isMorphing
                ? {
                    top: 24,
                    left: "50%",
                    x: "-50%",
                    width: "min(900px, calc(100% - 2rem))",
                    height: 64,
                    borderRadius: 9999,
                    borderColor: "rgba(45,31,22,0.1)",
                    opacity: [1, 1, 0],
                  }
                : {
                    top: 0,
                    left: "50%",
                    x: "-50%",
                    width: "100%",
                    height: "100%",
                    borderRadius: 0,
                  }
            }
            transition={
              isMorphing
                ? {
                    top: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
                    width: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
                    height: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
                    borderRadius: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
                    opacity: {
                      duration: 0.9,
                      times: [0, 0.75, 1],
                      ease: "easeInOut",
                    },
                  }
                : {}
            }
          >
            {/* ambient drift, quiet, secondary to the morph */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute h-105 w-105 rounded-full"
              style={{ background: AMBER, opacity: 0.07, filter: "blur(90px)" }}
              animate={{ x: [0, 40, -30, 0], y: [0, -20, 30, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="relative flex flex-col items-center gap-4"
              animate={
                isMorphing
                  ? { opacity: 0, scale: 0.9 }
                  : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* logo — same CompileLogo used in the navbar, stays as JSX */}
              <CompileLogo size="lg" force />

              {/* status line — cycles like a build log, tied to real progress */}
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
                <span style={{ color: AMBER }}>&gt;</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={stepIndex}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    style={{ color: "rgba(45,31,22,0.55)" }}
                  >
                    {progress >= 100 ? "ready" : BOOT_STEPS[stepIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* progress track */}
              <div
                className="h-0.5 w-40 overflow-hidden rounded-full"
                style={{ background: "rgba(45,31,22,0.1)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: AMBER, width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              <span
                className="font-mono text-[11px]"
                style={{
                  color: "rgba(45,31,22,0.4)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {String(progress).padStart(3, "0")}%
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ visibility: isLoading ? "hidden" : "visible" }}>
        {children}
      </div>
    </LoadingContext.Provider>
  );
}
