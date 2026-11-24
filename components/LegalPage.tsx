import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "./ui/Logo";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main id="main-content" className="container-x py-12 sm:py-20">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-medium text-brand-400 hover:underline">
          <Logo />
        </Link>
        <h1 className="mb-8 mt-6 font-display text-4xl font-semibold text-ink sm:text-5xl">
          {title}
        </h1>
        <div className="space-y-5 text-base leading-relaxed text-muted [&_a]:text-brand-400 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:pt-4 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_strong]:text-ink">
          {children}
        </div>
      </article>
    </main>
  );
}
