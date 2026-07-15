"use client";

import { useWorkWithMe } from "@/context/WorkWithMeContext";
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

const CAPABILITIES = [
  {
    label: "Websites",
    detail: "Marketing sites and product pages that load fast and hold up.",
  },
  {
    label: "Web applications",
    detail: "Full-stack builds — from database to the last pixel.",
  },
  {
    label: "Client dashboards",
    detail: "Custom CRMs so clients manage their own data, no help needed.",
  },
];

export function About() {
  const { anchorRef } = useWorkWithMe();

  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-24 md:py-32 mx-auto max-w-6xl"
    >
      {/* Eyebrow — same convention as Work / Contact */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-16 flex items-center gap-3 border-b border-[#2D1F16]/10 pb-8 md:mb-24"
      >
        <span className="h-px w-8 bg-[#F59E0B]" />
        <p className="text-xs font-semibold font-heading uppercase tracking-[0.2em] text-[#F59E0B]">
          About
        </p>
      </motion.div>

      <div className="flex flex-col items-center gap-16 md:flex-row md:items-start md:gap-24">
        {/* Text column */}
        <div className="w-full md:w-1/2">
          <motion.h3
            variants={fieldVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0}
            className="font-serif text-4xl leading-[1.05] tracking-tight text-[#2D1F16] md:text-5xl"
          >
            Hey, I&apos;m [Name] — I build things for the web.
          </motion.h3>

          <motion.p
            variants={fieldVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.08}
            className="mt-6 max-w-xl text-lg leading-8 text-[#2D1F16]/70"
          >
            I&apos;m a full-stack developer, and most days that means turning a
            messy spreadsheet, a shared inbox, or a &quot;can you just add this
            real quick&quot; into a website or dashboard someone actually enjoys
            using.
          </motion.p>

          <motion.p
            variants={fieldVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.14}
            className="mt-4 max-w-xl text-lg leading-8 text-[#2D1F16]/70"
          >
            The part I like most is building the client&apos;s own dashboard or
            CRM — the tool that lets them log in and manage their customers,
            orders, or content by themselves, instead of texting me every time
            something needs to change. Handing someone that kind of independence
            is a good feeling.
          </motion.p>

          <motion.p
            variants={fieldVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.18}
            className="mt-4 max-w-xl text-lg leading-8 text-[#2D1F16]/70"
          >
            I sweat the unglamorous stuff too — logins, permissions, what
            happens when someone does something unexpected — because a site that
            looks great but breaks the first week isn&apos;t finished.
          </motion.p>

          {/* Capabilities — no numbering, this isn't a sequence */}
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.2}
            className="mt-12 divide-y divide-[#2D1F16]/10 border-t border-[#2D1F16]/10"
          >
            {CAPABILITIES.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <p className="shrink-0 font-serif text-xl text-[#2D1F16] sm:w-48">
                  {item.label}
                </p>
                <p className="text-sm leading-6 text-[#2D1F16]/60">
                  {item.detail}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Visual column — a direct invitation instead of a mockup */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0.1}
          className="w-full md:w-1/2"
        >
          <div className="flex flex-col justify-between border border-[#2D1F16]/10 bg-[#faf7f2] p-8 shadow-xl md:p-10">
            <div>
              <p className="mt-6 font-serif text-3xl leading-[1.15] tracking-tight text-[#2D1F16] md:text-4xl">
                Got something you&apos;d rather not build alone?
              </p>
              <p className="mt-4 max-w-sm text-base leading-7 text-[#2D1F16]/60">
                Tell me what you&apos;re trying to build, or what&apos;s
                currently held together with duct tape. I&apos;ll tell you
                honestly whether I can help.
              </p>
            </div>

            <div ref={anchorRef} className="mt-10 inline-flex">
              <span
                aria-hidden
                className="invisible inline-flex items-center gap-2 whitespace-nowrap rounded-full px-7 py-3.5 text-base"
              >
                Work with me
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7H13" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
