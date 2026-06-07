const accentColors: Record<string, { border: string; iconBg: string; text: string }> = {
  indigo: { border: "#6366f1", iconBg: "#eef2ff", text: "#4338ca" },
  violet: { border: "#8b5cf6", iconBg: "#f5f3ff", text: "#6d28d9" },
  emerald: { border: "#10b981", iconBg: "#ecfdf5", text: "#047857" },
  default: { border: "#e5e7eb", iconBg: "#f9fafb", text: "#374151" },
}

type StatsCardProps = {
  label: string
  value: number | string
  icon: string
  color?: keyof typeof accentColors
}

export function StatsCard({ label, value, icon, color = "default" }: StatsCardProps) {
  const { border, iconBg, text } = accentColors[color] ?? accentColors.default
  return (
    <div
      className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
      style={{ borderTop: `3px solid ${border}` }}
    >
      <span
        className="size-9 rounded-lg flex items-center justify-center text-lg"
        style={{ background: iconBg }}
      >
        {icon}
      </span>
      <div>
        <p className="text-2xl font-bold" style={{ color: text }}>
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </div>
    </div>
  )
}
