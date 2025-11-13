"use client"

import Image from "next/image"

/**
 * WinesHero - Hero épuré style Ruinart pour page vins
 * 
 * - Image grande mais pas excessive
 * - Pas de texte long en overlay
 * - Titre sobre sous l'image
 * - Fond blanc pur
 */
export function WinesHero() {
  return (
    <section className="bg-white">
      {/* Image sans texte overlay */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <Image
          src="/images/wines/vin-blanc-rouge-rose-bulles-gaillac-sud-ouest-france.jpg"
          alt="Nos Cuvées"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Titre sous l'image - épuré */}
      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 tracking-tight mb-6">
          Nos Cuvées
        </h1>
        <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
          Découvrez notre gamme de vins d'exception, 
          fruit de notre terroir gaillacois et de notre savoir-faire ancestral.
        </p>
      </div>
    </section>
  )
}

