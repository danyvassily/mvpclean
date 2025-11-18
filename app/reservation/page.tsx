"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CalendarWidget } from "@/components/calendar-widget"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Users, MapPin, Phone, Wine, Star, CheckCircle, ArrowRight } from "lucide-react"
import { getAllPrestations, getPrestationById } from "@/lib/prestations-data"
import type { Prestation } from "@/lib/prestations-data"

export default function ReservationPage() {
  const prestations = getAllPrestations()
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    experience: prestations[0]?.id || "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // console.log("Reservation submitted:", formData) // Disabled in production
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const selectedPrestation = getPrestationById(formData.experience)

  // Fonction pour scroller vers une section avec offset header
  const scrollToSection = (id: string) => {
    const target = document.getElementById(id)
    if (target) {
      const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight
      window.scrollTo({ top: targetPosition, behavior: 'smooth' })
      // Focus pour l'accessibilité
      setTimeout(() => target.focus(), 300)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Style Ruinart épuré */}
      <section className="relative overflow-hidden">
        {/* Image Hero - Full width avec offset pour le header */}
        <div className="relative h-[55vh] sm:h-[60vh] lg:h-[70vh] max-h-[700px] -mt-20">
          <div className="absolute inset-0">
            <Image
              src="/images/heroes/chateau-lastours-hero.jpg"
              alt="Château Lastours - Réserver votre visite"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          {/* Overlay subtil pour lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Contenu texte - Centré */}
          <div className="relative z-10 h-full flex items-center justify-center pt-20">
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="max-w-4xl mx-auto text-center">
                {/* Titre unique */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light !text-white tracking-tight mb-6 leading-tight">
                  Réserver votre visite
                </h1>
                
                {/* Texte descriptif */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl !text-white font-light leading-relaxed max-w-3xl mx-auto mb-8">
                  Savourez l'instant Lastours : un voyage, une découverte, une dégustation où le plaisir et l'élégance se rencontrent
                </p>
                
                {/* CTA unique */}
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    onClick={() => scrollToSection('prestations')}
                    className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8 py-4 min-h-[44px] text-base sm:text-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                  >
                    Découvrir nos expériences
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prestations Section */}
      <section id="prestations" className="py-12 sm:py-16 lg:py-20 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-700 font-medium text-sm">
                <Star className="w-4 h-4" />
                Nos prestations
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light mb-6 text-slate-900 tracking-tight">
              Choisissez votre expérience
            </h2>
            <p className="text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              Du lundi au samedi, de 9h à 12h30 puis de 13h30 à 18h30, 
              découvrez l'univers du Château Lastours à travers nos expériences sur mesure
            </p>
          </div>

          {/* Grille de prestations - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
            {prestations.map((prestation) => (
              <Card 
                key={prestation.id} 
                className="group overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300 bg-white flex flex-col"
              >
                {/* Image */}
                {prestation.image && (
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={prestation.image}
                      alt={prestation.titre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    {prestation.populaire && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-white text-slate-900 text-xs font-semibold rounded-full">
                          <Star className="w-3 h-3 fill-current" />
                          Populaire
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Contenu */}
                <CardContent className="p-6 flex flex-col flex-grow">
                  {/* Titre */}
                  <h3 className="text-xl sm:text-2xl font-serif font-light text-slate-900 mb-3 tracking-tight">
                    {prestation.titre}
                  </h3>
                  
                  {/* Type et durée */}
                  {(prestation.type || prestation.duree) && (
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                      {prestation.type && (
                        <span className="font-medium">{prestation.type}</span>
                      )}
                      {prestation.duree && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {prestation.duree}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-600 mb-4 leading-relaxed flex-grow">
                    {prestation.description}
                  </p>
                  
                  {/* Highlights */}
                  {prestation.highlights && prestation.highlights.length > 0 && (
                    <div className="space-y-2 mb-6">
                      <p className="text-xs font-medium text-slate-900 uppercase tracking-wide">
                        Cette expérience comprend :
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {prestation.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Prix */}
                  {prestation.prix && (
                    <div className="mb-6">
                      <span className="text-2xl font-serif font-light text-slate-900">
                        {prestation.prix}
                      </span>
                      {prestation.prix !== "Sur devis" && (
                        <span className="text-sm text-slate-600 ml-2">par personne</span>
                      )}
                    </div>
                  )}
                  
                  {/* CTA */}
                  <Button
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium min-h-[44px] mt-auto"
                    onClick={() => {
                      updateFormData("experience", prestation.id)
                      scrollToSection('reservation-form')
                    }}
                  >
                    Choisir cette expérience
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Informations pratiques */}
          <div className="bg-slate-50 rounded-lg p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-serif font-light mb-6 text-slate-900">
              Informations importantes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm sm:text-base text-slate-600">
              <div className="flex flex-col items-center gap-2">
                <Calendar className="w-5 h-5 text-slate-900" />
                <span>Réservation obligatoire</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Users className="w-5 h-5 text-slate-900" />
                <span>Gratuit pour les -13 ans</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Phone className="w-5 h-5 text-slate-900" />
                <span>+33 (0)5 63 57 07 09</span>
              </div>
            </div>
          </div>

          {/* CTA vers événements */}
          <div className="mt-12 lg:mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 bg-slate-50 rounded-lg">
              <p className="text-sm sm:text-base text-slate-600">
                Vous souhaitez organiser un événement privé ?
              </p>
              <Button variant="outline" asChild className="min-h-[44px]">
                <Link href="/evenements/organiser">
                  Organiser votre événement
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire de réservation */}
      <section id="reservation-form" className="py-12 sm:py-16 lg:py-20 bg-slate-50 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light mb-4 text-slate-900 tracking-tight">
                Formulaire de réservation
              </h2>
              <p className="text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
                Complétez le formulaire ci-dessous pour réserver votre expérience au Château Lastours
              </p>
            </div>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-serif font-light text-slate-900">
                  {selectedPrestation ? `Réserver : ${selectedPrestation.titre}` : "Sélectionnez une expérience"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Expérience sélectionnée */}
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-base font-medium">
                      Expérience <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) => updateFormData("experience", value)}
                      required
                    >
                      <SelectTrigger id="experience" className="min-h-[44px] focus:ring-2 focus:ring-slate-900">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {prestations.map((prestation) => (
                          <SelectItem key={prestation.id} value={prestation.id} className="min-h-[44px]">
                            {prestation.titre} - {prestation.prix}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Nom et Prénom */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-base font-medium">
                        Prénom <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => updateFormData("firstName", e.target.value)}
                        required
                        className="min-h-[44px] focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-base font-medium">
                        Nom <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => updateFormData("lastName", e.target.value)}
                        required
                        className="min-h-[44px] focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  {/* Email et Téléphone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-medium">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        required
                        className="min-h-[44px] focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base font-medium">
                        Téléphone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        required
                        className="min-h-[44px] focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  {/* Date et Heure */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-base font-medium">
                        Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => updateFormData("date", e.target.value)}
                        required
                        className="min-h-[44px] focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-base font-medium">
                        Heure <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => updateFormData("time", e.target.value)}
                        required
                        className="min-h-[44px] focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  {/* Nombre de personnes */}
                  <div className="space-y-2">
                    <Label htmlFor="guests" className="text-base font-medium">
                      Nombre de personnes <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.guests}
                      onValueChange={(value) => updateFormData("guests", value)}
                      required
                    >
                      <SelectTrigger id="guests" className="min-h-[44px] focus:ring-2 focus:ring-slate-900">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()} className="min-h-[44px]">
                            {num} {num === 1 ? "personne" : "personnes"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base font-medium">
                      Message (optionnel)
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => updateFormData("message", e.target.value)}
                      rows={4}
                      className="focus:ring-2 focus:ring-slate-900"
                      placeholder="Informations complémentaires, allergies, demandes spéciales..."
                    />
                  </div>

                  {/* Bouton de soumission */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold min-h-[44px] text-base sm:text-lg focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                  >
                    Confirmer la réservation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
