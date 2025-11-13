"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Mail, Phone, Users, Award, Heart } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

// Remplacement de TeamImage par Next/Image
function TeamImage({ 
  src, 
  alt, 
  className = "",
  containerClassName = "",
  fill = false,
  priority = false,
  objectFit = "cover",
  objectPosition = "center center",
  sizes
}: {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  fill?: boolean
  priority?: boolean
  objectFit?: "cover" | "contain"
  objectPosition?: string
  sizes?: string
}) {
  return (
    <div className={cn("relative", containerClassName)}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        className={cn(className, "transition-opacity duration-300")}
        style={{
          objectFit: objectFit,
          objectPosition: objectPosition
        }}
        sizes={sizes}
      />
    </div>
  )
}

export default function TeamPage() {
  const heroRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
    
    tl.from(".team-hero-title", {
      y: 60,
      opacity: 0,
      duration: 1,
      delay: 0.3
    })
    .from(".team-hero-subtitle", {
      y: 40,
      opacity: 0,
      duration: 0.9
    }, "-=0.6")
  }, { scope: heroRef })

  return (
    <div ref={heroRef} className="min-h-screen">
      {/* Hero Section - Photo de groupe pleine largeur */}
      <section className="relative w-full h-[70vh] md:h-[80vh] lg:h-[85vh] flex items-end md:items-center justify-center overflow-hidden pb-16 md:pb-0">
        <div className="absolute inset-0 w-full h-full">
          <TeamImage
            src="/images/team/photo-de-groupe.jpeg"
            alt="Portrait de l'équipe du Château Lastours"
            fill
            priority
            objectFit="cover"
            objectPosition="center center"
            containerClassName="w-full h-full"
            className="w-full h-full"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6 flex flex-col items-center justify-center">
          <h1 className="team-hero-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display mb-4 md:mb-6 leading-tight tracking-tight">Notre Équipe</h1>
          <p className="team-hero-subtitle text-sm sm:text-base md:text-lg lg:text-2xl text-pretty opacity-90 font-light leading-relaxed">Passion et expertise au service de l'excellence</p>
        </div>
      </section>

      {/* Leadership - Simple et élégant */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 tracking-tight">Direction</h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
              La famille de Faramond perpétue la tradition avec Louis, qui représente la nouvelle génération passionnée du domaine
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Photo à gauche */}
              <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-lg shadow-2xl">
                <TeamImage
                  src="/images/team/louis.jpeg"
                  alt="Portrait de Louis de Faramond – équipe Château Lastours"
                  fill
                  objectFit="cover"
                  objectPosition="center 30%"
                  containerClassName="absolute inset-0"
                  className="w-full h-full"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Contenu à droite */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-slate-900 tracking-tight mb-4 leading-tight">
                    Louis de Faramond
                  </h3>
                  <p className="text-xl md:text-2xl text-accent font-light tracking-wide italic mb-6">
                    Vigneron & Nouvelle Génération
                  </p>
                </div>

                <div className="space-y-6 text-slate-700 leading-relaxed">
                  <p className="text-base md:text-lg font-light">
                    Louis représente la nouvelle génération de la famille de Faramond. Il fait preuve de courage et 
                    d'abnégation pour le succès que connaît aujourd'hui le château.
                  </p>
                  <p className="text-base md:text-lg font-light">
                    Louis apporte un regard moderne sur la viticulture tout en respectant les traditions familiales. Il
                    participe activement à la transformation de l'espace de production en espace d'accueil agréable et au
                    développement de l'œnotourisme.
                  </p>
                </div>

                <div className="pt-4">
                  <a 
                    href="mailto:louis@chateau-lastours.com"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Mail className="w-5 h-5 text-white" />
                    <span className="text-sm tracking-wide font-light text-white">louis@chateau-lastours.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">L'Équipe</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Des professionnels passionnés qui contribuent chaque jour à l'excellence de nos vins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Adrien */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-border/50 hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-[3/4]">
                <TeamImage
                  src="/images/team/adrien.jpeg"
                  alt="Portrait d'Adrien – équipe Château Lastours"
                  fill
                  objectFit="contain"
                  objectPosition="center 30%"
                  containerClassName="absolute inset-0"
                  className="w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-display mb-2">Adrien</h3>
                <p className="text-accent font-semibold mb-3">Membre de l'Équipe</p>
                <p className="text-muted-foreground leading-relaxed">
                  Passionné par la viticulture et le savoir-faire traditionnel, Adrien contribue à l'excellence de nos vins au quotidien.
                </p>
              </div>
            </div>

            {/* Caroline */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-border/50 hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-[3/4]">
                <TeamImage
                  src="/images/team/caroline.jpeg"
                  alt="Portrait de Caroline – équipe Château Lastours"
                  fill
                  objectFit="contain"
                  objectPosition="center 30%"
                  containerClassName="absolute inset-0"
                  className="w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-display mb-2">Caroline</h3>
                <p className="text-accent font-semibold mb-3">Membre de l'Équipe</p>
                <p className="text-muted-foreground leading-relaxed">
                  Caroline apporte son expertise et sa passion pour offrir la meilleure expérience à nos visiteurs et clients.
                </p>
              </div>
            </div>

            {/* Eva */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-border/50 hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-[3/4]">
                <TeamImage
                  src="/images/team/eva.jpeg"
                  alt="Portrait d'Eva – équipe Château Lastours"
                  fill
                  objectFit="contain"
                  objectPosition="center 30%"
                  containerClassName="absolute inset-0"
                  className="w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-display mb-2">Eva</h3>
                <p className="text-accent font-semibold mb-3">Membre de l'Équipe</p>
                <p className="text-muted-foreground leading-relaxed">
                  Eva met son savoir-faire et son enthousiasme au service de la qualité et de l'innovation viticole.
                </p>
              </div>
            </div>

            {/* François */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-border/50 hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-[3/4]">
                <TeamImage
                  src="/images/team/francois.jpeg"
                  alt="Portrait de François – équipe Château Lastours"
                  fill
                  objectFit="contain"
                  objectPosition="center 30%"
                  containerClassName="absolute inset-0"
                  className="w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-display mb-2">François</h3>
                <p className="text-accent font-semibold mb-3">Membre de l'Équipe</p>
                <p className="text-muted-foreground leading-relaxed">
                  Avec son expérience et sa passion, François participe activement à l'élaboration de nos cuvées d'exception.
                </p>
              </div>
            </div>

            {/* Nicolas */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-border/50 hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-[3/4]">
                <TeamImage
                  src="/images/team/nicolas.jpeg"
                  alt="Portrait de Nicolas – équipe Château Lastours"
                  fill
                  objectFit="contain"
                  objectPosition="center 30%"
                  containerClassName="absolute inset-0"
                  className="w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-display mb-2">Nicolas</h3>
                <p className="text-accent font-semibold mb-3">Membre de l'Équipe</p>
                <p className="text-muted-foreground leading-relaxed">
                  Nicolas apporte son expertise technique et son dévouement pour garantir l'excellence de chaque étape de production.
                </p>
              </div>
            </div>

            {/* Pauline */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-border/50 hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-[3/4]">
                <TeamImage
                  src="/images/team/pauline.jpeg"
                  alt="Portrait de Pauline – équipe Château Lastours"
                  fill
                  objectFit="contain"
                  objectPosition="center 30%"
                  containerClassName="absolute inset-0"
                  className="w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-display mb-2">Pauline</h3>
                <p className="text-accent font-semibold mb-3">Membre de l'Équipe</p>
                <p className="text-muted-foreground leading-relaxed">
                  Pauline contribue avec passion et professionnalisme à la renommée et au développement du domaine.
                </p>
              </div>
            </div>

            {/* Stéphane */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-border/50 hover:shadow-lg transition-shadow duration-300 md:col-span-2 lg:col-span-1">
              <div className="relative aspect-[3/4]">
                <TeamImage
                  src="/images/team/stephane.jpeg"
                  alt="Portrait de Stéphane – équipe Château Lastours"
                  fill
                  objectFit="contain"
                  objectPosition="center 30%"
                  containerClassName="absolute inset-0"
                  className="w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-display mb-2">Stéphane</h3>
                <p className="text-accent font-semibold mb-3">Membre de l'Équipe</p>
                <p className="text-muted-foreground leading-relaxed">
                  Stéphane met son savoir-faire et son expertise au service de la tradition et de l'innovation viticole.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-6">Notre Philosophie</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              L'accueil simple et chaleureux du Château Lastours, marqué par la convivialité
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-display text-center italic text-balance mb-8">
              "Notre accueil simple et chaleureux est avant tout marqué par la convivialité et la volonté de concilier
              modernité et tradition dans ce lieu riche d'histoire."
            </blockquote>
            <cite className="block text-center text-lg text-muted-foreground">— Famille de Faramond</cite>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-display mb-6">Rencontrez Notre Équipe</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Venez découvrir notre passion et notre savoir-faire lors d'une visite personnalisée du domaine
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/reservation">
                  Réserver une Visite
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Phone className="mr-2 w-5 h-5" />
                +33 4 67 89 12 34
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
