#!/bin/bash

# ====================================
# Script de Préparation pour Déploiement ePanel
# Château Lastours
# ====================================

set -e  # Arrêter en cas d'erreur

echo "🏰 Château Lastours - Préparation Déploiement ePanel"
echo "====================================================="
echo ""

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_step() {
    echo -e "${BLUE}▶${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    print_error "Erreur : package.json non trouvé. Es-tu dans le bon répertoire ?"
    exit 1
fi

print_success "Répertoire du projet détecté"
echo ""

# Étape 1 : Nettoyage
print_step "Étape 1/5 : Nettoyage des anciens builds..."
if [ -d "out" ]; then
    rm -rf out
    print_success "Ancien dossier 'out/' supprimé"
fi

if [ -d ".next" ]; then
    rm -rf .next
    print_success "Ancien dossier '.next/' supprimé"
fi

echo ""

# Étape 2 : Installation des dépendances (optionnel)
print_step "Étape 2/5 : Vérification des dépendances..."
if [ ! -d "node_modules" ]; then
    print_warning "node_modules non trouvé. Installation..."
    pnpm install
    print_success "Dépendances installées"
else
    print_success "Dépendances déjà présentes"
fi

echo ""

# Étape 3 : Build de production
print_step "Étape 3/5 : Création du build de production..."
print_warning "Cela peut prendre quelques minutes..."

if pnpm run build; then
    print_success "Build réussi !"
else
    print_error "Erreur lors du build"
    exit 1
fi

echo ""

# Étape 4 : Copier le fichier .htaccess
print_step "Étape 4/5 : Copie du fichier .htaccess..."
if [ -f ".htaccess" ]; then
    cp .htaccess out/.htaccess
    print_success "Fichier .htaccess copié dans out/"
else
    print_error "Fichier .htaccess non trouvé !"
    exit 1
fi

echo ""

# Étape 5 : Création de l'archive ZIP (optionnel)
print_step "Étape 5/5 : Création de l'archive ZIP pour upload..."

ARCHIVE_NAME="chateau-lastours-$(date +%Y%m%d-%H%M%S).zip"

cd out
if zip -r "../$ARCHIVE_NAME" . -x "*.DS_Store" > /dev/null 2>&1; then
    cd ..
    print_success "Archive créée : $ARCHIVE_NAME"
else
    cd ..
    print_warning "Impossible de créer l'archive ZIP (optionnel)"
fi

echo ""
echo "====================================================="
echo -e "${GREEN}✓ Préparation terminée !${NC}"
echo "====================================================="
echo ""
echo "📁 Dossier prêt pour le déploiement : ${BLUE}out/${NC}"
echo "📦 Archive ZIP (optionnel) : ${BLUE}$ARCHIVE_NAME${NC}"
echo ""
echo "🚀 Prochaines étapes :"
echo "   1. Ouvre FileZilla ou ton client FTP préféré"
echo "   2. Connecte-toi à ton serveur ePanel"
echo "   3. Va dans le dossier public_html/"
echo "   4. Upload TOUT le contenu du dossier 'out/'"
echo "   5. Ou upload et extrais l'archive ZIP"
echo ""
echo "📖 Guide complet : EPANEL_DEPLOYMENT_GUIDE.md"
echo ""

# Afficher la taille du build
if [ -d "out" ]; then
    SIZE=$(du -sh out | cut -f1)
    echo "💾 Taille totale du build : ${BLUE}$SIZE${NC}"
    echo ""
fi

# Vérifier que les fichiers essentiels sont présents
print_step "Vérification des fichiers essentiels..."
ERRORS=0

if [ ! -f "out/index.html" ]; then
    print_error "Manquant : index.html"
    ERRORS=$((ERRORS+1))
else
    print_success "Présent : index.html"
fi

if [ ! -f "out/.htaccess" ]; then
    print_error "Manquant : .htaccess"
    ERRORS=$((ERRORS+1))
else
    print_success "Présent : .htaccess"
fi

if [ ! -d "out/_next" ]; then
    print_error "Manquant : dossier _next/"
    ERRORS=$((ERRORS+1))
else
    print_success "Présent : dossier _next/"
fi

if [ $ERRORS -gt 0 ]; then
    echo ""
    print_error "$ERRORS fichier(s) essentiel(s) manquant(s)"
    exit 1
fi

echo ""
echo "====================================================="
echo -e "${GREEN}🎉 Tout est prêt pour le déploiement !${NC}"
echo "====================================================="
echo ""
