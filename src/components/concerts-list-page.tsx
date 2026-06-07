"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { loadConcerts } from "@/lib/concert-store"
import type { Concert } from "@/types/concert"

export function ConcertsListPage() {
  const [concerts, setConcerts] = useState<Concert[]>([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    setConcerts(loadConcerts())
  }, [])

  const sorted = useMemo(() =>
    [...concerts].sort((a, b) => b.date.localeCompare(a.date)),
    [concerts]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sorted
    return sorted.filter((c) =>
      c.concertName.toLowerCase().includes(q) ||
      c.venue.toLowerCase().includes(q) ||
      c.artists.some((a) => a.toLowerCase().includes(q)) ||
      c.prefecture.includes(q)
    )
  }, [sorted, query])

  return (
    <PageShell
      title="すべてのライブ"
      subtitle={`${filtered.length}件`}
    >
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="ライブ名・会場・アーティストで検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-10 rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">
            {query ? `"${query}" に一致するライブはありません` : "まだ記録がありません"}
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="divide-y divide-border">
            {filtered.map((c) => (
              <Link
                key={c.id}
                href={`/concerts/${c.id}`}
                className="flex flex-col gap-1.5 px-4 py-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium text-sm text-foreground leading-snug">
                    {c.concertName}
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {c.date}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{c.venue}</span>
                  <span>·</span>
                  <span>{c.prefecture}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {c.artists.map((a) => (
                    <span
                      key={a}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  )
}
