"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface WineCardProps {
  name: string
  slug: string
  appellation?: string
  color?: string
  gamme?: string
  description?: string
  imageSrc: string
  imageAlt: string
  className?: string
}

/**
 * WineCard - Composant carte vin inspiré du style Ruinart
 * 
 * Structure :
 * - Image de bouteille (object-contain pour respecter le ratio)
 * - Nom de la cuvée
 * - Appellation/couleur/gamme (optionnel)
 * - Description courte (optionnel)
 * - CTA "Découvrir"
 * 
 * Responsive :
 * - Mobile : Pleine largeur, centrée
 * - Tablette : 2 colonnes dans grille
 * - Desktop : 3-4 colonnes dans grille
 */
export function WineCard({
  name,
  slug,
  appellation,
  color,
  gamme,
  description,
  imageSrc,
  imageAlt,
  className
}: WineCardProps) {
  return (
    <Link
      href={`/les-vins/${slug}`}
      className={cn(
        "group flex flex-col items-center text-center",
        "transition-all duration-300 hover:scale-[1.02]",
        "focus:outline-none focus:ring-2 focus:ring-wine-gold focus:ring-offset-2",
        className
      )}
    >
      {/* Image bouteille - Taille réduite pour voir la bouteille entière */}
      <div className="relative w-full mb-6 flex items-center justify-center bg-white">
        <div className="relative h-[320px] sm:h-[340px] lg:h-[360px] w-full max-w-[200px] sm:max-w-[220px] lg:max-w-[240px] mx-auto flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 200px, (max-width: 1024px) 220px, 240px"
          />
        </div>
      </div>

      {/* Contenu */}
      <div className="flex flex-col items-center space-y-3">
        {/* Nom de la cuvée */}
        <h3 className="text-xl sm:text-2xl font-serif font-light text-slate-900 tracking-wide group-hover:text-wine-gold transition-colors">
          {name}
        </h3>

        {/* Appellation / Couleur / Gamme */}
        {(appellation || color || gamme) && (
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-slate-600 uppercase tracking-wider">
            {appellation && <span>{appellation}</span>}
            {appellation && color && <span className="text-slate-400">•</span>}
            {color && <span>{color}</span>}
            {(appellation || color) && gamme && <span className="text-slate-400">•</span>}
            {gamme && <span>{gamme}</span>}
          </div>
        )}

        {/* Description courte */}
        {description && (
          <p className="text-sm leading-relaxed text-slate-700 max-w-xs line-clamp-3">
            {description}
          </p>
        )}

        {/* CTA discret */}
        <span className="text-xs font-light text-slate-600 uppercase tracking-wide group-hover:text-slate-900 transition-colors">
          Découvrir
        </span>
      </div>
    </Link>
  )
}

