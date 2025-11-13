"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/gsap/TransitionLink";

interface EncadreHistoireProps {
  title: string;
  content: string | React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

/**
 * Encadré pour la page Histoire
 * - Un seul titre (pas de double titre)
 * - Encadré englobant texte + photo
 * - Layout split image/texte avec alternance
 * - Fond clair (pas de fond gris sombre)
 * - Rythme vertical normalisé
 */
export function EncadreHistoire({
  title,
  content,
  imageSrc,
  imageAlt,
  imagePosition = "left",
  ctaText,
  ctaHref,
  className,
}: EncadreHistoireProps) {
  const contentElement =
    typeof content === "string" ? (
      <p className="text-lg md:text-xl leading-relaxed text-slate-700">
        {content}
      </p>
    ) : (
      content
    );

  return (
    <section
      className={cn(
        "py-12 md:py-16 lg:py-20 bg-white",
        className
      )}
      style={{
        marginBlock: "clamp(16px, 4vw, 48px)",
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div
          className={cn(
            "flex flex-col gap-8 lg:gap-12 items-stretch",
            imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
          )}
        >
          {/* Image - englobée dans l'encadré */}
          <div className="flex-1 w-full lg:w-1/2">
            <div className="relative aspect-[4/3] lg:aspect-[3/2] rounded-lg overflow-hidden shadow-sm">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Contenu texte */}
          <div
            className={cn(
              "flex-1 w-full lg:w-1/2 flex flex-col justify-center",
              "space-y-4 md:space-y-6"
            )}
          >
            {/* Un seul titre */}
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-slate-900 tracking-[0.02em] leading-[1.1]"
              style={{
                fontSize: "clamp(22px, 3.8vw, 32px)",
                textWrap: "balance",
              }}
            >
              {title}
            </h2>

            {/* Corps de texte */}
            <div className="space-y-4 text-slate-700" style={{ overflowWrap: "anywhere" }}>
              {contentElement}
            </div>

            {/* CTA si présent */}
            {ctaText && ctaHref && (
              <div className="pt-4">
                <TransitionLink
                  href={ctaHref}
                  className="inline-flex items-center min-h-[44px] px-8 py-4 bg-slate-100 hover:bg-slate-200 border border-slate-300 hover:border-slate-400 text-slate-900 font-light text-lg tracking-wide transition-all duration-300 rounded-full focus-visible:outline-2 focus-visible:outline-slate-900 focus-visible:outline-offset-2"
                  aria-label={ctaText}
                >
                  {ctaText}
                </TransitionLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

