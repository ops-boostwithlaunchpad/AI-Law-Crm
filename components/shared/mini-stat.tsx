"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatedNumber } from "@/components/ui/animated-number";

export interface MiniStatProps {
  label: string;
  value: number;
  format?: (n: number) => string;
  delta?: number;
  deltaSuffix?: string;
  helpText?: string;
}

export function MiniStat({
  label,
  value,
  format,
  delta,
  deltaSuffix = "%",
  helpText,
}: MiniStatProps) {
  const isUp = delta !== undefined && delta >= 0;
  return (
    <div className="bg-[var(--bg-elevated)] rounded-[18px] border border-[var(--border)] p-5 shadow-[var(--shadow-card)] card-float">
      <div className="flex items-baseline justify-between mb-3">
        <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-[var(--text-tertiary)] font-medium">
          {label}
        </div>
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center text-[11px] font-semibold px-1.5 py-0.5 rounded-[5px] tabular",
              isUp
                ? "text-[var(--success)] bg-[var(--status-success-bg)]"
                : "text-[var(--danger)] bg-[var(--status-danger-bg)]"
            )}
          >
            {isUp ? "↑" : "↓"} {Math.abs(delta)}
            {deltaSuffix}
          </span>
        )}
      </div>
      <AnimatedNumber
        value={value}
        format={format}
        className="num-display text-[30px] leading-none block"
      />
      {helpText && (
        <div className="text-[11.5px] text-[var(--text-tertiary)] mt-3">
          {helpText}
        </div>
      )}
    </div>
  );
}
