/**
 * Private-preview signup form (Tally).
 *
 * People sign up through your hosted Tally form. The site embeds that form
 * directly in the "private preview" section, so Tally collects the submissions —
 * no backend required, which is exactly what a static GitHub Pages site needs.
 *
 * To use a different Tally form, change PREVIEW_FORM_ID to your form's ID — the
 * part after `tally.so/r/` (e.g. "81W68o").
 *
 * Tip: in Tally, open the form designer and give the form a dark theme so it
 * blends into this site (the embed already requests a transparent background and
 * hides the Tally title). Free Tally plans allow unlimited submissions and can
 * email you or forward responses to Notion / Slack / Google Sheets.
 */
export const PREVIEW_FORM_ID = "81W68o";

/** Hosted form page — used as the no-JavaScript fallback link. */
export const PREVIEW_FORM_URL = `https://tally.so/r/${PREVIEW_FORM_ID}`;

/** Embeddable form URL (transparent, title hidden, auto-resizing). */
export const PREVIEW_FORM_EMBED_SRC =
  `https://tally.so/embed/${PREVIEW_FORM_ID}` +
  `?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;
