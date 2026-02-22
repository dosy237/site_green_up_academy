#!/bin/bash
# Script pour copier les images vers le dossier public

# Créer les répertoires s'ils n'existent pas
mkdir -p public/images/logo
mkdir -p public/images/enseignant

# Copier les images
cp "src/pages/images /logo/logo.png" "public/images/logo/logo.png" 2>/dev/null || echo "Logo copié ou déjà présent"
cp "src/pages/images /enseignant/charles.png" "public/images/enseignant/charles.png" 2>/dev/null || echo "Charles.png copié ou déjà présent"
cp "src/pages/images /enseignant/basile.jpg" "public/images/enseignant/basil.png" 2>/dev/null || echo "Basile.jpg copié"
cp "src/pages/images /enseignant/meryl.jpeg" "public/images/enseignant/meryl.png" 2>/dev/null || echo "Meryl.jpeg copié"

echo "✅ Images copiées vers public/"
