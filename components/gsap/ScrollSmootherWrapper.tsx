"use client"

import { useEffect, useRef, useState, ReactNode } from 'react'
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
  const [mounted, setMounted] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const smootherRef = useRef<ScrollSmoother | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    // Mise à jour du padding-top selon la page
    const updateContentPadding = () => {
      if (contentRef.current) {
        const root = document.documentElement
        const headerHeight = getComputedStyle(root).getPropertyValue('--header-height')
        const height = headerHeight ? parseInt(headerHeight) : 80
        contentRef.current.style.paddingTop = `${height}px`
      }
    }

    updateContentPadding()

    // Create ScrollSmoother instance
    smootherRef.current = ScrollSmoother.create({
      wrapper: wrapperRef.current!,
      content: contentRef.current!,
      smooth: speed,
      normalizeScroll: true,
      ignoreMobileResize: true,
      effects: effects,
      smoothTouch: 0.1,
    })

    // Use ResizeObserver instead of interval/resize event for header height
    const header = document.querySelector('header')
    let resizeObserver: ResizeObserver | null = null

    if (header) {
      resizeObserver = new ResizeObserver(() => {
        updateContentPadding()
        ScrollTrigger.refresh()
      })
      resizeObserver.observe(header)
    }

    ScrollTrigger.refresh()

    return () => {
      if (resizeObserver) resizeObserver.disconnect()
      if (smootherRef.current) smootherRef.current.kill()
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
