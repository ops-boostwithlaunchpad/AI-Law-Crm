"use client";

import * as React from "react";
import { motion } from "motion/react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { cn } from "@/lib/utils";
import type { LeadSource } from "@/lib/mock/dashboard";

const TONE_BAR = {
  blue: "bg-gradient-to-r from-[#60a5fa] to-[#2563eb]",
  indigo: "bg-gradient-to-r from-[#a5b4fc] to-[#6366f1]",
  peach: "bg-gradient-to-r from-[#fdba74] to-[#ea580c]",
  mint: "bg-gradient-to-r from-[#86efac] to-[#16a34a]",
} as const;

const TONE_BG = {
  blue: "bg-[var(--chip-blue)]",
  indigo: "bg-[var(--chip-indigo)]",
  peach: "bg-[var(--chip-peach)]",
  mint: "bg-[var(--chip-mint)]",
} as const;

export function LeadSourcesCard({
  total,
  delta,
  sources,
}: {
  total: number;
  delta: number;
  sources: LeadSource[];
}) {
  return (
    <section className="bg-[var(--bg-elevated)] rounded-[20px] border border-[var(--border)] p-6 shadow-[var(--shadow-card)] card-float">
      <header className="mb-5">
        <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-[var(--text-tertiary)] font-medium mb-2">
          Lead Intake
        </div>
        <div className="flex items-baseline gap-2">
          <AnimatedNumber
            value={total}
            className="num-display text-[30px] leading-none"
          />
          <span className="inline-flex items-center text-[11.5px] font-semibold text-[var(--success)] bg-[var(--status-success-bg)] px-1.5 py-0.5 rounded-[5px]">
            ↑ +{delta}%
          </span>
        </div>
      </header>

      <div className="space-y-4 mt-6">
        {sources.map((s, i) => (
          <SourceRow key={s.label} source={s} delay={0.1 + i * 0.08} />
        ))}
      </div>
    </section>
  );
}

function SourceRow({ source, delay }: { source: LeadSource; delay: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[13px] font-medium text-[var(--text-primary)]">
          {source.label}
        </span>
        <span className="text-[12.5px] tabular text-[var(--text-secondary)] font-semibold">
          <span className="text-[var(--text-tertiary)] font-normal mr-1">
            {source.count} leads ·
          </span>
          {source.pct}%
        </span>
      </div>
      <div
        className={cn(
          "h-9 rounded-full overflow-hidden relative",
          TONE_BG[source.tone]
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${source.pct}%` }}
          transition={{
            duration: 1,
            delay,
            ease: [0.32, 0.72, 0, 1],
          }}
          className={cn("h-full rounded-full", TONE_BAR[source.tone])}
        />
      </div>
    </div>
  );
}
