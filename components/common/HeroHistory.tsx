"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroHistoryProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * Hero pour la page "Notre Histoire"
 * - Aligné sous le menu sticky (zéro espace)
 * - Image full-bleed avec Next/Image
 * - Backplate clair si nécessaire pour lisibilité
 * - Style similaire à la home page
 */
export function HeroHistory({
  imageSrc,
  title,
  subtitle,
  className,
}: HeroHistoryProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "min-h-[calc(100vh-var(--header-height,80px))]",
        "mt-0", // Zéro espace au-dessus pour alignement sous menu sticky
        className
      )}
    >
      {/* Image de fond full-bleed */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
          quality={90}
        />
      </div>

      {/* Grain texture subtile */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grain"></div>

      {/* Contenu texte - Position BAS comme la home */}
      <div className="relative z-10 h-full flex items-end">
        <div className="w-full px-4 md:px-8 lg:px-16 pb-12 md:pb-16 lg:pb-20">
          <div className="max-w-4xl">
            {/* Backplate clair discret si nécessaire pour lisibilité */}
            <div className="bg-[rgba(255,255,255,0.85)] backdrop-blur-sm rounded-lg p-6 md:p-8 lg:p-10 max-w-4xl">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-light text-slate-900 tracking-[0.02em] leading-[1.05] mb-4 md:mb-6"
                style={{ textWrap: "balance" }}
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  className="text-base lg:text-lg xl:text-xl leading-relaxed text-slate-700 font-light tracking-wide max-w-3xl"
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

