# Office & Cloud: the interactive headquarters

## Approved direction

The public website explains **AI software agents managed like contractors**, with human accountability. The headline is **Your AI workforce. Managed like contractors.** The approved visual identity is the supplied purple briefcase and cyan cloud, midnight backgrounds, near-white typography, architectural glass and restrained electric light. Human-like AI employees, invented capabilities and generic dashboard filler are excluded.

The whole page follows **One AI use. Five accountable decisions.** A single illustrative use, **Document summaries**, and its **Customer Success lead** human owner connect the projecting hero, interactive headquarters and evidence. Keep all five names clear and larger than their questions, but moderate in size. Icons are unboxed.

## The signature scene

One real-time 3D scene receives the main animation budget. Five acrylic architectural floors surround a shared light spine. Selecting a pillar brings its corresponding floor forward, adjusts its light and changes the evidence panel. Native HTML controls and evidence remain independent of WebGL. Pointer interaction is an enhancement; touch, keyboard, reduced motion and a motion-aware SVG fallback must remain useful. The fallback keeps the same document module moving between floors and becomes static when motion is paused.

The opening uses an optimized, locally served architectural asset. This keeps the main message immediately available and avoids running two WebGL scenes. The hero's gentle pointer depth stops when motion is paused or reduced motion is requested. Scene loading is deferred until the platform is close to the viewport. The scene pauses when not visible or when motion is disabled, and stops rendering after user-driven motion settles.

## Five pillars and product boundaries

| Pillar | The evidence | Boundary |
| --- | --- | --- |
| Discovery | Supported installed AI apps and recorded AI uses, purpose, human owner, review date | No claim of discovering every autonomous agent or API call |
| Governance | Supported-device website/app policies and editable governance templates | Device controls vary by operating system; documents do not enforce universal runtime permissions |
| Risk & Security | Risk/impact assessments, Audit Trail, transparency reports | Risk tiers are evidence for review, not guarantees of safety |
| AI Economics | Recorded expenses, licences, token estimates, budgets and alerts | Example CAD 490 is team expenditure, not live metering of one agent |
| Performance & Value | Ownership gaps, upcoming reviews and available evidence | No invented automated ROI or hiring/firing decisions |

All sample records and spending values are labelled illustrative. The expenditure example totals CAD 1,670: Engineering 840, Customer Success 490, Product 340.

## Page sequence

1. Projecting architectural hero with approved positioning and clear primary action.
2. Interactive headquarters, all five pillars visible, same AI use throughout.
3. Editorial statement: **AI can do the work. You own the decisions.**
4. **See the spend.** and **Show the evidence.**, with purposeful visual variation.
5. Device support and useful FAQ, including platform limitations.
6. **Know your AI agents. Own the decisions.**, with the real preview request form.
7. Brand footer and legal links.

## Production invariants

- Keep GitHub Pages static export and the `officeandcloud.com` custom domain.
- Keep `https://app.officeandcloud.com/?signin=1`, visible directly in the mobile header.
- Keep the existing POST endpoint `https://api.officeandcloud.com/applications` and payload `name`, `email`, `organization`, `website`, `startedAt`.
- Preview success requires HTTP success and `accepted: true`. Confirmation acknowledges receipt only.
- Keep `/privacy/` and `/terms/` and their legal content.
- Do not send test requests to the real preview API. Use intercepted requests during tests.
- Do not change application infrastructure, DNS, permissions or email configuration for this marketing redesign.

## Release checks

Verify all five states, keyboard selection, 320px/390px mobile layout, visible sign-in, no horizontal overflow, scene fallback, reduced motion and pause controls. Verify preview validation and success/failure using request interception. Build the static export and verify the deployed commit and custom domain. Performance work should preserve the clear static page before richer graphics load.

Review captured **WebGL output as well as the SVG fallback**. The materials must read as dark architectural glass with purple/cyan edge light, every floor symbol must remain legible, and the full structure needs breathing room within the canvas. A passing render test is not a substitute for this visual review.
