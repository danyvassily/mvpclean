import { Metadata } from "next";
import { HeroMinimal } from "@/components/common/HeroMinimal";
import { StorySection } from "@/components/common/StorySection";
import { TransitionLink } from "@/components/gsap/TransitionLink";
import { SPACING } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Le cycle de la vigne | Château Lastours",
  description: "Découvrez le cycle de la vigne au Château Lastours, du débourrement aux vendanges, en passant par la véraison et le palissage. Un voyage à travers les saisons qui rythment notre travail viticole.",
  openGraph: {
    title: "Le cycle de la vigne | Château Lastours",
    description: "Découvrez le cycle de la vigne au Château Lastours",
    images: ["/images/vineyard/jardins-a-la-francaise-lever-de-soleil.jpeg"],
  },
};

/**
 * Sections du cycle de la vigne
 * IMPORTANT: Les textes doivent être extraits depuis /public/asset/le-cycle-de-la-vigne/la-vigne-fr.docx
 * Pour l'instant, structure basée sur les images disponibles dans l'ASSET
 */
const cycleSections = [
  {
    id: "hiver",
    kicker: "Hiver",
    title: "Le Repos de la Vigne",
    content: "L'hiver marque une période de repos pour la vigne. Les vignes dénudées attendent patiemment le retour des beaux jours. C'est aussi le moment de la taille, geste essentiel qui détermine la future récolte.",
    imageSrc: "/images/vineyard/vignes-hiver-chapelle-saint-vincent-d-avens-gaillac-france.jpeg",
    imageAlt: "Vignes en hiver avec la chapelle Saint-Vincent d'Avens au Château Lastours, Gaillac",
    layout: "image-left" as const,
  },
  {
    id: "debourrement",
    kicker: "Printemps",
    title: "Le Débourrement : Le Réveil de la Vigne",
    content: "Au printemps, les bourgeons éclosent et la vigne se réveille. C'est le débourrement, moment magique où la vie reprend dans nos vignes. Les jeunes pousses vert tendre annoncent une nouvelle saison de croissance.",
    imageSrc: "/images/vineyard/debourrement-bourgeon-vignes-chateau-lastours-gaillac-france.jpg",
    imageAlt: "Débourrement des bourgeons de vignes au Château Lastours, Gaillac, France",
    layout: "image-right" as const,
  },
  {
    id: "palissage",
    kicker: "Savoir-Faire",
    title: "Le Palissage : Guider la Croissance",
    content: "Le palissage est un travail minutieux qui guide la croissance des sarments. Cette technique ancestrale permet à nos vignes de capter la lumière optimale tout en favorisant une bonne circulation de l'air entre les grappes.",
    imageSrc: "/images/vineyard/travail-dans-la-vigne-palissage.jpg",
    imageAlt: "Travail du palissage dans la vigne au Château Lastours",
    layout: "image-left" as const,
  },
  {
    id: "veraison",
    kicker: "Été",
    title: "La Véraison : La Maturation",
    content: "La véraison marque le début de la maturation des raisins. Moment magique où les baies changent de couleur et commencent à accumuler les sucres qui feront la richesse de nos vins. Les rouges virent au violet profond tandis que les blancs prennent des teintes dorées.",
    imageSrc: "/images/vineyard/grappe-de-raisins-en-veraison-chateau-lastours-gaillac-france.jpg",
    imageAlt: "Grappe de raisins en véraison au Château Lastours, Gaillac, France",
    layout: "image-right" as const,
  },
  {
    id: "cepages",
    kicker: "Notre Terroir",
    title: "Nos Cépages : Blancs et Rouges",
    content: "Nos vignes cultivent une diversité de cépages, chacun avec sa personnalité. Des cépages blancs qui donneront des vins frais et élégants, aux cépages rouges qui révèleront la puissance et la complexité de notre terroir.",
    imageSrc: "/images/vineyard/plantier-cepage-braucol-chateau-lastours-gaillac-france.jpeg",
    imageAlt: "Plantier de cépages Braucol au Château Lastours, Gaillac, France",
    layout: "image-left" as const,
  },
  {
    id: "vendanges",
    kicker: "Automne",
    title: "Les Vendanges : Aboutissement d'une Année",
    content: "Les vendanges représentent le moment tant attendu, l'aboutissement d'une année de travail et de patience. Nous vendangeons à maturité optimale, souvent manuellement pour préserver l'intégrité des grappes. Chaque parcelle est récoltée au moment idéal, déterminé par des dégustations régulières et des analyses précises.",
    imageSrc: "/images/vineyard/allee-de-vigne-grappe-de-raisins-mur-cepage-rouge.jpg",
    imageAlt: "Allée de vigne avec grappes de raisins mûrs de cépages rouges au Château Lastours",
    layout: "image-right" as const,
  },
];

export default function LeCycleDeLaVignePage() {
  return (
    <div className="min-h-screen relative bg-white" data-page="cycle-vigne">
      {/* Hero Section - Style Ruinart minimaliste */}
      <HeroMinimal
        imageSrc="/images/vineyard/jardins-a-la-francaise-lever-de-soleil.jpeg"
        title="Le Cycle de la Vigne"
        subtitle="Un voyage à travers les saisons qui rythment notre travail viticole."
      />

      {/* Sections éditoriales - Style Ruinart : Image + Texte séparés */}
      {cycleSections.map((section) => (
        <StorySection
          key={section.id}
          id={section.id}
          title={section.title}
          kicker={section.kicker}
          content={section.content}
          imageSrc={section.imageSrc}
          imageAlt={section.imageAlt}
          layout={section.layout}
          className="mb-8 lg:mb-12"
        />
      ))}

      {/* Footer local - Style Histoire */}
      <section className="py-24 lg:py-32 xl:py-40 relative z-10 bg-white">
        <div className={SPACING.container}>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
              {/* Texte CTA */}
              <div className="lg:col-span-7 text-center lg:text-left">
                <div className="space-y-8">
                  <div className="w-32 h-px bg-gradient-to-r from-transparent via-slate-500/60 to-transparent mx-auto lg:mx-0" />
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 tracking-[0.02em] font-light leading-[1.1]">
                    Découvrez nos visites
                  </h3>
                  <p className="text-xl md:text-2xl leading-relaxed text-slate-600 font-light tracking-wide">
                    Venez découvrir notre domaine et nos vignes lors d'une visite guidée.
                  </p>
                </div>
              </div>
              
              {/* CTA button */}
              <div className="lg:col-span-5 text-center lg:text-right">
                <TransitionLink 
                  href="/reservation"
                  className="inline-flex items-center px-16 py-6 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white font-light text-lg tracking-wide transition-all duration-700 backdrop-blur-sm hover:scale-[1.02] shadow-2xl group focus:outline-none focus:ring-2 focus:ring-wine-gold focus:ring-offset-2 min-h-[44px]"
                >
                  Réservez votre visite
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

