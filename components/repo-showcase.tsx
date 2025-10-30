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

type RepoSummary = {
  full_name?: string;
  description?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  language?: string | null;
  html_url?: string;
  topics?: string[];
  pushed_at?: string | null;
  archived?: boolean;
  fork?: boolean;
};

const stripYamlScalar = (value: string): string => {
  const trimmed = value.trim();

  const commentIndex = trimmed.indexOf(" #");
  const withoutComment = commentIndex === -1 ? trimmed : trimmed.slice(0, commentIndex).trim();

  if (
    (withoutComment.startsWith('"') && withoutComment.endsWith('"')) ||
    (withoutComment.startsWith("'") && withoutComment.endsWith("'"))
  ) {
    return withoutComment.slice(1, -1).trim();
  }

  return withoutComment;
};

const parseRepoNames = (yaml: string): string[] => {
  const names: string[] = [];

  for (const rawLine of yaml.split("\n")) {
    const line = rawLine.trim();

    if (!line.startsWith("-")) {
      continue;
    }

    const entryBody = line.slice(1).trim();

    if (!entryBody) {
      continue;
    }

    if (entryBody.startsWith("name")) {
      const separatorIndex = entryBody.indexOf(":");
      if (separatorIndex === -1) {
        continue;
      }

      const rawValue = entryBody.slice(separatorIndex + 1);
      const parsed = stripYamlScalar(rawValue);
      if (parsed.length > 0) {
        names.push(parsed);
      }
      continue;
    }

    const parsed = stripYamlScalar(entryBody);
    if (parsed.length > 0) {
      names.push(parsed);
    }
  }

  return names;
};

const buildHighlight = (repo: RepoSummary): string => {
  if (repo.archived) {
    return "Archived";
  }

  if (repo.fork) {
    return "Fork";
  }

  const stars = repo.stargazers_count ?? 0;
  if (stars >= 1000) {
    return "Trending";
  }

  if (repo.pushed_at) {
    const pushedAt = new Date(repo.pushed_at);
    if (!Number.isNaN(pushedAt.getTime())) {
      const timeSincePush = Date.now() - pushedAt.getTime();
      const fourteenDays = 14 * 24 * 60 * 60 * 1000;
      if (timeSincePush <= fourteenDays) {
        return "Fresh";
      }
    }
  }

  if (stars >= 100) {
    return "Popular";
  }

  return "Active";
};

const buildTags = (repo: RepoSummary): string[] => {
  if (Array.isArray(repo.topics) && repo.topics.length > 0) {
    return repo.topics.slice(0, 6);
  }

  const fallbackTags = new Set<string>();

  if (repo.language) {
    fallbackTags.add(repo.language);
  }

  if ((repo.stargazers_count ?? 0) >= 1000) {
    fallbackTags.add("Trending");
  }

  if (repo.fork) {
    fallbackTags.add("Fork");
  }

  if (!repo.archived) {
    fallbackTags.add("Active");
  }

  return Array.from(fallbackTags);
};

const githubHeaders = () => {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "kiraid-landingpage",
  };

  const token =
    process.env.GITHUB_TOKEN ?? process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const fetchRepoDetails = async (repoName: string): Promise<Repo | null> => {
  const apiUrl = `https://api.github.com/repos/${repoName}`;

  try {
    const response = await fetch(apiUrl, {
      headers: githubHeaders(),
      next: { revalidate: 60 * 30 },
    });

    if (!response.ok) {
      console.error(
        `[RepoShowcase] Failed to fetch metadata for ${repoName}: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const repoSummary = (await response.json()) as RepoSummary;

    return {
      name: repoSummary.full_name ?? repoName,
      description:
        (repoSummary.description && repoSummary.description.trim()) ||
        "No description provided.",
      stars: repoSummary.stargazers_count ?? 0,
      forks: repoSummary.forks_count ?? 0,
      language: repoSummary.language ?? "Unknown",
      highlight: buildHighlight(repoSummary),
      href: repoSummary.html_url ?? `https://github.com/${repoName}`,
      tags: buildTags(repoSummary),
    };
  } catch (error) {
    console.error(
      `[RepoShowcase] Unexpected error while fetching ${repoName}:`,
      error
    );
    return null;
  }
};

const loadRepos = cache(async (): Promise<RepoLoadResult> => {
  const repoDataUrl =
    process.env.REPO_DATA_URL ??
    process.env.NEXT_PUBLIC_REPO_DATA_URL ??
    "./data/repos.yaml";

  let errorMessage: string | undefined;
  let yamlSource: string | null = null;

  if (repoDataUrl.startsWith("http://") || repoDataUrl.startsWith("https://")) {
    try {
      const response = await fetch(repoDataUrl, {
        next: { revalidate: 60 * 30 },
      });

      if (!response.ok) {
        errorMessage =
          "We couldn't refresh the latest repository highlights just now. Showing the saved list instead.";
      } else {
        yamlSource = await response.text();
      }
    } catch (error) {
      console.error("[RepoShowcase] Unable to load repos from remote source:", error);
      errorMessage =
        "We couldn't reach the live repository showcase. You're seeing the saved list for now.";
    }
  }

  if (!yamlSource) {
    const filePath = repoDataUrl.startsWith("/")
      ? repoDataUrl
      : join(process.cwd(), repoDataUrl);

    yamlSource = await readFile(filePath, "utf8");
  }

  const repoNames = parseRepoNames(yamlSource);

  if (repoNames.length === 0) {
    return {
      repos: [],
      errorMessage:
        errorMessage ??
        "No repositories are configured for the showcase just yet.",
    };
  }

  const repoResults = await Promise.all(repoNames.map(fetchRepoDetails));
  const repos = repoResults.filter((repo): repo is Repo => repo !== null);

  if (repos.length === 0) {
    return {
      repos,
      errorMessage:
        errorMessage ??
        "We couldn't load the repository showcase right now. Please try again shortly.",
    };
  }

  if (repos.length < repoNames.length && !errorMessage) {
    errorMessage =
      "Some repositories are temporarily unavailable. Showing everything else for now.";
  }

  return {
    repos,
    errorMessage,
  };
});

export default async function RepoShowcase() {
  const { repos, errorMessage } = await loadRepos();
  return <RepoShowcaseClient repos={repos} errorMessage={errorMessage} />;
}
