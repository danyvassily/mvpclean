"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoItem {
  src: string
  alt: string
  downloadUrl?: string
  format?: string
}

interface LogoGalleryProps {
  logos?: LogoItem[]
  className?: string
}

/**
 * Composant LogoGallery pour afficher les logos officiels
 * Prêt à recevoir plusieurs logos depuis ASSET
 */
export function LogoGallery({ logos = [], className }: LogoGalleryProps) {
  // Si aucun logo fourni, afficher un placeholder
  const displayLogos = logos.length > 0 
    ? logos 
    : [
        {
          src: "/images/logos/logo-chateau-lastours.jpg",
          alt: "Logo Château Lastours",
          downloadUrl: "/images/logos/logo-chateau-lastours.jpg",
          format: "JPG"
        }
      ]

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-serif font-light">
          Logos officiels
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Grille de logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {displayLogos.map((logo, index) => (
            <div 
              key={index}
              className="relative aspect-square bg-slate-50 rounded-lg overflow-hidden border border-slate-200"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

        {/* Boutons de téléchargement */}
        <div className="flex flex-wrap gap-3">
          {displayLogos.map((logo, index) => (
            logo.downloadUrl && (
              <Button
                key={index}
                asChild
                variant="outline"
                className="min-h-[44px]"
              >
                <Link href={logo.downloadUrl} download>
                  <Download className="mr-2 w-4 h-4" />
                  Télécharger {logo.format ? `(${logo.format})` : ""}
                </Link>
              </Button>
            )
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

