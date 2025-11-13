# RAPPORT DE MODIFICATIONS - Page Mécénat

**Date :** 2025-01-XX  
**Projet :** Château Lastours - Page Mécénat  
**Objectif :** Utiliser strictement les textes et images ASSET/mecenat, sans contenu inventé

---

## 1. HERO D'ENTÊTE - ALIGNEMENT SOUS MENU

### 1.1 Chemin de l'image hero

**Image utilisée :** `/ASSET/mecenat/musiciens-concert-de-jazz-chateau-lastours-gaillac-france.jpg`

**Code d'alignement sous menu :**

```tsx
<main className="pt-0">
  <section 
    className="relative flex items-center justify-center overflow-hidden"
    style={{
      minHeight: "calc(100vh - 80px)",
      marginTop: 0,
    }}
  >
```

**CSS appliqué :**
- `pt-0` sur `<main>` : Suppression du padding-top de 20 (80px) qui créait un espace
- `minHeight: "calc(100vh - 80px)"` : Hauteur minimale calculée pour compenser le header (`h-20` = 80px)
- `marginTop: 0` : Garantit zéro marge supérieure
- Hero utilise `Image` de Next.js avec `fill` et `object-cover` pour un rendu optimal

### 1.2 Accessibilité hero

- **Alt text :** "Concert de jazz au Château Lastours - Mécénat culturel" (basé sur le nom du fichier ASSET)
- **Overlay :** Gradient léger `bg-gradient-to-t from-black/80 via-black/40 to-black/60` pour lisibilité
- **Contraste :** Texte blanc sur fond sombre avec overlay, respecte AA

---

## 2. TEXTES ASSET INJECTÉS

### 2.1 Titre et chapeau hero

**Source ASSET :** `Texte Page Mécenat FR.docx`

**Titre utilisé :** "Soutenir l'âme d'un lieu, transmettre un héritage"  
**Chapeau utilisé :** "Au cœur du vignoble gaillacois dans le sud-ouest de la France, le Château Lastours incarne plus de cinq siècles d'histoire, de passion et d'art de vivre à la Française."

**Emplacement :** Hero section (lignes 62-66)

### 2.2 Introduction

**Contenu ASSET utilisé :**
- "Chaque pierre, chaque cep, chaque millésime raconte une aventure humaine et culturelle profondément enracinée dans son terroir."
- "Devenir mécène du Château Lastours, c'est participer à la préservation d'un patrimoine vivant, à la vitalité d'un domaine viticole d'exception et à la transmission d'un art de vivre français aux générations futures."

**Emplacement :** Section "Introduction" (lignes 71-97)

### 2.3 Section "Un engagement partagé"

**Titre ASSET :** "Un engagement partagé"

**Contenu ASSET utilisé :**
- "Le Château Lastours n'accueille pas seulement des mécènes : il est lui-même un mécène actif. Par conviction et par vocation, le domaine soutient la création artistique contemporaine, accueille des résidences d'artistes et offre un espace privilégié à l'expression et au dialogue entre art, nature et patrimoine."
- "Les œuvres présentées lors des différents événements au château sont vendues à but non lucratif, afin de valoriser directement le travail des artistes et de favoriser leur rayonnement. Cette approche s'inscrit dans une démarche d'économie culturelle respectueuse et solidaire."

**Emplacement :** Section panoramique (lignes 99-135)

### 2.4 Section "Les axes du mécénat"

**Titre ASSET :** "Les axes du mécénat au Château Lastours"

**Contenu ASSET utilisé :**
- Introduction : "Votre soutien contribue à :"
- 5 axes listés depuis ASSET :
  1. "La restauration et la sauvegarde du patrimoine architectural du domaine et de ses jardins."
  2. "La promotion des arts et de la culture, au travers d'expositions, de concerts et d'événements ouverts à tous."
  3. "Le soutien aux artistes en résidence, accompagnés dans leur création et leur diffusion."
  4. "Le développement durable du vignoble, par la préservation de la biodiversité et l'innovation œnologique responsable."
  5. "L'ouverture pédagogique et touristique, pour partager avec le public l'histoire vivante d'un terroir d'exception."

**Emplacement :** Section panoramique (lignes 137-179)

### 2.5 Section "Mécénat individuel et d'entreprise"

**Titre ASSET :** "Mécénat individuel et d'entreprise"

**Contenu ASSET utilisé :**
- Introduction : "Le mécénat au Château Lastours se veut un partenariat d'émotion et de sens, ouvert à toutes et à tous :"
- 3 types listés depuis ASSET :
  1. "Dons financiers ou en nature (compétences, matériel, savoir-faire)."
  2. "Soutien d'événements culturels, associant votre image à des projets valorisants."
  3. "Avantages fiscaux attractifs, conformes aux dispositifs nationaux (jusqu'à 66 % pour les particuliers et 60 % pour les entreprises)."

**Emplacement :** Section panoramique (lignes 225-268)

### 2.6 Section "Rejoignez la communauté"

**Titre ASSET :** "Rejoignez la communauté des mécènes du Château Lastours"

**Contenu ASSET utilisé :**
- "En rejoignant cette aventure, vous contribuez à faire vivre un lieu qui croise mémoire, art et innovation viticole, et vous devenez à votre tour porteur de sens, passeur de culture et bâtisseur de l'avenir."
- **Contact ASSET :** "mécénat@chateau-lastours.com"

**Emplacement :** Section finale CTA (lignes 271-321)

---

## 3. MAPPING DES ÉLÉMENTS ASSET

### 3.1 Images intégrées (UNE SEULE FOIS CHACUNE)

| Fichier ASSET | Emplacement dans la page | Usage | Ligne |
|---------------|-------------------------|-------|-------|
| `musiciens-concert-de-jazz-chateau-lastours-gaillac-france.jpg` | Hero section (entête) | Image principale hero avec Next.js Image `fill` | 42-48 |
| `renovation-toiture-pigeonnier-chateau-lastours-gaillac-france.jpg` | Section Restauration 1 | Image panoramique pleine largeur | 185-192 |
| `restauration-facade-piegonnier-sud-ouest-gaillac-france.jpg` | Section Restauration 2 | Image panoramique pleine largeur | 207-214 |

**✅ CRITIQUE :** Chaque image ASSET utilisée UNE SEULE FOIS. Aucune réutilisation.

### 3.2 Sections sans images ASSET

Les sections suivantes utilisent des fonds gradients (pas d'images ASSET) :
- Introduction (ligne 71-97)
- Un engagement partagé (ligne 99-135)
- Les axes du mécénat (ligne 137-179)
- Mécénat individuel et d'entreprise (ligne 225-268)
- Rejoignez la communauté (ligne 271-321)

### 3.3 Structure finale

```
Hero (image ASSET 1: jazz)
↓
Introduction (fond gradient)
↓
Un engagement partagé (fond gradient)
↓
Les axes du mécénat (fond gradient)
↓
Restauration image 1 (image ASSET 2: toiture)
↓
Restauration image 2 (image ASSET 3: façade)
↓
Mécénat individuel et d'entreprise (fond gradient)
↓
Rejoignez la communauté (fond gradient)
```

---

## 4. RÈGLES D'ESPACEMENT APPLIQUÉES

### 4.1 Tokens d'espacement uniformisés

**Rythme vertical :**
- Sections majeures : `mb-6 lg:mb-8` (24px / 32px) - pas de padding vertical
- Hauteurs sections : `h-[60vh]` à `h-[90vh]` selon importance
- Pas de "gouffres" verticaux grâce au rythme continu

### 4.2 Espacements spécifiques

**Section Hero :**
- `minHeight: calc(100vh - 80px)` : Pleine hauteur moins header
- Pas de padding/margin supérieur

**Sections panoramiques :**
- Hauteurs adaptatives : `h-[60vh] lg:h-[70vh] xl:h-[75vh]` à `h-[75vh] lg:h-[85vh] xl:h-[90vh]`
- Padding texte : `p-8 lg:p-16 xl:p-20` (32px / 64px / 80px)
- Espacement entre éléments texte : `space-y-4` à `space-y-6` (16px / 24px)

**Mobile :**
- Hauteurs réduites : `h-[60vh]` minimum
- Padding réduit : `p-8` (32px)
- Espacements conservés pour lisibilité

---

## 5. VÉRIFICATIONS ACCESSIBILITÉ (A11Y)

### 5.1 Alt text

✅ **Hero :** "Concert de jazz au Château Lastours - Mécénat culturel"  
✅ **Restauration toiture :** "Rénovation de la toiture du pigeonnier du Château Lastours"  
✅ **Restauration façade :** "Restauration de la façade sud-ouest du pigeonnier du Château Lastours"

**Critère :** Tous les alt text sont descriptifs et basés sur les noms de fichiers ASSET, sans marketing inventé.

### 5.2 Contrastes

✅ **Hero :** Texte blanc sur overlay sombre (contraste AA respecté)  
✅ **Sections :** Texte blanc sur fonds sombres/gradients (contraste AA respecté)  
✅ **Bouton CTA :** Fond blanc texte noir (contraste AAA)

### 5.3 Focus visible

✅ **Bouton Contact :** 
- `min-h-[44px]` : Taille cible ≥ 44px respectée
- `px-8` : Largeur minimale pour toucher
- Focus ring via composants Button (shadcn/ui)

✅ **Lien email :** Composant Button avec gestion focus intégrée

### 5.4 Responsive

✅ **Mobile (< 768px) :**
- Sections : `h-[60vh]` minimum
- Padding : `p-8` (32px)
- Texte : Tailles réduites automatiquement (text-lg md:text-xl)
- Grilles : 1 colonne

✅ **Tablette (768px - 1024px) :**
- Sections : `h-[70vh]` à `h-[85vh]`
- Padding : `lg:p-16` (64px)
- Grilles : 2-3 colonnes selon section

✅ **Desktop (> 1024px) :**
- Sections : `h-[75vh]` à `h-[90vh]`
- Padding : `xl:p-20` (80px)
- Texte : Tailles maximales (text-4xl lg:text-5xl xl:text-6xl)

---

## 6. MODIFICATIONS TECHNIQUES DÉTAILLÉES

### 6.1 Fichier modifié

**`app/mecenat/page.tsx`**

### 6.2 Changements principaux

1. **Contenu strictement ASSET :**
   - Tous les textes extraits depuis `Texte Page Mécenat FR.docx`
   - Suppression de tout contenu inventé
   - Suppression des partenariats fictifs (Festival Bulle de Jazz, etc.)

2. **Hero section :**
   - Titre ASSET : "Soutenir l'âme d'un lieu, transmettre un héritage"
   - Chapeau ASSET : texte complet depuis docx
   - Image ASSET : `musiciens-concert-de-jazz` (une seule fois)

3. **Sections créées depuis ASSET :**
   - "Un engagement partagé" (texte ASSET complet)
   - "Les axes du mécénat" (5 axes depuis ASSET)
   - "Mécénat individuel et d'entreprise" (3 types depuis ASSET)
   - "Rejoignez la communauté" (texte ASSET + contact ASSET)

4. **Images ASSET utilisées UNE SEULE FOIS :**
   - Hero : `musiciens-concert-de-jazz` (une fois)
   - Restauration 1 : `renovation-toiture-pigeonnier` (une fois)
   - Restauration 2 : `restauration-facade-piegonnier` (une fois)
   - **Aucune réutilisation d'images**

5. **Suppression complète :**
   - Toutes les cartes (Card/CardContent)
   - Toutes les icônes (Award, Users, Heart, Handshake)
   - Partenaires fictifs
   - Avantages inventés
   - Contenu marketing non présent dans ASSET

6. **Contact ASSET :**
   - Email : `mécénat@chateau-lastours.com` (depuis ASSET)
   - Bouton avec lien `mailto:` direct

### 6.3 Structure HTML finale

```
<main className="pt-0">
  <section hero> // Image ASSET 1 (jazz)
  <section introduction> // Fond gradient
  <section engagement-partage> // Fond gradient
  <section axes-mecenat> // Fond gradient
  <section restauration-1> // Image ASSET 2 (toiture)
  <section restauration-2> // Image ASSET 3 (façade)
  <section mecenat-individuel> // Fond gradient
  <section rejoignez> // Fond gradient
</main>
```

---

## 7. CHECKLIST DE VALIDATION

- [x] Zéro espace entre le menu et la photo d'entête
- [x] Image hero = celle de l'ASSET (`musiciens-concert-de-jazz`)
- [x] Hero utilise Next.js Image avec `fill` et `object-cover`
- [x] Titre/texte du hero = contenus ASSET exacts
- [x] Tous les textes depuis ASSET (aucun contenu inventé)
- [x] Toutes les images ASSET intégrées UNE SEULE FOIS chacune
- [x] Pas de "gouffres" verticaux (espacements uniformisés)
- [x] Mobile propre (responsive testé)
- [x] Zéro emoji dans les titres/texte
- [x] Zéro contenu hors ASSET
- [x] Pas de cartes (Card/CardContent supprimées)
- [x] Alt text descriptifs basés ASSET
- [x] Taille cible ≥ 44px pour boutons
- [x] Focus visible sur liens/CTA
- [x] Contact email depuis ASSET (`mécénat@chateau-lastours.com`)

---

## 8. MAPPING COMPLET ASSET → PAGE

### Textes ASSET utilisés

| Section | Titre ASSET | Contenu ASSET | Emplacement |
|---------|-------------|---------------|-------------|
| Hero | "Soutenir l'âme d'un lieu, transmettre un héritage" | Chapeau intro ASSET | Hero (ligne 62-66) |
| Introduction | - | 2 paragraphes ASSET | Section intro (ligne 87-91) |
| Engagement | "Un engagement partagé" | Texte complet ASSET | Section panoramique (ligne 120-130) |
| Axes | "Les axes du mécénat au Château Lastours" | 5 axes ASSET | Section panoramique (ligne 158-174) |
| Types | "Mécénat individuel et d'entreprise" | 3 types ASSET | Section panoramique (ligne 246-263) |
| CTA | "Rejoignez la communauté des mécènes du Château Lastours" | Texte + contact ASSET | Section finale (ligne 292-317) |

### Images ASSET utilisées

| Image ASSET | Usage | Occurrence |
|-------------|-------|------------|
| `musiciens-concert-de-jazz-chateau-lastours-gaillac-france.jpg` | Hero uniquement | 1 fois |
| `renovation-toiture-pigeonnier-chateau-lastours-gaillac-france.jpg` | Section Restauration 1 | 1 fois |
| `restauration-facade-piegonnier-sud-ouest-gaillac-france.jpg` | Section Restauration 2 | 1 fois |

**✅ Aucune image réutilisée**

---

## 9. RÉSUMÉ DES CHEMINS ASSET UTILISÉS

```typescript
// Hero
"/ASSET/mecenat/musiciens-concert-de-jazz-chateau-lastours-gaillac-france.jpg"

// Section Restauration
"/ASSET/mecenat/renovation-toiture-pigeonnier-chateau-lastours-gaillac-france.jpg"
"/ASSET/mecenat/restauration-facade-piegonnier-sud-ouest-gaillac-france.jpg"

// Textes
Source: "public/Page/Page Mécénat - ok/Texte Page Mécenat FR.docx"
Contact: "mécénat@chateau-lastours.com"
```

---

**Rapport généré le :** 2025-01-XX  
**Statut :** ✅ Modifications appliquées avec contenu ASSET strict  
**Statut images :** ✅ Chaque image ASSET utilisée UNE SEULE FOIS  
**Statut textes :** ✅ Tous les textes depuis ASSET, aucun contenu inventé
