import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-display mb-8 text-foreground">Conditions Générales d'Utilisation</h1>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 1 - Objet</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les présentes conditions générales d'utilisation (CGU) ont pour objet de définir les modalités et
                  conditions d'utilisation du site internet www.chateau-lastours.com ainsi que les services proposés.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 2 - Acceptation des CGU</h2>
                <p className="text-muted-foreground leading-relaxed">
                  L'utilisation du site implique l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez
                  pas ces conditions, nous vous invitons à ne pas utiliser nos services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 3 - Accès au site</h2>
                <p className="text-muted-foreground leading-relaxed">
                  L'accès au site est gratuit. Cependant, certains services peuvent être payants. Le site est accessible
                  24h/24, 7j/7, sauf en cas de maintenance ou de force majeure.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  L'utilisateur est responsable de son équipement informatique et de sa connexion internet.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 4 - Utilisation du site</h2>
                <p className="text-muted-foreground leading-relaxed">
                  L'utilisateur s'engage à utiliser le site de manière loyale et conforme à sa destination. Il est
                  interdit de :
                </p>
                <ul className="text-muted-foreground leading-relaxed list-disc pl-6">
                  <li>Utiliser le site à des fins illégales ou non autorisées</li>
                  <li>Tenter d'accéder aux systèmes informatiques de manière non autorisée</li>
                  <li>Diffuser des contenus illicites, diffamatoires ou portant atteinte aux droits de tiers</li>
                  <li>Perturber le fonctionnement du site</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 5 - Compte utilisateur</h2>
                <p className="text-muted-foreground leading-relaxed">
                  La création d'un compte utilisateur peut être nécessaire pour accéder à certains services.
                  L'utilisateur s'engage à fournir des informations exactes et à les maintenir à jour.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  L'utilisateur est responsable de la confidentialité de ses identifiants de connexion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 6 - Propriété intellectuelle</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tous les éléments du site (textes, images, vidéos, logos, etc.) sont protégés par le droit d'auteur et
                  appartiennent au Château Lastours ou à ses partenaires.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Toute reproduction, représentation, modification ou adaptation sans autorisation expresse est
                  interdite.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 7 - Protection des données</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le Château Lastours s'engage à protéger les données personnelles de ses utilisateurs conformément au
                  RGPD. Pour plus d'informations, consultez notre politique de confidentialité.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 8 - Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le site utilise des cookies pour améliorer l'expérience utilisateur. L'utilisateur peut configurer son
                  navigateur pour refuser les cookies, mais cela peut affecter le fonctionnement du site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 9 - Responsabilité</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le Château Lastours met tout en œuvre pour assurer la fiabilité des informations diffusées, mais ne
                  peut garantir l'exactitude, la complétude ou l'actualité de toutes les informations.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  L'utilisateur utilise le site sous sa propre responsabilité.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 10 - Modification des CGU</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le Château Lastours se réserve le droit de modifier les présentes CGU à tout moment. Les nouvelles
                  conditions seront applicables dès leur mise en ligne.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Article 11 - Droit applicable</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux de Toulouse seront
                  compétents.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
