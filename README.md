# Kushagra Pandey Portfolio

A Next.js/TypeScript engineering portfolio built around evidence and career context. It presents enterprise infrastructure experience, Azure certifications and software projects through experience pages, project case studies and an online resume.

## Live portfolio

https://kushagra-portfolio-plum.vercel.app/

## HCLTech project timeline

| Period | Assignment | Focus |
| --- | --- | --- |
| Dec 2024 – Oct 2025 | Ericsson · Rhythm Team · L1.5 Infrastructure Support | Linux / Windows server troubleshooting, AWS / Azure portal checks, BHOM, PuTTY / SSH, RDP, incident escalation and MFL control coordination with two team members. |
| Nov 2025 – Present | Benchmark Electronics · ICC · Shift Lead | Operational go-live support, SOP creation, shift coverage and handovers, ICC technical-team communication groups, alert / ticket coordination and customer interaction. |

Assignment details are maintained centrally in `data/profile.ts` and shown on the homepage, Experience page and online resume.

## Repository evidence

The linked [Devops-Learning](https://github.com/kushagrapandey-cmd/Devops-Learning) repository includes CloudOps Sentinel: Linux diagnostics, a Python health API, Docker/Kubernetes configuration, GitHub Actions recovery drills and a Linux VM workbench. The public demo is a simulation; kind CI evidence is distinct from optional, unverified Azure deployment scripts. The existing `/labs/linux-learning/` route is retained for shared links.

The application showcase includes [MediConnect](https://github.com/kushagrapandey-cmd/mediconnect), [YTGuide](https://github.com/kushagrapandey-cmd/First_ML_project) and [WWW-of-Anime](https://github.com/kushagrapandey-cmd/WWW-of-Anime). Read each repository's current architecture and verification notes for its implemented scope.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS 4
- Vercel-compatible serverless contact API
- Playwright route and interaction tests
- axe-core accessibility checks
- GitHub Actions CI

## Local development

```bash
npm install
npm run dev
```

The contact form uses a server-side route and Resend. Create `.env.local` from `.env.example` and add a Resend API key to test real email delivery locally. The API key is server-only and must never be exposed in client code.

## Contact form environment

```bash
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_TO_EMAIL=kushagrapandey102@gmail.com
RESEND_FROM_EMAIL="Kushagra Portfolio <onboarding@resend.dev>"
```

For Vercel, add the same variables under the project's Environment Variables settings. Once a custom sending domain is verified in Resend, replace `RESEND_FROM_EMAIL` with an address on that domain.

The `onboarding@resend.dev` sender can only deliver to the email address associated with the Resend account. For this contact form, that account address must be `kushagrapandey102@gmail.com`; otherwise verify a sending domain and configure `RESEND_FROM_EMAIL`. Visitor addresses are used as reply-to, never as the sender or destination. After adding Production variables, redeploy and test the actual form, then confirm the email's delivery status in Resend. A passing CI run uses simulated delivery and does not confirm inbox delivery.

## Quality checks

```bash
npm run validate
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser suite covers every public route at desktop and mobile sizes, automated accessibility checks, navigation state, theme persistence, the mobile menu, keyboard skip navigation, external-link behavior, horizontal overflow, LinkedIn URL correctness, contact-form success/error states and the custom 404 page.

## Content model

- `Professional` means used in documented work.
- `Certified` represents supplied certifications.
- `Project experience` is backed by public project repositories.
- Topic indexes alone do not establish implemented project experience.
- Unsupported metrics and stronger-than-evidence claims are excluded.

## Deployment

The app is configured as a normal Next.js deployment so Vercel can run the `/api/contact` serverless route. Do not switch back to `output: "export"` unless the contact form is moved to another backend.

### Portfolio interactions

- Native smooth anchor scrolling, a reading-progress line, section motion and hover feedback respect the visitor's reduced-motion preference.
- The home project showcase supports horizontal touch/trackpad scrolling, keyboard focus and previous/next buttons. Vertical page scrolling is never intercepted.
- A short, keyboard-accessible introduction expands below the hero summary.
- A subtle cursor trail runs only for fine mouse pointers, is capped at 24 particles and respects reduced motion. The floating Cursor trail switch disables it. There is no click audio or click ripple.
- Both themes use quiet gradients. Project cards and case studies include optimized screenshots captured from the live demos on 28 October 2026.
- Interaction regression coverage is in `tests/interactions.spec.ts` for desktop and mobile Chromium.
