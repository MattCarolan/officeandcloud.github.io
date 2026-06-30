import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://officeandcloud.com";
const title = "OfficeAndCloud — The control plane for your digital workforce";
const description =
  "Deploy, govern, monitor and secure AI employees anywhere — local, on-prem, AWS, Azure, GCP or hybrid. Bring your own models, infrastructure and agents.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — OfficeAndCloud",
  },
  description,
  keywords: [
    "AI workforce management",
    "AI agent governance",
    "AI control plane",
    "AI employees",
    "agent observability",
    "enterprise AI",
    "AI guardrails",
    "AI audit logs",
  ],
  authors: [{ name: "OfficeAndCloud" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "OfficeAndCloud",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg`,
        type: "image/svg+xml",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#07080D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased">
        {/* Ambient background layers */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-base"
        >
          <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" />
          <div className="absolute left-1/2 top-[-12%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[140px]" />
          <div className="absolute right-[-10%] top-[30%] h-[420px] w-[520px] rounded-full bg-accent-500/10 blur-[150px]" />
          <div className="absolute bottom-[-10%] left-[-5%] h-[420px] w-[520px] rounded-full bg-brand-700/10 blur-[150px]" />
        </div>
        {children}
      </body>
    </html>
  );
}
