"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface StorySectionProps {
  id?: string
  title: string
  kicker?: string
  content: string
  imageSrc: string
  imageAlt: string
  layout?: "image-left" | "image-right" | "stacked"
  className?: string
}

/**
 * StorySection - Composant de section éditoriale inspiré de Ruinart
 * 
 * Structure responsive :
 * - Mobile/Tablette (< 1024px) : Image en haut, texte en dessous sur fond blanc
 * - Desktop (≥ 1024px) : Image + texte côte à côte (ou stacked si layout="stacked")
 * 
 * Design :
 * - Pas de texte overlay sur images (sauf Hero)
 * - Texte centré, polices raisonnables
 * - Marges respirantes
 * - Fond blanc pour le texte
 */
export function StorySection({
  id,
  title,
  kicker,
  content,
  imageSrc,
  imageAlt,
  layout = "image-left",
  className
}: StorySectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative z-10 scroll-mt-20",
        className
      )}
    >
      {/* Container avec padding latéral */}
      <div className="mx-auto max-w-7xl">
        {/* Mobile/Tablette: Stack vertical (image puis texte) */}
        {/* Desktop: Côte à côte selon layout */}
        <div
          className={cn(
            "grid grid-cols-1 gap-0",
            layout === "stacked" 
              ? "lg:grid-cols-1" 
              : "lg:grid-cols-2 lg:gap-12 xl:gap-16"
          )}
        >
          {/* Image */}
          <div
            className={cn(
              "relative w-full overflow-hidden",
              "h-[50vh] sm:h-[55vh] lg:h-[65vh] xl:h-[70vh]",
              layout === "image-right" && "lg:order-2"
            )}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Bloc texte - Fond blanc, centré */}
          <div
            className={cn(
              "bg-white py-12 px-6 sm:px-8 md:px-12",
              "lg:py-16 lg:px-12 xl:py-20 xl:px-16",
              "flex flex-col items-center justify-center text-center",
              layout === "image-right" && "lg:order-1"
            )}
          >
            <div className="max-w-xl mx-auto space-y-6">
              {/* Kicker - Optionnel */}
              {kicker && (
                <div className="flex justify-center">
                  <span className="inline-block px-4 py-2 text-xs sm:text-sm font-light tracking-[0.3em] uppercase text-slate-600 border border-slate-300">
                    {kicker}
                  </span>
                </div>
              )}

              {/* Titre - Taille raisonnable */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light text-slate-900 tracking-[0.02em] leading-[1.15]">
                {title}
              </h2>

              {/* Séparateur décoratif */}
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto" />

              {/* Corps de texte */}
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-slate-700 font-light tracking-wide">
                {content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

