"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface TabBarProps {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
  primaryAction?: { label: string; onClick?: () => void };
  onFilter?: () => void;
  onExport?: () => void;
}

export function TabBar({
  tabs,
  active,
  onChange,
  primaryAction,
  onFilter,
  onExport,
}: TabBarProps) {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 mb-5 md:mb-6 max-w-[1400px] gap-3 flex-wrap">
      <div className="flex items-center gap-2 min-w-0 flex-wrap">
        {/* Tabs — horizontal scroll on overflow */}
        <div className="flex items-center p-1 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-[12px] shadow-[var(--shadow-xs)] overflow-x-auto max-w-full no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={cn(
                "relative h-8 px-3.5 text-[13px] font-medium rounded-[8px] transition-colors duration-200 whitespace-nowrap shrink-0",
                active === t.id
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
              )}
            >
              {active === t.id && (
                <motion.span
                  layoutId="tab-bg"
                  className="absolute inset-0 bg-[var(--bg-secondary)] rounded-[8px]"
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>

        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            className="inline-flex items-center h-9 px-3.5 rounded-[10px] bg-[var(--bg-elevated)] border border-[var(--border)] text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all shadow-[var(--shadow-xs)] whitespace-nowrap"
          >
            {primaryAction.label}
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onFilter}
          className="inline-flex items-center h-9 px-3.5 rounded-[10px] bg-[var(--bg-elevated)] border border-[var(--border)] text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all shadow-[var(--shadow-xs)]"
        >
          Filter
        </button>
        <button
          onClick={onExport}
          className="inline-flex items-center h-9 px-3.5 rounded-[10px] bg-[var(--text-primary)] text-white text-[13px] font-medium hover:bg-slate-800 transition-colors shadow-[0_4px_10px_-2px_rgba(15,23,42,0.25),0_1px_0_rgba(255,255,255,0.1)_inset]"
        >
          Export
        </button>
      </div>
    </div>
  );
}
