"use client";

import Image from "next/image";

import PolygonAnimation from "@/components/polygon-animation";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/30 to-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_70%)]" />
        <div className="absolute left-1/2 top-[45%] h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.14),_rgba(255,255,255,0))] blur-[140px]" />
        <div className="absolute right-[12%] top-[18%] h-[18rem] w-[18rem] rounded-full bg-[conic-gradient(from_45deg,_rgba(14,165,233,0.1),_rgba(99,102,241,0.16),_rgba(59,130,246,0.05))] blur-3xl" />
        <div className="absolute left-[8%] bottom-[10%] h-[22rem] w-[24rem] rounded-[46%] bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.12),_rgba(255,255,255,0))] blur-[120px]" />
      </div>
      <div className="flex min-h-screen flex-col justify-start gap-20 pb-32 pt-0">
        <PolygonAnimation
          variant="bare"
          className="h-[80vh] min-h-[540px] w-[120vw] -ml-[10vw] sm:h-[82vh] sm:w-[112vw] sm:-ml-[6vw] md:h-[86vh] md:w-[106vw] md:-ml-[3vw] lg:h-[90vh] lg:w-[104vw] lg:-ml-[2vw]"
        />
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center sm:px-12">
          <div className="flex items-center gap-4 rounded-full border border-sky-100/60 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-600/70 shadow-sm backdrop-blur">
            <Image
              src="/kira.svg"
              alt="Kira logo"
              width={48}
              height={48}
              className="h-10 w-10"
            />
            Collective
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Kira.id Intelligence
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
            and making it useful one step at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
