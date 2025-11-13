import { Metadata } from "next";
import { HeroMinimal } from "@/components/common/HeroMinimal";
import { EngagementCard } from "@/components/engagements/EngagementCard";
import { CTAGroup } from "@/components/vignoble/CTAGroup";

export const metadata: Metadata = {
  title: "Nos Engagements Écoresponsables | Château Lastours",
  description: "Découvrez les engagements écoresponsables du Château Lastours, domaine viticole certifié HVE en Gaillac, engagé pour une viticulture durable et respectueuse de l'environnement.",
  openGraph: {
    title: "Nos Engagements Écoresponsables | Château Lastours",
    description: "Une viticulture durable en plein cœur du Sud-Ouest français.",
    images: ["/images/vineyard/coucher-de-soleil-vignes-chateau-lastours-aop-aoc-gaillac-france.jpeg"],
  },
};

// Contenu des sections d'engagement depuis les ASSETS
const engagementSections = [
  {
    id: "certification-hve",
    kicker: "Viticulture Durable",
    title: "Certification HVE - Haute Valeur Environnementale",
    body: "La Certification HVE3 (Haute Valeur Environnementale niveau 3) est une démarche engagée par les viticulteurs soucieux de leur impact écologique. En obtenant cette certification, nous mettons en avant notre volonté d'adopter une viticulture durable, tout en garantissant la qualité de nos vins à travers des pratiques agricoles respectueuses de la biodiversité, de la gestion de l'eau, de la réduction de l'usage de produits phytosanitaires, et de la maintenance d'un espace naturel équilibré.",
    imageSrc: "/images/engagements/libellule-rouge-vigne-grappe-de-raisin.jpg",
    imageAlt: "Libellule rouge sur vigne et grappe de raisin - Biodiversité au Château Lastours",
    layout: "image-first" as const,
    logo: "/images/engagements/logo-hve3.png",
  },
  {
    id: "zero-insecticides",
    kicker: "Agriculture Raisonnée",
    title: "Zéro Insecticides",
    body: "La confusion sexuelle est une méthode de lutte biologique contre certains ravageurs de la grappe que nous avons mis en place au domaine. Nous diffusons des phéromones femelles pour désorienter les mâles afin d'empêcher leur reproduction.",
    imageSrc: "/images/engagements/nos-engagements-agriculture-raisonnee.jpg",
    imageAlt: "Agriculture raisonnée - Confusion sexuelle dans les vignes du Château Lastours",
    layout: "text-first" as const,
  },
  {
    id: "terre-preservee",
    kicker: "Patrimoine Naturel",
    title: "Une Terre préservée, un patrimoine valorisé",
    body: "Notre domaine s'étend sur des terres cultivées dans le respect des équilibres naturels. Nous favorisons les pratiques douces : travail mécanique des sols, enherbement naturel, traitements alternatifs et limitation des intrants chimiques. L'objectif : laisser à la nature toute sa place et produire des vins authentiques, reflet de notre terroir.",
    imageSrc: "/images/engagements/fleurs-roses-tronc-de-vigne.jpg",
    imageAlt: "Fleurs roses sur tronc de vigne - Vignoble préservé du Château Lastours",
    layout: "image-first" as const,
  },
  {
    id: "evenements-responsables",
    kicker: "Événements Durables",
    title: "Des Événements Responsables",
    body: "Organisez vos mariages, séminaires ou événements d'entreprise dans un cadre exceptionnel et engagé. Nous mettons un point d'honneur à proposer des services écoresponsables : partenariats avec traiteurs locaux, valorisation des circuits courts, recyclage et limitation des déchets. Offrez à vos invités une expérience aussi mémorable que durable.",
    imageSrc: "/images/engagements/mobilier-upcycle-chateau-lastours-gaillac.jpg",
    imageAlt: "Mobilier upcyclé - Événements écoresponsables au Château Lastours",
    layout: "text-first" as const,
  },
];

/**
 * Page Nos Engagements - Refactorisée style Ruinart
 * 
 * Structure :
 * - Hero avec image + titre + sous-titre
 * - Introduction centrée
 * - Sections d'engagement (image + texte alternés)
 * - CTA de fin de page
 * 
 * Responsive :
 * - Mobile/Tablette : Image puis texte (stack vertical)
 * - Desktop : Image et texte côte à côte (alternance)
 */
export default function EngagementPage() {
  return (
    <div className="min-h-screen bg-white" data-page="engagement">
      {/* Hero Section - Style Ruinart minimaliste */}
      <HeroMinimal
        imageSrc="/images/vineyard/coucher-de-soleil-vignes-chateau-lastours-aop-aoc-gaillac-france.jpeg"
        title="Nos Engagements"
        subtitle="Découvrez notre démarche pour une viticulture durable et respectueuse de l'environnement."
      />

      {/* Introduction centrée */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-base md:text-lg leading-relaxed text-slate-700 font-light">
              La Certification HVE3 (Haute Valeur Environnementale niveau 3) est une démarche engagée 
              par les viticulteurs soucieux de leur impact écologique. Au Château Lastours, nous mettons 
              en avant notre volonté d'adopter une viticulture durable, tout en garantissant la qualité 
              de nos vins à travers des pratiques agricoles respectueuses de la biodiversité, de la gestion 
              de l'eau, de la réduction de l'usage de produits phytosanitaires, et de la maintenance d'un 
              espace naturel équilibré.
            </p>
          </div>
        </div>
      </section>

      {/* Sections d'engagement */}
      {engagementSections.map((section) => (
        <EngagementCard
          key={section.id}
          kicker={section.kicker}
          title={section.title}
          body={section.body}
          imageSrc={section.imageSrc}
          imageAlt={section.imageAlt}
          layout={section.layout}
          logo={section.logo}
        />
      ))}

      {/* CTA de fin de page */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 text-slate-900">
            Découvrez Notre Domaine
          </h2>
          <p className="text-base md:text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
            Réservez votre visite et plongez dans l'univers de nos engagements
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="/reservation"
              className="inline-flex items-center justify-center min-h-[44px] px-8 py-4 bg-slate-700 hover:bg-slate-800 text-white font-medium text-lg tracking-wide transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
            >
              Réservez votre visite
            </a>
            <a
              href="/les-vins"
              className="inline-flex items-center justify-center min-h-[44px] px-8 py-4 bg-white hover:bg-slate-100 border-2 border-slate-300 hover:border-slate-400 text-slate-900 font-medium text-lg tracking-wide transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
            >
              Découvrir nos vins
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
