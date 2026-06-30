"use client";

import { motion } from "framer-motion";
import { Cpu, KeyRound, BrainCircuit, MapPin, DollarSign } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { StatusDot } from "./ui/StatusDot";
import { workers, type Worker } from "@/lib/content";
import { stagger, fadeUp, viewportOnce } from "@/lib/motion";
import { clsx } from "@/lib/clsx";

const accentRing: Record<Worker["accent"], string> = {
  brand: "before:bg-brand-500/60",
  accent: "before:bg-accent-500/60",
  signal: "before:bg-signal/60",
};

const permTone: Record<Worker["permissionLevel"], string> = {
  read: "text-muted",
  scoped: "text-accent-400",
  elevated: "text-signal",
};

function Field({
  icon: Icon,
  label,
  value,
  valueClass,
}: {
  icon: typeof Cpu;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={13} className="shrink-0 text-faint" strokeWidth={1.7} />
      <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
        {label}
      </span>
      <span
        className={clsx(
          "ml-auto truncate text-right text-[12px] text-ink",
          valueClass,
        )}
      >
        {value}
      </span>
    </div>
  );
}

function WorkerCard({ w }: { w: Worker }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={clsx(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-panel/50 p-5",
        "before:absolute before:inset-x-0 before:top-0 before:h-px before:opacity-70",
        accentRing[w.accent],
      )}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/[0.03] blur-2xl transition-opacity duration-300 group-hover:bg-brand-500/10" />

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-[17px] font-semibold tracking-tight text-ink">
            {w.role}
          </h3>
          <p className="font-mono text-[11px] text-faint">@{w.handle}</p>
        </div>
        <StatusDot status={w.status} showLabel />
      </div>

      <div className="mt-4 space-y-2 border-t border-white/[0.05] pt-4">
        <Field icon={Cpu} label="Model" value={w.model} />
        <Field
          icon={KeyRound}
          label="Perms"
          value={w.permissions}
          valueClass={permTone[w.permissionLevel]}
        />
        <Field icon={BrainCircuit} label="Memory" value={w.memory} />
        <Field icon={MapPin} label="Runs on" value={w.location} />
        <Field icon={DollarSign} label="Cost" value={w.cost} />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-faint">
          <span>Health</span>
          <span className="text-ink">{w.health}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${w.health}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className={clsx(
              "h-full rounded-full",
              w.health >= 98
                ? "bg-gradient-to-r from-ok to-accent-400"
                : "bg-gradient-to-r from-signal to-brand-400",
            )}
          />
        </div>
      </div>

      <p className="mt-4 truncate border-t border-white/[0.05] pt-3 text-[11px] text-muted">
        <span className="text-faint">Last:</span> {w.lastActivity}
      </p>
    </motion.div>
  );
}

export function Workforce() {
  return (
    <section id="workforce" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="The AI workforce"
          title={
            <>
              Meet a few of the{" "}
              <span className="text-gradient-accent">employees</span> you&apos;ll
              manage.
            </>
          }
          description="Each AI worker is a first-class identity with its own model, permissions, memory, health and budget — wherever it happens to run."
        />

        <motion.div
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {workers.map((w) => (
            <WorkerCard key={w.handle} w={w} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
