"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { faqs } from "@/lib/content";
import { clsx } from "@/lib/clsx";

function FaqRow({
  q,
  a,
  open,
  onToggle,
  index,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="border-b border-white/[0.07]">
      <h3>
        <button
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors"
        >
          <span
            className={clsx(
              "font-display text-base font-medium tracking-tight transition-colors sm:text-lg",
              open ? "text-ink" : "text-ink/85 group-hover:text-ink",
            )}
          >
            {q}
          </span>
          <span
            className={clsx(
              "flex h-8 w-8 flex-none items-center justify-center rounded-full border transition-all duration-300",
              open
                ? "rotate-45 border-brand-400/40 bg-brand-500/15 text-brand-400"
                : "border-white/[0.1] text-muted group-hover:border-white/25 group-hover:text-ink",
            )}
          >
            <Plus size={16} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 pr-12 text-sm leading-relaxed text-muted sm:text-[15px]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered."
            description="Everything you might want to know before requesting the private preview. Still curious? Reach out and we'll get you the rest."
          />

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.015] px-6 sm:px-8">
              {faqs.map((faq, i) => (
                <FaqRow
                  key={faq.q}
                  index={i}
                  q={faq.q}
                  a={faq.a}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
