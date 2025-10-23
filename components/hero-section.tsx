"use client";

import { useEffect, useState } from "react";

const MAX_TITLE_LIFT = 60;
const MAX_SUBTITLE_LIFT = 48;

const clamp = (value: number, max: number) =>
  Math.abs(value) > max ? Math.sign(value) * max : value;

const animatedLayers = [
  {
    className:
      "animate-orbit-slow absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.15),_rgba(255,255,255,0))] blur-3xl",
  },
  {
    className:
      "animate-pulse-glow absolute right-[12%] top-[18%] h-64 w-64 rounded-full bg-[conic-gradient(from_45deg,_rgba(14,165,233,0.1),_rgba(99,102,241,0.2),_rgba(59,130,246,0.05))] blur-2xl",
  },
  {
    className:
      "animate-orbit-medium absolute left-[8%] bottom-[12%] h-72 w-72 rounded-[48%] bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.12),_rgba(255,255,255,0))] blur-2xl",
  },
];

export default function HeroSection() {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const titleLift = clamp(scrollOffset * -0.15, MAX_TITLE_LIFT);
  const subtitleLift = clamp(scrollOffset * -0.08, MAX_SUBTITLE_LIFT);

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.05),_transparent_65%)]" />
        {animatedLayers.map((layer) => (
          <div key={layer.className} className={layer.className} />
        ))}
      </div>
      <div className="mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-start gap-8 px-6 pb-14 pt-28 sm:px-12 lg:px-24">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.35em] text-sky-500/80">
            <span className="h-px w-10 bg-sky-500/50" />
            <span>Open Source AGI Lab</span>
          </div>
          <h1
            style={{ transform: `translateY(${titleLift}px)` }}
            className="max-w-3xl text-left text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Kira.id Intelligence
          </h1>
          <p
            style={{ transform: `translateY(${subtitleLift}px)` }}
            className="max-w-2xl text-left text-lg leading-relaxed text-zinc-600 sm:text-xl"
          >
            We are open-source research focusing on solving Artificial General
            Intelligence and making it useful one step at a time. We promote
            open-source, self-hosting, and shipping demos that help everyone
            reason with smarter tooling.
          </p>
        </div>
      </div>
    </section>
  );
}
