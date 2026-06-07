"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { loadConcerts } from "@/lib/concert-store"
import type { Concert } from "@/types/concert"

export function VenueDetail({ name }: { name: string }) {
  const [concerts, setConcerts] = useState<Concert[]>([])

  useEffect(() => {
    const all = loadConcerts()
    setConcerts(
      all
        .filter((c) => c.venue === name)
        .sort((a, b) => b.date.localeCompare(a.date))
    )
  }, [name])

  const prefecture = concerts[0]?.prefecture ?? ""
  const allArtists = Array.from(
    new Set(concerts.flatMap((c) => c.artists))
  )

  return (
    <PageShell
      title={name}
      subtitle={prefecture ? `${prefecture} · ${concerts.length}回訪問` : `${concerts.length}回訪問`}
    >
      {/* Artists seen here */}
      {allArtists.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-3">
            この会場で見たアーティスト
          </h2>
          <div className="flex flex-wrap gap-2">
            {allArtists.map((a) => (
              <Link
                key={a}
                href={`/artists/${encodeURIComponent(a)}`}
                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                {a}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Concerts at this venue */}
      <section>
        <h2 className="text-sm font-semibold text-foreground mb-3">
          参加したライブ
        </h2>
        {concerts.length === 0 ? (
          <p className="text-sm text-muted-foreground">記録なし</p>
        ) : (
          <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
            {concerts.map((c) => (
              <Link
                key={c.id}
                href={`/concerts/${c.id}`}
                className="flex flex-col gap-1.5 px-4 py-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {c.concertName}
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {c.date}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {c.artists.map((a) => (
                    <span
                      key={a}
                      className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  )
}
