"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  FileText,
  Mail,
  HandCoins,
  ClipboardList,
  ArrowRight,
  Sparkles,
  Check,
  Pencil,
} from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { ApprovalItem } from "@/lib/mock/dashboard";

const ICON_MAP = {
  demand_letter: FileText,
  settlement_proposal: HandCoins,
  draft_email: Mail,
  document_summary: ClipboardList,
  deposition_prep: ClipboardList,
} as const;

export function ApprovalsQueue({ items }: { items: ApprovalItem[] }) {
  return (
    <section className="rounded-[10px] border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden shadow-[var(--shadow-sm)]">
      <header className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2.5">
          <div
            className="h-6 w-6 rounded-[5px] bg-gradient-to-br from-[#818cf8] to-[var(--ai)] flex items-center justify-center"
            style={{
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.18) inset, 0 1px 2px rgba(99,102,241,0.3)",
            }}
          >
            <Sparkles size={11} strokeWidth={2.4} className="text-white" />
          </div>
          <h2 className="text-[14px] font-semibold text-[var(--text-primary)] tracking-tight">
            AI Workspace
          </h2>
          <span className="font-mono text-[10.5px] text-[var(--text-tertiary)] tabular bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded-[3px] border border-[var(--border)]">
            {items.length} pending
          </span>
        </div>
        <button className="text-[12.5px] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1 group font-medium">
          View all
          <ArrowRight
            size={12}
            strokeWidth={2}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </header>

      <ul className="divide-y divide-[var(--border)]">
        {items.map((item, i) => {
          const Icon = ICON_MAP[item.actionType];
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.06 * i,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="group relative px-5 py-4 hover:bg-[var(--bg-secondary)]/50 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5 h-8 w-8 rounded-[6px] bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center shrink-0 group-hover:border-[var(--accent-border)] group-hover:bg-[var(--accent-subtle)] transition-colors">
                  <Icon
                    size={14}
                    strokeWidth={1.8}
                    className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[13.5px] font-semibold text-[var(--text-primary)] tracking-tight">
                      {item.actionLabel}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-[var(--border-strong)]" />
                    <span className="text-[12.5px] text-[var(--text-secondary)] truncate">
                      {item.caseTitle}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-tertiary)] tabular">
                      {item.caseNumber}
                    </span>
                    {item.priority === "high" && (
                      <Badge tone="warning">priority</Badge>
                    )}
                  </div>

                  <p className="text-[12.5px] text-[var(--text-secondary)] leading-relaxed line-clamp-1">
                    {item.preview}
                  </p>

                  <div className="mt-2.5 flex items-center gap-3.5">
                    <ConfidenceBar value={item.confidence} />
                    <span className="font-mono text-[10.5px] text-[var(--text-tertiary)] tabular">
                      {Math.round(item.confidence * 100)}% confidence
                    </span>
                    <span className="text-[var(--border-strong)]">·</span>
                    <span className="text-[11.5px] text-[var(--text-tertiary)]">
                      {formatRelativeTime(item.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button className="h-7.5 w-7.5 inline-flex items-center justify-center rounded-[5px] text-[var(--text-tertiary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border)] transition-all">
                    <Pencil size={12} strokeWidth={2} />
                  </button>
                  <button
                    className="h-7.5 px-2.5 inline-flex items-center gap-1 text-[12px] font-medium text-white bg-[var(--accent)] rounded-[5px] hover:bg-[var(--accent-hover)] transition-colors"
                    style={{
                      boxShadow:
                        "0 1px 0 rgba(255,255,255,0.15) inset, 0 1px 2px rgba(15,23,42,0.15), 0 0 0 1px rgba(37,99,235,0.5)",
                    }}
                  >
                    <Check size={12} strokeWidth={2.4} />
                    Approve
                  </button>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}

function ConfidenceBar({ value }: { value: number }) {
  const segments = 14;
  const filled = Math.round(value * segments);
  return (
    <div
      className="flex items-center gap-[2px]"
      aria-label={`${Math.round(value * 100)}% confidence`}
    >
      {Array.from({ length: segments }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-2 w-[3px] rounded-[1px] transition-colors",
            i < filled
              ? value > 0.9
                ? "bg-[var(--success)]"
                : value > 0.78
                ? "bg-[var(--accent)]"
                : "bg-[var(--warning)]"
              : "bg-[var(--border)]"
          )}
        />
      ))}
    </div>
  );
}
