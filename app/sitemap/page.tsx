import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function SitemapPage() {
  const siteStructure = [
    {
      title: "Accueil",
      url: "/",
      children: [],
    },
    {
      title: "Le Domaine",
      url: "/domaine",
      children: [
        { title: "Histoire", url: "/domaine/histoire" },
        { title: "Terroir", url: "/domaine/terroir" },
        { title: "L'Équipe", url: "/domaine/team" },
        { title: "Engagement", url: "/domaine/engagement" },
      ],
    },
    {
      title: "Actualités",
      url: "/actualites",
      children: [],
    },
    {
      title: "Savoir-Faire",
      url: "/savoir-faire",
      children: [
        { title: "Le cycle de la vigne", url: "/le-cycle-de-la-vigne" },
        { title: "De la vigne à la bouteille", url: "/de-la-vigne-a-la-bouteille" },
        { title: "Conservation", url: "/savoir-faire/conservation" },
        { title: "Service & Dégustation", url: "/savoir-faire/service-degustation" },
      ],
    },
    {
      title: "Presse",
      url: "/presse",
      children: [],
    },
    {
      title: "Nos Vins",
      url: "/les-vins",
      children: [
        { title: "Collection Doméni", url: "/les-vins?collection=domeni" },
        { title: "Collection Méthode", url: "/les-vins?collection=methode" },
        { title: "Collection Confidentielle", url: "/les-vins?collection=confidentielle" },
        { title: "Collection Poussin", url: "/les-vins?collection=poussin" },
        { title: "Collection Opus", url: "/les-vins?collection=opus" },
      ],
    },
    {
      title: "Gastronomie",
      url: "/gastronomie",
      children: [],
    },
    {
      title: "Expériences",
      url: "/experiences",
      children: [
        { title: "Réservation", url: "/reservation" },
        { title: "Événements", url: "/evenements" },
        { title: "Organiser un Événement", url: "/evenements/organiser" },
        { title: "Club Lastours", url: "/club" },
        { title: "Inscription Club", url: "/club/inscription" },
      ],
    },
    {
      title: "Mécénat",
      url: "/mecenat",
      children: [],
    },
    {
      title: "Mon Compte",
      url: "/compte",
      children: [],
    },
    {
      title: "Panier",
      url: "/panier",
      children: [],
    },
    {
      title: "Support",
      url: "/support",
      children: [
        { title: "FAQ", url: "/faq" },
        { title: "Nous contacter", url: "/contact" },
      ],
    },
    {
      title: "Informations Légales",
      url: "/legal",
      children: [
        { title: "Mentions Légales", url: "/mentions-legales" },
        { title: "Conditions Générales de Vente", url: "/cgv" },
        { title: "Conditions Générales d'Utilisation", url: "/cgu" },
        { title: "Politique de Cookies", url: "/cookies" },
        { title: "Plan du Site", url: "/sitemap" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header et Footer sont déjà dans le layout.tsx */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-display mb-8 text-foreground">Plan du Site</h1>
            <p className="text-lg text-muted-foreground mb-12">
              Découvrez toutes les pages et sections de notre site internet
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {siteStructure.map((section, index) => (
                <div key={index} className="space-y-4">
                  <div className="border-b border-border pb-2">
                    <Link
                      href={section.url}
                      className="text-xl font-display text-foreground hover:text-accent transition-colors flex items-center gap-2"
                    >
                      {section.title}
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                  {section.children.length > 0 && (
                    <ul className="space-y-2 pl-4">
                      {section.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <Link
                            href={child.url}
                            className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2"
                          >
                            {child.title}
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-16 p-6 bg-muted/30 rounded-lg">
              <h2 className="text-2xl font-display mb-4 text-foreground">Informations Techniques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Technologies utilisées</h3>
                  <ul className="space-y-1">
                    <li>• Next.js 14 (React Framework)</li>
                    <li>• TypeScript</li>
                    <li>• Tailwind CSS</li>
                    <li>• Vercel (Hébergement)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Accessibilité</h3>
                  <ul className="space-y-1">
                    <li>• Conforme WCAG 2.1 AA</li>
                    <li>• Navigation au clavier</li>
                    <li>• Lecteurs d'écran compatibles</li>
                    <li>• Contrastes optimisés</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}
