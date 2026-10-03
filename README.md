# Kushagra Pandey Portfolio

A Next.js/TypeScript engineering portfolio built around evidence and career context. Professional infrastructure experience, Azure certifications, current cloud/DevOps learning and earlier software-engineering projects are intentionally presented as separate evidence categories.

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
- `Currently learning` is presented as active development, not proficiency.
- Unsupported metrics and stronger-than-evidence claims are excluded.

## Deployment

The app is configured as a normal Next.js deployment so Vercel can run the `/api/contact` serverless route. Do not switch back to `output: "export"` unless the contact form is moved to another backend.
