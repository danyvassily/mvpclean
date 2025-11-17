"use client"

import { cn } from "@/lib/utils"
import { AlertCircle, Info, AlertTriangle } from "lucide-react"

type NoticeVariant = "info" | "warning" | "error"

interface InlineNoticeProps {
  variant?: NoticeVariant
  message: string
  className?: string
}

/**
 * Composant InlineNotice - Alertes élégantes
 * Conforme aux patterns Ruinart : style discret, pas de couleurs criardes
 */
export function InlineNotice({
  variant = "info",
  message,
  className
}: InlineNoticeProps) {
  const variants = {
    info: {
      icon: Info,
      bg: "bg-muted/50",
      border: "border-muted",
      text: "text-foreground",
      iconColor: "text-muted-foreground"
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-yellow-50 dark:bg-yellow-950/20",
      border: "border-yellow-200 dark:border-yellow-800",
      text: "text-foreground",
      iconColor: "text-yellow-600 dark:text-yellow-400"
    },
    error: {
      icon: AlertCircle,
      bg: "bg-red-50 dark:bg-red-950/20",
      border: "border-red-200 dark:border-red-800",
      text: "text-foreground",
      iconColor: "text-red-600 dark:text-red-400"
    }
  }

  const config = variants[variant]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border",
        config.bg,
        config.border,
        className
      )}
      role="alert"
    >
      <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", config.iconColor)} />
      <p className={cn("text-sm leading-relaxed", config.text)}>{message}</p>
    </div>
  )
}

