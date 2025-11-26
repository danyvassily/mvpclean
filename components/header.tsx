"use client"

import { useEffect, useRef, useState } from "react"
import type { FocusEvent, MouseEvent } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { useIsMobile, useDeviceType } from "@/hooks/use-mobile"
import Image from "next/image"
import { getCuveesByColor } from "@/lib/wines"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/lib/auth-context"

/**
 * Header refondu selon spécifications
 * 
 * Fonctionnalités :
 * - Transparence sur pages avec hero visuel
 * - Structure de menu conforme (max 3 sous-sections + photo)
 * - Photos ASSET dans les menus
 * - Menu utilisateur quand connecté
 * - Typographie uniforme
 * - Responsive parfait
 */

// Pages avec hero visuel (grande photo d'entête)
const PAGES_WITH_HERO = [
  "/",
  "/les-vins",
  "/evenements",
  "/evenements/organiser",
  "/evenements/simuler-votre-devis",
  "/reservation",
  "/domaine/histoire",
  "/notre-vignoble",
  "/gastronomie",
  "/degustation",
  "/club",
  "/mecenat",
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)
  const navRef = useRef<HTMLDivElement | null>(null)
  const megaMenuRef = useRef<HTMLDivElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useIsMobile()
  const deviceType = useDeviceType()
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  
  // Obtenir l'état d'authentification
  const { state: authState } = useAuth()
  
  // Obtenir les cuvées groupées par couleur
  const { byColor } = getCuveesByColor()
  
  // Ne pas afficher le mega menu sur mobile/tablette
  const isDesktop = deviceType === 'desktop'
  
  // Détecter si la page actuelle a un hero visuel
  const hasHeroVisual = PAGES_WITH_HERO.some(path => pathname === path || pathname.startsWith(path + "/"))
  
  // Typographie uniforme pour le menu
  const navItemClass = "text-sm font-medium tracking-wide transition-all duration-300"
  const navSubItemClass = "text-sm font-normal tracking-wide transition-colors"
  const navSubTitleClass = "text-xs font-semibold text-slate-500 uppercase tracking-wide"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Calculer et mettre à jour la hauteur du header pour scroll-padding
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight
        document.documentElement.style.setProperty('--header-height', `${height}px`)
      }
    }
    
    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)
    const resizeObserver = new ResizeObserver(updateHeaderHeight)
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current)
    }
    
    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
      resizeObserver.disconnect()
    }
  }, [isMenuOpen])

  // Nettoyage des timeouts
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  // Fermer le menu mobile automatiquement
  useEffect(() => {
    if (isDesktop && isMenuOpen) {
      setIsMenuOpen(false)
      setMobileSubmenu(null)
    }
    if (!isDesktop && hoveredMenu) {
      setHoveredMenu(null)
    }
  }, [isDesktop, isMenuOpen, hoveredMenu])

  // Gestion des événements pour fermer le menu mobile
  useEffect(() => {
    if (!isMenuOpen) return

    document.body.style.overflow = 'hidden'

    const closeMenu = () => {
      setIsMenuOpen(false)
      setMobileSubmenu(null)
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }

    const handleClickOutside = (event: Event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMenuOpen])

  const openMenu = (key: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setHoveredMenu(key)
  }

  const closeMenuWithDelay = (delay: number = 200) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(null)
      hoverTimeoutRef.current = null
    }, delay)
  }

  const closeMenuImmediately = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setHoveredMenu(null)
  }

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
    setMobileSubmenu(null)
  }

  const handleNavMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    try {
      const nextTarget = event.relatedTarget as Node | null
      if (nextTarget && 
          nextTarget.nodeType === Node.ELEMENT_NODE && 
          megaMenuRef.current && 
          megaMenuRef.current.contains(nextTarget)) {
        return
      }
    } catch (error) {
      console.debug('handleNavMouseLeave error:', error)
    }
    closeMenuWithDelay(250)
  }

  const handleMegaMenuMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    try {
      const nextTarget = event.relatedTarget as Node | null
      if (nextTarget && 
          nextTarget.nodeType === Node.ELEMENT_NODE && 
          navRef.current && 
          navRef.current.contains(nextTarget)) {
        return
      }
    } catch (error) {
      console.debug('handleMegaMenuMouseLeave error:', error)
    }
    closeMenuWithDelay(150)
  }

  const handleMenuMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }

  const handleTriggerBlur = (event: FocusEvent<HTMLButtonElement>) => {
    const nextTarget = event.relatedTarget as Node | null
    if (!nextTarget) {
      closeMenuWithDelay(300)
      return
    }

    if (nextTarget.nodeType === Node.ELEMENT_NODE && 
        navRef.current && 
        megaMenuRef.current &&
        (navRef.current.contains(nextTarget) || megaMenuRef.current.contains(nextTarget))) {
      return
    }

    closeMenuWithDelay(300)
  }

  const handleMegaMenuBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null

    if (nextTarget && 
        nextTarget.nodeType === Node.ELEMENT_NODE && 
        megaMenuRef.current && 
        navRef.current &&
        (megaMenuRef.current.contains(nextTarget) || navRef.current.contains(nextTarget))) {
      return
    }

    closeMenuWithDelay(300)
  }

  // Déterminer le style du header selon si la page a un hero
  const getHeaderStyles = () => {
    // Header toujours blanc opaque, légère ombre au scroll
    if (scrolled) {
      return "bg-white/98 backdrop-blur-md shadow-sm"
    }
    // Header blanc sans ombre par défaut
    return "bg-white"
  }

  // Couleur du texte - Toujours sombre
  const getTextColor = () => {
    return "text-slate-800"
  }

  const textColor = getTextColor()
  const iconColor = textColor

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-700 ${getHeaderStyles()}`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20 relative">
            {/* Left Navigation - Desktop uniquement */}
            <nav 
              ref={navRef}
              className="hidden xl:flex items-center space-x-6 flex-1"
              onMouseLeave={handleNavMouseLeave}
            >
              {/* Notre Domaine */}
              <div className="relative">
                <button 
                  className={`${navItemClass} ${textColor} hover:text-wine-gold group py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-wine-gold focus:ring-offset-2 rounded flex items-center space-x-1`}
                  type="button"
                  aria-haspopup="true"
                  {...(hoveredMenu === 'domaine' ? { "aria-expanded": "true" } : { "aria-expanded": "false" })}
                  onMouseEnter={() => openMenu('domaine')}
                  onFocus={() => openMenu('domaine')}
                  onClick={() => hoveredMenu === 'domaine' ? closeMenuImmediately() : openMenu('domaine')}
                  onBlur={handleTriggerBlur}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      hoveredMenu === 'domaine' ? closeMenuImmediately() : openMenu('domaine')
                    }
                    if (e.key === 'Escape') {
                      closeMenuImmediately()
                    }
                  }}
                >
                  <span>Notre Domaine</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${iconColor} ${hoveredMenu === 'domaine' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Notre savoir-faire */}
              <div className="relative">
                <button 
                  className={`${navItemClass} ${textColor} hover:text-wine-gold group py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-wine-gold focus:ring-offset-2 rounded flex items-center space-x-1`}
                  type="button"
                  aria-haspopup="true"
                  {...(hoveredMenu === 'savoir-faire' ? { "aria-expanded": "true" } : { "aria-expanded": "false" })}
                  onMouseEnter={() => openMenu('savoir-faire')}
                  onFocus={() => openMenu('savoir-faire')}
                  onClick={() => hoveredMenu === 'savoir-faire' ? closeMenuImmediately() : openMenu('savoir-faire')}
                  onBlur={handleTriggerBlur}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      hoveredMenu === 'savoir-faire' ? closeMenuImmediately() : openMenu('savoir-faire')
                    }
                    if (e.key === 'Escape') {
                      closeMenuImmediately()
                    }
                  }}
                >
                  <span>Notre savoir-faire</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${iconColor} ${hoveredMenu === 'savoir-faire' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Nos vins */}
              <div className="relative">
                <button 
                  className={`${navItemClass} ${textColor} hover:text-wine-gold group py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-wine-gold focus:ring-offset-2 rounded flex items-center space-x-1`}
                  type="button"
                  aria-haspopup="true"
                  {...(hoveredMenu === 'vins' ? { "aria-expanded": "true" } : { "aria-expanded": "false" })}
                  onMouseEnter={() => openMenu('vins')}
                  onFocus={() => openMenu('vins')}
                  onClick={() => hoveredMenu === 'vins' ? closeMenuImmediately() : openMenu('vins')}
                  onBlur={handleTriggerBlur}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      hoveredMenu === 'vins' ? closeMenuImmediately() : openMenu('vins')
                    }
                    if (e.key === 'Escape') {
                      closeMenuImmediately()
                    }
                  }}
                >
                  <span>Nos vins</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${iconColor} ${hoveredMenu === 'vins' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </nav>
          
            {/* Logo centré */}
            <div className="flex-shrink-0 mx-4 lg:mx-6">
              <Link href="/" className="flex items-center">
                <Image
                  src="/asset/espace-presse/logo-chateau-lastours-blason.png"
                  alt="Château Lastours"
                  width={120}
                  height={120}
                  priority
                  className="transition-all duration-300 opacity-100 hover:scale-105 object-contain lg:w-[130px] lg:h-[130px]"
                />
              </Link>
            </div>

            {/* Right Navigation & Actions - Desktop uniquement */}
            <div className="hidden xl:flex items-center space-x-6 flex-1 justify-end">
              {/* Expériences */}
              <div className="relative">
                <button 
                  className={`${navItemClass} ${textColor} hover:text-wine-gold group py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-wine-gold focus:ring-offset-2 rounded flex items-center space-x-1`}
                  type="button"
                  aria-haspopup="true"
                  {...(hoveredMenu === 'experiences' ? { "aria-expanded": "true" } : { "aria-expanded": "false" })}
                  onMouseEnter={() => openMenu('experiences')}
                  onFocus={() => openMenu('experiences')}
                  onClick={() => hoveredMenu === 'experiences' ? closeMenuImmediately() : openMenu('experiences')}
                  onBlur={handleTriggerBlur}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      hoveredMenu === 'experiences' ? closeMenuImmediately() : openMenu('experiences')
                    }
                    if (e.key === 'Escape') {
                      closeMenuImmediately()
                    }
                  }}
                >
                  <span>Expériences</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${iconColor} ${hoveredMenu === 'experiences' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Gastronomie */}
              <div className="relative">
                <button 
                  className={`${navItemClass} ${textColor} hover:text-wine-gold group py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-wine-gold focus:ring-offset-2 rounded flex items-center space-x-1`}
                  type="button"
                  aria-haspopup="true"
                  {...(hoveredMenu === 'gastronomie' ? { "aria-expanded": "true" } : { "aria-expanded": "false" })}
                  onMouseEnter={() => openMenu('gastronomie')}
                  onFocus={() => openMenu('gastronomie')}
                  onClick={() => hoveredMenu === 'gastronomie' ? closeMenuImmediately() : openMenu('gastronomie')}
                  onBlur={handleTriggerBlur}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      hoveredMenu === 'gastronomie' ? closeMenuImmediately() : openMenu('gastronomie')
                    }
                    if (e.key === 'Escape') {
                      closeMenuImmediately()
                    }
                  }}
                >
                  <span>Gastronomie</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${iconColor} ${hoveredMenu === 'gastronomie' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Lien Nous contacter */}
              <Link 
                href="/contact"
                className={`${navItemClass} ${textColor} hover:text-wine-gold py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-wine-gold focus:ring-offset-2 rounded`}
              >
                Nous contacter
              </Link>

              {/* Menu utilisateur - visible quand connecté */}
              {authState.isAuthenticated ? (
                <div className="flex items-center">
                  <UserMenu />
                </div>
              ) : (
                <Link 
                  href="/compte"
                  className={`${navItemClass} ${textColor} hover:text-wine-gold py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-wine-gold focus:ring-offset-2 rounded`}
                >
                  Se connecter
                </Link>
              )}
            </div>

            {/* Burger Menu Button - Mobile et Tablette */}
            <div className="xl:hidden flex items-center z-[1001] relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMenuOpen(!isMenuOpen)
                }}
                className={`p-2 ${textColor} hover:bg-black/10 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-wine-gold focus:ring-offset-2 relative z-[1001]`}
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                {...(isMenuOpen ? { "aria-expanded": "true" } : { "aria-expanded": "false" })}
                aria-controls="mobile-menu"
                type="button"
              >
                {isMenuOpen ? <X className={`w-6 h-6 ${iconColor}`} /> : <Menu className={`w-6 h-6 ${iconColor}`} />}
              </button>
            </div>
          </div>

          {/* Mobile/Tablette Menu */}
          {isMenuOpen && (
            <div 
              id="mobile-menu"
              ref={mobileMenuRef}
              className="xl:hidden py-4 border-t border-gray-200 bg-white/98 backdrop-blur-md max-h-[calc(100vh-5rem)] overflow-y-auto transition-all duration-300 ease-in-out z-[1000] overscroll-contain"
              role="navigation"
              aria-label="Menu de navigation mobile"
            >
              <nav className="flex flex-col space-y-2 pb-8">
                {/* Notre Domaine */}
                <div>
                  <button
                    onClick={() => setMobileSubmenu(mobileSubmenu === 'domaine' ? null : 'domaine')}
                    className="flex items-center justify-between w-full px-4 py-3 text-left font-medium text-slate-800 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span>Notre Domaine</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSubmenu === 'domaine' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileSubmenu === 'domaine' && (
                    <div className="ml-4 mt-2 space-y-1">
                      <div className={navSubTitleClass}>Notre héritage</div>
                      <Link href="/domaine/histoire" className="block px-6 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        Notre histoire
                      </Link>
                      <Link href="/domaine/team" className="block px-6 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        Notre équipe
                      </Link>
                      <Link href="/domaine/engagement" className="block px-6 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        Nos engagements
                      </Link>
                      <div className={`${navSubTitleClass} mt-2`}>Notre terroir</div>
                      <Link href="/notre-vignoble" className="block px-6 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        Notre vignoble
                      </Link>
                      <Link href="/de-la-vigne-a-la-bouteille" className="block px-6 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        Notre chai
                      </Link>
                      <div className={`${navSubTitleClass} mt-2`}>Notre actualité</div>
                      <Link href="/actualites" className="block px-6 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        Nos actualités
                      </Link>
                      <Link href="/presse" className="block px-6 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        Espace presse
                      </Link>
                    </div>
                  )}
                </div>

                {/* Savoir-Faire */}
                <div>
                  <button
                    onClick={() => setMobileSubmenu(mobileSubmenu === 'savoir-faire' ? null : 'savoir-faire')}
                    className="flex items-center justify-between w-full px-4 py-3 text-left font-medium text-slate-800 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span>Notre savoir-faire</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSubmenu === 'savoir-faire' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileSubmenu === 'savoir-faire' && (
                    <div className="ml-4 mt-2 space-y-1">
                      <Link href="/le-cycle-de-la-vigne" className="block px-4 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        Le cycle de la vigne
                      </Link>
                      <Link href="/de-la-vigne-a-la-bouteille" className="block px-4 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        De la vigne à la bouteille
                      </Link>
                    </div>
                  )}
                </div>

                {/* Nos Vins */}
                <div>
                  <button
                    onClick={() => setMobileSubmenu(mobileSubmenu === 'vins' ? null : 'vins')}
                    className="flex items-center justify-between w-full px-4 py-3 text-left font-medium text-slate-800 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span>Nos Vins</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSubmenu === 'vins' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileSubmenu === 'vins' && (
                    <div className="ml-4 mt-2 space-y-1">
                      <Link href="/les-vins" className="block px-4 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors font-medium min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        Toutes les cuvées
                      </Link>
                      <div className="ml-2 space-y-1 border-l border-gray-200 pl-3">
                        {/* Blancs */}
                        <>
                          <p className={`${navSubTitleClass} px-4 py-1`}>Nos Blancs</p>
                          <Link href="/les-vins/methode-blanc" className="block px-4 py-1 text-sm text-slate-600 hover:text-wine-gold transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                            Méthode Blanche
                          </Link>
                          <Link href="/les-vins/claire-de-lune" className="block px-4 py-1 text-sm text-slate-600 hover:text-wine-gold transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                            Claire de Lune
                          </Link>
                          <Link href="/les-vins" className="block px-4 py-1 text-sm text-slate-600 hover:text-wine-gold transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                            Toutes nos cuvées
                          </Link>
                        </>
                        
                        {/* Rosés */}
                        <>
                          <p className={`${navSubTitleClass} px-4 py-1 mt-3`}>Nos Rosés</p>
                          <Link href="/les-vins/poussin-rose" className="block px-4 py-1 text-sm text-slate-600 hover:text-wine-gold transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                            Poussin
                          </Link>
                          <Link href="/les-vins/petrichor-rose" className="block px-4 py-1 text-sm text-slate-600 hover:text-wine-gold transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                            Petrichor
                          </Link>
                          <Link href="/les-vins" className="block px-4 py-1 text-sm text-slate-600 hover:text-wine-gold transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                            Toutes nos cuvées
                          </Link>
                        </>
                        
                        {/* Rouges */}
                        <>
                          <p className={`${navSubTitleClass} px-4 py-1 mt-3`}>Nos Rouges</p>
                          <Link href="/les-vins/opus-rouge" className="block px-4 py-1 text-sm text-slate-600 hover:text-wine-gold transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                            Opus
                          </Link>
                          <Link href="/les-vins/petrichor-rouge" className="block px-4 py-1 text-sm text-slate-600 hover:text-wine-gold transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                            Petrichor
                          </Link>
                          <Link href="/les-vins" className="block px-4 py-1 text-sm text-slate-600 hover:text-wine-gold transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                            Toutes nos cuvées
                          </Link>
                        </>
                      </div>
                    </div>
                  )}
                </div>

                {/* Expériences */}
                <div>
                  <button
                    onClick={() => setMobileSubmenu(mobileSubmenu === 'experiences' ? null : 'experiences')}
                    className="flex items-center justify-between w-full px-4 py-3 text-left font-medium text-slate-800 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span>Expériences</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSubmenu === 'experiences' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileSubmenu === 'experiences' && (
                    <div className="ml-4 mt-2 space-y-1">
                      <div className={navSubTitleClass}>Visites</div>
                      <Link href="/reservation" className="block px-6 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        Réservez votre instant
                      </Link>
                      <div className={`${navSubTitleClass} mt-2`}>Evènements</div>
                      <Link href="/evenements" className="block px-6 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        Nos évènements
                      </Link>
                      <Link href="/evenements/organiser" className="block px-6 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        Organisez votre évènement
                      </Link>
                      <div className={`${navSubTitleClass} mt-2`}>Partagez notre passion</div>
                      <Link href="/club" className="block px-6 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        Rejoignez notre club
                      </Link>
                      <Link href="/mecenat" className="block px-6 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        Mécénat
                      </Link>
                      <Link href="/gastronomie" className="block px-6 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        Gastronomie
                      </Link>
                    </div>
                  )}
                </div>

                {/* Gastronomie */}
                <div>
                  <button
                    onClick={() => setMobileSubmenu(mobileSubmenu === 'gastronomie' ? null : 'gastronomie')}
                    className="flex items-center justify-between w-full px-4 py-3 text-left font-medium text-slate-800 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span>Gastronomie</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSubmenu === 'gastronomie' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileSubmenu === 'gastronomie' && (
                    <div className="ml-4 mt-2 space-y-1">
                      <Link href="/gastronomie" className="block px-4 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        Art de la table
                      </Link>
                      <Link href="/degustation" className="block px-4 py-2 text-sm text-slate-600 hover:text-wine-gold hover:bg-gray-50 rounded-md transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                        Dégustation
                      </Link>
                    </div>
                  )}
                </div>

                {/* Pages directes */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <Link href="/contact" className="block px-4 py-3 font-medium text-slate-800 hover:text-wine-gold hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                    Nous contacter
                  </Link>
                  {authState.isAuthenticated ? (
                    <Link href="/compte" className="block px-4 py-3 font-medium text-slate-800 hover:text-wine-gold hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                      Mon compte
                    </Link>
                  ) : (
                    <Link href="/compte" className="block px-4 py-3 font-medium text-slate-800 hover:text-wine-gold hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center" onClick={closeMobileMenu}>
                      Se connecter
                    </Link>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Méga-menus - Desktop uniquement */}
      {hoveredMenu && isDesktop && (
        <div 
          ref={megaMenuRef}
          className="fixed top-20 left-0 right-0 z-50 transition-all duration-300 bg-white/98 backdrop-blur-lg border-b border-gray-200/30 shadow-lg"
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMegaMenuMouseLeave}
          onBlurCapture={handleMegaMenuBlur}
        >
          <div className="container mx-auto px-4 xl:px-8 py-6">
            {/* Notre Domaine */}
            {hoveredMenu === 'domaine' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Notre héritage */}
                <div className="space-y-2">
                  <h3 className={`${navSubTitleClass} mb-3 text-slate-900`}>
                    Notre héritage
                  </h3>
                  <div className="space-y-1">
                    <Link 
                      href="/domaine/histoire" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Notre histoire
                    </Link>
                    <Link 
                      href="/domaine/team" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Notre équipe
                    </Link>
                    <Link 
                      href="/domaine/engagement" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Nos engagements
                    </Link>
                  </div>
                </div>

                {/* Notre terroir */}
                <div className="space-y-2">
                  <h3 className={`${navSubTitleClass} mb-3 text-slate-900`}>
                    Notre terroir
                  </h3>
                  <div className="space-y-1">
                    <Link 
                      href="/notre-vignoble" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Notre vignoble
                    </Link>
                    <Link 
                      href="/de-la-vigne-a-la-bouteille" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Notre chai
                    </Link>
                  </div>
                </div>

                {/* Notre actualité */}
                <div className="space-y-2">
                  <h3 className={`${navSubTitleClass} mb-3 text-slate-900`}>
                    Notre actualité
                  </h3>
                  <div className="space-y-1">
                    <Link 
                      href="/actualites" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Nos actualités
                    </Link>
                    <Link 
                      href="/presse" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Espace presse
                    </Link>
                  </div>
                </div>

                {/* Photo de fin de section */}
                <div className="relative h-40 md:h-48 lg:h-56 rounded-lg overflow-hidden">
                  <Image
                    src="/images/menu/menu-domaine.jpg"
                    alt="Notre Domaine"
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Notre savoir-faire */}
            {hoveredMenu === 'savoir-faire' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Link 
                    href="/le-cycle-de-la-vigne" 
                    className={`text-base font-semibold tracking-wide transition-colors text-slate-900 hover:text-wine-gold py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold min-h-[44px] flex items-center`}
                    onClick={() => closeMenuImmediately()}
                  >
                    Le cycle de la vigne
                  </Link>
                </div>

                <div className="space-y-2">
                  <Link 
                    href="/de-la-vigne-a-la-bouteille" 
                    className={`text-base font-semibold tracking-wide transition-colors text-slate-900 hover:text-wine-gold py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold min-h-[44px] flex items-center`}
                    onClick={() => closeMenuImmediately()}
                  >
                    De la vigne à la bouteille
                  </Link>
                </div>

                {/* Photo de fin de section */}
                <div className="relative h-40 md:h-48 lg:h-56 rounded-lg overflow-hidden">
                  <Image
                    src="/images/menu/menu-savoir-faire.jpg"
                    alt="Notre savoir-faire"
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Nos vins */}
            {hoveredMenu === 'vins' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Nos Blancs */}
                <div className="space-y-2">
                  <h3 className={`${navSubTitleClass} mb-3 text-slate-900`}>
                    Nos Blancs
                  </h3>
                  <div className="space-y-1">
                    <Link 
                      href="/les-vins/methode-blanc" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Méthode Blanche
                    </Link>
                    <Link 
                      href="/les-vins/claire-de-lune" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Claire de Lune
                    </Link>
                    <Link 
                      href="/les-vins" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Toutes nos cuvées
                    </Link>
                  </div>
                </div>

                {/* Nos Rosés */}
                <div className="space-y-2">
                  <h3 className={`${navSubTitleClass} mb-3 text-slate-900`}>
                    Nos Rosés
                  </h3>
                  <div className="space-y-1">
                    <Link 
                      href="/les-vins/poussin-rose" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Poussin
                    </Link>
                    <Link 
                      href="/les-vins/petrichor-rose" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Petrichor
                    </Link>
                    <Link 
                      href="/les-vins" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Toutes nos cuvées
                    </Link>
                  </div>
                </div>

                {/* Nos Rouges */}
                <div className="space-y-2">
                  <h3 className={`${navSubTitleClass} mb-3 text-slate-900`}>
                    Nos Rouges
                  </h3>
                  <div className="space-y-1">
                    <Link 
                      href="/les-vins/opus-rouge" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Opus
                    </Link>
                    <Link 
                      href="/les-vins/petrichor-rouge" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Petrichor
                    </Link>
                    <Link 
                      href="/les-vins" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Toutes nos cuvées
                    </Link>
                  </div>
                </div>

                {/* Photo de fin de section */}
                <div className="relative h-40 md:h-48 lg:h-56 rounded-lg overflow-hidden">
                  <Image
                    src="/images/menu/menu-vins.jpg"
                    alt="Nos vins"
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Expériences */}
            {hoveredMenu === 'experiences' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Visites */}
                <div className="space-y-2">
                  <h3 className={`${navSubTitleClass} mb-3 text-slate-900`}>
                    Visites
                  </h3>
                  <div className="space-y-1">
                    <Link 
                      href="/reservation" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={(e) => {
                        e.stopPropagation()
                        closeMenuImmediately()
                      }}
                    >
                      Réservez votre instant
                    </Link>
                  </div>
                </div>

                {/* Evènements */}
                <div className="space-y-2">
                  <h3 className={`${navSubTitleClass} mb-3 text-slate-900`}>
                    Evènements
                  </h3>
                  <div className="space-y-1">
                    <Link 
                      href="/evenements" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={(e) => {
                        e.stopPropagation()
                        closeMenuImmediately()
                      }}
                    >
                      Nos évènements
                    </Link>
                    <Link 
                      href="/evenements/organiser" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={(e) => {
                        e.stopPropagation()
                        closeMenuImmediately()
                      }}
                    >
                      Organisez votre évènement
                    </Link>
                  </div>
                </div>

                {/* Partagez notre passion */}
                <div className="space-y-2">
                  <h3 className={`${navSubTitleClass} mb-3 text-slate-900`}>
                    Partagez notre passion
                  </h3>
                  <div className="space-y-1">
                    <Link 
                      href="/club" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Rejoignez notre club
                    </Link>
                    <Link 
                      href="/mecenat" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Mécénat
                    </Link>
                    <Link 
                      href="/gastronomie" 
                      className={`${navSubItemClass} text-slate-600 hover:text-slate-900 py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold focus:text-wine-gold min-h-[44px] flex items-center`}
                      onClick={() => closeMenuImmediately()}
                    >
                      Gastronomie
                    </Link>
                  </div>
                </div>

                {/* Photo de fin de section */}
                <div className="relative h-40 md:h-48 lg:h-56 rounded-lg overflow-hidden">
                  <Image
                    src="/images/menu/menu-experiences.jpg"
                    alt="Expériences"
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Gastronomie */}
            {hoveredMenu === 'gastronomie' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Link 
                    href="/gastronomie" 
                    className={`text-base font-semibold tracking-wide transition-colors text-slate-900 hover:text-wine-gold py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold min-h-[44px] flex items-center`}
                    onClick={() => closeMenuImmediately()}
                  >
                    Art de la table
                  </Link>
                </div>

                <div className="space-y-2">
                  <Link 
                    href="/degustation" 
                    className={`text-base font-semibold tracking-wide transition-colors text-slate-900 hover:text-wine-gold py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-wine-gold min-h-[44px] flex items-center`}
                    onClick={() => closeMenuImmediately()}
                  >
                    Dégustation
                  </Link>
                </div>

                {/* Photo de fin de section */}
                <div className="relative h-40 md:h-48 lg:h-56 rounded-lg overflow-hidden">
                  <Image
                    src="/images/menu/menu-experiences.jpg"
                    alt="Gastronomie"
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
