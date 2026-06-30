"use client";

import { motion } from "framer-motion";
import { Dashboard } from "./dashboard/Dashboard";
import { SectionHeading } from "./ui/SectionHeading";
import { viewportOnce } from "@/lib/motion";

const surfaces = [
  "AI Employees",
  "Models",
  "Policies",
  "Guardrails",
  "Approvals",
  "Activity Feed",
  "Audit Logs",
  "Infrastructure Map",
  "Usage",
  "Memory",
  "Health",
  "Cost",
];

export function ProductMockups() {
  return (
    <section id="platform" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="One console"
          title={
            <>
              Your entire digital workforce,{" "}
              <span className="text-gradient">on a single pane of glass.</span>
            </>
          }
          description="Every AI employee, model, policy and approval — observable and governable from one place. This is the workforce dashboard."
        />

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1200 }}
          className="mt-12"
        >
          <div className="relative">
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-brand-500/10 blur-3xl" />
            <Dashboard />
          </div>
        </motion.div>

        <div className="mask-fade-edges mt-8 overflow-hidden">
          <div className="flex flex-wrap justify-center gap-2">
            {surfaces.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-muted"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
