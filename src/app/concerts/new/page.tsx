import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ConcertForm } from "@/components/concert-form"

export default function NewConcertPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto max-w-lg flex items-center gap-3">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-foreground">ライブを追加</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-6 py-8">
        <ConcertForm />
      </main>
    </div>
  )
}
