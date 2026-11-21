import type { Metadata } from "next";
import { BlockedNotice } from "../BlockedNotice";

export const metadata: Metadata = {
  title: "Application blocked",
  description: "Get help with an application blocked by your organization's policy.",
  robots: { index: false, follow: false },
};

export default function ApplicationBlockedPage() {
  return <BlockedNotice kind="application" />;
}
