import type { ReactNode } from "react";
export function FutureCapability({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="container-x">
        <p className="border-t border-white/[0.06] pt-6 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-faint">
          Platform vision · concept demonstration · future capability
        </p>
      </div>
      {children}
    </div>
  );
}
