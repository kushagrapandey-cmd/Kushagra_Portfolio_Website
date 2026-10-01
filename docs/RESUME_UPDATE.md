# Updating the resume

The portfolio exposes the downloadable resume from:

`public/resume/Kushagra_Pandey_Resume.pdf`

## Recommended owner-only workflow

GitHub repository write access is the access control. There is intentionally no password-only admin page in the static website because a client-side password would be visible to anyone who inspects the JavaScript.

1. Sign in to GitHub with the repository owner account.
2. Open `public/resume/Kushagra_Pandey_Resume.pdf`.
3. Replace/upload the PDF using the exact same filename.
4. Commit the replacement to `main`.
5. The public URL stays unchanged, so the React code does not need to change.
6. Confirm the CI workflow passes. If a deployment provider is connected to `main`, its normal deployment will publish the replacement.

For local Git usage:

```bash
npm run validate
npm run typecheck
npm run lint
npm run build
git add public/resume/Kushagra_Pandey_Resume.pdf
git commit -m "Update resume"
git push origin main
```

If the site later moves from static export to an authenticated backend, an owner dashboard can be added with real server-side authentication and object storage. Until then, GitHub permissions are the safer admin mechanism.
