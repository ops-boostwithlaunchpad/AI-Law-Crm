"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn, formatCurrency } from "@/lib/utils";
import type { CaseStage } from "@/lib/types";

const STAGE_TONE: Record<
  CaseStage,
  { bar: string; bg: string; text: string }
> = {
  intake: {
    bar: "bg-gradient-to-r from-[#93c5fd] to-[#3b82f6]",
    bg: "bg-[var(--chip-blue)]",
    text: "text-[var(--chip-blue-fg)]",
  },
  investigation: {
    bar: "bg-gradient-to-r from-[#a5b4fc] to-[#6366f1]",
    bg: "bg-[var(--chip-indigo)]",
    text: "text-[var(--chip-indigo-fg)]",
  },
  demand: {
    bar: "bg-gradient-to-r from-[#fdba74] to-[#ea580c]",
    bg: "bg-[var(--chip-peach)]",
    text: "text-[var(--chip-peach-fg)]",
  },
  negotiation: {
    bar: "bg-gradient-to-r from-[#fcd34d] to-[#d97706]",
    bg: "bg-[var(--chip-amber)]",
    text: "text-[var(--chip-amber-fg)]",
  },
  settlement: {
    bar: "bg-gradient-to-r from-[#86efac] to-[#16a34a]",
    bg: "bg-[var(--chip-mint)]",
    text: "text-[var(--chip-mint-fg)]",
  },
  closed: {
    bar: "bg-slate-300",
    bg: "bg-slate-100",
    text: "text-slate-600",
  },
};

export function PipelineStrip({
  stages,
}: {
  stages: { stage: CaseStage; label: string; count: number; value: number }[];
}) {
  const max = Math.max(...stages.map((s) => s.count));

  return (
    <section className="bg-[var(--bg-elevated)] rounded-[20px] border border-[var(--border)] p-5 md:p-6 shadow-[var(--shadow-card)]">
      <header className="flex items-baseline justify-between mb-5">
        <div className="flex items-baseline gap-2">
          <h2 className="text-[15px] font-semibold text-[var(--text-primary)] tracking-tight">
            Pipeline
          </h2>
          <span className="text-[11.5px] text-[var(--text-tertiary)]">
            click any stage to filter
          </span>
        </div>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
          5 stages
        </span>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stages.map((s, i) => {
          const tone = STAGE_TONE[s.stage];
          const pct = (s.count / max) * 100;
          return (
            <motion.button
              key={s.stage}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.05 * i,
                ease: [0.32, 0.72, 0, 1],
              }}
              className={cn(
                "w-full text-left p-4 rounded-[14px] border border-[var(--border)] bg-[var(--bg-primary)]/30 hover:bg-[var(--bg-primary)]/60 transition-all duration-200 group hover:-translate-y-px hover:shadow-[var(--shadow-sm)]",
                "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]"
              )}
            >
              <div className="flex items-baseline justify-between mb-2.5">
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-[5px] text-[10.5px] font-semibold uppercase tracking-[0.05em]",
                    tone.bg,
                    tone.text
                  )}
                >
                  {s.label}
                </span>
                <span className="text-[20px] font-bold tabular text-[var(--text-primary)] leading-none">
                  {s.count}
                </span>
              </div>

              <div
                className={cn("h-1.5 rounded-full overflow-hidden", tone.bg)}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + 0.05 * i,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className={cn("h-full rounded-full", tone.bar)}
                />
              </div>

              <div className="mt-2.5 text-[11.5px] text-[var(--text-tertiary)] tabular">
                {s.value > 0 ? formatCurrency(s.value, { compact: true }) : "—"} value
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
