"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HeroEvent } from "@/components/events/HeroEvent"
import { SummaryBlock } from "@/components/events/SummaryBlock"
import { InlineNotice } from "@/components/events/InlineNotice"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Mail, Phone, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const TOTAL_STEPS = 5

interface Espace {
  id: string
  titre: string
  description: string
  image: string
  capaciteMax?: number
  tarifBaseHT: number
  tarifParPersonneHT?: number
  surface_m2?: number
  actif: boolean
}

interface Option {
  id: string
  titre: string
  description: string
  type: "forfait" | "par_personne" | "par_unite"
  prixHT: number
  unite?: string
  actif: boolean
}

interface DevisResponse {
  lignes: Array<{
    label: string
    qte: number
    puHT: number
    totalHT: number
  }>
  sousTotalHT: number
  tva: {
    taux: number
    montant: number
  }
  totalTTC: number
  devisId: string
  payementEligible: boolean
}

export default function SimulerVotreDevisPage() {
  const [currentStep, setCurrentStep] = useState(1)
  
  // Étape 1: Informations
  const [dateEvenement, setDateEvenement] = useState("")
  const [invites, setInvites] = useState("")
  const [typeEvenement, setTypeEvenement] = useState("")
  const [disponible, setDisponible] = useState<boolean | null>(null)
  const [checkingDisponibilite, setCheckingDisponibilite] = useState(false)
  
  // Étape 2: Espaces
  const [espaces, setEspaces] = useState<Espace[]>([])
  const [espacesSelectionnes, setEspacesSelectionnes] = useState<string[]>([])
  const [loadingEspaces, setLoadingEspaces] = useState(true)
  
  // Étape 3: Options
  const [options, setOptions] = useState<Option[]>([])
  const [optionsSelectionnees, setOptionsSelectionnees] = useState<Record<string, number>>({})
  const [loadingOptions, setLoadingOptions] = useState(true)
  
  // Étape 4: Coordonnées
  const [nom, setNom] = useState("")
  const [email, setEmail] = useState("")
  const [telephone, setTelephone] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // Étape 5: Devis
  const [devis, setDevis] = useState<DevisResponse | null>(null)
  const [calculating, setCalculating] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  // Charger les espaces
  useEffect(() => {
    const fetchEspaces = async () => {
      try {
        const res = await fetch("/api/espaces")
        if (res.ok) {
          const data = await res.json()
          setEspaces(data)
        }
      } catch (error) {
        console.error("Erreur chargement espaces:", error)
      } finally {
        setLoadingEspaces(false)
      }
    }
    fetchEspaces()
  }, [])

  // Charger les options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch("/api/options")
        if (res.ok) {
          const data = await res.json()
          setOptions(data)
        }
      } catch (error) {
        console.error("Erreur chargement options:", error)
      } finally {
        setLoadingOptions(false)
      }
    }
    fetchOptions()
  }, [])

  // Vérifier disponibilité quand la date change
  useEffect(() => {
    if (dateEvenement && currentStep === 1) {
      const checkDisponibilite = async () => {
        setCheckingDisponibilite(true)
        try {
          const res = await fetch(`/api/disponibilites?date=${dateEvenement}`)
          if (res.ok) {
            const data = await res.json()
            setDisponible(data.disponible)
          }
        } catch (error) {
          console.error("Erreur vérification disponibilité:", error)
        } finally {
          setCheckingDisponibilite(false)
        }
      }
      
      const timeoutId = setTimeout(checkDisponibilite, 500)
      return () => clearTimeout(timeoutId)
    }
  }, [dateEvenement, currentStep])

  // Calculer le devis avec debounce
  const calculateDevis = useCallback(async () => {
    if (!dateEvenement || !invites || espacesSelectionnes.length === 0) {
      return
    }

    setCalculating(true)
    try {
      const optionsArray = Object.entries(optionsSelectionnees)
        .filter(([_, qte]) => qte > 0)
        .map(([id, qte]) => ({ id, quantite: qte }))

      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dateEvenement,
          invites: parseInt(invites, 10),
          espaces: espacesSelectionnes,
          options: optionsArray
        })
      })

      if (res.ok) {
        const data = await res.json()
        setDevis(data)
      }
    } catch (error) {
      console.error("Erreur calcul devis:", error)
    } finally {
      setCalculating(false)
    }
  }, [dateEvenement, invites, espacesSelectionnes, optionsSelectionnees])

  // Debounce pour le calcul du devis
  useEffect(() => {
    if (currentStep >= 3) {
      const timeoutId = setTimeout(calculateDevis, 300)
      return () => clearTimeout(timeoutId)
    }
  }, [currentStep, calculateDevis])

  // Validation étape 1
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    if (!dateEvenement) newErrors.dateEvenement = "La date est requise"
    if (!invites || parseInt(invites, 10) < 1) {
      newErrors.invites = "Le nombre d'invités doit être au moins 1"
    }
    if (disponible === false) {
      newErrors.dateEvenement = "Cette date n'est pas disponible"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Validation étape 2
  const validateStep2 = () => {
    if (espacesSelectionnes.length === 0) {
      setErrors({ espaces: "Sélectionnez au moins un espace" })
      return false
    }
    
    // Vérifier capacité totale
    const capaciteTotale = espacesSelectionnes.reduce((sum, id) => {
      const espace = espaces.find(e => e.id === id)
      return sum + (espace?.capaciteMax || 0)
    }, 0)
    
    const nbInvites = parseInt(invites, 10)
    if (capaciteTotale < nbInvites) {
      setErrors({ 
        espaces: `La capacité totale (${capaciteTotale}) est inférieure au nombre d'invités (${nbInvites})` 
      })
      return false
    }
    
    setErrors({})
    return true
  }

  // Validation étape 4
  const validateStep4 = () => {
    const newErrors: Record<string, string> = {}
    if (!nom.trim()) newErrors.nom = "Le nom est requis"
    if (!email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format d'email invalide"
    }
    if (!telephone.trim()) {
      newErrors.telephone = "Le téléphone est requis"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return
    if (currentStep === 2 && !validateStep2()) return
    if (currentStep === 4 && !validateStep4()) return
    
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
      setErrors({})
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  const handleEspaceToggle = (id: string) => {
    setEspacesSelectionnes(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    )
  }

  const handleOptionToggle = (id: string, type: string, invitesCount: number) => {
    setOptionsSelectionnees(prev => {
      const current = prev[id] || 0
      if (current > 0) {
        const { [id]: _, ...rest } = prev
        return rest
      } else {
        let quantite = 1
        if (type === "par_personne") {
          quantite = invitesCount
        }
        return { ...prev, [id]: quantite }
      }
    })
  }

  const handleOptionQuantiteChange = (id: string, quantite: number) => {
    if (quantite <= 0) {
      const { [id]: _, ...rest } = optionsSelectionnees
      setOptionsSelectionnees(rest)
    } else {
      setOptionsSelectionnees(prev => ({ ...prev, [id]: quantite }))
    }
  }

  const handleSubmit = async () => {
    if (!validateStep4() || !devis) return

    setSubmitLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ devisId: devis.devisId })
      })

      if (res.ok) {
        const data = await res.json()
        window.location.href = data.checkoutUrl
      } else {
        setErrors({ submit: "Erreur lors de l'initialisation du paiement" })
      }
    } catch (error) {
      console.error("Erreur soumission:", error)
      setErrors({ submit: "Erreur lors de la soumission" })
    } finally {
      setSubmitLoading(false)
    }
  }

  // Barre de progression
  const steps = [
    "Informations",
    "Espaces",
    "Options",
    "Coordonnées",
    "Validation"
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroEvent
        imageSrc="/page/organiser-votre-evenement-ok/concert-sous-tente-nomade-safari-gaillac-france-chateau-lastours.png"
        title="Simuler votre devis"
        primaryCtaLabel=""
        primaryCtaHref=""
      />

      {/* Barre de progression */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const stepNum = index + 1
                const isActive = stepNum === currentStep
                const isCompleted = stepNum < currentStep
                
                return (
                  <div key={stepNum} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                          isActive && "bg-accent text-accent-foreground",
                          isCompleted && "bg-accent/80 text-accent-foreground",
                          !isActive && !isCompleted && "bg-muted text-muted-foreground"
                        )}
                        aria-current={isActive ? "step" : undefined}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : stepNum}
                      </div>
                      <span className={cn(
                        "mt-2 text-xs text-center hidden sm:block",
                        isActive && "font-medium text-foreground",
                        !isActive && "text-muted-foreground"
                      )}>
                        {step}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={cn(
                        "h-px flex-1 mx-2",
                        isCompleted ? "bg-accent" : "bg-muted"
                      )} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Colonne principale */}
            <div className="lg:col-span-2">
              {/* Étape 1: Informations */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-display mb-2">Informations de votre événement</h2>
                    <p className="text-muted-foreground">Renseignez les informations de base pour commencer</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="dateEvenement" className="block text-sm font-medium mb-2">
                        Date de l'événement *
                      </label>
                      <Input
                        id="dateEvenement"
                        type="date"
                        value={dateEvenement}
                        onChange={(e) => setDateEvenement(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className={cn(errors.dateEvenement && "border-destructive")}
                        aria-invalid={!!errors.dateEvenement}
                        aria-describedby={errors.dateEvenement ? "date-error" : undefined}
                      />
                      {errors.dateEvenement && (
                        <p id="date-error" className="mt-1 text-sm text-destructive" role="alert">
                          {errors.dateEvenement}
                        </p>
                      )}
                      {checkingDisponibilite && (
                        <p className="mt-1 text-sm text-muted-foreground">Vérification de la disponibilité...</p>
                      )}
                      {disponible === true && !checkingDisponibilite && (
                        <p className="mt-1 text-sm text-green-600">✓ Date disponible</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="invites" className="block text-sm font-medium mb-2">
                        Nombre d'invités *
                      </label>
                      <Input
                        id="invites"
                        type="number"
                        value={invites}
                        onChange={(e) => setInvites(e.target.value)}
                        min="1"
                        max="1000"
                        className={cn(errors.invites && "border-destructive")}
                        aria-invalid={!!errors.invites}
                        aria-describedby={errors.invites ? "invites-error" : undefined}
                      />
                      {errors.invites && (
                        <p id="invites-error" className="mt-1 text-sm text-destructive" role="alert">
                          {errors.invites}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="typeEvenement" className="block text-sm font-medium mb-2">
                        Type d'événement
                      </label>
                      <Input
                        id="typeEvenement"
                        type="text"
                        value={typeEvenement}
                        onChange={(e) => setTypeEvenement(e.target.value)}
                        placeholder="Ex: Mariage, Séminaire, Anniversaire..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={handleNext}
                      disabled={!dateEvenement || !invites || disponible === false}
                      className="min-h-[44px] focus:ring-2 focus:ring-accent"
                    >
                      Suivant
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Étape 2: Espaces */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-display mb-2">Sélectionnez vos espaces</h2>
                    <p className="text-muted-foreground">Choisissez un ou plusieurs espaces pour votre événement</p>
                  </div>

                  {loadingEspaces ? (
                    <p className="text-muted-foreground">Chargement des espaces...</p>
                  ) : (
                    <div className="space-y-4">
                      {espaces.map((espace) => (
                        <div
                          key={espace.id}
                          className={cn(
                            "p-6 border-b cursor-pointer transition-all",
                            espacesSelectionnes.includes(espace.id) && "border-accent/30 bg-muted/30",
                            "hover:border-accent/30 hover:bg-muted/30"
                          )}
                          onClick={() => handleEspaceToggle(espace.id)}
                        >
                          <div className="flex items-start gap-4">
                            <input
                              type="checkbox"
                              checked={espacesSelectionnes.includes(espace.id)}
                              onChange={() => handleEspaceToggle(espace.id)}
                              className="mt-1 w-5 h-5 min-h-[44px] min-w-[44px]"
                              aria-label={`Sélectionner ${espace.titre}`}
                            />
                            <div className="flex-1">
                              <h3 className="text-lg font-display mb-1">{espace.titre}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{espace.description}</p>
                              <div className="flex gap-4 text-sm text-muted-foreground">
                                {espace.capaciteMax && (
                                  <span>Capacité : {espace.capaciteMax} personnes</span>
                                )}
                                {espace.surface_m2 && (
                                  <span>Surface : {espace.surface_m2}m²</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {errors.espaces && (
                    <InlineNotice variant="warning" message={errors.espaces} />
                  )}

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      className="min-h-[44px] focus:ring-2 focus:ring-accent"
                    >
                      <ChevronLeft className="mr-2 w-4 h-4" />
                      Précédent
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={espacesSelectionnes.length === 0}
                      className="min-h-[44px] focus:ring-2 focus:ring-accent"
                    >
                      Suivant
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Étape 3: Options */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-display mb-2">Options supplémentaires</h2>
                    <p className="text-muted-foreground">Ajoutez des services pour compléter votre événement</p>
                  </div>

                  {loadingOptions ? (
                    <p className="text-muted-foreground">Chargement des options...</p>
                  ) : (
                    <div className="space-y-4">
                      {options.map((option) => {
                        const isSelected = optionsSelectionnees[option.id] > 0
                        const quantite = optionsSelectionnees[option.id] || 0
                        const invitesCount = parseInt(invites, 10) || 0

                        return (
                          <div
                            key={option.id}
                            className={cn(
                              "p-6 border-b transition-all",
                              isSelected && "border-accent/30 bg-muted/30"
                            )}
                          >
                            <div className="flex items-start gap-4">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleOptionToggle(option.id, option.type, invitesCount)}
                                className="mt-1 w-5 h-5 min-h-[44px] min-w-[44px]"
                                aria-label={`Sélectionner ${option.titre}`}
                              />
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="text-lg font-display">{option.titre}</h3>
                                    <p className="text-sm text-muted-foreground">{option.description}</p>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-medium">{option.prixHT.toFixed(2)} € HT</div>
                                    {option.type === "par_personne" && (
                                      <div className="text-xs text-muted-foreground">par personne</div>
                                    )}
                                  </div>
                                </div>
                                {isSelected && option.type === "par_unite" && (
                                  <div className="mt-3">
                                    <label className="block text-sm font-medium mb-1">Quantité</label>
                                    <Input
                                      type="number"
                                      min="1"
                                      value={quantite}
                                      onChange={(e) => handleOptionQuantiteChange(option.id, parseInt(e.target.value, 10) || 0)}
                                      className="w-24"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  <InlineNotice
                    variant="info"
                    message="Une option n'est pas listée ? Contactez-nous pour un devis personnalisé."
                  />

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      className="min-h-[44px] focus:ring-2 focus:ring-accent"
                    >
                      <ChevronLeft className="mr-2 w-4 h-4" />
                      Précédent
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="min-h-[44px] focus:ring-2 focus:ring-accent"
                    >
                      Suivant
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Étape 4: Coordonnées */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-display mb-2">Vos coordonnées</h2>
                    <p className="text-muted-foreground">Nous avons besoin de vos informations pour finaliser le devis</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="nom" className="block text-sm font-medium mb-2">
                        Nom complet *
                      </label>
                      <Input
                        id="nom"
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        className={cn(errors.nom && "border-destructive")}
                        aria-invalid={!!errors.nom}
                        aria-describedby={errors.nom ? "nom-error" : undefined}
                      />
                      {errors.nom && (
                        <p id="nom-error" className="mt-1 text-sm text-destructive" role="alert">
                          {errors.nom}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={cn(errors.email && "border-destructive")}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-sm text-destructive" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="telephone" className="block text-sm font-medium mb-2">
                        Téléphone *
                      </label>
                      <Input
                        id="telephone"
                        type="tel"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        className={cn(errors.telephone && "border-destructive")}
                        aria-invalid={!!errors.telephone}
                        aria-describedby={errors.telephone ? "telephone-error" : undefined}
                      />
                      {errors.telephone && (
                        <p id="telephone-error" className="mt-1 text-sm text-destructive" role="alert">
                          {errors.telephone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      className="min-h-[44px] focus:ring-2 focus:ring-accent"
                    >
                      <ChevronLeft className="mr-2 w-4 h-4" />
                      Précédent
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="min-h-[44px] focus:ring-2 focus:ring-accent"
                    >
                      Valider mon devis
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Étape 5: Validation */}
              {currentStep === 5 && devis && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-display mb-2">Récapitulatif de votre devis</h2>
                    <p className="text-muted-foreground">Vérifiez les détails avant de procéder au paiement</p>
                  </div>

                  {devis.payementEligible ? (
                    <div className="space-y-6">
                      <div className="p-6 bg-muted/30 rounded-lg">
                        <h3 className="text-lg font-display mb-4">Détails de l'événement</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date</span>
                            <span>{new Date(dateEvenement).toLocaleDateString('fr-FR')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Nombre d'invités</span>
                            <span>{invites}</span>
                          </div>
                          {typeEvenement && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Type</span>
                              <span>{typeEvenement}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {errors.submit && (
                        <InlineNotice variant="error" message={errors.submit} />
                      )}

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={handleSubmit}
                          disabled={submitLoading}
                          size="lg"
                          className="min-h-[44px] focus:ring-2 focus:ring-accent"
                        >
                          {submitLoading ? "Traitement..." : "Valider et payer l'acompte"}
                        </Button>
                        <Button
                          variant="outline"
                          asChild
                          className="min-h-[44px] focus:ring-2 focus:ring-accent"
                        >
                          <Link href="tel:+33563570709">
                            <Phone className="mr-2 w-4 h-4" />
                            Nous contacter
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <InlineNotice
                        variant="warning"
                        message="Ce devis nécessite une validation personnalisée. Contactez-nous pour finaliser votre réservation."
                      />
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          variant="outline"
                          asChild
                          className="min-h-[44px] focus:ring-2 focus:ring-accent"
                        >
                          <Link href="tel:+33563570709">
                            <Phone className="mr-2 w-4 h-4" />
                            +33 (0)5 63 57 07 09
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          asChild
                          className="min-h-[44px] focus:ring-2 focus:ring-accent"
                        >
                          <Link href="mailto:contact@chateau-lastours.com">
                            <Mail className="mr-2 w-4 h-4" />
                            contact@chateau-lastours.com
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Colonne résumé (desktop) */}
            <div className="lg:col-span-1">
              <SummaryBlock
                lignes={devis?.lignes || []}
                sousTotalHT={devis?.sousTotalHT || 0}
                tva={devis?.tva}
                totalTTC={devis?.totalTTC || 0}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

