import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const textFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", "out", "test-results", "playwright-report"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(tsx?|mjs|css|json|md|yml)$/.test(entry.name)) textFiles.push(full);
  }
}

walk(root);
const auditableRoots = ["app", "components", "data", "README.md"];
const auditableFiles = textFiles.filter((file) => {
  if (file.endsWith("scripts/validate-content.mjs")) return false;
  const relative = path.relative(root, file).replaceAll("\\", "/");
  return auditableRoots.some((entry) => relative === entry || relative.startsWith(`${entry}/`));
});
const combined = auditableFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
const forbidden = [
  { label: "potential internal employee identifier", pattern: /\b\d{8}\b/ },
  { label: "corporate email address", pattern: /@hcltech\.com/i },
  { label: "unsupported retention metric", pattern: /80%\s+retention/i },
  { label: "unsupported expertise claim", pattern: /expert in (azure|devops|kubernetes|terraform)/i },
  { label: "unsupported UHI implementation claim", pattern: /implemented UHI in India/i },
];
const requiredRoutes = [
  "app/page.tsx",
  "app/experience/page.tsx",
  "app/cloud/page.tsx",
  "app/work/page.tsx",
  "app/work/mediconnect/page.tsx",
  "app/work/riverflow/page.tsx",
  "app/work/ytguide/page.tsx",
  "app/labs/linux-learning/page.tsx",
  "app/about/page.tsx",
  "app/resume/page.tsx",
];

const errors = [];
for (const item of forbidden) {
  if (item.pattern.test(combined)) errors.push(`Forbidden content detected: ${item.label}`);
}
for (const route of requiredRoutes) {
  if (!fs.existsSync(path.join(root, route))) errors.push(`Missing route: ${route}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${auditableFiles.length} source/config files.`);
console.log("No sensitive internal identifiers or unsupported headline claims detected.");
console.log("All required portfolio routes are present.");
