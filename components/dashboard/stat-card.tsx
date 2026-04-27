"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";
import { AnimatedNumber } from "@/components/ui/animated-number";

export interface StatCardProps {
  label: string;
  value: number;
  format?: (n: number) => string;
  delta: number;
  visualization: "bars" | "line" | "donut";
  data?: number[];
  donut?: { value: number; total: number; tone: string };
  onClick?: () => void;
}

export function StatCard({
  label,
  value,
  format,
  delta,
  visualization,
  data = [],
  donut,
  onClick,
}: StatCardProps) {
  const isUp = delta >= 0;

  return (
    <div className="bg-[var(--bg-elevated)] rounded-[18px] border border-[var(--border)] p-5 shadow-[var(--shadow-card)] card-float flex flex-col">
      <div className="flex items-baseline justify-between mb-4">
        <div className="text-[10.5px] font-mono uppercase tracking-[0.08em] text-[var(--text-tertiary)] font-medium">
          {label}
        </div>
        <span
          className={cn(
            "inline-flex items-center text-[11px] font-semibold px-1.5 py-0.5 rounded-[5px] tabular",
            isUp
              ? "text-[var(--success)] bg-[var(--status-success-bg)]"
              : "text-[var(--danger)] bg-[var(--status-danger-bg)]"
          )}
        >
          {isUp ? "↑" : "↓"} {Math.abs(delta)}%
        </span>
      </div>

      <div className="flex items-end justify-between gap-3 mb-4">
        <AnimatedNumber
          value={value}
          format={format}
          className="num-display text-[30px] leading-none"
        />
        <div className="w-[110px] h-[44px]">
          {visualization === "bars" && <MiniBars data={data} />}
          {visualization === "line" && <MiniLine data={data} isUp={isUp} />}
          {visualization === "donut" && donut && <MiniDonut donut={donut} />}
        </div>
      </div>

      <button
        onClick={onClick}
        className="mt-auto -mx-1 px-1 py-1 inline-flex items-center justify-between text-[12.5px] font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group border-t border-[var(--border)] pt-3"
      >
        <span>See details</span>
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </button>
    </div>
  );
}

function MiniBars({ data }: { data: number[] }) {
  const chartData = data.map((v, i) => ({ i, v }));
  const lastIdx = data.length - 1;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Bar dataKey="v" radius={[3, 3, 0, 0]} maxBarSize={6}>
          {chartData.map((_, i) => (
            <Cell
              key={i}
              fill={i === lastIdx ? "var(--accent)" : "var(--accent-soft)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function MiniLine({ data, isUp }: { data: number[]; isUp: boolean }) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 4, right: 0, bottom: 4, left: 0 }}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={isUp ? "var(--success)" : "var(--danger)"}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function MiniDonut({
  donut,
}: {
  donut: { value: number; total: number; tone: string };
}) {
  const data = [
    { name: "v", value: donut.value },
    { name: "r", value: Math.max(0, donut.total - donut.value) },
  ];
  return (
    <div className="relative h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius="65%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={donut.tone} />
            <Cell fill="var(--bg-secondary)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono tabular text-[var(--text-secondary)] font-semibold">
        {Math.round((donut.value / donut.total) * 100)}%
      </div>
    </div>
  );
}
