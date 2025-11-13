"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface FloatingParticlesProps {
  count?: number
  className?: string
}

export function FloatingParticles({ count = 30, className = '' }: FloatingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particles: HTMLDivElement[] = []

    // Créer les particules
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute rounded-full bg-white/10 backdrop-blur-sm pointer-events-none'
      
      // Tailles variées
      const size = Math.random() * 4 + 1 // 1px à 5px
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      
      // Position initiale aléatoire
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      
      container.appendChild(particle)
      particles.push(particle)
    }

    // Animation des particules plus lente et majestueuse
    particles.forEach((particle, index) => {
      const duration = 25 + Math.random() * 30 // 25-55 secondes
      const delay = Math.random() * 8 // Délai initial
      
      gsap.set(particle, {
        opacity: 0,
        scale: 0
      })

      // Animation d'apparition plus douce
      gsap.to(particle, {
        opacity: Math.random() * 0.6 + 0.2, // 0.2 à 0.8
        scale: 1,
        duration: 3.5,
        delay: delay,
        ease: 'power3.out'
      })

      // Mouvement flottant
      gsap.to(particle, {
        y: `-=${Math.random() * 100 + 50}`, // Monte entre 50px et 150px
        x: `+=${(Math.random() - 0.5) * 100}`, // Dérive latérale
        rotation: Math.random() * 360,
        duration: duration,
        delay: delay,
        ease: 'none',
        repeat: -1,
        yoyo: true
      })

      // Pulsation subtile plus lente
      gsap.to(particle, {
        scale: Math.random() * 0.5 + 0.8, // 0.8 à 1.3
        duration: 5 + Math.random() * 6,
        delay: delay + Math.random() * 3,
        ease: 'power3.inOut',
        repeat: -1,
        yoyo: true
      })

      // Changement d'opacité plus lent
      gsap.to(particle, {
        opacity: Math.random() * 0.3 + 0.1,
        duration: 7 + Math.random() * 8,
        delay: delay + Math.random() * 4,
        ease: 'power3.inOut',
        repeat: -1,
        yoyo: true
      })
    })

    return () => {
      // Cleanup
      particles.forEach(particle => {
        gsap.killTweensOf(particle)
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      })
    }
  }, [count])

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  )
}
