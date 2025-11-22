"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gammes } from "@/lib/wines"
import { WineCard } from "@/components/wines/WineCard"
import { WineGrid } from "@/components/wines/WineGrid"

gsap.registerPlugin(ScrollTrigger)

export default function WinesPage() {
  const container = useRef(null)
  const heroImage = useRef(null)

  useGSAP(
    () => {
      // Hero animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
      })
        .from(".hero-text", { y: 50, opacity: 0, duration: 1 }, "-=0.6")
        .fromTo(
          heroImage.current,
          { scale: 1.1 },
          {
            scale: 1,
            duration: 2,
            ease: "power2.inOut",
          },
          "<"
        )

      // Section animations - Désactivées pour la première section pour voir les bouteilles immédiatement
      gsap.utils.toArray(".gamme-section").forEach((section, index) => {
        // Première section visible immédiatement, pas d'animation
        if (index === 0) {
          gsap.set(section as gsap.DOMTarget, { opacity: 1, y: 0 })
        } else {
          gsap.from(section as gsap.DOMTarget, {
            opacity: 0,
            y: 80,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section as gsap.DOMTarget,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          })
        }
      })
    },
    { scope: container }
  )

  return (
    <div ref={container} className="min-h-screen bg-white">
      {/* Hero Section - Style Ruinart épuré - Hauteur minimale pour mobile */}
      <section className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[80vh] max-h-[800px] overflow-hidden flex items-center justify-center bg-neutral-900">
        <div
          ref={heroImage}
          className="absolute inset-0 will-change-transform z-0"
        >
          <Image
            src="/images/vins/vin-blanc-rouge-rose-bulles-gaillac-sud-ouest-france.jpg"
            alt="Vins du Château Lastours - Gaillac Sud-Ouest"
            fill
            priority
            className="object-contain object-center"
            sizes="100vw"
          />
        </div>
        {/* Overlay plus sombre pour la lisibilité du texte blanc */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Titre et texte sur l'image - Ultra condensé pour mobile */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-12 text-center max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-serif font-light mb-1 sm:mb-2 lg:mb-8 hero-title tracking-tight !text-white drop-shadow-md">
            Nos Vins
          </h1>
          <p className="text-xs sm:text-sm md:text-lg lg:text-2xl font-light !text-white hero-text leading-tight sm:leading-relaxed max-w-2xl mx-auto drop-shadow-md px-2">
            Vivez l'émotion Lastours : des arômes captivants, des instants à
            partager, l'expression pure de notre art du vin
          </p>
        </div>
      </section>

      {/* Gammes de vins - Style Ruinart épuré et aéré */}
      {gammes.map((gamme, index) => (
        <section
          key={gamme.id}
          className={`gamme-section py-12 sm:py-16 md:py-20 lg:py-32 ${
            index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
          }`}
        >
          <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 max-w-7xl">
            {/* Titre de la gamme - Style Ruinart */}
            <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light leading-tight tracking-tight text-slate-900 mb-4 sm:mb-6 lg:mb-8">
                {gamme.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light text-slate-600 max-w-3xl mx-auto">
                {gamme.description}
              </p>
            </div>

            {/* Grille de cuvées - Composants réutilisables */}
            <WineGrid>
              {gamme.cuvees.map((cuvee) => (
                <WineCard
                  key={cuvee.slug}
                  name={cuvee.title}
                  subtitle={cuvee.colorTag}
                  imageSrc={cuvee.image || "/images/wines/placeholder.png"}
                  href={cuvee.route}
                />
              ))}
            </WineGrid>
          </div>
        </section>
      ))}
    </div>
  )
}
