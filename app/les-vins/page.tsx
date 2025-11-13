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

      // Section animations
      gsap.utils.toArray(".gamme-section").forEach((section) => {
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
      })
    },
    { scope: container }
  )

  return (
    <div ref={container} className="min-h-screen bg-white">
      {/* Hero Section - Style Ruinart épuré */}
      <section className="relative">
        {/* Image Hero - Full width */}
        <div className="relative h-[60vh] sm:h-[65vh] lg:h-[70vh] max-h-[700px] overflow-hidden">
          <div
            ref={heroImage}
            className="absolute inset-0 will-change-transform"
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
          {/* Overlay subtil */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Titre et texte sur fond blanc en dessous de l'image */}
        <div className="bg-white py-12 lg:py-20">
          <div className="container mx-auto px-6 lg:px-12 text-center max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-8 hero-title tracking-tight text-slate-900">
              Nos Vins
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light text-slate-700 hero-text leading-relaxed">
              Vivez l'émotion Lastours : des arômes captivants, des instants à
              partager, l'expression pure de notre art du vin
            </p>
          </div>
        </div>
      </section>

      {/* Gammes de vins - Style épuré */}
      {gammes.map((gamme, index) => (
        <section
          key={gamme.id}
          className={`gamme-section py-12 lg:py-20 ${
            index % 2 === 0 ? "bg-white" : "bg-slate-50"
          }`}
        >
          <div className="container mx-auto px-6 lg:px-12">
            {/* Titre de la gamme */}
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light leading-tight tracking-tight text-slate-900 mb-6">
                {gamme.title}
              </h2>
              <p className="text-base lg:text-lg leading-relaxed font-light text-slate-700 max-w-3xl mx-auto">
                {gamme.description}
              </p>
            </div>

            {/* Grille de cuvées - Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
              {gamme.cuvees.map((cuvee) => (
                <Link
                  key={cuvee.slug}
                  href={cuvee.route}
                  className="group flex flex-col items-center text-center w-full transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 rounded-lg"
                >
                  {/* Image bouteille - PNG transparent */}
                  <div className="relative w-full mb-6 flex items-center justify-center">
                    <div className="relative h-[280px] sm:h-[320px] lg:h-[360px] w-full max-w-[180px] sm:max-w-[200px] lg:max-w-[220px] mx-auto">
                      <Image
                        src={cuvee.image || "/images/vins/placeholder.png"}
                        alt={`${cuvee.title} - Château Lastours`}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 180px, (max-width: 1024px) 200px, 220px"
                      />
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="flex flex-col items-center space-y-3 w-full">
                    {/* Nom de la cuvée */}
                    <h3 className="text-xl sm:text-2xl font-serif font-light text-slate-900 tracking-wide">
                      {cuvee.title}
                    </h3>

                    {/* Badge couleur - Style minimaliste */}
                    {cuvee.colorTag && (
                      <span className="inline-block text-xs font-light px-3 py-1 uppercase tracking-wider text-slate-600 border border-slate-300 rounded-full">
                        {cuvee.colorTag}
                      </span>
                    )}

                    {/* CTA - Style épuré */}
                    <span className="mt-4 text-xs font-light tracking-[0.2em] uppercase text-slate-600 group-hover:text-slate-900 transition-colors flex items-center gap-2">
                      Découvrir la cuvée
                      <span className="text-sm">→</span>
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
