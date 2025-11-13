"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { wines, type Wine } from "@/lib/wines-data"
import { ArrowLeft, Award, Grape, BarChart3, Wine as WineIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

interface WinePageClientProps {
  wine: Wine
}

export function WinePageClient({ wine }: WinePageClientProps) {
  const [activeTab, setActiveTab] = useState<'degustation' | 'technique' | 'accords' | 'composition'>('degustation')

  const collectionLabels = {
    classique: "Collection Classique",
    methode: "Collection Méthode",
    fruitees: "Collection Fruitées",
    poussin: "Poussin",
    domeni: "Doméni",
    confidentielle: "Confidentielle",
    opus: "Opus",
  }

  const typeLabels = {
    rouge: "Rouge",
    blanc: "Blanc",
    rose: "Rosé",
    effervescent: "Effervescent",
  }

  // Mapping des images de bouteilles individuelles
  const bottleImages: Record<string, string> = {
    'domeni-rose': '/photos-web-lastours/bouteilles/indivuelles/rose-domeni.jpg',
    'domeni-blanc': '/photos-web-lastours/bouteilles/indivuelles/blanc-domeni.jpg',
    'domeni-rouge': '/photos-web-lastours/bouteilles/indivuelles/rouge-domeni.jpg',
    'poussin-blanc': '/photos-web-lastours/bouteilles/indivuelles/poussin-blanc.jpg',
    'poussin-rose': '/photos-web-lastours/bouteilles/indivuelles/poussin-rose.jpg',
    'petrichor-rouge': '/photos-web-lastours/bouteilles/indivuelles/petrichor-rouge.jpg',
    'la-methode-blanc': '/photos-web-lastours/bouteilles/indivuelles/la-methode-blanc.jpg',
    'la-methode-rose': '/photos-web-lastours/bouteilles/indivuelles/la-methode-rose.jpg',
    'opus-blanc': '/photos-web-lastours/bouteilles/indivuelles/blanc-opus.jpg',
    'opus-rouge': '/photos-web-lastours/bouteilles/indivuelles/rouge-opus.jpg',
    'claire-de-lune': '/photos-web-lastours/bouteilles/indivuelles/claire-de-lune.jpg',
    'blanc-perle': '/photos-web-lastours/bouteilles/indivuelles/blanc-perle.jpg',
    'pigeonnier-1': '/photos-web-lastours/bouteilles/indivuelles/pigeonnier-1.jpg',
  }

  const bottleImage = bottleImages[wine.id] || wine.image || "/images/placeholders/placeholder.svg"

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Breadcrumb - Style Ruinart minimaliste */}
      <div className="container mx-auto px-6 lg:px-12 py-6">
        <Button variant="ghost" asChild className="text-slate-600 hover:text-slate-900 hover:bg-slate-50">
          <Link href="/les-vins">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux vins
          </Link>
        </Button>
      </div>

      {/* Hero Section - Style Ruinart */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Image Bouteille - Style Ruinart sur fond blanc */}
            <div className="flex items-center justify-center lg:sticky lg:top-24">
              <div className="relative w-full max-w-md mx-auto">
                <Image
                  src={bottleImage}
                  alt={wine.name}
                  width={400}
                  height={800}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Informations Vin - Style Ruinart */}
            <div className="space-y-8">
              {/* En-tête avec badges */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-light tracking-[0.3em] uppercase text-slate-600 border border-slate-300 px-4 py-2">
                    {collectionLabels[wine.collection]}
                  </span>
                  <span className="text-xs font-light tracking-[0.3em] uppercase text-slate-600 border border-slate-300 px-4 py-2">
                    {typeLabels[wine.type]}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-tight tracking-tight text-slate-900 mb-4">
                  {wine.name}
                </h1>
                
                <p className="text-xl sm:text-2xl font-serif font-light text-slate-600 mb-8 italic">
                  Millésime {wine.vintage}
                </p>

                <p className="text-base lg:text-lg leading-relaxed font-light text-slate-700 mb-8">
                  {wine.longDescription}
                </p>

                {/* Sélecteur de millésime - Style Ruinart */}
                <div className="mb-8">
                  <label className="text-sm font-light tracking-wide uppercase text-slate-600 mb-3 block">
                    Millésime
                  </label>
                  <select 
                    className="w-full border border-slate-300 px-4 py-3 text-base font-light focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white"
                    value={wine.vintage}
                    onChange={(e) => {
                      // TODO: Implémenter le changement de millésime
                    }}
                  >
                    <option value={wine.vintage}>{wine.vintage}</option>
                  </select>
                </div>
              </div>

              {/* Awards */}
              {wine.awards.length > 0 && (
                <div className="border-t border-slate-200 pt-8">
                  <h3 className="text-sm font-light tracking-wide uppercase text-slate-600 mb-4">
                    Récompenses
                  </h3>
                  <ul className="space-y-3">
                    {wine.awards.map((award, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-700 font-light">
                        <Award className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                        <span>{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section Onglets - Style Ruinart */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Tabs Navigation */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button
              onClick={() => setActiveTab('degustation')}
              className={`text-sm font-light tracking-[0.2em] uppercase px-6 py-3 border transition-all ${
                activeTab === 'degustation'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
              }`}
            >
              <Grape className="w-4 h-4 inline-block mr-2 mb-1" />
              Dégustation
            </button>
            <button
              onClick={() => setActiveTab('technique')}
              className={`text-sm font-light tracking-[0.2em] uppercase px-6 py-3 border transition-all ${
                activeTab === 'technique'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline-block mr-2 mb-1" />
              Informations techniques
            </button>
            <button
              onClick={() => setActiveTab('accords')}
              className={`text-sm font-light tracking-[0.2em] uppercase px-6 py-3 border transition-all ${
                activeTab === 'accords'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
              }`}
            >
              <WineIcon className="w-4 h-4 inline-block mr-2 mb-1" />
              Accords mets-vins
            </button>
            <button
              onClick={() => setActiveTab('composition')}
              className={`text-sm font-light tracking-[0.2em] uppercase px-6 py-3 border transition-all ${
                activeTab === 'composition'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
              }`}
            >
              <Grape className="w-4 h-4 inline-block mr-2 mb-1" />
              Composition
            </button>
          </div>

          {/* Tabs Content */}
          <div className="max-w-4xl mx-auto bg-white border border-slate-200 p-8 lg:p-12">
            {activeTab === 'degustation' && (
              <div className="space-y-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-light text-slate-900 mb-8">
                  Notes de Dégustation
                </h2>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-light tracking-wide uppercase text-slate-600 mb-3">
                      Apparence
                    </h3>
                    <p className="text-slate-700 font-light leading-relaxed">
                      {wine.tastingNotes.appearance}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-light tracking-wide uppercase text-slate-600 mb-3">
                      Nez
                    </h3>
                    <p className="text-slate-700 font-light leading-relaxed">
                      {wine.tastingNotes.nose}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-light tracking-wide uppercase text-slate-600 mb-3">
                      Bouche
                    </h3>
                    <p className="text-slate-700 font-light leading-relaxed">
                      {wine.tastingNotes.palate}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-light tracking-wide uppercase text-slate-600 mb-3">
                      Finale
                    </h3>
                    <p className="text-slate-700 font-light leading-relaxed">
                      {wine.tastingNotes.finish}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'technique' && (
              <div className="space-y-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-light text-slate-900 mb-8">
                  Informations Techniques
                </h2>
                <div className="space-y-6">
                  <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                    <span className="text-sm font-light tracking-wide uppercase text-slate-600">
                      Degré d'alcool
                    </span>
                    <span className="text-slate-900 font-light">
                      {wine.technicalInfo.alcohol}
                    </span>
                  </div>
                  <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                    <span className="text-sm font-light tracking-wide uppercase text-slate-600">
                      Cépages
                    </span>
                    <span className="text-slate-900 font-light text-right">
                      {wine.technicalInfo.grapes.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                    <span className="text-sm font-light tracking-wide uppercase text-slate-600">
                      Élevage
                    </span>
                    <span className="text-slate-900 font-light text-right max-w-md">
                      {wine.technicalInfo.aging}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-light tracking-wide uppercase text-slate-600">
                      Production
                    </span>
                    <span className="text-slate-900 font-light">
                      {wine.technicalInfo.production}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'accords' && (
              <div className="space-y-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-light text-slate-900 mb-8">
                  Accords Mets-Vins
                </h2>
                <div className="space-y-4">
                  {wine.foodPairings?.map((pairing, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-slate-700 font-light leading-relaxed">{pairing}</p>
                    </div>
                  )) || (
                    <p className="text-slate-600 font-light italic">
                      Informations à venir
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'composition' && (
              <div className="space-y-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-light text-slate-900 mb-8">
                  Composition
                </h2>
                <div className="space-y-6">
                  {wine.technicalInfo.grapes.map((grape, index) => (
                    <div key={index} className="border-b border-slate-200 pb-4 last:border-0">
                      <h3 className="text-lg font-light text-slate-900 mb-2">{grape}</h3>
                      <p className="text-slate-600 font-light text-sm">
                        Cépage caractéristique de notre terroir
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Wines - Style Ruinart */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-center text-slate-900 mb-12 lg:mb-16">
            Autres cuvées de la collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {wines
              .filter((w) => w.collection === wine.collection && w.id !== wine.id)
              .slice(0, 3)
              .map((relatedWine) => {
                const relatedBottleImage = bottleImages[relatedWine.id] || relatedWine.image || "/images/placeholders/placeholder.svg"
                return (
                  <Link 
                    key={relatedWine.id} 
                    href={`/les-vins/${relatedWine.id}`}
                    className="group block"
                  >
                    <div className="bg-white overflow-hidden flex items-center justify-center p-6 min-h-[300px] border border-slate-200 group-hover:border-slate-300 transition-colors">
                      <Image
                        src={relatedBottleImage}
                        alt={relatedWine.name}
                        width={200}
                        height={400}
                        className="max-h-[280px] h-auto w-auto object-contain mx-auto group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
                      />
                    </div>
                    <div className="pt-6 text-center">
                      <h3 className="text-xl font-serif font-light text-slate-900 mb-2">
                        {relatedWine.name}
                      </h3>
                      <p className="text-sm font-light text-slate-600 mb-4 italic">
                        Millésime {relatedWine.vintage}
                      </p>
                      <span className="text-sm font-light tracking-wide uppercase text-slate-600 border-b border-slate-300 pb-1 group-hover:border-slate-900 transition-colors">
                        Découvrir
                      </span>
                    </div>
                  </Link>
                )
              })}
          </div>
        </div>
      </section>
    </div>
  )
}
