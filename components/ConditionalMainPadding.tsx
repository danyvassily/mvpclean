"use client"

import { ReactNode } from "react"

interface ConditionalMainPaddingProps {
  children: ReactNode
}

export function ConditionalMainPadding({ children }: ConditionalMainPaddingProps) {
  return (
    <main>
      {children}
    </main>
  )
}

