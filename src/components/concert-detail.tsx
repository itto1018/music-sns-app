"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2, MapPin, Calendar, Mic2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageShell } from "@/components/page-shell"
import { loadConcerts, deleteConcert } from "@/lib/concert-store"
import type { Concert } from "@/types/concert"

export function ConcertDetail({ id }: { id: string }) {
  const router = useRouter()
  const [concert, setConcert] = useState<Concert | null | "loading">("loading")
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    const found = loadConcerts().find((c) => c.id === id) ?? null
    setConcert(found)
  }, [id])

  if (concert === "loading") {
    return (
      <PageShell title="ライブ詳細">
        <div className="rounded-xl border border-border bg-card animate-pulse h-48" />
      </PageShell>
    )
  }

  if (!concert) {
    return (
      <PageShell title="ライブ詳細">
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">ライブが見つかりません。</p>
        </div>
      </PageShell>
    )
  }

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    deleteConcert(id)
    router.push("/")
    router.refresh()
  }

  return (
    <PageShell title={concert.concertName} subtitle={concert.date}>
      <div className="rounded-xl border border-border bg-card divide-y divide-border">
        <DetailRow icon={<Calendar className="size-4" />} label="日付">
          {concert.date}
        </DetailRow>
        <DetailRow icon={<MapPin className="size-4" />} label="会場">
          <Link
            href={`/venues/${encodeURIComponent(concert.venue)}`}
            className="text-primary hover:underline"
          >
            {concert.venue}
          </Link>
          <span className="ml-1.5 text-xs text-muted-foreground">
            {concert.prefecture}
          </span>
        </DetailRow>
        <DetailRow icon={<Mic2 className="size-4" />} label="アーティスト">
          <div className="flex flex-wrap gap-1.5">
            {concert.artists.map((a) => (
              <Link
                key={a}
                href={`/artists/${encodeURIComponent(a)}`}
                className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                {a}
              </Link>
            ))}
          </div>
        </DetailRow>
      </div>

      {/* Delete */}
      <div className="flex justify-end pt-2">
        {confirmDelete ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">本当に削除しますか？</span>
            <Button variant="outline" size="sm" onClick={() => setConfirmDelete(false)}>
              キャンセル
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              削除する
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
            削除
          </Button>
        )}
      </div>
    </PageShell>
  )
}

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4 px-5 py-4">
      <div className="flex items-center gap-2 w-24 shrink-0 text-muted-foreground text-sm">
        {icon}
        {label}
      </div>
      <div className="text-sm text-foreground">{children}</div>
    </div>
  )
}
