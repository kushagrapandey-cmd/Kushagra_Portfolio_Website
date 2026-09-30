import fs from "node:fs";
import path from "node:path";

function hexToRgb(hex) {
  const raw = hex.replace("#", "");
  return [0, 2, 4].map((offset) => parseInt(raw.slice(offset, offset + 2), 16) / 255);
}
function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((c) => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

const pairs = [
  ["dark primary", "#F4F7FA", "#0B0F14"],
  ["dark secondary", "#9CA9B8", "#0B0F14"],
  ["dark subtle", "#758292", "#0B0F14"],
  ["dark azure", "#38A9FF", "#0B0F14"],
  ["dark verified", "#65C18C", "#0B0F14"],
  ["dark learning", "#E0A84B", "#0B0F14"],
  ["dark project", "#AD96FF", "#0B0F14"],
  ["light primary", "#111820", "#F6F8FA"],
  ["light secondary", "#566474", "#F6F8FA"],
  ["light subtle", "#5F6F80", "#F6F8FA"],
  ["light azure", "#0067A8", "#F6F8FA"],
  ["light verified", "#1D6F42", "#F6F8FA"],
  ["light learning", "#795000", "#F6F8FA"],
  ["light project", "#6545B5", "#F6F8FA"],
];

const failures = [];
for (const [name, fg, bg] of pairs) {
  const ratio = contrast(fg, bg);
  if (ratio < 4.5) failures.push(`${name}: ${ratio.toFixed(2)}:1`);
  else console.log(`${name}: ${ratio.toFixed(2)}:1`);
}

const appDir = path.join(process.cwd(), "app");
const pageFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === "page.tsx") pageFiles.push(full);
  }
}
walk(appDir);

for (const file of pageFiles) {
  const content = fs.readFileSync(file, "utf8");
  const directH1 = (content.match(/<h1\b/g) || []).length;
  const usesPageHero = content.includes("<PageHero");
  const usesCaseStudy = content.includes("<CaseStudyLayout");
  if (directH1 === 0 && !usesPageHero && !usesCaseStudy) failures.push(`No h1 source found for ${path.relative(process.cwd(), file)}`);
}

if (failures.length) {
  console.error("Accessibility validation failed:\n" + failures.join("\n"));
  process.exit(1);
}
console.log(`WCAG AA contrast checks passed for ${pairs.length} core text/color combinations.`);
console.log(`Heading-source checks passed for ${pageFiles.length} routed pages.`);
