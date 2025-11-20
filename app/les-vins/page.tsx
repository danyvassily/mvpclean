"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gammes } from "@/lib/wines"

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
      <section className="relative h-[30vh] sm:h-[35vh] md:h-[45vh] lg:h-[70vh] max-h-[700px] overflow-hidden flex items-center justify-center">
        <div
          ref={heroImage}
          className="absolute inset-0 will-change-transform z-0"
        >
          <Image
            src="/images/vins/vin-blanc-rouge-rose-bulles-gaillac-sud-ouest-france.jpg"
            alt="Vins du Château Lastours - Gaillac Sud-Ouest"
            fill
            priority
            className="object-cover object-center"
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

      {/* Gammes de vins - Style épuré - Espacements minimaux */}
      {gammes.map((gamme, index) => (
        <section
          key={gamme.id}
          className={`gamme-section py-2 sm:py-4 md:py-6 lg:py-20 ${
            index % 2 === 0 ? "bg-white" : "bg-slate-50"
          }`}
        >
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-12">
            {/* Titre de la gamme - Ultra condensé */}
            <div className="text-center mb-2 sm:mb-4 md:mb-6 lg:mb-16">
              <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-serif font-light leading-tight tracking-tight text-slate-900 mb-1 sm:mb-2 lg:mb-6">
                {gamme.title}
              </h2>
              <p className="text-[10px] sm:text-xs md:text-sm lg:text-lg leading-tight sm:leading-relaxed font-light text-slate-700 max-w-3xl mx-auto px-1">
                {gamme.description}
              </p>
            </div>

            {/* Grille de cuvées - Responsive optimisé mobile - Bouteilles visibles immédiatement */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-12">
              {gamme.cuvees.map((cuvee, cuveeIndex) => (
                <Link
                  key={cuvee.slug}
                  href={cuvee.route}
                  className="group flex flex-col items-center text-center w-full transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 rounded-lg"
                >
                  {/* Image bouteille - Dimensions explicites pour garantir le rendu - VISIBLE */}
                  <div className="w-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4 lg:mb-6 bg-slate-100/30 min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[360px]">
                    <div className="relative w-[150px] h-[200px] sm:w-[170px] sm:h-[240px] md:w-[190px] md:h-[280px] lg:w-[220px] lg:h-[360px] bg-white/50">
                      <Image
                        src={cuvee.image || "/images/vins/placeholder.png"}
                        alt={`${cuvee.title} - Château Lastours`}
                        width={220}
                        height={360}
                        className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 150px, (max-width: 768px) 170px, (max-width: 1024px) 190px, 220px"
                        loading={index === 0 && cuveeIndex < 4 ? "eager" : "lazy"}
                        quality={85}
                        priority={index === 0 && cuveeIndex < 2}
                        onLoad={() => console.log('Image loaded:', cuvee.image)}
                        onError={(e) => {
                          console.error('Image failed to load:', cuvee.image, e)
                        }}
                      />
                    </div>
                  </div>

                  {/* Contenu - Condensé pour mobile */}
                  <div className="flex flex-col items-center space-y-1 sm:space-y-2 md:space-y-3 w-full px-1">
                    {/* Nom de la cuvée */}
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-light text-slate-900 tracking-wide leading-tight">
                      {cuvee.title}
                    </h3>

                    {/* Badge couleur - Style minimaliste */}
                    {cuvee.colorTag && (
                      <span className="inline-block text-[10px] sm:text-xs font-light px-2 sm:px-3 py-0.5 sm:py-1 uppercase tracking-wider text-slate-600 border border-slate-300 rounded-full">
                        {cuvee.colorTag}
                      </span>
                    )}

                    {/* CTA - Style épuré - Masqué sur très petit écran */}
                    <span className="mt-1 sm:mt-2 md:mt-4 text-[10px] sm:text-xs font-light tracking-[0.2em] uppercase text-slate-600 group-hover:text-slate-900 transition-colors flex items-center gap-1 sm:gap-2">
                      <span className="hidden sm:inline">Découvrir la cuvée</span>
                      <span className="sm:hidden">Découvrir</span>
                      <span className="text-xs sm:text-sm">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
