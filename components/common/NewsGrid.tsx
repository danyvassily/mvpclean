"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { TransitionLink } from "@/components/gsap/TransitionLink"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface NewsItem {
  slug: string
  title: string
  excerpt: string
  image?: string
  date: string
}

interface NewsGridProps {
  items: NewsItem[]
  itemsPerPage?: number
  className?: string
}

/**
 * Composant NewsGrid - Inspiration Ruinart
 * - Grille responsive de cartes d'actualités
 * - Image, titre, résumé court, lien "Lire"
 * - Pagination "Charger plus" si > itemsPerPage
 */
export function NewsGrid({ 
  items, 
  itemsPerPage = 9,
  className 
}: NewsGridProps) {
  const [displayCount, setDisplayCount] = useState(itemsPerPage)
  const itemsToShow = items.slice(0, displayCount)
  const hasMore = items.length > displayCount

  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Grille d'articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {itemsToShow.map((item) => (
            <article
              key={item.slug}
              className="group flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              {item.image && (
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}

              {/* Contenu */}
              <div className="flex-1 p-6 flex flex-col">
                {/* Date */}
                {item.date && (
                  <time
                    dateTime={item.date}
                    className="text-sm text-slate-500 mb-3 font-light"
                  >
                    {new Date(item.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}

                {/* Titre */}
                <h3 className="text-xl lg:text-2xl font-serif font-light text-slate-900 mb-3 leading-tight">
                  <TransitionLink
                    href={`/actualites/${item.slug}`}
                    className="hover:text-wine-gold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-wine-gold focus:ring-offset-2 rounded"
                  >
                    {item.title}
                  </TransitionLink>
                </h3>

                {/* Résumé */}
                <p className="text-slate-600 text-base leading-relaxed mb-4 flex-1">
                  {item.excerpt}
                </p>

                {/* Lien "Lire" */}
                <div>
                  <TransitionLink
                    href={`/actualites/${item.slug}`}
                    className="inline-flex items-center gap-2 text-slate-900 font-medium hover:text-wine-gold transition-colors duration-300 group-hover:translate-x-1 transform transition-transform focus:outline-none focus:ring-2 focus:ring-wine-gold focus:ring-offset-2 rounded min-h-[44px]"
                  >
                    Lire
                    <ArrowRight className="w-4 h-4" />
                  </TransitionLink>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bouton "Charger plus" */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={() => setDisplayCount((prev) => Math.min(prev + itemsPerPage, items.length))}
              variant="outline"
              size="lg"
              className="min-h-[44px] px-8"
            >
              Charger plus d'actualités
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

