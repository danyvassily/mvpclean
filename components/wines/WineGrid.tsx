"use client"

import { cn } from "@/lib/utils"
import { WineCard } from "./WineCard"

interface Wine {
  name: string
  slug: string
  appellation?: string
  color?: string
  gamme?: string
  description?: string
  image: string
  imageAlt?: string
}

interface WineGridProps {
  wines: Wine[]
  title?: string
  subtitle?: string
  className?: string
  columns?: {
    mobile?: 1
    tablet?: 2 | 3
    desktop?: 3 | 4
  }
}

/**
 * WineGrid - Grille responsive pour affichage des vins
 * 
 * Inspiré du style Ruinart :
 * - Grille propre et aérée
 * - Responsive : 1 colonne mobile, 2 tablette, 3-4 desktop
 * - Fond blanc
 * - Marges respirantes
 * 
 * Utilisation :
 * ```tsx
 * <WineGrid
 *   wines={winesData}
 *   title="Nos Cuvées d'Exception"
 *   subtitle="Découvrez notre gamme complète"
 * />
 * ```
 */
export function WineGrid({
  wines,
  title,
  subtitle,
  className,
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  }
}: WineGridProps) {
  const gridClasses = cn(
    "grid gap-8 md:gap-10 lg:gap-16",
    "grid-cols-1 place-items-center",
    columns.tablet === 2 && "md:grid-cols-2",
    columns.tablet === 3 && "md:grid-cols-3",
    columns.desktop === 3 && "lg:grid-cols-3",
    columns.desktop === 4 && "lg:grid-cols-4"
  )

  return (
    <section className={cn("py-16 lg:py-24 bg-white", className)}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Titre et sous-titre (optionnels) */}
        {(title || subtitle) && (
          <div className="text-center mb-12 lg:mb-16 max-w-4xl mx-auto">
            {title && (
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-slate-900 tracking-tight mb-6">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm md:text-base leading-relaxed text-slate-600 font-light max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Grille de vins */}
        <div className={gridClasses}>
          {wines.map((wine) => (
            <WineCard
              key={wine.slug}
              name={wine.name}
              slug={wine.slug}
              appellation={wine.appellation}
              color={wine.color}
              gamme={wine.gamme}
              description={wine.description}
              imageSrc={wine.image}
              imageAlt={wine.imageAlt || `${wine.name} - Château Lastours`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

