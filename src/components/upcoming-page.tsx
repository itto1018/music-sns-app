"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { upcomingConcerts } from "@/lib/upcoming-data"
import { loadConcerts } from "@/lib/concert-store"

export function UpcomingPage() {
  const [knownArtists, setKnownArtists] = useState<Set<string>>(new Set())

  useEffect(() => {
    const all = loadConcerts()
    setKnownArtists(new Set(all.flatMap((c) => c.artists)))
  }, [])

  const filtered = upcomingConcerts
    .filter((c) => knownArtists.has(c.artist))
    .sort((a, b) => a.date.localeCompare(b.date))

  const grouped = new Map<string, typeof filtered>()
  for (const c of filtered) {
    const month = c.date.slice(0, 7)
    if (!grouped.has(month)) grouped.set(month, [])
    grouped.get(month)!.push(c)
  }

  return (
    <PageShell
      title="今後のライブ"
      subtitle="行ったことがあるアーティストの今後のスケジュール"
    >
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          記録済みアーティストの今後のライブ情報がありません。
        </p>
      ) : (
        Array.from(grouped.entries()).map(([month, concerts]) => (
          <section key={month}>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {month.replace("-", "年")}月
            </h2>
            <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
              {concerts.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-col gap-1.5 px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-foreground">
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
                  <Link
                    href={`/artists/${encodeURIComponent(c.artist)}`}
                    className="inline-flex self-start items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                  >
                    {c.artist}
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </PageShell>
  )
}
