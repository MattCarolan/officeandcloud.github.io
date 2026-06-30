import type { LucideIcon } from "lucide-react";
import {
  Server,
  Box,
  Cloud,
  Boxes,
  Bot,
  Network,
  Fingerprint,
  ShieldCheck,
  KeyRound,
  ScrollText,
  Scale,
  BrainCircuit,
  CheckCheck,
  Cpu,
  Laptop,
  HardDrive,
  Container,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: "The shift", href: "#shift" },
  { label: "Platform", href: "#platform" },
  { label: "Workforce", href: "#workforce" },
  { label: "Guardrails", href: "#guardrails" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];

/* ------------------------------------------------------------------ */
/*  The shift — typed evolution timeline                              */
/* ------------------------------------------------------------------ */

export interface ShiftStage {
  era: string;
  label: string;
  managed: string;
  icon: LucideIcon;
  current?: boolean;
}

export const shiftStages: ShiftStage[] = [
  {
    era: "1990s",
    label: "Physical servers",
    managed: "Racks, hardware, uptime",
    icon: Server,
  },
  {
    era: "2000s",
    label: "Virtual machines",
    managed: "Hypervisors, images, snapshots",
    icon: HardDrive,
  },
  {
    era: "2010s",
    label: "Cloud",
    managed: "Regions, accounts, spend",
    icon: Cloud,
  },
  {
    era: "2015+",
    label: "Containers",
    managed: "Orchestration, scaling, deploys",
    icon: Container,
  },
  {
    era: "2024+",
    label: "AI agents",
    managed: "Models, prompts, tools, memory",
    icon: Bot,
  },
  {
    era: "Now",
    label: "Digital workforce",
    managed: "Identity, policy, audit, cost",
    icon: Network,
    current: true,
  },
];

/* ------------------------------------------------------------------ */
/*  AI Workforce roster                                               */
/* ------------------------------------------------------------------ */

export type WorkerStatus = "active" | "idle" | "review" | "paused";

export interface Worker {
  role: string;
  handle: string;
  status: WorkerStatus;
  model: string;
  permissions: string;
  permissionLevel: "read" | "scoped" | "elevated";
  memory: string;
  health: number;
  location: string;
  cost: string;
  lastActivity: string;
  accent: "brand" | "accent" | "signal";
}

export const workers: Worker[] = [
  {
    role: "Platform Engineer",
    handle: "atlas",
    status: "active",
    model: "Claude · Sonnet",
    permissions: "Infra · scoped write",
    permissionLevel: "elevated",
    memory: "2.4 GB",
    health: 99,
    location: "AWS · us-east-1",
    cost: "$182 / mo",
    lastActivity: "Drained node pool gpu-7 · 2m ago",
    accent: "brand",
  },
  {
    role: "Executive Assistant",
    handle: "iris",
    status: "active",
    model: "GPT · 4-class",
    permissions: "Calendar · Mail · read",
    permissionLevel: "scoped",
    memory: "640 MB",
    health: 100,
    location: "Local · workstation",
    cost: "$24 / mo",
    lastActivity: "Rescheduled 3 conflicts · 6m ago",
    accent: "accent",
  },
  {
    role: "Finance Analyst",
    handle: "ledger",
    status: "review",
    model: "Llama · 70B (self-host)",
    permissions: "ERP · approve ≤ $5k",
    permissionLevel: "elevated",
    memory: "1.1 GB",
    health: 97,
    location: "On-prem · fin-cluster",
    cost: "$96 / mo",
    lastActivity: "Flagged invoice #8842 · 11m ago",
    accent: "signal",
  },
  {
    role: "HR Recruiter",
    handle: "scout",
    status: "active",
    model: "Mistral · Large",
    permissions: "ATS · read · message",
    permissionLevel: "scoped",
    memory: "512 MB",
    health: 98,
    location: "GCP · europe-west4",
    cost: "$41 / mo",
    lastActivity: "Screened 28 applicants · 18m ago",
    accent: "brand",
  },
  {
    role: "Security Analyst",
    handle: "sentinel",
    status: "active",
    model: "Claude · Opus",
    permissions: "SIEM · read · isolate",
    permissionLevel: "elevated",
    memory: "1.8 GB",
    health: 100,
    location: "Azure · westus3",
    cost: "$210 / mo",
    lastActivity: "Quarantined endpoint · 1m ago",
    accent: "accent",
  },
  {
    role: "Developer",
    handle: "forge",
    status: "idle",
    model: "Qwen · Coder (self-host)",
    permissions: "Repo · PR · no merge",
    permissionLevel: "scoped",
    memory: "3.2 GB",
    health: 95,
    location: "Kubernetes · build-ns",
    cost: "$120 / mo",
    lastActivity: "Opened PR #1207 · 34m ago",
    accent: "brand",
  },
  {
    role: "Customer Support",
    handle: "echo",
    status: "active",
    model: "Gemini · Flash",
    permissions: "Helpdesk · refund ≤ $200",
    permissionLevel: "scoped",
    memory: "768 MB",
    health: 99,
    location: "Hybrid · edge + GCP",
    cost: "$58 / mo",
    lastActivity: "Resolved 47 tickets · just now",
    accent: "accent",
  },
];

/* ------------------------------------------------------------------ */
/*  Guardrails — approval workflows                                   */
/* ------------------------------------------------------------------ */

export interface Approval {
  worker: string;
  handle: string;
  action: string;
  detail: string;
  risk: "high" | "medium" | "low";
  context: string[];
}

export const approvals: Approval[] = [
  {
    worker: "Platform Engineer",
    handle: "atlas",
    action: "Terminate 14 EC2 instances",
    detail: "gpu-7 node pool · us-east-1 · idle 72h",
    risk: "high",
    context: [
      "Matches scheduled scale-down window",
      "Saves an estimated $1,940 / month",
      "No active workloads detected",
    ],
  },
  {
    worker: "Finance Analyst",
    handle: "ledger",
    action: "Approve invoice — $3,200.00",
    detail: "Vendor: Northwind Cloud · PO #8842",
    risk: "medium",
    context: [
      "PO and amount match within tolerance",
      "Vendor verified · 23 prior payments",
      "Within ledger's $5,000 approval limit",
    ],
  },
];

export const approvalOptions = [
  "Approve",
  "Reject",
  "Always allow",
  "Always ask",
] as const;

/* ------------------------------------------------------------------ */
/*  Infrastructure surfaces                                           */
/* ------------------------------------------------------------------ */

export interface InfraNode {
  name: string;
  detail: string;
  icon: LucideIcon;
}

export const infraNodes: InfraNode[] = [
  { name: "Local desktop", detail: "Workstations & laptops", icon: Laptop },
  { name: "On-premises", detail: "Private datacenters", icon: Server },
  { name: "AWS", detail: "EC2 · Bedrock · Lambda", icon: Cloud },
  { name: "Azure", detail: "VMs · AI Foundry", icon: Cloud },
  { name: "Google Cloud", detail: "GCE · Vertex AI", icon: Cloud },
  { name: "Kubernetes", detail: "Any cluster, any region", icon: Boxes },
  { name: "Docker", detail: "Containerized runtimes", icon: Container },
  { name: "Private cloud", detail: "Sovereign & air-gapped", icon: HardDrive },
];

/* ------------------------------------------------------------------ */
/*  Security pillars                                                  */
/* ------------------------------------------------------------------ */

export interface SecurityPillar {
  title: string;
  copy: string;
  icon: LucideIcon;
}

export const securityPillars: SecurityPillar[] = [
  {
    title: "Identity",
    copy: "Every AI worker gets a verifiable identity, owned by you — not your model vendor.",
    icon: Fingerprint,
  },
  {
    title: "RBAC",
    copy: "Role-based access down to the tool call. Grant least privilege, revoke in one click.",
    icon: KeyRound,
  },
  {
    title: "Secrets",
    copy: "Scoped, short-lived credentials. Agents never see a raw key or long-lived token.",
    icon: ShieldCheck,
  },
  {
    title: "Policies",
    copy: "Declarative guardrails that travel with the worker across every runtime and cloud.",
    icon: Scale,
  },
  {
    title: "Audit trails",
    copy: "Immutable, queryable logs of every prompt, action and approval — built for compliance.",
    icon: ScrollText,
  },
  {
    title: "Approvals",
    copy: "Human-in-the-loop on the actions that matter. OfficeAndCloud learns where you say yes.",
    icon: CheckCheck,
  },
  {
    title: "Memory controls",
    copy: "Inspect, scope, redact and expire what each worker remembers. Forget on demand.",
    icon: BrainCircuit,
  },
  {
    title: "Compliance",
    copy: "SOC 2, GDPR and data-residency aware. Keep workers and data inside your boundary.",
    icon: Server,
  },
];

export const ownershipPoints = [
  "Bring your own models",
  "Bring your own infrastructure",
  "Bring your own agents",
];

/* ------------------------------------------------------------------ */
/*  Beta form                                                         */
/* ------------------------------------------------------------------ */

export const companySizes = [
  "1–10",
  "11–50",
  "51–200",
  "201–1,000",
  "1,001–5,000",
  "5,000+",
];

export const aiPlatformOptions = [
  "OpenAI",
  "Anthropic",
  "Google Vertex",
  "AWS Bedrock",
  "Azure AI",
  "Self-hosted / open models",
  "None yet",
];

export const expectedUserRanges = [
  "1–10 AI workers",
  "11–50 AI workers",
  "51–250 AI workers",
  "251–1,000 AI workers",
  "1,000+ AI workers",
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                               */
/* ------------------------------------------------------------------ */

export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "What is OfficeAndCloud?",
    a: "OfficeAndCloud is the control plane for your digital workforce. It's a single platform to deploy, govern, monitor, secure and audit AI employees — wherever they run. Think of it as the management layer that sits above your models and infrastructure, the way an HR and IT system sits above your people and devices.",
  },
  {
    q: "Do I need OpenAI to use it?",
    a: "No. OfficeAndCloud is model-agnostic by design. OpenAI works, but so does Anthropic, Google, Mistral, Llama, Qwen and any open model you self-host. You bring the models; we govern how they're used.",
  },
  {
    q: "Can I use local models?",
    a: "Yes. Workers can run on a laptop, an on-prem GPU cluster, or fully air-gapped — and still appear in the same dashboard, under the same policies and audit trail as everything else.",
  },
  {
    q: "Can I self-host the platform?",
    a: "Yes. OfficeAndCloud offers managed cloud, single-tenant, and self-hosted deployments, including sovereign and air-gapped environments where your data never leaves your boundary.",
  },
  {
    q: "Will you support OpenClaw?",
    a: "Yes. OpenClaw agents register as first-class workers, with the same identity, permissions, memory controls and approvals as any other runtime. Support lands during the private preview.",
  },
  {
    q: "Will you support Claude Code?",
    a: "Yes. Claude Code is a supported developer runtime. You can deploy it as a managed worker with scoped repository permissions, PR-only access, and full activity logging.",
  },
  {
    q: "Will you support MCP?",
    a: "Yes. The Model Context Protocol is a core integration surface. Connect MCP tools and servers once, then grant or revoke them per worker with policy and full audit.",
  },
  {
    q: "Can I run this on-premises?",
    a: "Absolutely. On-prem is a first-class target, not an afterthought. Manage on-prem workers side by side with cloud and local ones from a single pane of glass.",
  },
  {
    q: "When does the private preview begin?",
    a: "The private preview is rolling out in waves to early design partners now. Request access and we'll reach out based on your stack and use case.",
  },
];

/* ------------------------------------------------------------------ */
/*  Footer                                                            */
/* ------------------------------------------------------------------ */

export const footerLinks = {
  Product: [
    { label: "About", href: "#vision" },
    { label: "Vision", href: "#vision" },
    { label: "Private preview", href: "#preview" },
    { label: "FAQ", href: "#faq" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
  Connect: [
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
  ],
};

export const platformIcons = { Cpu, Box, Network, Bot };
