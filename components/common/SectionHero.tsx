"use client"

import Image from "next/image"
import { LazyImage } from "./LazyImage"
import { cn } from "@/lib/utils"

interface SectionHeroProps {
  title: string
  subtitle?: string
  imageSrc?: string
  overlay?: boolean
  height?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  children?: React.ReactNode
}

const heightClasses = {
  sm: 'h-64 md:h-80',
  md: 'h-80 md:h-96',
  lg: 'h-96 md:h-[500px]',
  xl: 'h-[500px] md:h-[600px]'
}

export function SectionHero({
  title,
  subtitle,
  imageSrc,
  overlay = true,
  height = 'lg',
  className,
  children
}: SectionHeroProps) {
  const fallbackImage = "/images/production/capture-ameyric-prod.jpg"
  
  return (
    <section className={cn(
      "relative overflow-hidden",
      heightClasses[height],
      className
    )}>
      {/* Image de fond */}
      <div className="absolute inset-0">
        <LazyImage
          src={imageSrc || fallbackImage}
          alt={title}
          width={1920}
          height={1080}
          priority
          className="w-full h-full object-cover"
        />
      </div>

      {/* Grain effect */}
      <div className="absolute inset-0 grain-heavy" />

      {/* Overlay sombre pour la lisibilité */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      )}

      {/* Contenu */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white tracking-wider leading-tight">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-light leading-relaxed max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}

            {/* Ligne décorative */}
            <div className="flex items-center justify-center space-x-4 pt-6">
              <div className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent w-24"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent w-24"></div>
            </div>

            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
