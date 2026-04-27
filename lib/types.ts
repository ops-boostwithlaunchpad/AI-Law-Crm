export type UserRole = "lawyer" | "investor";

export type CaseStage =
  | "intake"
  | "investigation"
  | "demand"
  | "negotiation"
  | "settlement"
  | "closed";

export type CaseStatus = "active" | "stalled" | "won" | "lost" | "closed";

export type LeadStatus =
  | "new"
  | "qualified"
  | "converted"
  | "rejected"
  | "needs_review";

export type LeadSource =
  | "web_form"
  | "phone_call"
  | "referral"
  | "law_firm_partner"
  | "marketplace";

export type CaseType =
  | "auto_accident"
  | "premises_liability"
  | "medical_malpractice"
  | "product_liability"
  | "wrongful_death"
  | "workplace_injury";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  caseType: CaseType;
  source: LeadSource;
  intakeSummary: string;
  injuryDescription: string;
  estimatedDamages?: number;
  aiRiskScore: number; // 0-100
  aiRecommendation: "approve" | "reject" | "needs_review";
  aiReasoning: string[];
  signals: { label: string; weight: "positive" | "negative" | "neutral" }[];
  status: LeadStatus;
  assignedLawyer?: string;
  createdAt: string;
  state: string;
  city: string;
}

export interface CaseParty {
  role:
    | "client"
    | "defendant"
    | "insurer"
    | "opposing_counsel"
    | "witness"
    | "expert";
  name: string;
  organization?: string;
  contact?: string;
}

export interface CaseTimelineEvent {
  id: string;
  kind: "stage_change" | "filing" | "communication" | "ai_action" | "settlement";
  label: string;
  description?: string;
  timestamp: string;
}

export type AIActionType =
  | "draft_email"
  | "demand_letter"
  | "settlement_proposal"
  | "document_summary"
  | "risk_analysis"
  | "deposition_prep";

export type AIActionStatus =
  | "pending_review"
  | "approved"
  | "rejected"
  | "executing";

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}
