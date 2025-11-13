import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-display mb-8 text-foreground">Conditions Générales de Vente</h1>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 1 - Objet</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les présentes conditions générales de vente s'appliquent à toutes les ventes de vins et prestations de
                  services proposées par le Château Lastours, EARL de Faramond, immatriculée au RCS de Toulouse sous le
                  numéro 123 456 789.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 2 - Prix</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les prix sont indiqués en euros toutes taxes comprises (TTC). Ils sont valables pour la durée
                  mentionnée sur le site ou jusqu'à épuisement des stocks. Le Château Lastours se réserve le droit de
                  modifier ses prix à tout moment.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Les frais de livraison sont calculés en sus et indiqués avant la validation de la commande.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 3 - Commande</h2>
                <p className="text-muted-foreground leading-relaxed">Les commandes peuvent être passées :</p>
                <ul className="text-muted-foreground leading-relaxed list-disc pl-6">
                  <li>En ligne sur notre site internet</li>
                  <li>Par téléphone au 05 63 56 32 75</li>
                  <li>Directement au domaine</li>
                  <li>Par email à contact@chateau-lastours.com</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Toute commande implique l'acceptation pleine et entière des présentes conditions générales de vente.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 4 - Paiement</h2>
                <p className="text-muted-foreground leading-relaxed">Le paiement s'effectue :</p>
                <ul className="text-muted-foreground leading-relaxed list-disc pl-6">
                  <li>Par carte bancaire (paiement sécurisé)</li>
                  <li>Par chèque à l'ordre de "EARL de Faramond"</li>
                  <li>Par virement bancaire</li>
                  <li>En espèces pour les achats au domaine (dans la limite légale)</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Le paiement est exigible immédiatement à la commande. En cas de défaut de paiement, des pénalités de
                  retard au taux de 3 fois le taux d'intérêt légal seront appliquées.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 5 - Livraison</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les livraisons s'effectuent à l'adresse indiquée par l'acheteur. Les délais de livraison sont donnés à
                  titre indicatif :
                </p>
                <ul className="text-muted-foreground leading-relaxed list-disc pl-6">
                  <li>France métropolitaine : 2-4 jours ouvrés</li>
                  <li>Europe : 5-10 jours ouvrés</li>
                  <li>Retrait au domaine : immédiat sur rendez-vous</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Les frais de port sont offerts à partir de 120€ d'achat en France métropolitaine.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 6 - Droit de rétractation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Conformément à l'article L.121-21 du Code de la consommation, vous disposez d'un délai de 14 jours
                  francs pour exercer votre droit de rétractation sans avoir à justifier de motifs ni à payer de
                  pénalités.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Les produits doivent être retournés dans leur emballage d'origine, en parfait état. Les frais de
                  retour sont à la charge de l'acheteur.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 7 - Garanties</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nos vins sont garantis contre tout vice de fabrication. En cas de problème, contactez-nous dans les
                  48h suivant la réception. Nous nous engageons à remplacer ou rembourser tout produit défectueux.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 8 - Responsabilité</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le Château Lastours ne saurait être tenu responsable des dommages résultant d'un usage inapproprié des
                  produits vendus. La consommation d'alcool est déconseillée aux femmes enceintes et interdite aux
                  mineurs.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 9 - Litiges</h2>
                <p className="text-muted-foreground leading-relaxed">
                  En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les
                  tribunaux de Toulouse seront seuls compétents.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 10 - Médiation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Conformément à l'article L.616-1 du Code de la consommation, nous vous informons qu'en cas de litige,
                  vous pouvez recourir gratuitement au service de médiation de la consommation dont nous relevons :
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Médiateur de la consommation</strong>
                  <br />
                  BP 50 000
                  <br />
                  75001 Paris
                  <br />
                  www.mediation-consommation.fr
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
