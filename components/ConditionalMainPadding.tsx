"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"

interface ConditionalMainPaddingProps {
  children: ReactNode
}

// Pages avec hero visuel qui doivent être collées au header (sans padding)
const PAGES_WITH_HERO = [
  "/",
  "/les-vins",
  "/evenements",
  "/evenements/organiser",
  "/evenements/simuler-votre-devis",
  "/evenements/reservation",
  "/reservation",
  "/domaine/histoire",
  "/domaine/engagement",
  "/domaine/terroir",
  "/notre-vignoble",
  "/notre-chai",
  "/gastronomie",
  "/degustation",
  "/club",
  "/mecenat",
  "/de-la-vigne-a-la-bouteille",
  "/le-cycle-de-la-vigne",
  "/methode-blanche",
  "/la-vigne",
  "/savoir-faire/vigne",
  "/savoir-faire/chai",
  "/actualites",
  "/presse",
]

export function ConditionalMainPadding({ children }: ConditionalMainPaddingProps) {
  const pathname = usePathname()
  
  // Vérifie si la page actuelle a un hero visuel
  const hasHeroVisual = PAGES_WITH_HERO.some(
    path => pathname === path || pathname.startsWith(path + "/")
  )
  
  // Le padding est maintenant géré globalement par ScrollSmootherWrapper pour compenser le header fixe
  // On ne met donc plus de padding ici pour éviter les doubles espaces
  return (
    <main>
      {children}
    </main>
  )
}

