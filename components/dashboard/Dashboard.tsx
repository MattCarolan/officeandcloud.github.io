import {
  Users,
  Boxes,
  Scale,
  ShieldCheck,
  CheckCheck,
  Activity,
  ScrollText,
  Network,
  Gauge,
  Search,
  Plus,
  TrendingUp,
  TrendingDown,
  BrainCircuit,
  Server,
  Cloud,
  Laptop,
} from "lucide-react";
import { StatusDot } from "../ui/StatusDot";
import { Counter } from "../ui/Counter";
import { AreaChart } from "../ui/AreaChart";
import { workers } from "@/lib/content";

const sidebar = [
  { label: "Workforce", icon: Users, active: true },
  { label: "Models", icon: Boxes },
  { label: "Policies", icon: Scale },
  { label: "Guardrails", icon: ShieldCheck },
  { label: "Approvals", icon: CheckCheck, badge: 3 },
  { label: "Activity", icon: Activity },
  { label: "Audit logs", icon: ScrollText },
  { label: "Infrastructure", icon: Network },
  { label: "Usage", icon: Gauge },
];

const kpis = [
  { label: "Active workers", value: 24, suffix: "", trend: "+6", up: true },
  { label: "Pending approvals", value: 3, suffix: "", trend: "2 high", up: false },
  { label: "Monthly cost", value: 4182, prefix: "$", trend: "-8%", up: false },
  { label: "Fleet health", value: 98.6, suffix: "%", decimals: 1, trend: "+0.4", up: true },
];

const activity = [
  { who: "sentinel", what: "quarantined endpoint ws-44", when: "1m", kind: "accent" },
  { who: "atlas", what: "drained node pool gpu-7", when: "2m", kind: "brand" },
  { who: "ledger", what: "flagged invoice #8842 for review", when: "11m", kind: "signal" },
  { who: "echo", what: "resolved 47 support tickets", when: "14m", kind: "accent" },
  { who: "forge", what: "opened PR #1207 · billing-svc", when: "34m", kind: "brand" },
];

const audit = [
  "08:42:11  policy.eval  atlas  ec2:Terminate  → require_approval",
  "08:41:55  auth.grant   echo   helpdesk:refund(≤200)  → ok",
  "08:40:02  memory.redact iris  pii.email  → 4 records",
  "08:39:18  approval.deny ledger invoice#8842>limit → queued",
];

const infra = [
  { name: "AWS", count: 9, icon: Cloud },
  { name: "Azure", count: 5, icon: Cloud },
  { name: "GCP", count: 4, icon: Cloud },
  { name: "On-prem", count: 3, icon: Server },
  { name: "Local", count: 3, icon: Laptop },
];

const usage = [12, 18, 14, 22, 28, 24, 33, 30, 41, 38, 47, 52];

function kindDot(kind: string) {
  if (kind === "brand") return "bg-brand-400";
  if (kind === "accent") return "bg-accent-400";
  return "bg-signal";
}

export function Dashboard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-panel">
      {/* window bar */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-panel/60 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="mx-auto hidden items-center gap-2 rounded-md border border-white/[0.06] bg-base/60 px-3 py-1 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" />
          <span className="font-mono text-[11px] text-muted">
            app.officeandcloud.com/workforce
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <span className="hidden font-mono text-[10px] uppercase tracking-wider text-faint md:inline">
            Acme Corp · prod
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/30 text-[10px] font-semibold text-brand-400">
            AC
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-[196px_1fr]">
        {/* sidebar */}
        <aside className="hidden flex-col gap-0.5 border-r border-white/[0.06] bg-panel/30 p-3 md:flex">
          <p className="px-2 pb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            Console
          </p>
          {sidebar.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] ${
                  item.active
                    ? "bg-white/[0.06] text-ink"
                    : "text-muted"
                }`}
              >
                <Icon size={15} strokeWidth={1.7} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-signal/20 px-1.5 text-[10px] font-semibold text-signal">
                    {item.badge}
                  </span>
                )}
              </div>
            );
          })}
        </aside>

        {/* main */}
        <div className="min-w-0 p-4 sm:p-5">
          {/* header */}
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                Digital workforce
              </h3>
              <p className="text-xs text-muted">
                24 AI employees · 6 humans in the approval loop
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-lg border border-white/[0.06] bg-base/50 px-2.5 py-1.5 sm:flex">
                <Search size={13} className="text-faint" />
                <span className="font-mono text-[11px] text-faint">
                  Search workers…
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-base">
                <Plus size={13} /> Deploy worker
              </span>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {kpis.map((k) => (
              <div
                key={k.label}
                className="rounded-xl border border-white/[0.06] bg-panel/50 p-3"
              >
                <p className="font-mono text-[10px] uppercase tracking-wider text-faint">
                  {k.label}
                </p>
                <div className="mt-1.5 flex items-end justify-between">
                  <span className="font-display text-2xl font-semibold tracking-tight text-ink">
                    <Counter
                      value={k.value}
                      prefix={k.prefix}
                      suffix={k.suffix}
                      decimals={k.decimals ?? 0}
                    />
                  </span>
                  <span
                    className={`inline-flex items-center gap-0.5 text-[11px] ${
                      k.up ? "text-ok" : "text-muted"
                    }`}
                  >
                    {k.up ? (
                      <TrendingUp size={12} />
                    ) : (
                      <TrendingDown size={12} />
                    )}
                    {k.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* middle: table + side */}
          <div className="mt-3 grid gap-3 lg:grid-cols-3">
            {/* workforce table */}
            <div className="rounded-xl border border-white/[0.06] bg-panel/40 lg:col-span-2">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
                <span className="text-[13px] font-medium text-ink">
                  Workers
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
                  live
                </span>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {workers.slice(0, 5).map((w) => (
                  <div
                    key={w.handle}
                    className="grid grid-cols-[1.4fr_1fr_0.7fr] items-center gap-2 px-4 py-2.5 sm:grid-cols-[1.4fr_1fr_0.9fr_0.6fr]"
                  >
                    <div className="flex items-center gap-2.5">
                      <StatusDot status={w.status} />
                      <div className="min-w-0">
                        <p className="truncate text-[13px] text-ink">
                          {w.role}
                        </p>
                        <p className="truncate font-mono text-[10px] text-faint">
                          @{w.handle}
                        </p>
                      </div>
                    </div>
                    <span className="truncate font-mono text-[11px] text-muted">
                      {w.model}
                    </span>
                    <span className="hidden truncate font-mono text-[11px] text-muted sm:block">
                      {w.location}
                    </span>
                    <span className="text-right font-mono text-[11px] text-muted">
                      {w.cost.replace(" / mo", "")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* approvals + memory */}
            <div className="flex flex-col gap-3">
              <div className="rounded-xl border border-signal/20 bg-signal/[0.06] p-3.5">
                <div className="flex items-center gap-2">
                  <CheckCheck size={14} className="text-signal" />
                  <span className="text-[13px] font-medium text-ink">
                    Approval queue
                  </span>
                  <span className="ml-auto rounded-full bg-signal/20 px-1.5 text-[10px] font-semibold text-signal">
                    3
                  </span>
                </div>
                <p className="mt-2.5 text-[12px] text-ink">
                  <span className="font-mono text-signal">atlas</span> wants to
                  terminate 14 EC2 instances
                </p>
                <p className="font-mono text-[10px] text-faint">
                  gpu-7 · saves ~$1,940/mo
                </p>
                <div className="mt-2.5 flex gap-1.5">
                  <span className="flex-1 rounded-md bg-ok/20 py-1 text-center text-[11px] font-medium text-ok">
                    Approve
                  </span>
                  <span className="flex-1 rounded-md bg-white/[0.05] py-1 text-center text-[11px] text-muted">
                    Reject
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-panel/40 p-3.5">
                <div className="flex items-center gap-2">
                  <BrainCircuit size={14} className="text-accent-400" />
                  <span className="text-[13px] font-medium text-ink">
                    Memory
                  </span>
                </div>
                <div className="mt-2.5 space-y-2">
                  {[
                    ["atlas", 62],
                    ["sentinel", 48],
                    ["forge", 81],
                  ].map(([name, pct]) => (
                    <div key={name as string}>
                      <div className="flex justify-between font-mono text-[10px] text-faint">
                        <span>@{name}</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent-500 to-brand-400"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* bottom: usage + infra + audit */}
          <div className="mt-3 grid gap-3 lg:grid-cols-3">
            <div className="rounded-xl border border-white/[0.06] bg-panel/40 p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-ink">
                  Tasks executed
                </span>
                <span className="font-mono text-[10px] text-faint">7d</span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-xl font-semibold text-ink">
                  <Counter value={18.4} decimals={1} suffix="k" />
                </span>
                <span className="text-[11px] text-ok">+23%</span>
              </div>
              <div className="mt-2 h-16">
                <AreaChart data={usage} />
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-panel/40 p-3.5">
              <div className="mb-2.5 flex items-center gap-2">
                <Network size={14} className="text-brand-400" />
                <span className="text-[13px] font-medium text-ink">
                  Infrastructure
                </span>
              </div>
              <div className="space-y-1.5">
                {infra.map((node) => {
                  const Icon = node.icon;
                  return (
                    <div
                      key={node.name}
                      className="flex items-center gap-2"
                    >
                      <Icon size={13} className="text-muted" />
                      <span className="flex-1 text-[12px] text-muted">
                        {node.name}
                      </span>
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-brand-400/70"
                          style={{ width: `${(node.count / 9) * 100}%` }}
                        />
                      </div>
                      <span className="w-4 text-right font-mono text-[11px] text-ink">
                        {node.count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-panel/40 p-3.5">
              <div className="mb-2 flex items-center gap-2">
                <Activity size={14} className="text-accent-400" />
                <span className="text-[13px] font-medium text-ink">
                  Activity
                </span>
              </div>
              <div className="space-y-2">
                {activity.slice(0, 4).map((a, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${kindDot(
                        a.kind,
                      )}`}
                    />
                    <p className="text-[11px] leading-snug text-muted">
                      <span className="font-mono text-ink">@{a.who}</span>{" "}
                      {a.what}{" "}
                      <span className="text-faint">· {a.when}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* audit strip */}
          <div className="mt-3 overflow-hidden rounded-xl border border-white/[0.06] bg-base/50">
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-3.5 py-2">
              <ScrollText size={13} className="text-muted" />
              <span className="text-[12px] font-medium text-ink">
                Audit log
              </span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-faint">
                immutable
              </span>
            </div>
            <div className="space-y-1 p-3.5">
              {audit.map((line, i) => (
                <p
                  key={i}
                  className="truncate font-mono text-[10.5px] text-muted/80"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
