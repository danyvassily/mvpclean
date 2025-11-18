"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroVignobleProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export function HeroVignoble({
  imageSrc,
  title,
  subtitle,
  description,
  className,
}: HeroVignobleProps) {
  return (
    <section className={cn("relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden", className)}>
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay sombre pour garantir la lisibilité du texte blanc */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
      </div>
      
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light tracking-tight text-white drop-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light italic text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
              {subtitle}
            </h2>
          )}
        </div>
        
        {description && (
          <p className="text-lg md:text-xl leading-relaxed text-white/90 max-w-5xl mx-auto drop-shadow-md">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
