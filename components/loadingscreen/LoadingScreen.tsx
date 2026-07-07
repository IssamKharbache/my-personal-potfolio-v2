"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CompileLogo from "../CompileLogo";
import { LoadingContext } from "@/app/hooks/useLoading";

const CREAM = "#FFF8F0";

const DURATION = 1000;

export default function LoadingScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), DURATION);
    return () => clearTimeout(t);
  }, []);

  return (
    <LoadingContext.Provider value={{ ready: !isLoading }}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-999 flex items-center justify-center"
            style={{ background: CREAM }}
          >
            <motion.div>
              <CompileLogo size="7xl" force />
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
