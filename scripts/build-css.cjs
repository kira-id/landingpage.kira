#!/usr/bin/env node
const path = require("path");
const fs = require("fs/promises");
const { Scanner } = require("@tailwindcss/oxide");
const { compile } = require("@tailwindcss/node");

const projectRoot = process.cwd();
const sourcePath = path.join(projectRoot, "app", "tailwind.css");
const outputPath = path.join(projectRoot, "public", "styles.css");

const SOURCE_GLOBS = [
  "**/*.{js,jsx,ts,tsx,mdx}",
];

// Recursively walk the project to collect files that might contain Tailwind classes.
async function collectCandidateFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name.startsWith(".git") ||
        entry.name === ".next" ||
        entry.name === ".turbo"
      ) {
        continue;
      }
      files.push(...(await collectCandidateFiles(entryPath)));
    } else if (
      /\.(?:js|jsx|ts|tsx|mdx)$/.test(entry.name) &&
      entryPath !== outputPath
    ) {
      files.push(entryPath);
    }
  }

  return files;
}

async function buildCss() {
  const cssSource = await fs.readFile(sourcePath, "utf8");

  const scanner = new Scanner({
    sources: SOURCE_GLOBS.map((pattern) => ({
      base: projectRoot,
      pattern,
      negated: false,
    })),
  });

  const files = await collectCandidateFiles(projectRoot);
  const changed = [];

  for (const file of files) {
    const extension = path.extname(file).slice(1).toLowerCase() || "txt";
    const content = await fs.readFile(file, "utf8");
    changed.push({ file, content, extension });
  }

  const candidateSet = new Set(scanner.scanFiles(changed));

  const { build } = await compile(cssSource, {
    base: projectRoot,
    onDependency: () => {},
  });

  const css = build([...candidateSet]);
  await fs.writeFile(outputPath, css);

  console.log(
    `Tailwind CSS generated with ${candidateSet.size} candidates → ${path.relative(
      projectRoot,
      outputPath,
    )}`,
  );
}

buildCss().catch((error) => {
  console.error("Failed to build Tailwind CSS:", error);
  process.exitCode = 1;
});
