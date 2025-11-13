#!/usr/bin/env tsx
/**
 * Script pour générer la liste des fichiers LFS manquants
 * À utiliser pour identifier quels fichiers copier depuis la sauvegarde
 */

import fs from 'fs';
import path from 'path';

interface LFSPointer {
  filePath: string;
  isPointer: boolean;
  oid: string;
  size: number;
}

async function main() {
  console.log('📋 Génération de la liste des fichiers LFS manquants...\n');

  // Lire le rapport LFS
  const lfsReportPath = path.join(process.cwd(), 'reports/lfs-images.json');
  
  if (!fs.existsSync(lfsReportPath)) {
    console.error('❌ Fichier reports/lfs-images.json introuvable');
    console.log('   Exécutez d\'abord: npm run audit:images');
    process.exit(1);
  }

  const lfsPointers: LFSPointer[] = JSON.parse(
    fs.readFileSync(lfsReportPath, 'utf-8')
  );

  console.log(`📊 Total de pointeurs LFS: ${lfsPointers.length}\n`);

  // Catégoriser par dossier
  const byCategory: Record<string, string[]> = {};

  for (const pointer of lfsPointers) {
    const fullPath = pointer.filePath;
    
    let category = 'autres';
    if (fullPath.includes('/images/estate/') || fullPath.includes('photos-general')) category = 'estate (château)';
    else if (fullPath.includes('/images/events/') || fullPath.includes('oenotourisme-gv')) category = 'events (événements)';
    else if (fullPath.includes('/images/experiences/')) category = 'experiences';
    else if (fullPath.includes('/images/gastronomy/')) category = 'gastronomy';
    else if (fullPath.includes('/images/logos/') || fullPath.includes('/logo/')) category = 'logos (⚠️ CRITIQUES)';
    else if (fullPath.includes('/images/production/') || fullPath.includes('/vinification/')) category = 'production (chai/barriques)';
    else if (fullPath.includes('/images/vineyard/') || fullPath.includes('/vignes/')) category = 'vineyard (vignes)';
    else if (fullPath.includes('/images/wines/') || fullPath.includes('/bouteilles/')) category = 'wines (bouteilles)';
    else if (fullPath.includes('/drone-croix-occitane/')) category = 'drone-aerien';
    else if (fullPath.includes('/pigeonnier/')) category = 'pigeonnier';
    else if (fullPath.includes('/de-la-vigne-a-la-bouteille/')) category = 'vigne-bouteille';

    if (!byCategory[category]) {
      byCategory[category] = [];
    }

    const fileName = path.basename(pointer.filePath);
    byCategory[category].push(fileName);
  }

  // Afficher par catégorie avec priorités
  const priorities = {
    'logos (⚠️ CRITIQUES)': '🔴 PRIORITÉ 1',
    'estate (château)': '🟠 PRIORITÉ 2',
    'wines (bouteilles)': '🟠 PRIORITÉ 2',
    'vineyard (vignes)': '🟡 PRIORITÉ 3',
    'production (chai/barriques)': '🟡 PRIORITÉ 3',
    'drone-aerien': '🟡 PRIORITÉ 3',
    'pigeonnier': '🟡 PRIORITÉ 3',
    'vigne-bouteille': '🟡 PRIORITÉ 3',
    'events (événements)': '⚪ PRIORITÉ 4',
    'experiences': '⚪ PRIORITÉ 4',
    'gastronomy': '⚪ PRIORITÉ 4',
    'autres': '⚪ PRIORITÉ 4',
  };

  console.log('═'.repeat(70));
  console.log('  FICHIERS MANQUANTS PAR CATÉGORIE (à récupérer de ta sauvegarde)');
  console.log('═'.repeat(70));
  console.log('');

  // Trier par priorité
  const sortedCategories = Object.keys(byCategory).sort((a, b) => {
    const priorityA = Object.keys(priorities).indexOf(a);
    const priorityB = Object.keys(priorities).indexOf(b);
    return priorityA - priorityB;
  });

  let totalFiles = 0;
  const allFiles: string[] = [];

  for (const category of sortedCategories) {
    const files = byCategory[category];
    const priority = priorities[category as keyof typeof priorities] || '⚪ PRIORITÉ 4';
    
    console.log(`\n${priority} - ${category.toUpperCase()}`);
    console.log('─'.repeat(70));
    console.log(`📁 ${files.length} fichiers:\n`);
    
    files.sort().forEach((file) => {
      console.log(`  • ${file}`);
      allFiles.push(file);
    });

    totalFiles += files.length;
  }

  console.log('\n' + '═'.repeat(70));
  console.log(`  TOTAL: ${totalFiles} fichiers à récupérer`);
  console.log('═'.repeat(70));

  // Générer un fichier texte avec la liste complète
  const outputPath = path.join(process.cwd(), 'reports/missing-files-list.txt');
  const content = [
    '═══════════════════════════════════════════════════════════════',
    '  FICHIERS LFS MANQUANTS - À récupérer depuis la sauvegarde',
    '═══════════════════════════════════════════════════════════════',
    '',
    `Total: ${totalFiles} fichiers`,
    '',
    ...allFiles.map((f) => f),
    '',
    '═══════════════════════════════════════════════════════════════',
    'Pour récupérer ces fichiers:',
    '1. Cherche chaque nom de fichier dans ton dossier de sauvegarde',
    '2. Copie-les dans le dossier correspondant de public/',
    '3. Exécute: npm run restore:from-backup',
    '═══════════════════════════════════════════════════════════════',
  ].join('\n');

  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`\n✅ Liste sauvegardée dans: ${outputPath}`);
  console.log('\n💡 PROCHAINE ÉTAPE:');
  console.log('   Indique-moi où se trouve ton dossier de sauvegarde,');
  console.log('   et je vais créer un script pour copier automatiquement les fichiers!\n');
}

main().catch(console.error);

