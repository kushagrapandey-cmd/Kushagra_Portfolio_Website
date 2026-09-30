# Kushagra Pandey Portfolio

A Next.js/TypeScript engineering portfolio built around evidence and career context. Professional infrastructure experience, Azure certifications, current cloud/DevOps learning and earlier software-engineering projects are intentionally presented as separate evidence categories.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS 4
- Static export
- Playwright route and interaction tests
- axe-core accessibility checks
- GitHub Actions CI

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run validate
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser suite covers every public route at desktop and mobile sizes, automated accessibility checks, navigation state, theme persistence, the mobile menu, keyboard skip navigation, external-link behavior, horizontal overflow and the custom static 404 page.

## Content model

- `Professional` means used in documented work.
- `Certified` represents supplied certifications.
- `Project experience` is backed by public project repositories.
- `Currently learning` is presented as active development, not proficiency.
- Unsupported metrics and stronger-than-evidence claims are excluded.

## Deployment

`next.config.ts` uses `output: "export"`, producing an `out/` directory suitable for static hosting. `staticwebapp.config.json` contains baseline security headers and 404 handling for Azure Static Web Apps when deployment is configured.
