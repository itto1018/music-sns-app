import { ConcertDetail } from "@/components/concert-detail"

export default async function ConcertDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ConcertDetail id={id} />
}
