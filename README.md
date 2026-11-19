# OfficeAndCloud — marketing site

The launch and early-access marketing site for **OfficeAndCloud**, the control
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
  config.ts         # AWS application endpoint and app sign-in URL
  motion.ts         # shared Framer Motion variants
  clsx.ts           # tiny className helper (no dependency)
```

All copy and structured data lives in **`lib/content.ts`** — edit there to change
the workforce roster, FAQ, security pillars, infrastructure nodes, form options,
footer links, etc.

---

## The early-access signup form

The form in `components/Beta.tsx` sends applications to the Office & Cloud API
on AWS. The API stores the application and queues the acknowledgment email.
Around 20 minutes after the acknowledgment, AWS sends a separate acceptance
email with account setup instructions. Account setup and sign-in use the AWS
app at `https://app.officeandcloud.com/`. Both URLs are in `lib/config.ts`.

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

- **The site is static.** AWS handles submissions and sends the emails.
- **`.nojekyll`** is included (`public/.nojekyll`) so GitHub doesn't strip the
  `_next/` asset folder.
- Update `siteUrl` in `app/sitemap.ts`, `app/robots.ts` and `app/layout.tsx` to
  your live URL so SEO metadata and the sitemap resolve correctly.

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
