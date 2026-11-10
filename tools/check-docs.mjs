// The documentation comes in English and Spanish: every `name.md` has its `name.es.md` (or `name.en.md`, for one
// written in Spanish first) next to it, the two link to each other, and their relative links lead to files that
// exist. Runs in CI before the build (`node tools/check-docs.mjs`); exits with 1 and says what is wrong.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
// Not documentation of the site: hidden folders, dependencies and build output.
const SKIP_DIRS = new Set(["node_modules", "dist"]);
const SKIP_FILES = /^(CLAUDE|LICENSE.*|CHANGELOG.*)\.md$/;

function docs(dir = root) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const path = join(dir, e.name);
    if (e.isDirectory()) return e.name.startsWith(".") || SKIP_DIRS.has(e.name) ? [] : docs(path);
    return e.name.endsWith(".md") && !SKIP_FILES.test(e.name) ? [relative(root, path).split("\\").join("/")] : [];
  });
}

const all = docs();
const translation = /\.(es|en)\.md$/;
const twins = (file) =>
  translation.test(file) ? [file.replace(translation, ".md")] : [file.replace(/\.md$/, ".es.md"), file.replace(/\.md$/, ".en.md")];
const links = (file) =>
  [...readFileSync(join(root, file), "utf8").matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1]).filter((l) => !/^(#|mailto:)/.test(l));

const problems = [];
for (const file of all) {
  const twin = twins(file).find((t) => all.includes(t));
  if (!twin) {
    problems.push(`${file} has no translation: add ${twins(file).join(" or ")}`);
    continue;
  }
  if (!links(file).some((l) => l.split("#")[0].endsWith(basename(twin)))) problems.push(`${file} should link to ${twin} at the top`);
  for (const link of links(file)) {
    if (/^[a-z]+:/i.test(link)) continue;
    const target = join(dirname(file), decodeURIComponent(link.split("#")[0]));
    if (!existsSync(join(root, target))) problems.push(`${file}: ${link} leads nowhere`);
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`${all.length} documents, each with its other language`);
