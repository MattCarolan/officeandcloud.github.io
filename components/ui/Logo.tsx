const brandPath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand`;

type BrandProps = { className?: string; surface?: "dark" | "light" };

export function LogoMark({ className = "h-7 w-7", surface = "dark" }: BrandProps) {
  return <img src={`${brandPath}/cloudcase-icon-for-${surface}.svg`} alt="" aria-hidden="true" width={320} height={264} className={`object-contain ${className}`} />;
}

export function Logo({ className = "", surface = "dark" }: BrandProps) {
  return <img src={`${brandPath}/cloudcase-logo-for-${surface}.svg`} alt="Office & Cloud" width={1371} height={264} className={`block h-auto w-[200px] max-w-full object-contain ${className}`} />;
}
