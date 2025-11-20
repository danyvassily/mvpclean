"use client"

import { useEffect, useRef, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

interface ScrollSmootherWrapperProps {
  children: ReactNode
  speed?: number
  lag?: number
  effects?: boolean
}

// Pages avec hero visuel qui doivent être collées au header (sans padding)
const PAGES_WITH_HERO = [
  "/",
  "/les-vins",
  "/evenements",
  "/evenements/organiser",
  "/evenements/simuler-votre-devis",
  "/evenements/reservation",
  "/reservation",
  "/domaine/histoire",
  "/domaine/engagement",
  "/domaine/terroir",
  "/notre-vignoble",
  "/notre-chai",
  "/gastronomie",
  "/degustation",
  "/club",
  "/mecenat",
  "/de-la-vigne-a-la-bouteille",
  "/le-cycle-de-la-vigne",
  "/methode-blanche",
  "/la-vigne",
  "/savoir-faire/vigne",
  "/savoir-faire/chai",
  "/actualites",
  "/presse",
]

export function ScrollSmootherWrapper({ 
  children, 
  speed = 1,
  lag = 0.1,
  effects = true 
}: ScrollSmootherWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const smootherRef = useRef<ScrollSmoother | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    // Vérifie si la page actuelle a un hero visuel
    const hasHeroVisual = PAGES_WITH_HERO.some(
      path => pathname === path || pathname.startsWith(path + "/")
    )

    // Fonction pour mettre à jour le padding-top selon la page
    const updateContentPadding = () => {
      if (contentRef.current) {
        // Toujours appliquer le padding pour compenser le header fixe blanc
        const headerHeight = getComputedStyle(document.documentElement)
          .getPropertyValue('--header-height')
        const height = headerHeight ? parseInt(headerHeight) : 80
        contentRef.current.style.paddingTop = `${height}px`
      }
    }

    // Mise à jour initiale
    updateContentPadding()

    // Mettre à jour au resize
    window.addEventListener('resize', updateContentPadding)
    
    // Vérifier périodiquement (pour les changements dynamiques comme le menu mobile)
    const interval = setInterval(updateContentPadding, 100)

    // Create ScrollSmoother instance with enhanced settings
    smootherRef.current = ScrollSmoother.create({
      wrapper: wrapperRef.current!,
      content: contentRef.current!,
      smooth: speed,
      normalizeScroll: true,
      ignoreMobileResize: true,
      effects: effects,
      smoothTouch: 0.1, // Touch scroll smoothing
      onUpdate: (self) => {
        // Custom parallax effects for data-speed elements
        const elements = document.querySelectorAll('[data-speed]');
        elements.forEach((el: any) => {
          const speed = parseFloat(el.dataset.speed) || 1;
          const y = self.scrollTop() * (1 - speed);
          gsap.set(el, { y });
        });
      },
    })

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh()

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', updateContentPadding)
      // Cleanup
      if (smootherRef.current) {
        smootherRef.current.kill()
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [speed, lag, effects, pathname])

  return (
    <div ref={wrapperRef} id="smooth-wrapper" className="smooth-wrapper">
      <div ref={contentRef} id="smooth-content" className="smooth-content">
        {children}
      </div>
    </div>
  )
}
