
"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import PolygonAnimation from "@/components/polygon-animation";

export default function HeroSection() {
  const [headlineHovered, setHeadlineHovered] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const cardOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 0.75], [0, -120]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 flex min-h-[110vh] items-center justify-center overflow-hidden px-6 pb-32 pt-20 sm:px-12 sm:pt-24 lg:px-24 lg:pt-28"
    >
      <div className="pointer-events-auto fixed inset-x-0 bottom-0 -z-10 top-10 opacity-90 sm:top-14 lg:top-18">
        <PolygonAnimation variant="bare" className="h-full w-full" />
      </div>

      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 hidden items-center justify-between border-b border-white/15 bg-white/15 px-10 py-4 shadow-sm shadow-sky-100/10 backdrop-blur-md sm:flex">
        <div className="flex items-center gap-3">
          <Image
            src="/kira.svg"
            alt="Kira logo"
            width={40}
            height={40}
            className="h-10 w-10 drop-shadow-xl"
          />
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-700">
            Kira.id
          </span>
        </div>
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-700">
          Open Source AGI Lab
        </span>
      </div>

      <motion.div
        className="pointer-events-auto relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 text-center rounded-[2.5rem] border border-white/15 bg-white/15 px-14 py-14 shadow-xl shadow-sky-100/5 backdrop-blur-sm"
        style={{ opacity: cardOpacity, y: cardY }}
      >
        <Image
          src="/kira.svg"
          alt="Kira logo"
          width={40}
          height={40}
          className="h-10 w-10 drop-shadow-xl sm:hidden"
        />
        <h1 className="text-balance text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
          <span
            tabIndex={0}
            onMouseEnter={() => setHeadlineHovered(true)}
            onMouseLeave={() => setHeadlineHovered(false)}
            onFocus={() => setHeadlineHovered(true)}
            onBlur={() => setHeadlineHovered(false)}
            className="pointer-events-auto cursor-pointer outline-none transition-colors duration-200 hover:text-sky-600 focus-visible:text-sky-600"
          >
            {headlineHovered ? "Discover AGI" : "Kira.id Intelligence"}
          </span>
        </h1>
        <p className="text-pretty text-lg leading-relaxed text-zinc-600 sm:text-xl">
          We are{" "}
          <span className="relative inline-flex items-center rounded-full bg-gradient-to-r from-sky-100 via-sky-200 to-sky-100 px-2 py-0.5 text-base font-semibold text-sky-700">
            open-source
          </span>{" "}
          research focusing on solving{" "}
          <span className="relative inline-flex items-center rounded-full bg-gradient-to-r from-violet-100 via-fuchsia-100 to-rose-100 px-2 py-0.5 text-base font-semibold text-violet-700">
            Artificial General Intelligence
          </span>{" "}
          and making it useful, safe and accessible to everyone
        </p>
      </motion.div>
    </motion.section>
  );
}
