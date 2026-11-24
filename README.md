# Office & Cloud marketing site

The public website for **Office & Cloud**, hosted at [officeandcloud.com](https://officeandcloud.com/).

**Your AI workforce. Managed like contractors.**

The site explains how organizations can give AI software agents a defined purpose, a human owner and a review date, with policies, risk and recorded spend informing their decisions. The interactive headquarters follows one illustrative AI use, **Document summaries**, through five pillars:

| Pillar | Question |
| --- | --- |
| Discovery | Which AI agents and apps are in use? |
| Governance | Which policies apply? |
| Risk & Security | What risks does each AI use introduce? |
| AI Economics | What is our AI usage costing us? |
| Performance & Value | Which AI agents should we keep using? |

The approved visual direction and product boundaries are preserved in [the headquarters design brief](docs/HEADQUARTERS-DESIGN.md). Read it before changing the experience or marketing claims. Example records and expenditure are labelled illustrative; they do not represent live agent telemetry or automated ROI measurements.

## Stack and architecture

- **Next.js 14**, App Router, **React 18** and **TypeScript**.
- A **fully static export** for GitHub Pages, with no Next.js application server required in production.
- **CSS Modules** for the headquarters experience and **Tailwind CSS** for shared and existing pages.
- **Three.js** for one progressively loaded interactive architectural scene.
- **lucide-react** for interface iconography. Framer Motion remains available to existing components.
- Local fonts through `next/font/local`: Space Grotesk, Inter and JetBrains Mono, with font licences in `app/fonts/`.
- Locally served purple/cyan brand assets and optimized desktop/mobile WebP hero artwork.

The homepage is composed by `HeadquartersExperience`. Its primary content and controls are HTML. The scene supports the same content rather than becoming the only way to access it.

### One 3D scene, with a useful fallback

The opening hero uses an optimized image with gentle pointer depth. The interactive five-floor headquarters receives the real-time 3D budget. Selecting a pillar brings its architectural floor forward and updates the evidence for the same AI use.

Scene loading is deferred until the platform approaches the viewport. Rendering is driven by interactions and stops when the scene settles, leaves the viewport or the document is hidden. A visible motion control and the operating system's reduced-motion preference disable animated movement while keeping pillar selection available.

An SVG architectural fallback remains available while the scene loads and if WebGL initialization fails or the context is lost. Native pillar buttons and HTML evidence work independently of the canvas, including through touch and keyboard input. The five pillar hashes can link directly to the relevant state:

`#discovery`, `#governance`, `#risk-security`, `#ai-economics`, `#performance-value`.

## Local development

Use **Node.js 20**, matching the deployment workflow.

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>. The development wrapper in `scripts/dev.mjs` passes server options to Next.js and also accepts preview hosts' `--host` and `--strictPort` conventions.

### Build and checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

The build writes the complete static website to `out/`. To preview that exported artifact:

```bash
npx serve out
```

Serve `out/` for production-export checks. The existing `npm run start` script invokes Next.js's server command and is not the preview command for this static-export configuration.

Pull requests run `.github/workflows/validate.yml` against the exported site. The Playwright suite covers desktop and 320px/390px layouts, a real software-WebGL render, pillar navigation, motion preferences, legal routes and intercepted form responses. It uploads screenshots and a browser report for review. To run the same suite in a development environment with Chromium available:

```bash
npx playwright install chromium
npm run build
npx playwright test
```

The test server uses port 4173. Stop any other preview using that port first. Form tests fail closed and intercept the production API; they never create real applications.

### Environment variables

**No environment variables, `.env` file or API keys are required for this marketing site.** Public application URLs are defined in `lib/config.ts`. `NEXT_PUBLIC_BASE_PATH` is derived and exposed by `next.config.mjs`; it does not need a separate environment setting.

## Project structure

```text
app/
  layout.tsx                 Local fonts, metadata and document shell
  page.tsx                   Homepage composition
  globals.css                Shared styles and reduced-motion rules
  privacy/                   Existing Privacy Notice
  terms/                     Existing Preview Terms
  blocked/                   Existing device-policy notices
  robots.ts, sitemap.ts      Search indexing metadata
  fonts/                     Local font files and licences
components/experience/
  HeadquartersExperience.tsx Homepage, navigation, pillar state and evidence
  HeadquartersScene.tsx      Three.js scene and SVG fallback
  SupportingSections.tsx     Expenditure, report illustration, devices and FAQ
  PreviewAccess.tsx          Real preview application form
  *.module.css               Scoped experience styles
components/ui/
  Logo.tsx                   Shared brand rendering
lib/
  config.ts                  Public application and sign-in endpoints
public/
  brand/                     Supplied brand assets
  images/                    Optimized headquarters hero artwork
  CNAME                      officeandcloud.com custom domain
  .nojekyll                  Preserves _next assets on GitHub Pages
docs/
  HEADQUARTERS-DESIGN.md      Approved direction and production invariants
```

The homepage's pillar copy and illustrative evidence live in `HeadquartersExperience.tsx`; supporting content and FAQ live in `SupportingSections.tsx`. Existing legacy components and `lib/content.ts` are not the homepage's single source of copy. Imports use the `@/*` alias configured in `tsconfig.json`.

## Preview applications and sign-in

`components/experience/PreviewAccess.tsx` sends preview requests to the existing Office & Cloud application API on AWS:

- **POST:** `https://api.officeandcloud.com/applications`
- **Payload:** `name`, `email`, `organization`, `website`, `startedAt`
- **Success condition:** a successful HTTP response with `accepted: true`
- **Sign-in:** `https://app.officeandcloud.com/?signin=1`

The form retains its required fields, native email validation, honeypot and mount timestamp. It prevents concurrent submissions, aborts its request on unmount and provides accessible success/error feedback. An accepted submission acknowledges receipt of the preview request; it does not grant access in the browser.

The existing AWS service stores applications and handles acknowledgement and subsequent acceptance/account-setup emails. Account setup and sign-in remain in the AWS-hosted application at `https://app.officeandcloud.com/`. The static marketing site does not implement or change that workflow. Preserve `/privacy/`, `/terms/` and the endpoint definitions in `lib/config.ts`.

**Never test by submitting invented details to the real application endpoint.** Intercept requests in browser tests to verify the payload, duplicate-submission handling and success/failure states without creating applications or sending email.

## GitHub Pages deployment

`next.config.mjs` sets `output: "export"`, disables the server image optimizer and emits folder-style URLs with `trailingSlash: true`. The repository and custom domain are served from the root, so `repo` is deliberately empty and the production base path is empty.

The existing `.github/workflows/deploy.yml` runs on pushes to `main` and supports manual `workflow_dispatch`. It installs dependencies with `npm ci` on Node.js 20, runs the production build, uploads `out/` and deploys it through GitHub Pages. Its Pages concurrency group avoids cancelling an in-progress deployment.

Repository Pages settings must use **GitHub Actions** as the build/deployment source. Keep `public/CNAME` set to `officeandcloud.com` and retain `public/.nojekyll`. The marketing redesign does not require changes to DNS, application infrastructure, permissions or email configuration. If the public hostname changes in the future, update the canonical URL, sitemap and robots metadata together.

## Release verification

- [ ] Lint, TypeScript and production static export pass; inspect the exported site rather than relying only on development mode.
- [ ] All five pillar states, direct hash links, keyboard controls and evidence panels work.
- [ ] Check desktop and 320px/390px layouts, visible mobile sign-in, focus styling and absence of horizontal overflow.
- [ ] Verify delayed scene loading, WebGL fallback, reduced motion, the pause control and offscreen/hidden-tab rendering behavior.
- [ ] Verify preview validation, exact payload and success/failure with **intercepted requests only**; make **no real test form submission**.
- [ ] Confirm the custom domain, sign-in, privacy and terms links; no new environment variables are required.
- [ ] Confirm that the successful Pages deployment contains the intended commit and that `https://officeandcloud.com/` serves that release.
