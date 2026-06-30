"use client";

import { Reveal } from "./ui/Reveal";

export function Manifesto() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-6 text-center">The premise</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto max-w-4xl text-center font-display text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-tightest">
            <span className="text-muted">Don&apos;t manage AI.</span>
            <br />
            <span className="text-gradient">
              Manage your digital workforce.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-muted">
            Over the next decade, every business will have AI employees working
            alongside human ones. OfficeAndCloud is the platform that governs,
            secures and manages every AI worker — regardless of model,
            infrastructure or where it runs.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
