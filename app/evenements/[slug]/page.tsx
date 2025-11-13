import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getEventBySlug, events } from "@/lib/events-data"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventPageProps {
  params: Promise<{ slug: string }>
}

// Génération des pages statiques pour l'export
export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }))
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) return notFound()

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero */}
        <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />
          <Image 
            src={event.image || "/images/wines/wine-tasting-event.png"} 
            alt={event.title} 
            fill 
            sizes="100vw"
            className="object-cover" 
          />
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-display mb-4 text-balance">{event.title}</h1>
            <p className="text-xl opacity-90">Partagez des moments d'exception au domaine</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <article className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{event.type}</Badge>
                {event.featured && <Badge className="bg-accent text-accent-foreground">À ne pas manquer</Badge>}
              </div>

              <p className="text-muted-foreground leading-relaxed">{event.description}</p>

              {event.content?.map((p, i) => (
                <p key={i} className="leading-relaxed text-foreground/80">{p}</p>
              ))}
            </article>

            <aside>
              <div className="rounded-lg border p-6 space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(event.date).toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {event.time}</div>
                  <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {event.spots}</div>
                  {event.location?.name && (
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.location.name}</div>
                  )}
                </div>

                <Button asChild className="w-full min-h-[44px] focus:ring-2 focus:ring-accent focus:ring-offset-2">
                  <Link href="/evenements/reservation">
                    Réserver
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  )
}

