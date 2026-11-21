import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const notices = {
  website: {
    heading: "This website is blocked",
    explanation: "Your organization has blocked access to this website.",
    details: "Include the website address and why you need access.",
  },
  application: {
    heading: "This application is blocked",
    explanation: "Your organization has blocked this AI app from running.",
    details: "Include the app name and why you need access.",
  },
};

export function BlockedNotice({ kind }: { kind: keyof typeof notices }) {
  const notice = notices[kind];
  return (
    <main className="container-x grid min-h-screen max-w-[740px] content-center py-12">
      <section className="glass-strong rounded-3xl px-6 py-8 shadow-2xl sm:px-10 sm:py-12" aria-labelledby="blocked-title">
        <Link href="/" className="inline-flex rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
          <Logo />
        </Link>
        <h1 id="blocked-title" className="mt-8 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {notice.heading}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink">{notice.explanation}</p>
        <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-relaxed text-muted">
          If you need an exception or think this was blocked by mistake, contact your organization's IT helpdesk. {notice.details}
        </p>
      </section>
    </main>
  );
}
