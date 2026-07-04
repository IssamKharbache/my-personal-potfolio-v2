"use client";

import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "@/context/LoadingContext";

const INK = "#2D1F16";
const AMBER = "#F59E0B";

const JSX_CHARS = [
  { ch: "<", color: AMBER },
  { ch: "K", color: INK },
  { ch: ".", color: AMBER },
  { ch: "d", color: INK },
  { ch: "e", color: INK },
  { ch: "v", color: INK },
  { ch: " ", color: INK },
  { ch: "/", color: AMBER },
  { ch: ">", color: AMBER },
];

interface CompileLogoProps {
  size?: "sm" | "lg";
  force?: boolean;
  className?: string;
}

export function CompileLogo({
  size = "lg",
  force = false,
  className = "",
}: CompileLogoProps) {
  const ctx = useContext(LoadingContext);
  const ready = force || !ctx || ctx.ready;

  const [typedCount, setTypedCount] = useState(0);
  const [done, setDone] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);

  // typing
  useEffect(() => {
    if (!ready || done) return;

    const typer = setInterval(() => {
      setTypedCount((c) => {
        if (c >= JSX_CHARS.length) {
          clearInterval(typer);
          setDone(true);
          return c;
        }
        return c + 1;
      });
    }, 65);

    return () => clearInterval(typer);
  }, [ready, done]);

  // cursor blink only while typing
  useEffect(() => {
    if (done) return;

    const blink = setInterval(() => {
      setCursorOn((v) => !v);
    }, 450);

    return () => clearInterval(blink);
  }, [done]);

  const textSize = size === "lg" ? "text-2xl sm:text-3xl" : "text-lg";

  return (
    <span
      className={`inline-flex items-center font-mono ${textSize} ${className}`}
    >
      {JSX_CHARS.slice(0, typedCount).map((c, i) => (
        <span key={i} style={{ color: c.color }}>
          {c.ch === " " ? "\u00A0" : c.ch}
        </span>
      ))}

      {!done && (
        <span
          className="ml-0.5 inline-block h-[0.9em] w-0.5 translate-y"
          style={{ background: AMBER, opacity: cursorOn ? 1 : 0 }}
        />
      )}
    </span>
  );
}

export default CompileLogo;
