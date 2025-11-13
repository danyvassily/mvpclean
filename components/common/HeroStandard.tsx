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
        "image-text-section overlay-desktop relative",
        className
      )}
    >
      {/* Image de fond */}
      <div className="section-image" style={{height: '70vh'}}>
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>
      
      {/* Texte */}
      <div className="section-text">
        <h1
          ref={titleRef}
          style={{fontSize: '2rem', fontFamily: 'var(--font-serif)', fontWeight: 300, lineHeight: 1.1, marginBottom: '1rem'}}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            ref={subtitleRef}
            style={{maxWidth: '700px', margin: '0 auto'}}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
