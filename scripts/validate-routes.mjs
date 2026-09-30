import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceDirs = ["app", "components"];
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.tsx$/.test(entry.name)) files.push(full);
  }
}

for (const dir of sourceDirs) walk(path.join(root, dir));

function routeExists(route) {
  if (route === "/") return fs.existsSync(path.join(root, "app/page.tsx"));
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  return fs.existsSync(path.join(root, "app", clean, "page.tsx"));
}

const missing = new Set();
const hrefPattern = /href=[{]?['"](\/[^'"?#}]*)['"]/g;
for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(hrefPattern)) {
    const route = match[1];
    if (!routeExists(route)) missing.add(`${route} referenced by ${path.relative(root, file)}`);
  }
}

if (missing.size) {
  console.error([...missing].join("\n"));
  process.exit(1);
}

console.log(`Checked internal links across ${files.length} TSX files.`);
console.log("All literal internal routes resolve to an App Router page.");
