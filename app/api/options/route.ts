import { NextRequest, NextResponse } from "next/server"
import { getAllOptions } from "@/lib/evenements-data"

/**
 * API Route pour les options d'événement
 * GET /api/options - Liste toutes les options actives
 */
export async function GET(request: NextRequest) {
  try {
    const options = getAllOptions()
    
    // Transformer les données pour correspondre au format attendu
    const optionsFormatted = options.map(option => ({
      id: option.id,
      titre: option.nom,
      description: option.description || "",
      type: option.typeTarif === "flat" ? "forfait" : option.typeTarif === "per_person" ? "par_personne" : "par_unite",
      prixHT: option.prix,
      unite: option.typeTarif === "per_person" ? "personne" : undefined,
      categorie: option.categorie,
      ordre: option.ordre || 0,
      actif: option.actif
    }))

    return NextResponse.json(optionsFormatted, { status: 200 })
  } catch (error) {
    console.error("[API OPTIONS] Erreur:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des options" },
      { status: 500 }
    )
  }
}

