"use client";

import { motion } from "framer-motion";
import { Link } from "react-scroll";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV_LINKS = [{ label: "Work", href: "work" }];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="mx-auto max-w-6xl border-t border-[#2D1F16]/10 px-6 py-10"
    >
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
        {/* Brand + copyright */}
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#F59E0B]" />
          <p className="text-xs uppercase tracking-[0.14em] text-[#2D1F16]/50">
            © {year} Issam kharbache . All rights reserved.
          </p>
        </div>

        {/* Nav — same underline hover language as everywhere else */}
        <nav className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              spy
              smooth
              offset={-100}
              key={link.label}
              to={link.href}
              className="group relative text-sm tracking-wide text-[#2D1F16] cursor-pointer"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#2D1F16] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* Back to top — the project-arrow, rotated up */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="group inline-flex items-center gap-2 text-sm tracking-wide text-[#2D1F16]"
        >
          <span className="relative">
            Back to top
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#2D1F16] transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </span>
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="-rotate-90 text-[#F59E0B]"
            initial={{ y: 0 }}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <path
              d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </button>
      </div>
    </motion.footer>
  );
}
