"use client";

import * as React from "react";
import { motion } from "motion/react";
import { PageHeader } from "@/components/shared/page-header";

export interface ComingSoonProps {
  title: string;
  tagline: string;
  description: string;
  features: { label: string; detail: string }[];
  shipPhase: string;
}

export function ComingSoon({
  title,
  tagline,
  description,
  features,
  shipPhase,
}: ComingSoonProps) {
  return (
    <>
      <PageHeader title={title} />

      <div className="px-8 pb-16 max-w-[1100px]">
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className="bg-[var(--bg-elevated)] rounded-[24px] border border-[var(--border)] shadow-[var(--shadow-card)] overflow-hidden"
        >
          {/* Hero gradient strip */}
          <div className="relative h-32 bg-gradient-to-br from-[var(--accent-subtle)] via-[#dbeafe] to-[var(--ai-subtle)] overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-40" />
            <div className="absolute top-5 left-7">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/80 backdrop-blur text-[10.5px] font-mono uppercase tracking-[0.1em] font-semibold text-[var(--accent-strong)] border border-[var(--accent-border)]">
                {shipPhase}
              </span>
            </div>
          </div>

          <div className="px-10 py-10">
            <div className="text-[10.5px] font-mono uppercase tracking-[0.09em] text-[var(--text-tertiary)] font-medium mb-3">
              Coming soon
            </div>
            <h1 className="display-2 text-[var(--text-primary)] mb-3 max-w-[20ch]">
              {tagline}
            </h1>
            <p className="text-[14.5px] text-[var(--text-secondary)] leading-relaxed max-w-[60ch] mb-9">
              {description}
            </p>

            <div className="text-[10.5px] font-mono uppercase tracking-[0.09em] text-[var(--text-tertiary)] font-medium mb-4">
              What this page will do
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.1 + i * 0.05,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="rounded-[14px] border border-[var(--border)] p-4 bg-[var(--bg-primary)]/40 hover:bg-[var(--bg-primary)]/60 transition-colors"
                >
                  <div className="text-[13px] font-semibold text-[var(--text-primary)] mb-1">
                    {f.label}
                  </div>
                  <div className="text-[12.5px] text-[var(--text-secondary)] leading-relaxed">
                    {f.detail}
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="mt-9 pt-6 border-t border-[var(--border)] flex items-center justify-between gap-4 flex-wrap">
              <div className="text-[12px] text-[var(--text-tertiary)]">
                Targeted for the build phase shown above. Foundation, design system, and routing are already in place.
              </div>
              <button
                className="inline-flex items-center h-9 px-3.5 rounded-[10px] bg-[var(--accent)] text-white text-[12.5px] font-medium hover:bg-[var(--accent-hover)] transition-colors"
                style={{
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.18) inset, 0 1px 2px rgba(15,23,42,0.16), 0 0 0 1px rgba(37,99,235,0.5), 0 6px 18px -4px rgba(37,99,235,0.4)",
                }}
              >
                Notify me when ready
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
}
