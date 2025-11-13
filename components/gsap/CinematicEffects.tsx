"use client"

import { useEffect, useRef, ReactNode } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
  children?: ReactNode
}

export function ParallaxImage({ 
  src, 
  alt, 
  className = '', 
  speed = 0.5,
  children 
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current || !imageRef.current) return

    const container = containerRef.current
    const image = imageRef.current

    // Parallax effect on image
    gsap.to(image, {
      yPercent: -30 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [speed])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill
        className="object-cover scale-110"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
}

// Effet de grain cinématographique animé
export function AnimatedGrain({ 
  intensity = 0.15,
  speed = 1,
  className = ''
}: {
  intensity?: number
  speed?: number
  className?: string
}) {
  const grainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!grainRef.current) return

    const element = grainRef.current

    // Animate grain position for dynamic effect
    gsap.to(element, {
      backgroundPosition: '100px 100px',
      duration: 20 / speed,
      ease: 'none',
      repeat: -1
    })

    return () => {
      gsap.killTweensOf(element)
    }
  }, [speed])

  const grainStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    backgroundSize: '100px 100px',
    opacity: intensity
  }

  return (
    <div
      ref={grainRef}
      className={`fixed inset-0 pointer-events-none z-10 ${className}`}
      style={grainStyle}
    />
  )
}

// Effet de révélation sophistiqué pour les sections
export function SectionReveal({ 
  children,
  className = '',
  direction = 'up',
  splitReveal = false
}: {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  splitReveal?: boolean
}) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!sectionRef.current) return

    const element = sectionRef.current

    if (splitReveal) {
      // Split reveal effect with clipPath
      gsap.set(element, {
        clipPath: direction === 'up' 
          ? 'inset(100% 0 0 0)'
          : direction === 'down'
          ? 'inset(0 0 100% 0)'
          : direction === 'left'
          ? 'inset(0 100% 0 0)'
          : 'inset(0 0 0 100%)'
      })

      gsap.to(element, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
    } else {
      // Standard reveal with transform
      const directionVars = {
        up: { y: 60, opacity: 0 },
        down: { y: -60, opacity: 0 },
        left: { x: 60, opacity: 0 },
        right: { x: -60, opacity: 0 }
      }

      gsap.set(element, directionVars[direction])

      gsap.to(element, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [direction, splitReveal])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}

// Effet de zoom sophistiqué pour les images
export function ZoomReveal({ 
  children,
  className = '',
  scale = 1.2,
  duration = 2
}: {
  children: ReactNode
  className?: string
  scale?: number
  duration?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current) return

    const element = containerRef.current
    const image = element.querySelector('img')

    if (!image) return

    // Set initial state
    gsap.set(image, { scale, filter: 'blur(5px)' })

    gsap.to(image, {
      scale: 1,
      filter: 'blur(0px)',
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
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
  }, [scale, duration])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  )
}
