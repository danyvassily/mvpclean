"use client"

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ScrollAnimationProps {
  children: ReactNode
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'reveal' | 'parallax'
  trigger?: 'top' | 'center' | 'bottom'
  duration?: number
  delay?: number
  ease?: string
  className?: string
  speed?: number // For parallax effect
}

export function ScrollAnimation({
  children,
  animation = 'fadeIn',
  trigger = 'top',
  duration = 0.5,
  delay = 0,
  ease = 'power2.out',
  className = '',
  speed = 0.5
}: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!elementRef.current) return

    // Vérifier les préférences de mouvement réduit
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return // Désactiver les animations si l'utilisateur préfère le mouvement réduit
    }

    const element = elementRef.current

    // Fonction pour obtenir la hauteur du header
    const getHeaderHeight = () => {
      const headerHeight = getComputedStyle(document.documentElement)
        .getPropertyValue('--header-height')
      return headerHeight ? parseInt(headerHeight) : 80
    }

    // Initial state based on animation type
    let fromVars: any = {}
    let toVars: any = {}

    switch (animation) {
      case 'fadeIn':
        fromVars = { opacity: 0, y: 20 }
        toVars = { opacity: 1, y: 0 }
        break
      
      case 'slideUp':
        fromVars = { opacity: 0, y: 40 }
        toVars = { opacity: 1, y: 0 }
        break
      
      case 'slideLeft':
        fromVars = { opacity: 0, x: 40 }
        toVars = { opacity: 1, x: 0 }
        break
      
      case 'slideRight':
        fromVars = { opacity: 0, x: -40 }
        toVars = { opacity: 1, x: 0 }
        break
      
      case 'scale':
        fromVars = { opacity: 0, scale: 0.9 }
        toVars = { opacity: 1, scale: 1 }
        break
      
      case 'reveal':
        fromVars = { opacity: 0, clipPath: 'inset(100% 0 0 0)' }
        toVars = { opacity: 1, clipPath: 'inset(0% 0 0 0)' }
        break

      case 'parallax':
        // Parallax effect - element moves at different speed than scroll
        const headerHeight = getHeaderHeight()
        gsap.to(element, {
          yPercent: -50 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: () => `top+=${headerHeight} bottom`,
            end: 'bottom top',
            scrub: true
          }
        })
        return
    }

    // Set initial state
    gsap.set(element, fromVars)

    // Créer l'animation avec prise en compte du header
    const headerHeight = getHeaderHeight()
    const triggerStart = trigger === 'top' ? '80%' : trigger === 'center' ? '50%' : '20%'
    
    // Create scroll trigger animation with optimized duration
    gsap.to(element, {
      ...toVars,
      duration: prefersReducedMotion ? 0.01 : duration,
      delay: prefersReducedMotion ? 0 : delay,
      ease,
      scrollTrigger: {
        trigger: element,
        start: () => `top+=${headerHeight} ${triggerStart}`,
        toggleActions: 'play none none reverse',
        refreshPriority: -1 // Priorité plus basse pour éviter les conflits
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [animation, trigger, duration, delay, ease, speed])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Composant pour les animations de texte cinématographiques
export function CinematicTextAnimation({ 
  children, 
  className = '',
  staggerDelay = 0.08 
}: { 
  children: ReactNode
  className?: string
  staggerDelay?: number
}) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!textRef.current) return

    // Vérifier les préférences de mouvement réduit
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    const element = textRef.current
    const lines = element.querySelectorAll('.text-line')

    if (lines.length === 0) return

    // Set initial state
    gsap.set(lines, { 
      opacity: 0, 
      y: 30
    })

    // Fonction pour obtenir la hauteur du header
    const getHeaderHeight = () => {
      const headerHeight = getComputedStyle(document.documentElement)
        .getPropertyValue('--header-height')
      return headerHeight ? parseInt(headerHeight) : 80
    }

    // Create staggered animation with optimized timing
    const headerHeight = getHeaderHeight()
    gsap.to(lines, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: staggerDelay,
      scrollTrigger: {
        trigger: element,
        start: () => `top+=${headerHeight} 80%`,
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [staggerDelay])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}

// Composant pour les animations de cartes premium
export function PremiumCardAnimation({ 
  children, 
  className = '',
  index = 0 
}: { 
  children: ReactNode
  className?: string
  index?: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!cardRef.current) return

    // Vérifier les préférences de mouvement réduit
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    const element = cardRef.current

    // Set initial state
    gsap.set(element, { 
      opacity: 0, 
      y: 50,
      scale: 0.97
    })

    // Fonction pour obtenir la hauteur du header
    const getHeaderHeight = () => {
      const headerHeight = getComputedStyle(document.documentElement)
        .getPropertyValue('--header-height')
      return headerHeight ? parseInt(headerHeight) : 80
    }

    // Create optimized animation with shorter duration and reduced stagger
    const headerHeight = getHeaderHeight()
    gsap.to(element, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      delay: index * 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: () => `top+=${headerHeight} 85%`,
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [index])

  return (
    <div ref={cardRef} className={className}>
      {children}
    </div>
  )
}
