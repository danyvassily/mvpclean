# Exemples d'utilisation - Composants Wines

Ce document présente différents cas d'usage des composants `WineCard` et `WineGrid`.

## 📋 Table des matières

1. [Page principale "Nos Vins" avec toutes les gammes](#1-page-principale-nos-vins)
2. [Page de gamme spécifique](#2-page-gamme-spécifique)
3. [Page de sélection par couleur](#3-sélection-par-couleur)
4. [Section "Nos coups de cœur"](#4-nos-coups-de-cœur)
5. [Grille personnalisée 3 colonnes](#5-grille-3-colonnes)

---

## 1. Page principale "Nos Vins"

Page complète avec toutes les gammes (Doméni, Opus, Méthode, etc.).

```tsx
// app/les-vins/page.tsx
"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gammes } from "@/lib/wines"
import { WineCard, WineGrid } from "@/components/wines"

gsap.registerPlugin(ScrollTrigger)

export default function WinesPage() {
  const container = useRef(null)
  const heroImage = useRef(null)

  useGSAP(
    () => {
      // Animations GSAP...
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from(".hero-title", { y: 100, opacity: 0, duration: 1.2 })
        .from(".hero-text", { y: 50, opacity: 0, duration: 1 }, "-=0.6")
    },
    { scope: container }
  )

  return (
    <div ref={container} className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] lg:h-[80vh] max-h-[800px] overflow-hidden flex items-center justify-center bg-neutral-900">
        <div ref={heroImage} className="absolute inset-0 z-0">
          <Image
            src="/images/vins/vin-blanc-rouge-rose-bulles-gaillac-sud-ouest-france.jpg"
            alt="Vins du Château Lastours"
            fill
            priority
            className="object-contain"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        <div className="relative z-20 container mx-auto px-6 text-center max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-light mb-4 lg:mb-8 hero-title text-white">
            Nos Vins
          </h1>
          <p className="text-sm sm:text-lg lg:text-2xl font-light text-white hero-text">
            Vivez l'émotion Lastours : des arômes captivants, des instants à partager
          </p>
        </div>
      </section>

      {/* Gammes de vins */}
      {gammes.map((gamme, index) => (
        <section
          key={gamme.id}
          className={`py-16 sm:py-20 lg:py-32 ${
            index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
          }`}
        >
          <div className="container mx-auto px-6 sm:px-12 lg:px-16 max-w-7xl">
            <div className="text-center mb-16 sm:mb-20 lg:mb-24">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-slate-900 mb-6">
                {gamme.title}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl font-light text-slate-600 max-w-3xl mx-auto">
                {gamme.description}
              </p>
            </div>

            <WineGrid>
              {gamme.cuvees.map((cuvee) => (
                <WineCard
                  key={cuvee.slug}
                  name={cuvee.title}
                  subtitle={cuvee.colorTag}
                  imageSrc={cuvee.image || "/images/wines/placeholder.png"}
                  href={cuvee.route}
                />
              ))}
            </WineGrid>
          </div>
        </section>
      ))}
    </div>
  )
}
```

---

## 2. Page gamme spécifique

Afficher uniquement les cuvées d'une gamme (ex : Opus).

```tsx
// app/les-vins/gamme/opus/page.tsx
"use client"

import { gammes } from "@/lib/wines"
import { WineCard, WineGrid } from "@/components/wines"
import Image from "next/image"

export default function OpusPage() {
  const gammeOpus = gammes.find(g => g.id === "opus")
  
  if (!gammeOpus) return <div>Gamme non trouvée</div>

  return (
    <div className="min-h-screen bg-white">
      {/* Hero minimaliste */}
      <section className="py-20 lg:py-32 bg-slate-50/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-slate-900 mb-8">
              {gammeOpus.title}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl font-light text-slate-600 leading-relaxed max-w-4xl mx-auto">
              {gammeOpus.description}
            </p>
          </div>

          <WineGrid>
            {gammeOpus.cuvees.map((cuvee) => (
              <WineCard
                key={cuvee.slug}
                name={cuvee.title}
                subtitle={cuvee.colorTag}
                description="Cuvée d'exception issue de nos meilleures parcelles"
                imageSrc={cuvee.image || "/images/wines/placeholder.png"}
                href={cuvee.route}
              />
            ))}
          </WineGrid>
        </div>
      </section>
    </div>
  )
}
```

---

## 3. Sélection par couleur

Afficher tous les vins blancs, rouges, ou rosés.

```tsx
// app/les-vins/blancs/page.tsx
"use client"

import { gammes } from "@/lib/wines"
import { WineCard, WineGrid } from "@/components/wines"

export default function VinsBlancsPage() {
  // Récupérer tous les vins blancs de toutes les gammes
  const vinsBlancs = gammes.flatMap(gamme => 
    gamme.cuvees
      .filter(cuvee => cuvee.colorTag === "Blanc")
      .map(cuvee => ({
        ...cuvee,
        gamme: gamme.title // Ajouter le nom de la gamme
      }))
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-slate-900 mb-6">
              Nos Vins Blancs
            </h1>
            <p className="text-lg sm:text-xl font-light text-slate-600 max-w-3xl mx-auto">
              Découvrez notre collection de vins blancs, révélant la fraîcheur 
              et la minéralité de notre terroir gaillacois.
            </p>
          </div>

          <WineGrid>
            {vinsBlancs.map((vin) => (
              <WineCard
                key={vin.slug}
                name={vin.title}
                subtitle={vin.gamme} // Afficher la gamme au lieu de la couleur
                imageSrc={vin.image || "/images/wines/placeholder.png"}
                href={vin.route}
              />
            ))}
          </WineGrid>
        </div>
      </section>
    </div>
  )
}
```

**Variantes pour les autres couleurs :**

```tsx
// Vins rouges
const vinsRouges = gammes.flatMap(gamme => 
  gamme.cuvees.filter(cuvee => cuvee.colorTag === "Rouge")
)

// Vins rosés
const vinsRoses = gammes.flatMap(gamme => 
  gamme.cuvees.filter(cuvee => cuvee.colorTag === "Rosé")
)

// Effervescents
const effervescents = gammes.flatMap(gamme => 
  gamme.cuvees.filter(cuvee => cuvee.colorTag === "Effervescent")
)
```

---

## 4. Nos coups de cœur

Section avec quelques cuvées sélectionnées.

```tsx
// components/sections/CoeurSelection.tsx
import { WineCard, WineGrid } from "@/components/wines"

const coupDeCoeur = [
  {
    name: "Opus Blanc",
    slug: "opus-blanc",
    colorTag: "Blanc",
    image: "/images/wines/blanc-opus-sf.png",
    route: "/les-vins/opus-blanc"
  },
  {
    name: "Petrichor Rouge",
    slug: "petrichor-rouge",
    colorTag: "Rouge",
    image: "/images/wines/petrichor-st.png",
    route: "/les-vins/petrichor-rouge"
  },
  {
    name: "Claire de Lune",
    slug: "claire-de-lune",
    colorTag: "Blanc",
    image: "/images/wines/claire-de-lune-sf.png",
    route: "/les-vins/claire-de-lune"
  }
]

export function CoeurSelection() {
  return (
    <section className="py-20 lg:py-32 bg-slate-50/30">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-slate-900 mb-6">
            Nos Coups de Cœur
          </h2>
          <p className="text-base sm:text-lg font-light text-slate-600 max-w-2xl mx-auto">
            Une sélection de nos cuvées d'exception, 
            pour découvrir l'essence de notre savoir-faire
          </p>
        </div>

        <WineGrid>
          {coupDeCoeur.map((vin) => (
            <WineCard
              key={vin.slug}
              name={vin.name}
              subtitle={vin.colorTag}
              imageSrc={vin.image}
              href={vin.route}
            />
          ))}
        </WineGrid>
      </div>
    </section>
  )
}
```

---

## 5. Grille 3 colonnes

Personnaliser la grille avec moins de colonnes.

```tsx
// components/wines/WineGrid3Col.tsx
"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface WineGrid3ColProps {
  children: ReactNode
  className?: string
}

/**
 * Variante de WineGrid avec 3 colonnes max (au lieu de 4)
 * Utile pour des pages avec moins de bouteilles ou un layout plus aéré
 */
export function WineGrid3Col({ children, className }: WineGrid3ColProps) {
  return (
    <div
      className={cn(
        // 3 colonnes max
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        // Espacement encore plus généreux
        "gap-10 sm:gap-12 md:gap-16 lg:gap-20",
        "place-items-center",
        // Centrer la grille
        "max-w-5xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  )
}
```

**Utilisation :**

```tsx
import { WineCard } from "@/components/wines/WineCard"
import { WineGrid3Col } from "@/components/wines/WineGrid3Col"

<WineGrid3Col>
  <WineCard name="Opus Blanc" href="..." imageSrc="..." />
  <WineCard name="Opus Rouge" href="..." imageSrc="..." />
  <WineCard name="Doméni Blanc" href="..." imageSrc="..." />
</WineGrid3Col>
```

---

## 6. Avec descriptions longues

Afficher des descriptions détaillées sous chaque bouteille.

```tsx
import { WineCard, WineGrid } from "@/components/wines"

const vinsAvecDescriptions = [
  {
    name: "Opus Blanc",
    subtitle: "Blanc",
    description: "Un vin d'exception issu de nos meilleures parcelles de Mauzac. Élevage en fûts de chêne français.",
    image: "/images/wines/blanc-opus-sf.png",
    route: "/les-vins/opus-blanc"
  },
  {
    name: "Opus Rouge",
    subtitle: "Rouge",
    description: "Assemblage complexe de Syrah et Duras, élevé 18 mois en barriques. Puissant et élégant.",
    image: "/images/wines/rouge-opus-sf.png",
    route: "/les-vins/opus-rouge"
  }
]

<WineGrid>
  {vinsAvecDescriptions.map((vin) => (
    <WineCard
      key={vin.name}
      name={vin.name}
      subtitle={vin.subtitle}
      description={vin.description} // Description affichée
      imageSrc={vin.image}
      href={vin.route}
    />
  ))}
</WineGrid>
```

---

## 7. Intégration dans la page d'accueil

Afficher une sélection sur la homepage.

```tsx
// app/page.tsx
import { WineCard, WineGrid } from "@/components/wines"
import Link from "next/link"

export default function HomePage() {
  return (
    <main>
      {/* Autres sections... */}

      {/* Section Vins */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-slate-900 mb-6">
              Nos Cuvées d'Exception
            </h2>
            <p className="text-base sm:text-lg font-light text-slate-600 max-w-2xl mx-auto mb-8">
              Découvrez notre palette aromatique, 
              de la fraîcheur des blancs à la puissance des rouges
            </p>
          </div>

          <WineGrid>
            <WineCard 
              name="Opus Blanc" 
              subtitle="Blanc" 
              imageSrc="/images/wines/blanc-opus-sf.png" 
              href="/les-vins/opus-blanc" 
            />
            <WineCard 
              name="Petrichor Rouge" 
              subtitle="Rouge" 
              imageSrc="/images/wines/petrichor-st.png" 
              href="/les-vins/petrichor-rouge" 
            />
            <WineCard 
              name="La Méthode Blanc" 
              subtitle="Effervescent" 
              imageSrc="/images/wines/la-methode-blanc-st.png" 
              href="/les-vins/methode-blanc" 
            />
            <WineCard 
              name="Claire de Lune" 
              subtitle="Blanc" 
              imageSrc="/images/wines/claire-de-lune-sf.png" 
              href="/les-vins/claire-de-lune" 
            />
          </WineGrid>

          {/* CTA vers page complète */}
          <div className="text-center mt-16">
            <Link 
              href="/les-vins"
              className="inline-block px-8 py-3 text-sm font-light uppercase tracking-widest text-slate-900 border border-slate-300 rounded-full hover:bg-slate-900 hover:text-white transition-colors duration-300"
            >
              Découvrir toutes nos cuvées
            </Link>
          </div>
        </div>
      </section>

      {/* Autres sections... */}
    </main>
  )
}
```

---

## 🎨 Customisation avancée

### Modifier les couleurs du hover

```tsx
<WineCard
  // ...
  className="hover:opacity-70" // Au lieu de 80%
/>
```

### Ajouter une animation personnalisée

```tsx
<WineCard
  // ...
  className="transition-all duration-700 hover:opacity-80 hover:-translate-y-2"
/>
```

### Modifier le style du badge

Dans `WineCard.tsx`, ligne ~67 :

```tsx
<span className="inline-block text-xs px-4 py-1.5 uppercase tracking-widest text-white bg-slate-900 rounded-full">
  {subtitle}
</span>
```

---

## 🚀 Performance

### Lazy loading intelligent

```tsx
{gamme.cuvees.map((cuvee, index) => (
  <WineCard
    key={cuvee.slug}
    name={cuvee.title}
    subtitle={cuvee.colorTag}
    imageSrc={cuvee.image}
    href={cuvee.route}
    // Priority pour les 4 premières bouteilles seulement
    {...(index < 4 && { priority: true })}
  />
))}
```

Note : Cela nécessite d'adapter `WineCard` pour accepter une prop `priority`.

---

**Version** : 1.0  
**Dernière mise à jour** : Novembre 2024

