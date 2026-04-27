import type { CaseStage } from "@/lib/types";

export interface ApprovalItem {
  id: string;
  caseTitle: string;
  caseNumber: string;
  actionType:
    | "demand_letter"
    | "settlement_proposal"
    | "draft_email"
    | "document_summary"
    | "deposition_prep";
  actionLabel: string;
  preview: string;
  confidence: number;
  createdAt: string;
  priority: "high" | "medium" | "low";
  estValue: number;
  status: "pending" | "in_review" | "auto_approved";
}

export interface ActivityItem {
  id: string;
  kind: "ai_action" | "communication" | "case_update";
  caseTitle: string;
  description: string;
  meta?: string;
  timestamp: string;
  confidence?: number;
}

export interface PipelineStage {
  stage: CaseStage;
  label: string;
  count: number;
  value: number;
}

export interface RevenuePoint {
  month: string;
  demand: number;
  negotiation: number;
  settlement: number;
}

export const PENDING_APPROVALS: ApprovalItem[] = [
  {
    id: "ap_01",
    caseTitle: "Jacobs v. Allstate",
    caseNumber: "PI-2026-0142",
    actionType: "demand_letter",
    actionLabel: "Demand letter draft",
    preview:
      "Pursuant to your insured's policy and the documented injuries totaling $284,500…",
    confidence: 0.92,
    createdAt: "2026-04-27T14:32:00",
    priority: "high",
    estValue: 1_200_000,
    status: "pending",
  },
  {
    id: "ap_02",
    caseTitle: "Cruz v. State Farm",
    caseNumber: "PI-2026-0138",
    actionType: "settlement_proposal",
    actionLabel: "Settlement counter-offer",
    preview:
      "Counter at $725,000 — defense's $480,000 offer undervalues lost wages by ~$190K…",
    confidence: 0.88,
    createdAt: "2026-04-27T13:18:00",
    priority: "high",
    estValue: 725_000,
    status: "pending",
  },
  {
    id: "ap_03",
    caseTitle: "Patel v. Liberty Mutual",
    caseNumber: "PI-2026-0129",
    actionType: "draft_email",
    actionLabel: "Client status update",
    preview:
      "Hi Anita — wanted to give you a quick update on where things stand with your case…",
    confidence: 0.96,
    createdAt: "2026-04-27T11:42:00",
    priority: "medium",
    estValue: 0,
    status: "in_review",
  },
  {
    id: "ap_04",
    caseTitle: "Okonkwo v. Geico",
    caseNumber: "PI-2026-0117",
    actionType: "document_summary",
    actionLabel: "Medical records analysis",
    preview:
      "Reviewed 47 pages from St. Luke's. Key findings: C5–C6 disc herniation confirmed…",
    confidence: 0.94,
    createdAt: "2026-04-27T10:08:00",
    priority: "medium",
    estValue: 380_000,
    status: "pending",
  },
  {
    id: "ap_05",
    caseTitle: "Nguyen v. Travelers",
    caseNumber: "PI-2026-0094",
    actionType: "deposition_prep",
    actionLabel: "Deposition prep memo",
    preview:
      "12 lines of questioning prepared, ranked by impact on liability theory…",
    confidence: 0.79,
    createdAt: "2026-04-27T09:14:00",
    priority: "low",
    estValue: 540_000,
    status: "auto_approved",
  },
];

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: "ac_01",
    kind: "ai_action",
    caseTitle: "Jacobs v. Allstate",
    description: "Drafted demand letter — $1.2M policy limit",
    meta: "Ready for review",
    timestamp: "2026-04-27T14:32:00",
    confidence: 0.92,
  },
  {
    id: "ac_02",
    kind: "ai_action",
    caseTitle: "Cruz v. State Farm",
    description: "Generated counter-offer with damages model",
    meta: "Ready for review",
    timestamp: "2026-04-27T13:18:00",
    confidence: 0.88,
  },
  {
    id: "ac_03",
    kind: "case_update",
    caseTitle: "Williams v. Progressive",
    description: "Stage advanced — Negotiation → Settlement",
    meta: "Auto-progressed",
    timestamp: "2026-04-27T12:51:00",
  },
  {
    id: "ac_04",
    kind: "ai_action",
    caseTitle: "Cruz v. State Farm",
    description: "Analyzed 14 medical records (St. Luke's, Mt. Sinai)",
    meta: "Auto-approved",
    timestamp: "2026-04-27T12:14:00",
    confidence: 0.97,
  },
  {
    id: "ac_05",
    kind: "communication",
    caseTitle: "Patel v. Liberty Mutual",
    description: "Email sent to opposing counsel · 2 attachments",
    meta: "Delivered",
    timestamp: "2026-04-27T11:08:00",
  },
];

export const PIPELINE: PipelineStage[] = [
  { stage: "intake", label: "Intake", count: 8, value: 0 },
  { stage: "investigation", label: "Investigation", count: 14, value: 4_200_000 },
  { stage: "demand", label: "Demand", count: 11, value: 6_800_000 },
  { stage: "negotiation", label: "Negotiation", count: 9, value: 5_100_000 },
  { stage: "settlement", label: "Settlement", count: 5, value: 3_400_000 },
];

export const REVENUE_TREND: RevenuePoint[] = [
  { month: "Jan", demand: 1_200_000, negotiation: 1_800_000, settlement: 600_000 },
  { month: "Feb", demand: 1_400_000, negotiation: 1_600_000, settlement: 800_000 },
  { month: "Mar", demand: 1_100_000, negotiation: 2_100_000, settlement: 950_000 },
  { month: "Apr", demand: 1_400_000, negotiation: 1_800_000, settlement: 1_000_000 },
  { month: "May", demand: 1_500_000, negotiation: 1_900_000, settlement: 850_000 },
  { month: "Jun", demand: 1_300_000, negotiation: 2_200_000, settlement: 1_100_000 },
  { month: "Jul", demand: 1_600_000, negotiation: 2_000_000, settlement: 950_000 },
  { month: "Aug", demand: 1_700_000, negotiation: 2_400_000, settlement: 1_200_000 },
  { month: "Sept", demand: 1_500_000, negotiation: 2_300_000, settlement: 1_050_000 },
  { month: "Oct", demand: 1_400_000, negotiation: 2_100_000, settlement: 980_000 },
  { month: "Nov", demand: 1_200_000, negotiation: 1_900_000, settlement: 920_000 },
  { month: "Dec", demand: 1_300_000, negotiation: 2_000_000, settlement: 1_050_000 },
];

export interface MiniSeries {
  label: string;
  points: number[];
}

export const ACTIVE_CASES_TREND: number[] = [38, 41, 39, 44, 42, 47, 47];
export const SETTLEMENTS_DONUT = { closed: 12, target: 16 };
export const WIN_RATE_TREND: number[] = [82, 84, 83, 85, 86, 87.2];

export interface LeadSource {
  label: string;
  count: number;
  pct: number;
  tone: "blue" | "indigo" | "peach" | "mint";
}

export const LEAD_SOURCES: LeadSource[] = [
  { label: "Direct intake", count: 86, pct: 60, tone: "blue" },
  { label: "Referral network", count: 56, pct: 40, tone: "peach" },
];
