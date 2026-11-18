import { Layers3, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { Reveal } from "./ui/Reveal";
export function Registry() {
  return (
    <section id="registry" className="scroll-mt-24 py-20">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow text-accent-400">
            OUR FIRST CAPABILITY · AI REGISTRY
          </span>
          <div className="mt-5 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tightest text-ink sm:text-4xl">
                Know your AI.
                <br />
                Make accountability clear.
              </h2>
              <p className="mt-5 max-w-2xl text-muted">
                The first step toward your digital workforce control plane: a
                lightweight registry of AI platforms and team usage. Govern the
                context and the manager responsible, without creating paperwork
                for every temporary agent.
              </p>
            </div>
            <a
              href="#preview"
              className="inline-flex shrink-0 items-center gap-2 text-sm text-brand-400"
            >
              Request private-preview access
              <ArrowRight size={15} />
            </a>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {[
              [
                Layers3,
                "See what your teams use",
                "Register AI platforms, business purposes and data classifications.",
              ],
              [
                Users,
                "Put humans in charge",
                "Assign service owners and accountable team managers.",
              ],
              [
                ShieldCheck,
                "Keep governance current",
                "Attest, review risk, record decisions and link your existing evidence.",
              ],
            ].map(([Icon, title, copy]: any) => (
              <div
                key={title}
                className="glass-strong rounded-2xl border border-white/[0.06] p-6"
              >
                <Icon size={23} className="text-accent-400" />
                <h3 className="mt-5 font-medium text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
