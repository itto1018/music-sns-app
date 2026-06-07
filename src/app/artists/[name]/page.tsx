import { ArtistDetail } from "@/components/artist-detail"

export default async function ArtistDetailPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  return <ArtistDetail name={decodeURIComponent(name)} />
}
