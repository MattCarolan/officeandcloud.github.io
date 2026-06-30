"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ShieldCheck, AlertTriangle, Sparkles } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { approvals, approvalOptions, type Approval } from "@/lib/content";
import { clsx } from "@/lib/clsx";

const riskTone: Record<Approval["risk"], { dot: string; text: string; label: string }> = {
  high: { dot: "bg-danger", text: "text-danger", label: "High impact" },
  medium: { dot: "bg-signal", text: "text-signal", label: "Needs review" },
  low: { dot: "bg-ok", text: "text-ok", label: "Low risk" },
};

type Resolution = {
  label: string;
  tone: "ok" | "danger" | "rule";
  note?: string;
};

function resolve(option: string, worker: string): Resolution {
  switch (option) {
    case "Approve":
      return { label: `Approved · ${worker} may proceed`, tone: "ok" };
    case "Reject":
      return { label: `Rejected · action blocked`, tone: "danger" };
    case "Always allow":
      return {
        label: `Rule created · always allow`,
        tone: "rule",
        note: "OfficeAndCloud will auto-approve matching actions and log each one.",
      };
    default:
      return {
        label: `Rule created · always ask`,
        tone: "rule",
        note: "OfficeAndCloud will route every matching action to a human first.",
      };
  }
}

function ApprovalCard({ item }: { item: Approval }) {
  const [resolution, setResolution] = useState<Resolution | null>(null);
  const tone = riskTone[item.risk];

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-panel/50 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[12px] text-ink">@{item.handle}</span>
          <span className="text-faint">·</span>
          <span className="text-xs text-muted">{item.worker}</span>
        </div>
        <span
          className={clsx(
            "inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] px-2 py-1 font-mono text-[10px] uppercase tracking-wider",
            tone.text,
          )}
        >
          <span className={clsx("h-1.5 w-1.5 rounded-full", tone.dot)} />
          {tone.label}
        </span>
      </div>

      <div className="mt-4 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-base/60">
          {item.risk === "high" ? (
            <AlertTriangle size={16} className="text-signal" />
          ) : (
            <ShieldCheck size={16} className="text-brand-400" />
          )}
        </div>
        <div>
          <p className="font-display text-[17px] font-medium tracking-tight text-ink">
            {item.action}
          </p>
          <p className="font-mono text-[11px] text-faint">{item.detail}</p>
        </div>
      </div>

      <ul className="mt-4 space-y-1.5 border-t border-white/[0.05] pt-4">
        {item.context.map((c) => (
          <li key={c} className="flex items-center gap-2 text-[12.5px] text-muted">
            <Check size={13} className="text-ok" /> {c}
          </li>
        ))}
      </ul>

      <div className="mt-5 min-h-[44px]">
        <AnimatePresence mode="wait">
          {resolution ? (
            <motion.div
              key="resolved"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={clsx(
                "rounded-xl border p-3",
                resolution.tone === "ok" &&
                  "border-ok/25 bg-ok/[0.08] text-ok",
                resolution.tone === "danger" &&
                  "border-danger/25 bg-danger/[0.08] text-danger",
                resolution.tone === "rule" &&
                  "border-brand-400/25 bg-brand-500/[0.08] text-brand-400",
              )}
            >
              <div className="flex items-center gap-2 text-[13px] font-medium">
                {resolution.tone === "danger" ? (
                  <X size={15} />
                ) : resolution.tone === "rule" ? (
                  <Sparkles size={15} />
                ) : (
                  <Check size={15} />
                )}
                {resolution.label}
              </div>
              {resolution.note && (
                <p className="mt-1 text-[11.5px] text-muted">{resolution.note}</p>
              )}
              <button
                onClick={() => setResolution(null)}
                className="mt-2 font-mono text-[10px] uppercase tracking-wider text-faint underline-offset-2 hover:text-muted hover:underline"
              >
                reset
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="options"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-2"
            >
              {approvalOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setResolution(resolve(opt, item.handle))}
                  className={clsx(
                    "rounded-lg border px-3 py-2 text-[12.5px] font-medium transition-colors",
                    opt === "Approve"
                      ? "border-ok/30 bg-ok/10 text-ok hover:bg-ok/20"
                      : opt === "Reject"
                        ? "border-white/10 bg-white/[0.03] text-muted hover:bg-white/[0.07]"
                        : "border-white/10 bg-white/[0.03] text-ink hover:bg-white/[0.07]",
                  )}
                >
                  {opt}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Guardrails() {
  return (
    <section id="guardrails" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Guardrails & approvals"
          title={
            <>
              Humans stay in the loop on the{" "}
              <span className="text-gradient-accent">actions that matter.</span>
            </>
          }
          description="Set policies once, then approve, reject or automate. OfficeAndCloud learns where you say yes — so routine decisions get faster while the risky ones always reach a human."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {approvals.map((a, i) => (
            <Reveal key={a.handle} delay={i * 0.08}>
              <ApprovalCard item={a} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:items-center">
            <Sparkles size={18} className="mt-0.5 shrink-0 text-brand-400 sm:mt-0" />
            <p className="text-sm text-muted">
              <span className="text-ink">Preferences, learned.</span> Every
              decision tunes your guardrails. Approve the same low-risk action
              twice and OfficeAndCloud suggests a rule — you stay in control of
              what it automates.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
