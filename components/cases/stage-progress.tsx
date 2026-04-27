"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { CaseStage } from "@/lib/types";
import { STAGES } from "@/components/shared/stage-badge";

const STAGE_COLOR: Record<CaseStage, string> = {
  intake: "bg-[var(--chip-blue-fg)]",
  investigation: "bg-[var(--chip-indigo-fg)]",
  demand: "bg-[var(--chip-peach-fg)]",
  negotiation: "bg-[var(--chip-amber-fg)]",
  settlement: "bg-[var(--chip-mint-fg)]",
  closed: "bg-slate-400",
};

const STAGE_LABEL: Record<CaseStage, string> = {
  intake: "Intake",
  investigation: "Investigation",
  demand: "Demand",
  negotiation: "Negotiation",
  settlement: "Settlement",
  closed: "Closed",
};

export function StageProgress({
  current,
  daysInStage,
}: {
  current: CaseStage;
  daysInStage: number;
}) {
  const currentIdx = STAGES.indexOf(current);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <span className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
          Case stage
        </span>
        <span className="text-[11.5px] tabular text-[var(--text-secondary)]">
          <span className="font-semibold text-[var(--text-primary)]">{daysInStage}</span> days in current stage
        </span>
      </div>

      <div className="relative">
        {/* Background track */}
        <div className="absolute top-[11px] left-3 right-3 h-0.5 bg-[var(--border)] rounded-full" />
        {/* Progress fill */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          style={{
            transformOrigin: "left",
            width: `${(currentIdx / (STAGES.length - 1)) * 100}%`,
          }}
          className="absolute top-[11px] left-3 h-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-strong)] rounded-full"
        />

        <ol className="relative grid grid-cols-5 gap-2">
          {STAGES.map((stage, i) => {
            const done = i < currentIdx;
            const isCurrent = i === currentIdx;
            return (
              <li key={stage} className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + i * 0.08,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center relative z-10 ring-4 ring-[var(--bg-elevated)] text-[10px] font-bold",
                    done
                      ? "bg-[var(--accent)] text-white"
                      : isCurrent
                      ? cn(STAGE_COLOR[stage], "text-white shadow-[0_0_0_4px_rgba(37,99,235,0.18)]")
                      : "bg-[var(--bg-secondary)] border border-[var(--border-strong)] text-[var(--text-tertiary)]"
                  )}
                >
                  {i + 1}
                </motion.div>
                <div
                  className={cn(
                    "mt-2 text-[10.5px] sm:text-[11.5px] font-medium text-center leading-tight",
                    isCurrent
                      ? "text-[var(--text-primary)]"
                      : done
                      ? "text-[var(--text-secondary)]"
                      : "text-[var(--text-tertiary)]"
                  )}
                >
                  {STAGE_LABEL[stage]}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
