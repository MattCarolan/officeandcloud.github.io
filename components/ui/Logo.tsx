export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lm-g" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#8B7BFF" />
          <stop offset="1" stopColor="#2DD4E8" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="#11131D" />
      <rect
        width="31"
        height="31"
        x="0.5"
        y="0.5"
        rx="8.5"
        stroke="white"
        strokeOpacity="0.08"
      />
      <circle cx="16" cy="16" r="3.4" fill="url(#lm-g)" />
      <circle
        cx="16"
        cy="16"
        r="8.5"
        stroke="url(#lm-g)"
        strokeWidth="1.3"
        strokeOpacity="0.65"
      />
      <circle cx="16" cy="6.6" r="1.6" fill="#8B7BFF" />
      <circle cx="24.4" cy="20.5" r="1.6" fill="#2DD4E8" />
      <circle cx="7.6" cy="20.5" r="1.6" fill="#F5B544" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="font-display text-[17px] font-semibold tracking-tight text-ink">
        Office<span className="text-muted">And</span>Cloud
      </span>
    </span>
  );
}
