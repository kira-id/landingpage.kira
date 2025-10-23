"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.05),_transparent_65%)]" />
        <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.15),_rgba(255,255,255,0))] blur-3xl" />
        <div className="absolute right-[12%] top-[18%] h-64 w-64 rounded-full bg-[conic-gradient(from_45deg,_rgba(14,165,233,0.1),_rgba(99,102,241,0.2),_rgba(59,130,246,0.05))] blur-2xl" />
        <div className="absolute left-[8%] bottom-[12%] h-72 w-72 rounded-[48%] bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.12),_rgba(255,255,255,0))] blur-2xl" />
      </div>
      <div className="mx-auto flex min-h-[72vh] max-w-6xl flex-col items-center justify-start gap-10 px-6 pb-20 pt-24 sm:px-12 lg:px-24">
        <div className="flex items-center gap-4">
          <Image
            src="/kira.svg"
            alt="Kira logo"
            width={64}
            height={64}
            className="h-14 w-14 drop-shadow-md"
          />
        </div>
        <div className="flex flex-col items-center gap-7 text-center">
          <h1 className="mx-auto max-w-3xl text-center text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Kira.id Intelligence
          </h1>
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-zinc-600 sm:text-xl">
            We are
            {" "}
            <span className="relative inline-flex items-center rounded-full bg-gradient-to-r from-sky-100 via-sky-200 to-sky-100 px-2 py-0.5 text-base font-semibold text-sky-700">
              open-source
            </span>
            {" "}
            research focusing on solving
            {" "}
            <span className="relative inline-flex items-center rounded-full bg-gradient-to-r from-violet-100 via-fuchsia-100 to-rose-100 px-2 py-0.5 text-base font-semibold text-violet-700">
              Artificial General Intelligence
            </span>
            {" "}
            and making it useful one step at a time
          </p>
        </div>
        <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/40 bg-white/70 shadow-lg shadow-sky-100/30 backdrop-blur-sm">
          <Image
            src="/header.png"
            alt="Kira open-source AGI lab"
            width={2560}
            height={1498}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
