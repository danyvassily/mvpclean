"use client"

import Image from "next/image"
import { OptimizedImage } from "@/components/common/OptimizedImage"
import { ScrollAnimation } from "@/components/gsap/ScrollAnimations"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface EspaceSectionProps {
  imageSrc: string
  title: string
  subtitle?: string
  description: string
  capacite?: number
  surface_m2?: number
  reverse?: boolean
  ctaLabel?: string
  ctaHref?: string
  index?: number
}

/**
 * Section Espace pleine largeur avec split image/texte
 * - Alternance image gauche/texte droite puis inverse
 * - Image full-bleed avec Next/Image
 * - Aucune icône dans les titres
 * - Style luxe avec grandes images et typographie soignée
 */
export function EspaceSection({
  imageSrc,
  title,
  subtitle,
  description,
  capacite,
  surface_m2,
  reverse = false,
  ctaLabel,
  ctaHref,
  index = 0
}: EspaceSectionProps) {
  return (
    <ScrollAnimation animation="fadeIn" delay={index * 0.1}>
      <section className="relative w-full overflow-hidden py-4 lg:py-6">
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6",
          reverse && "lg:grid-flow-col-dense"
        )}>
          {/* Image pleine largeur */}
          <div className={cn(
            "relative w-full overflow-hidden",
            "h-[400px] md:h-[500px] lg:h-[600px]",
            "rounded-[11px] lg:rounded-[18px]",
            reverse && "lg:col-start-2"
          )}>
            <OptimizedImage
              src={imageSrc}
              alt={title}
              fill
              containerClassName="w-full h-full rounded-[11px] lg:rounded-[18px]"
              className="object-cover object-center"
              aspectRatio="landscape"
              objectFit="cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Colonne texte */}
          <div className={cn(
            "flex flex-col justify-center",
            "px-4 lg:px-8 xl:px-12 py-16 lg:py-24",
            "bg-background",
            reverse && "lg:col-start-1"
          )}>
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground leading-tight">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-lg md:text-xl text-accent font-medium">
                    {subtitle}
                  </p>
                )}
              </div>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
                {description}
              </p>

              {/* Attributs (capacité/surface) */}
              {(capacite || surface_m2) && (
                <div className="flex flex-wrap gap-6 pt-4 text-sm md:text-base text-muted-foreground">
                  {capacite && (
                    <div>
                      <span className="font-medium text-foreground">Capacité :</span> {capacite} personnes
                    </div>
                  )}
                  {surface_m2 && (
                    <div>
                      <span className="font-medium text-foreground">Surface :</span> {surface_m2}m²
                    </div>
                  )}
                </div>
              )}

              {/* CTA optionnel */}
              {ctaLabel && ctaHref && (
                <div className="pt-6">
                  <Button 
                    variant="outline" 
                    asChild
                    className="min-h-[44px] focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  >
                    <Link href={ctaHref}>
                      {ctaLabel}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </ScrollAnimation>
  )
}

