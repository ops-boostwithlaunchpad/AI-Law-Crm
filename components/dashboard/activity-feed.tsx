"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Sparkles, Mail, GitBranch } from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { ActivityItem } from "@/lib/mock/dashboard";

const KIND_ICON = {
  ai_action: Sparkles,
  communication: Mail,
  case_update: GitBranch,
} as const;

const KIND_DOT_CLASS = {
  ai_action:
    "bg-[var(--ai-subtle)] border-[#C7D2FE] text-[var(--ai)]",
  communication:
    "bg-[var(--accent-subtle)] border-[var(--accent-border)] text-[var(--accent)]",
  case_update:
    "bg-[var(--bg-secondary)] border-[var(--border-strong)] text-[var(--text-secondary)]",
} as const;

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <section>
      <header className="flex items-baseline justify-between mb-5">
        <h2 className="display-4 text-[var(--text-primary)]">Today</h2>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
          {items.length} events
        </span>
      </header>

      <ol className="relative">
        <span
          aria-hidden
          className="absolute left-[9px] top-3 bottom-3 w-px bg-[var(--border)]"
        />

        {items.map((item, i) => {
          const Icon = KIND_ICON[item.kind];
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.04 * i,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="relative pl-9 pr-2 py-3 group"
            >
              <span
                className={cn(
                  "absolute left-0 top-3.5 h-[18px] w-[18px] rounded-full border flex items-center justify-center",
                  KIND_DOT_CLASS[item.kind]
                )}
              >
                <Icon size={9} strokeWidth={2.4} />
              </span>

              <div className="flex items-baseline justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] text-[var(--text-primary)] leading-snug font-medium">
                    {item.description}
                  </div>
                  <div className="mt-1 flex items-baseline gap-2 text-[11.5px] text-[var(--text-tertiary)]">
                    <span className="text-[var(--text-secondary)]">
                      {item.caseTitle}
                    </span>
                    {item.meta && (
                      <>
                        <span>·</span>
                        <span>{item.meta}</span>
                      </>
                    )}
                    {item.confidence !== undefined && (
                      <>
                        <span>·</span>
                        <span className="font-mono tabular text-[var(--accent)] font-medium">
                          {Math.round(item.confidence * 100)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <span className="font-mono text-[10.5px] tabular text-[var(--text-tertiary)] shrink-0">
                  {formatRelativeTime(item.timestamp)}
                </span>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
