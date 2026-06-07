import { VenueDetail } from "@/components/venue-detail"

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  return <VenueDetail name={decodeURIComponent(name)} />
}
