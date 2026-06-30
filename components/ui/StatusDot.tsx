import { clsx } from "@/lib/clsx";

const map = {
  active: { color: "bg-ok", label: "Active", glow: "shadow-[0_0_10px_2px_rgba(62,213,152,0.6)]" },
  idle: { color: "bg-muted", label: "Idle", glow: "" },
  review: { color: "bg-signal", label: "Needs review", glow: "shadow-[0_0_10px_2px_rgba(245,181,68,0.55)]" },
  paused: { color: "bg-faint", label: "Paused", glow: "" },
} as const;

export type StatusKey = keyof typeof map;

export function StatusDot({
  status,
  showLabel = false,
  className,
}: {
  status: StatusKey;
  showLabel?: boolean;
  className?: string;
}) {
  const s = map[status];
  return (
    <span className={clsx("inline-flex items-center gap-2", className)}>
      <span className="relative flex h-2 w-2">
        {status === "active" && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok/60" />
        )}
        <span className={clsx("relative inline-flex h-2 w-2 rounded-full", s.color, s.glow)} />
      </span>
      {showLabel && (
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
          {s.label}
        </span>
      )}
    </span>
  );
}
