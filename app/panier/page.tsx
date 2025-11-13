"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, X, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AuthDialog } from "@/components/auth-dialog"

export default function CartPage() {
  const { state: cartState, updateQuantity, removeItem, clearCart } = useCart()
  const { state: authState } = useAuth()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)

  const handleCheckout = () => {
    if (!authState.isAuthenticated) {
      setAuthDialogOpen(true)
      return
    }
    // Proceed to checkout
    // console.log("Proceeding to checkout...") // Disabled in production
  }

  if (cartState.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground" />
            <h1 className="font-serif text-3xl">Votre panier est vide</h1>
            <p className="text-muted-foreground">
              Découvrez notre sélection de vins d'exception et ajoutez vos favoris à votre panier.
            </p>
          </div>

          <div className="space-y-4">
            <Button asChild size="lg" className="bg-wine-gold hover:bg-wine-gold/90">
              <Link href="/les-vins">Découvrir nos vins</Link>
            </Button>
            <div className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="font-serif text-4xl mb-2">Votre Panier</h1>
          <p className="text-muted-foreground">
            {cartState.itemCount} article{cartState.itemCount !== 1 ? "s" : ""} dans votre panier
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartState.items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative h-32 w-24 flex-shrink-0">
                      <Image
                        src={item.image || "/images/wines/wine-bottle-default.png"}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif text-xl">{item.name}</h3>
                          <p className="text-muted-foreground">Millésime {item.vintage}</p>
                          <Badge variant="secondary" className="mt-1">
                            {item.collection}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-serif text-lg">{(item.price * item.quantity).toFixed(2)} €</p>
                          <p className="text-sm text-muted-foreground">{item.price.toFixed(2)} € l'unité</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={clearCart}>
                Vider le panier
              </Button>
              <Button variant="outline" asChild>
                <Link href="/les-vins">Continuer mes achats</Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-serif">Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{cartState.total.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span>Gratuite</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-serif text-lg">
                    <span>Total</span>
                    <span>{cartState.total.toFixed(2)} €</span>
                  </div>
                </div>

                <Button className="w-full bg-wine-gold hover:bg-wine-gold/90" size="lg" onClick={handleCheckout}>
                  {authState.isAuthenticated ? "Finaliser la commande" : "Se connecter et commander"}
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  Livraison gratuite en France métropolitaine
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </div>
  )
}
