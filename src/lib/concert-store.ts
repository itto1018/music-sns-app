import type { Concert } from "@/types/concert"
import { sampleConcerts } from "./sample-data"

const STORAGE_KEY = "music-sns-concerts"

export function loadConcerts(): Concert[] {
  if (typeof window === "undefined") return sampleConcerts
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return sampleConcerts
    return JSON.parse(stored) as Concert[]
  } catch {
    return sampleConcerts
  }
}

export function saveConcerts(concerts: Concert[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(concerts))
}

export function addConcert(concert: Omit<Concert, "id">): Concert {
  const concerts = loadConcerts()
  const newConcert: Concert = {
    ...concert,
    id: crypto.randomUUID(),
  }
  saveConcerts([...concerts, newConcert])
  return newConcert
}

export function deleteConcert(id: string): void {
  const concerts = loadConcerts()
  saveConcerts(concerts.filter((c) => c.id !== id))
}
