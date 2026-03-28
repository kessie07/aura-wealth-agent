"use client";

import React, { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type OraclePoint = {
  dateLabel: string;
  dateISO: string;
  balance: number;
};

function formatShortDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function generateMockProjection(days = 14): OraclePoint[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const base = 120;
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const dayOfMonth = d.getDate();
    const lastDayOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    const daysToMonthEnd = lastDayOfMonth - dayOfMonth;

    const trend = i * 3.2;
    const monthEndDip =
      daysToMonthEnd <= 3
        ? (4 - daysToMonthEnd) * 5.5
        : (4 - Math.min(daysToMonthEnd, 4)) * 0.5;

    const wave = Math.sin(i * 0.85) * 1.8;
    const raw = base - trend - monthEndDip + wave;
    const clipped = Math.max(raw, 2.8);

    return {
      dateLabel: formatShortDate(d),
      dateISO: d.toISOString().slice(0, 10),
      balance: Math.round(clipped * 10) / 10,
      riskValue: clipped < 20 ? Math.round(clipped * 10) / 10 : null,
    };
  });
}

export default function OracleChart() {
  const zeroThreshold = 0;
  const data = useMemo(() => generateMockProjection(14), []);

  const yTicks = useMemo(() => {
    const max = Math.max(...data.map((d) => d.balance));
    const ticks = [20, 40, 60, 80, 100];
    return ticks.filter(v => v < max + 20);
  }, [data]);

  return (
    <div className="bg-neutral-900/50 rounded-3xl border border-white/10 p-6 h-full flex flex-col">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <div className="min-w-0">
          <p className="text-neutral-300 text-sm font-medium uppercase tracking-wider">Oracle: 14-day balance</p>
          <p className="text-neutral-500 text-xs mt-1">
            Predictive projection with safety zone monitoring
          </p>
        </div>
      </div>

      <div className="w-full flex-grow min-h-[300px]"> 
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="oracleBalanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00B3FF" stopOpacity={0.4} />
                <stop offset="60%" stopColor="#00B3FF" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#00B3FF" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              horizontal
              vertical={false}
              stroke="rgba(255,255,255,0.04)"
              strokeDasharray="4 6"
            />

            <XAxis
              dataKey="dateLabel"
              tickLine={false}
              axisLine={false}
              // Added padding object and dy to move text down
              padding={{ left: 10, right: 10 }}
              tick={{ fill: "rgba(161,161,170,0.6)", fontSize: 11, dy: 12 }}
              interval="preserveStartEnd"
              minTickGap={10}
            />
            
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "rgba(161,161,170,0.5)", fontSize: 11 }}
              domain={[0, 'auto']}
              ticks={yTicks}
              // Added Rupee formatter to the axis side
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip
  cursor={{ stroke: "rgba(0,179,255,0.2)", strokeWidth: 1 }}
  contentStyle={{
    backgroundColor: "#171717",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    fontSize: 12,
  }}
  // We use 'any' here to stop the TypeScript error while keeping the logic
  formatter={(value: any) => [
    `₹${Number(value).toLocaleString('en-IN')}`, 
    "Balance"
  ]}
  labelFormatter={(label) => `Date: ${label}`}
/>

            <ReferenceLine
              y={zeroThreshold}
              stroke="rgba(239,68,68,0.4)"
              strokeDasharray="4 4"
            />

            <Area
              type="monotone"
              dataKey="balance"
              stroke="#00B3FF"
              strokeWidth={2.5}
              fill="url(#oracleBalanceGradient)"
              isAnimationActive={true}
              animationDuration={1500}
            />
            <Area
  type="monotone"
  dataKey="riskValue"
  stroke="none"
  fill="none"
  // This adds a custom red glowing dot to the low points
  dot={{ 
    r: 5, 
    fill: "#EF4444", 
    stroke: "#EF4444", 
    strokeWidth: 2,
    filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))" 
  }}
  isAnimationActive={true}
  animationBegin={1000}
/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}