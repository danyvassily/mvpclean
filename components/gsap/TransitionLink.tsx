"use client";

import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import gsap from 'gsap';

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TransitionLink({ href, children, className, onClick }: TransitionLinkProps) {
  const router = useRouter();
  const isTransitioning = useRef(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Éviter les clics multiples pendant la transition
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    // Callback personnalisé s'il existe
    if (onClick) onClick();

    // Animation de sortie de la page courante
    const currentPage = document.querySelector('main, [data-page]');
    
    if (currentPage) {
      gsap.to(currentPage, {
        opacity: 0,
        y: -30,
        scale: 1.02,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          // Navigation vers la nouvelle page
          router.push(href);
          isTransitioning.current = false;
        },
      });

      // Animation des images qui disparaissent
      const images = currentPage.querySelectorAll('img');
      if (images.length > 0) {
        gsap.to(images, {
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          ease: "power2.in",
          stagger: 0.05,
        });
      }
    } else {
      // Fallback si aucun conteneur de page n'est trouvé
      router.push(href);
      isTransitioning.current = false;
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {children}
    </a>
  );
}
