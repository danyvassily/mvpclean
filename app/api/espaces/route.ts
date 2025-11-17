import { NextRequest, NextResponse } from "next/server"
import { getAllEspaces } from "@/lib/evenements-data"

/**
 * API Route pour les espaces d'événement
 * GET /api/espaces - Liste tous les espaces actifs
 */
export async function GET(request: NextRequest) {
  try {
    const espaces = getAllEspaces()
    
    // Transformer les données pour correspondre au format attendu
    const espacesFormatted = espaces.map(espace => ({
      id: espace.id,
      titre: espace.nom,
      description: espace.description || "",
      image: espace.image || "",
      capaciteMax: espace.capaciteMax,
      tarifBaseHT: espace.tarifBase || 0,
      tarifParPersonneHT: 0, // Par défaut, pas de tarif par personne
      surface_m2: espace.surface_m2,
      ordre: espace.ordre || 0,
      actif: espace.actif
    }))

    return NextResponse.json(espacesFormatted, { status: 200 })
  } catch (error) {
    console.error("[API ESPACES] Erreur:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des espaces" },
      { status: 500 }
    )
  }
}

