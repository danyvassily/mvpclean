"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export function LoadingOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Afficher l'overlay pendant la transition
    setIsVisible(true);

    // Animation d'apparition de l'overlay
    gsap.fromTo(
      overlay,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      }
    );

    // Animation des particules de grain
    const grainAnimation = gsap.to(overlay, {
      backgroundPosition: "100px 100px",
      duration: 2,
      ease: "none",
      repeat: -1,
    });

    // Masquer l'overlay après un délai
    const hideTimer = setTimeout(() => {
      gsap.to(overlay, {
        opacity: 0,
        scale: 1.1,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setIsVisible(false);
          grainAnimation.kill();
        },
      });
    }, 800);

    return () => {
      clearTimeout(hideTimer);
      grainAnimation.kill();
    };
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      style={{
        background: `
          linear-gradient(135deg, rgba(15,15,15,0.95) 0%, rgba(25,25,30,0.98) 50%, rgba(15,15,15,0.95) 100%),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
        `,
        backgroundSize: 'cover, 100px 100px',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Logo ou indicateur de chargement */}
      <div className="text-center space-y-6">
        <div className="w-16 h-16 border-2 border-white/30 rounded-full animate-spin border-t-white/70 mx-auto"></div>
        <div className="text-white/80 text-sm font-light tracking-widest uppercase">
          Château Lastours
        </div>
      </div>
    </div>
  );
}
