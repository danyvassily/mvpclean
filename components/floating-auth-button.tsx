"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Camera, CheckCircle, AlertCircle, Scan } from "lucide-react"

export function FloatingAuthButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [bottleCode, setBottleCode] = useState("")
  const [authResult, setAuthResult] = useState<{
    status: "success" | "error" | "warning" | null
    wine?: {
      name: string
      vintage: number
      collection: string
      authenticity: string
      details: string
    }
    message?: string
  }>({ status: null })

  const authenticateBottle = () => {
    // Simulation de l'authentification
    if (bottleCode.length < 6) {
      setAuthResult({
        status: "error",
        message: "Code invalide. Veuillez vérifier le code sur votre bouteille.",
      })
      return
    }

    // Simulation de différents résultats selon le code
    const mockResults = [
      {
        status: "success" as const,
        wine: {
          name: "Cuvée Prestige 2019",
          vintage: 2019,
          collection: "Méthode",
          authenticity: "Authentique",
          details: "Bouteille n°1247/3000 - Mise en bouteille le 15/03/2022",
        },
      },
      {
        status: "warning" as const,
        wine: {
          name: "Rouge Tradition 2020",
          vintage: 2020,
          collection: "Classique",
          authenticity: "Vérification requise",
          details: "Cette bouteille nécessite une vérification supplémentaire. Contactez-nous.",
        },
      },
      {
        status: "success" as const,
        wine: {
          name: "Petrichor Rosé 2023",
          vintage: 2023,
          collection: "Confidentielle",
          authenticity: "Authentique",
          details: "Bouteille n°892/5000 - Cuvée limitée certifiée",
        },
      },
    ]

    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
    setAuthResult(randomResult)
  }

  const resetAuth = () => {
    setBottleCode("")
    setAuthResult({ status: null })
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 bg-accent hover:bg-accent/90"
            onClick={() => setIsOpen(true)}
          >
            <Shield className="w-6 h-6" />
            <span className="sr-only">Authentifier vos bouteilles</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Authentification des Bouteilles
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {!authResult.status ? (
              <>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Vérifiez l'authenticité de vos bouteilles Château Lastours en saisissant le code unique présent sur
                    l'étiquette.
                  </p>

                  <div className="space-y-2">
                    <Label htmlFor="bottle-code">Code d'authentification</Label>
                    <div className="flex gap-2">
                      <Input
                        id="bottle-code"
                        placeholder="Ex: CL2023-1247"
                        value={bottleCode}
                        onChange={(e) => setBottleCode(e.target.value.toUpperCase())}
                        className="font-mono"
                      />
                      <Button variant="outline" size="icon">
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Le code se trouve sous l'étiquette principale ou sur le bouchon
                    </p>
                  </div>

                  <Button onClick={authenticateBottle} className="w-full" disabled={!bottleCode}>
                    <Scan className="w-4 h-4 mr-2" />
                    Vérifier l'Authenticité
                  </Button>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Où trouver le code ?</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Sous l'étiquette principale (code QR ou alphanumérique)</li>
                    <li>• Sur le bouchon (gravé ou imprimé)</li>
                    <li>• Sur la contre-étiquette (pour les cuvées spéciales)</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <Card
                  className={`border-2 ${
                    authResult.status === "success"
                      ? "border-green-200 bg-green-50"
                      : authResult.status === "warning"
                        ? "border-yellow-200 bg-yellow-50"
                        : "border-red-200 bg-red-50"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {authResult.status === "success" && (
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      )}
                      {authResult.status === "warning" && (
                        <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                      )}
                      {authResult.status === "error" && (
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                      )}

                      <div className="flex-1">
                        {authResult.wine ? (
                          <div className="space-y-3">
                            <div>
                              <h3 className="font-medium text-lg">{authResult.wine.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary">{authResult.wine.collection}</Badge>
                                <Badge variant={authResult.status === "success" ? "default" : "destructive"}>
                                  {authResult.wine.authenticity}
                                </Badge>
                              </div>
                            </div>

                            <div className="text-sm space-y-1">
                              <p>
                                <strong>Millésime :</strong> {authResult.wine.vintage}
                              </p>
                              <p>
                                <strong>Détails :</strong> {authResult.wine.details}
                              </p>
                            </div>

                            {authResult.status === "success" && (
                              <div className="text-sm text-green-700 bg-green-100 p-2 rounded">
                                ✓ Cette bouteille est authentique et provient bien du Château Lastours.
                              </div>
                            )}

                            {authResult.status === "warning" && (
                              <div className="text-sm text-yellow-700 bg-yellow-100 p-2 rounded">
                                ⚠ Vérification supplémentaire requise. Contactez-nous au 05 63 56 32 75.
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm">{authResult.message}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={resetAuth} className="flex-1 bg-transparent">
                    Vérifier une autre bouteille
                  </Button>
                  <Button onClick={() => setIsOpen(false)} className="flex-1">
                    Fermer
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
