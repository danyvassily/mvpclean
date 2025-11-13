"use client"

import { useCallback } from 'react'

export function useWineModal() {
  const openModal = useCallback((imagePath: string, altText: string) => {
    // Créer et afficher le modal
    const modal = document.createElement('div')
    modal.id = 'wine-modal'
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/80'
    modal.style.backdropFilter = 'blur(10px)'
    
    modal.innerHTML = `
      <div class="relative w-[45vw] h-[45vw] max-w-[90vmin] max-h-[90vmin] flex items-center justify-center">
        <button id="close-modal" class="absolute -top-12 -right-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 z-10 hover:scale-110" aria-label="Fermer l'image agrandie">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <img src="${imagePath}" alt="${altText}" class="w-full h-full object-contain filter brightness-110" style="box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8)" />
      </div>
    `
    
    document.body.appendChild(modal)
    document.body.style.overflow = 'hidden'
    
    // Gestionnaire de fermeture
    const closeModal = () => {
      const existingModal = document.getElementById('wine-modal')
      if (existingModal) {
        document.body.removeChild(existingModal)
        document.body.style.overflow = 'auto'
      }
    }
    
    // Fermer en cliquant sur le backdrop
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal()
    })
    
    // Fermer avec le bouton X
    modal.querySelector('#close-modal')?.addEventListener('click', closeModal)
    
    // Fermer avec Escape
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
        document.removeEventListener('keydown', handleEscape)
      }
    }
    document.addEventListener('keydown', handleEscape)
  }, [])

  return { openModal }
}
