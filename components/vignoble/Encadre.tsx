"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/gsap/TransitionLink";

interface EncadreProps {
  title?: string;
  content: string | React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  ctaText?: string;
  ctaHref?: string;
  className?: string;
  noTitle?: boolean; // Pour éviter le titre dans "Héritage millénaire"
}

export function Encadre({
  title,
  content,
  imageSrc,
  imageAlt,
  imagePosition = "left",
  ctaText,
  ctaHref,
  className,
  noTitle = false,
}: EncadreProps) {
  const contentElement = typeof content === "string" ? <p className="text-lg md:text-xl leading-relaxed text-slate-700">{content}</p> : content;

  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className={cn(
          "flex flex-col gap-8 lg:gap-12 items-center",
          imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
        )}>
          {/* Image */}
          {imageSrc && (
            <div className="flex-1 w-full lg:w-1/2">
              <div className="relative aspect-[4/3] lg:aspect-[3/2] rounded-lg overflow-hidden shadow-md">
                <Image
                  src={imageSrc}
                  alt={imageAlt || title || "Image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          )}

          {/* Contenu */}
          <div className={cn(
            "flex-1 w-full lg:w-1/2 space-y-6",
            imageSrc ? "" : "max-w-4xl mx-auto text-center"
          )}>
            {!noTitle && title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 tracking-[0.02em] leading-[1.1]">
                {title}
              </h2>
            )}
            
            <div className="space-y-4">
              {contentElement}
            </div>

            {ctaText && ctaHref && (
              <div className="pt-4">
                <TransitionLink
                  href={ctaHref}
                  className="inline-flex items-center px-8 py-4 bg-slate-100 hover:bg-slate-200 border border-slate-300 hover:border-slate-400 text-slate-900 font-light text-lg tracking-wide transition-all duration-300 rounded-full"
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
