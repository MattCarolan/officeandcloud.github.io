"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./ui/Logo";
import { footerLinks } from "@/lib/content";

const columnOrder: (keyof typeof footerLinks)[] = ["Product", "Legal", "Connect"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07]">
      {/* faint top glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-brand-500/[0.07] blur-[120px]" />

      <div className="container-x py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] lg:gap-20">
          {/* Brand block */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              The control plane for your digital workforce. Deploy, govern,
              monitor and secure AI employees — wherever they run.
            </p>
            <p className="mt-6 font-display text-lg font-medium tracking-tight text-ink">
              Don&apos;t manage AI.{" "}
              <span className="text-gradient">Manage your digital workforce.</span>
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-3 gap-6">
            {columnOrder.map((group) => (
              <div key={group}>
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-faint">
                  {group}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {footerLinks[group].map((link) => {
                    const external = group === "Connect";
                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
                        >
                          {link.label}
                          {external && (
                            <ArrowUpRight
                              size={13}
                              className="text-faint transition-colors group-hover:text-ink"
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.06] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} OfficeAndCloud. All rights reserved.
          </p>
          <div className="flex items-center gap-2 font-mono text-[11px] text-faint">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
            </span>
            All systems operational · Private preview
          </div>
        </div>
      </div>
    </footer>
  );
}
