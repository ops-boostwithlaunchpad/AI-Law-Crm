"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { StageBadge } from "@/components/shared/stage-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import type { CaseRow } from "@/lib/mock/cases";
import { CASE_TYPE_CONFIG, CHIP_BG } from "@/components/leads/leads-table";

const AVATAR_BG = {
  blue: "from-[#3b82f6] to-[#1d4ed8]",
  indigo: "from-[#a5b4fc] to-[#6366f1]",
  peach: "from-[#fdba74] to-[#ea580c]",
} as const;

const STATUS_TONE = {
  active: "info",
  stalled: "warning",
  won: "success",
  lost: "danger",
  closed: "neutral",
} as const;

const STATUS_LABEL = {
  active: "Active",
  stalled: "Stalled",
  won: "Won",
  lost: "Lost",
  closed: "Closed",
} as const;

export function CasesTable({ cases }: { cases: CaseRow[] }) {
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
              <th className="px-3 py-3 font-medium">Case</th>
              <th className="px-3 py-3 font-medium">Stage</th>
              <th className="px-3 py-3 font-medium tabular">Projected value</th>
              <th className="px-3 py-3 font-medium tabular">Days in stage</th>
              <th className="px-3 py-3 font-medium">Next deadline</th>
              <th className="px-3 py-3 font-medium">AI</th>
              <th className="px-3 py-3 font-medium">Lead</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="pr-6 pl-3 py-3 font-medium text-right w-[80px]"></th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c, i) => {
              const ctype = CASE_TYPE_CONFIG[c.caseType];
              const chipStyle = CHIP_BG[ctype.tone];
              const deadlineDays = c.nextDeadline
                ? daysUntil(c.nextDeadline.date)
                : null;
              const deadlineUrgent =
                deadlineDays !== null && deadlineDays <= 14 && deadlineDays > 0;

              return (
                <motion.tr
                  key={c.id}
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
                    <Link
                      href={`/cases/${c.id}`}
                      className="flex items-center gap-3 group/link min-w-0"
                    >
                      <span
                        className={cn(
                          "inline-flex items-center justify-center h-9 px-2 rounded-[8px] font-mono text-[10px] font-bold tracking-[0.05em] shrink-0",
                          chipStyle.bg,
                          chipStyle.fg
                        )}
                      >
                        {ctype.short}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-[var(--text-primary)] group-hover/link:text-[var(--accent)] transition-colors truncate max-w-[260px]">
                          {c.title}
                        </div>
                        <div className="text-[11.5px] text-[var(--text-tertiary)] flex items-center gap-1.5">
                          <span className="font-mono">{c.caseNumber}</span>
                          <span>·</span>
                          <span>{c.clientName}</span>
                        </div>
                      </div>
                    </Link>
                  </td>

                  <td className="px-3 py-3.5">
                    <StageBadge stage={c.stage} />
                  </td>

                  <td className="px-3 py-3.5 tabular text-[13px] font-semibold text-[var(--text-primary)]">
                    {c.projectedValue > 0 ? (
                      formatCurrency(c.projectedValue, { compact: true })
                    ) : (
                      <span className="text-[var(--text-tertiary)] font-normal">—</span>
                    )}
                  </td>

                  <td className="px-3 py-3.5 tabular text-[12.5px] text-[var(--text-secondary)]">
                    <span className="font-semibold text-[var(--text-primary)]">
                      {c.daysInStage}
                    </span>
                    <span className="text-[var(--text-tertiary)]"> days</span>
                  </td>

                  <td className="px-3 py-3.5">
                    {c.nextDeadline ? (
                      <span
                        className={cn(
                          "inline-flex items-center text-[11.5px] tabular px-2 py-1 rounded-[6px] whitespace-nowrap",
                          deadlineUrgent
                            ? "text-[var(--warning)] bg-[var(--status-warning-bg)] font-semibold border border-[#fed7aa]"
                            : "text-[var(--text-secondary)] bg-[var(--bg-secondary)]"
                        )}
                      >
                        {deadlineDays !== null && deadlineDays > 0
                          ? `in ${deadlineDays}d`
                          : formatDate(c.nextDeadline.date, "short")}
                      </span>
                    ) : (
                      <span className="text-[12px] text-[var(--text-tertiary)]">—</span>
                    )}
                  </td>

                  <td className="px-3 py-3.5">
                    {c.pendingAIActions > 0 ? (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[5px] bg-[var(--ai-subtle)] text-[var(--ai)] border border-[#c7d2fe] font-mono text-[10.5px] font-semibold tabular">
                        {c.pendingAIActions} pending
                      </span>
                    ) : (
                      <span className="text-[11px] text-[var(--text-tertiary)]">—</span>
                    )}
                  </td>

                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "h-7 w-7 rounded-full flex items-center justify-center text-white text-[10px] font-semibold tracking-wide bg-gradient-to-br shrink-0",
                          AVATAR_BG[c.assignedLawyer.tone]
                        )}
                      >
                        {c.assignedLawyer.name
                          .split(" ")
                          .map((p) => p[0])
                          .join("")}
                      </div>
                      <span className="text-[12px] text-[var(--text-secondary)] whitespace-nowrap">
                        {c.assignedLawyer.name.split(" ")[0]}
                      </span>
                    </div>
                  </td>

                  <td className="px-3 py-3.5">
                    <StatusBadge tone={STATUS_TONE[c.status]}>
                      {STATUS_LABEL[c.status]}
                    </StatusBadge>
                  </td>

                  <td className="pr-6 pl-3 py-3.5 text-right">
                    <Link
                      href={`/cases/${c.id}`}
                      className="inline-flex items-center justify-center h-7 px-2.5 rounded-[7px] text-[11.5px] font-medium text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent)] transition-colors"
                    >
                      Open
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

function daysUntil(dateStr: string) {
  const ms = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}
