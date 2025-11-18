import Image from "next/image"
import { Download, FileText } from "lucide-react"

export default function PressePage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
      {/* Hero Section - Collé au header */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/asset/espace-presse/presse-vignoble-gaillac-chateau-lastours-france.jpg"
            alt="Vignoble du Château Lastours - Espace Presse"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/60" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-5xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light tracking-wide leading-tight mb-6 text-white drop-shadow-lg">
              Espace Presse
            </h1>
            <p className="text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto text-white/95 drop-shadow-md">
              Logos, kit média et ressources officielles
            </p>
          </div>
        </div>
      </section>

      {/* Section Contact Presse */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center space-y-6">
            <h2 className="text-2xl md:text-4xl font-serif font-light">Contact Presse</h2>
            <div className="w-24 h-px bg-gray-300 mx-auto"></div>
            <div className="space-y-2">
              <p className="text-lg text-gray-700 font-light">
                <strong className="font-medium">Email :</strong> presse@chateaux-lastours.fr
              </p>
              <p className="text-lg text-gray-700 font-light">
                <strong className="font-medium">Téléphone :</strong> +33 5 63 56 32 75
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Kit Presse & Logos Officiels */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {/* Titre de la section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-light mb-6">Kit Presse & Logos Officiels</h2>
            <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Retrouvez prochainement notre kit presse complet et les versions officielles du logo Château Lastours.
            </p>
          </div>

          {/* Grid Documents & Logos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Kit Presse */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <FileText className="w-6 h-6 text-gray-700" />
                <h3 className="text-xl md:text-2xl font-serif font-light">Kit Presse</h3>
              </div>
              <div className="space-y-4">
                <p className="text-base text-gray-600 leading-relaxed">
                  Présentation du domaine, historique, fiches techniques et visuels clés.
                </p>
                <div className="pt-2">
                  <button
                    disabled
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-400 cursor-not-allowed rounded-md transition-colors text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Dossier de presse (à venir)
                  </button>
                </div>
              </div>
            </div>

            {/* Logos Officiels */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-700">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
                <h3 className="text-xl md:text-2xl font-serif font-light">Logos Officiels</h3>
              </div>
              <div className="space-y-6">
                <p className="text-base text-gray-600 leading-relaxed">
                  Logo officiel du Château Lastours en haute définition. Cliquez sur l'image pour l'agrandir.
                </p>
                
                {/* Aperçu du logo - Cliquable */}
                <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                  <a 
                    href="/asset/espace-presse/logo-chateau-lastours-blason.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative group cursor-pointer"
                  >
                    <div className="relative aspect-square max-w-xs mx-auto bg-white rounded-lg p-6 transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                      <Image
                        src="/asset/espace-presse/logo-chateau-lastours-blason.png"
                        alt="Logo Château Lastours - Blason officiel"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      {/* Overlay au hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-700">
                            <path d="M21 21-6-6m2.5-3.5L2 2"/>
                            <circle cx="5" cy="5" r="3"/>
                            <circle cx="19" cy="19" r="3"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-4 group-hover:text-gray-700 transition-colors">
                      Cliquez pour voir en plein écran
                    </p>
                  </a>
                </div>

                {/* Boutons de téléchargement */}
                <div className="pt-2 space-y-3">
                  <a
                    href="/asset/espace-presse/logo-chateau-lastours-blason.png"
                    download="logo-chateau-lastours-blason.png"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white rounded-md transition-colors text-sm font-medium w-full md:w-auto"
                  >
                    <Download className="w-4 h-4" />
                    Télécharger le logo (PNG)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Visuels Libres de Droit */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-light mb-6">Visuels Libres de Droit</h2>
            <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Sélection d'images haute résolution pour vos publications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "/images/wines/french-wine-chateau-evening-event.png",
              "/images/wines/gamme-confidentielle.jpg",
              "/images/wines/gamme-domeni.jpg",
            ].map((src, index) => (
              <div key={src} className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden group">
                <Image 
                  src={src} 
                  alt={`Visuel presse Château Lastours ${index + 1}`}
                  fill 
                  className="object-cover transition-transform duration-300 group-hover:scale-105" 
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      </main>
    </div>
  )
}

