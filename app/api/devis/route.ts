import { NextRequest, NextResponse } from "next/server"
import { getAllEspaces, getEspaceById } from "@/lib/evenements-data"
import { getAllOptions, getOptionById } from "@/lib/evenements-data"

const TVA_RATE = 0.20

interface DevisLigne {
  label: string
  qte: number
  puHT: number
  totalHT: number
}

interface DevisResponse {
  lignes: DevisLigne[]
  sousTotalHT: number
  tva: {
    taux: number
    montant: number
  }
  totalTTC: number
  devisId: string
  payementEligible: boolean
}

/**
 * API Route pour calculer un devis
 * POST /api/devis
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validation basique
    if (!data.dateEvenement || !data.invites || !Array.isArray(data.espaces)) {
      return NextResponse.json(
        { error: "Données invalides: dateEvenement, invites et espaces requis" },
        { status: 400 }
      )
    }

    const invites = parseInt(data.invites, 10)
    if (isNaN(invites) || invites < 1) {
      return NextResponse.json(
        { error: "Nombre d'invités invalide" },
        { status: 400 }
      )
    }

    // Récupérer les espaces sélectionnés
    const espacesSelectionnes = data.espaces
      .map((id: string) => {
        const espace = getEspaceById(id)
        if (!espace) return null
        return {
          titre: espace.nom,
          tarifBaseHT: espace.tarifBase || 0,
          tarifParPersonneHT: 0 // Par défaut
        }
      })
      .filter(Boolean)

    if (espacesSelectionnes.length === 0) {
      return NextResponse.json(
        { error: "Au moins un espace doit être sélectionné" },
        { status: 400 }
      )
    }

    // Récupérer les options sélectionnées
    const optionsSelectionnees = (data.options || [])
      .map((opt: { id: string; quantite?: number }) => {
        const option = getOptionById(opt.id)
        if (!option) return null
        
        let quantite = opt.quantite || 1
        if (option.typeTarif === "per_person") {
          quantite = invites
        } else if (option.typeTarif === "flat") {
          quantite = 1
        }

        return {
          option: {
            titre: option.nom,
            prixHT: option.prix,
            type: option.typeTarif === "flat" ? "forfait" : option.typeTarif === "per_person" ? "par_personne" : "par_unite"
          },
          quantite
        }
      })
      .filter(Boolean)

    // Calcul des lignes du devis
    const lignes: DevisLigne[] = []
    
    // 1. Calcul des espaces
    for (const espace of espacesSelectionnes) {
      const totalEspace = espace.tarifBaseHT + (espace.tarifParPersonneHT * invites)
      
      lignes.push({
        label: espace.titre,
        qte: 1,
        puHT: totalEspace,
        totalHT: totalEspace
      })
    }
    
    // 2. Calcul des options
    for (const { option, quantite } of optionsSelectionnees) {
      const totalOption = option.prixHT * quantite
      
      lignes.push({
        label: option.titre,
        qte: quantite,
        puHT: option.prixHT,
        totalHT: totalOption
      })
    }
    
    // Calcul des totaux
    const sousTotalHT = lignes.reduce((sum, ligne) => sum + ligne.totalHT, 0)
    const montantTVA = sousTotalHT * TVA_RATE
    const totalTTC = sousTotalHT + montantTVA

    // Génération d'un ID unique pour le devis
    const devisId = `dv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Le paiement est éligible si le total est > 0
    const payementEligible = totalTTC > 0

    const response: DevisResponse = {
      lignes,
      sousTotalHT,
      tva: {
        taux: TVA_RATE,
        montant: montantTVA
      },
      totalTTC,
      devisId,
      payementEligible
    }

    // Log pour audit
    console.log(`[DEVIS] ${devisId} - Total: ${totalTTC}€`)

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error("[API DEVIS] Erreur:", error)
    return NextResponse.json(
      { error: "Erreur lors du calcul du devis" },
      { status: 500 }
    )
  }
}

