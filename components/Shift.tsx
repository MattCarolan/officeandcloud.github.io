"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { LogoMark } from "./ui/Logo";
import { shiftStages } from "@/lib/content";
import { stagger, fadeUp, viewportOnce } from "@/lib/motion";

export function Shift() {
  return (
    <section id="shift" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="The shift is already happening"
          title={
            <>
              Every era, businesses learned to manage their{" "}
              <span className="text-gradient-accent">newest layer.</span>
            </>
          }
          description="First physical servers. Then virtual machines. Then cloud, then containers. Now a new layer arrives — AI workers — and it needs to be managed like every layer before it."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Timeline spine */}
          <motion.ol
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative"
          >
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-400/60 via-white/10 to-accent-400/60" />
            {shiftStages.map((stage) => {
              const Icon = stage.icon;
              return (
                <motion.li
                  key={stage.label}
                  variants={fadeUp}
                  className="relative flex items-center gap-5 py-3.5"
                >
                  <div
                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${
                      stage.current
                        ? "border-brand-400/40 bg-brand-500/15 text-brand-400 shadow-glow"
                        : "border-white/10 bg-panel text-muted"
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <div className="flex flex-1 items-baseline justify-between gap-4 border-b border-white/[0.05] pb-3.5">
                    <div>
                      <p
                        className={`font-display text-lg font-medium tracking-tight ${
                          stage.current ? "text-ink" : "text-ink/90"
                        }`}
                      >
                        {stage.label}
                        {stage.current && (
                          <span className="ml-2 rounded-full bg-brand-500/15 px-2 py-0.5 align-middle font-mono text-[10px] uppercase tracking-wider text-brand-400">
                            you are here
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 text-sm text-muted">
                        Manages: {stage.managed}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-faint">
                      {stage.era}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>

          {/* Capstone */}
          <Reveal className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-brand-500/[0.12] to-panel/40 p-7">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/25 blur-3xl" />
              <div className="relative">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                  <ArrowUp size={13} className="text-brand-400" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Sits above them all
                  </span>
                </div>
                <LogoMark className="h-10 w-10" />
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                  OfficeAndCloud
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  One control plane that governs the entire digital workforce —
                  across every model, every runtime and every cloud. The AI
                  doesn&apos;t matter. The infrastructure doesn&apos;t matter.
                  OfficeAndCloud sits on top.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.04] text-center">
                  {[
                    ["Models", "Any"],
                    ["Runtimes", "Any"],
                    ["Clouds", "All"],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-panel/60 px-2 py-3">
                      <p className="font-display text-lg font-semibold text-ink">
                        {v}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-faint">
                        {k}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
