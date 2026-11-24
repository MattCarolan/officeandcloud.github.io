# Office & Cloud marketing site

The public website for **Office & Cloud**, hosted at [officeandcloud.com](https://officeandcloud.com/).

**Your AI workforce. Managed like contractors.**

The hero eyebrow is **HR & payroll for AI agents.** Office & Cloud brings visibility, clear policy boundaries and human accountability to an organization's AI workforce, with risk and cost evidence in one place. The approved hero body is:

> Know which AI agents are in use, set clear policy boundaries and keep costs under control. Bring ownership, risk and spending together in one place.

Public copy leads with what Office & Cloud does and the benefits it delivers: visibility, policy boundaries, accountability, risk oversight and cost control. The FAQ covers discovery, costs, governance, shareable evidence and getting started. Keep the language direct, useful and focused on the product's value.

The platform section is headed **One AI workforce. Five layers of oversight.** Its interactive headquarters follows the same illustrative **AI agent record**, **Customer Success AI**, with **Customer Success lead** as the human owner, through five pillars:

| Pillar | Question |
| --- | --- |
| Discovery | Which AI agents and apps are in use? |
| Governance | Which rules apply to each AI use? |
| Risk & Security | What risks need attention? |
| AI Economics | What does our AI workforce cost? |
| Performance & Value | Which AI agents should we keep using? |

The approved visual direction and internal authoring guardrails are preserved in [the headquarters design brief](docs/HEADQUARTERS-DESIGN.md). Read it before changing the experience or marketing claims. Example records and expenditure are labelled illustrative. **CAD 490 remains recorded Customer Success team expenditure.**

### Internal authoring guardrails

These constraints guide contributors and claim review; they are not copy to display on the marketing page. Public messaging should accurately describe the benefits of the supported features, using precise terms such as supported apps, recorded expenses and token estimates where relevant.

- Preserve the distinction between recorded team expenditure and costs attributed to an individual AI agent. The CAD 490 example is team spending, not a salary or measured agent bill.
- Do not invent payroll transactions, prompt routing, universal agent discovery, universal runtime enforcement or automated ROI as shipped capabilities.
- Do not turn these boundaries into public feature disclaimers, explanations about prompts or day-to-day work, or explanations of what "payroll" does not mean. Sell the product's supported benefits.

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

The opening hero uses an optimized image with gentle pointer depth. A compact operating-system strip sits directly beneath it: **Windows**, **macOS Beta** and **Linux Beta**, with the caveat **Capabilities vary by platform.** and a link to the detailed device agents section. The architectural artwork visibly overlaps the hero-to-strip boundary while the strip's labels and link remain readable and usable.

The interactive five-floor headquarters receives the real-time 3D budget. Selecting a pillar brings its architectural floor forward and updates oversight evidence for the same Customer Success AI agent record, making the benefits of each pillar concrete.

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
- [ ] Confirm the hero artwork visibly overlaps the operating-system strip without covering Windows, macOS Beta, Linux Beta, the capability caveat or the device-section link.
- [ ] Confirm the approved hero copy, Customer Success AI record and team-level spend remain consistent. Public copy sells visibility, policy boundaries, accountability, risk oversight and cost control; review claims against the internal authoring guardrails.
- [ ] Verify delayed scene loading, WebGL fallback, reduced motion, the pause control and offscreen/hidden-tab rendering behavior.
- [ ] Verify preview validation, exact payload and success/failure with **intercepted requests only**; make **no real test form submission**.
- [ ] Confirm the custom domain, sign-in, privacy and terms links; no new environment variables are required.
- [ ] Confirm that the successful Pages deployment contains the intended commit and that `https://officeandcloud.com/` serves that release.
