import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Wine, Shield, Calendar, Users, Award, Sparkles } from "lucide-react"

export default function ClubPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Collé au header */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden mt-20">
        <div className="absolute inset-0">
          <Image
            src="/asset/club/vintotheque-anciennes-cuvees-prestiges-chateau-lastours-gaillac-france.jpg"
            alt="Vinothèque anciennes cuvées prestige Château Lastours"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/60" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-6">Club Lastours</h1>
            <p className="text-xl md:text-2xl font-light leading-relaxed mb-8 max-w-2xl mx-auto">Le cercle exclusif des amoureux du vin</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-black hover:bg-white/90">
                <Link href="/auth/signin">Se connecter</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-black">
                <Link href="/evenements/organiser">Découvrir le Domaine</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-light mb-6">Une expérience d'exception</h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">Au Château Lastours, chaque bouteille est une ode à la passion, au terroir et au savoir-faire transmis depuis des générations.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] order-2 lg:order-1">
              <Image
                src="/asset/club/arche-briques-rouges-pigeonnier-patrimoine-chateau-lastours-gaillac.jpg"
                alt="Arche en briques rouges du pigeonnier patrimoine Château Lastours"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-2xl md:text-4xl font-light">Un monde d'exclusivité</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">Plus qu'un programme, une expérience rare.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/asset/club/voiture-de-collection-club-chateau-lastours-gaillac-sud-ouest-france.jpg"
            alt="Voiture de collection - Club Château Lastours"
            fill
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
        </div>
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light mb-6 text-white drop-shadow-lg">Rejoignez l'excellence</h2>
            <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto text-white drop-shadow-md">Une promesse d'émotions partagées, un voyage vers l'excellence et le savoir-faire viticole, réservé aux amateurs passionnés en quête d'authenticité et de luxe discret.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-black hover:bg-white/90">
                <Link href="/auth/signin">Se connecter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
