"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface RichSectionProps {
  title: string
  content: string | React.ReactNode
  imageSrc?: string
  imageAlt?: string
  imageFirst?: boolean
  kicker?: string
  className?: string
  variant?: 'default' | 'accent' | 'light' | 'dark'
}

export function RichSection({
  title,
  content,
  imageSrc,
  imageAlt = "",
  imageFirst = false,
  kicker,
  className,
  variant = 'default'
}: RichSectionProps) {
  const bgClasses = {
    default: 'bg-gray-50',
    accent: 'bg-accent-50 text-gray-900',
    light: 'bg-white',
    dark: 'bg-gray-900'
  }

  const textClasses = {
    default: 'text-gray-900',
    accent: 'text-gray-900',
    light: 'text-gray-900',
    dark: 'text-gray-100'
  }

  return (
    <section className={cn(
      "py-16 lg:py-24 relative",
      bgClasses[variant],
      "grain-subtle",
      className
    )}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center",
          imageFirst ? "lg:grid-flow-col-dense" : ""
        )}>
          
          {/* Contenu texte */}
          <div className={cn(
            "space-y-6",
            imageFirst ? "lg:col-start-2" : ""
          )}>
            {kicker && (
              <div className="inline-block">
                <span className="text-sm font-medium tracking-widest uppercase text-accent-500 bg-accent-50 px-3 py-1 rounded-full">
                  {kicker}
                </span>
              </div>
            )}
            
            <h2 className={cn(
              "text-3xl lg:text-4xl xl:text-5xl font-serif font-bold leading-tight tracking-wide",
              textClasses[variant]
            )}>
              {title}
            </h2>
            
            <div className={cn(
              "prose prose-lg max-w-none",
              variant === 'dark' ? "prose-invert" : "",
              "prose-headings:font-serif prose-headings:tracking-wide",
              "prose-p:leading-relaxed prose-p:text-lg"
            )}>
              {typeof content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                content
              )}
            </div>
          </div>

          {/* Image */}
          {imageSrc && (
            <div className={cn(
              "relative",
              imageFirst ? "lg:col-start-1" : ""
            )}>
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={imageSrc}
                  alt={imageAlt || title}
                  fill
                  className="w-full h-full object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 grain-subtle" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
