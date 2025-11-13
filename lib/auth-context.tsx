"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  dateOfBirth?: string
  isClubMember: boolean
  clubTier?: "decouverte" | "prestige" | "collection"
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<{
  state: AuthState
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<boolean>
} | null>(null)

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  dateOfBirth?: string
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("chateaux-lastours-user")
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        setState({
          user,
          isLoading: false,
          isAuthenticated: true,
        })
      } catch (error) {
        console.error("Error loading user from localStorage:", error)
        setState((prev) => ({ ...prev, isLoading: false }))
      }
    } else {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in real app, this would be an API call
    if (email && password.length >= 6) {
      const user: User = {
        id: "1",
        email,
        firstName: "Jean",
        lastName: "Dupont",
        phone: "+33 1 23 45 67 89",
        isClubMember: true,
        clubTier: "prestige",
      }

      localStorage.setItem("chateaux-lastours-user", JSON.stringify(user))
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })

      toast({
        title: "Connexion réussie",
        description: `Bienvenue ${user.firstName} !`,
      })

      return true
    } else {
      setState((prev) => ({ ...prev, isLoading: false }))
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect.",
        variant: "destructive",
      })
      return false
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      dateOfBirth: userData.dateOfBirth,
      isClubMember: false,
    }

    localStorage.setItem("chateaux-lastours-user", JSON.stringify(user))
    setState({
      user,
      isLoading: false,
      isAuthenticated: true,
    })

    toast({
      title: "Compte créé",
      description: `Bienvenue ${user.firstName} ! Votre compte a été créé avec succès.`,
    })

    return true
  }

  const logout = () => {
    localStorage.removeItem("chateaux-lastours-user")
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })

    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès.",
    })
  }

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!state.user) return false

    setState((prev) => ({ ...prev, isLoading: true }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const updatedUser = { ...state.user, ...userData }
    localStorage.setItem("chateaux-lastours-user", JSON.stringify(updatedUser))

    setState({
      user: updatedUser,
      isLoading: false,
      isAuthenticated: true,
    })

    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été mises à jour avec succès.",
    })

    return true
  }

  return (
    <AuthContext.Provider value={{ state, login, register, logout, updateProfile }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
