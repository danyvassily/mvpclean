#!/bin/bash
# Script orchestrateur pour corriger toutes les images en une seule commande
# Usage: ./scripts/fix-all-images.sh [--dry-run|--write]

set -e  # Arrêter en cas d'erreur

# Couleurs pour l'output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Mode par défaut : dry-run
MODE="dry-run"
WRITE_FLAG=""

# Parser les arguments
if [[ "$1" == "--write" ]]; then
  MODE="write"
  WRITE_FLAG="--write"
fi

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     🎯 CORRECTION COMPLÈTE DES IMAGES MANQUANTES          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Mode: ${YELLOW}${MODE}${NC}"
echo ""

# Fonction pour afficher les étapes
step() {
  echo ""
  echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${GREEN}$1${NC}"
  echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo ""
}

# Fonction pour afficher les erreurs
error() {
  echo ""
  echo -e "${RED}❌ ERREUR: $1${NC}"
  echo ""
  exit 1
}

# Fonction pour afficher les warnings
warning() {
  echo ""
  echo -e "${YELLOW}⚠️  ATTENTION: $1${NC}"
  echo ""
}

# Fonction pour afficher le succès
success() {
  echo ""
  echo -e "${GREEN}✅ $1${NC}"
  echo ""
}

# Vérifier que nous sommes dans le bon répertoire
if [[ ! -f "package.json" ]]; then
  error "Ce script doit être exécuté depuis la racine du projet"
fi

# Vérifier que tsx est installé
if ! command -v tsx &> /dev/null; then
  warning "tsx n'est pas installé globalement"
  echo "Installation via pnpm..."
  pnpm install || error "Impossible d'installer les dépendances"
fi

# Créer le dossier reports s'il n'existe pas
mkdir -p reports

# ══════════════════════════════════════════════════════════
# ÉTAPE 1 : Vérification des pointeurs LFS
# ══════════════════════════════════════════════════════════
step "ÉTAPE 1/6 : Vérification des pointeurs Git LFS"

tsx scripts/check-lfs-pointers.ts || {
  warning "Des pointeurs LFS ont été détectés"
  echo "Pour récupérer les fichiers binaires, exécutez :"
  echo "  git lfs pull --include=\"public/**\""
  echo ""
  echo "Puis relancez ce script."
  echo ""
  
  if [[ "$MODE" == "write" ]]; then
    read -p "Voulez-vous continuer malgré tout ? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      exit 1
    fi
  fi
}

# ══════════════════════════════════════════════════════════
# ÉTAPE 2 : Audit initial
# ══════════════════════════════════════════════════════════
step "ÉTAPE 2/6 : Audit initial des références d'images"

tsx scripts/fix-missing-images.ts --check || warning "Des références cassées ont été détectées"

# ══════════════════════════════════════════════════════════
# ÉTAPE 3 : Normalisation et déplacement des assets
# ══════════════════════════════════════════════════════════
step "ÉTAPE 3/6 : Normalisation et déplacement des assets"

if [[ "$MODE" == "write" ]]; then
  tsx scripts/normalize-and-move-assets.ts --write || error "Échec de la normalisation"
  success "Assets normalisés et déplacés"
else
  tsx scripts/normalize-and-move-assets.ts || warning "Mode simulation uniquement"
fi

# ══════════════════════════════════════════════════════════
# ÉTAPE 4 : Mise à jour des références dans le code
# ══════════════════════════════════════════════════════════
step "ÉTAPE 4/6 : Mise à jour des références dans le code"

if [[ "$MODE" == "write" ]]; then
  # Vérifier que le mapping existe
  if [[ ! -f "reports/asset-moves-mapping.json" ]]; then
    warning "Le mapping n'existe pas encore, cette étape sera ignorée"
  else
    tsx scripts/update-code-references.ts --write || error "Échec de la mise à jour des références"
    success "Références mises à jour"
  fi
else
  if [[ -f "reports/asset-moves-mapping.json" ]]; then
    tsx scripts/update-code-references.ts || warning "Mode simulation uniquement"
  else
    warning "Mapping non disponible, étape ignorée"
  fi
fi

# ══════════════════════════════════════════════════════════
# ÉTAPE 5 : Correction des cas spécifiques
# ══════════════════════════════════════════════════════════
step "ÉTAPE 5/6 : Correction des cas spécifiques (logo, hero)"

if [[ "$MODE" == "write" ]]; then
  tsx scripts/fix-specific-cases.ts --write || error "Échec de la correction des cas spécifiques"
  success "Cas spécifiques corrigés"
else
  tsx scripts/fix-specific-cases.ts || warning "Mode simulation uniquement"
fi

# ══════════════════════════════════════════════════════════
# ÉTAPE 6 : Audit final et génération des rapports
# ══════════════════════════════════════════════════════════
step "ÉTAPE 6/6 : Audit final et génération des rapports"

tsx scripts/fix-missing-images.ts --check || warning "Des références cassées subsistent"

# ══════════════════════════════════════════════════════════
# RÉSUMÉ FINAL
# ══════════════════════════════════════════════════════════
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    📊 RÉSUMÉ FINAL                         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

if [[ -f "reports/fixed-images.json" ]]; then
  echo "📁 Rapports générés dans /reports/ :"
  echo "   • image-audit.csv"
  echo "   • fixed-images.json"
  echo "   • lfs-images.json"
  echo "   • lfs-pointers-detailed.json"
  echo "   • asset-moves-mapping.json"
  echo ""
fi

if [[ "$MODE" == "write" ]]; then
  success "Toutes les corrections ont été appliquées !"
  echo "Prochaines étapes :"
  echo "  1. Vérifiez les changements : git status"
  echo "  2. Testez en local : pnpm dev"
  echo "  3. Vérifiez que toutes les images s'affichent"
  echo "  4. Commitez : git add . && git commit -m \"chore(images): fix all missing images\""
  echo "  5. Poussez : git push"
  echo ""
else
  warning "Mode simulation : aucune modification n'a été appliquée"
  echo "Pour appliquer les corrections, exécutez :"
  echo "  ./scripts/fix-all-images.sh --write"
  echo ""
fi

echo -e "${GREEN}✨ Terminé !${NC}"
echo ""

