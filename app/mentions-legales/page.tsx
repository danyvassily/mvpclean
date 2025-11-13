import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-display mb-8 text-foreground">Mentions Légales</h1>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-display mb-4 text-foreground">Éditeur du site</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Château Lastours</strong>
                  <br />
                  EARL de Faramond
                  <br />
                  81150 Lastours
                  <br />
                  France
                  <br />
                  <br />
                  Téléphone : 05 63 56 32 75
                  <br />
                  Email : contact@chateau-lastours.com
                  <br />
                  <br />
                  Directeur de la publication : Louis de Faramond
                  <br />
                  SIRET : 123 456 789 00012
                  <br />
                  TVA Intracommunautaire : FR12 123456789
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display mb-4 text-foreground">Hébergement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ce site est hébergé par :
                  <br />
                  <strong>Vercel Inc.</strong>
                  <br />
                  340 S Lemon Ave #4133
                  <br />
                  Walnut, CA 91789
                  <br />
                  États-Unis
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display mb-4 text-foreground">Propriété intellectuelle</h2>
                <p className="text-muted-foreground leading-relaxed">
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la
                  propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents
                  téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est
                  formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display mb-4 text-foreground">Protection des données personnelles</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général
                  sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de
                  suppression et d'opposition aux données personnelles vous concernant.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Pour exercer ces droits, vous pouvez nous contacter à l'adresse : contact@chateau-lastours.com
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display mb-4 text-foreground">Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ce site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de
                  visite. En continuant votre navigation, vous acceptez l'utilisation de ces cookies.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Pour plus d'informations sur notre politique de cookies, consultez notre{" "}
                  <a href="/cookies" className="text-accent hover:underline">
                    page dédiée
                  </a>
                  .
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display mb-4 text-foreground">Responsabilité</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à
                  différentes périodes de l'année, mais peut toutefois contenir des inexactitudes ou des omissions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir
                  le signaler par email, à l'adresse contact@chateau-lastours.com, en décrivant le problème de la façon
                  la plus précise possible.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-display mb-4 text-foreground">Droit applicable</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tout litige en relation avec l'utilisation du site www.chateau-lastours.com est soumis au droit
                  français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Toulouse.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
