import { notFound } from "next/navigation"
import { winesDetails, getAvailableYears } from "@/lib/wines-details"
import { WinePageClient } from "@/components/wines/WinePageClient"

interface WinePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function WinePage(props: WinePageProps) {
  const params = await props.params
  const wine = winesDetails[params.slug]
  
  if (!wine) {
    notFound()
  }

  const availableYears = getAvailableYears(params.slug)

  return <WinePageClient wine={wine} availableYears={availableYears} />
}

