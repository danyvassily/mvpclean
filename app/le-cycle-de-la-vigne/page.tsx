import { Metadata } from "next";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/gsap/TransitionLink";
import { SPACING } from "@/lib/constants";

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
    text: {
      kicker: "Hiver",
      title: "Le Repos de la Vigne",
      body: "L'hiver marque une période de repos pour la vigne. Les vignes dénudées attendent patiemment le retour des beaux jours. C'est aussi le moment de la taille, geste essentiel qui détermine la future récolte.",
    },
    image: {
      src: "/images/vineyard/vignes-hiver-chapelle-saint-vincent-d-avens-gaillac-france.jpeg",
      alt: "Vignes en hiver avec la chapelle Saint-Vincent d'Avens au Château Lastours, Gaillac",
      ratio: "21/9" as const,
    },
    layout: "text-first" as const,
  },
  {
    id: "debourrement",
    text: {
      kicker: "Printemps",
      title: "Le Débourrement : Le Réveil de la Vigne",
      body: "Au printemps, les bourgeons éclosent et la vigne se réveille. C'est le débourrement, moment magique où la vie reprend dans nos vignes. Les jeunes pousses vert tendre annoncent une nouvelle saison de croissance.",
    },
    image: {
      src: "/images/vineyard/debourrement-bourgeon-vignes-chateau-lastours-gaillac-france.jpg",
      alt: "Débourrement des bourgeons de vignes au Château Lastours, Gaillac, France",
      ratio: "16/9" as const,
    },
    layout: "image-first" as const,
  },
  {
    id: "palissage",
    text: {
      kicker: "Savoir-Faire",
      title: "Le Palissage : Guider la Croissance",
      body: "Le palissage est un travail minutieux qui guide la croissance des sarments. Cette technique ancestrale permet à nos vignes de capter la lumière optimale tout en favorisant une bonne circulation de l'air entre les grappes.",
    },
    image: {
      src: "/images/vineyard/travail-dans-la-vigne-palissage.jpg",
      alt: "Travail du palissage dans la vigne au Château Lastours",
      ratio: "21/9" as const,
    },
    layout: "text-first" as const,
  },
  {
    id: "veraison",
    text: {
      kicker: "Été",
      title: "La Véraison : La Maturation",
      body: "La véraison marque le début de la maturation des raisins. Moment magique où les baies changent de couleur et commencent à accumuler les sucres qui feront la richesse de nos vins. Les rouges virent au violet profond tandis que les blancs prennent des teintes dorées.",
    },
    image: {
      src: "/images/vineyard/grappe-de-raisins-en-veraison-chateau-lastours-gaillac-france.jpg",
      alt: "Grappe de raisins en véraison au Château Lastours, Gaillac, France",
      ratio: "16/9" as const,
    },
    layout: "image-first" as const,
  },
  {
    id: "cepages",
    text: {
      kicker: "Notre Terroir",
      title: "Nos Cépages : Blancs et Rouges",
      body: "Nos vignes cultivent une diversité de cépages, chacun avec sa personnalité. Des cépages blancs qui donneront des vins frais et élégants, aux cépages rouges qui révèleront la puissance et la complexité de notre terroir.",
    },
    image: {
      src: "/images/vineyard/plantier-cepage-braucol-chateau-lastours-gaillac-france.jpeg",
      alt: "Plantier de cépages Braucol au Château Lastours, Gaillac, France",
      ratio: "21/9" as const,
    },
    layout: "text-first" as const,
  },
  {
    id: "vendanges",
    text: {
      kicker: "Automne",
      title: "Les Vendanges : Aboutissement d'une Année",
      body: "Les vendanges représentent le moment tant attendu, l'aboutissement d'une année de travail et de patience. Nous vendangeons à maturité optimale, souvent manuellement pour préserver l'intégrité des grappes. Chaque parcelle est récoltée au moment idéal, déterminé par des dégustations régulières et des analyses précises.",
    },
    image: {
      src: "/images/vineyard/allee-de-vigne-grappe-de-raisins-mur-cepage-rouge.jpg",
      alt: "Allée de vigne avec grappes de raisins mûrs de cépages rouges au Château Lastours",
      ratio: "21/9" as const,
    },
    layout: "image-first" as const,
  },
];

export default function LeCycleDeLaVignePage() {
  return (
    <div className="min-h-screen relative bg-white" data-page="cycle-vigne">
      {/* Texture grain très subtile */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none texture-paper" />
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none texture-grain" />

      {/* Hero Section - Responsive */}
      <section className="image-text-section overlay-desktop relative mt-6 lg:mt-8">
        {/* Image Hero */}
        <div className="section-image" style={{height: '70vh'}}>
          <Image
            src="/images/vineyard/jardins-a-la-francaise-lever-de-soleil.jpeg"
            alt="Jardins à la française au lever du soleil au Château Lastours"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Texte Hero */}
        <div className="section-text">
          <div className="kicker">Savoir-Faire</div>
          <h1 style={{fontSize: '2rem', fontFamily: 'var(--font-serif)', fontWeight: 300, lineHeight: 1.1, marginBottom: '1rem'}}>
            Le cycle de la vigne
          </h1>
          <p style={{maxWidth: '600px', margin: '0 auto'}}>
            Découvrez les saisons qui rythment notre travail viticole, du débourrement aux vendanges. Un voyage à travers les moments essentiels qui façonnent nos vins d'exception.
          </p>
        </div>
      </section>

      {/* Sections image + texte - Responsive */}
      {cycleSections.map((section) => (
        <section 
          key={section.id}
          className="image-text-section overlay-desktop relative"
        >
          {/* Image */}
          <div className="section-image">
            <Image
              src={section.image.src}
              alt={section.image.alt}
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>

          {/* Texte */}
          <div className="section-text">
            {/* Kicker */}
            <div className="kicker">
              {section.text.kicker}
            </div>
            
            {/* Titre */}
            <h2>{section.text.title}</h2>
            
            {/* Corps */}
            <p>{section.text.body}</p>
          </div>
        </section>
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

