import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Notice" };

export default function PrivacyNoticePage() {
  return (
    <LegalPage title="Privacy Notice">
      <p>{"Office and Cloud provides the AI Registry preview. This notice covers the Office and Cloud website, preview requests, accounts and workspaces."}</p>
      <h2>{"Information we collect and how we use it"}</h2>
      <p><strong>{"Preview requests and transactional emails."}</strong>{" We collect your name, work email address, organization and form timing information. We use that information to process your request, send a confirmation and account setup instructions, and limit duplicate or abusive requests. The confirmation and follow-up use an automated email process. Delivery times can vary. We also use a hashed version of the requesting IP address to apply signup rate limits."}</p>
      <p><strong>{"Accounts and workspaces."}</strong>{" We use your email address, account identifier, verification status and workspace role to authenticate you and manage access. Amazon Cognito handles passwords and verification codes. The registry stores the information you or authorized workspace members enter, such as team and platform names, work contacts, assigned owners, use cases, classifications, review notes and links to documents. We use it to display your registry, record changes and send workspace invitations or review reminders. Workspace access depends on role. Administrators can manage membership and review activity within their organization."}</p>
      <p><strong>{"Security and support."}</strong>{" We use service request details, such as request identifiers, routes and response status, to operate, secure and troubleshoot the preview. The app uses browser session storage during sign-in and invitation setup. GitHub Pages logs visitors' IP addresses for security when it serves the marketing site. When you ask Office and Cloud for support or make a privacy request, we use the information you provide to respond and keep a record of the request. "}<a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection">{"GitHub Pages data collection"}</a></p>
      <h2>{"Who handles the information"}</h2>
      <p>{"We use Amazon Web Services for application hosting, storage, authentication, delivery of the app and transactional email. GitHub Pages hosts the public marketing site. Authorized workspace members can access workspace records according to their roles. We may disclose information when the law requires it."}</p>
      <p>{"Primary application storage is in AWS Canada Central. Certain services, such as global content delivery and email, can process information outside Canada. Information handled outside Canada may be subject to the laws of the place where it is processed. "}<a href="https://www.priv.gc.ca/en/privacy-topics/airports-and-borders/gl_dab_090127/">{"Office of the Privacy Commissioner of Canada guidance on cross-border processing"}</a></p>
      <h2>{"Retention and safeguards"}</h2>
      <p>{"The current application sets preview request records to expire seven days after submission, or seven days after we issue an invitation if we invite you. Invitation links expire seven days after issue and can be used once. Automatic deletion of expired records can take longer than the expiry period. Review reminder records are set to expire after 30 days. The application's service logs are normally retained for 30 days."}</p>
      <p>{"Account, workspace and audit records can be kept after access ends until an account or workspace closure or deletion request is processed, or until the records are no longer needed for an applicable operational or legal purpose. Backup copies can remain until their backup retention period ends. We use encrypted connections, managed encryption for registry storage and role-based workspace access."}</p>
      <h2>{"Your privacy choices"}</h2>
      <p>{"You may ask Office and Cloud about how we handle personal information, request access to or correction of your information, withdraw a preview request, request deletion, or raise a privacy concern. We may ask you to verify your identity or confirm your authority to act for a workspace. We respond to requests and apply retention or deletion rules as required by applicable law."}</p>
      <p>{"Please limit personal information in the registry to necessary work contact details. Keep passwords, access keys, health and financial information, and confidential customer or employee data out of the preview."}</p>
    </LegalPage>
  );
}
