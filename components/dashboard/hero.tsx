"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export interface DashboardHeroProps {
  greeting: string;
  name: string;
  date: string;
  approvalsCount: number;
  breakdown: { label: string; count: number }[];
}

export function DashboardHero({
  greeting,
  name,
  date,
  approvalsCount,
  breakdown,
}: DashboardHeroProps) {
  return (
    <div className="relative border-b border-[var(--border)] hero-glow overflow-hidden">
      <div className="px-10 pt-10 pb-12 max-w-[1320px] relative">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          className="flex items-baseline justify-between gap-6 mb-9"
        >
          <div className="flex items-center gap-2.5">
            <span className="label-mono">{greeting}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--border-strong)]" />
            <span className="text-[12.5px] text-[var(--text-secondary)] font-medium">
              {name}
            </span>
          </div>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.09em] text-[var(--text-tertiary)]">
            {date}
          </span>
        </motion.div>

        <div className="flex items-end gap-8 flex-wrap">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.32, 0.72, 0, 1] }}
            className="flex items-baseline gap-1"
          >
            <span
              className="tabular text-[var(--accent)] leading-none"
              style={{
                fontSize: "clamp(80px, 11vw, 120px)",
                fontWeight: 600,
                letterSpacing: "-0.055em",
              }}
            >
              {approvalsCount}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
            className="flex-1 min-w-[260px] pb-3"
          >
            <h1 className="display-2 text-[var(--text-primary)] max-w-[18ch]">
              <span className="text-[var(--text-primary)]">cases need </span>
              <span className="text-[var(--text-secondary)]">your review</span>
              <span className="text-[var(--accent)]">.</span>
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5">
              {breakdown.map((b, i) => (
                <React.Fragment key={b.label}>
                  {i > 0 && (
                    <span className="text-[var(--border-strong)] text-xs">
                      ·
                    </span>
                  )}
                  <span className="flex items-baseline gap-1.5 text-[13px]">
                    <span className="font-semibold tabular text-[var(--text-primary)]">
                      {b.count}
                    </span>
                    <span className="text-[var(--text-secondary)]">
                      {b.label}
                    </span>
                  </span>
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="pb-3"
          >
            <button
              className="group inline-flex items-center gap-2 h-10 pl-4 pr-3.5 rounded-[7px] bg-[var(--accent)] text-white text-[13px] font-medium tracking-tight transition-all duration-200 hover:bg-[var(--accent-hover)] active:translate-y-[0.5px]"
              style={{
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.18) inset, 0 1px 2px rgba(15,23,42,0.18), 0 0 0 1px rgba(37,99,235,0.5), 0 6px 18px -4px rgba(37,99,235,0.4)",
              }}
            >
              <Sparkles size={14} strokeWidth={2.2} />
              Open AI Workspace
              <ArrowRight
                size={14}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
