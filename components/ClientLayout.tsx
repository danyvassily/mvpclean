"use client"

import { ReactNode, useEffect, useState } from 'react'
import { ScrollSmootherWrapper } from './gsap/ScrollSmootherWrapper'
import { AnimatedGrain } from './gsap/CinematicEffects'
import { PageTransition } from './gsap/PageTransition'
import { LoadingOverlay } from './gsap/LoadingOverlay'

interface ClientLayoutProps {
  children: ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {mounted && <LoadingOverlay />}
      <ScrollSmootherWrapper speed={1.2} effects={true}>
        {mounted && <AnimatedGrain intensity={0.12} speed={0.8} />}
        <PageTransition>
          {children}
        </PageTransition>
      </ScrollSmootherWrapper>
    </>
  )
}
