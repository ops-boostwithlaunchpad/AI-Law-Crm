import * as React from "react";
import { cn } from "@/lib/utils";
import type { CaseStage } from "@/lib/types";

const STAGE_CONFIG: Record<
  CaseStage,
  { label: string; bg: string; fg: string; dot: string }
> = {
  intake: {
    label: "Intake",
    bg: "bg-[var(--chip-blue)]",
    fg: "text-[var(--chip-blue-fg)]",
    dot: "bg-[var(--chip-blue-fg)]",
  },
  investigation: {
    label: "Investigation",
    bg: "bg-[var(--chip-indigo)]",
    fg: "text-[var(--chip-indigo-fg)]",
    dot: "bg-[var(--chip-indigo-fg)]",
  },
  demand: {
    label: "Demand",
    bg: "bg-[var(--chip-peach)]",
    fg: "text-[var(--chip-peach-fg)]",
    dot: "bg-[var(--chip-peach-fg)]",
  },
  negotiation: {
    label: "Negotiation",
    bg: "bg-[var(--chip-amber)]",
    fg: "text-[var(--chip-amber-fg)]",
    dot: "bg-[var(--chip-amber-fg)]",
  },
  settlement: {
    label: "Settlement",
    bg: "bg-[var(--chip-mint)]",
    fg: "text-[var(--chip-mint-fg)]",
    dot: "bg-[var(--chip-mint-fg)]",
  },
  closed: {
    label: "Closed",
    bg: "bg-slate-100",
    fg: "text-slate-600",
    dot: "bg-slate-400",
  },
};

export function StageBadge({
  stage,
  size = "md",
}: {
  stage: CaseStage;
  size?: "sm" | "md";
}) {
  const cfg = STAGE_CONFIG[stage];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[6px] font-medium border border-transparent",
        size === "sm" ? "px-1.5 py-0.5 text-[10.5px]" : "px-2 py-0.5 text-[11.5px]",
        cfg.bg,
        cfg.fg
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
      {cfg.label}
    </span>
  );
}

export const STAGES: CaseStage[] = [
  "intake",
  "investigation",
  "demand",
  "negotiation",
  "settlement",
];
