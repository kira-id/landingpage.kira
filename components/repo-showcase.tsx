import { readFileSync } from "node:fs";
import { join } from "node:path";

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

type Repo = {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  highlight: string;
  href: string;
  tags: string[];
};

const repoYaml = readFileSync(
  join(process.cwd(), "data/repos.yaml"),
  "utf8"
);

const parseYamlValue = (rawValue: string): string | number | string[] => {
  const value = rawValue.trim();

  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  const numeric = Number(value);
  if (!Number.isNaN(numeric) && numeric.toString() === value) {
    return numeric;
  }

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
};

const parseRepoYaml = (yaml: string): Repo[] => {
  const lines = yaml.split("\n");
  const repos: Repo[] = [];
  let current: Partial<Repo> | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.length === 0) {
      continue;
    }

    if (line.startsWith("- ")) {
      if (current) {
        repos.push({
          ...current,
          stars: Number(current.stars ?? 0),
          forks: Number(current.forks ?? 0),
          tags: Array.isArray(current.tags) ? current.tags : [],
        } as Repo);
      }

      current = {};
      const remainder = line.slice(2).trim();
      if (remainder.length > 0) {
        const separatorIndex = remainder.indexOf(":");
        if (separatorIndex !== -1) {
          const key = remainder.slice(0, separatorIndex).trim();
          const value = remainder.slice(separatorIndex + 1).trim();
          (current as Record<string, unknown>)[key] = parseYamlValue(value);
        }
      }

      continue;
    }

    if (!current) {
      continue;
    }

    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    (current as Record<string, unknown>)[key] = parseYamlValue(value);
  }

  if (current) {
    repos.push({
      ...current,
      stars: Number(current.stars ?? 0),
      forks: Number(current.forks ?? 0),
      tags: Array.isArray(current.tags) ? current.tags : [],
    } as Repo);
  }

  return repos;
};

const mockRepos = parseRepoYaml(repoYaml);

export default function RepoShowcase() {
  return (
    <section className="bg-white pb-24 pt-10 sm:pt-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 sm:px-12 lg:px-24">
        <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {mockRepos.map((repo, index) => (
            <div
              key={repo.name}
              className="group relative h-full animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl bg-sky-100/45 blur-3xl opacity-0 transition-all duration-500 group-hover:opacity-100" />
              <Card className="relative z-10 flex h-full flex-col overflow-hidden rounded-2xl border border-sky-100/70 bg-white py-4 shadow-lg shadow-sky-100/40 transition-all duration-500 hover:-translate-y-2 hover:border-sky-200 hover:shadow-2xl">
                <CardHeader className="relative z-10 gap-2 border-b border-sky-100/40 bg-white pb-3">
                  <CardTitle className="flex items-start justify-between text-left text-base font-semibold text-zinc-900">
                    <span className="flex-1 pr-2 leading-snug">{repo.name}</span>
                    <Badge
                      variant="secondary"
                      className="border-sky-200/70 bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-700 shadow-sm shadow-sky-100/60"
                    >
                      {repo.highlight}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-left text-xs text-zinc-600">
                    {repo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 flex flex-1 flex-col gap-2 bg-white px-4 pb-4 pt-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500">
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/60 bg-white/80 px-2.5 py-0.5 text-zinc-600 shadow-sm shadow-sky-100/40">
                      <Star className="size-3.5 text-amber-500" />
                      {repo.stars.toLocaleString()} stars
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/60 bg-white/80 px-2.5 py-0.5 text-zinc-600 shadow-sm shadow-sky-100/40">
                      <GitBranch className="size-3.5 text-sky-500" />
                      {repo.forks.toLocaleString()} forks
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge
                      variant="outline"
                      className="border-sky-200/70 bg-white/70 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-700 shadow-sm shadow-sky-100/60"
                    >
                      {repo.language}
                    </Badge>
                    {repo.tags.map((tag) => (
                      <Badge
                        key={`${repo.name}-${tag}`}
                        variant="outline"
                        className="border-white/40 bg-white/70 px-2 py-0.5 text-[11px] font-medium text-zinc-700 shadow-sm shadow-sky-100/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="relative z-10 mt-auto border-t border-sky-100/40 bg-white px-4 pb-4 pt-3">
                  <a
                    href={repo.href}
                    className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50/70 px-3.5 py-1.5 text-xs font-semibold text-sky-700 transition-all hover:bg-sky-100 hover:text-sky-800"
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
