"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function RiskScore({
  score,
  size = "md",
  showLabel = true,
}: {
  score: number; // 0-100
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}) {
  const tier = getTier(score);

  if (size === "lg") {
    return (
      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between">
          <span className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
            AI Risk Score
          </span>
          {showLabel && (
            <span
              className={cn(
                "text-[10.5px] font-mono uppercase tracking-[0.06em] font-semibold",
                tier.fg
              )}
            >
              {tier.label}
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className={cn("text-[40px] font-bold tabular leading-none", tier.fg)}>
            {score}
          </span>
          <span className="text-[12px] text-[var(--text-tertiary)] tabular">
            / 100
          </span>
        </div>
        <SegmentedBar score={score} segments={20} />
      </div>
    );
  }

  if (size === "sm") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[5px] text-[10.5px] font-semibold border tabular",
          tier.bg,
          tier.fg,
          tier.border
        )}
      >
        {score}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2.5">
      <SegmentedBar score={score} segments={12} />
      <span
        className={cn(
          "text-[12.5px] font-semibold tabular",
          tier.fg
        )}
      >
        {score}
      </span>
    </div>
  );
}

function SegmentedBar({ score, segments }: { score: number; segments: number }) {
  const filled = Math.round((score / 100) * segments);
  const tier = getTier(score);
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: segments }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            duration: 0.25,
            delay: i * 0.015,
            ease: [0.32, 0.72, 0, 1],
          }}
          className={cn(
            "h-2 w-[3px] rounded-[1px] origin-bottom",
            i < filled ? tier.barFill : "bg-[var(--border)]"
          )}
        />
      ))}
    </div>
  );
}

function getTier(score: number) {
  if (score >= 80) {
    return {
      label: "High",
      fg: "text-[var(--success)]",
      bg: "bg-[var(--status-success-bg)]",
      border: "border-[#bbf7d0]",
      barFill: "bg-[var(--success)]",
    };
  }
  if (score >= 60) {
    return {
      label: "Medium",
      fg: "text-[var(--accent)]",
      bg: "bg-[var(--accent-subtle)]",
      border: "border-[var(--accent-border)]",
      barFill: "bg-[var(--accent)]",
    };
  }
  if (score >= 40) {
    return {
      label: "Low",
      fg: "text-[var(--warning)]",
      bg: "bg-[var(--status-warning-bg)]",
      border: "border-[#fed7aa]",
      barFill: "bg-[var(--warning)]",
    };
  }
  return {
    label: "Reject",
    fg: "text-[var(--danger)]",
    bg: "bg-[var(--status-danger-bg)]",
    border: "border-[#fecdd3]",
    barFill: "bg-[var(--danger)]",
  };
}
