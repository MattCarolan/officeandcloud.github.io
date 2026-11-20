const brandPath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand`;

export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return <img src={`${brandPath}/icon-dark.webp`} alt="" aria-hidden="true" width={256} height={256} className={`object-contain ${className}`} />;
}

export function Logo({ className = "" }: { className?: string }) {
  return <img src={`${brandPath}/logo-dark.webp`} alt="Office & Cloud" width={1000} height={251} className={`block h-auto w-[200px] max-w-full object-contain ${className}`} />;
}
