"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"

interface ConditionalMainPaddingProps {
  children: ReactNode
}

export function ConditionalMainPadding({ children }: ConditionalMainPaddingProps) {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  
  // La page d'accueil utilise .hero-offset qui gère son propre padding
  // Les autres pages ont besoin d'un padding-top pour compenser le header fixed
  return (
    <main className={isHomePage ? "" : "pt-20"}>
      {children}
    </main>
  )
}

