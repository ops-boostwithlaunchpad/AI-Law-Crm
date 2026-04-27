"use client";

import * as React from "react";
import { motion } from "motion/react";
import { formatCurrency } from "@/lib/utils";
import type { PipelineStage } from "@/lib/mock/dashboard";

export function CasePipeline({ stages }: { stages: PipelineStage[] }) {
  const totalCount = stages.reduce((s, x) => s + x.count, 0);
  const max = Math.max(...stages.map((s) => s.count));

  return (
    <section className="rounded-[10px] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-sm)]">
      <header className="flex items-baseline justify-between mb-5">
        <div className="flex items-baseline gap-2">
          <span className="label-mono">Active cases</span>
          <span className="text-[12.5px] text-[var(--text-tertiary)]">
            <span className="font-semibold tabular text-[var(--text-primary)]">
              {totalCount}
            </span>{" "}
            across 5 stages
          </span>
        </div>
        <button className="text-[11.5px] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors font-medium">
          See all
        </button>
      </header>

      <div className="grid grid-cols-5 gap-2">
        {stages.map((s, i) => (
          <motion.div
            key={s.stage}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.05 * i,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="group cursor-pointer"
          >
            <div className="relative h-16 mb-2.5 flex items-end">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + 0.05 * i,
                  ease: [0.32, 0.72, 0, 1],
                }}
                style={{
                  transformOrigin: "bottom",
                  height: `${(s.count / max) * 64}px`,
                }}
                className="w-full rounded-t-[4px] bg-gradient-to-t from-[var(--accent-subtle)] to-[var(--accent-soft)] group-hover:from-[var(--accent)] group-hover:to-[#3b82f6] transition-all duration-300 border-t border-[var(--accent-border)] group-hover:border-[var(--accent-strong)]"
              />
            </div>
            <div className="space-y-0.5">
              <div className="font-mono text-[10px] uppercase tracking-[0.07em] text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors">
                {s.label}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[16px] font-semibold tabular text-[var(--text-primary)]">
                  {s.count}
                </span>
                {s.value > 0 && (
                  <span className="text-[10.5px] text-[var(--text-tertiary)] tabular">
                    {formatCurrency(s.value, { compact: true })}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
