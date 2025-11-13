# RÉSUMÉ EXÉCUTIF - Vérification Page "Organiser votre événement"

**Date :** 2025-01-XX  
**Statut global :** ❌ **NON CONFORME** - Refonte complète nécessaire

---

## 🔴 Points bloquants (CRITIQUE)

### 1. Hero Section
- ❌ **Espace au-dessus du hero** : `className="mt-20"` crée un gap de 80px (doit être 0)
- ❌ **Titre incorrect** : "Événements d'Exception au Château Lastours" au lieu de **"Votre moment à Lastours"**
- ❌ **Slogan présent** : Sous-titre "L'Art d'Organiser..." doit être supprimé
- ❌ **CTA principal incorrect** : Pointe vers `mailto:` au lieu de `/evenements/simuler-votre-devis`
- ⚠️ **Image hero** : À vérifier si correspond à ASSET fourni

### 2. Espaces (Section "Trois Espaces d'Exception")
- ❌ **Pas de sections pleine largeur** : Utilise liste verticale avec icônes rondes
- ❌ **Aucune image ASSET** : Les 3 espaces n'ont pas leurs images correspondantes
- ❌ **Icônes dans titres** : Interdit selon spécifications
- ❌ **Présentation** : Ne suit pas le style "luxe" avec split image/texte alterné

### 3. Activités Œnotouristiques
- ❌ **Utilise des cartes** : Sections avec `rounded-lg border` (INTERDIT)
- ❌ **Icônes dans titres** : Présentes partout (INTERDIT)

### 4. Page Simulateur
- ❌ **Route inexistante** : `/evenements/simuler-votre-devis` n'existe pas
- ❌ **API stubs manquants** : `/api/espaces` non créé

---

## 📋 Images ASSET disponibles

Dossier : `/public/Page/Organiser votre evenement - ok et inclure cta pour renvoyer ver vos événement/`

| Usage | Fichier suggéré | Taille |
|-------|----------------|--------|
| **Hero** | `concert-sous-tente-nomade-safari-gaillac-france-chateau-lastours.png` | 8.0MB ⚠️ |
| **Tente Nomade** | `recpetion-mariage-tente-nomade-chateau-lastours-gaillac.jpg` | 545KB ✅ |
| **Salle de Réception** | `salle-de-réception-evenements-familials-professionnels.JPG` | 12MB ⚠️ |
| **Salle de Réunion** | `salle-seminaire-reunion-video-projecteur.jpg` | 1.8MB ✅ |
| **Yoga & Vins** | `cours-de-yoga-plein-air.jpg` | 1.3MB ✅ |
| **Apéro-concerts** | `festival-de-jazz-chateau-lastours-gaillac-france.jpg` | 2.2MB ✅ |

**Note :** Les fichiers > 5MB nécessitent optimisation avant utilisation.

---

## ✅ Points conformes

- ✅ Route `/evenements/organiser` existe
- ✅ Bouton téléphone présent et fonctionnel (`tel:+33563570709`)
- ✅ Responsive mobile/tablette/desktop
- ✅ Alt text présent sur les images
- ✅ Pas d'emoji détecté
- ✅ Contenu issu de ASSET HTML

---

## 🎯 Actions immédiates requises

### Phase 1 : Corrections Hero (URGENT)
1. Supprimer `className="mt-20"` → alignement zéro avec header sticky
2. Changer titre → "Votre moment à Lastours"
3. Supprimer `subtitle`
4. Changer CTA principal → "Simuler votre devis" → `/evenements/simuler-votre-devis`

### Phase 2 : Refonte Espaces (URGENT)
1. Créer composant `EspaceSection` avec layout split image/texte alterné
2. Ajouter images ASSET pour chaque espace
3. Supprimer toutes les icônes des titres
4. Présentation pleine largeur (full-bleed)

### Phase 3 : Refonte Activités (URGENT)
1. Supprimer toutes les `<Card>`
2. Créer sections pleine largeur avec images ASSET
3. Supprimer icônes des titres

### Phase 4 : Création Simulateur (URGENT)
1. Créer `/evenements/simuler-votre-devis/page.tsx`
2. Créer `/app/api/espaces/route.ts` (stubs)
3. Implémenter simulateur multi-étapes

---

## 📄 Documentation complète

Pour le détail complet de toutes les vérifications, voir : **`REPORT_ORGANISER.md`**

---

**Prochaine étape recommandée :** Appliquer les corrections Phase 1 en priorité, puis Phase 2.

