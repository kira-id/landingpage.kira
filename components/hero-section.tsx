
"use client";

import Image from "next/image";

import PolygonAnimation from "@/components/polygon-animation";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 py-16 sm:px-12 lg:px-24">
      <PolygonAnimation
        variant="bare"
        className="pointer-events-auto absolute inset-0 h-full w-full opacity-90"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden sm:flex items-center justify-between border-b border-white/15 bg-white/15 px-10 py-4 shadow-sm shadow-sky-100/10 backdrop-blur-md">
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

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 text-center pointer-events-none rounded-[2.5rem] border border-white/15 bg-white/15 px-14 py-14 shadow-xl shadow-sky-100/5 backdrop-blur-sm">
        <Image
          src="/kira.svg"
          alt="Kira logo"
          width={40}
          height={40}
          className="h-10 w-10 drop-shadow-xl sm:hidden"
        />
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
          and making it useful, safe and accessible to everyone
        </p>
      </div>
    </section>
  );
}


