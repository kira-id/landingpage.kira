"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { HEADLINES, HEADLINE_ROTATION_INTERVAL, INITIAL_ROTATION_DELAY } from "@/lib/theme";

export default function HeroSection() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const clearHeadlineTimers = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startHeadlineRotation = useCallback(
    (delay: number) => {
      clearHeadlineTimers();

      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;

        setHeadlineIndex((current) => (current + 1) % HEADLINES.length);

        intervalRef.current = window.setInterval(() => {
          setHeadlineIndex((current) => (current + 1) % HEADLINES.length);
        }, HEADLINE_ROTATION_INTERVAL);
      }, delay);
    },
    [clearHeadlineTimers, HEADLINES.length],
  );

  const handleHeadlineAdvance = useCallback(() => {
    setHeadlineIndex((current) => (current + 1) % HEADLINES.length);
    startHeadlineRotation(HEADLINE_ROTATION_INTERVAL);
  }, [startHeadlineRotation, HEADLINES.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const exploreOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const exploreY = useTransform(scrollYProgress, [0.1, 0.3], [24, 0]);

  useEffect(() => {
    startHeadlineRotation(INITIAL_ROTATION_DELAY);

    return () => clearHeadlineTimers();
  }, [startHeadlineRotation, clearHeadlineTimers]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-4 pb-0 pt-16 text-zinc-100 sm:px-8 sm:pt-20 lg:px-16 lg:pt-24"
    >
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 hidden items-center justify-between bg-white/5 px-10 py-4 shadow-lg shadow-black/10 backdrop-blur-m  sm:flex">
        <div className="flex items-center gap-3">
          <Image
            src="/kira.svg"
            alt="Kira logo"
            width={40}
            height={40}
            className="h-10 w-10 drop-shadow-xl"
          />
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
            Kira.id
          </span>
        </div>
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
          Open Source AGI Lab
        </span>
      </div>

      <motion.div className="pointer-events-auto relative z-10 mx-auto flex flex-col items-center gap-10 text-center">
        <h1 className="text-balance text-6xl font-semibold leading-tight text-zinc-50 sm:text-7xl md:text-8xl lg:text-9xl">
          <button
            type="button"
            onClick={handleHeadlineAdvance}
            className="pointer-events-auto flex min-h-[7rem] w-full items-center justify-center text-center outline-none transition-colors duration-200 sm:min-h-[8rem] md:min-h-[9rem] lg:min-h-[10rem]"
            style={{ perspective: 1200 }}
          >
            <div className="flex w-full justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={HEADLINES[headlineIndex]}
                  initial={{ y: "60%", opacity: 0, rotateX: 35, filter: "blur(12px)" }}
                  animate={{ y: "0%", opacity: 1, rotateX: 0, filter: "blur(0px)" }}
                  exit={{ y: "-50%", opacity: 0, rotateX: -15, filter: "blur(8px)" }}
                  transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                  className="block w-full whitespace-normal text-balance [text-shadow:0_18px_48px_rgba(0,0,0,0.3)] will-change-transform"
                >
                  {HEADLINES[headlineIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </button>
        </h1>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ opacity: exploreOpacity, y: exploreY }}
      >
        <span className="rounded-full border border-white/30 bg-black/50 px-5 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-white/80 shadow-lg shadow-black/40 text-center">
          EXPLORE OUR REPOS
        </span>
        <ArrowDown className="size-6 text-white/80 animate-bounce" />
      </motion.div>
    </motion.section>
  );
}
