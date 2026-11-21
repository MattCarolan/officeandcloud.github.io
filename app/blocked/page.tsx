import type { Metadata } from "next";
import { BlockedNotice } from "./BlockedNotice";

export const metadata: Metadata = {
  title: "Website blocked",
  description: "Get help with a website blocked by your organization's policy.",
  robots: { index: false, follow: false },
};

export default function WebsiteBlockedPage() {
  return <BlockedNotice kind="website" />;
}
