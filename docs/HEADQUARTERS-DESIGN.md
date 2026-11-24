# Office & Cloud: the interactive headquarters

## Approved direction

The public website positions Office & Cloud as **HR & payroll oversight for AI agents**: ownership, defined purposes, policies, risk, recorded expenses, licences, token estimates, budgets and reviews. **Prompts and day-to-day work stay in the AI tools.** The hero eyebrow is **HR & payroll for AI agents.** and the headline remains **Your AI workforce. Managed like contractors.**

AI agents are software managed using a contractor oversight model, with human accountability. The HR/payroll positioning does not introduce employee status, salary payments, payroll transactions, prompt routing or task execution within Office & Cloud. The approved visual identity remains the supplied purple briefcase and cyan cloud, midnight backgrounds, near-white typography, architectural glass and restrained electric light. Human-like AI employees, invented capabilities and generic dashboard filler are excluded.

The platform section is headed **One AI workforce. Five layers of oversight.** A single illustrative **AI agent record**, **Customer Success AI**, and its **Customer Success lead** human owner connect the projecting hero, interactive headquarters and evidence. Keep this record's identity consistent across all five states. Keep all five pillar names clear and larger than their questions, but moderate in size. Icons are unboxed.

## The signature scene

One real-time 3D scene receives the main animation budget. Five acrylic architectural floors surround a shared light spine. Selecting a pillar brings its corresponding floor forward, adjusts its light and changes the evidence panel. Native HTML controls and evidence remain independent of WebGL. Pointer interaction is an enhancement; touch, keyboard, reduced motion and a motion-aware SVG fallback must remain useful. The fallback keeps the same document module moving between floors and becomes static when motion is paused.

The opening uses an optimized, locally served architectural asset. This keeps the main message immediately available and avoids running two WebGL scenes. The hero's gentle pointer depth stops when motion is paused or reduced motion is requested. Scene loading is deferred until the platform is close to the viewport. The scene pauses when not visible or when motion is disabled, and stops rendering after user-driven motion settles.

Directly beneath the hero, restore a compact operating-system strip showing **Windows**, **macOS Beta** and **Linux Beta**. Include **Capabilities vary by platform.** and a link to the detailed device agents section. The architectural artwork itself must visibly cross the hero-to-strip boundary, reinforcing the image's projection out of the page. Preserve readable labels and an unobstructed link across desktop and mobile layouts; a background glow alone does not satisfy the artwork-overlap requirement.

## Five pillars and product boundaries

| Pillar | The evidence | Boundary |
| --- | --- | --- |
| Discovery | Supported installed AI apps and registered AI agents/uses, purpose, human owner, review date | No claim of discovering every autonomous agent or API call |
| Governance | Supported-device website/app policies and editable governance templates | Device controls vary by operating system; documents do not enforce universal runtime permissions |
| Risk & Security | Risk/impact assessments, Audit Trail, transparency reports | Risk tiers are evidence for review, not guarantees of safety |
| AI Economics | Recorded expenses, licences, token estimates, budgets and alerts | Example CAD 490 is Customer Success team expenditure, never an agent salary, payroll transaction or live metering of one agent |
| Performance & Value | Ownership gaps, upcoming reviews and available evidence | No invented automated ROI or hiring/firing decisions |

All sample records and spending values are labelled illustrative. The expenditure example totals CAD 1,670: Engineering 840, Customer Success 490, Product 340. Showing Customer Success AI beside this evidence does not attribute the entire team's spending to that agent. Maintain the distinction between an AI agent record and the AI tools in which people enter prompts and carry out daily work.

## Page sequence

1. Projecting architectural hero with **HR & payroll for AI agents.**, the approved contractor headline and a clear primary action.
2. Operating-system strip directly under the hero, with actual artwork overlap, Windows/macOS Beta/Linux Beta, the capability caveat and a device-section link.
3. **One AI workforce. Five layers of oversight.** Interactive headquarters with all five pillars visible and the same Customer Success AI agent record throughout.
4. Editorial statement: **Set the policies. Know the cost.** Keep the division of responsibilities clear: Office & Cloud supports oversight; the AI tools handle prompts and day-to-day work.
5. **See the spend.** and **Show the evidence.**, with purposeful visual variation.
6. Detailed device support and useful FAQ, including platform limitations.
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

Verify all five states, keyboard selection, 320px/390px mobile layout, visible sign-in, no horizontal overflow, scene fallback, reduced motion and pause controls. Check that actual hero artwork overlaps the operating-system strip while all its content remains usable. Confirm the HR/payroll oversight positioning, consistent Customer Success AI record and team-level spending labels, without implying payroll transactions, prompt routing, universal runtime enforcement or automatic ROI. Verify preview validation and success/failure using request interception. Build the static export and verify the deployed commit and custom domain. Performance work should preserve the clear static page before richer graphics load.

Review captured **WebGL output as well as the SVG fallback**. The materials must read as dark architectural glass with purple/cyan edge light, every floor symbol must remain legible, and the full structure needs breathing room within the canvas. A passing render test is not a substitute for this visual review.
