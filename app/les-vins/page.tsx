import { Metadata } from "next";
import { HeroStandard } from "@/components/common/HeroStandard";
import { WineGrid } from "@/components/wines/WineGrid";
import { gammes } from "@/lib/wines";

export const metadata: Metadata = {
  title: "Nos Cuvées | Collections d'Exception - Château Lastours",
  description: "Découvrez toutes nos cuvées de vins d'exception : Doméni, Opus, Méthode Traditionnelle, Poussin, Petrichor et Signatures."
};

/**
 * Page Nos Vins - Refactorisée style Ruinart
 * 
 * Structure :
 * - Hero avec image + titre + sous-titre
 * - Grilles de vins par gamme
 * - Fond blanc, marges respirantes
 * - Responsive : 1 col mobile, 2 tablette, 3 desktop
 */
export default function WinesPage() {
  return (
    <div className="min-h-screen bg-white" data-page="wines">
      {/* Hero Section - Style Ruinart épuré */}
      <HeroStandard
        imageSrc="/images/wines/vin-blanc-rouge-rose-bulles-gaillac-sud-ouest-france.jpg"
        title="Nos Cuvées d'Exception"
        subtitle="Vivez l'émotion Lastours : des arômes captivants, des instants à partager, l'expression pure de notre art du vin."
      />

      {/* Gammes Section - Une grille par gamme */}
      {gammes.map((gamme) => {
        // Préparer les données pour WineGrid
        const winesData = gamme.cuvees.map((cuvee) => ({
          name: cuvee.title,
          slug: cuvee.slug,
          appellation: "AOP Gaillac",
          color: cuvee.colorTag,
          gamme: gamme.title,
          description: undefined, // Pas de description pour rester épuré
          image: cuvee.image || "",
          imageAlt: `${cuvee.title} - Château Lastours AOP Gaillac`
        }))

        return (
          <WineGrid
            key={gamme.id}
            wines={winesData}
            title={gamme.title}
            subtitle={gamme.description}
            columns={{
              mobile: 1,
              tablet: 2,
              desktop: 3
            }}
          />
        )
      })}
    </div>
  );
}
