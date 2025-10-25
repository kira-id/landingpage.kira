"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowUpRight, GitBranch, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Repo } from "./repo-showcase";

type RepoShowcaseClientProps = {
  repos: Repo[];
  errorMessage?: string;
};

export function RepoShowcaseClient({
  repos,
  errorMessage,
}: RepoShowcaseClientProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion = window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const isSmallViewport = window.matchMedia("(max-width: 768px)").matches;

    if (prefersReducedMotion || isSmallViewport) {
      // Skip the entrance animation when motion is reduced or on small screens.
      setIsVisible(true);
    }

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -20%",
      }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pb-32 pt-16 sm:pt-24"
      data-repo-visible={isVisible ? "true" : "false"}
    >
      <div className="mx-auto flex w-full flex-col gap-14 px-8 sm:px-14 lg:px-28">
        {errorMessage ? (
          <div className="rounded-2xl border border-amber-300/80 bg-amber-50/80 p-4 text-sm font-medium text-amber-800 shadow-sm shadow-amber-200/60">
            {errorMessage}
          </div>
        ) : null}
        <div className="grid grid-cols-1 gap-16 md:auto-rows-fr md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {repos.map((repo, index) => (
            <div
              key={repo.name}
              className="repo-card group relative h-full"
              style={{ animationDelay: `${index * 110}ms` }}
            >
              <Card className="relative z-10 flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/80 p-7 shadow-[0_24px_80px_-50px_rgba(37,99,235,0.45)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_48px_120px_-60px_rgba(14,165,233,0.65)] sm:p-8">
                <div className="pointer-events-none absolute inset-px rounded-[26px] bg-gradient-to-br from-sky-50 via-white to-indigo-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <CardHeader className="relative z-10 flex flex-col gap-6 p-0">
                  <div className="flex items-start justify-between gap-4">
                    <Badge className="rounded-full border border-sky-200/70 bg-sky-500/10 px-3 py-[6px] text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                      {repo.highlight}
                    </Badge>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-sm font-medium text-slate-600">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {repo.language}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <CardTitle className="text-left text-2xl font-semibold text-slate-900">
                      {repo.name}
                    </CardTitle>
                    <CardDescription className="text-left text-base leading-relaxed text-slate-600">
                      {repo.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 flex flex-col gap-6 p-0">
                  <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm shadow-slate-200/60">
                      <div className="flex items-center justify-between text-sm font-medium text-slate-500">
                        Stars
                        <Star className="size-5 text-amber-500" />
                      </div>
                      <p className="mt-2 text-2xl font-semibold text-slate-900">
                        {repo.stars.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm shadow-slate-200/60">
                      <div className="flex items-center justify-between text-sm font-medium text-slate-500">
                        Forks
                        <GitBranch className="size-5 text-sky-500" />
                      </div>
                      <p className="mt-2 text-2xl font-semibold text-slate-900">
                        {repo.forks.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {repo.tags.map((tag) => (
                      <span
                        key={`${repo.name}-${tag}`}
                        className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-sm font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="relative z-10 mt-auto flex items-center justify-between gap-4 p-0">
                  <span className="text-sm font-medium text-slate-500">
                    Focus: {repo.tags[0] ?? repo.language}
                  </span>
                  <a
                    href={repo.href}
                    className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
                  >
                    View on GitHub
                    <ArrowUpRight className="size-4" />
                  </a>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
