"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Plus, CalendarDays, ChevronRight, CheckCircle2 } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { StatsCard } from "@/components/stats-card"
import { ArtistsChart } from "@/components/artists-chart"
import { VenuesChart } from "@/components/venues-chart"
import { MonthlyChart } from "@/components/monthly-chart"
import { loadConcerts } from "@/lib/concert-store"
import type { Concert } from "@/types/concert"

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3 animate-pulse">
      <div className="size-9 rounded-lg bg-muted" />
      <div className="flex flex-col gap-1.5">
        <div className="h-6 w-12 rounded bg-muted" />
        <div className="h-3 w-20 rounded bg-muted" />
      </div>
    </div>
  )
}

function SkeletonList() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="px-4 py-3 border-b border-border last:border-0 flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="h-4 w-48 rounded bg-muted" />
            <div className="h-3 w-20 rounded bg-muted" />
          </div>
          <div className="h-3 w-32 rounded bg-muted" />
        </div>
      ))}
    </div>
  )
}

export function Dashboard() {
  const [concerts, setConcerts] = useState<Concert[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setConcerts(loadConcerts())
    setIsLoading(false)
    if (searchParams.get("added") === "1") {
      setShowToast(true)
      router.replace(pathname)
      const t = setTimeout(() => setShowToast(false), 3000)
      return () => clearTimeout(t)
    }
  }, [searchParams, router, pathname])

  const totalArtists = new Set(concerts.flatMap((c) => c.artists)).size
  const totalVenues = new Set(concerts.map((c) => c.venue)).size
  const recent = [...concerts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-background">
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm text-background shadow-lg animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
          ライブを追加しました
        </div>
      )}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto max-w-2xl flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">ライブ記録</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              参加したライブの履歴と統計
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/upcoming"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <CalendarDays className="size-4" />
              今後のライブ
            </Link>
            <Link
              href="/concerts/new"
              className={buttonVariants({ size: "sm" })}
            >
              <Plus className="size-4" />
              追加
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-8 flex flex-col gap-8">
        {/* Stats */}
        <section className="grid grid-cols-3 gap-4">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <StatsCard label="総ライブ数" value={concerts.length} icon="🎵" color="indigo" />
              <StatsCard label="アーティスト" value={totalArtists} icon="🎤" color="violet" />
              <StatsCard label="訪れた会場" value={totalVenues} icon="🏟️" color="emerald" />
            </>
          )}
        </section>

        {/* Recent concerts */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">最近のライブ</h2>
            <Link
              href="/concerts"
              className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              すべて見る
              <ChevronRight className="size-3" />
            </Link>
          </div>
          {isLoading ? (
            <SkeletonList />
          ) : (
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {recent.length === 0 ? (
                <div className="p-8 flex flex-col items-center gap-2 text-center">
                  <span className="text-3xl">🎸</span>
                  <p className="text-sm font-medium text-foreground">まだ記録がありません</p>
                  <p className="text-xs text-muted-foreground">
                    参加したライブを追加して記録を始めましょう
                  </p>
                  <Link
                    href="/concerts/new"
                    className={buttonVariants({ size: "sm" }) + " mt-2"}
                  >
                    <Plus className="size-4" />
                    最初のライブを追加
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {recent.map((c) => (
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
              )}
            </div>
          )}
        </section>

        {/* Monthly chart */}
        <MonthlyChart concerts={concerts} />

        {/* Artists chart */}
        <ArtistsChart concerts={concerts} />

        {/* Venues chart */}
        <VenuesChart concerts={concerts} />
      </main>
    </div>
  )
}
