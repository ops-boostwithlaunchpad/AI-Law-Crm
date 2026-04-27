"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn, formatCurrency, formatRelativeTime } from "@/lib/utils";
import type { ApprovalItem } from "@/lib/mock/dashboard";

const ACTION_LABEL_TONE: Record<
  ApprovalItem["actionType"],
  { tone: string; bg: string }
> = {
  demand_letter: { tone: "text-[var(--chip-blue-fg)]", bg: "bg-[var(--chip-blue)]" },
  settlement_proposal: { tone: "text-[var(--chip-amber-fg)]", bg: "bg-[var(--chip-amber)]" },
  draft_email: { tone: "text-[var(--chip-indigo-fg)]", bg: "bg-[var(--chip-indigo)]" },
  document_summary: { tone: "text-[var(--chip-mint-fg)]", bg: "bg-[var(--chip-mint)]" },
  deposition_prep: { tone: "text-[var(--chip-lavender-fg)]", bg: "bg-[var(--chip-lavender)]" },
};

const ACTION_SHORT: Record<ApprovalItem["actionType"], string> = {
  demand_letter: "DEMAND",
  settlement_proposal: "SETTLE",
  draft_email: "EMAIL",
  document_summary: "DOCS",
  deposition_prep: "DEPO",
};

const STATUS_LABEL = {
  pending: "Pending",
  in_review: "In review",
  auto_approved: "Auto-approved",
} as const;

const STATUS_STYLE = {
  pending:
    "bg-[var(--status-info-bg)] text-[var(--status-info-fg)] border-[#c7d2fe]",
  in_review:
    "bg-[var(--status-warning-bg)] text-[var(--status-warning-fg)] border-[#fed7aa]",
  auto_approved:
    "bg-[var(--status-success-bg)] text-[var(--status-success-fg)] border-[#bbf7d0]",
} as const;

export function ApprovalsTable({ items }: { items: ApprovalItem[] }) {
  return (
    <section className="bg-[var(--bg-elevated)] rounded-[20px] border border-[var(--border)] shadow-[var(--shadow-card)] card-float overflow-hidden">
      <header className="flex items-center justify-between px-6 pt-5 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[15px] font-semibold text-[var(--text-primary)] tracking-tight">
              AI Workspace
            </h2>
            <span className="font-mono text-[10.5px] text-[var(--text-tertiary)] tabular bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded-[5px] border border-[var(--border)]">
              {items.length} pending
            </span>
          </div>
          <div className="text-[11.5px] text-[var(--text-tertiary)] mt-0.5">
            Drafts and decisions waiting on your approval
          </div>
        </div>

        <button className="text-[12.5px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors group inline-flex items-center gap-1">
          View all
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-[var(--text-tertiary)] border-y border-[var(--border)] bg-[var(--bg-primary)]/40">
              <th className="px-6 py-2.5 font-medium w-[5%]"></th>
              <th className="px-3 py-2.5 font-medium">Case · Action</th>
              <th className="px-3 py-2.5 font-medium tabular text-right">Est. value</th>
              <th className="px-3 py-2.5 font-medium tabular w-[150px]">Confidence</th>
              <th className="px-3 py-2.5 font-medium tabular">Updated</th>
              <th className="px-3 py-2.5 font-medium">Status</th>
              <th className="px-6 py-2.5 font-medium text-right w-[180px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => {
              const tone = ACTION_LABEL_TONE[item.actionType];
              return (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.05 * i,
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
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "inline-flex items-center justify-center h-9 px-2.5 rounded-[8px] font-mono text-[10px] font-bold tracking-[0.05em]",
                          tone.bg,
                          tone.tone
                        )}
                      >
                        {ACTION_SHORT[item.actionType]}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-[var(--text-primary)] truncate">
                          {item.caseTitle}
                        </div>
                        <div className="text-[11.5px] text-[var(--text-tertiary)] flex items-center gap-1.5">
                          {item.actionLabel}
                          <span className="font-mono text-[10px]">· {item.caseNumber}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-right tabular text-[12.5px] font-semibold text-[var(--text-primary)]">
                    {item.estValue > 0 ? (
                      formatCurrency(item.estValue, { compact: true })
                    ) : (
                      <span className="text-[var(--text-tertiary)] font-normal">—</span>
                    )}
                  </td>
                  <td className="px-3 py-3.5">
                    <ConfidenceMini value={item.confidence} />
                  </td>
                  <td className="px-3 py-3.5 text-[11.5px] tabular text-[var(--text-secondary)]">
                    {formatRelativeTime(item.createdAt)}
                  </td>
                  <td className="px-3 py-3.5">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="pr-6 pl-3 py-3.5">
                    <div className="flex items-center gap-1.5 justify-end">
                      <button className="h-7.5 px-2.5 text-[11.5px] font-medium rounded-[7px] text-[var(--text-secondary)] border border-[var(--border)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors">
                        Edit
                      </button>
                      <button
                        className="h-7.5 px-3 text-[11.5px] font-medium text-white bg-[var(--accent)] rounded-[7px] hover:bg-[var(--accent-hover)] transition-colors"
                        style={{
                          boxShadow:
                            "0 1px 0 rgba(255,255,255,0.18) inset, 0 1px 2px rgba(15,23,42,0.16), 0 0 0 1px rgba(37,99,235,0.5)",
                        }}
                      >
                        Approve
                      </button>
                    </div>
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

function ConfidenceMini({ value }: { value: number }) {
  const segments = 10;
  const filled = Math.round(value * segments);
  const color =
    value > 0.9
      ? "var(--success)"
      : value > 0.78
      ? "var(--accent)"
      : "var(--warning)";
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-[2px]">
        {Array.from({ length: segments }).map((_, i) => (
          <span
            key={i}
            className="h-[7px] w-[3px] rounded-[1px]"
            style={{
              background: i < filled ? color : "var(--border)",
            }}
          />
        ))}
      </div>
      <span className="font-mono text-[10.5px] tabular text-[var(--text-secondary)] font-medium">
        {Math.round(value * 100)}%
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: ApprovalItem["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-[6px] text-[10.5px] font-semibold border",
        STATUS_STYLE[status]
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {STATUS_LABEL[status]}
    </span>
  );
}
