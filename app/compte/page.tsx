"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Package, Heart, Settings, Award } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function AccountPage() {
  const { state } = useAuth()

  useEffect(() => {
    if (!state.isLoading && !state.isAuthenticated) {
      redirect("/")
    }
  }, [state.isLoading, state.isAuthenticated])

  if (state.isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!state.user) return null

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="font-serif text-4xl">Mon Compte</h1>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xl">
                Bonjour {state.user.firstName} {state.user.lastName}
              </p>
              <p className="text-muted-foreground">{state.user.email}</p>
            </div>
            {state.user.isClubMember && (
              <Badge className="bg-wine-gold text-wine-black">
                <Award className="w-3 h-3 mr-1" />
                Membre Club{" "}
                {state.user.clubTier === "prestige"
                  ? "Prestige"
                  : state.user.clubTier === "collection"
                    ? "Collection"
                    : "Découverte"}
              </Badge>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Gérez vos informations de profil et préférences</p>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/compte/parametres">Modifier</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5" />
                Mes commandes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Suivez vos commandes et consultez l'historique</p>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/compte/commandes">Voir les commandes</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="h-5 w-5" />
                Mes favoris
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Retrouvez vos vins préférés</p>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/compte/favoris">Voir les favoris</Link>
              </Button>
            </CardContent>
          </Card>

          {state.user.isClubMember && (
            <Card className="hover:shadow-lg transition-shadow border-wine-gold">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award className="h-5 w-5 text-wine-gold" />
                  Club Lastours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Profitez de vos avantages exclusifs</p>
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/club">Voir les avantages</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5" />
                Paramètres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Configurez votre compte et notifications</p>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/compte/parametres">Paramètres</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Inscription au Club Lastours</p>
                  <p className="text-sm text-muted-foreground">Il y a 2 semaines</p>
                </div>
                <Badge variant="secondary">Complété</Badge>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Réservation visite du domaine</p>
                  <p className="text-sm text-muted-foreground">Il y a 1 mois</p>
                </div>
                <Badge variant="secondary">Complété</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
