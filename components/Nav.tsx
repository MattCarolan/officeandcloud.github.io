"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./ui/Logo";
import { LinkButton } from "./ui/Button";
import { navLinks } from "@/lib/content";
import { APP_SIGN_IN_URL } from "@/lib/config";
import { clsx } from "@/lib/clsx";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 max-w-[100vw]">
      <div
        className={clsx(
          "transition-all duration-300",
          scrolled
            ? "border-b border-white/[0.06] bg-base/70 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <nav className="container-x flex h-16 items-center justify-between gap-2 lg:gap-0">
          <Link href="#top" className="min-w-0" aria-label="OfficeAndCloud home">
            <Logo />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:gap-3">
            <Link
              href={APP_SIGN_IN_URL}
              className="inline-flex min-h-11 items-center whitespace-nowrap rounded-md px-2 text-sm text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:min-h-0 lg:px-0 lg:text-muted lg:hover:text-ink"
            >
              Sign in
            </Link>

            <div className="hidden lg:block">
              <LinkButton href="#preview" size="md">
                Request access
              </LinkButton>
            </div>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-ink lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="container-x lg:hidden"
          >
            <div className="mt-2 glass-strong rounded-2xl p-4">
              <div className="flex flex-col">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-[15px] text-muted transition-colors hover:bg-white/5 hover:text-ink"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="mt-3 border-t border-white/[0.06] pt-3">
                <LinkButton
                  href="#preview"
                  size="lg"
                  className="w-full"
                >
                  Request access
                </LinkButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
