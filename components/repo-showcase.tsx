import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cache } from "react";

import { RepoShowcaseClient } from "./repo-showcase-client";

export type Repo = {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  highlight: string;
  href: string;
  tags: string[];
};

type RepoLoadResult = {
  repos: Repo[];
  errorMessage?: string;
};

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

const loadRepos = cache(async (): Promise<RepoLoadResult> => {
  const repoDataUrl =
    process.env.REPO_DATA_URL ??
    process.env.NEXT_PUBLIC_REPO_DATA_URL ??
    "./data/repos.yaml";

  let errorMessage: string | undefined;

  if (repoDataUrl.startsWith("http://") || repoDataUrl.startsWith("https://")) {
    try {
      const response = await fetch(repoDataUrl, {
        next: { revalidate: 60 * 30 }, // refresh remote data twice per hour
      });

      if (!response.ok) {
        errorMessage =
          "We couldn't refresh the latest repository highlights just now. Showing the saved list instead.";
      } else {
        const yaml = await response.text();
        return {
          repos: parseRepoYaml(yaml),
          errorMessage,
        };
      }
    } catch (error) {
      console.error("[RepoShowcase] Unable to load repos from R2:", error);
      errorMessage =
        "We couldn't reach the live repository showcase. You're seeing the saved list for now.";
    }
  }

  const filePath = repoDataUrl.startsWith("/")
    ? repoDataUrl
    : join(process.cwd(), repoDataUrl);

  const fallbackYaml = await readFile(filePath, "utf8");
  return {
    repos: parseRepoYaml(fallbackYaml),
    errorMessage,
  };
});

export default async function RepoShowcase() {
  const { repos, errorMessage } = await loadRepos();
  return <RepoShowcaseClient repos={repos} errorMessage={errorMessage} />;
}
