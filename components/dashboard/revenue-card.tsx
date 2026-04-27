"use client";

import * as React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { formatCurrency } from "@/lib/utils";
import type { RevenuePoint } from "@/lib/mock/dashboard";

export function RevenueCard({
  data,
  total,
  vsLastQuarterPct,
}: {
  data: RevenuePoint[];
  total: number;
  vsLastQuarterPct: number;
}) {
  return (
    <section className="rounded-[10px] border border-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden flex flex-col shadow-[var(--shadow-sm)]">
      <header className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <span className="label-mono">Projected revenue</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
            Q2 · 2026
          </span>
        </div>
      </header>

      <div className="px-5 pb-1">
        <div className="flex items-baseline gap-2">
          <AnimatedNumber
            value={total}
            format={(n) => formatCurrency(n, { compact: true })}
            className="display-2 text-[var(--text-primary)] tabular"
          />
          <span className="flex items-center gap-0.5 text-[12px] text-[var(--success)] font-semibold tabular bg-[var(--success-subtle)] px-1.5 py-0.5 rounded-[4px] border border-[#BBF7D0]/60">
            <TrendingUp size={11} strokeWidth={2.4} />
            {vsLastQuarterPct > 0 ? "+" : ""}
            {vsLastQuarterPct}%
          </span>
        </div>
        <p className="text-[12px] text-[var(--text-tertiary)] mt-1.5">
          vs $2.04M last quarter
        </p>
      </div>

      <div className="h-[100px] mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--accent)"
                  stopOpacity={0.22}
                />
                <stop
                  offset="100%"
                  stopColor="var(--accent)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Tooltip
              cursor={{ stroke: "var(--accent)", strokeWidth: 1, strokeDasharray: "3 3" }}
              contentStyle={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-strong)",
                borderRadius: "6px",
                fontSize: "11px",
                padding: "5px 9px",
                boxShadow: "var(--shadow-md)",
              }}
              labelStyle={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "10px",
                color: "var(--text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
              formatter={(value: number) => [
                formatCurrency(value, { compact: true }),
                "Projected",
              ]}
            />
            <Area
              type="monotone"
              dataKey="projected"
              stroke="var(--accent)"
              strokeWidth={2}
              fill="url(#revenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
