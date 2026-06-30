"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { ownershipPoints } from "@/lib/content";
import { stagger, fadeUp, viewportOnce } from "@/lib/motion";

export function Vision() {
  return (
    <section id="vision" className="relative scroll-mt-24 py-24 sm:py-36">
      {/* accent glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-[120px]" />

      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-8 text-center">The vision</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto max-w-4xl text-center font-display text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.08] tracking-tightest">
            Companies already have HR systems for humans.
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient">
              OfficeAndCloud is the management platform for digital employees.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8 text-center sm:p-10">
            <p className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Your AI employees should belong to you.
            </p>
            <p className="mt-2 text-lg text-muted">Not your AI vendor.</p>

            <motion.div
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
            >
              {ownershipPoints.map((point) => (
                <motion.span
                  key={point}
                  variants={fadeUp}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-base/40 px-4 py-2 text-sm text-ink"
                >
                  <Check size={15} className="text-accent-400" />
                  {point}
                </motion.span>
              ))}
            </motion.div>

            <p className="mt-8 font-display text-xl font-semibold tracking-tight text-gradient-accent">
              Own your future.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
