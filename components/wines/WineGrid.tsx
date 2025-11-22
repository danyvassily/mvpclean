"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface WineGridProps {
  children: ReactNode
  className?: string
}

/**
 * WineGrid - Grille responsive style Ruinart AUTHENTIQUE
 * 
 * Inspiré de https://www.ruinart.com/fr-fr/champagnes/
 * 
 * Caractéristiques style Ruinart :
 * - Bouteilles petites mais visibles (40-63px après +40%)
 * - Grille 3 colonnes sur desktop
 * - Espacement généreux mais équilibré
 * - Beaucoup d'espace blanc autour
 * - Typographie légère et discrète
 * 
 * Responsive :
 * - Mobile : 2 colonnes
 * - Tablette (md) : 3 colonnes
 * - Desktop (lg) : 3 colonnes
 */
export function WineGrid({ children, className }: WineGridProps) {
  return (
    <div
      className={cn(
        // Grille responsive style Ruinart - 3 colonnes sur desktop
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3",
        // Espacement généreux mais équilibré (style Ruinart)
        "gap-10 sm:gap-12 md:gap-16 lg:gap-20",
        // Centrage parfait
        "place-items-center",
        // Largeur max pour concentrer la grille
        "max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  )
}

export default WineGrid
