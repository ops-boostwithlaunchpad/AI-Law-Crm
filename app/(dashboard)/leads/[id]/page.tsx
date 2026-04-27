"use client";

import * as React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { cn, formatCurrency, formatDate, formatRelativeTime } from "@/lib/utils";
import { RiskScore } from "@/components/shared/risk-score";
import { StatusBadge } from "@/components/shared/status-badge";
import { LEADS } from "@/lib/mock/leads";
import {
  CASE_TYPE_CONFIG,
  SOURCE_LABEL,
  STATUS_LABEL,
  STATUS_TONE,
  CHIP_BG,
} from "@/components/leads/leads-table";

export default function LeadDetailPage() {
  const params = useParams<{ id: string }>();
  const lead = LEADS.find((l) => l.id === params.id);
  if (!lead) return notFound();

  const ctype = CASE_TYPE_CONFIG[lead.caseType];
  const chipStyle = CHIP_BG[ctype.tone];

  return (
    <div className="px-8 pt-6 pb-12 max-w-[1400px]">
      {/* Breadcrumb */}
      <Link
        href="/leads"
        className="inline-flex items-center gap-1.5 text-[12.5px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors mb-5 group"
      >
        <ArrowLeft size={13} strokeWidth={2} className="transition-transform group-hover:-translate-x-0.5" />
        Back to leads
      </Link>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        className="bg-[var(--bg-elevated)] rounded-[20px] border border-[var(--border)] p-7 shadow-[var(--shadow-card)] mb-6"
      >
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="flex items-start gap-5 min-w-0">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#6366f1] flex items-center justify-center text-white text-[20px] font-semibold tracking-wide shrink-0 shadow-[0_4px_14px_-2px_rgba(37,99,235,0.4)]">
              {lead.name.split(" ").slice(0, 2).map((p) => p[0]).join("")}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                <h1 className="display-3 text-[var(--text-primary)]">{lead.name}</h1>
                <StatusBadge tone={STATUS_TONE[lead.status]}>
                  {STATUS_LABEL[lead.status]}
                </StatusBadge>
                <span className="font-mono text-[10.5px] text-[var(--text-tertiary)] uppercase tracking-[0.08em]">
                  Lead · {lead.id.replace("ld_", "LD-")}
                </span>
              </div>
              <div className="flex items-center gap-x-4 gap-y-1 text-[12.5px] text-[var(--text-secondary)] flex-wrap">
                <a className="hover:text-[var(--accent)] transition-colors" href={`mailto:${lead.email}`}>
                  {lead.email}
                </a>
                <span className="text-[var(--text-tertiary)]">·</span>
                <a className="hover:text-[var(--accent)] transition-colors tabular" href={`tel:${lead.phone}`}>
                  {lead.phone}
                </a>
                <span className="text-[var(--text-tertiary)]">·</span>
                <span>{lead.city}, {lead.state}</span>
                <span className="text-[var(--text-tertiary)]">·</span>
                <span>{SOURCE_LABEL[lead.source]}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="h-9 px-3.5 rounded-[10px] bg-[var(--bg-elevated)] border border-[var(--border)] text-[12.5px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] inline-flex items-center transition-colors">
              Edit
            </button>
            <button className="h-9 px-3.5 rounded-[10px] bg-white border border-[#fecdd3] text-[12.5px] font-medium text-[var(--danger)] hover:bg-[var(--status-danger-bg)] inline-flex items-center transition-colors">
              Reject
            </button>
            <button
              className="h-9 px-3.5 rounded-[10px] bg-[var(--accent)] text-white text-[12.5px] font-medium inline-flex items-center hover:bg-[var(--accent-hover)] transition-colors"
              style={{
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.18) inset, 0 1px 2px rgba(15,23,42,0.18), 0 0 0 1px rgba(37,99,235,0.5), 0 6px 18px -4px rgba(37,99,235,0.4)",
              }}
            >
              Approve & convert to case
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[var(--border)] grid grid-cols-2 lg:grid-cols-4 gap-6">
          <HeroStat
            label="Case type"
            value={
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={cn(
                    "inline-flex items-center justify-center h-7 px-2 rounded-[7px] font-mono text-[9.5px] font-bold tracking-[0.05em]",
                    chipStyle.bg,
                    chipStyle.fg
                  )}
                >
                  {ctype.short}
                </span>
                <span className="text-[14px] font-semibold text-[var(--text-primary)]">
                  {ctype.label}
                </span>
              </div>
            }
          />
          <HeroStat
            label="Estimated damages"
            value={
              <span className="text-[22px] font-bold tabular text-[var(--text-primary)] tracking-tight">
                {lead.estimatedDamages
                  ? formatCurrency(lead.estimatedDamages, { compact: true })
                  : "—"}
              </span>
            }
          />
          <HeroStat
            label="Received"
            value={
              <div>
                <div className="text-[14px] font-semibold text-[var(--text-primary)]">
                  {formatDate(lead.createdAt, "medium")}
                </div>
                <div className="text-[11.5px] text-[var(--text-tertiary)] tabular">
                  {formatRelativeTime(lead.createdAt)}
                </div>
              </div>
            }
          />
          <HeroStat
            label="Assigned to"
            value={
              lead.assignedLawyer ? (
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#a5b4fc] to-[#6366f1] flex items-center justify-center text-white text-[10px] font-semibold tracking-wide">
                    {lead.assignedLawyer.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <span className="text-[13px] text-[var(--text-primary)] font-medium">
                    {lead.assignedLawyer}
                  </span>
                </div>
              ) : (
                <span className="text-[13px] text-[var(--text-tertiary)] italic">
                  Unassigned
                </span>
              )
            }
          />
        </div>
      </motion.section>

      {/* Two column: AI panel + intake / sidebar */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left — AI analysis + intake */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <AIAnalysisCard lead={lead} />
          <IntakeCard lead={lead} />
        </div>

        {/* Right — risk score + signals + recommendation */}
        <aside className="col-span-12 lg:col-span-4 space-y-6">
          <RiskScoreCard score={lead.aiRiskScore} recommendation={lead.aiRecommendation} />
          <SignalsCard signals={lead.signals} />
        </aside>
      </div>
    </div>
  );
}

function HeroStat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-[var(--text-tertiary)] mb-1.5">
        {label}
      </div>
      <div>{value}</div>
    </div>
  );
}

function AIAnalysisCard({ lead }: { lead: typeof LEADS[number] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
      className="bg-[var(--bg-elevated)] rounded-[20px] border border-[var(--border)] p-6 shadow-[var(--shadow-card)]"
    >
      <header className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold tracking-[0.05em] text-[var(--ai)] bg-[var(--ai-subtle)] px-2 py-1 rounded-[6px] uppercase border border-[#c7d2fe]">
              AI
            </span>
            <h2 className="text-[15px] font-semibold text-[var(--text-primary)] tracking-tight">
              Analysis
            </h2>
          </div>
          <div className="text-[11.5px] text-[var(--text-tertiary)] mt-1">
            Generated 4 minutes after intake · 12 sources reviewed
          </div>
        </div>
        <button className="text-[11.5px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] inline-flex items-center gap-1 group">
          Re-run analysis
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </header>

      <ul className="space-y-3">
        {lead.aiReasoning.map((line, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 + i * 0.06, ease: [0.32, 0.72, 0, 1] }}
            className="flex items-start gap-2.5 p-3 rounded-[10px] bg-[var(--bg-primary)]/60 border border-[var(--border)]"
          >
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--ai)] shrink-0" />
            <span className="text-[13px] text-[var(--text-primary)] leading-relaxed">
              {line}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}

function IntakeCard({ lead }: { lead: typeof LEADS[number] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.18, ease: [0.32, 0.72, 0, 1] }}
      className="bg-[var(--bg-elevated)] rounded-[20px] border border-[var(--border)] p-6 shadow-[var(--shadow-card)]"
    >
      <h2 className="text-[15px] font-semibold text-[var(--text-primary)] tracking-tight mb-5">
        Intake summary
      </h2>

      <div className="space-y-5">
        <Field label="What happened">
          <p className="text-[13.5px] text-[var(--text-primary)] leading-relaxed">
            {lead.intakeSummary}
          </p>
        </Field>
        <Field label="Reported injuries">
          <p className="text-[13.5px] text-[var(--text-primary)] leading-relaxed">
            {lead.injuryDescription}
          </p>
        </Field>
      </div>
    </motion.section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-[var(--text-tertiary)] mb-1.5">
        {label}
      </div>
      {children}
    </div>
  );
}

function RiskScoreCard({
  score,
  recommendation,
}: {
  score: number;
  recommendation: "approve" | "reject" | "needs_review";
}) {
  const recCfg = {
    approve: {
      label: "Recommended for approval",
      tone: "text-[var(--success)] bg-[var(--status-success-bg)] border-[#bbf7d0]",
    },
    reject: {
      label: "Recommended for rejection",
      tone: "text-[var(--danger)] bg-[var(--status-danger-bg)] border-[#fecdd3]",
    },
    needs_review: {
      label: "Needs your review",
      tone: "text-[var(--warning)] bg-[var(--status-warning-bg)] border-[#fed7aa]",
    },
  }[recommendation];

  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
      className="bg-[var(--bg-elevated)] rounded-[20px] border border-[var(--border)] p-6 shadow-[var(--shadow-card)]"
    >
      <RiskScore score={score} size="lg" />
      <div
        className={cn(
          "mt-5 px-3 py-2.5 rounded-[10px] border text-[12.5px] font-semibold text-center",
          recCfg.tone
        )}
      >
        {recCfg.label}
      </div>
    </motion.section>
  );
}

function SignalsCard({
  signals,
}: {
  signals: { label: string; weight: "positive" | "negative" | "neutral" }[];
}) {
  const WEIGHT_STYLE = {
    positive: { dot: "bg-[var(--success)]", label: "+", labelClass: "text-[var(--success)]" },
    negative: { dot: "bg-[var(--danger)]", label: "−", labelClass: "text-[var(--danger)]" },
    neutral: { dot: "bg-slate-400", label: "·", labelClass: "text-slate-400" },
  } as const;

  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.18, ease: [0.32, 0.72, 0, 1] }}
      className="bg-[var(--bg-elevated)] rounded-[20px] border border-[var(--border)] p-6 shadow-[var(--shadow-card)]"
    >
      <h2 className="text-[13px] font-semibold text-[var(--text-primary)] tracking-tight mb-4">
        Signals weighted
      </h2>
      <ul className="space-y-2">
        {signals.map((s, i) => {
          const cfg = WEIGHT_STYLE[s.weight];
          return (
            <li
              key={i}
              className="flex items-center gap-2.5 text-[12.5px] text-[var(--text-primary)] py-1"
            >
              <span
                className={cn(
                  "h-5 w-5 rounded-[6px] inline-flex items-center justify-center shrink-0 font-bold text-[12px]",
                  cfg.labelClass
                )}
              >
                {cfg.label}
              </span>
              <span className="flex-1">{s.label}</span>
            </li>
          );
        })}
      </ul>
    </motion.section>
  );
}
