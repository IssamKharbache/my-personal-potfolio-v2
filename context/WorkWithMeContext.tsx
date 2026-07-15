"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

interface WorkWithMeContextValue {
  /** True once the card's CTA slot is visible on screen — the button should be docked there instead of floating. */
  isDocked: boolean;
  /** Attach this to the placeholder inside the About card. */
  anchorRef: RefObject<HTMLDivElement | null>;
}

const WorkWithMeContext = createContext<WorkWithMeContextValue | null>(null);

export function WorkWithMeProvider({ children }: { children: ReactNode }) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [isDocked, setIsDocked] = useState(false);

  useEffect(() => {
    const node = anchorRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsDocked(entry.isIntersecting),
      // Fires once a bit more than half the card slot is on screen —
      // tweak this if the hand-off feels early/late.
      { threshold: 0.6 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <WorkWithMeContext.Provider value={{ isDocked, anchorRef }}>
      {children}
    </WorkWithMeContext.Provider>
  );
}

export function useWorkWithMe() {
  const ctx = useContext(WorkWithMeContext);
  if (!ctx) {
    throw new Error("useWorkWithMe must be used inside <WorkWithMeProvider>");
  }
  return ctx;
}
