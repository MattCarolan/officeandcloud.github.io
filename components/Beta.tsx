"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { APP_URL, PREVIEW_APPLICATION_URL } from "@/lib/config";

const perks = [
  "Free during early access",
  "Hands-on onboarding with our team",
  "A direct line into the product roadmap",
];
const fields = [
  ["name", "Your name", "text", "name", 160],
  ["email", "Work email", "email", "email", 254],
  ["organization", "Organization", "text", "organization", 160],
] as const;

export function Beta() {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const formDisabled = startedAt === null || busy || submitted;

  useEffect(() => setStartedAt(Date.now()), []);

  async function requestPreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formDisabled) return;
    const form = event.currentTarget;
    const application = Object.fromEntries(new FormData(form));
    setBusy(true);
    setError("");
    try {
      const response = await fetch(PREVIEW_APPLICATION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...application, startedAt }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.accepted !== true) {
        setError(
          result?.error || "Your request could not be submitted. Please try again.",
        );
        return;
      }
      form.reset();
      setSubmitted(true);
    } catch {
      setError("Your request could not be submitted. Please try again.");
    } finally {
      setBusy(false);
    }
  }

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
                Early access
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tightest text-ink sm:text-5xl">
                Be among the first.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                Apply for early access to the Office &amp; Cloud AI Registry and
                help shape how teams govern their AI workforce. We’ll confirm
                your request by email and send account setup instructions about
                20 minutes later.
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
          </div>

          <Reveal delay={0.1}>
            <div className="glass-strong relative overflow-hidden rounded-3xl border border-white/[0.08] p-5 shadow-panel sm:p-7">
              {/* top hairline accent */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />

              <form method="post" onSubmit={requestPreview} className="flex flex-col gap-5">
                {fields.map(([name, label, type, autoComplete, maxLength]) => (
                  <label key={name} className="text-sm text-muted">
                    {label}
                    <input
                      name={name}
                      type={type}
                      autoComplete={autoComplete}
                      maxLength={maxLength}
                      required
                      disabled={formDisabled}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-base/60 p-3 text-ink outline-none focus:border-brand-400"
                    />
                  </label>
                ))}
                <label aria-hidden="true" className="absolute -left-[10000px]">
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
                <p className="text-sm leading-relaxed text-muted">
                  We use these details to email you about your request and set up
                  your preview access. Read the{" "}
                  <Link href="/privacy/" className="text-brand-400 underline">
                    Privacy Notice
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms/" className="text-brand-400 underline">
                    Preview Terms
                  </Link>.
                </p>
                <button
                  disabled={formDisabled}
                  className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
                >
                  {busy
                    ? "Sending…"
                    : submitted
                      ? "Request received"
                      : "Request preview access"}
                </button>
                {submitted && (
                  <p role="status" className="text-sm text-ok">
                    Check your inbox for a confirmation. Expect your account setup
                    instructions in a separate email about 20 minutes later.
                  </p>
                )}
                {error && (
                  <p role="alert" className="text-sm text-danger">
                    {error}
                  </p>
                )}
                <noscript>
                  <p className="text-sm text-muted">Enable JavaScript to submit the form.</p>
                </noscript>
                <a href={APP_URL} className="text-center text-sm text-brand-400">
                  Already have access? Sign in
                </a>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
