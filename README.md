# falola.is-a.dev

Personal portfolio for Falola Olufemi Adedeji — full-stack engineer moving into
AI engineering. Next.js 16 (App Router), TypeScript, Tailwind CSS.

Live at **[falola.is-a.dev](https://falola.is-a.dev)**.

## Editorial rules

These are the constraints the site is built to. They matter more than the code.

1. **Six sections, no more.** Hero, Selected work, Experience, Focus, About,
   Contact. Every addition has to displace something, not append to it.
2. **No unverifiable numbers.** Every metric names the engagement it came from
   (see `headlineMetrics` and `CaseStudy.metrics` in `data/portfolio-data.ts`,
   where `source` is a required field). No aggregate satisfaction scores, no
   self-rated skill percentages, nothing that can't be defended in an interview.
3. **In-progress work is labelled in-progress.** The Focus section states what's
   being learned rather than implying it's mastered.
4. **Nothing ships that only exists as a placeholder.** No "coming soon" posts.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint (flat config; `next lint` was removed in Next 16)
```

## Environment

The contact form posts to [Web3Forms](https://web3forms.com) through an internal
route, so the access key never reaches the browser.

```
WEB3FORMS_ACCESS_KEY=your_key_here
```

Without it, `/api/contact` returns a 503 and a friendly message; the page still
offers the direct mailto fallback.

## Structure

```
app/
├── layout.tsx            # Metadata, fonts, JSON-LD, blocking theme script
├── page.tsx              # Section composition
├── globals.css           # Design tokens + component/utility layers
├── icon.tsx              # Favicon, generated via next/og
├── favicon.ico           # Static fallback so /favicon.ico doesn't 404
├── opengraph-image.tsx   # Social card, generated at build time
├── sitemap.ts, robots.ts
└── api/contact/route.ts  # Validates, then forwards to Web3Forms
components/
├── Nav, Hero, Work, Experience, Focus, About, Contact, Footer
├── Section.tsx           # Shared section chrome (eyebrow, heading, rule)
├── Reveal.tsx            # Scroll reveal — fails open, respects reduced motion
├── ThemeToggle.tsx       # Stateless; reads/writes the html.dark class
└── icons.tsx             # Inlined brand marks (lucide-react dropped them)
data/portfolio-data.ts    # All copy and content lives here
types/index.ts            # Content types
```

## Notable implementation details

- **No theme flash.** The `dark` class is set by a blocking inline script in
  `<head>` before first paint, not in an effect. `ThemeToggle` holds no state and
  swaps its icon with `dark:` variants, so it can't disagree with the DOM.
- **Reveals fail open.** `Reveal` uses CSS transitions rather than keyframes (a
  transition that never runs lands on its end value; a keyframe starting at
  `opacity: 0` freezes there), hides only under `motion-safe`, and has a 1.2s
  failsafe. Content can't get stranded invisible.
- **Content is data, not markup.** Copy lives in `data/portfolio-data.ts`, so
  editing the site doesn't mean editing components.
- **Generated OG card.** `app/opengraph-image.tsx` builds the social card from
  the same data as the page, so the two can't drift. No remote fonts, so it
  builds offline.

## Contact

- Email: femi.deji0@gmail.com
- GitHub: [github.com/falola13](https://github.com/falola13)
- LinkedIn: [falola-olufemi](https://www.linkedin.com/in/falola-olufemi-87292625b)
