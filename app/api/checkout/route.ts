import { NextRequest, NextResponse } from "next/server"

/**
 * API Route pour initialiser le paiement (stub)
 * POST /api/checkout
 * 
 * TODO: Intégrer Stripe Checkout en production
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.devisId) {
      return NextResponse.json(
        { error: "devisId requis" },
        { status: 400 }
      )
    }

    // TODO: Vérifier que le devis existe et est éligible au paiement
    // const devis = await getDevisById(data.devisId)
    // if (!devis || !devis.payementEligible) {
    //   return NextResponse.json(
    //     { error: "Devis non éligible au paiement" },
    //     { status: 400 }
    //   )
    // }

    // TODO: Créer une session Stripe Checkout
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [...],
    //   mode: 'payment',
    //   success_url: `${process.env.NEXT_PUBLIC_URL}/evenements/devis/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_URL}/evenements/simuler-votre-devis`,
    // })
    
    // Pour l'instant, on génère une URL stub
    const checkoutUrl = `/evenements/devis/paiement-stub?devisId=${data.devisId}`

    // Log pour audit
    console.log(`[CHECKOUT] ${data.devisId} - Init paiement`)

    return NextResponse.json({
      checkoutUrl
    }, { status: 200 })
  } catch (error) {
    console.error("[API CHECKOUT] Erreur:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'initialisation du paiement" },
      { status: 500 }
    )
  }
}

