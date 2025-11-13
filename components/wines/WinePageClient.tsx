"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { WineDetails, WineMillesime } from "@/lib/wines-details"

gsap.registerPlugin(ScrollTrigger)

// Composant pour les onglets d'informations dynamiques
function WineInfoTabs({ wine, currentMillesime }: { wine: WineDetails; currentMillesime: WineMillesime }) {
  const [activeTab, setActiveTab] = useState<string>("degustation")

  // Réinitialiser l'onglet actif quand le millésime change (optionnel, ou garder le même onglet)
  // useEffect(() => {
  //   setActiveTab("degustation")
  // }, [currentMillesime])

  const tabs = [
    { id: "degustation", label: "Dégustation" },
    { id: "technique", label: "Technique" },
    { id: "accords", label: "Accords" },
    { id: "composition", label: "Composition" },
    { id: "service", label: "Service" },
  ]

  return (
    <div className="bg-white border border-slate-200 wine-info-tabs max-h-[500px] lg:max-h-[550px] flex flex-col">
      {/* Onglets */}
      <div className="flex flex-wrap border-b border-slate-200 flex-shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[100px] px-3 py-2.5 text-xs font-light uppercase tracking-[0.1em] transition-all duration-300 border-b-2 min-h-[44px] ${
              activeTab === tab.id
                ? "border-slate-900 text-slate-900 bg-slate-50"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu des onglets - Scrollable si nécessaire */}
      <div className="p-4 lg:p-5 overflow-y-auto flex-1">
        {activeTab === "degustation" && (
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-light uppercase tracking-[0.2em] text-slate-600 mb-1.5">Robe</h3>
              <p className="text-xs leading-relaxed text-slate-700 font-light">{currentMillesime.tasting.appearance}</p>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <h3 className="text-xs font-light uppercase tracking-[0.2em] text-slate-600 mb-1.5">Nez</h3>
              <p className="text-xs leading-relaxed text-slate-700 font-light">{currentMillesime.tasting.nose}</p>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <h3 className="text-xs font-light uppercase tracking-[0.2em] text-slate-600 mb-1.5">Bouche</h3>
              <p className="text-xs leading-relaxed text-slate-700 font-light">{currentMillesime.tasting.palate}</p>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <h3 className="text-xs font-light uppercase tracking-[0.2em] text-slate-600 mb-1.5">Finale</h3>
              <p className="text-xs leading-relaxed text-slate-700 font-light">{currentMillesime.tasting.finish}</p>
            </div>
          </div>
        )}

        {activeTab === "technique" && (
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-light uppercase tracking-[0.2em] text-slate-600 mb-1.5">Degré d'alcool</h3>
              <p className="text-base font-serif font-light text-slate-900">{currentMillesime.technical.alcohol}</p>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <h3 className="text-xs font-light uppercase tracking-[0.2em] text-slate-600 mb-1.5">Cépages</h3>
              <p className="text-xs leading-relaxed text-slate-700 font-light">{currentMillesime.technical.grapes}</p>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <h3 className="text-xs font-light uppercase tracking-[0.2em] text-slate-600 mb-1.5">Élevage</h3>
              <p className="text-xs leading-relaxed text-slate-700 font-light">{currentMillesime.technical.aging}</p>
            </div>
          </div>
        )}

        {activeTab === "accords" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-light uppercase tracking-[0.2em] text-slate-600 mb-2">Entrées</h3>
              <ul className="space-y-1.5 text-xs text-slate-700 font-light">
                {currentMillesime.pairing.appetizers.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-slate-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <h3 className="text-xs font-light uppercase tracking-[0.2em] text-slate-600 mb-2">Plats</h3>
              <ul className="space-y-1.5 text-xs text-slate-700 font-light">
                {currentMillesime.pairing.mainCourses.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-slate-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <h3 className="text-xs font-light uppercase tracking-[0.2em] text-slate-600 mb-2">Fromages</h3>
              <ul className="space-y-1.5 text-xs text-slate-700 font-light">
                {currentMillesime.pairing.cheeses.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-slate-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "composition" && (
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-light uppercase tracking-[0.2em] text-slate-600 mb-1.5">Terroir</h3>
              <p className="text-xs leading-relaxed text-slate-700 font-light">{currentMillesime.composition.terroir}</p>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <h3 className="text-xs font-light uppercase tracking-[0.2em] text-slate-600 mb-1.5">Vendanges</h3>
              <p className="text-xs leading-relaxed text-slate-700 font-light">{currentMillesime.composition.harvest}</p>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <h3 className="text-xs font-light uppercase tracking-[0.2em] text-slate-600 mb-1.5">Vinification</h3>
              <p className="text-xs leading-relaxed text-slate-700 font-light">{currentMillesime.composition.vinification}</p>
            </div>
          </div>
        )}

        {activeTab === "service" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-light uppercase tracking-[0.2em] text-slate-600 mb-2">Conseils de Service</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-xs font-light text-slate-600 block mb-0.5">Température</span>
                  <p className="text-xs font-light text-slate-900">{wine.servingAdvice.temperature}</p>
                </div>
                {wine.servingAdvice.decanting && (
                  <div className="border-t border-slate-200 pt-2">
                    <span className="text-xs font-light text-slate-600 block mb-0.5">Carafage</span>
                    <p className="text-xs font-light text-slate-900">{wine.servingAdvice.decanting}</p>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-2">
                  <span className="text-xs font-light text-slate-600 block mb-0.5">Verre</span>
                  <p className="text-xs font-light text-slate-900">{wine.servingAdvice.glassware}</p>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <h3 className="text-xs font-light uppercase tracking-[0.2em] text-slate-600 mb-2">Conservation</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-xs font-light text-slate-600 block mb-0.5">Température</span>
                  <p className="text-xs font-light text-slate-900">{wine.conservation.temperature}</p>
                </div>
                <div className="border-t border-slate-200 pt-2">
                  <span className="text-xs font-light text-slate-600 block mb-0.5">Durée</span>
                  <p className="text-xs font-light text-slate-900">{wine.conservation.duration}</p>
                </div>
                <div className="border-t border-slate-200 pt-2">
                  <span className="text-xs font-light text-slate-600 block mb-0.5">Conditions</span>
                  <p className="text-xs font-light text-slate-900">{wine.conservation.conditions}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface WinePageClientProps {
  wine: WineDetails
  availableYears: number[]
}

export function WinePageClient({ wine, availableYears }: WinePageClientProps) {
  const [selectedYear, setSelectedYear] = useState(availableYears[0] || 2024)
  const currentMillesime: WineMillesime = wine.millesimes.find(m => m.year === selectedYear) || wine.millesimes[0]
  
  const container = useRef(null)
  const bottleImage = useRef(null)

  useGSAP(
    () => {
      // Hero animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from(".wine-hero-title", {
        y: 80,
        opacity: 0,
        duration: 1,
      })
        .from(".wine-hero-desc", { y: 40, opacity: 0, duration: 0.8 }, "-=0.5")
        .fromTo(
          bottleImage.current,
          { scale: 1.1, y: 20 },
          {
            scale: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "<"
        )

      // Animation de la carte dynamique
      gsap.from(".wine-info-tabs", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      })
    },
    { scope: container, dependencies: [selectedYear] }
  )

  return (
    <div ref={container} className="min-h-screen bg-white">
      {/* Hero Section - Bouteille + Carte dynamique à droite - Style Ruinart */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[50%_50%] gap-8 lg:gap-12 items-start">
            {/* Image bouteille à gauche - Agrandie */}
            <div className="relative order-2 lg:order-1">
              <div
                ref={bottleImage}
                className="relative h-[450px] sm:h-[500px] lg:h-[600px] w-full max-w-sm mx-auto flex items-center justify-center"
              >
                <Image
                  src={wine.image}
                  alt={`${wine.name} - Château Lastours`}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 640px) 450px, (max-width: 1024px) 500px, 600px"
                />
              </div>
            </div>

            {/* Carte dynamique à droite - Style Ruinart */}
            <div className="order-1 lg:order-2">
              {/* Titre - Plus petit */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light mb-3 wine-hero-title tracking-tight text-slate-900">
                {wine.name}
              </h1>

              {/* Type de vin - Style minimaliste */}
              <p className="text-xs font-light uppercase tracking-[0.2em] text-slate-600 mb-6">
                {wine.color}
              </p>

              {/* Description courte - Plus compacte */}
              <p className="text-sm lg:text-base leading-relaxed font-light text-slate-700 mb-6 wine-hero-desc">
                {wine.description}
              </p>

              {/* Description longue - Plus compacte */}
              <p className="text-sm leading-relaxed font-light text-slate-600 mb-8">
                {wine.longDescription}
              </p>

              {/* Bouton télécharger fiche technique - Style sobre compact */}
              <a
                href={wine.pdfTechSheet}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-900 hover:bg-slate-50 transition-all duration-300 text-xs font-light mb-8"
              >
                <span className="text-sm">↓</span>
                Télécharger la fiche technique
              </a>

              {/* Encart dynamique avec onglets - Style Ruinart compact */}
              <WineInfoTabs wine={wine} currentMillesime={currentMillesime} />
            </div>
          </div>
        </div>
      </section>

      {/* Sélecteur de millésime - Style minimaliste */}
      {availableYears.length > 1 && (
        <section className="bg-white py-8 border-t border-b border-slate-200">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm font-light text-slate-600 uppercase tracking-[0.2em]">
                Millésime
              </span>
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-6 py-2 text-sm font-light transition-all duration-300 border min-h-[44px] ${
                    selectedYear === year
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 hover:bg-slate-50 border-slate-300"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
