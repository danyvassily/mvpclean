"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface EngagementCardProps {
  kicker?: string
  title: string
  body: string
  imageSrc: string
  imageAlt: string
  layout?: "image-first" | "text-first"
  logo?: string
  className?: string
}

/**
 * EngagementCard - Composant carte engagement inspiré du style Ruinart
 * 
 * Structure :
 * - Image pleine largeur (ou côté desktop)
 * - Kicker (petit label)
 * - Titre
 * - Corps de texte
 * - Logo optionnel (ex: HVE)
 * 
 * Responsive :
 * - Mobile : Image puis texte (stack vertical)
 * - Tablette : Image puis texte (stack vertical)
 * - Desktop : Image et texte côte à côte (alternance selon layout)
 */
export function EngagementCard({
  kicker,
  title,
  body,
  imageSrc,
  imageAlt,
  layout = "image-first",
  logo,
  className
}: EngagementCardProps) {
  return (
    <section className={cn("py-16 lg:py-24 bg-white", className)}>
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className={cn(
            "flex flex-col lg:flex-row gap-10 lg:gap-16 items-center",
            layout === "text-first" && "lg:flex-row-reverse"
          )}
        >
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Texte */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-6">
            {/* Kicker */}
            {kicker && (
              <div>
                <span className="inline-block px-4 py-2 bg-slate-100 text-slate-800 text-xs font-semibold tracking-[0.15em] uppercase border border-slate-200">
                  {kicker}
                </span>
              </div>
            )}

            {/* Titre */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-slate-900 tracking-tight leading-[1.15]">
              {title}
            </h2>

            {/* Corps de texte */}
            <p className="text-base lg:text-lg leading-relaxed text-slate-700 font-light">
              {body}
            </p>

            {/* Logo optionnel (ex: HVE) */}
            {logo && (
              <div className="pt-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={logo}
                    alt="Logo certification"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

