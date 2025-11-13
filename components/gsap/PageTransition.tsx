"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Animation d'entrée de la page
    gsap.fromTo(
      container,
      {
        opacity: 0,
        y: 50,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.1,
      }
    );

    // Animation de grain qui apparaît progressivement
    const grainElements = container.querySelectorAll('.grain, .grain-subtle, .grain-heavy');
    if (grainElements.length > 0) {
      gsap.fromTo(
        grainElements,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power1.inOut",
          delay: 0.3,
        }
      );
    }

    // Animation des éléments texte
    const textElements = container.querySelectorAll('h1, h2, h3, p, .text-block');
    if (textElements.length > 0) {
      gsap.fromTo(
        textElements,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.4,
        }
      );
    }

    // Animation des images
    const imageElements = container.querySelectorAll('img, [role="img"]');
    if (imageElements.length > 0) {
      gsap.fromTo(
        imageElements,
        {
          opacity: 0,
          scale: 1.1,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          stagger: 0.15,
          delay: 0.6,
        }
      );
    }

  }, [pathname]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen"
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </div>
  );
}
