"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"
import { cn } from "@/lib/utils"

interface PressKitPlaceholderProps {
  className?: string
}

/**
 * Composant placeholder pour le Kit Presse
 * Prêt à recevoir un fichier/lien quand disponible dans ASSET
 */
export function PressKitPlaceholder({ className }: PressKitPlaceholderProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-serif font-light flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Kit média
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-slate-600 font-light leading-relaxed">
          Présentation du domaine, historique, fiches techniques et visuels clefs.
        </p>
        <Button variant="outline" disabled className="min-h-[44px]">
          <Download className="mr-2 w-4 h-4" />
          Kit média (à venir)
        </Button>
      </CardContent>
    </Card>
  )
}

