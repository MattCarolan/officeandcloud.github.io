# OfficeAndCloud — marketing site

The launch / private-preview marketing site for **OfficeAndCloud**, the control
plane for the world's digital workforce: a single platform to deploy, govern,
monitor, secure and audit AI employees — wherever they run (local, on-prem, AWS,
Azure, GCP, Kubernetes, Docker, private and hybrid cloud).

> **Don't manage AI. Manage your digital workforce.**

This is a production-style, fully responsive, dark-mode marketing site built to a
Linear / Vercel / Stripe quality bar. All product imagery is rendered with
HTML/CSS/SVG — there are no bitmap screenshots or stock photos.

---

## Stack

- **Next.js 14** (App Router) + **React 18**
- **TypeScript**
- **Tailwind CSS** (custom design tokens)
- **Framer Motion** (scroll reveals, the animated control-plane visual, interactive guardrails)
- **lucide-react** for iconography
- Self-hosted Google fonts via `next/font` — Space Grotesk (display), Inter (body), JetBrains Mono (data/telemetry)

No external state, CSS, or UI libraries beyond the above.

---

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

### Other scripts

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # next lint
```

> **Note:** this project uses the `@/*` path alias (configured in `tsconfig.json`),
> so imports look like `@/components/Hero` and `@/lib/content`.

---

## Project structure

```
app/
  layout.tsx        # fonts, SEO metadata, ambient background, <html> shell
  page.tsx          # composes every section in order
  globals.css       # Tailwind layers + design-system utilities
  sitemap.ts        # SEO sitemap
  robots.ts         # SEO robots
components/
  Nav, Hero, Manifesto, Shift, ProductMockups, Workforce,
  Guardrails, Infrastructure, Security, Vision, Beta, FAQ, Footer
  ControlPlaneViz.tsx   # the signature animated hero visual (SVG)
  dashboard/Dashboard.tsx  # the fake product dashboard mockup
  ui/                   # shared primitives (Button, Reveal, SectionHeading, …)
lib/
  content.ts        # ALL copy + data (single source of truth)
  config.ts         # Tally form ID for the private-preview signup
  motion.ts         # shared Framer Motion variants
  clsx.ts           # tiny className helper (no dependency)
```

All copy and structured data lives in **`lib/content.ts`** — edit there to change
the workforce roster, FAQ, security pillars, infrastructure nodes, form options,
footer links, etc.

---

## The private-preview signup form

Signups are handled by a **[Tally](https://tally.so) form**, embedded directly
in the "private preview" section (`components/Beta.tsx`). Because Tally hosts and
stores the responses, there's no backend to run — ideal for a static GitHub
Pages site.

The form is referenced by ID in **`lib/config.ts`**:

```ts
export const PREVIEW_FORM_ID = "81W68o"; // the part after tally.so/r/
```

To use a different form, create one in Tally and change that ID. To make the
embed blend into this dark site, open your form in Tally's designer and:

- give the form a **dark theme** (the embed already requests a transparent
  background and hides Tally's title, so it inherits the section background);
- optionally enable **email notifications** (Settings → Notifications) or wire up
  a **webhook / integration** to Notion, Google Sheets or Slack.

Tally's free plan allows unlimited submissions. The embed auto-resizes to the
form's height, and there's a no-JavaScript fallback link to the hosted form
(`https://tally.so/r/<id>`).

---

## Deploying to GitHub Pages (free)

This project is configured to deploy to GitHub Pages as a fully static site.
`next.config.mjs` sets `output: "export"` (writes the site to `./out`) and a
`basePath` matching your repo name, and `.github/workflows/deploy.yml` builds
and publishes automatically.

**Setup (one time):**

1. **Set your repo name.** Open `next.config.mjs` and set `repo` to your GitHub
   repository name. The site will be served at
   `https://<username>.github.io/<repo>/`.
   - If you use a **custom domain**, or your repo is named
     `<username>.github.io`, set `repo = ""` so there's no sub-path.

2. **Push to GitHub.** Create a repo and push this project to the `main` branch.

3. **Enable Pages via Actions.** In the repo, go to
   **Settings → Pages → Build and deployment → Source** and choose
   **GitHub Actions**.

4. **Done.** Every push to `main` runs the workflow and publishes the site. You
   can also trigger it manually from the **Actions** tab. The live URL appears
   in the workflow's `deploy` step.

**Build it locally the same way the Action does:**

```bash
npm run build      # generates ./out
npx serve out      # preview the static export (optional)
```

> Note: `npm run dev` always runs at `http://localhost:3000` with no sub-path,
> so local development is unaffected by the `basePath`.

### Notes & limitations on Pages

- **No server code.** Static hosting can't run API routes, so signups go through
  an embedded Tally form — see *The private-preview signup form* above.
- **`.nojekyll`** is included (`public/.nojekyll`) so GitHub doesn't strip the
  `_next/` asset folder.
- Update `siteUrl` in `app/sitemap.ts`, `app/robots.ts` and `app/layout.tsx` to
  your live URL so SEO metadata and the sitemap resolve correctly.

### Prefer the form to "just work"?

If you'd rather collect signups with your own backend instead of Tally, connect
the same repo to **Vercel** or **Cloudflare Pages** (both free, both have
first-class Next.js support). They run server code, so you could add an
`app/api/...` route and post to it directly.

---

## Design system

- **Palette** — near-black bases (`#07080D` → `#11131D`), indigo brand
  (`#6D5EF6`), cyan accent (`#2DD4E8`), and amber (`#F5B544`) reserved
  exclusively for guardrails / approvals so "a human decision is needed" always
  reads as the same colour.
- **Typography** — Space Grotesk for display, Inter for body, and JetBrains Mono
  for any data, telemetry or identifier (`@handles`, costs, locations). Mono-for-data
  is the recurring structural device that makes the product feel instrumented.
- **Motion** — restrained, intentional, and fully respectful of
  `prefers-reduced-motion`; the animated control-plane visual and all reveals fall
  back to static states when reduced motion is requested.
- **Accessibility** — semantic landmarks, labelled form controls, an
  ARIA-correct FAQ accordion, visible focus rings, and AA-minded contrast.

---

_OfficeAndCloud is a fictional product; this site was built as a design/engineering showcase._
