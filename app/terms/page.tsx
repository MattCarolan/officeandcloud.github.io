import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Preview Terms" };

export default function PreviewTermsPage() {
  return (
    <LegalPage title="Preview Terms">
      <p>{"These terms apply when you agree to them and use the Office and Cloud AI Registry preview."}</p>
      <h2>{"Access and evaluation"}</h2>
      <p>{"The preview is free and intended for evaluation of the AI Registry. It lets authorized teams record AI use, assign responsibility and manage reviews. Your organization remains responsible for its entries and for decisions based on them. Features may change or become unavailable during the preview. Any future paid service would have separate terms presented before enrollment."}</p>
      <h2>{"Your account and workspace"}</h2>
      <p>{"Use an email address you are authorized to use, protect your password and verification codes, and keep account access for your own use. Organization administrators are responsible for the memberships and roles they assign. Use the preview only for workspaces and information you are authorized to access. Report unauthorized access to Office and Cloud."}</p>
      <h2>{"Content and acceptable use"}</h2>
      <p>{"You or your organization retain the rights you hold in the information you enter. You give us permission to store, process and display it as needed to provide, secure and support the preview. Only enter information you have permission to use. Keep credentials, personal data beyond necessary work contact details, and confidential or regulated information out of the preview. Use sample or non-sensitive records for testing."}</p>
      <p>{"Use the preview lawfully and respect other users' access. Attempts to access another workspace, interfere with the service, send unsolicited invitations or evade access controls can result in suspension. External tools and documents linked from the registry are subject to the providers' own terms."}</p>
      <h2>{"Changes, suspension and ending access"}</h2>
      <p>{"We may change, suspend or end the preview, or restrict an account to address misuse, security issues or a breach of these Terms. We will provide notice where practical. You can stop using the service and ask Office and Cloud to close your account or discuss options for retrieving your information. Our Privacy Notice explains how we handle personal information and deletion requests."}</p>
      <h2>{"Availability and applicable law"}</h2>
      <p>{"The preview is provided as available for evaluation. Keep independent copies of records your organization needs, and verify registry entries before relying on them for an operational or compliance decision. The laws of British Columbia and applicable federal laws of Canada govern these Terms, subject to any mandatory protections that apply to you. These Terms preserve rights that applicable law protects from waiver."}</p>
    </LegalPage>
  );
}
