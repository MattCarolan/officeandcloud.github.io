"use client";

import { useEffect } from "react";
import { Check, Sparkles } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { PREVIEW_FORM_EMBED_SRC, PREVIEW_FORM_URL } from "@/lib/config";

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

const TALLY_SCRIPT = "https://tally.so/widgets/embed.js";

/**
 * Loads Tally's embed script (once) and hydrates the iframe. The script wires up
 * the transparent background + dynamic-height auto-resize via postMessage.
 */
function useTallyEmbed() {
  useEffect(() => {
    const hydrate = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
        return;
      }
      // Fallback: promote data-tally-src -> src manually.
      document
        .querySelectorAll<HTMLIFrameElement>(
          "iframe[data-tally-src]:not([src])",
        )
        .forEach((el) => {
          el.src = el.dataset.tallySrc as string;
        });
    };

    if (window.Tally) {
      hydrate();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${TALLY_SCRIPT}"]`,
    );
    if (existing) {
      existing.addEventListener("load", hydrate);
      return () => existing.removeEventListener("load", hydrate);
    }

    const script = document.createElement("script");
    script.src = TALLY_SCRIPT;
    script.onload = hydrate;
    script.onerror = hydrate;
    document.body.appendChild(script);
  }, []);
}

const perks = [
  "Free during the private preview",
  "Hands-on onboarding with our team",
  "A direct line into the product roadmap",
];

export function Beta() {
  useTallyEmbed();

  return (
    <section id="preview" className="relative scroll-mt-24 py-24 sm:py-32">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[130px]" />

      <div className="container-x">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left — pitch */}
          <div className="lg:pt-4">
            <Reveal>
              <span className="inline-flex items-center gap-2 eyebrow">
                <Sparkles size={13} className="text-accent-400" />
                Private preview
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tightest text-ink sm:text-5xl">
                Be among the first.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                We&apos;re inviting forward-thinking IT leaders, platform
                engineers, cloud architects and AI builders to help shape the
                future of enterprise AI management. Request access to the private
                preview — it takes about a minute.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-8 flex flex-col gap-3">
                {perks.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-ink"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ok/15 text-ok">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 text-xs leading-relaxed text-faint">
                Prefer a full page?{" "}
                <a
                  href={PREVIEW_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted underline decoration-white/20 underline-offset-2 transition-colors hover:text-ink"
                >
                  Open the request form
                </a>
                .
              </p>
            </Reveal>
          </div>

          {/* Right — embedded Tally form */}
          <Reveal delay={0.1}>
            <div className="glass-strong relative overflow-hidden rounded-3xl border border-white/[0.08] p-5 shadow-panel sm:p-7">
              {/* top hairline accent */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />

              <iframe
                data-tally-src={PREVIEW_FORM_EMBED_SRC}
                loading="lazy"
                width="100%"
                height={520}
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                title="Request private preview access"
                className="w-full"
              />

              <noscript>
                <p className="text-center text-sm text-muted">
                  <a
                    href={PREVIEW_FORM_URL}
                    className="text-ink underline underline-offset-2"
                  >
                    Open the request form
                  </a>{" "}
                  to join the private preview.
                </p>
              </noscript>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
