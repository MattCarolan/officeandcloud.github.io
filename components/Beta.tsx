"use client";
import { useState } from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Reveal } from "./ui/Reveal";
const perks = [
  "Free during the private preview",
  "AI platform inventory and team accountability",
  "Six-month reviews and NIST-aligned governance",
];
export function Beta() {
  const [startedAt] = useState(Date.now()),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState(""),
    [error, setError] = useState("");
  return (
    <section id="preview" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[130px]" />
      <div className="container-x">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:pt-4">
            <Reveal>
              <span className="inline-flex items-center gap-2 eyebrow">
                <Sparkles size={13} className="text-accent-400" />
                Private preview
              </span>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tightest text-ink sm:text-5xl">
                Be among the first.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                Start with the AI Registry, the first capability of Office &amp;
                Cloud. Register the platforms your teams use, establish
                accountability, and keep governance current.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Invitations are issued automatically after about 15 minutes,
                typically within one hour. Eligible applications are accepted
                without a selection committee.
              </p>
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
              <p className="mt-8 text-xs text-faint">
                Discovery, monitoring, deployment and enforcement are future
                capabilities.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="glass-strong relative overflow-hidden rounded-3xl border border-white/[0.08] p-5 shadow-panel sm:p-7">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent" />
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const body = Object.fromEntries(
                    new FormData(e.currentTarget),
                  );
                  setBusy(true);
                  setError("");
                  setMessage("");
                  try {
                    const r = await fetch(
                      "https://api.officeandcloud.com/applications",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...body, startedAt }),
                      },
                    );
                    const v = await r.json();
                    if (!r.ok)
                      throw new Error(v.error || "Please try again later.");
                    setMessage(
                      "Your application is received. Watch your inbox for your Office & Cloud invitation, typically within one hour.",
                    );
                  } catch (err) {
                    setError(
                      err instanceof Error
                        ? err.message
                        : "Unable to send your application. Please try again.",
                    );
                  } finally {
                    setBusy(false);
                  }
                }}
                className="flex flex-col gap-5"
              >
                {[
                  ["name", "Your name", "text"],
                  ["email", "Work email", "email"],
                  ["organization", "Organization", "text"],
                ].map(([name, label, type]) => (
                  <label key={name} className="text-sm text-muted">
                    {label}
                    <input
                      name={name}
                      type={type}
                      required
                      maxLength={name === "email" ? 254 : 160}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-base/60 p-3 text-ink outline-none focus:border-brand-400"
                    />
                  </label>
                ))}
                <label className="absolute -left-[10000px]" aria-hidden="true">
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
                <button
                  disabled={busy}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
                >
                  {busy ? "Sending…" : "Request preview access"}
                  <ArrowRight size={15} />
                </button>
                {message && (
                  <p role="status" className="text-sm text-ok">
                    {message}
                  </p>
                )}
                {error && (
                  <p role="alert" className="text-sm text-danger">
                    {error}
                  </p>
                )}
                <p className="text-xs leading-relaxed text-faint">
                  We use these details to deliver your invitation and administer
                  the preview. Do not include confidential information.
                </p>
                <a
                  href="https://app.officeandcloud.com"
                  className="text-center text-sm text-brand-400"
                >
                  Already invited? Log in
                </a>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
