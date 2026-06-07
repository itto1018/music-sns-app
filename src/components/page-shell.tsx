import Link from "next/link"
import { ArrowLeft, CalendarDays, Plus } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

type Props = {
  backHref?: string
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function PageShell({ backHref = "/", title, subtitle, children }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto max-w-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={backHref}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-foreground truncate">{title}</h1>
              {subtitle && (
                <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/upcoming"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <CalendarDays className="size-4" />
              <span className="hidden sm:inline">今後のライブ</span>
            </Link>
            <Link
              href="/concerts/new"
              className={buttonVariants({ size: "sm" })}
            >
              <Plus className="size-4" />
              <span className="hidden sm:inline">追加</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-6 py-8 flex flex-col gap-6">
        {children}
      </main>
    </div>
  )
}
