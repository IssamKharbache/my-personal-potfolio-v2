"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

const EMAIL = "kharbache.contact@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Issamkharbache" },
  { label: "LinkedIn", href: "https://linkedin.com/in/Issam-kharbache" },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: React.MouseEvent) {
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl overflow-hidden px-6 py-24 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-16 flex items-center gap-3 border-b border-[#2D1F16]/10 pb-8 md:mb-24"
      >
        <span className="h-px w-8 bg-[#F59E0B]" />
        <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#F59E0B]">
          Contact
        </p>
      </motion.div>

      <div className="flex flex-col items-start">
        <motion.p
          variants={fieldVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
          className="max-w-xl text-lg leading-8 text-[#2D1F16]/70"
        >
          Got a project in mind? Whether it's a business website, a redesign, or
          a custom web application, I'd love to hear about it.
        </motion.p>

        <motion.a
          href={`mailto:${EMAIL}`}
          variants={fieldVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0.1}
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="group mt-10 inline-flex flex-wrap items-baseline gap-4 font-serif text-4xl leading-[1.05] tracking-tight text-[#2D1F16] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="relative break-all sm:break-normal">
            {EMAIL}
            <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-[#2D1F16] transition-transform duration-500 ease-out group-hover:scale-x-100 md:-bottom-2" />
          </span>

          <motion.svg
            width="40"
            height="40"
            viewBox="0 0 14 14"
            fill="none"
            className="mb-2 shrink-0 text-[#F59E0B]"
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <path
              d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.a>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: copied ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="mt-3 text-sm text-[#2D1F16]/50"
        >
          Email copied.
        </motion.span>

        <motion.p
          variants={fieldVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0.18}
          className="mt-8 text-sm text-[#2D1F16]/50"
        >
          I usually reply within 24 hours.
        </motion.p>

        <motion.div
          variants={fieldVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0.25}
          className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-[#2D1F16]/10 pt-8"
        >
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-[#2D1F16]"
            >
              <span className="relative">
                {social.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#2D1F16] transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
