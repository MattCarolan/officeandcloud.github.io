"use client";

import { motion } from "framer-motion";
import { Boxes, ServerCog } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { securityPillars } from "@/lib/content";
import { stagger, fadeUp, viewportOnce } from "@/lib/motion";

export function Security() {
  return (
    <section id="security" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Security & governance"
          title={
            <>
              Enterprise-grade from the{" "}
              <span className="text-gradient-accent">very first agent.</span>
            </>
          }
          description="Identity, access, secrets, policy and audit — the same controls you trust for human employees, applied to every AI worker."
        />

        <motion.div
          variants={stagger(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {securityPillars.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className="group rounded-2xl border border-white/[0.07] bg-panel/40 p-5 transition-colors hover:border-white/15"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 transition-colors group-hover:bg-brand-500/20">
                  <Icon size={18} strokeWidth={1.7} />
                </div>
                <h3 className="mt-4 font-display text-[15px] font-semibold tracking-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                  {p.copy}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bring your own */}
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-3 grid gap-3 md:grid-cols-2"
        >
          {[
            {
              icon: Boxes,
              title: "Bring your own models",
              copy: "OpenAI, Anthropic, Google, Mistral, Llama, Qwen or anything you self-host. Swap models without re-platforming your workforce.",
            },
            {
              icon: ServerCog,
              title: "Bring your own infrastructure",
              copy: "Managed, single-tenant, on-prem or air-gapped. Your agents and data stay inside your boundary — and belong to you, not your vendor.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="relative overflow-hidden rounded-2xl border border-brand-400/15 bg-gradient-to-br from-brand-500/[0.1] to-panel/30 p-6"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-500/20 blur-2xl" />
                <Icon size={22} className="relative text-brand-400" />
                <h3 className="relative mt-4 font-display text-xl font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted">
                  {item.copy}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
