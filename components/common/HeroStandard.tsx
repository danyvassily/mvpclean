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
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        "h-[55vh] sm:h-[60vh] lg:h-[70vh] max-h-[700px]",
        className
      )}
    >
      {/* Image de fond - object-cover pour éviter l'étirement */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </div>

      {/* Overlay gradient pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      
      {/* Grain texture subtile */}
      <div className="absolute inset-0 opacity-[0.05] texture-grain-fine" />
      
      {/* Contenu texte - Centré verticalement et horizontalement */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            {/* Titre - Taille raisonnable, court */}
            <h1
              ref={titleRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-light text-white tracking-[0.02em] leading-[1.15] mb-6"
              style={{
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.7), 0 8px 24px rgba(0, 0, 0, 0.5)'
              }}
            >
              {title}
            </h1>
            
            {/* Sous-titre court si présent */}
            {subtitle && (
              <p
                ref={subtitleRef}
                className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/95 font-light tracking-wide max-w-2xl mx-auto"
                style={{
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)'
                }}
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
