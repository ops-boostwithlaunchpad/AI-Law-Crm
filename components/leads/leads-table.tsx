"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn, formatDate, formatRelativeTime } from "@/lib/utils";
import { RiskScore } from "@/components/shared/risk-score";
import { StatusBadge } from "@/components/shared/status-badge";
import type { Lead, CaseType, LeadSource, LeadStatus } from "@/lib/types";

const CASE_TYPE_CONFIG: Record<
  CaseType,
  {
    label: string;
    short: string;
    tone: "blue" | "indigo" | "peach" | "mint" | "lavender" | "amber";
  }
> = {
  auto_accident: { label: "Auto accident", short: "AUTO", tone: "blue" },
  premises_liability: { label: "Premises liability", short: "PREM", tone: "amber" },
  medical_malpractice: { label: "Med malpractice", short: "MED", tone: "indigo" },
  product_liability: { label: "Product liability", short: "PROD", tone: "lavender" },
  workplace_injury: { label: "Workplace injury", short: "WORK", tone: "peach" },
  wrongful_death: { label: "Wrongful death", short: "WD", tone: "mint" },
};

const SOURCE_LABEL: Record<LeadSource, string> = {
  web_form: "Web form",
  phone_call: "Phone call",
  referral: "Referral",
  law_firm_partner: "Partner firm",
  marketplace: "Marketplace",
};

const STATUS_TONE: Record<
  LeadStatus,
  React.ComponentProps<typeof StatusBadge>["tone"]
> = {
  new: "info",
  qualified: "indigo",
  converted: "success",
  rejected: "danger",
  needs_review: "warning",
};

const STATUS_LABEL: Record<LeadStatus, string> = {
  new: "New",
  qualified: "Qualified",
  converted: "Converted",
  rejected: "Rejected",
  needs_review: "Needs review",
};

const REC_TONE = {
  approve: { label: "Approve", classes: "text-[var(--success)]" },
  reject: { label: "Reject", classes: "text-[var(--danger)]" },
  needs_review: { label: "Review", classes: "text-[var(--warning)]" },
} as const;

const CHIP_BG: Record<string, { bg: string; fg: string }> = {
  blue: { bg: "bg-[var(--chip-blue)]", fg: "text-[var(--chip-blue-fg)]" },
  indigo: { bg: "bg-[var(--chip-indigo)]", fg: "text-[var(--chip-indigo-fg)]" },
  peach: { bg: "bg-[var(--chip-peach)]", fg: "text-[var(--chip-peach-fg)]" },
  mint: { bg: "bg-[var(--chip-mint)]", fg: "text-[var(--chip-mint-fg)]" },
  lavender: { bg: "bg-[var(--chip-lavender)]", fg: "text-[var(--chip-lavender-fg)]" },
  amber: { bg: "bg-[var(--chip-amber)]", fg: "text-[var(--chip-amber-fg)]" },
};

export function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <section className="bg-[var(--bg-elevated)] rounded-[20px] border border-[var(--border)] shadow-[var(--shadow-card)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-[var(--text-tertiary)] border-b border-[var(--border)] bg-[var(--bg-primary)]/40">
              <th className="px-6 py-3 font-medium w-[5%]">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded-[3px] border-[var(--border-strong)] accent-[var(--accent)]"
                />
              </th>
              <th className="px-3 py-3 font-medium">Lead</th>
              <th className="px-3 py-3 font-medium">Case type</th>
              <th className="px-3 py-3 font-medium">Source</th>
              <th className="px-3 py-3 font-medium">Risk score</th>
              <th className="px-3 py-3 font-medium">AI rec</th>
              <th className="px-3 py-3 font-medium">Received</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="pr-6 pl-3 py-3 font-medium text-right w-[120px]"></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, i) => {
              const ctype = CASE_TYPE_CONFIG[lead.caseType];
              const chipStyle = CHIP_BG[ctype.tone];
              const rec = REC_TONE[lead.aiRecommendation];

              return (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.04 * i,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="group border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--bg-primary)]/40 transition-colors"
                >
                  <td className="pl-6 pr-1 py-3.5">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded-[3px] border-[var(--border-strong)] accent-[var(--accent)]"
                    />
                  </td>

                  <td className="px-3 py-3.5">
                    <Link href={`/leads/${lead.id}`} className="flex items-center gap-3 group/link">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#6366f1] flex items-center justify-center text-white text-[11px] font-semibold tracking-wide shrink-0">
                        {lead.name.split(" ").slice(0, 2).map((p) => p[0]).join("")}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-[var(--text-primary)] group-hover/link:text-[var(--accent)] transition-colors truncate">
                          {lead.name}
                        </div>
                        <div className="text-[11.5px] text-[var(--text-tertiary)] truncate">
                          {lead.email} · {lead.city}, {lead.state}
                        </div>
                      </div>
                    </Link>
                  </td>

                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "inline-flex items-center justify-center h-7 px-2 rounded-[7px] font-mono text-[9.5px] font-bold tracking-[0.05em]",
                          chipStyle.bg,
                          chipStyle.fg
                        )}
                      >
                        {ctype.short}
                      </span>
                      <span className="text-[12.5px] text-[var(--text-secondary)] whitespace-nowrap">
                        {ctype.label}
                      </span>
                    </div>
                  </td>

                  <td className="px-3 py-3.5">
                    <span className="text-[12px] text-[var(--text-secondary)]">
                      {SOURCE_LABEL[lead.source]}
                    </span>
                  </td>

                  <td className="px-3 py-3.5">
                    <RiskScore score={lead.aiRiskScore} size="md" />
                  </td>

                  <td className="px-3 py-3.5">
                    <span className={cn("text-[12.5px] font-semibold", rec.classes)}>
                      {rec.label}
                    </span>
                  </td>

                  <td className="px-3 py-3.5">
                    <div className="text-[12px] text-[var(--text-secondary)] whitespace-nowrap">
                      {formatDate(lead.createdAt, "short")}
                    </div>
                    <div className="text-[10.5px] text-[var(--text-tertiary)] tabular">
                      {formatRelativeTime(lead.createdAt)}
                    </div>
                  </td>

                  <td className="px-3 py-3.5">
                    <StatusBadge tone={STATUS_TONE[lead.status]}>
                      {STATUS_LABEL[lead.status]}
                    </StatusBadge>
                  </td>

                  <td className="pr-6 pl-3 py-3.5 text-right">
                    <Link
                      href={`/leads/${lead.id}`}
                      className="inline-flex items-center gap-1 h-7.5 px-2.5 text-[11.5px] font-medium text-[var(--text-secondary)] border border-[var(--border)] rounded-[7px] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors group/btn"
                    >
                      Review
                      <span className="transition-transform group-hover/btn:translate-x-0.5">→</span>
                    </Link>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export { CASE_TYPE_CONFIG, SOURCE_LABEL, STATUS_LABEL, STATUS_TONE, REC_TONE, CHIP_BG };
