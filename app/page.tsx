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
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
      })
        .from(
          ".hero-button",
          { y: 50, opacity: 0, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          heroImage.current,
          { scale: 1.2, y: "-10%" },
          {
            scale: 1,
            y: "0%",
            duration: 2,
            ease: "power2.inOut",
          },
          "<"
        )

      // Parallax effect for Hero Image
      gsap.to(heroImage.current, {
        y: "20%",
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
      {/* Hero Section - Style Ruinart minimaliste */}
      <section className="relative" style={{ marginTop: '-80px', paddingTop: '80px' }}>
        {/* Image Hero - Full width sans texte */}
        <div className="relative h-[70vh] sm:h-[75vh] lg:h-[85vh] max-h-[800px] overflow-hidden">
          <div
            ref={heroImage}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src="/chateau-lastours-hero.jpg"
              alt="Façade du Château Lastours et jardins à la française"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          {/* Légère ombre en bas pour transition */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/10 to-transparent" />
        </div>

        {/* Titre et sous-titre sur fond blanc en dessous de l'image */}
        <div className="bg-white py-16 lg:py-24">
          <div className="container mx-auto px-6 lg:px-12 text-center max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-4 hero-title tracking-tight text-slate-900">
              Château Lastours
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-slate-600 mb-8 hero-title italic">
              Vins d'excellence depuis 1579
            </p>
            <div className="hero-button">
              <Button
                variant="outline"
                asChild
                className="group border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 px-8 py-4 text-sm tracking-[0.2em] uppercase font-light"
              >
                <Link href="/savoir-faire">
                  Découvrir notre savoir-faire
                  <MoveRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* 1. NOS VINS - Style Ruinart avec alternance */}
      <section className="bg-white py-16 lg:py-24 section-wines">
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
                <Link href="/reservation">
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
