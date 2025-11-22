"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MoveRight } from "lucide-react"
import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getLatestArticles } from "@/lib/news-data"
import { getUpcomingEvents } from "@/lib/events-data"

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const container = useRef(null)
  const heroImage = useRef(null)
  const latestArticles = getLatestArticles(3)
  const upcomingEvents = getUpcomingEvents()
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .slice(0, 3)

  useGSAP(
    () => {
      // Hero Section Animations
      // Vérifier si on est en mobile pour ajuster l'animation
      const isMobile = window.innerWidth < 768
      
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from(".hero-title", {
        y: isMobile ? 30 : 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
      })
        .from(
          ".hero-button",
          { y: isMobile ? 20 : 50, opacity: 0, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          heroImage.current,
          { scale: 1.3, y: "-10%" },
          {
            scale: 1.1,
            y: "0%",
            duration: 2,
            ease: "power2.inOut",
          },
          "<"
        )

      // Parallax effect for Hero Image
      gsap.to(heroImage.current, {
        y: "15%",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      // Animation élégante pour la section Vins
      const wineTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-wines",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      })

      wineTimeline
        // Image fade in depuis la gauche
        .from(".wine-image", {
          x: -80,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        })
        // Badge apparaît en douceur
        .from(
          ".wine-badge",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        )
        // Titre glisse élégamment
        .from(
          ".wine-title",
          {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.4"
        )
        // Textes apparaissent l'un après l'autre
        .from(
          ".wine-text-1",
          {
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          ".wine-text-2",
          {
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.6"
        )
        // Bouton final
        .from(
          ".wine-button",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )

      // Section Animations on Scroll (pour les autres sections)
      const sections = gsap.utils.toArray("section:not(:first-child):not(.section-wines)")
      sections.forEach((section) => {
        gsap.from(section as gsap.DOMTarget, {
          opacity: 0,
          y: 100,
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
    <div ref={container} className="min-h-screen">
      {/* Hero Section - Style Ruinart avec texte sur image */}
      <section className="relative">
        {/* Image Hero avec texte en overlay */}
        <div className="relative h-[90vh] sm:h-[85vh] lg:h-[90vh] max-h-[900px] overflow-hidden">
          {/* Image de fond */}
          <div
            ref={heroImage}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src="/images/heroes/chateau-lastours-hero.jpg"
              alt="Façade du Château Lastours et jardins à la française"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          
          {/* Overlay gradient pour la lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-[1]" />
          
          {/* Contenu texte sur l'image - Positionnement absolu pour mobile */}
          <div className="absolute inset-0 z-10 flex flex-col justify-start lg:justify-center items-start w-full px-6 lg:px-12 pt-[25vh] sm:pt-[30vh] lg:pt-0">
            <div className="w-full max-w-4xl mx-auto">
              {/* Titre et sous-titre alignés à gauche */}
              <div className="text-left w-full">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light mb-1 sm:mb-2 hero-title tracking-tight !text-white drop-shadow-lg leading-tight">
                  Château Lastours
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-light !text-white/95 mb-8 sm:mb-10 lg:mb-12 hero-title italic drop-shadow-lg leading-tight">
                  Vins d'excellence depuis 1579
                </p>
              </div>
              
              {/* Bouton centré, fond blanc permanent */}
              <div className="hero-button flex justify-center w-full mt-4 sm:mt-6">
                <Button
                  variant="outline"
                  asChild
                  className="group bg-white border-white text-slate-900 hover:bg-white/90 hover:text-slate-900 transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm tracking-[0.2em] uppercase font-light backdrop-blur-sm"
                >
                  <Link href="/savoir-faire" className="text-slate-900">
                    Découvrir notre savoir-faire
                    <MoveRight className="ml-2 sm:ml-3 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. NOS VINS - Style Ruinart avec alternance */}
      <section className="bg-white py-16 lg:py-24 section-wines !mt-0">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Image à gauche */}
            <div className="relative wine-image">
              <div className="relative h-[400px] lg:h-[550px]">
                <Image
                  src="/images/wines/bouteille-de-vin-rouge-tonneau-en-bois.jpg"
                  alt="Gamme de vins Pétrichor du Château Lastours"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                />
              </div>
            </div>

            {/* Texte à droite */}
            <div className="wine-content">
              <div className="inline-block mb-6 wine-badge">
                <span className="text-xs sm:text-sm font-light tracking-[0.3em] uppercase text-slate-600 border border-slate-300 px-4 py-2">
                  Collection
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light leading-tight tracking-tight text-slate-900 mb-8 wine-title">
                Nos Vins
              </h2>
              
              <div className="space-y-6 mb-8">
                <p className="text-base lg:text-lg leading-relaxed font-light text-slate-700 wine-text wine-text-1">
                  De notre gamme <span className="italic font-serif">Pétrichor</span>, 
                  signature de notre savoir-faire, à nos cuvées confidentielles, chaque vin exprime 
                  avec élégance la quintessence de notre terroir.
                </p>
                <p className="text-base lg:text-lg leading-relaxed font-light text-slate-700 wine-text wine-text-2">
                  Rouges puissants et structurés, blancs fins et minéraux, rosés délicats et aromatiques : 
                  notre palette de vins reflète la diversité et la richesse de nos parcelles d'exception.
                </p>
              </div>
              
              <div className="wine-button">
                <Button
                  variant="outline"
                  asChild
                  className="group border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 px-8 py-4 text-sm tracking-[0.2em] uppercase font-light"
                >
                  <Link href="/les-vins">
                    Découvrir nos vins
                    <MoveRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. VISITER LE CHÂTEAU - Style Ruinart */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Image pleine largeur */}
          <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] max-h-[700px] mb-12 lg:mb-16">
            <Image
              src="/images/experiences/jardins-a-la-francaise-buis-chateau-lastours-gaillac-france.jpg"
              alt="Château Lastours côté jardin"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>

          {/* Texte sur fond blanc en dessous */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="text-xs sm:text-sm font-light tracking-[0.3em] uppercase text-slate-600 border border-slate-300 px-4 py-2">
                Découvrir
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light leading-tight tracking-tight text-slate-900 mb-8">
              Visiter le Château
            </h2>
            <div className="space-y-6 text-slate-700 mb-10 max-w-3xl mx-auto">
              <p className="text-base lg:text-lg leading-relaxed font-light">
                Niché au cœur de l'appellation <span className="italic font-serif">Gaillac</span>, 
                le Château Lastours se dévoile dans toute sa splendeur. Architecture historique et jardins 
                à la française composent un écrin de sérénité où le temps semble suspendu.
              </p>
              <p className="text-base lg:text-lg leading-relaxed font-light">
                Venez découvrir nos chais, notre domaine et nos jardins lors d'une visite guidée qui vous 
                plongera au cœur de notre patrimoine viticole et architectural.
              </p>
            </div>
            <div>
              <Button
                variant="outline"
                asChild
                className="group border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 px-8 py-4 text-sm tracking-[0.2em] uppercase font-light"
              >
                <Link href="/evenements/organiser">
                  Réserver une visite
                  <MoveRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. UNE HISTOIRE À PARTAGER - Style Ruinart avec alternance */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Texte à gauche */}
            <div className="order-2 lg:order-1">
              <div className="inline-block mb-6">
                <span className="text-xs sm:text-sm font-light tracking-[0.3em] uppercase text-slate-600 border border-slate-300 px-4 py-2">
                  Patrimoine
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light leading-tight tracking-tight text-slate-900 mb-8">
                Une Histoire à Partager
              </h2>
              <div className="space-y-6 text-slate-700 mb-8">
                <p className="text-base lg:text-lg leading-relaxed font-light">
                  Depuis 1579, chaque pierre raconte une histoire, celle d'un terroir exceptionnel cultivé 
                  avec passion, celle d'un patrimoine vivant où tradition et excellence se rencontrent.
                </p>
                <p className="text-base lg:text-lg leading-relaxed font-light">
                  De la chapelle ancestrale dominant le vignoble aux rangées de vignes méticuleusement 
                  entretenues, chaque parcelle témoigne de notre engagement pour un vin d'exception.
                </p>
              </div>
              <div>
                <Button
                  variant="outline"
                  asChild
                  className="group border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 px-8 py-4 text-sm tracking-[0.2em] uppercase font-light"
                >
                  <Link href="/domaine/histoire">
                    Découvrir notre histoire
                    <MoveRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Image à droite */}
            <div className="relative order-1 lg:order-2">
              <div className="relative h-[400px] lg:h-[550px]">
                <Image
                  src="/images/vineyard/vignes-hiver-chapelle-saint-vincent-d-avens-gaillac-france.jpeg"
                  alt="Chapelle et vignes du Château Lastours"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. L'ÉLÉGANCE D'UN ART DE VIVRE - Style Ruinart */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Image pleine largeur */}
          <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] max-h-[700px] mb-12 lg:mb-16">
            <Image
              src="/images/events/repas-mariage-longue-table-en-bois-chateau-lastours.jpg"
              alt="Mariage au Château Lastours"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>

          {/* Texte sur fond blanc en dessous */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-6">
                <span className="text-xs sm:text-sm font-light tracking-[0.3em] uppercase text-slate-600 border border-slate-300 px-4 py-2">
                  Événements
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light leading-tight tracking-tight text-slate-900 mb-8">
                L'Élégance d'un Art de Vivre
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-10">
              <p className="text-base lg:text-lg leading-relaxed font-light text-slate-700">
                Le Château Lastours ouvre ses portes pour célébrer vos instants précieux. 
                Mariages, réceptions privées, séminaires d'entreprise : notre domaine se transforme 
                en écrin pour vos événements les plus mémorables.
              </p>
              <p className="text-base lg:text-lg leading-relaxed font-light text-slate-700">
                Dans un cadre enchanteur alliant patrimoine historique et nature préservée, 
                notre équipe vous accompagne pour créer une expérience sur mesure, 
                où chaque détail révèle l'art de vivre à la française.
              </p>
            </div>
            <div className="text-center">
              <Button
                variant="outline"
                asChild
                className="group border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 px-8 py-4 text-sm tracking-[0.2em] uppercase font-light"
              >
                <Link href="/evenements/organiser">
                  Organiser votre événement
                  <MoveRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
