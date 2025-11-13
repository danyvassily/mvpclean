# 🎨 Conventions des Boutons et CTA - Château Lastours

## 📋 Règle Fondamentale

**TOUS les boutons et CTA avec fond sombre DOIVENT avoir du texte BLANC pour garantir la lisibilité.**

---

## ✅ Règles CSS Globales (globals.css)

Les règles suivantes ont été ajoutées dans `/app/globals.css` pour forcer automatiquement le texte blanc sur tous les boutons avec fond sombre :

```css
/* Force le texte blanc sur tous les boutons avec fond sombre */
.bg-slate-900, .bg-slate-800, .bg-slate-900:hover, .bg-slate-800:hover,
.bg-primary, .bg-secondary, .bg-wine-dark, .bg-wine-black,
.bg-accent, .bg-destructive {
  color: #ffffff !important;
}

/* Force le texte blanc sur les liens et boutons avec classes spécifiques */
a.bg-slate-900, a.bg-slate-800, a.bg-primary, a.bg-secondary,
a.bg-wine-dark, a.bg-wine-black, a.bg-accent,
button.bg-slate-900, button.bg-slate-800, button.bg-primary, button.bg-secondary {
  color: #ffffff !important;
}

/* Force le texte blanc sur les enfants des boutons sombres */
.bg-slate-900 *, .bg-slate-800 *, .bg-primary *, .bg-secondary *,
.bg-wine-dark *, .bg-wine-black *, .bg-accent * {
  color: #ffffff !important;
}
```

---

## 🎯 Variables CSS (globals.css)

La variable `--accent-foreground` est définie sur BLANC pour garantir la lisibilité :

```css
--accent-foreground: #ffffff; /* BLANC pour lisibilité sur tous les boutons */
```

---

## 🔧 Composant Button (components/ui/button.tsx)

Le composant `Button` a été mis à jour pour forcer le texte blanc sur toutes les variantes avec fond sombre :

- **default** : `text-white`
- **destructive** : `text-white`
- **secondary** : `text-white`
- **outline** au hover : `hover:text-white`
- **ghost** au hover : `hover:text-white`

---

## 📝 Bonnes Pratiques pour les Développeurs

### ✅ À FAIRE

#### 1. Bouton avec fond sombre
```tsx
// ✅ Bon - Texte blanc explicite
<button className="bg-slate-900 text-white">
  Réserver une visite
</button>

// ✅ Bon - Utilise le composant Button
<Button variant="default">Réserver</Button>

// ✅ Bon - TransitionLink avec texte blanc
<TransitionLink 
  href="/reservation"
  className="bg-slate-900 text-white px-8 py-4"
>
  Découvrir
</TransitionLink>
```

#### 2. Liens avec fond accent (doré)
```tsx
// ✅ Bon - La règle CSS globale force automatiquement le texte blanc
<a className="bg-accent px-6 py-3">
  En savoir plus
</a>
```

#### 3. Icônes dans les boutons
```tsx
// ✅ Bon - Icône en blanc explicite
<button className="bg-slate-900 text-white">
  <Mail className="w-5 h-5 text-white" />
  <span className="text-white">Contact</span>
</button>
```

### ❌ À ÉVITER

```tsx
// ❌ Mauvais - Texte sombre sur fond sombre (illisible)
<button className="bg-slate-900 text-slate-700">
  Réserver
</button>

// ❌ Mauvais - Texte accent sur fond accent (illisible)
<a className="bg-accent text-accent">
  Découvrir
</a>

// ❌ Mauvais - Pas de couleur de texte spécifiée
<button className="bg-primary">
  Réserver
</button>
// NOTE : Ceci fonctionnera quand même grâce aux règles CSS globales,
// mais il est préférable d'être explicite.
```

---

## 🎨 Combinaisons de Couleurs Approuvées

### Fonds Sombres → Texte Blanc
- `bg-slate-900` → `text-white`
- `bg-slate-800` → `text-white`
- `bg-primary` → `text-white`
- `bg-secondary` → `text-white`
- `bg-wine-dark` → `text-white`
- `bg-wine-black` → `text-white`

### Fonds Clairs → Texte Sombre
- `bg-white` → `text-slate-900`
- `bg-slate-50` → `text-slate-900`
- `bg-slate-100` → `text-slate-700`

### Accent (Doré) → Texte Blanc
- `bg-accent` → `text-white` (forcé par CSS global)

---

## 🔍 Vérification Rapide

Avant de pousser votre code, vérifiez que :

1. ✅ Tous les boutons avec `bg-slate-900`, `bg-slate-800`, `bg-primary`, `bg-secondary`, `bg-accent` ont du texte BLANC
2. ✅ Les icônes dans les boutons ont aussi `text-white`
3. ✅ Le texte est lisible sur tous les appareils (mobile, tablette, desktop)
4. ✅ Le contraste respecte les normes d'accessibilité WCAG AA (minimum 4.5:1)

---

## 🚀 Pages Déjà Corrigées

- ✅ `/domaine/team` - Section Louis de Faramond
- ✅ `/domaine/engagement` - Bouton "Réserver une visite"
- ✅ `/domaine/histoire` - Bouton "Découvrir notre vignoble"
- ✅ Toutes les autres pages utilisent automatiquement les règles CSS globales

---

## 📞 En Cas de Problème

Si vous constatez un bouton avec du texte illisible :

1. Vérifiez que le fichier `/app/globals.css` contient bien les règles globales
2. Ajoutez explicitement `text-white` sur le bouton concerné
3. Testez sur tous les devices (mobile, tablette, desktop)
4. Faites un hard refresh (`Cmd + Shift + R` ou `Ctrl + F5`) pour voir les changements CSS

---

**Date de création** : 13 novembre 2024  
**Dernière mise à jour** : 13 novembre 2024  
**Statut** : ✅ ACTIF - À respecter pour tous les nouveaux développements

