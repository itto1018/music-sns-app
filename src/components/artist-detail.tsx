"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PageShell } from "@/components/page-shell"
import { loadConcerts } from "@/lib/concert-store"
import { upcomingConcerts } from "@/lib/upcoming-data"
import type { Concert } from "@/types/concert"

export function ArtistDetail({ name }: { name: string }) {
  const [concerts, setConcerts] = useState<Concert[]>([])

  useEffect(() => {
    const all = loadConcerts()
    setConcerts(
      all
        .filter((c) => c.artists.includes(name))
        .sort((a, b) => b.date.localeCompare(a.date))
    )
  }, [name])

  const upcoming = upcomingConcerts.filter((c) => c.artist === name)

  return (
    <PageShell
      title={name}
      subtitle={`参加回数: ${concerts.length}回`}
    >
      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-3">
            今後のライブ
          </h2>
          <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
            {upcoming.map((u) => (
              <div key={u.id} className="flex flex-col gap-1 px-4 py-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {u.concertName}
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {u.date}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {u.venue} · {u.prefecture}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Past concerts */}
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
                className="flex flex-col gap-1 px-4 py-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {c.concertName}
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {c.date}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {c.venue} · {c.prefecture}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  )
}
