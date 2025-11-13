"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollAnimation } from "@/components/gsap/ScrollAnimations"
import { ArrowLeft, Crown, Wine, Gift, Award, Sparkles } from "lucide-react"
import Link from "next/link"

type FormData = {
  plan: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  birthDate: string;
  preferences: string;
  wineExperience: string;
  favoriteWineTypes: string[];
  newsletter: boolean;
  terms: boolean;
};

export default function InscriptionPage() {
  const searchParams = useSearchParams()
  const initialPlan = searchParams.get("plan") || "prestige"

  const [formData, setFormData] = useState<FormData>({
    plan: "connaisseur", // Tous commencent par le niveau d'entrée
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
    birthDate: "",
    preferences: "",
    wineExperience: "",
    favoriteWineTypes: [],
    newsletter: true,
    terms: false,
  })

  const plans = {
    connaisseur: { 
      name: "Connaisseur Distingué", 
      price: "Gratuit", 
      description: "Niveau d'entrée",
      icon: Wine 
    },
    maitre: { 
      name: "Maître de Chai Émérite", 
      price: "Sur invitation", 
      description: "Niveau intermédiaire",
      icon: Crown 
    },
    ambassadeur: { 
      name: "Ambassadeur", 
      price: "Sur invitation", 
      description: "Niveau avancé",
      icon: Award 
    },
    emerite: { 
      name: "Ambassadeur Émérite", 
      price: "Sur invitation", 
      description: "Niveau ultime",
      icon: Sparkles 
    },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    // console.log("Form submitted:", formData) // Disabled in production
  }

  const updateFormData = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/club">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au Club
            </Link>
          </Button>
        </div>

        {/* Form */}
        <section className="pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <ScrollAnimation animation="fadeIn">
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-display mb-6">Rejoindre le Club Lastours</h1>
                  <p className="text-lg text-muted-foreground text-pretty mb-4">
                    Intégrez notre cercle exclusif d'amoureux du vin et découvrez un monde de privilèges
                  </p>
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 max-w-2xl mx-auto">
                    <p className="text-sm text-accent font-medium">
                      🎆 Tous les nouveaux membres commencent au niveau "Connaisseur Distingué" 
                      et progressent selon leur engagement dans le club.
                    </p>
                  </div>
                </div>
              </ScrollAnimation>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Information sur le niveau d'entrée */}
                <ScrollAnimation animation="slideUp">
                  <Card className="border-accent/30 bg-accent/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Wine className="w-6 h-6 text-accent" />
                        Votre Statut de Départ : Connaisseur Distingué
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Vos privilèges immédiats :</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                              <span>Accès aux dégustations privées</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                              <span>Tarifs préférentiels sur certaines cuvées</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                              <span>Conseils personnalisés des maîtres de chai</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                              <span>Newsletter exclusive du club</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">Comment progresser :</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Votre statut évolue naturellement selon vos achats, votre participation aux événements 
                            et votre engagement dans la communauté. Plus vous participez, plus vous accédez à 
                            des privilèges exclusifs et des expériences uniques.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollAnimation>

                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => updateFormData("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => updateFormData("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Date de naissance</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => updateFormData("birthDate", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Adresse de livraison</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => updateFormData("address", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Code postal *</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => updateFormData("postalCode", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => updateFormData("city", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Pays</Label>
                        <Select value={formData.country} onValueChange={(value) => updateFormData("country", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="France">France</SelectItem>
                            <SelectItem value="Belgique">Belgique</SelectItem>
                            <SelectItem value="Suisse">Suisse</SelectItem>
                            <SelectItem value="Luxembourg">Luxembourg</SelectItem>
                            <SelectItem value="Allemagne">Allemagne</SelectItem>
                            <SelectItem value="Autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Preferences */}
                <ScrollAnimation animation="slideUp">
                  <Card>
                    <CardHeader>
                      <CardTitle>Vos Préférences Œnologiques</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="wineExperience">Votre expérience avec le vin</Label>
                        <Select value={formData.wineExperience} onValueChange={(value) => updateFormData("wineExperience", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez votre niveau" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="debutant">Débutant - Je découvre le monde du vin</SelectItem>
                            <SelectItem value="amateur">Amateur - J'apprécie le vin régulièrement</SelectItem>
                            <SelectItem value="connaisseur">Connaisseur - J'ai une bonne culture œnologique</SelectItem>
                            <SelectItem value="expert">Expert - Je suis passionné et très expérimenté</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label>Types de vins préférés (plusieurs choix possibles)</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { id: "rouge", label: "Vins Rouges" },
                            { id: "blanc", label: "Vins Blancs" },
                            { id: "rose", label: "Vins Rosés" },
                            { id: "effervescent", label: "Effervescents" },
                            { id: "doux", label: "Vins Doux" },
                            { id: "sec", label: "Vins Secs" },
                            { id: "bio", label: "Vins Bio" },
                            { id: "rare", label: "Millésimes Rares" }
                          ].map((type) => (
                            <div key={type.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={type.id}
                                checked={formData.favoriteWineTypes.includes(type.id)}
                                onCheckedChange={(checked) => {
                                  const current = formData.favoriteWineTypes
                                  if (checked) {
                                    updateFormData("favoriteWineTypes", [...current, type.id])
                                  } else {
                                    updateFormData("favoriteWineTypes", current.filter(t => t !== type.id))
                                  }
                                }}
                              />
                              <Label htmlFor={type.id} className="text-sm">{type.label}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="preferences">
                          Commentaires supplémentaires (allergies, occasions spéciales, etc.)
                        </Label>
                        <Textarea
                          id="preferences"
                          value={formData.preferences}
                          onChange={(e) => updateFormData("preferences", e.target.value)}
                          placeholder="Partagez-nous vos goûts spécifiques, allergies, ou toute information qui nous aiderait à personnaliser votre expérience..."
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </ScrollAnimation>

                {/* Consent */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={formData.newsletter}
                          onCheckedChange={(checked) => updateFormData("newsletter", checked as boolean)}
                        />
                        <Label htmlFor="newsletter" className="text-sm">
                          Je souhaite recevoir la newsletter et les informations sur les événements exclusifs
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.terms}
                          onCheckedChange={(checked) => updateFormData("terms", checked as boolean)}
                          required
                        />
                        <Label htmlFor="terms" className="text-sm">
                          J'accepte les{" "}
                          <Link href="/cgv" className="text-accent hover:underline">
                            conditions générales de vente
                          </Link>{" "}
                          et la{" "}
                          <Link href="/politique-confidentialite" className="text-accent hover:underline">
                            politique de confidentialité
                          </Link>{" "}
                          *
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit */}
                <ScrollAnimation animation="fadeIn">
                  <Card className="bg-accent/5 border-accent/20">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-xl font-display mb-4">Finaliser votre adhésion</h3>
                      <p className="text-muted-foreground mb-6">
                        En rejoignant le Club Lastours, vous intégrez une communauté exclusive 
                        dédiée à l'art de vivre et à l'excellence œnologique.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button type="submit" size="lg" disabled={!formData.terms} className="px-8">
                          <Crown className="mr-2 w-5 h-5" />
                          Rejoindre le Club
                        </Button>
                        <Button type="button" size="lg" variant="outline" asChild>
                          <Link href="/club">
                            <ArrowLeft className="mr-2 w-4 h-4" />
                            Retour
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              </form>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
