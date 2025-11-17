"use client"

import { cn } from "@/lib/utils"

interface DevisLigne {
  label: string
  qte: number
  puHT: number
  totalHT: number
}

interface SummaryBlockProps {
  lignes?: DevisLigne[]
  sousTotalHT?: number
  tva?: {
    taux: number
    montant: number
  }
  totalTTC?: number
  className?: string
}

/**
 * Composant SummaryBlock - Résumé du devis collant (desktop)
 * Conforme aux patterns Ruinart : bordure inférieure mobile, bordure gauche desktop
 */
export function SummaryBlock({
  lignes = [],
  sousTotalHT = 0,
  tva,
  totalTTC = 0,
  className
}: SummaryBlockProps) {
  const hasData = lignes.length > 0 || totalTTC > 0

  if (!hasData) {
    return (
      <div
        className={cn(
          "border-b lg:border lg:border-l bg-background p-6",
          "lg:sticky lg:top-24 lg:self-start",
          className
        )}
        aria-live="polite"
        aria-label="Résumé du devis"
      >
        <h3 className="text-lg font-display mb-4">Résumé du devis</h3>
        <p className="text-sm text-muted-foreground">
          Sélectionnez des espaces et options pour voir le résumé
        </p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "border-b lg:border lg:border-l bg-background p-6",
        "lg:sticky lg:top-24 lg:self-start",
        className
      )}
      aria-live="polite"
      aria-label="Résumé du devis"
    >
      <h3 className="text-lg font-display mb-6">Résumé du devis</h3>

      {/* Lignes du devis */}
      <div className="space-y-3 mb-6">
        {lignes.map((ligne, index) => (
          <div key={index} className="flex justify-between text-sm">
            <div className="flex-1">
              <div className="font-medium text-foreground">{ligne.label}</div>
              {ligne.qte > 1 && (
                <div className="text-muted-foreground">
                  {ligne.qte} × {ligne.puHT.toFixed(2)} € HT
                </div>
              )}
            </div>
            <div className="text-right font-medium">
              {ligne.totalHT.toFixed(2)} € HT
            </div>
          </div>
        ))}
      </div>

      {/* Totaux */}
      <div className="space-y-2 pt-4 border-t">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Sous-total HT</span>
          <span className="font-medium">{sousTotalHT.toFixed(2)} €</span>
        </div>
        {tva && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              TVA ({(tva.taux * 100).toFixed(0)}%)
            </span>
            <span className="font-medium">{tva.montant.toFixed(2)} €</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-display pt-2 border-t">
          <span>Total TTC</span>
          <span className="text-accent">{totalTTC.toFixed(2)} €</span>
        </div>
      </div>
    </div>
  )
}

