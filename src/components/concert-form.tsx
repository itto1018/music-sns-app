"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { addConcert } from "@/lib/concert-store"
import { PREFECTURES } from "@/lib/prefectures"

const inputClass =
  "h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 w-full"

export function ConcertForm() {
  const router = useRouter()
  const [artists, setArtists] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const date = data.get("date") as string
    const venue = (data.get("venue") as string).trim()
    const prefecture = data.get("prefecture") as string
    const concertName = (data.get("concertName") as string).trim()
    const artistList = artists
      .split(/[,、，]/)
      .map((a) => a.trim())
      .filter(Boolean)

    if (!date || !venue || !prefecture || !concertName || artistList.length === 0) {
      setError("すべての項目を入力してください")
      return
    }

    setIsSubmitting(true)
    addConcert({ date, venue, prefecture, concertName, artists: artistList })
    router.push("/?added=1")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="date">日付</label>
        <input id="date" name="date" type="date" required className={inputClass} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="concertName">ライブ名称</label>
        <input
          id="concertName"
          name="concertName"
          type="text"
          placeholder="例: BUMP OF CHICKEN TOUR 2025"
          required
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="venue">会場名</label>
        <input
          id="venue"
          name="venue"
          type="text"
          placeholder="例: Zepp Shinjuku"
          required
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="prefecture">都道府県</label>
        <select
          id="prefecture"
          name="prefecture"
          required
          defaultValue=""
          className={inputClass + " cursor-pointer"}
        >
          <option value="" disabled>選択してください</option>
          {PREFECTURES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="artists">
          アーティスト
          <span className="ml-1 text-xs text-muted-foreground">（複数はカンマ区切り）</span>
        </label>
        <input
          id="artists"
          type="text"
          value={artists}
          onChange={(e) => setArtists(e.target.value)}
          placeholder="例: RADWIMPS, yoasobi"
          required
          className={inputClass}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? "追加中..." : "追加する"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          キャンセル
        </Button>
      </div>
    </form>
  )
}
