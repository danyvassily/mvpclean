import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Mail } from "lucide-react"

export default function MecenatPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Collé au header */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden mt-20">
        <div className="absolute inset-0">
          <Image
            src="/asset/mecenat/musiciens-concert-de-jazz-chateau-lastours-gaillac-france.jpg"
            alt="Concert de jazz au Château Lastours - Mécénat culturel"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/50 to-black/65" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-5xl mx-auto px-4">
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md text-white text-xs font-medium tracking-widest uppercase border border-white/20">Mécénat</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide leading-tight mb-6 text-white drop-shadow-lg">Soutenir l'âme d'un lieu,<br />transmettre un héritage</h1>
            <p className="text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto text-white/95 drop-shadow-md">Au cœur du vignoble gaillacois dans le sud-ouest de la France, le Château Lastours incarne plus de cinq siècles d'histoire.</p>
          </div>
        </div>
      </section>

      {/* Section Introduction */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center space-y-6">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">Chaque pierre, chaque cep, chaque millésime raconte une aventure humaine et culturelle profondément enracinée dans son terroir.</p>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">Devenir mécène du Château Lastours, c'est participer à la préservation d'un patrimoine vivant.</p>
          </div>
        </div>
      </section>

      {/* Section Un engagement partagé */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-black/5 text-black text-xs font-medium tracking-widest uppercase">Engagement</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-light">Un engagement partagé</h2>
              <div className="space-y-4 text-base md:text-lg text-gray-600 leading-relaxed">
                <p>Le Château Lastours soutient la création artistique contemporaine et accueille des résidences d'artistes.</p>
                <p>Les œuvres présentées lors des événements sont vendues à but non lucratif.</p>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
              <Image
                src="/asset/mecenat/renovation-toiture-pigeonnier-chateau-lastours-gaillac-france.jpg"
                alt="Rénovation de la toiture du pigeonnier du Château Lastours"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Les axes du mécénat */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] order-2 lg:order-1">
              <Image
                src="/asset/mecenat/restauration-facade-piegonnier-sud-ouest-gaillac-france.jpg"
                alt="Restauration de la façade du pigeonnier sud-ouest - Château Lastours"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-black/5 text-black text-xs font-medium tracking-widest uppercase">Axes</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-light">Les axes du mécénat</h2>
              <p className="text-lg text-gray-600 leading-relaxed">Votre soutien contribue à :</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-base text-gray-600 leading-relaxed">La restauration et la sauvegarde du patrimoine architectural du domaine.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-base text-gray-600 leading-relaxed">La promotion des arts et de la culture.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-base text-gray-600 leading-relaxed">Le soutien aux artistes en résidence.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-base text-gray-600 leading-relaxed">Le développement durable du vignoble.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Mécénat individuel et d'entreprise */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-black/5 text-black text-xs font-medium tracking-widest uppercase">Mécénat</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light mb-6">Mécénat individuel et d'entreprise</h2>
            <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">Un partenariat d'émotion et de sens, ouvert à tous.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-2 h-2 bg-black rounded-full mx-auto"></div>
              <p className="text-base text-gray-600 leading-relaxed">Dons financiers ou en nature.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-2 h-2 bg-black rounded-full mx-auto"></div>
              <p className="text-base text-gray-600 leading-relaxed">Soutien d'événements culturels.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-2 h-2 bg-black rounded-full mx-auto"></div>
              <p className="text-base text-gray-600 leading-relaxed">Avantages fiscaux attractifs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA Final */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center space-y-8">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-black/5 text-black text-xs font-medium tracking-widest uppercase">Rejoignez-nous</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light">Rejoignez la communauté des mécènes</h2>
            <div className="w-24 h-px bg-gray-300 mx-auto"></div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">Vous contribuez à faire vivre un lieu qui croise mémoire, art et innovation viticole.</p>
            <div className="pt-6">
              <a 
                href="mailto:mecenat@chateau-lastours.com" 
                className="inline-flex items-center justify-center gap-2 bg-black text-white hover:bg-black/90 px-8 py-4 text-lg font-medium rounded-md transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
                <span>Nous contacter</span>
              </a>
            </div>
            <p className="text-sm text-gray-500 pt-4">mecenat@chateau-lastours.com</p>
          </div>
        </div>
      </section>
    </div>
  )
}

