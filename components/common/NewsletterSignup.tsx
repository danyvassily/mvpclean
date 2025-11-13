"use client"

import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface NewsletterSignupProps {
  className?: string
  showConsent?: boolean
  consentText?: string
}

export function NewsletterSignup({ 
  className,
  showConsent = false,
  consentText = "J'accepte que mes données soient utilisées pour recevoir la newsletter"
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validation email native
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus("error")
      setErrorMessage("Veuillez entrer une adresse email valide")
      return
    }

    // Validation consentement RGPD si requis
    if (showConsent && !consent) {
      setStatus("error")
      setErrorMessage("Veuillez accepter les conditions pour recevoir la newsletter")
      return
    }

    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue")
      }

      setStatus("success")
      setEmail("")
      setConsent(false)
      
      // Gestion du focus pour l'accessibilité
      setTimeout(() => {
        const successElement = document.querySelector('[data-newsletter-success]')
        if (successElement) {
          (successElement as HTMLElement).focus()
        }
      }, 100)
    } catch (error) {
      setStatus("error")
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : "Une erreur est survenue lors de l'inscription"
      )
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Label htmlFor="newsletter-email" className="sr-only">
              Adresse email
            </Label>
            <Input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              required
              disabled={status === "loading"}
              className={cn(
                "min-h-[44px] text-base",
                status === "error" && "border-red-500 focus-visible:ring-red-500"
              )}
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? "newsletter-error" : undefined}
            />
          </div>
          <Button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="min-h-[44px] min-w-[120px] px-8"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Inscription...
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Inscrit
              </>
            ) : (
              "S'inscrire"
            )}
          </Button>
        </div>

        {showConsent && (
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="newsletter-consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              disabled={status === "loading"}
              className="mt-1 h-4 w-4 min-w-[16px] rounded border-gray-300 text-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              aria-required="true"
            />
            <Label
              htmlFor="newsletter-consent"
              className="text-sm text-slate-600 leading-relaxed cursor-pointer"
            >
              {consentText}
            </Label>
          </div>
        )}

        {status === "error" && errorMessage && (
          <Alert variant="destructive" id="newsletter-error" role="alert">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {status === "success" && (
          <Alert 
            variant="default" 
            className="bg-green-50 border-green-200 text-green-800"
            data-newsletter-success
            tabIndex={-1}
            role="alert"
          >
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              Merci ! Vous êtes maintenant inscrit à notre newsletter.
            </AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  )
}

