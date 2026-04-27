import type {
  CaseStage,
  CaseStatus,
  CaseType,
  CaseParty,
  CaseTimelineEvent,
} from "@/lib/types";

export interface CaseRow {
  id: string;
  caseNumber: string;
  title: string;
  clientName: string;
  caseType: CaseType;
  stage: CaseStage;
  status: CaseStatus;
  projectedValue: number;
  openedAt: string;
  daysInStage: number;
  assignedLawyer: { name: string; tone: "blue" | "indigo" | "peach" };
  nextDeadline?: { label: string; date: string };
  pendingAIActions: number;
  filedJurisdiction: string;
}

export const CASES: CaseRow[] = [
  {
    id: "cs_01",
    caseNumber: "PI-2026-0142",
    title: "Jacobs v. Allstate Insurance Co.",
    clientName: "Maria Lopez",
    caseType: "auto_accident",
    stage: "demand",
    status: "active",
    projectedValue: 1_200_000,
    openedAt: "2026-03-14",
    daysInStage: 9,
    assignedLawyer: { name: "Sarah Chen", tone: "indigo" },
    nextDeadline: { label: "Demand response deadline", date: "2026-05-12" },
    pendingAIActions: 1,
    filedJurisdiction: "N.D. Cal.",
  },
  {
    id: "cs_02",
    caseNumber: "PI-2026-0138",
    title: "Cruz v. State Farm Mutual",
    clientName: "Devonte Cruz",
    caseType: "auto_accident",
    stage: "negotiation",
    status: "active",
    projectedValue: 725_000,
    openedAt: "2026-02-08",
    daysInStage: 14,
    assignedLawyer: { name: "Marcus Reed", tone: "blue" },
    nextDeadline: { label: "Counter-offer due", date: "2026-05-05" },
    pendingAIActions: 1,
    filedJurisdiction: "S.D. Tex.",
  },
  {
    id: "cs_03",
    caseNumber: "PI-2026-0129",
    title: "Patel v. Liberty Mutual",
    clientName: "Anita Patel",
    caseType: "premises_liability",
    stage: "investigation",
    status: "active",
    projectedValue: 380_000,
    openedAt: "2026-04-02",
    daysInStage: 26,
    assignedLawyer: { name: "Sarah Chen", tone: "indigo" },
    nextDeadline: { label: "Expert witness deadline", date: "2026-06-01" },
    pendingAIActions: 1,
    filedJurisdiction: "D. Mass.",
  },
  {
    id: "cs_04",
    caseNumber: "PI-2026-0117",
    title: "Okonkwo v. Geico",
    clientName: "James Okonkwo",
    caseType: "workplace_injury",
    stage: "investigation",
    status: "active",
    projectedValue: 1_800_000,
    openedAt: "2026-02-21",
    daysInStage: 12,
    assignedLawyer: { name: "Sarah Chen", tone: "indigo" },
    nextDeadline: { label: "OSHA records request", date: "2026-05-08" },
    pendingAIActions: 1,
    filedJurisdiction: "S.D. Tex.",
  },
  {
    id: "cs_05",
    caseNumber: "PI-2026-0094",
    title: "Nguyen v. Travelers",
    clientName: "Tien Nguyen",
    caseType: "premises_liability",
    stage: "intake",
    status: "active",
    projectedValue: 540_000,
    openedAt: "2026-04-22",
    daysInStage: 6,
    assignedLawyer: { name: "Marcus Reed", tone: "blue" },
    nextDeadline: { label: "Initial demand letter", date: "2026-05-18" },
    pendingAIActions: 1,
    filedJurisdiction: "C.D. Cal.",
  },
  {
    id: "cs_06",
    caseNumber: "PI-2026-0078",
    title: "Williams v. Progressive",
    clientName: "Tara Williams",
    caseType: "auto_accident",
    stage: "settlement",
    status: "won",
    projectedValue: 920_000,
    openedAt: "2025-11-04",
    daysInStage: 4,
    assignedLawyer: { name: "Sarah Chen", tone: "indigo" },
    nextDeadline: { label: "Disbursement complete", date: "2026-05-02" },
    pendingAIActions: 0,
    filedJurisdiction: "S.D.N.Y.",
  },
  {
    id: "cs_07",
    caseNumber: "PI-2026-0065",
    title: "Friedman v. Sunshine Bar & Grill",
    clientName: "Tara Friedman",
    caseType: "auto_accident",
    stage: "demand",
    status: "active",
    projectedValue: 215_000,
    openedAt: "2026-04-25",
    daysInStage: 3,
    assignedLawyer: { name: "Sarah Chen", tone: "indigo" },
    nextDeadline: { label: "Records subpoena", date: "2026-05-10" },
    pendingAIActions: 0,
    filedJurisdiction: "S.D. Fla.",
  },
  {
    id: "cs_08",
    caseNumber: "PI-2026-0042",
    title: "Hartwell v. CityRide LLC",
    clientName: "Jordan Hartwell",
    caseType: "auto_accident",
    stage: "negotiation",
    status: "stalled",
    projectedValue: 480_000,
    openedAt: "2025-12-19",
    daysInStage: 38,
    assignedLawyer: { name: "Pia Okafor", tone: "peach" },
    nextDeadline: { label: "Mediation hearing", date: "2026-05-22" },
    pendingAIActions: 0,
    filedJurisdiction: "N.D. Ill.",
  },
];

export const CASE_STATS = {
  active: 47,
  pipeline_value: 14_200_000,
  avg_age_days: 84,
  win_rate: 87.2,
};

export const PIPELINE_BREAKDOWN = [
  { stage: "intake" as const, label: "Intake", count: 8, value: 0 },
  { stage: "investigation" as const, label: "Investigation", count: 14, value: 4_200_000 },
  { stage: "demand" as const, label: "Demand", count: 11, value: 6_800_000 },
  { stage: "negotiation" as const, label: "Negotiation", count: 9, value: 5_100_000 },
  { stage: "settlement" as const, label: "Settlement", count: 5, value: 3_400_000 },
];

// ─── Detail data for case detail page ────────────────────────

export interface CaseDetail extends CaseRow {
  parties: CaseParty[];
  keyFacts: { label: string; value: string }[];
  timeline: CaseTimelineEvent[];
  documents: { id: string; name: string; mime: string; size: string; uploadedBy: string; uploadedAt: string; aiSummary?: string; categories: string[] }[];
  communications: { id: string; direction: "in" | "out"; channel: "email" | "letter" | "call"; subject: string; from: string; to: string; sentAt: string; preview: string }[];
  aiActivity: { id: string; type: string; label: string; description: string; status: "pending" | "approved" | "auto"; confidence?: number; timestamp: string }[];
  settlement: { offer: number; from: string; status: "active" | "rejected" | "accepted"; receivedAt: string; counterOffered?: number }[];
  financials: { totalCosts: number; recoveredAmount: number; projectedFee: number; clientShare: number; lienAmount: number };
}

export const CASE_DETAILS: Record<string, CaseDetail> = {
  cs_01: {
    ...CASES[0],
    parties: [
      { role: "client", name: "Maria Lopez", contact: "(415) 555-2841 · maria.lopez@gmail.com" },
      { role: "defendant", name: "Robert Jacobs", organization: "Individual", contact: "Through counsel" },
      { role: "insurer", name: "Allstate Insurance Co.", organization: "Allstate", contact: "Adjuster: K. Henley · (800) 555-0140" },
      { role: "opposing_counsel", name: "Daniel Mehta", organization: "Mehta & Wong LLP", contact: "dmehta@mehtawong.com" },
      { role: "expert", name: "Dr. Amanda Soto, MD", organization: "UCSF Spine Center", contact: "Treating physician" },
    ],
    keyFacts: [
      { label: "Date of incident", value: "March 14, 2026" },
      { label: "Location", value: "I-280 NB at Mariposa, San Francisco" },
      { label: "Liability", value: "100% defendant (police report)" },
      { label: "Policy limits", value: "$1.2M bodily injury / $500K UM" },
      { label: "Medical specials", value: "$284,500 (and accruing)" },
      { label: "Lost wages", value: "$48,200 (12 weeks @ $4,016/wk)" },
      { label: "Statute deadline", value: "March 14, 2028" },
    ],
    timeline: [
      { id: "t01", kind: "filing", label: "Demand letter sent", description: "$1.2M policy-limit demand transmitted to opposing counsel.", timestamp: "2026-04-19T10:14:00" },
      { id: "t02", kind: "ai_action", label: "AI drafted demand letter", description: "92% confidence — approved by S. Chen.", timestamp: "2026-04-18T15:08:00" },
      { id: "t03", kind: "stage_change", label: "Stage advanced: Investigation → Demand", timestamp: "2026-04-18T15:02:00" },
      { id: "t04", kind: "ai_action", label: "Damages model generated", description: "Multiplier 3.2x specials. Range $380–520K.", timestamp: "2026-04-12T11:45:00" },
      { id: "t05", kind: "communication", label: "Treating physician records received", description: "247 pages from UCSF Spine Center.", timestamp: "2026-04-04T09:22:00" },
      { id: "t06", kind: "filing", label: "Case opened", description: "Lead converted from web form intake.", timestamp: "2026-03-14T08:00:00" },
    ],
    documents: [
      { id: "d01", name: "Demand_Letter_Final_v3.pdf", mime: "application/pdf", size: "186 KB", uploadedBy: "AI · Sarah Chen", uploadedAt: "2026-04-19", aiSummary: "Policy-limit demand citing $284K medical specials and 3.2x multiplier", categories: ["demand", "outgoing"] },
      { id: "d02", name: "UCSF_MedicalRecords_FullSet.pdf", mime: "application/pdf", size: "12.4 MB", uploadedBy: "Records team", uploadedAt: "2026-04-04", aiSummary: "247 pages — confirms C5–C6 strain, lumbar contusion, ongoing PT", categories: ["medical", "evidence"] },
      { id: "d03", name: "Police_Report_240314.pdf", mime: "application/pdf", size: "94 KB", uploadedBy: "Sarah Chen", uploadedAt: "2026-03-15", aiSummary: "Officer Jimenez assigns 100% fault to other driver", categories: ["police", "evidence"] },
      { id: "d04", name: "Lost_Wages_Calculation.xlsx", mime: "application/vnd.ms-excel", size: "32 KB", uploadedBy: "Pia Okafor", uploadedAt: "2026-04-10", aiSummary: "12 weeks × $4,016/wk = $48,200 confirmed", categories: ["financial"] },
      { id: "d05", name: "MRI_Results_240328.dcm", mime: "image/dicom", size: "44 MB", uploadedBy: "UCSF", uploadedAt: "2026-03-29", aiSummary: "C5–C6 disc bulge, no surgical indication yet", categories: ["medical", "imaging"] },
    ],
    communications: [
      { id: "c01", direction: "out", channel: "email", subject: "Demand letter — Jacobs/Allstate (PI-2026-0142)", from: "schen@hartlaw.com", to: "dmehta@mehtawong.com", sentAt: "2026-04-19T10:18:00", preview: "Counsel — please find attached our policy-limit demand on behalf of our client Maria Lopez…" },
      { id: "c02", direction: "in", channel: "email", subject: "Re: Records request", from: "records@ucsf.edu", to: "intake@hartlaw.com", sentAt: "2026-04-04T09:18:00", preview: "Attached please find the requested medical records for patient Maria Lopez…" },
      { id: "c03", direction: "out", channel: "call", subject: "Client check-in", from: "Sarah Chen", to: "Maria Lopez", sentAt: "2026-04-02T14:30:00", preview: "Discussed PT progress and updated on demand letter timeline." },
      { id: "c04", direction: "in", channel: "email", subject: "Acknowledgement of representation", from: "k.henley@allstate.com", to: "schen@hartlaw.com", sentAt: "2026-03-22T11:02:00", preview: "Please be advised that I have been assigned to handle your client's claim…" },
    ],
    aiActivity: [
      { id: "a01", type: "demand_letter", label: "Drafted policy-limit demand letter", description: "Generated $1.2M demand citing medical specials, lost wages, and pain-and-suffering multiplier. Awaiting your approval.", status: "pending", confidence: 0.92, timestamp: "2026-04-27T14:32:00" },
      { id: "a02", type: "document_summary", label: "Summarized 247 pages of medical records", description: "Identified C5–C6 strain confirmation, treatment timeline, and PT recommendations. Auto-approved.", status: "auto", confidence: 0.97, timestamp: "2026-04-04T09:32:00" },
      { id: "a03", type: "risk_analysis", label: "Updated risk score after MRI received", description: "Score moved from 78 → 84 — bulge findings strengthen damages position.", status: "auto", confidence: 0.91, timestamp: "2026-03-29T15:14:00" },
      { id: "a04", type: "draft_email", label: "Drafted records request email", description: "Sent to UCSF Spine Center records dept. Approved by S. Chen.", status: "approved", confidence: 0.95, timestamp: "2026-03-22T10:08:00" },
    ],
    settlement: [
      { offer: 280_000, from: "Allstate (initial)", status: "rejected", receivedAt: "2026-04-22T14:00:00", counterOffered: 1_200_000 },
    ],
    financials: {
      totalCosts: 4_280,
      recoveredAmount: 0,
      projectedFee: 400_000, // 33%
      clientShare: 745_000,
      lienAmount: 51_000,
    },
  },
};
