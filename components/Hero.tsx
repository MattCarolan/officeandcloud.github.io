"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { ControlPlaneViz } from "./ControlPlaneViz";
import { LinkButton } from "./ui/Button";
import { easeOut } from "@/lib/motion";

const worksWith = [
  "Claude",
  "GPT",
  "Llama",
  "Mistral",
  "Gemini",
  "Qwen",
  "MCP",
  "Claude Code",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
];

const headlineWords = ["Meet", "Your", "Digital", "Workforce", "Manager"];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const vizY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const vizScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      {/* Visualization */}
      <motion.div
        style={{ y: vizY, scale: vizScale }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[min(140vw,860px)] w-[min(140vw,860px)] opacity-90">
          <ControlPlaneViz />
        </div>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base/40 via-transparent to-base" />

      {/* Foreground content */}
      <motion.div
        style={{ y: textY }}
        className="container-x relative z-10 flex flex-col items-center text-center"
      >
        <motion.a
          href="#preview"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-muted backdrop-blur-md transition-colors hover:border-white/20 hover:text-ink"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
          </span>
          Private preview · rolling out now
          <ArrowRight
            size={13}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </motion.a>

        <h1 className="mt-7 max-w-4xl font-display text-[clamp(2.4rem,7vw,5rem)] font-semibold leading-[0.98] tracking-tightest text-ink">
          {headlineWords.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.1 + i * 0.08 }}
              className={i >= 2 ? "text-gradient" : ""}
            >
              {w}
              {i < headlineWords.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.5 }}
          className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg"
        >
          The enterprise control plane for AI employees. Deploy, govern,
          monitor and secure AI agents anywhere they run.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.62 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <LinkButton href="#preview" size="lg" className="w-full sm:w-auto">
            Request preview access
            <ArrowRight size={16} />
          </LinkButton>
          <LinkButton
            href="#platform"
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Play size={14} className="fill-current" />
            Watch concept
          </LinkButton>
        </motion.div>
      </motion.div>

      {/* Works-with marquee */}
      <div className="absolute inset-x-0 bottom-6 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="container-x"
        >
          <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
            Model & runtime agnostic — works with
          </p>
          <div className="mask-fade-edges overflow-hidden">
            <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
              {[...worksWith, ...worksWith].map((w, i) => (
                <span
                  key={i}
                  className="font-mono text-sm text-muted/70"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
