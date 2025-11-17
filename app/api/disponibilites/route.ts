import { NextRequest, NextResponse } from "next/server"

/**
 * API Route pour vérifier la disponibilité d'une date
 * GET /api/disponibilites?date=2025-11-20
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")

    if (!date) {
      return NextResponse.json(
        { error: "Paramètre 'date' requis" },
        { status: 400 }
      )
    }

    // Validation du format de date
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json(
        { error: "Format de date invalide" },
        { status: 400 }
      )
    }

    // Vérifier que la date n'est pas dans le passé
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (dateObj < today) {
      return NextResponse.json({
        disponible: false,
        message: "La date sélectionnée est dans le passé"
      })
    }

    // TODO: Vérifier dans une base de données les réservations existantes
    // Pour l'instant, on retourne toujours disponible (sauf dates passées)
    // Exemple de logique future :
    // const reservations = await getReservationsForDate(date)
    // const disponible = reservations.length < MAX_RESERVATIONS_PER_DAY

    return NextResponse.json({
      disponible: true,
      message: "Date disponible"
    })
  } catch (error) {
    console.error("[API DISPONIBILITES] Erreur:", error)
    return NextResponse.json(
      { error: "Erreur lors de la vérification de disponibilité" },
      { status: 500 }
    )
  }
}

