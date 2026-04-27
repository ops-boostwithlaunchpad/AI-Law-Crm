"use client";

import * as React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { cn, formatCurrency, formatDate, formatRelativeTime } from "@/lib/utils";
import { StageBadge } from "@/components/shared/stage-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { StageProgress } from "@/components/cases/stage-progress";
import { CASE_DETAILS, CASES, type CaseDetail } from "@/lib/mock/cases";
import type { CaseParty } from "@/lib/types";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "documents", label: "Documents" },
  { id: "ai", label: "AI Activity" },
  { id: "comms", label: "Communications" },
  { id: "settlement", label: "Settlement" },
  { id: "financials", label: "Financials" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function getCaseDetail(id: string): CaseDetail | null {
  if (CASE_DETAILS[id]) return CASE_DETAILS[id];
  // Fallback: derive a minimal stub from the row, mark detail data as pending.
  const row = CASES.find((c) => c.id === id);
  if (!row) return null;
  return {
    ...row,
    parties: [
      { role: "client", name: row.clientName, contact: "Pending intake details" },
    ],
    keyFacts: [
      { label: "Case number", value: row.caseNumber },
      { label: "Jurisdiction", value: row.filedJurisdiction },
      { label: "Opened", value: formatDate(row.openedAt, "medium") },
      { label: "Days in stage", value: `${row.daysInStage} days` },
    ],
    timeline: [],
    documents: [],
    communications: [],
    aiActivity: [],
    settlement: [],
    financials: {
      totalCosts: 0,
      recoveredAmount: 0,
      projectedFee: Math.round(row.projectedValue * 0.33),
      clientShare: Math.round(row.projectedValue * 0.62),
      lienAmount: 0,
    },
  };
}

export default function CaseDetailPage() {
  const params = useParams<{ id: string }>();
  const detail = getCaseDetail(params.id);
  const [tab, setTab] = React.useState<TabId>("overview");
  if (!detail) return notFound();

  const isStub = !CASE_DETAILS[params.id];

  return (
    <div className="px-4 sm:px-6 md:px-8 pt-5 md:pt-6 pb-10 md:pb-12 max-w-[1400px]">
      {/* Breadcrumb (sub-navigation — keeps single arrow icon) */}
      <Link
        href="/cases"
        className="inline-flex items-center gap-1.5 text-[12.5px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors mb-5 group"
      >
        <ArrowLeft size={13} strokeWidth={2} className="transition-transform group-hover:-translate-x-0.5" />
        Back to cases
      </Link>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        className="bg-[var(--bg-elevated)] rounded-[20px] border border-[var(--border)] p-5 md:p-7 shadow-[var(--shadow-card)] mb-5 md:mb-6"
      >
        <div className="flex items-start justify-between gap-4 md:gap-6 flex-wrap mb-6 md:mb-7">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <StageBadge stage={detail.stage} />
              <StatusBadge tone={detail.status === "active" ? "info" : detail.status === "won" ? "success" : detail.status === "stalled" ? "warning" : "neutral"}>
                {detail.status}
              </StatusBadge>
              <span className="font-mono text-[11px] text-[var(--text-tertiary)] uppercase tracking-[0.08em]">
                {detail.caseNumber}
              </span>
              {isStub && (
                <span className="font-mono text-[10px] text-[var(--text-tertiary)] uppercase tracking-[0.08em] bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded-[4px] border border-[var(--border)]">
                  Detailed records · coming soon
                </span>
              )}
            </div>
            <h1 className="display-3 text-[var(--text-primary)] mb-2.5">
              {detail.title}
            </h1>
            <div className="flex items-center gap-x-4 gap-y-1 text-[12.5px] text-[var(--text-secondary)] flex-wrap">
              <span>{detail.clientName}</span>
              <span className="text-[var(--text-tertiary)]">·</span>
              <span>Opened {formatDate(detail.openedAt, "medium")}</span>
              <span className="text-[var(--text-tertiary)]">·</span>
              <span>{detail.filedJurisdiction}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            <button className="h-9 px-3.5 rounded-[10px] bg-[var(--bg-elevated)] border border-[var(--border)] text-[12.5px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] inline-flex items-center transition-colors">
              Edit
            </button>
            <button
              className="h-9 px-3.5 rounded-[10px] bg-[var(--accent)] text-white text-[12.5px] font-medium inline-flex items-center hover:bg-[var(--accent-hover)] transition-colors flex-1 md:flex-initial justify-center"
              style={{
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.18) inset, 0 1px 2px rgba(15,23,42,0.18), 0 0 0 1px rgba(37,99,235,0.5), 0 6px 18px -4px rgba(37,99,235,0.4)",
              }}
            >
              Run AI action
            </button>
          </div>
        </div>

        <StageProgress current={detail.stage} daysInStage={detail.daysInStage} />

        <div className="mt-6 md:mt-7 pt-6 border-t border-[var(--border)] grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          <KeyMetric
            label="Projected value"
            value={formatCurrency(detail.projectedValue, { compact: true })}
            tone="text-[var(--text-primary)]"
          />
          <KeyMetric
            label="Pending AI actions"
            value={detail.pendingAIActions.toString()}
            tone={detail.pendingAIActions > 0 ? "text-[var(--ai)]" : "text-[var(--text-tertiary)]"}
            subtitle={detail.pendingAIActions > 0 ? "awaiting your review" : "all caught up"}
          />
          <KeyMetric
            label="Next deadline"
            value={detail.nextDeadline ? formatDate(detail.nextDeadline.date, "short") : "—"}
            subtitle={detail.nextDeadline?.label}
            tone="text-[var(--text-primary)]"
          />
          <KeyMetric
            label="Lead lawyer"
            value={detail.assignedLawyer.name}
            subtitle="Hart & Associates"
            tone="text-[var(--text-primary)]"
          />
        </div>
      </motion.section>

      {/* Tabs */}
      <div className="bg-[var(--bg-elevated)] rounded-[14px] border border-[var(--border)] p-1 mb-5 md:mb-6 inline-flex max-w-full overflow-x-auto no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "relative inline-flex items-center h-9 px-3 sm:px-3.5 text-[12.5px] font-medium rounded-[10px] transition-colors whitespace-nowrap shrink-0",
              tab === t.id
                ? "text-[var(--text-primary)]"
                : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
            )}
          >
            {tab === t.id && (
              <motion.span
                layoutId="case-tab-bg"
                className="absolute inset-0 bg-[var(--bg-secondary)] rounded-[10px]"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      >
        {tab === "overview" && <OverviewTab detail={detail} isStub={isStub} />}
        {tab === "documents" && <DocumentsTab detail={detail} isStub={isStub} />}
        {tab === "ai" && <AIActivityTab detail={detail} isStub={isStub} />}
        {tab === "comms" && <CommunicationsTab detail={detail} isStub={isStub} />}
        {tab === "settlement" && <SettlementTab detail={detail} isStub={isStub} />}
        {tab === "financials" && <FinancialsTab detail={detail} />}
      </motion.div>
    </div>
  );
}

function KeyMetric({
  label,
  value,
  subtitle,
  tone = "text-[var(--text-primary)]",
}: {
  label: string;
  value: string;
  subtitle?: string;
  tone?: string;
}) {
  return (
    <div>
      <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-[var(--text-tertiary)] mb-1.5">
        {label}
      </div>
      <div className={cn("text-[20px] font-bold tabular tracking-tight leading-none", tone)}>
        {value}
      </div>
      {subtitle && (
        <div className="text-[11px] text-[var(--text-tertiary)] mt-1.5">
          {subtitle}
        </div>
      )}
    </div>
  );
}

// ─── Overview tab ──────────────────────────────────────────────

const PARTY_TONE: Record<CaseParty["role"], { bg: string; fg: string }> = {
  client: { bg: "bg-[var(--chip-blue)]", fg: "text-[var(--chip-blue-fg)]" },
  defendant: { bg: "bg-[var(--chip-amber)]", fg: "text-[var(--chip-amber-fg)]" },
  insurer: { bg: "bg-[var(--chip-peach)]", fg: "text-[var(--chip-peach-fg)]" },
  opposing_counsel: { bg: "bg-[var(--chip-lavender)]", fg: "text-[var(--chip-lavender-fg)]" },
  expert: { bg: "bg-[var(--chip-indigo)]", fg: "text-[var(--chip-indigo-fg)]" },
  witness: { bg: "bg-[var(--chip-mint)]", fg: "text-[var(--chip-mint-fg)]" },
};

const PARTY_LABEL: Record<CaseParty["role"], string> = {
  client: "Client",
  defendant: "Defendant",
  insurer: "Insurer",
  opposing_counsel: "Opposing counsel",
  expert: "Expert",
  witness: "Witness",
};

function OverviewTab({ detail, isStub }: { detail: CaseDetail; isStub: boolean }) {
  return (
    <div className="grid grid-cols-12 gap-5 md:gap-6">
      <div className="col-span-12 lg:col-span-8 space-y-6">
        {/* Parties */}
        <Card title="Parties" actions={<AddBtn label="Add party" />}>
          <ul className="divide-y divide-[var(--border)]">
            {detail.parties.map((p, i) => {
              const tone = PARTY_TONE[p.role];
              return (
                <li key={i} className="flex items-center gap-3.5 py-3 first:pt-0 last:pb-0">
                  <span
                    className={cn(
                      "inline-flex items-center justify-center h-9 px-2 min-w-[44px] rounded-[10px] font-mono text-[10px] font-bold tracking-[0.05em] uppercase",
                      tone.bg,
                      tone.fg
                    )}
                  >
                    {PARTY_LABEL[p.role].slice(0, 3)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-[var(--text-primary)]">
                        {p.name}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-[var(--text-tertiary)] bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded-[4px] border border-[var(--border)]">
                        {PARTY_LABEL[p.role]}
                      </span>
                    </div>
                    {p.organization && (
                      <div className="text-[11.5px] text-[var(--text-secondary)] mt-0.5">
                        {p.organization}
                      </div>
                    )}
                    {p.contact && (
                      <div className="text-[11.5px] text-[var(--text-tertiary)] mt-0.5">
                        {p.contact}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        {/* Timeline */}
        <Card title="Timeline">
          {detail.timeline.length === 0 ? (
            <ComingSoonBlock label="Case timeline will appear here as events occur." />
          ) : (
            <ol className="relative">
              <span aria-hidden className="absolute left-[5px] top-2 bottom-2 w-px bg-[var(--border)]" />
              {detail.timeline.map((evt, i) => {
                const dotColor =
                  evt.kind === "ai_action"
                    ? "bg-[var(--ai)]"
                    : evt.kind === "stage_change"
                    ? "bg-[var(--accent)]"
                    : evt.kind === "filing"
                    ? "bg-[var(--chip-peach-fg)]"
                    : "bg-[var(--text-tertiary)]";
                return (
                  <motion.li
                    key={evt.id}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.04 * i, ease: [0.32, 0.72, 0, 1] }}
                    className="relative pl-7 py-3 first:pt-0"
                  >
                    <span
                      className={cn(
                        "absolute left-0 top-[18px] h-2.5 w-2.5 rounded-full ring-4 ring-[var(--bg-elevated)]",
                        dotColor
                      )}
                    />
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] text-[var(--text-primary)] font-medium leading-snug">
                          {evt.label}
                        </div>
                        {evt.description && (
                          <div className="text-[11.5px] text-[var(--text-tertiary)] mt-0.5">
                            {evt.description}
                          </div>
                        )}
                      </div>
                      <span className="font-mono text-[10.5px] tabular text-[var(--text-tertiary)] shrink-0">
                        {formatRelativeTime(evt.timestamp)}
                      </span>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          )}
        </Card>
      </div>

      {/* Right column — key facts */}
      <aside className="col-span-12 lg:col-span-4">
        <Card title="Key facts">
          <dl className="space-y-3">
            {detail.keyFacts.map((f, i) => (
              <div
                key={i}
                className="flex items-baseline justify-between gap-4 pb-3 border-b border-[var(--border)] last:border-b-0 last:pb-0"
              >
                <dt className="text-[12px] text-[var(--text-tertiary)]">{f.label}</dt>
                <dd className="text-[12.5px] font-semibold text-[var(--text-primary)] text-right tabular">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      </aside>
    </div>
  );
}

// ─── Documents tab ─────────────────────────────────────────────

const DOC_CATEGORY_TONE: Record<string, { bg: string; fg: string }> = {
  medical: { bg: "bg-[var(--chip-indigo)]", fg: "text-[var(--chip-indigo-fg)]" },
  demand: { bg: "bg-[var(--chip-peach)]", fg: "text-[var(--chip-peach-fg)]" },
  financial: { bg: "bg-[var(--chip-mint)]", fg: "text-[var(--chip-mint-fg)]" },
  outgoing: { bg: "bg-[var(--chip-blue)]", fg: "text-[var(--chip-blue-fg)]" },
  evidence: { bg: "bg-[var(--chip-amber)]", fg: "text-[var(--chip-amber-fg)]" },
  imaging: { bg: "bg-[var(--chip-lavender)]", fg: "text-[var(--chip-lavender-fg)]" },
  police: { bg: "bg-[var(--chip-blue)]", fg: "text-[var(--chip-blue-fg)]" },
};

function DocumentsTab({ detail, isStub }: { detail: CaseDetail; isStub: boolean }) {
  if (detail.documents.length === 0) {
    return (
      <Card title="Documents">
        <ComingSoonBlock label="Drop a file anywhere on this page to upload — AI categorization and summary will appear here." />
      </Card>
    );
  }

  return (
    <Card title={`Documents (${detail.documents.length})`} actions={<AddBtn label="Upload" />}>
      <ul className="divide-y divide-[var(--border)]">
        {detail.documents.map((d, i) => {
          const primary = d.categories[0] ?? "evidence";
          const tone = DOC_CATEGORY_TONE[primary] ?? DOC_CATEGORY_TONE.evidence;
          return (
            <motion.li
              key={d.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.04 * i, ease: [0.32, 0.72, 0, 1] }}
              className="group py-3.5 first:pt-0 last:pb-0 flex items-start gap-4 hover:bg-[var(--bg-primary)]/30 -mx-2 px-2 rounded-[10px] transition-colors cursor-pointer"
            >
              <span
                className={cn(
                  "inline-flex items-center justify-center h-9 px-2 min-w-[56px] rounded-[10px] font-mono text-[9.5px] font-bold tracking-[0.05em] uppercase",
                  tone.bg,
                  tone.fg
                )}
              >
                {primary}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[13px] font-semibold text-[var(--text-primary)] truncate">
                    {d.name}
                  </span>
                  {d.categories.slice(1).map((c) => (
                    <span key={c} className="font-mono text-[9.5px] uppercase tracking-[0.06em] text-[var(--text-tertiary)] bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded-[3px]">
                      {c}
                    </span>
                  ))}
                </div>
                {d.aiSummary && (
                  <div className="mt-1 text-[12px] text-[var(--text-secondary)] flex items-start gap-1.5">
                    <span className="font-mono text-[9px] font-bold tracking-[0.05em] text-[var(--ai)] bg-[var(--ai-subtle)] px-1.5 py-0.5 rounded-[3px] uppercase mt-px">
                      AI
                    </span>
                    <span>{d.aiSummary}</span>
                  </div>
                )}
                <div className="mt-1 text-[10.5px] text-[var(--text-tertiary)] tabular">
                  {d.size} · uploaded {formatDate(d.uploadedAt, "short")} by {d.uploadedBy}
                </div>
              </div>
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <TextButton label="View" />
                <TextButton label="Download" />
              </div>
            </motion.li>
          );
        })}
      </ul>
    </Card>
  );
}

// ─── AI Activity tab ───────────────────────────────────────────

const AI_STATUS_TONE = {
  pending: "info",
  approved: "success",
  auto: "indigo",
} as const;

const AI_STATUS_LABEL = {
  pending: "Pending review",
  approved: "Approved",
  auto: "Auto-approved",
} as const;

function AIActivityTab({ detail, isStub }: { detail: CaseDetail; isStub: boolean }) {
  if (detail.aiActivity.length === 0) {
    return (
      <Card title="AI activity history">
        <ComingSoonBlock label="The AI hasn't acted on this case yet — its actions will appear here as a chronological feed." />
      </Card>
    );
  }

  return (
    <Card title="AI activity history">
      <ol className="relative">
        <span aria-hidden className="absolute left-[19px] top-3 bottom-3 w-px bg-[var(--border)]" />
        {detail.aiActivity.map((a, i) => (
          <motion.li
            key={a.id}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.04 * i, ease: [0.32, 0.72, 0, 1] }}
            className="relative pl-12 py-4 first:pt-0 last:pb-0 group"
          >
            <span className="absolute left-0 top-3 h-10 w-10 rounded-full bg-[var(--ai-subtle)] border-2 border-[var(--bg-elevated)] flex items-center justify-center font-mono text-[10px] font-bold tracking-[0.05em] text-[var(--ai)]">
              AI
            </span>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[13.5px] font-semibold text-[var(--text-primary)]">
                    {a.label}
                  </span>
                  <StatusBadge tone={AI_STATUS_TONE[a.status]}>
                    {AI_STATUS_LABEL[a.status]}
                  </StatusBadge>
                  {a.confidence !== undefined && (
                    <span className="font-mono text-[10.5px] tabular text-[var(--text-tertiary)] bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded-[4px] border border-[var(--border)]">
                      {Math.round(a.confidence * 100)}% conf
                    </span>
                  )}
                </div>
                <p className="text-[12.5px] text-[var(--text-secondary)] leading-relaxed">
                  {a.description}
                </p>
              </div>
              <span className="font-mono text-[10.5px] tabular text-[var(--text-tertiary)] shrink-0">
                {formatRelativeTime(a.timestamp)}
              </span>
            </div>
          </motion.li>
        ))}
      </ol>
    </Card>
  );
}

// ─── Communications tab ────────────────────────────────────────

const COMM_LABEL: Record<string, string> = {
  email: "EMAIL",
  call: "CALL",
  letter: "LETTER",
};

function CommunicationsTab({ detail, isStub }: { detail: CaseDetail; isStub: boolean }) {
  if (detail.communications.length === 0) {
    return (
      <Card title="Communications">
        <ComingSoonBlock label="Inbound and outbound emails, calls, and letters for this case will be threaded here." />
      </Card>
    );
  }

  return (
    <Card title={`Communications (${detail.communications.length})`} actions={<AddBtn label="New message" />}>
      <ul className="divide-y divide-[var(--border)]">
        {detail.communications.map((c, i) => (
          <motion.li
            key={c.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.04 * i, ease: [0.32, 0.72, 0, 1] }}
            className="py-4 first:pt-0 last:pb-0 group hover:bg-[var(--bg-primary)]/30 -mx-2 px-2 rounded-[10px] transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3.5">
              <span
                className={cn(
                  "inline-flex items-center justify-center h-9 px-2 min-w-[56px] rounded-[10px] font-mono text-[9.5px] font-bold tracking-[0.05em] uppercase",
                  c.direction === "out"
                    ? "bg-[var(--accent-subtle)] text-[var(--accent-strong)]"
                    : "bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                )}
              >
                {COMM_LABEL[c.channel] ?? c.channel}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[13px] font-semibold text-[var(--text-primary)] truncate">
                    {c.subject}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-[var(--text-tertiary)] bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded-[4px] border border-[var(--border)]">
                    {c.direction === "out" ? "outbound" : "inbound"}
                  </span>
                </div>
                <div className="text-[11.5px] text-[var(--text-tertiary)] mb-1.5">
                  {c.from} → {c.to}
                </div>
                <p className="text-[12.5px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                  {c.preview}
                </p>
              </div>
              <span className="font-mono text-[10.5px] tabular text-[var(--text-tertiary)] shrink-0">
                {formatRelativeTime(c.sentAt)}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}

// ─── Settlement tab ────────────────────────────────────────────

function SettlementTab({ detail, isStub }: { detail: CaseDetail; isStub: boolean }) {
  if (detail.settlement.length === 0) {
    return (
      <Card title="Settlement negotiations">
        <ComingSoonBlock label="No offers received yet. The negotiation history with offer/counter-offer will appear here." />
      </Card>
    );
  }
  const latest = detail.settlement[detail.settlement.length - 1];
  return (
    <div className="grid grid-cols-12 gap-5 md:gap-6">
      <div className="col-span-12 lg:col-span-7 space-y-6">
        <Card title="Negotiation history">
          <ul className="space-y-4">
            {detail.settlement.map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * i, ease: [0.32, 0.72, 0, 1] }}
                className="rounded-[14px] border border-[var(--border)] p-4 bg-[var(--bg-primary)]/30"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <div className="text-[13px] font-semibold text-[var(--text-primary)]">
                      Offer received
                    </div>
                    <div className="text-[11.5px] text-[var(--text-tertiary)]">
                      from {s.from} · {formatDate(s.receivedAt, "medium")}
                    </div>
                  </div>
                  <StatusBadge tone={s.status === "accepted" ? "success" : s.status === "rejected" ? "danger" : "info"}>
                    {s.status}
                  </StatusBadge>
                </div>
                <div className="flex items-baseline gap-3 mt-3">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                      Offered
                    </div>
                    <div className="text-[22px] font-bold tabular text-[var(--text-primary)]">
                      {formatCurrency(s.offer, { compact: true })}
                    </div>
                  </div>
                  {s.counterOffered && (
                    <>
                      <span className="text-[var(--text-tertiary)] text-[16px] mx-2 mt-3">→</span>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                          Countered
                        </div>
                        <div className="text-[22px] font-bold tabular text-[var(--accent)]">
                          {formatCurrency(s.counterOffered, { compact: true })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </Card>
      </div>
      <aside className="col-span-12 lg:col-span-5">
        <Card title="Projection">
          <div className="space-y-4">
            <ProjRow label="Demand" value={detail.projectedValue} tone="text-[var(--text-primary)]" />
            <ProjRow
              label="Last counter"
              value={latest?.counterOffered ?? 0}
              tone="text-[var(--accent)]"
            />
            <ProjRow
              label="Latest offer"
              value={latest?.offer ?? 0}
              tone="text-[var(--text-secondary)]"
              strikethrough={latest?.status === "rejected"}
            />
            <div className="pt-3 mt-2 border-t border-[var(--border)] flex items-baseline justify-between">
              <span className="text-[12px] text-[var(--text-tertiary)]">Settlement gap</span>
              <span className="text-[18px] font-bold tabular text-[var(--warning)]">
                {formatCurrency(detail.projectedValue - (latest?.offer ?? 0), { compact: true })}
              </span>
            </div>
          </div>
        </Card>
      </aside>
    </div>
  );
}

function ProjRow({
  label,
  value,
  tone,
  strikethrough,
}: {
  label: string;
  value: number;
  tone: string;
  strikethrough?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-[12.5px] text-[var(--text-secondary)]">{label}</span>
      <span
        className={cn(
          "text-[16px] font-semibold tabular",
          tone,
          strikethrough && "line-through opacity-60"
        )}
      >
        {value > 0 ? formatCurrency(value, { compact: true }) : "—"}
      </span>
    </div>
  );
}

// ─── Financials tab ────────────────────────────────────────────

function FinancialsTab({ detail }: { detail: CaseDetail }) {
  const f = detail.financials;
  return (
    <div className="grid grid-cols-12 gap-5 md:gap-6">
      <div className="col-span-12 lg:col-span-7">
        <Card title="Disbursement projection">
          <div className="space-y-3.5">
            <FinRow label="Projected gross recovery" value={detail.projectedValue} bold />
            <FinRow label="Attorney fee (33%)" value={-f.projectedFee} tone="text-[var(--text-secondary)]" />
            <FinRow label="Costs accrued" value={-f.totalCosts} tone="text-[var(--text-secondary)]" />
            <FinRow label="Medical liens" value={-f.lienAmount} tone="text-[var(--text-secondary)]" />
            <div className="pt-3 mt-3 border-t-2 border-[var(--border-strong)] flex items-baseline justify-between">
              <span className="text-[13px] font-semibold text-[var(--text-primary)]">
                Net to client
              </span>
              <span className="text-[24px] font-bold tabular text-[var(--success)]">
                {formatCurrency(f.clientShare, { compact: true })}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <aside className="col-span-12 lg:col-span-5 space-y-6">
        <Card title="Costs breakdown">
          {f.totalCosts === 0 ? (
            <ComingSoonBlock label="No costs accrued yet — itemized expenses will appear here." />
          ) : (
            <ul className="space-y-2.5">
              <CostRow label="Filing fees" value={1_240} />
              <CostRow label="Expert witness retainer" value={2_500} />
              <CostRow label="Records retrieval" value={340} />
              <CostRow label="Postage & service" value={200} />
            </ul>
          )}
        </Card>

        <Card title="Investor share">
          <div className="text-center py-2">
            <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-[var(--text-tertiary)] mb-2">
              No funding on this case
            </div>
            <button className="inline-flex items-center h-8 px-3 rounded-[8px] bg-[var(--accent-subtle)] text-[var(--accent)] text-[12px] font-medium hover:bg-[var(--accent-soft)] transition-colors">
              List on marketplace
            </button>
          </div>
        </Card>
      </aside>
    </div>
  );
}

function FinRow({
  label,
  value,
  tone = "text-[var(--text-primary)]",
  bold,
}: {
  label: string;
  value: number;
  tone?: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-[12.5px] text-[var(--text-secondary)]">{label}</span>
      <span className={cn("tabular tracking-tight", tone, bold ? "text-[18px] font-bold" : "text-[14px] font-semibold")}>
        {value < 0 ? "−" : ""}
        {formatCurrency(Math.abs(value), { compact: true })}
      </span>
    </div>
  );
}

function CostRow({ label, value }: { label: string; value: number }) {
  return (
    <li className="flex items-baseline justify-between text-[12.5px]">
      <span className="text-[var(--text-secondary)]">{label}</span>
      <span className="tabular font-semibold text-[var(--text-primary)]">
        {formatCurrency(value)}
      </span>
    </li>
  );
}

// ─── Shared ───────────────────────────────────────────────────

function Card({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-[var(--bg-elevated)] rounded-[20px] border border-[var(--border)] p-6 shadow-[var(--shadow-card)]">
      <header className="flex items-center justify-between mb-5">
        <h2 className="text-[15px] font-semibold text-[var(--text-primary)] tracking-tight">
          {title}
        </h2>
        {actions}
      </header>
      {children}
    </section>
  );
}

function AddBtn({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center h-7.5 px-2.5 rounded-[8px] text-[11.5px] font-medium text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors">
      + {label}
    </button>
  );
}

function TextButton({ label }: { label: string }) {
  return (
    <button className="h-7 px-2.5 inline-flex items-center rounded-[7px] text-[11.5px] font-medium text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors">
      {label}
    </button>
  );
}

function ComingSoonBlock({ label }: { label: string }) {
  return (
    <div className="rounded-[12px] border border-dashed border-[var(--border-strong)] p-8 text-center bg-[var(--bg-primary)]/30">
      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-tertiary)] font-semibold mb-2">
        Coming soon
      </div>
      <p className="text-[12.5px] text-[var(--text-secondary)] max-w-[44ch] mx-auto">
        {label}
      </p>
    </div>
  );
}
