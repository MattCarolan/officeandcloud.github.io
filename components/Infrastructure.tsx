"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { LogoMark } from "./ui/Logo";
import { infraNodes } from "@/lib/content";
import { stagger, fadeUp, viewportOnce } from "@/lib/motion";

export function Infrastructure() {
  return (
    <section id="infrastructure" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Infrastructure"
          title={
            <>
              Run AI wherever your business needs it.
              <br />
              <span className="text-gradient">
                OfficeAndCloud manages it all.
              </span>
            </>
          }
          description="The runtime doesn't matter. The model doesn't matter. The infrastructure doesn't matter. Local, on-prem, any cloud or hybrid — one control plane sits above them all."
        />

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        >
          {infraNodes.map((node) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.name}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-panel/40 p-5 transition-colors hover:border-brand-400/30"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/0 to-brand-500/0 opacity-0 transition-opacity duration-300 group-hover:from-brand-500/[0.08] group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-base/50 text-muted transition-colors group-hover:text-brand-400">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <p className="mt-4 font-display text-[15px] font-medium tracking-tight text-ink">
                    {node.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{node.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <Reveal delay={0.1}>
          <div className="mt-6 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-md">
              <LogoMark className="h-6 w-6" />
              <span className="text-sm text-muted">
                One identity, one policy set, one audit trail —{" "}
                <span className="text-ink">across every surface.</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
