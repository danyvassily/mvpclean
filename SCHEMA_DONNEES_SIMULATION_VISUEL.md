# 📊 Schéma des Données - Simulation de Devis

> Document visuel présentant la structure complète des données du système de simulation de devis événementiel.

---

## 🎯 Vue d'ensemble

```ascii
┌─────────────────────────────────────────────────────────────────┐
│                    SYSTÈME DE SIMULATION DE DEVIS                │
└─────────────────────────────────────────────────────────────────┘

┌──────────┐      ┌──────────┐      ┌──────────┐
│  ESPACE  │──────│  DEVIS   │──────│ CHECKOUT │
└──────────┘      └──────────┘      └──────────┘
     │                 │
     │                 ├──────────────┐
     │                 │              │
     └────────────────┘              │
                                     │
                              ┌──────────┐
                              │  OPTION  │
                              └──────────┘
```

---

## 📋 Table des matières

1. [Entités principales](#entités-principales)
2. [Relations entre entités](#relations-entre-entités)
3. [Flux de données](#flux-de-données)
4. [Règles de calcul](#règles-de-calcul)
5. [Exemples complets](#exemples-complets)

---

## 🗂️ Entités principales

### 1. ESPACE

**Description :** Espace événementiel disponible à la location

#### Structure

| Champ | Type | Requis | Description | Exemple |
|-------|------|--------|-------------|---------|
| `id` | `string` | ✅ | Identifiant unique | `"salle-chai"` |
| `titre` | `string` | ✅ | Nom de l'espace | `"La Salle du Chai"` |
| `description` | `string` | ✅ | Description détaillée | `"Située dans l'ancien chai..."` |
| `image` | `string` | ✅ | Chemin ASSET | `"/ASSET/espaces/chai.jpg"` |
| `capaciteMax` | `number` | ❌ | Capacité max (personnes) | `80` |
| `tarifBaseHT` | `number` | ✅ | Tarif base HT (€) | `1200` |
| `tarifParPersonneHT` | `number` | ❌ | Tarif par personne HT (€) | `0` |
| `surface_m2` | `number` | ❌ | Surface en m² | `100` |
| `ordre` | `number` | ❌ | Ordre d'affichage | `1` |
| `slug` | `string` | ❌ | Slug URL-friendly | `"salle-chai"` |
| `actif` | `boolean` | ✅ | Disponibilité | `true` |

#### Exemple

```json
{
  "id": "salle-chai",
  "titre": "La Salle du Chai",
  "description": "Située dans l'ancien chai à barriques...",
  "image": "/Page/Organiser votre evenement.../salle-de-réception...JPG",
  "capaciteMax": 80,
  "tarifBaseHT": 1200,
  "tarifParPersonneHT": 0,
  "surface_m2": 100,
  "ordre": 1,
  "slug": "salle-chai",
  "actif": true
}
```

#### Espaces disponibles

| ID | Titre | Capacité | Tarif Base HT | Tarif/pers HT |
|----|-------|----------|---------------|---------------|
| `salle-chai` | La Salle du Chai | 80 | 1 200 € | 0 € |
| `tente-nomade` | La Tente Nomade | 300 | 2 500 € | 0 € |
| `terrasse-sud` | Terrasse Sud | 100 | 800 € | 0 € |
| `salle-reunion` | La Salle de Réunion | 30 | 600 € | 0 € |

---

### 2. OPTION

**Description :** Option supplémentaire configurable pour l'événement

#### Structure

| Champ | Type | Requis | Description | Exemple |
|-------|------|--------|-------------|---------|
| `id` | `string` | ✅ | Identifiant unique | `"traiteur-signature"` |
| `titre` | `string` | ✅ | Nom de l'option | `"Traiteur Signature"` |
| `description` | `string` | ❌ | Description optionnelle | `"Menu 3 services..."` |
| `type` | `enum` | ✅ | Type de facturation | `"par_personne"` |
| `prixHT` | `number` | ✅ | Prix unitaire HT (€) | `35` |
| `unite` | `string` | ❌ | Unité de facturation | `"personne"` |
| `actif` | `boolean` | ✅ | Disponibilité | `true` |

#### Types d'options

| Type | Quantité | Calcul | Exemple |
|------|----------|--------|---------|
| `forfait` | Toujours `1` | `prixHT × 1` | Sonorisation (250€) |
| `par_personne` | `= invites` (auto) | `prixHT × invites` | Traiteur (35€/pers) |
| `par_unite` | Saisie utilisateur | `prixHT × quantite` | Visite guidée (150€/unité) |

#### Options disponibles

| ID | Titre | Type | Prix HT | Unité |
|----|-------|------|---------|-------|
| `traiteur-signature` | Traiteur Signature | `par_personne` | 35 € | personne |
| `traiteur-premium` | Traiteur Premium | `par_personne` | 65 € | personne |
| `sono` | Sonorisation | `forfait` | 250 € | - |
| `eclairage` | Éclairage événementiel | `forfait` | 400 € | - |
| `visite-guidee` | Visite guidée du domaine | `par_unite` | 150 € | unité |
| `degustation-privee` | Dégustation privée | `par_personne` | 25 € | personne |
| `decoration-fleurie` | Décoration florale | `forfait` | 800 € | - |
| `photographe` | Photographe professionnel | `forfait` | 1 200 € | - |

---

### 3. DEVIS_REQUEST (Payload API)

**Description :** Données envoyées par le client pour calculer un devis

#### Structure

```typescript
interface DevisRequest {
  dateEvenement: string                // Format: "YYYY-MM-DD"
  invites: number                       // Min: 1, Max: 1000
  espaces: string[]                    // IDs des espaces
  options: Array<{
    id: string                         // ID de l'option
    quantite: number                   // Min: 1
  }>
  contact?: {
    nom: string
    email: string
    tel: string
  }
}
```

#### Validation

| Champ | Règle | Message d'erreur |
|-------|-------|------------------|
| `dateEvenement` | Format `YYYY-MM-DD` | "Date invalide" |
| `invites` | Entre 1 et 1000 | "Nombre d'invités invalide" |
| `espaces` | Au moins 1 élément | "Au moins un espace requis" |
| `options[].quantite` | Minimum 1 | "Quantité invalide" |

#### Exemple

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

---

### 4. DEVIS_RESPONSE (Réponse API)

**Description :** Devis calculé retourné par l'API

#### Structure

```typescript
interface DevisResponse {
  lignes: DevisLigne[]                 // Lignes détaillées
  sousTotalHT: number                  // Sous-total HT (€)
  tva: {
    taux: number                       // Taux TVA (ex: 0.20)
    montant: number                    // Montant TVA (€)
  }
  totalTTC: number                     // Total TTC (€)
  devisId: string                      // ID unique
  payementEligible: boolean            // Si payable en ligne
}

interface DevisLigne {
  label: string                         // Libellé
  qte: number                          // Quantité
  puHT: number                         // Prix unitaire HT (€)
  totalHT: number                      // Total HT (€)
}
```

#### Exemple de réponse

```json
{
  "lignes": [
    {
      "label": "La Salle du Chai",
      "qte": 1,
      "puHT": 1200,
      "totalHT": 1200
    },
    {
      "label": "Terrasse Sud",
      "qte": 1,
      "puHT": 800,
      "totalHT": 800
    },
    {
      "label": "Traiteur Signature",
      "qte": 55,
      "puHT": 35,
      "totalHT": 1925
    },
    {
      "label": "Sonorisation",
      "qte": 1,
      "puHT": 250,
      "totalHT": 250
    }
  ],
  "sousTotalHT": 4175,
  "tva": {
    "taux": 0.20,
    "montant": 835
  },
  "totalTTC": 5010,
  "devisId": "dv_1699123456789_abc123",
  "payementEligible": true
}
```

#### Format d'affichage visuel

```
┌─────────────────────────────────────────────────────────┐
│                    RÉSUMÉ DU DEVIS                       │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  La Salle du Chai                   1 × 1 200 € = 1 200 €│
│  Terrasse Sud                        1 × 800 € =   800 €│
│  Traiteur Signature                 55 ×  35 € = 1 925 €│
│  Sonorisation                        1 × 250 € =   250 €│
│                                                           │
│  ───────────────────────────────────────────────────────│
│  Sous-total HT                                   4 175 €│
│  TVA (20%)                                           835 €│
│  ───────────────────────────────────────────────────────│
│  TOTAL TTC                                        5 010 €│
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 🔗 Relations entre entités

### Diagramme de relations

```
┌─────────────────────────────────────────────────────────────┐
│                    MODÈLE DE DONNÉES                         │
└─────────────────────────────────────────────────────────────┘

    ESPACE                        DEVIS
    ┌─────────────┐              ┌─────────────┐
    │ id          │              │ devisId     │
    │ titre       │              │ dateEvenement│
    │ tarifBaseHT │◄─────────────┤ invites     │
    │ capaciteMax │              │ sousTotalHT │
    └─────────────┘              │ totalTTC    │
         │                       └─────────────┘
         │                              │
         │                              │
         │                       ┌──────┴──────┐
         │                       │             │
         │                  DEVIS_LIGNE    CHECKOUT
         │                  ┌──────────┐    ┌─────────────┐
         │                  │ label    │    │ checkoutUrl │
         │                  │ qte      │    │ devisId     │
         │                  │ puHT     │    └─────────────┘
         │                  │ totalHT  │
         │                  └──────────┘
         │                       │
         │                       │
    OPTION                       │
    ┌─────────────┐              │
    │ id          │──────────────┘
    │ titre       │
    │ type        │
    │ prixHT      │
    └─────────────┘
```

### Cardinalités

| Relation | Cardinalité | Description |
|----------|-------------|-------------|
| **ESPACE → DEVIS_LIGNE** | `1:N` | Un espace peut être dans plusieurs lignes de devis |
| **OPTION → DEVIS_LIGNE** | `1:N` | Une option peut être dans plusieurs lignes de devis |
| **DEVIS → DEVIS_LIGNE** | `1:N` | Un devis contient plusieurs lignes |
| **DEVIS → CHECKOUT** | `1:1` | Un devis génère un checkout unique |
| **DEVIS → DISPONIBILITE** | `N:1` | Plusieurs devis peuvent vérifier la même date |

---

## 🔄 Flux de données

### 1. Création d'un devis

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUX DE CRÉATION DEVIS                     │
└─────────────────────────────────────────────────────────────┘

[FRONTEND]
  │
  │ 1. Saisie utilisateur
  │    ├─ Date événement
  │    ├─ Nombre d'invités
  │    ├─ Espaces sélectionnés
  │    └─ Options sélectionnées
  │
  ▼
  │
  │ 2. POST /api/devis
  │    {
  │      dateEvenement: "2025-11-20",
  │      invites: 55,
  │      espaces: ["salle-chai", "terrasse-sud"],
  │      options: [...]
  │    }
  │
  ▼
  │
  │ 3. Validation Zod
  │    └─ Vérification format et contraintes
  │
  ▼
  │
  │ 4. Vérification données
  │    ├─ Espaces existants et actifs ✓
  │    └─ Options existantes et actives ✓
  │
  ▼
  │
  │ 5. Calcul lignes
  │    ├─ Espaces: tarifBaseHT + (tarifParPersonneHT × invites)
  │    └─ Options: selon type (forfait/par_personne/par_unite)
  │
  ▼
  │
  │ 6. Calcul totaux
  │    ├─ sousTotalHT = Σ(lignes)
  │    ├─ montantTVA = sousTotalHT × 0.20
  │    └─ totalTTC = sousTotalHT + montantTVA
  │
  ▼
  │
  │ 7. Génération devisId
  │    └─ Format: "dv_" + timestamp + "_" + random
  │
  ▼
  │
  │ 8. Retour DevisResponse
  │    {
  │      lignes: [...],
  │      sousTotalHT: 4175,
  │      tva: { taux: 0.20, montant: 835 },
  │      totalTTC: 5010,
  │      devisId: "dv_...",
  │      payementEligible: true
  │    }
  │
  ▼
  │
[FRONTEND]
  │
  │ 9. Affichage dans SummaryBlock
  │    └─ Mise à jour temps réel avec debounce
```

### 2. Initialisation du paiement

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUX DE PAIEMENT                          │
└─────────────────────────────────────────────────────────────┘

[FRONTEND]
  │
  │ 1. Clic "Valider et payer l'acompte"
  │
  ▼
  │
  │ 2. POST /api/checkout
  │    { devisId: "dv_1699123456789_abc123" }
  │
  ▼
  │
  │ 3. Validation Zod
  │
  ▼
  │
  │ 4. Vérification devis
  │    ├─ Existe ✓
  │    └─ payementEligible === true ✓
  │
  ▼
  │
  │ 5. Création session Stripe (stub)
  │    └─ TODO: Remplacer par vraie intégration
  │
  ▼
  │
  │ 6. Retour CheckoutResponse
  │    {
  │      checkoutUrl: "https://checkout.stripe.com/...",
  │      devisId: "dv_..."
  │    }
  │
  ▼
  │
[FRONTEND]
  │
  │ 7. Redirection
  │    └─ window.location.href = checkoutUrl
```

### 3. Vérification disponibilité

```
┌─────────────────────────────────────────────────────────────┐
│              VÉRIFICATION DISPONIBILITÉ                       │
└─────────────────────────────────────────────────────────────┘

[FRONTEND]
  │
  │ 1. Saisie date dans date picker
  │
  ▼
  │
  │ 2. GET /api/disponibilites?date=2025-11-20
  │
  ▼
  │
  │ 3. Validation format date
  │
  ▼
  │
  │ 4. Vérifications
  │    ├─ Date pas dans le passé ✓
  │    └─ Date dans liste indisponibles ?
  │
  ▼
  │
  │ 5. Retour DisponibiliteResponse
  │    {
  │      date: "2025-11-20",
  │      disponible: true
  │    }
  │
  ▼
  │
[FRONTEND]
  │
  │ 6. Affichage
  │    ├─ Si disponible: ✓ (pas de message)
  │    └─ Si indisponible: InlineNotice warning
```

---

## 🧮 Règles de calcul

### Formules de calcul

#### 1. Calcul Espace

```
┌─────────────────────────────────────────────────────────┐
│              FORMULE : TOTAL ESPACE                      │
└─────────────────────────────────────────────────────────┘

totalHT = tarifBaseHT + (tarifParPersonneHT × invites)

Exemple:
  tarifBaseHT = 1200 €
  tarifParPersonneHT = 0 €
  invites = 55

  totalHT = 1200 + (0 × 55) = 1200 €
```

#### 2. Calcul Option (Forfait)

```
┌─────────────────────────────────────────────────────────┐
│         FORMULE : OPTION FORFAIT                         │
└─────────────────────────────────────────────────────────┘

quantite = 1 (automatique)
totalHT = prixHT × 1

Exemple:
  prixHT = 250 €

  quantite = 1
  totalHT = 250 × 1 = 250 €
```

#### 3. Calcul Option (Par Personne)

```
┌─────────────────────────────────────────────────────────┐
│       FORMULE : OPTION PAR PERSONNE                      │
└─────────────────────────────────────────────────────────┘

quantite = invites (automatique)
totalHT = prixHT × invites

Exemple:
  prixHT = 35 €
  invites = 55

  quantite = 55
  totalHT = 35 × 55 = 1925 €
```

#### 4. Calcul Option (Par Unité)

```
┌─────────────────────────────────────────────────────────┐
│         FORMULE : OPTION PAR UNITÉ                       │
└─────────────────────────────────────────────────────────┘

quantite = quantiteFournieParUtilisateur
totalHT = prixHT × quantite

Exemple:
  prixHT = 150 €
  quantite = 2

  totalHT = 150 × 2 = 300 €
```

#### 5. Calcul Totaux

```
┌─────────────────────────────────────────────────────────┐
│            FORMULE : TOTAUX FINAUX                       │
└─────────────────────────────────────────────────────────┘

sousTotalHT = Σ(lignes[].totalHT)
montantTVA = sousTotalHT × tauxTVA    (tauxTVA = 0.20)
totalTTC = sousTotalHT + montantTVA

Exemple:
  Lignes:
    - Espace 1: 1200 €
    - Espace 2: 800 €
    - Option 1: 1925 €
    - Option 2: 250 €

  sousTotalHT = 1200 + 800 + 1925 + 250 = 4175 €
  montantTVA = 4175 × 0.20 = 835 €
  totalTTC = 4175 + 835 = 5010 €
```

---

## 📝 Exemples complets

### Exemple 1 : Mariage (55 personnes)

#### Input

```json
{
  "dateEvenement": "2025-11-20",
  "invites": 55,
  "espaces": ["salle-chai", "terrasse-sud"],
  "options": [
    { "id": "traiteur-signature", "quantite": 55 },
    { "id": "sono", "quantite": 1 },
    { "id": "eclairage", "quantite": 1 }
  ]
}
```

#### Calcul détaillé

```
┌─────────────────────────────────────────────────────────────┐
│                    CALCUL DÉTAILLÉ                           │
└─────────────────────────────────────────────────────────────┘

ESPACES:
  ┌─────────────────────────────────────────────────────────┐
  │ Salle du Chai                                           │
  │   tarifBaseHT: 1200 €                                  │
  │   tarifParPersonneHT: 0 €                              │
  │   invites: 55                                           │
  │   Total = 1200 + (0 × 55) = 1200 €                    │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │ Terrasse Sud                                             │
  │   tarifBaseHT: 800 €                                    │
  │   tarifParPersonneHT: 0 €                               │
  │   invites: 55                                            │
  │   Total = 800 + (0 × 55) = 800 €                       │
  └─────────────────────────────────────────────────────────┘

OPTIONS:
  ┌─────────────────────────────────────────────────────────┐
  │ Traiteur Signature                                      │
  │   Type: par_personne                                    │
  │   prixHT: 35 €                                         │
  │   quantite: 55 (auto)                                   │
  │   Total = 35 × 55 = 1925 €                             │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │ Sonorisation                                             │
  │   Type: forfait                                         │
  │   prixHT: 250 €                                        │
  │   quantite: 1 (auto)                                    │
  │   Total = 250 × 1 = 250 €                              │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │ Éclairage événementiel                                  │
  │   Type: forfait                                         │
  │   prixHT: 400 €                                        │
  │   quantite: 1 (auto)                                    │
  │   Total = 400 × 1 = 400 €                              │
  └─────────────────────────────────────────────────────────┘

TOTAUX:
  ┌─────────────────────────────────────────────────────────┐
  │ Sous-total HT                                           │
  │   1200 + 800 + 1925 + 250 + 400 = 4575 €               │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │ TVA (20%)                                               │
  │   4575 × 0.20 = 915 €                                   │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │ TOTAL TTC                                               │
  │   4575 + 915 = 5490 €                                   │
  └─────────────────────────────────────────────────────────┘
```

#### Output

```json
{
  "lignes": [
    {
      "label": "La Salle du Chai",
      "qte": 1,
      "puHT": 1200,
      "totalHT": 1200
    },
    {
      "label": "Terrasse Sud",
      "qte": 1,
      "puHT": 800,
      "totalHT": 800
    },
    {
      "label": "Traiteur Signature",
      "qte": 55,
      "puHT": 35,
      "totalHT": 1925
    },
    {
      "label": "Sonorisation",
      "qte": 1,
      "puHT": 250,
      "totalHT": 250
    },
    {
      "label": "Éclairage événementiel",
      "qte": 1,
      "puHT": 400,
      "totalHT": 400
    }
  ],
  "sousTotalHT": 4575,
  "tva": {
    "taux": 0.20,
    "montant": 915
  },
  "totalTTC": 5490,
  "devisId": "dv_1699123456789_abc123",
  "payementEligible": true
}
```

#### Affichage visuel

```
╔═══════════════════════════════════════════════════════════╗
║                   RÉSUMÉ DU DEVIS                         ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  La Salle du Chai                   1 × 1 200 € = 1 200 € ║
║  Terrasse Sud                        1 ×   800 € =   800 € ║
║  Traiteur Signature                55 ×    35 € = 1 925 € ║
║  Sonorisation                        1 ×   250 € =   250 € ║
║  Éclairage événementiel              1 ×   400 € =   400 € ║
║                                                           ║
║  ──────────────────────────────────────────────────────── ║
║  Sous-total HT                                   4 575 € ║
║  TVA (20%)                                           915 € ║
║  ──────────────────────────────────────────────────────── ║
║  TOTAL TTC                                        5 490 € ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

---

### Exemple 2 : Séminaire (30 personnes)

#### Input

```json
{
  "dateEvenement": "2025-12-10",
  "invites": 30,
  "espaces": ["salle-reunion"],
  "options": [
    { "id": "traiteur-signature", "quantite": 30 },
    { "id": "visite-guidee", "quantite": 1 }
  ]
}
```

#### Calcul rapide

```
Espaces:
  - Salle de Réunion: 600 €

Options:
  - Traiteur Signature: 30 × 35 = 1050 €
  - Visite guidée: 1 × 150 = 150 €

Sous-total HT: 600 + 1050 + 150 = 1800 €
TVA (20%): 1800 × 0.20 = 360 €
Total TTC: 1800 + 360 = 2160 €
```

---

## 🎛️ Configuration

### Variables configurables

| Variable | Valeur actuelle | Emplacement | Description |
|----------|----------------|-------------|-------------|
| `TVA_RATE` | `0.20` (20%) | `app/api/devis/route.ts` | Taux de TVA |
| `DEBOUNCE_DELAY` | `300` ms | Page component | Délai debounce calcul |
| `CONTACT_PHONE` | `"+33563570709"` | Page component | Téléphone contact |
| `CONTACT_EMAIL` | `"contact@chateau-lastours.com"` | Page component | Email contact |

### Format ID

**devisId :** Format `dv_{timestamp}_{random}`
- Timestamp: millisecondes depuis epoch
- Random: 9 caractères alphanumériques
- Exemple: `dv_1699123456789_abc123xyz`

---

## 📚 Glossaire

| Terme | Définition |
|-------|------------|
| **HT** | Hors Taxes |
| **TTC** | Toutes Taxes Comprises |
| **TVA** | Taxe sur la Valeur Ajoutée (20%) |
| **PK** | Primary Key (Clé primaire) |
| **FK** | Foreign Key (Clé étrangère) |
| **Debounce** | Délai avant exécution d'une fonction (évite appels multiples) |
| **Stub** | Implémentation temporaire/simulée |

---

## 🔍 Contraintes et validation

### Règles de validation

| Champ | Règle | Type d'erreur |
|-------|-------|---------------|
| `dateEvenement` | Format `YYYY-MM-DD` | Format invalide |
| `dateEvenement` | Date future uniquement | Date dans le passé |
| `invites` | Entre 1 et 1000 | Valeur hors limites |
| `espaces` | Au moins 1 élément | Liste vide |
| `espaces[]` | Tous actifs | Espace indisponible |
| `options[].quantite` | Minimum 1 | Quantité invalide |
| `options[].id` | Tous actifs | Option indisponible |
| `contact.email` | Format email valide | Email invalide |

### Cas limites gérés

- ✅ Sur-capacité (invites > capacité totale espaces)
- ✅ Option inconnue (message contact affiché)
- ✅ Date indisponible (vérification automatique)
- ✅ Devis invalide (validation Zod + messages erreur)
- ✅ Espace/Option inactif (filtrage côté serveur)

---

**Date de création :** 2025-01-XX  
**Version :** 1.0  
**Statut :** ✅ Documentation complète

