# Portfolio security review — 28 October 2026

Scope: portfolio source, lockfile (production and development dependencies), public files, contact route, response headers, CI installation and browser regression suite. No destructive exploit or production email spam test was performed. This is a scoped review, not a claim that the site is vulnerability-free.

## Findings and fixes

| Finding | Evidence / applicability | Resolution |
| --- | --- | --- |
| Critical advisory ranges in Next.js | Locked 16.3.7 matched GHSA-2464-fhr4-w9xw and GHSA-673q-mjm6-r5xr, plus lower-severity advisories. Deployment exploitation was not demonstrated. | Pin Next.js and eslint-config-next to 16.4.3; lockfile resolves sharp 0.35.5. |
| High advisory in transitive Zod | GHSA-mrhx-c7xc-m3w5; installed through ESLint tooling, not imported by the contact endpoint. | Lockfile now resolves Zod 4.6.7. |
| Contact body read before size enforcement | Previous request.json() read an arbitrary body before checking field lengths. | Enforce an 8 KiB declared and streamed byte limit before parsing; reject unsupported media types. |
| Contact cross-site submissions and email control characters | Public POST endpoint lacked an Origin/Fetch Metadata gate. | Reject mismatched Origin / cross-site requests; reject CR/LF/NUL in name and email. These gates do not authenticate direct HTTP callers. |
| No email submission budget | Honeypot and retry idempotency alone did not bound delivery attempts. | Add a bounded per-instance 20/minute delivery budget and Retry-After. See residual limitation below. |
| Missing browser hardening headers | No application-level policy in next.config.ts. | Add nosniff, frame denial, restricted referrer/permissions policy and baseline CSP; remove X-Powered-By; explicitly disable SVG optimization and remote image sources. |
| CI dependency drift / no audit gate | CI used npm install without a security audit. | Use npm ci, fail on high/critical audit findings, and configure weekly Dependabot PRs for npm and Actions. |

## Source inspection

No use-cache functions, Server Actions, ImageResponse, remote image configuration, user-controlled HTML injection, SQL layer, upload endpoint or authentication system was found. The theme initializer is a fixed literal script. Contact uses plain-text email and a fixed provider endpoint and recipient. Secrets remain server-side; the tracked-source credential-pattern scan found no matches. Public files contain only intended portfolio images and resumes. This scan does not certify historical commits, provider accounts or all possible secret formats.

## Verification

- npm audit after install: zero known vulnerabilities across the audited dependency tree.
- Production build, lint, content, internal routes and core contrast checks passed locally.
- Regression suite includes page accessibility, mobile navigation, themes, PDFs and contact behavior, plus new header, cross-site, content-type, oversized-body and CR/LF rejection checks.
- Production verification uses benign rejected requests only; no test messages are sent to the inbox.

## Residual limits

The delivery budget is local to each warm serverless instance and resets on cold starts. On 29 October a targeted Vercel WAF rule was published for the ^/api/contact/?$ path expression: fixed-window 5 requests per 60 seconds per IP, returning 429. This shares counters across application instances within a Vercel region; IP rotation, multiple regions and fixed-window boundaries remain limitations. Origin headers can be forged by non-browser clients. CSP permits inline scripts/styles for the current static Next.js output; it provides framing/resource restrictions, not a strict nonce-based XSS guarantee. A strict nonce policy would need a deliberate rendering change. Platform account access, WAF configuration, historical compromise and external project security were outside this portfolio review.

## Advisory references

- https://nextjs.org/blog/nextjs-security-update-october-14-2026
- https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw
- https://github.com/vercel/next.js/security/advisories/GHSA-673q-mjm6-r5xr
- https://github.com/advisories/GHSA-mrhx-c7xc-m3w5
