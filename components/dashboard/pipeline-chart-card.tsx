"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn, formatCurrency } from "@/lib/utils";
import { AnimatedNumber } from "@/components/ui/animated-number";
import type { RevenuePoint } from "@/lib/mock/dashboard";

const RANGES = ["1D", "1W", "1M", "6M", "1Y", "Custom"] as const;
type Range = (typeof RANGES)[number];

export function PipelineChartCard({
  data,
  total,
  vsLastMonthPct,
  highlightMonth = "Apr",
}: {
  data: RevenuePoint[];
  total: number;
  vsLastMonthPct: number;
  highlightMonth?: string;
}) {
  const [range, setRange] = React.useState<Range>("1Y");

  const totals = React.useMemo(() => {
    return data.reduce(
      (acc, d) => {
        acc.demand += d.demand;
        acc.negotiation += d.negotiation;
        acc.settlement += d.settlement;
        return acc;
      },
      { demand: 0, negotiation: 0, settlement: 0 }
    );
  }, [data]);

  return (
    <section className="bg-[var(--bg-elevated)] rounded-[20px] border border-[var(--border)] p-6 shadow-[var(--shadow-card)] card-float">
      {/* Header */}
      <header className="flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-[var(--text-tertiary)] font-medium mb-2">
            Case Pipeline Value
          </div>
          <div className="flex items-baseline gap-2">
            <AnimatedNumber
              value={total}
              format={(n) => formatCurrency(n, { compact: true })}
              className="num-display text-[36px] leading-[1]"
            />
            <span className="inline-flex items-center text-[11.5px] font-semibold text-[var(--success)] bg-[var(--status-success-bg)] px-1.5 py-0.5 rounded-[5px]">
              ↑ {vsLastMonthPct > 0 ? "+" : ""}
              {vsLastMonthPct}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-px p-[3px] rounded-[10px] bg-[var(--bg-secondary)] border border-[var(--border)]">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "h-7 px-2.5 text-[11.5px] font-mono font-medium rounded-[7px] tabular transition-colors",
                r === range
                  ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-[var(--shadow-xs)]"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </header>

      {/* Legend */}
      <div className="flex items-center gap-5 mb-4 flex-wrap">
        <Legend dotClass="bg-[#fb923c]" label="Demand" value={totals.demand} />
        <Legend
          dotClass="bg-[#fdba74]"
          label="Negotiation"
          value={totals.negotiation}
        />
        <Legend
          dotClass="bg-[#fed7aa]"
          label="Settlement"
          value={totals.settlement}
        />
      </div>

      {/* Chart */}
      <div className="h-[280px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 16, right: 8, bottom: 8, left: 0 }}
            barCategoryGap="32%"
          >
            <defs>
              <pattern
                id="stripe-pattern"
                patternUnits="userSpaceOnUse"
                width="6"
                height="6"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="6"
                  stroke="rgba(15, 23, 42, 0.06)"
                  strokeWidth="3"
                />
              </pattern>
            </defs>

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "var(--text-tertiary)",
                fontSize: 11,
                fontFamily: "var(--font-inter)",
              }}
              dy={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "var(--text-tertiary)",
                fontSize: 11,
                fontFamily: "var(--font-jetbrains)",
              }}
              tickFormatter={(v: number) =>
                v === 0 ? "0" : `$${(v / 1000).toFixed(0)}K`
              }
              width={56}
            />

            <Tooltip
              cursor={false}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="rounded-[10px] bg-slate-900 text-white px-3 py-2.5 shadow-[var(--shadow-lg)] border border-slate-800 min-w-[180px]">
                    <div className="text-[10.5px] font-mono uppercase tracking-[0.07em] text-slate-400 mb-1.5">
                      {label}, 2026
                    </div>
                    {payload.map((p) => (
                      <div
                        key={p.dataKey as string}
                        className="flex items-center justify-between gap-4 text-[12px] py-0.5"
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: p.color }}
                          />
                          <span className="capitalize text-slate-300">
                            {p.dataKey as string}
                          </span>
                        </div>
                        <span className="font-semibold tabular text-white">
                          {formatCurrency(p.value as number, { compact: true })}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }}
            />

            <Bar dataKey="demand" stackId="a" radius={[0, 0, 0, 0]} maxBarSize={28}>
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.month === highlightMonth
                      ? "#fb923c"
                      : "url(#stripe-pattern)"
                  }
                />
              ))}
            </Bar>
            <Bar dataKey="negotiation" stackId="a" radius={[0, 0, 0, 0]} maxBarSize={28}>
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.month === highlightMonth
                      ? "#fdba74"
                      : "url(#stripe-pattern)"
                  }
                />
              ))}
            </Bar>
            <Bar
              dataKey="settlement"
              stackId="a"
              radius={[10, 10, 0, 0]}
              maxBarSize={28}
            >
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.month === highlightMonth
                      ? "#fed7aa"
                      : "url(#stripe-pattern)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function Legend({
  dotClass,
  label,
  value,
}: {
  dotClass: string;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${dotClass}`} />
      <span className="text-[12px] text-[var(--text-secondary)]">{label}</span>
      <span className="text-[12px] tabular font-semibold text-[var(--text-primary)]">
        {formatCurrency(value, { compact: true })}
      </span>
    </div>
  );
}

/**
 * ColorChip — pure-color square used as a category swatch.
 * Replaces the former IconChip; same API but content should be text/letter/number,
 * never a Lucide icon (per global UI rule). Kept as a named export so existing
 * imports compile while we strip per-page usages.
 */
export function IconChip({
  tone,
  children,
}: {
  tone:
    | "blue"
    | "indigo"
    | "peach"
    | "mint"
    | "lavender"
    | "amber"
    | "rose";
  children: React.ReactNode;
}) {
  const styles = {
    blue: "bg-[var(--chip-blue)] text-[var(--chip-blue-fg)]",
    indigo: "bg-[var(--chip-indigo)] text-[var(--chip-indigo-fg)]",
    peach: "bg-[var(--chip-peach)] text-[var(--chip-peach-fg)]",
    mint: "bg-[var(--chip-mint)] text-[var(--chip-mint-fg)]",
    lavender: "bg-[var(--chip-lavender)] text-[var(--chip-lavender-fg)]",
    amber: "bg-[var(--chip-amber)] text-[var(--chip-amber-fg)]",
    rose: "bg-[var(--chip-rose)] text-[var(--chip-rose-fg)]",
  } as const;

  return (
    <div
      className={cn(
        "h-9 px-2 min-w-[36px] rounded-[10px] inline-flex items-center justify-center shrink-0 text-[10.5px] font-mono font-semibold uppercase tracking-[0.05em]",
        styles[tone]
      )}
    >
      {children}
    </div>
  );
}
