import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-display mb-8 text-foreground">Politique de Cookies</h1>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Qu'est-ce qu'un cookie ?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Un cookie est un petit fichier texte déposé sur votre ordinateur, tablette ou smartphone lorsque vous
                  visitez un site internet. Il permet au site de mémoriser vos actions et préférences pendant une
                  période donnée.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Cookies utilisés sur notre site</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-display mb-3 text-foreground">Cookies essentiels</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés :
                    </p>
                    <ul className="text-muted-foreground leading-relaxed list-disc pl-6">
                      <li>Cookies de session pour maintenir votre connexion</li>
                      <li>Cookies de panier pour mémoriser vos achats</li>
                      <li>Cookies de sécurité pour protéger contre les attaques</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-display mb-3 text-foreground">Cookies de performance</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Ces cookies nous aident à comprendre comment vous utilisez notre site :
                    </p>
                    <ul className="text-muted-foreground leading-relaxed list-disc pl-6">
                      <li>Google Analytics pour les statistiques de visite</li>
                      <li>Cookies de mesure d'audience</li>
                      <li>Cookies d'optimisation des performances</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-display mb-3 text-foreground">Cookies de fonctionnalité</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Ces cookies améliorent votre expérience sur notre site :
                    </p>
                    <ul className="text-muted-foreground leading-relaxed list-disc pl-6">
                      <li>Mémorisation de vos préférences (langue, région)</li>
                      <li>Personnalisation du contenu</li>
                      <li>Fonctionnalités de partage sur les réseaux sociaux</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-display mb-3 text-foreground">Cookies publicitaires</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Ces cookies permettent de vous proposer des publicités pertinentes :
                    </p>
                    <ul className="text-muted-foreground leading-relaxed list-disc pl-6">
                      <li>Cookies de ciblage publicitaire</li>
                      <li>Cookies de mesure de l'efficacité publicitaire</li>
                      <li>Cookies de remarketing</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Durée de conservation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  La durée de conservation des cookies varie selon leur type :
                </p>
                <ul className="text-muted-foreground leading-relaxed list-disc pl-6">
                  <li>Cookies de session : supprimés à la fermeture du navigateur</li>
                  <li>Cookies persistants : conservés de 1 mois à 2 ans maximum</li>
                  <li>Cookies analytiques : conservés 26 mois maximum</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Gestion des cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vous pouvez contrôler et gérer les cookies de plusieurs façons :
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground">Paramètres du navigateur</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies :
                    </p>
                    <ul className="text-muted-foreground leading-relaxed list-disc pl-6">
                      <li>
                        <strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies
                      </li>
                      <li>
                        <strong>Firefox :</strong> Préférences → Vie privée et sécurité → Cookies
                      </li>
                      <li>
                        <strong>Safari :</strong> Préférences → Confidentialité → Cookies
                      </li>
                      <li>
                        <strong>Edge :</strong> Paramètres → Cookies et autorisations de site
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground">Outils de désactivation</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Vous pouvez également utiliser des outils spécialisés :
                    </p>
                    <ul className="text-muted-foreground leading-relaxed list-disc pl-6">
                      <li>
                        Google Analytics :{" "}
                        <a
                          href="https://tools.google.com/dlpage/gaoptout"
                          className="text-accent hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Module de désactivation
                        </a>
                      </li>
                      <li>
                        Publicité ciblée :{" "}
                        <a
                          href="http://www.youronlinechoices.com/fr/"
                          className="text-accent hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Your Online Choices
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Conséquences du refus des cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le refus de certains cookies peut affecter votre expérience sur notre site :
                </p>
                <ul className="text-muted-foreground leading-relaxed list-disc pl-6">
                  <li>Impossibilité de mémoriser vos préférences</li>
                  <li>Fonctionnalités limitées (panier, connexion)</li>
                  <li>Contenu moins personnalisé</li>
                  <li>Publicités moins pertinentes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Pour toute question concernant notre politique de cookies, vous pouvez nous contacter :
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Email : contact@chateau-lastours.com
                  <br />
                  Téléphone : 05 63 56 32 75
                  <br />
                  Adresse : Château Lastours, 81150 Lastours, France
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display mb-4 text-foreground">Mise à jour</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cette politique de cookies peut être mise à jour périodiquement. Nous vous encourageons à la consulter
                  régulièrement pour rester informé de nos pratiques.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Dernière mise à jour :</strong> Janvier 2024
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
