"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface WineCardProps {
  name: string
  subtitle?: string
  description?: string
  imageSrc: string
  href: string
  className?: string
}

/**
 * WineCard - Composant carte vin style Ruinart ultra-minimaliste
 * 
 * CONTRAINTE IMPORTANTE : Toutes les bouteilles ont EXACTEMENT la même taille visuelle
 * grâce à un conteneur de dimensions fixes (aspect-ratio 1:3) et object-contain.
 * 
 * Structure :
 * - Bouteille centrée (taille fixe uniforme)
 * - Nom de la cuvée (élégant, sobre)
 * - Badge/subtitle optionnel (ex: "Blanc", "Rouge", etc.)
 * - CTA discret "Découvrir"
 * 
 * Style Ruinart :
 * - Fond blanc pur
 * - Typographie légère et aérée
 * - Transitions douces
 * - Hover subtil
 * - Pas de prix affiché
 */
export function WineCard({
  name,
  subtitle,
  description,
  imageSrc,
  href,
  className
}: WineCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col items-center text-center w-full",
        "transition-all duration-500 hover:opacity-80",
        "focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-4",
        "rounded-lg",
        className
      )}
    >
      {/* Conteneur bouteille - Dimensions augmentées de 30% supplémentaires */}
      <div className="w-full flex items-center justify-center mb-6 sm:mb-8">
        <div className="relative" style={{ width: '172px', height: '515px' }}>
          <Image
            src={imageSrc}
            alt={`${name} - Château Lastours`}
            fill
            className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 172px, (max-width: 768px) 200px, 240px"
            quality={100}
            priority
          />
        </div>
      </div>

      {/* Contenu textuel - Style Ruinart authentique */}
      <div className="flex flex-col items-center space-y-2 sm:space-y-3 w-full">
        {/* Nom de la cuvée - Style Ruinart */}
        <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-serif font-light text-slate-900 tracking-wide leading-tight">
          {name}
        </h3>

        {/* Badge/Subtitle - Style Ruinart discret */}
        {subtitle && (
          <span className="inline-block text-[9px] sm:text-[10px] font-light px-2 py-0.5 uppercase tracking-[0.15em] text-slate-500">
            {subtitle}
          </span>
        )}

        {/* Description courte (optionnelle) */}
        {description && (
          <p className="text-[10px] sm:text-xs font-light text-slate-600 leading-relaxed max-w-xs line-clamp-2 mt-1">
            {description}
          </p>
        )}
      </div>
    </Link>
  )
}

export default WineCard
