import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: "./fonts/space-grotesk.woff2",
  weight: "400 700",
  variable: "--font-display",
  display: "swap",
});

const sans = localFont({
  src: "./fonts/inter.woff2",
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/jetbrains-mono.woff2",
  weight: "400 600",
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://officeandcloud.com";
const title = "Office & Cloud | Take control of your AI workforce.";
const description =
  "Discover the AI your teams use, establish clear ownership and policies, and keep spending under control.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Office & Cloud",
  },
  description,
  keywords: [
    "AI workforce management",
    "AI agent governance",
    "AI registry",
    "AI economics",
    "AI risk assessment",
    "enterprise AI",
    "AI guardrails",
    "AI audit logs",
  ],
  authors: [{ name: "Office & Cloud" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Office & Cloud",
    title,
    description,
    images: [
      {
        url: "/images/ai-headquarters.webp",
        width: 1536,
        height: 1024,
        alt: "Office & Cloud AI headquarters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/ai-headquarters.webp"],
  },
  robots: { index: true, follow: true },
  icons: {
    apple: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/apple-touch-icon.png?v=5-cloudcase`,
    icon: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/icon-light-64.png?v=5-cloudcase`,
        type: "image/png",
        sizes: "64x64",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/icon-dark-64.png?v=5-cloudcase`,
        type: "image/png",
        sizes: "64x64",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#080B18",
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
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
