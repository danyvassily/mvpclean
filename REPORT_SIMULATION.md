# REPORT_SIMULATION.md

## Rapport de création - Système de Simulation de Devis Événementiel

Date: 2025-01-XX

---

## 1. Vue d'ensemble

Système complet de simulation de devis pour les événements au Château Lastours, incluant :
- Calcul en temps réel avec debounce
- Gestion des espaces et options configurables
- Vérification de disponibilité
- Validation et paiement (stub Stripe)
- Interface élégante et accessible

---

## 2. Schémas de données

### 2.1 Espace

```typescript
interface Espace {
  id: string                    // Identifiant unique (ex: "salle-chai")
  titre: string                 // Nom de l'espace
  description: string            // Description détaillée
  image: string                 // Chemin ASSET (ex: "/ASSET/espaces/chai.jpg")
  capaciteMax?: number          // Capacité maximale en personnes
  tarifBaseHT: number          // Tarif de location de base HT (ex: 1200)
  tarifParPersonneHT?: number  // Tarif par personne HT si applicable (ex: 0)
  surface_m2?: number           // Surface en m²
  ordre?: number                // Ordre d'affichage
  slug?: string                 // Slug URL-friendly
  actif: boolean                // Disponibilité
}
```

**Exemple :**
```json
{
  "id": "salle-chai",
  "titre": "La Salle du Chai",
  "description": "Située dans l'ancien chai à barriques...",
  "image": "/Page/Organiser votre evenement - ok et inclure cta pour renvoyer ver vos événement/salle-de-réception-evenements-familials-professionnels.JPG",
  "capaciteMax": 80,
  "tarifBaseHT": 1200,
  "tarifParPersonneHT": 0,
  "surface_m2": 100,
  "actif": true
}
```

### 2.2 Option

```typescript
interface Option {
  id: string                           // Identifiant unique (ex: "traiteur-signature")
  titre: string                        // Nom de l'option
  description?: string                 // Description optionnelle
  type: "forfait" | "par_personne" | "par_unite"
  prixHT: number                      // Prix unitaire HT
  unite?: "personne" | "unité"         // Unité de facturation
  actif: boolean                       // Disponibilité
}
```

**Exemples :**
```json
{
  "id": "traiteur-signature",
  "titre": "Traiteur Signature",
  "description": "Menu 3 services avec produits locaux",
  "type": "par_personne",
  "prixHT": 35,
  "unite": "personne",
  "actif": true
}
```

```json
{
  "id": "sono",
  "titre": "Sonorisation",
  "description": "Système son complet",
  "type": "forfait",
  "prixHT": 250,
  "actif": true
}
```

### 2.3 Devis (Request)

```typescript
interface DevisRequest {
  dateEvenement: string                // Format: "YYYY-MM-DD"
  invites: number                       // Nombre d'invités (min: 1, max: 1000)
  espaces: string[]                    // IDs des espaces sélectionnés
  options: Array<{
    id: string                         // ID de l'option
    quantite: number                   // Quantité (min: 1)
  }>
  contact?: {
    nom: string
    email: string
    tel: string
  }
}
```

**Exemple :**
```json
{
  "dateEvenement": "2025-11-20",
  "invites": 55,
  "espaces": ["salle-chai", "terrasse-sud"],
  "options": [
    { "id": "traiteur-signature", "quantite": 55 },
    { "id": "sono", "quantite": 1 }
  ],
  "contact": {
    "nom": "Dupont",
    "email": "dupont@example.com",
    "tel": "0612345678"
  }
}
```

### 2.4 Devis (Response)

```typescript
interface DevisResponse {
  lignes: Array<{
    label: string                     // Libellé de la ligne
    qte: number                       // Quantité
    puHT: number                      // Prix unitaire HT
    totalHT: number                   // Total HT pour cette ligne
  }>
  sousTotalHT: number                 // Sous-total HT
  tva: {
    taux: number                      // Taux TVA (ex: 0.20)
    montant: number                   // Montant TVA
  }
  totalTTC: number                    // Total TTC
  devisId: string                     // ID unique du devis (ex: "dv_abc123")
  payementEligible: boolean           // Si le devis peut être payé en ligne
}
```

**Exemple :**
```json
{
  "lignes": [
    { "label": "La Salle du Chai", "qte": 1, "puHT": 1200, "totalHT": 1200 },
    { "label": "Terrasse Sud", "qte": 1, "puHT": 800, "totalHT": 800 },
    { "label": "Traiteur Signature", "qte": 55, "puHT": 35, "totalHT": 1925 },
    { "label": "Sonorisation", "qte": 1, "puHT": 250, "totalHT": 250 }
  ],
  "sousTotalHT": 4175,
  "tva": { "taux": 0.20, "montant": 835 },
  "totalTTC": 5010,
  "devisId": "dv_1699123456789_abc123",
  "payementEligible": true
}
```

---

## 3. Flux d'événement

### 3.1 Parcours utilisateur complet

```
1. UTILISATEUR ARRIVE SUR /evenements/simuler-votre-devis
   │
   ├─> Hero avec image et CTA
   │
   └─> Barre de progression (5 étapes)

2. ÉTAPE 1 : Date + Nombre d'invités
   │
   ├─> Saisie date (date picker, min = aujourd'hui)
   │   └─> Vérification disponibilité via GET /api/disponibilites?date=...
   │       └─> Affichage message si indisponible
   │
   ├─> Saisie nombre d'invités (number, min: 1, max: 1000)
   │
   └─> Bouton "Suivant" (désactivé si champs invalides)

3. ÉTAPE 2 : Sélection des espaces
   │
   ├─> Chargement espaces via GET /api/espaces
   │
   ├─> Affichage liste avec checkbox
   │   ├─> Titre, description, capacité, surface
   │   └─> Sélection multiple
   │
   ├─> Vérification capacité totale vs invites
   │   └─> Affichage alerte si dépassement
   │
   └─> Boutons "Précédent" / "Suivant"

4. ÉTAPE 3 : Options supplémentaires
   │
   ├─> Chargement options via GET /api/options
   │
   ├─> Affichage liste avec checkbox
   │   ├─> Titre, description, prix HT
   │   ├─> Type: forfait → quantite = 1 (automatique)
   │   ├─> Type: par_personne → quantite = invites (automatique)
   │   └─> Type: par_unite → input number modifiable
   │
   ├─> Calcul temps réel via POST /api/devis (debounce 300ms)
   │   └─> Affichage résumé dans SummaryBlock (collant droite)
   │
   ├─> Message: "Option non listée ? Contactez-nous..."
   │
   └─> Boutons "Précédent" / "Suivant"

5. ÉTAPE 4 : Coordonnées
   │
   ├─> Nom complet (text, requis)
   ├─> Email (email, requis, validation format)
   ├─> Téléphone (tel, requis)
   │
   ├─> Validation côté client
   │   └─> Messages d'erreur accessibles
   │
   └─> Boutons "Précédent" / "Valider mon devis"

6. ÉTAPE 5 : Validation et Paiement
   │
   ├─> Si devis.payementEligible === true:
   │   ├─> Bouton "Valider et payer l'acompte"
   │   │   └─> POST /api/checkout { devisId }
   │   │       └─> Redirection vers checkoutUrl (Stripe)
   │   │
   │   └─> Bouton "Nous contacter" (tel/mail)
   │
   └─> Si devis.payementEligible === false:
       └─> Message + boutons contact directs
```

### 3.2 Diagramme de flux API

```
Frontend                    Backend
   │                           │
   ├─ GET /api/espaces ────────>│
   │                           │ ──> Retourne liste espaces actifs
   │<──────────────────────────┤
   │                           │
   ├─ GET /api/options ────────>│
   │                           │ ──> Retourne liste options actives
   │<──────────────────────────┤
   │                           │
   ├─ GET /api/disponibilites ─>│
   │   ?date=2025-11-20        │ ──> Vérifie disponibilité
   │                           │ ──> Retourne { disponible, message }
   │<──────────────────────────┤
   │                           │
   ├─ POST /api/devis ────────>│
   │   { dateEvenement,        │
   │     invites,              │
   │     espaces,              │ ──> Calcule devis
   │     options }             │ ──> Valide avec Zod
   │                           │ ──> Génère devisId
   │                           │ ──> Retourne calcul complet
   │<──────────────────────────┤
   │                           │
   ├─ POST /api/checkout ──────>│
   │   { devisId }             │ ──> Valide devis
   │                           │ ──> Crée session Stripe (stub)
   │                           │ ──> Retourne checkoutUrl
   │<──────────────────────────┤
   │                           │
   └─ Redirection vers Stripe ─┘
```

---

## 4. Détails du calcul

### 4.1 Calcul des espaces

Pour chaque espace sélectionné :

```typescript
totalEspace = tarifBaseHT + (tarifParPersonneHT × nombreInvites)
```

**Exemple :**
- Espace: "Salle du Chai"
- tarifBaseHT: 1200 €
- tarifParPersonneHT: 0 €
- Invités: 55
- **Total = 1200 + (0 × 55) = 1200 €**

### 4.2 Calcul des options

#### Type "forfait"
```typescript
quantiteFinale = 1
totalOption = prixHT × 1
```

**Exemple :**
- Option: "Sonorisation"
- type: "forfait"
- prixHT: 250 €
- **Total = 250 × 1 = 250 €**

#### Type "par_personne"
```typescript
quantiteFinale = nombreInvites
totalOption = prixHT × nombreInvites
```

**Exemple :**
- Option: "Traiteur Signature"
- type: "par_personne"
- prixHT: 35 €
- Invités: 55
- **Total = 35 × 55 = 1925 €**

#### Type "par_unite"
```typescript
quantiteFinale = quantiteFournieParUtilisateur
totalOption = prixHT × quantiteFinale
```

**Exemple :**
- Option: "Visite guidée"
- type: "par_unite"
- prixHT: 150 €
- Quantité: 2
- **Total = 150 × 2 = 300 €**

### 4.3 Calcul des totaux

```typescript
sousTotalHT = Σ(lignes[].totalHT)
montantTVA = sousTotalHT × tauxTVA  // tauxTVA = 0.20 (20%)
totalTTC = sousTotalHT + montantTVA
```

**Exemple complet :**
```
Espaces:
  - Salle du Chai: 1200 €
  - Terrasse Sud: 800 €

Options:
  - Traiteur Signature (55 × 35): 1925 €
  - Sonorisation (1 × 250): 250 €

Sous-total HT: 1200 + 800 + 1925 + 250 = 4175 €
TVA (20%): 4175 × 0.20 = 835 €
Total TTC: 4175 + 835 = 5010 €
```

---

## 5. Gestion des cas limites

### 5.1 Sur-capacité

**Cas :** Nombre d'invités > Capacité totale des espaces sélectionnés

**Gestion :**
- Calcul automatique de la capacité totale : `Σ(espaces[].capaciteMax)`
- Comparaison avec `formData.invites`
- Affichage `<InlineNotice variant="warning">` si dépassement
- Message : "Le nombre d'invités dépasse la capacité totale..."

**Code :**
```typescript
const capaciteTotale = formData.espaces.reduce((sum, id) => {
  const espace = espaces.find(e => e.id === id)
  return sum + (espace?.capaciteMax || espace?.capacite || 0)
}, 0)

if (formData.invites > capaciteTotale) {
  // Afficher alerte
}
```

### 5.2 Option inconnue

**Cas :** Utilisateur cherche une option qui n'existe pas dans le catalogue

**Gestion :**
- Message affiché à l'étape 3 (Options) :
  - `<InlineNotice variant="info">`
  - Texte : "Option non listée ? Contactez-nous au [téléphone] ou [email]"
  - Liens cliquables vers `tel:` et `mailto:`

**Code :**
```tsx
<InlineNotice variant="info">
  <Mail className="w-4 h-4 inline mr-2" />
  Option non listée ? Contactez-nous au{" "}
  <a href={`tel:${CONTACT_PHONE}`}>...</a>
  {" "}ou{" "}
  <a href={`mailto:${CONTACT_EMAIL}`}>...</a>
</InlineNotice>
```

### 5.3 Date indisponible

**Cas :** Date sélectionnée n'est pas disponible

**Gestion :**
- Vérification automatique via `GET /api/disponibilites?date=...`
- Affichage `<InlineNotice variant="warning">` sous le champ date
- Message : "Cette date n'est pas disponible..."

**Code :**
```typescript
useEffect(() => {
  if (!formData.dateEvenement) return
  
  fetch(`/api/disponibilites?date=${formData.dateEvenement}`)
    .then(res => res.json())
    .then(data => setDisponibilite(data))
}, [formData.dateEvenement])
```

### 5.4 Devis invalide

**Cas :** Données invalides envoyées à `/api/devis`

**Gestion :**
- Validation côté serveur avec Zod
- Retour HTTP 400 avec détails d'erreur
- Affichage message générique côté client
- Logs serveur pour debugging

**Code :**
```typescript
const validationResult = DevisRequestSchema.safeParse(body)
if (!validationResult.success) {
  return NextResponse.json(
    { error: 'Données invalides', details: validationResult.error.errors },
    { status: 400 }
  )
}
```

### 5.5 Espace/Option inactif

**Cas :** Tentative de sélection d'un espace/option inactif

**Gestion :**
- Les espaces/options inactifs sont filtrés côté serveur (`actif: true`)
- Vérification supplémentaire dans `/api/devis` :
  - Si ID introuvable ou `actif: false` → HTTP 400
  - Message : "Espace 'xxx' non trouvé ou indisponible"

### 5.6 Paiement non éligible

**Cas :** `devis.payementEligible === false`

**Gestion :**
- Affichage message à l'étape 5 : "Votre devis nécessite une personnalisation..."
- Boutons de contact directs (téléphone + email)
- Pas de bouton de paiement

---

## 6. Accessibilité

### 6.1 Points traités

#### Labels et IDs
- ✅ Tous les champs ont un `<Label htmlFor="...">` correspondant
- ✅ IDs uniques pour chaque champ
- ✅ `aria-label` sur les checkboxes

#### Messages d'erreur
- ✅ `aria-invalid="true"` sur champs invalides
- ✅ `aria-describedby` pointant vers le message d'erreur
- ✅ Messages d'erreur avec `role="alert"` pour annoncer aux lecteurs d'écran
- ✅ Messages affichés en dessous du champ concerné

#### Focus visible
- ✅ Tous les boutons : `focus:ring-2 focus:ring-accent`
- ✅ Tous les champs : focus visible par défaut (géré par Tailwind)
- ✅ Liens : `focus:outline-none focus:ring-2 focus:ring-accent`

#### Tailles cibles tactiles
- ✅ Tous les boutons : `min-h-[44px]` (≥ 44px comme recommandé)
- ✅ Checkboxes : `min-h-[44px] min-w-[44px]`
- ✅ Champs input : `min-h-[44px]`

#### Navigation clavier
- ✅ Ordre de tabulation logique
- ✅ Barre de progression : `aria-current="step"` sur l'étape active
- ✅ Boutons précédent/suivant accessibles au clavier

#### Annonces temps réel
- ✅ `aria-live="polite"` sur `<SummaryBlock>` pour annoncer les mises à jour du total
- ✅ `aria-live="polite"` sur `<InlineNotice>` pour les alertes

#### Contraste
- ✅ Couleurs respectent WCAG AA (géré par le thème Tailwind)
- ✅ Texte d'erreur : `text-destructive` (contraste suffisant)

#### Images
- ✅ Images d'espaces : `alt` descriptif (via `espace.titre`)

### 6.2 Checklist WCAG AA

- ✅ **1.1.1** Contenu non textuel : Images avec alt text
- ✅ **1.3.1** Info et relations : Labels, headings structurés
- ✅ **1.4.3** Contraste : Texte ≥ 4.5:1 (géré par Tailwind)
- ✅ **2.1.1** Clavier : Toutes les fonctionnalités accessibles au clavier
- ✅ **2.4.3** Ordre de focus : Ordre logique
- ✅ **2.4.6** En-têtes et labels : Labels descriptifs
- ✅ **2.4.7** Focus visible : Focus clair sur tous les éléments
- ✅ **3.3.1** Identification d'erreur : Messages d'erreur accessibles
- ✅ **3.3.2** Labels ou instructions : Labels clairs
- ✅ **4.1.2** Nom, rôle, valeur : Attributs ARIA appropriés

---

## 7. Points de configuration

### 7.1 TVA

**Fichier :** `app/api/devis/route.ts`

```typescript
const TVA_RATE = 0.20  // 20%
```

**Modification :** Changer la constante `TVA_RATE` pour ajuster le taux.

**Recommandation :** À terme, déplacer cette valeur dans une variable d'environnement ou une table de configuration.

### 7.2 Devise

**Actuellement :** EUR (€) codé en dur dans les formats d'affichage.

**Modification :** Ajouter une constante `CURRENCY` :

```typescript
const CURRENCY = "EUR"
const CURRENCY_SYMBOL = "€"
```

### 7.3 Acompte minimum

**Actuellement :** Non implémenté.

**À implémenter :** Dans `/api/checkout`, vérifier si le total est supérieur à un seuil minimum avant de permettre le paiement.

```typescript
const MIN_ACOMPTE = 500  // €
if (devis.totalTTC < MIN_ACOMPTE) {
  return NextResponse.json(
    { error: 'Montant minimum non atteint' },
    { status: 400 }
  )
}
```

### 7.4 Rate limiting

**Actuellement :** Non implémenté.

**À implémenter :** Ajouter rate limiting sur `/api/devis` et `/api/checkout` pour éviter les abus.

**Recommandation :** Utiliser `@upstash/ratelimit` ou similaire :

```typescript
import { Ratelimit } from "@upstash/ratelimit"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m") // 10 requêtes par minute
})

// Dans POST /api/devis :
const { success } = await ratelimit.limit(identifier)
if (!success) {
  return NextResponse.json(
    { error: 'Trop de requêtes' },
    { status: 429 }
  )
}
```

### 7.5 Logs d'audit

**Actuellement :** Logs console basiques.

**Fichiers concernés :**
- `app/api/devis/route.ts` : Log du devisId, IP, total
- `app/api/checkout/route.ts` : Log du devisId, IP, init paiement

**Format actuel :**
```typescript
console.log(`[DEVIS] ${devisId} - ${ip} - Total: ${totalTTC}€`)
```

**À améliorer :** Intégrer un système de logging structuré (ex: Winston, Pino) et stocker dans une base de données pour audit.

---

## 8. Structure des fichiers

### 8.1 APIs

```
app/api/
├── espaces/
│   ├── route.ts              # GET, POST /api/espaces
│   └── [id]/route.ts         # PATCH, DELETE /api/espaces/:id
├── options/
│   ├── route.ts              # GET, POST /api/options
│   └── [id]/route.ts         # PATCH, DELETE /api/options/:id
├── devis/
│   └── route.ts              # POST /api/devis
├── checkout/
│   └── route.ts              # POST /api/checkout
└── disponibilites/
    └── route.ts              # GET /api/disponibilites
```

### 8.2 Pages

```
app/evenements/
├── simuler-votre-devis/
│   └── page.tsx              # Page principale
└── devis/
    └── paiement-stub/
        └── route.ts          # Page stub paiement
```

### 8.3 Composants

```
components/events/
├── HeroEvent.tsx             # Hero avec image (existant)
├── SummaryBlock.tsx          # Résumé devis collant
└── InlineNotice.tsx          # Alertes élégantes
```

---

## 9. Intégration Stripe (stub → production)

### 9.1 État actuel (stub)

**Fichier :** `app/api/checkout/route.ts`

**Comportement :**
- Génère une URL fictive : `/evenements/devis/paiement-stub?devisId=...`
- Page stub affiche un message temporaire

### 9.2 Intégration complète (à faire)

**Étapes :**

1. **Installer Stripe SDK**
```bash
pnpm add stripe @stripe/stripe-js
```

2. **Variables d'environnement**
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

3. **Modifier `/api/checkout/route.ts`**
```typescript
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  // ... validation ...
  
  // Récupérer le devis depuis la base de données
  const devis = await getDevisById(devisId)
  
  // Créer la session Stripe Checkout
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: devis.lignes.map(ligne => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: ligne.label,
        },
        unit_amount: Math.round(ligne.totalHT * 100), // en centimes
      },
      quantity: ligne.qte,
    })),
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/evenements/devis/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/evenements/simuler-votre-devis`,
    customer_email: formData.contact.email,
    metadata: {
      devisId: devis.devisId,
    },
  })
  
  return NextResponse.json({ checkoutUrl: session.url })
}
```

4. **Créer page de succès**
```
app/evenements/devis/success/page.tsx
```

---

## 10. Back-office (CRUD)

### 10.1 Endpoints d'administration

**Espaces :**
- `POST /api/espaces` : Créer un espace
- `PATCH /api/espaces/:id` : Modifier un espace
- `DELETE /api/espaces/:id` : Désactiver un espace (actif: false)

**Options :**
- `POST /api/options` : Créer une option
- `PATCH /api/options/:id` : Modifier une option
- `DELETE /api/options/:id` : Désactiver une option (actif: false)

**Note :** Ces endpoints sont actuellement accessibles sans authentification. **À sécuriser** avec un middleware d'authentification admin.

### 10.2 Champs administrables

**Espaces :**
- `titre`, `description`, `image`, `capaciteMax`, `tarifBaseHT`, `tarifParPersonneHT`, `surface_m2`, `ordre`, `actif`

**Options :**
- `titre`, `description`, `type`, `prixHT`, `unite`, `actif`

---

## 11. Sécurité et robustesse

### 11.1 Validation serveur

- ✅ Validation Zod sur `/api/devis`
- ✅ Validation Zod sur `/api/checkout`
- ✅ Vérification existence espaces/options actifs
- ✅ Recalcul total côté serveur (jamais faire confiance au client)

### 11.2 Rate limiting

- ⚠️ **À implémenter** : Rate limiting sur `/api/devis` et `/api/checkout`

### 11.3 Logs d'audit

- ✅ Logs basiques console (devisId, IP hash, total)
- ⚠️ **À améliorer** : Logging structuré + stockage BDD

### 11.4 Authentification admin

- ⚠️ **À implémenter** : Middleware d'authentification pour endpoints CRUD

---

## 12. Tests recommandés

### 12.1 Tests unitaires

- Fonction de calcul devis (espaces, options, totaux)
- Validation Zod (schémas DevisRequest, CheckoutRequest)
- Gestion des cas limites (sur-capacité, option inconnue)

### 12.2 Tests d'intégration

- Flux complet : création devis → checkout → paiement
- Vérification disponibilité
- Gestion erreurs API

### 12.3 Tests d'accessibilité

- Navigation clavier complète
- Lecteurs d'écran (NVDA, JAWS)
- Contraste couleurs (outils automatisés)

---

## 13. Prochaines étapes

### Priorité HAUTE
1. ✅ Créer APIs `/api/options`, `/api/devis`, `/api/checkout`
2. ✅ Refondre page `/evenements/simuler-votre-devis`
3. ✅ Créer composants `SummaryBlock`, `InlineNotice`
4. ✅ Créer routes CRUD complètes (`PATCH/DELETE` pour espaces et options)
5. ⚠️ Implémenter rate limiting
6. ⚠️ Sécuriser endpoints admin (authentification)

### Priorité MOYENNE
6. ⚠️ Intégration Stripe complète (remplacer stub)
7. ⚠️ Sauvegarde devis en base de données
8. ⚠️ Génération PDF devis
9. ⚠️ Emails de confirmation automatiques

### Priorité BASSE
11. ⚠️ Tests unitaires et d'intégration
12. ⚠️ Amélioration logs d'audit
13. ⚠️ Dashboard admin pour gestion devis

---

**Date de création :** 2025-01-XX  
**Statut :** ✅ Fonctionnel (calcul temps réel, validation, stub paiement)  
**Prochaines étapes :** Intégration Stripe complète, sécurisation admin

