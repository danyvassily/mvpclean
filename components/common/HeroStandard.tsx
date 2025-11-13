"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import gsap from "gsap"

interface HeroStandardProps {
  imageSrc: string
  title: string
  subtitle?: string
  className?: string
}

/**
 * Composant Hero Standard
 * - Image avec texte adossé style luxueux
 * - Texte blanc sur overlay sombre (pas de backplate gris)
 * - Animation GSAP pour le titre
 * - Hauteur adaptative selon breakpoints (60vh mobile, 70vh tablette, 80vh desktop)
 */
export function HeroStandard({
  imageSrc,
  title,
  subtitle,
  className
}: HeroStandardProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current || !containerRef.current) return

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
    
    // Animation du titre
    gsap.set(titleRef.current, {
      opacity: 0,
      y: 60,
    })
    
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
    })

    // Animation du sous-titre si présent
    if (subtitle && subtitleRef.current) {
      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 40,
      })
      
      tl.to(
        subtitleRef.current,
        {
          opacity: 0.9,
          y: 0,
          duration: 1,
        },
        "-=0.6"
      )
    }

    return () => {
      tl.kill()
    }
  }, [title, subtitle])

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "h-[60vh] md:h-[70vh] lg:h-[80vh]",
        className
      )}
    >
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Overlay gradient renforcé */}
      <div className="absolute inset-0 image-overlay-dark" />
      
      {/* Grain texture subtile */}
      <div className="absolute inset-0 opacity-[0.08] texture-grain-fine" />
      
      {/* Contenu texte centré - Style lisible */}
      <div className="relative z-10 h-full flex items-end">
        <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 pb-12 md:pb-16 lg:pb-20">
          <div className="max-w-4xl mx-auto text-center text-on-image">
            <h1
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light text-white tracking-[0.02em] leading-[1.1] mb-4 md:mb-6"
            >
              {title}
            </h1>
            {subtitle && (
              <p
                ref={subtitleRef}
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/95 font-light tracking-wide max-w-2xl mx-auto"
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
