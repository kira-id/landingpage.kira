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
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {mockRepos.map((repo, index) => (
            <Card
              key={repo.name}
              className="group relative overflow-hidden border-zinc-200/80 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-100/40 via-transparent to-violet-100/40" />
              </div>
              <CardHeader className="relative z-10 gap-3">
                <CardTitle className="flex items-start justify-between text-left text-lg font-semibold text-zinc-900">
                  <span className="flex-1 pr-2">{repo.name}</span>
                  <Badge
                    variant="secondary"
                    className="border-transparent bg-sky-100 text-xs text-sky-700"
                  >
                    {repo.highlight}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-left text-sm text-zinc-600">
                  {repo.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-5 text-sm text-zinc-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="size-4 text-amber-500" />
                    {repo.stars.toLocaleString()} stars
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <GitBranch className="size-4 text-sky-500" />
                    {repo.forks.toLocaleString()} forks
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-zinc-200/80 text-xs font-medium text-zinc-600"
                  >
                    {repo.language}
                  </Badge>
                  {repo.tags.map((tag) => (
                    <Badge
                      key={`${repo.name}-${tag}`}
                      variant="outline"
                      className="border-transparent bg-zinc-100 text-xs font-medium text-zinc-700"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="relative z-10 border-t border-dashed border-zinc-200/80 pt-5">
                <a
                  href={repo.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition-colors hover:text-sky-700"
                >
                  View on GitHub
                  <ArrowUpRight className="size-4" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
