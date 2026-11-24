# Office & Cloud: the interactive headquarters

## Approved direction

The public website positions Office & Cloud as **HR & payroll oversight for AI agents**, delivering visibility, clear policy boundaries, human accountability, risk oversight and cost control. The hero eyebrow is **HR & payroll for AI agents.** and the headline remains **Your AI workforce. Managed like contractors.**

AI agents are software managed using a contractor oversight model, with people accountable for their use and expenditure. The approved visual identity remains the supplied purple briefcase and cyan cloud, midnight backgrounds, near-white typography, architectural glass and restrained electric light. Keep the imagery focused on AI software, meaningful evidence and the distinctive architectural concept.

The platform section is headed **One AI workforce. Five layers of oversight.** A single illustrative **AI agent record**, **Customer Success AI**, and its **Customer Success lead** human owner connect the projecting hero, interactive headquarters and evidence. Keep this record's identity consistent across all five states. Keep all five pillar names clear and larger than their questions, but moderate in size. Icons are unboxed.

## Public copy

Lead with what Office & Cloud does and why it matters. The approved hero body is:

> Know which AI agents are in use, set clear policy boundaries and keep costs under control. Bring ownership, risk and spending together in one place.

Describe concrete benefits: see the AI workforce, establish clear policies, assign human owners, review risk and understand spending. Keep the tone direct and confident. The FAQ covers **discovery, costs, governance, shareable evidence and getting started**.

The platform introduction states its capabilities directly, without a separate walkthrough label. The hero record is labelled **AI agent**. Use direct product labels in the hero, platform, spend and report sections. Keep example-data annotations in internal authoring notes.

Capability boundaries belong in the internal authoring guardrails below. Do not turn them into public negative feature disclaimers, explanations about where people enter prompts or perform day-to-day work, or explanations of what "payroll" does not mean. Use accurate, positive descriptions of the supported features.

## The signature scene

The full desktop explorer remains unchanged: one real-time 3D scene receives the main animation budget. Five acrylic architectural floors surround a shared light spine. Selecting a pillar brings its corresponding floor forward, adjusts its light and changes the evidence panel. Native HTML controls and evidence remain independent of WebGL. Pointer interaction is an enhancement; touch, keyboard, reduced motion and a motion-aware SVG fallback must remain useful. The desktop fallback keeps the same document module moving between floors and becomes static when motion is paused.

The opening uses an optimized, locally served architectural asset. This keeps the main message immediately available and avoids running two WebGL scenes. The hero's gentle pointer depth stops when motion is paused or reduced motion is requested. Scene loading is deferred until the platform is close to the viewport. The scene pauses when not visible or when motion is disabled, and stops rendering after user-driven motion settles.

Directly beneath the hero, keep a clean **Supported** strip showing recognizable official brand silhouettes for **Windows**, **macOS** and **Linux**, with readable and accessible names and a link to the detailed device agents section. Include browser logos for web-app access only when that compatibility has been verified. Public support labels have no maturity badges or capability caveats. The architectural artwork itself must visibly cross the hero-to-strip boundary, reinforcing the image's projection out of the page. Preserve recognizable logos, readable labels and an unobstructed link across desktop and mobile layouts; a background glow alone does not satisfy the artwork-overlap requirement.

For mobile, place a portrait crop behind the headline and body, with near-white and pale-lavender type protected by a dark gradient that fades into the vivid lower architecture. Keep the copy in normal document flow and reserve room for the floating agent record below the CTAs. The actual artwork still overlaps the operating-system strip, whose labels and link remain readable and usable. Preserve the desktop composition.

### Compact mobile pillar explorer

At viewport widths of **700px or less**, present a compact interactive example card with a small architectural motif. This mobile presentation shares the desktop explorer's data, active pillar and deep links; the full desktop 3D composition and interactions remain intact above the breakpoint.

- Keep all five icon selectors visible in a single row: **Discover**, **Govern**, **Risk**, **Costs** and **Value**. Use full pillar names in the selected heading and accessible selector names.
- Provide swipe and previous/next controls as well as direct selection. Preserve keyboard access and reduced-motion behavior.
- Keep default panel sizing consistent across the five states. **Why this matters** remains an optional disclosure; content must remain readable when it expands.
- Do not mount the desktop WebGL scene on mobile, including a hidden canvas or scene component.
- Preserve scroll position during normal selection. Align the compact panel only when it is currently clipped, so its selectors, navigation and example remain together in the viewport.

## Internal authoring guardrails

The following boundaries are for contributors and claim review, not proposed marketing copy or FAQ answers. They keep the benefits truthful while the public page focuses on what customers can accomplish. Preserve the contractor oversight model without depicting AI software as human employees or inventing product capabilities.

The Supported strip communicates platform coverage, not operating-system feature parity. Keep factual device-agent feature differences in internal capability guidance. Browser logos require verified web-app access and must not imply that a browser agent or extension exists. These internal distinctions do not become public strip caveats.

| Pillar | Evidence supporting the public benefits | Authoring boundary (internal) |
| --- | --- | --- |
| Discovery | Supported installed AI apps and registered AI agents/uses, purpose, human owner, review date | No claim of discovering every autonomous agent or API call |
| Governance | Supported-device website/app policies and editable governance templates | Device controls vary by operating system; documents do not enforce universal runtime permissions |
| Risk & Security | Risk/impact assessments, Audit Trail, transparency reports | Risk tiers are evidence for review, not guarantees of safety |
| AI Economics | Recorded expenses, licences, token estimates, budgets and alerts | Example CAD 490 is Customer Success team expenditure, never an agent salary, payroll transaction or live metering of one agent |
| Performance & Value | Ownership gaps, upcoming reviews and available evidence | No invented automated ROI or hiring/firing decisions |

The marketing artwork uses example records and spending values to demonstrate product features. Keep this example-data context internal. The expenditure example totals CAD 1,670: Engineering 840, Customer Success 490, Product 340. Showing Customer Success AI beside this evidence does not attribute the entire team's spending to that agent. Payroll transactions and prompt routing are not part of the approved feature claims; keep that scope check internal rather than presenting it as a public disclaimer.

## Page sequence

1. Projecting architectural hero with **HR & payroll for AI agents.**, the approved contractor headline and a clear primary action.
2. **Supported** strip directly under the hero, with actual artwork overlap, official Windows/macOS/Linux brand silhouettes, verified browser logos for web-app access where available, and a device-section link.
3. **One AI workforce. Five layers of oversight.** Full 3D headquarters on desktop and a compact interactive card at 700px or below, with all five selectors visible and the same Customer Success AI agent record throughout.
4. Editorial statement: **Set the policies. Know the cost.** Connect it to the benefits of clear ownership, policy boundaries and cost oversight.
5. **See the spend.** and **Show the evidence.**, with purposeful visual variation.
6. Detailed device support and useful FAQ covering discovery, costs, governance, shareable evidence and getting started.
7. **Know your AI agents. Own the decisions.**, with the real preview request form.
8. Brand footer and legal links.

## Production invariants

- Keep GitHub Pages static export and the `officeandcloud.com` custom domain.
- Keep `https://app.officeandcloud.com/?signin=1`, visible directly in the mobile header.
- Keep the existing POST endpoint `https://api.officeandcloud.com/applications` and payload `name`, `email`, `organization`, `website`, `startedAt`.
- Preview success requires HTTP success and `accepted: true`. Confirmation acknowledges receipt only.
- Keep `/privacy/` and `/terms/` and their legal content.
- Do not send test requests to the real preview API. Use intercepted requests during tests.
- Do not change application infrastructure, DNS, permissions or email configuration for this marketing redesign.

## Release checks

Verify all five states, keyboard selection, 320px/390px mobile layout, visible sign-in, no horizontal overflow, scene fallback, reduced motion and pause controls. Check that actual hero artwork overlaps the operating-system strip while all its content remains usable. Confirm the approved hero copy, consistent Customer Success AI record and team-level spending labels. Public copy should sell visibility, policy boundaries, accountability, risk oversight and cost control; use the internal authoring guardrails to verify claim accuracy. Verify preview validation and success/failure using request interception. Build the static export and verify the deployed commit and custom domain. Performance work should preserve the clear static page before richer graphics load.

For the compact mobile explorer, verify all five selectors remain in one row, full accessible names, swipe and previous/next navigation, stable default panel sizing and optional details. Selection should preserve the viewport when the panel is already visible, aligning it only when clipped so controls and evidence stay together. Confirm the desktop WebGL scene is not mounted on mobile, shared state and deep links survive breakpoint changes, and the full desktop explorer remains visually and functionally unchanged.

Review captured **desktop WebGL output as well as its SVG fallback**, and inspect the compact mobile card separately. The desktop materials must read as dark architectural glass with purple/cyan edge light, every floor symbol must remain legible, and the full structure needs breathing room within the canvas. A passing render test is not a substitute for this visual review.
