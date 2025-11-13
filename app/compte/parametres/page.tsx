"use client"

import { useAuth } from "@/lib/auth-context"
import { redirect } from "next/navigation"

export default function AccountSettingsPage() {
  const { state } = useAuth()

  if (!state.isLoading && !state.isAuthenticated) {
    redirect("/")
  }

  if (!state.user) return null

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-serif text-3xl mb-6">Paramètres du compte</h1>
      <p className="text-muted-foreground">Gérez vos informations personnelles et vos préférences.</p>
    </div>
  )
}
