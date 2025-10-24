"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

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
  const exploreOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const exploreY = useTransform(scrollYProgress, [0.1, 0.3], [24, 0]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-6 pb-0 pt-20 text-zinc-100 sm:px-12 sm:pt-24 lg:px-24 lg:pt-28"
    >
      <div className="pointer-events-auto fixed inset-x-0 bottom-0 -z-10 top-10 opacity-90 sm:top-14 lg:top-18">
        <PolygonAnimation variant="bare" className="h-full w-full" />
      </div>

      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 hidden items-center justify-between border-b border-white/10 bg-white/5 px-10 py-4 shadow-sm shadow-sky-900/20 backdrop-blur-md sm:flex">
        <div className="flex items-center gap-3">
          <Image
            src="/kira.svg"
            alt="Kira logo"
            width={40}
            height={40}
            className="h-10 w-10 drop-shadow-xl"
          />
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-300">
            Kira.id
          </span>
        </div>
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-300">
          Open Source AGI Lab
        </span>
      </div>

      <motion.div
        className="pointer-events-auto relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 text-center rounded-[2.5rem] border border-white/10 bg-white/10 px-14 py-14 shadow-xl shadow-sky-900/20 backdrop-blur-md"
        style={{ opacity: cardOpacity, y: cardY }}
      >
        <Image
          src="/kira.svg"
          alt="Kira logo"
          width={40}
          height={40}
          className="h-10 w-10 drop-shadow-xl sm:hidden"
        />
        <h1 className="text-balance text-4xl font-semibold leading-tight text-zinc-50 sm:text-5xl md:text-6xl lg:text-7xl">
          <span
            tabIndex={0}
            onMouseEnter={() => setHeadlineHovered(true)}
            onMouseLeave={() => setHeadlineHovered(false)}
            onFocus={() => setHeadlineHovered(true)}
            onBlur={() => setHeadlineHovered(false)}
            className="pointer-events-auto cursor-pointer outline-none transition-colors duration-200 hover:text-sky-300 focus-visible:text-sky-300"
          >
            {headlineHovered ? "Discover AGI" : "Kira.id Intelligence"}
          </span>
        </h1>
        <p className="text-pretty text-lg leading-relaxed text-zinc-300 sm:text-xl">
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

      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ opacity: exploreOpacity, y: exploreY }}
      >
        <span className="rounded-full border border-sky-400/50 bg-zinc-900/80 px-5 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-sky-200 shadow-lg shadow-sky-900/40">
          EXPLORE OUR REPOS
        </span>
        <ArrowDown className="size-6 text-sky-300 animate-bounce" />
      </motion.div>
    </motion.section>
  );
}
