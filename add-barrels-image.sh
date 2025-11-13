#!/bin/bash

echo "🍷 Script d'ajout de l'image des tonneaux"
echo "=========================================="
echo ""

# Vérifier si un fichier est fourni en argument
if [ $# -eq 0 ]; then
    echo "❌ Aucun fichier fourni !"
    echo ""
    echo "Usage:"
    echo "  ./add-barrels-image.sh /chemin/vers/votre/image-tonneaux.jpg"
    echo ""
    echo "Ou glissez votre image dans le dossier public/ et renommez-la:"
    echo "  mv public/votre-image.jpg public/wine-barrels-header.jpg"
    echo ""
    exit 1
fi

SOURCE_FILE="$1"

# Vérifier si le fichier source existe
if [ ! -f "$SOURCE_FILE" ]; then
    echo "❌ Le fichier '$SOURCE_FILE' n'existe pas !"
    exit 1
fi

# Destination
DEST_FILE="public/wine-barrels-header.jpg"

# Copier le fichier
cp "$SOURCE_FILE" "$DEST_FILE"

if [ $? -eq 0 ]; then
    echo "✅ Image des tonneaux ajoutée avec succès !"
    echo ""
    echo "📂 Fichier: $DEST_FILE"
    echo "📏 Taille: $(ls -lh "$DEST_FILE" | awk '{print $5}')"
    echo ""
    echo "🎬 L'animation spectaculaire est maintenant prête !"
    echo "   → Rechargez http://localhost:3000/les-vins"
    echo ""
    echo "🎯 Vous devriez voir:"
    echo "   • Animation d'entrée de 3.5 secondes"
    echo "   • Zoom + déflou progressif"
    echo "   • Particules flottantes"
    echo "   • Grain cinématographique"
    echo "   • Parallax au scroll"
else
    echo "❌ Erreur lors de la copie du fichier !"
    exit 1
fi
