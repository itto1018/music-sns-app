"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import type { Concert } from "@/types/concert"

type Props = { concerts: Concert[] }

export function MonthlyChart({ concerts }: Props) {
  const now = new Date()
  const oneYearAgo = new Date(now)
  oneYearAgo.setFullYear(now.getFullYear() - 1)
  const cutoff = oneYearAgo.toISOString().slice(0, 10)

  const recent = concerts.filter((c) => c.date >= cutoff)

  const counts = new Map<string, number>()
  for (const c of recent) {
    const [year, month] = c.date.split("-")
    const key = `${year}/${month}`
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }

  const data = Array.from(counts.entries())
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month))

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold text-foreground mb-1">
        月別ライブ参加数
      </h2>
      <p className="text-xs text-muted-foreground mb-4">直近1年</p>
      {data.length === 0 ? (
        <p className="text-muted-foreground text-sm">データなし</p>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{ top: 0, right: 8, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value) => [`${value}件`, "ライブ数"]}
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
            />
            <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
