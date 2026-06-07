"use client"

import { useRouter } from "next/navigation"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts"
import type { Concert } from "@/types/concert"

type Props = { concerts: Concert[] }

const BAR_COLORS = ["#10b981", "#34d399", "#6ee7b7"]
const MEDALS = ["🥇", "🥈", "🥉"]

function MedalTick(props: {
  x?: number
  y?: number
  payload?: { value: string }
  index?: number
}) {
  const { x = 0, y = 0, payload, index = 0 } = props
  const medal = MEDALS[index] ?? ""
  const name = payload?.value ?? ""
  return (
    <g>
      <text
        x={x}
        y={y}
        dy={4}
        textAnchor="end"
        fontSize={12}
        fill="oklch(0.145 0 0)"
      >
        {medal} {name}
      </text>
    </g>
  )
}

export function VenuesChart({ concerts }: Props) {
  const router = useRouter()

  const counts = new Map<string, number>()
  for (const c of concerts) {
    counts.set(c.venue, (counts.get(c.venue) ?? 0) + 1)
  }

  const data = Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold text-foreground mb-1">
        ライブハウス・会場ランキング
      </h2>
      <p className="text-xs text-muted-foreground mb-4">
        バーをクリックすると会場詳細を表示
      </p>
      {data.length === 0 ? (
        <p className="text-muted-foreground text-sm">データなし</p>
      ) : (
        <ResponsiveContainer width="100%" height={140}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 48, left: 0, bottom: 0 }}
            onClick={(payload) => {
              const name = payload?.activeLabel
              if (name) router.push(`/venues/${encodeURIComponent(String(name))}`)
            }}
          >
            <XAxis type="number" allowDecimals={false} hide />
            <YAxis
              type="category"
              dataKey="name"
              width={170}
              tick={<MedalTick />}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value) => [`${value}回`, "参加回数"]}
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
              cursor={{ fill: "oklch(0.97 0 0)", opacity: 0.5 }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} style={{ cursor: "pointer" }} barSize={32}>
              <LabelList
                dataKey="count"
                position="right"
                formatter={(v) => `${v}回`}
                style={{ fontSize: 12, fontWeight: 600, fill: "oklch(0.145 0 0)" }}
              />
              {data.map((_, i) => (
                <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
