import Link from "next/link";
import { clsx } from "@/lib/clsx";

type Variant = "primary" | "ghost" | "soft";
type Size = "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-base disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-base hover:bg-white/90 shadow-[0_8px_30px_-8px_rgba(255,255,255,0.35)]",
  ghost:
    "text-ink border border-white/12 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20",
  soft: "text-ink bg-brand-500/15 border border-brand-400/25 hover:bg-brand-500/25",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      type={type}
      className={clsx(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
}: {
  children: React.ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={clsx(base, sizes[size], variants[variant], className)}
    >
      {children}
    </Link>
  );
}
