"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Settings, LogOut, Heart, Package } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { AuthDialog } from "./auth-dialog"
import Link from "next/link"

export function UserMenu() {
  const { state, logout } = useAuth()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)

  if (!state.isAuthenticated) {
    return (
      <>
        <Button variant="outline" size="sm" onClick={() => setAuthDialogOpen(true)}>
          <User className="h-4 w-4 mr-2" />
          Connexion
        </Button>
        <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      </>
    )
  }

  const userInitials = state.user ? `${state.user.firstName[0]}${state.user.lastName[0]}` : "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-wine-gold text-wine-black">{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {state.user?.firstName} {state.user?.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">{state.user?.email}</p>
            {state.user?.isClubMember && (
              <p className="text-xs leading-none text-wine-gold">
                Membre Club{" "}
                {state.user.clubTier === "prestige"
                  ? "Prestige"
                  : state.user.clubTier === "collection"
                    ? "Collection"
                    : "Découverte"}
              </p>
            )}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/compte">
            <User className="mr-2 h-4 w-4" />
            <span>Mon compte</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/compte/commandes">
            <Package className="mr-2 h-4 w-4" />
            <span>Mes commandes</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/compte/favoris">
            <Heart className="mr-2 h-4 w-4" />
            <span>Mes favoris</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/compte/parametres">
            <Settings className="mr-2 h-4 w-4" />
            <span>Paramètres</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
