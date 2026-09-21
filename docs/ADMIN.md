# Admin and résumé PDF

Everything on the site and the résumé is edited at **[/admin](https://falola.is-a.dev/admin)**
(it redirects to `/keystatic`). There is no database: the admin is
[Keystatic](https://keystatic.com), and saving commits the change straight to
`content/*.json` in this repo. Vercel deploys the commit, and a GitHub Action
rebuilds `public/resume.pdf` from it.

```
/admin ── Save ──▶ commit to content/*.json on main
                       │
                       ├──▶ Vercel deploys the site           (~1 min)
                       └──▶ Action renders + checks resume.pdf,
                            commits it if it changed ──▶ Vercel deploys again (~3 min)
```

For the few minutes between those two deploys, the site shows the new content
and the PDF still shows the old. That's expected.

## Who can edit

Logging in goes through a GitHub App, and only accounts with **write access to
`falola13/falola-portfolio`** can save. The admin page itself is publicly
reachable (and disallowed in `robots.txt`); without repo access it can't read
or write anything.

## One-time setup (production)

Until this is done, `/admin` on the live site shows an error. **The rest of the
site is unaffected**: the build does not need these secrets.

1. Temporarily add this line to `.env.local`:

   ```
   NEXT_PUBLIC_KEYSTATIC_STORAGE=github
   ```

2. Run `npm run dev` and open http://localhost:3000/keystatic. Keystatic only
   allows GitHub App creation in development, which is why this runs locally.
3. Follow the prompt to create a GitHub App. When it asks for a **deployed URL**,
   enter `https://falola.is-a.dev` so login also works in production.
4. Keystatic writes these to `.env` (already git-ignored, so they can't be
   committed):

   ```
   KEYSTATIC_GITHUB_CLIENT_ID
   KEYSTATIC_GITHUB_CLIENT_SECRET
   KEYSTATIC_SECRET
   NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
   ```

5. When prompted, **install the app on `falola13/falola-portfolio`** only.
6. In Vercel → Project → Settings → Environment Variables, add all four for
   **Production**, then redeploy.
7. Remove the `NEXT_PUBLIC_KEYSTATIC_STORAGE` line from `.env.local`.

Then log in at https://falola.is-a.dev/admin.

If `main` is protected by a rule that requires pull requests, both the admin's
saves and the Action's PDF commits will be rejected. Either allow direct pushes
for your account and `github-actions[bot]`, or tell Keystatic to use branches.

## Editing locally

`npm run dev`, then http://localhost:3000/admin. In development the admin
writes to the local files instead of GitHub, and you commit them yourself.

## The résumé PDF

`public/resume.pdf` is rendered from the `/resume` page and should **never be
edited by hand**. The Action overwrites it.

| Command | What it does |
| --- | --- |
| `npm run resume:pdf` | Build, render the PDF, check it. The whole pipeline, locally. |
| `npm run resume:render` | Render only (needs an existing `next build`). |
| `npm run resume:check` | Check the current PDF. `RESUME_CHECK_DUMP=1` prints the extracted text. |

The first local run needs Chromium: `npx playwright install chromium`.

### The ATS check

There is no single "ATS standard"; Workday, Greenhouse, Lever, iCIMS and Taleo
all parse differently. `scripts/check-resume-pdf.mjs` extracts the PDF's text
the way a parser does and checks the failures they share:

- a real text layer, no ligatures or unmapped glyphs, no letter-spaced text
- name on the first line; email, phone and full URLs extractable
- location on the contact line, with no other place names beside it
- standard headings (Summary, Skills, Experience, Projects, Education,
  Certifications) that come out in reading order
- every role's title, company and bullets intact, with title and dates on one
  line and a plain hyphen in the date range
- every skill in the Skills section present as a keyword
- a tagged PDF; title and author set; two pages or fewer

**FAIL** blocks the Action, so a broken PDF never replaces a working one.
**WARN** is advice about the content and doesn't block. The two you're most
likely to hit:

- **Month and year at both ends**: write `Aug 2021 — Dec 2023`, not
  `Aug 2021 — 2023`.
- **Two pages or fewer**: the résumé currently fills both pages. Adding a role
  or bullet means trimming elsewhere.
