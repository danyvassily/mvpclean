"use client"

import Image from "next/image"

interface HeroMinimalProps {
  imageSrc: string
  title: string
  subtitle?: string
  className?: string
}

/**
 * HeroMinimal - Hero épuré style Ruinart pour toutes les pages éditoriales
 * 
 * - Image grande SANS texte overlay (ou texte minimal court)
 * - Titre sobre sous ou sur l'image (selon config)
 * - Fond blanc pur
 * - Pas de textes longs sur images
 */
export function HeroMinimal({
  imageSrc,
  title,
  subtitle,
  className = ""
}: HeroMinimalProps) {
  return (
    <section className={`bg-white ${className}`}>
      {/* Image sans overlay de texte long */}
      <div className="relative w-full h-[45vh] md:h-[55vh] lg:h-[60vh]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Titre sous l'image - épuré style Ruinart */}
      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16 lg:py-20 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 tracking-tight mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}

