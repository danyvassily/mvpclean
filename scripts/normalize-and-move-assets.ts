#!/usr/bin/env ts-node
/**
 * Script pour normaliser et déplacer tous les assets dans /public/images
 * 
 * Ce script :
 * 1. Trouve tous les assets hors de /public
 * 2. Normalise leurs noms (kebab-case, sans accents, sans espaces)
 * 3. Les déplace dans /public/images avec une structure cohérente
 * 4. Génère un mapping des anciens vers nouveaux chemins
 */

import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);
const writeFile = promisify(fs.writeFile);
const access = promisify(fs.access);

const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const TARGET_DIR = path.join(PUBLIC_DIR, 'images');
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.gif'];

interface AssetMove {
  originalPath: string;
  normalizedPath: string;
  newPublicPath: string;
  reason: string;
}

// Normaliser un nom de fichier
function normalizeFilename(filename: string): string {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  
  const normalized = base
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Enlever les accents
    .replace(/\s+/g, '-') // Espaces -> tirets
    .replace(/[^a-zA-Z0-9.\-_]/g, '') // Enlever caractères spéciaux
    .replace(/-+/g, '-') // Pas de tirets multiples
    .replace(/^-+|-+$/g, '') // Pas de tirets au début/fin
    .toLowerCase();
  
  return normalized + ext.toLowerCase();
}

// Scanner récursivement
async function scanDirectory(dir: string, extensions: string[] = []): Promise<string[]> {
  const results: string[] = [];
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      // Ignorer certains dossiers
      if (entry.name.startsWith('.') || 
          entry.name === 'node_modules' || 
          entry.name === '.next' ||
          entry.name === 'reports' ||
          entry.name === 'compressed_backup') {
        continue;
      }
      
      if (entry.isDirectory()) {
        const subResults = await scanDirectory(fullPath, extensions);
        results.push(...subResults);
      } else if (entry.isFile()) {
        if (extensions.length === 0 || extensions.some(ext => fullPath.toLowerCase().endsWith(ext))) {
          results.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.warn(`Erreur scan ${dir}:`, error);
  }
  
  return results;
}

// Déterminer la catégorie d'une image
function categorizeImage(imagePath: string): string {
  const lower = imagePath.toLowerCase();
  const basename = path.basename(lower);
  
  // Logos (en premier pour éviter les conflits)
  if (basename.includes('logo') && !basename.includes('catalogue')) return 'logos';
  
  // Bouteilles et vins (priorité haute)
  if (lower.includes('bouteille') || 
      lower.includes('wine-') || 
      basename.startsWith('gamme-') ||
      lower.includes('/nos-cuvee-') ||
      lower.includes('blanc-') || 
      lower.includes('rouge-') || 
      lower.includes('rose-') ||
      lower.includes('claire-de-lune') ||
      lower.includes('domeni') ||
      lower.includes('methode') ||
      lower.includes('opus') ||
      lower.includes('perle') ||
      lower.includes('petrichor') ||
      lower.includes('pigeonnier') && basename.includes('.jpg') ||
      lower.includes('poussin') ||
      lower.includes('carafage') ||
      lower.includes('debouchage') ||
      lower.includes('effervescent')) return 'wines';
  
  // Vignes et vignoble
  if (lower.includes('vigne') || 
      lower.includes('vineyard') || 
      lower.includes('vignoble') ||
      lower.includes('/la-vigne-') ||
      lower.includes('cepage') ||
      lower.includes('vendange') ||
      lower.includes('raisin') ||
      lower.includes('debourrement') ||
      lower.includes('veraison') ||
      lower.includes('plantier')) return 'vineyard';
  
  // Vinification et production (avant château pour capturer les chais)
  if (lower.includes('vinification') || 
      lower.includes('barrel') || 
      lower.includes('barrique') ||
      lower.includes('chai') ||
      lower.includes('cuve') ||
      lower.includes('pressing') ||
      lower.includes('cave') ||
      lower.includes('fermentation') ||
      lower.includes('elevage') ||
      lower.includes('ouillage') ||
      lower.includes('assemblage') ||
      lower.includes('decuvage')) return 'production';
  
  // Événements (avant château)
  if (lower.includes('event') || 
      lower.includes('evenement') ||
      lower.includes('reception') ||
      lower.includes('mariage') ||
      lower.includes('seminaire') ||
      lower.includes('tente') ||
      lower.includes('concert') ||
      lower.includes('celebration')) return 'events';
  
  // Œnotourisme et expériences
  if (lower.includes('oenotourisme') || 
      lower.includes('tasting') || 
      lower.includes('degustation') || 
      lower.includes('visite') ||
      lower.includes('caveau') ||
      lower.includes('guidee')) return 'experiences';
  
  // Team et personnes
  if (lower.includes('team') || 
      lower.includes('equipe') || 
      lower.includes('manager') || 
      lower.includes('sommelier') ||
      lower.includes('vigneron') ||
      lower.includes('winemaker')) return 'team';
  
  // Gastronomie et art de table
  if (lower.includes('gastronomie') || 
      lower.includes('food') || 
      lower.includes('pairing') ||
      lower.includes('table-dressee') ||
      lower.includes('repas') ||
      lower.includes('art-de-table')) return 'gastronomy';
  
  // Hero et headers (priorité avant château)
  if ((basename.includes('hero') || basename.includes('header')) && 
      !lower.includes('/page/')) return 'heroes';
  
  // Placeholders
  if (basename.includes('placeholder')) return 'placeholders';
  
  // Château et bâtiments (après les catégories spécifiques)
  if (lower.includes('chateau') || 
      lower.includes('pigeonnier') && !basename.includes('.jpg') || 
      lower.includes('estate') ||
      lower.includes('facade') ||
      lower.includes('allee') && !lower.includes('vigne') ||
      lower.includes('cour') ||
      lower.includes('jardins') && !lower.includes('vigne')) return 'estate';
  
  // Par défaut
  return 'general';
}

// Trouver tous les assets à déplacer
async function findAssetsToMove(): Promise<AssetMove[]> {
  console.log('🔍 Recherche des assets à normaliser et déplacer...');
  
  const moves: AssetMove[] = [];
  const allImages = await scanDirectory(ROOT_DIR, IMAGE_EXTENSIONS);
  
  for (const imagePath of allImages) {
    // Si l'image est déjà dans /public/images, on vérifie juste le nom
    if (imagePath.startsWith(TARGET_DIR)) {
      const filename = path.basename(imagePath);
      const normalized = normalizeFilename(filename);
      
      if (filename !== normalized) {
        moves.push({
          originalPath: imagePath,
          normalizedPath: normalized,
          newPublicPath: path.join(path.dirname(imagePath), normalized),
          reason: 'Normalisation du nom de fichier',
        });
      }
    }
    // Si l'image est dans /public mais pas dans /public/images
    else if (imagePath.startsWith(PUBLIC_DIR) && !imagePath.startsWith(TARGET_DIR)) {
      const filename = normalizeFilename(path.basename(imagePath));
      const category = categorizeImage(imagePath);
      const newPath = path.join(TARGET_DIR, category, filename);
      
      moves.push({
        originalPath: imagePath,
        normalizedPath: filename,
        newPublicPath: newPath,
        reason: 'Déplacement vers /public/images + normalisation',
      });
    }
    // Si l'image est hors de /public
    else if (!imagePath.startsWith(PUBLIC_DIR)) {
      const filename = normalizeFilename(path.basename(imagePath));
      const category = categorizeImage(imagePath);
      const newPath = path.join(TARGET_DIR, category, filename);
      
      moves.push({
        originalPath: imagePath,
        normalizedPath: filename,
        newPublicPath: newPath,
        reason: 'Déplacement depuis hors de /public',
      });
    }
  }
  
  console.log(`✅ ${moves.length} assets à traiter`);
  return moves;
}

// Appliquer les déplacements
async function applyMoves(moves: AssetMove[], dryRun: boolean = true): Promise<number> {
  console.log(`\n${dryRun ? '🔍 SIMULATION' : '🔧 APPLICATION'} des déplacements...`);
  
  let movedCount = 0;
  const mapping: Record<string, string> = {};
  
  for (const move of moves) {
    try {
      if (!dryRun) {
        // Créer le dossier parent si nécessaire
        await mkdir(path.dirname(move.newPublicPath), { recursive: true });
        
        // Copier le fichier
        await copyFile(move.originalPath, move.newPublicPath);
        console.log(`  ✓ ${path.relative(ROOT_DIR, move.originalPath)} → ${path.relative(ROOT_DIR, move.newPublicPath)}`);
      } else {
        console.log(`  → ${path.relative(ROOT_DIR, move.originalPath)} → ${path.relative(ROOT_DIR, move.newPublicPath)}`);
      }
      
      // Ajouter au mapping
      const oldPublicPath = '/' + path.relative(PUBLIC_DIR, move.originalPath);
      const newPublicPath = '/' + path.relative(PUBLIC_DIR, move.newPublicPath);
      mapping[oldPublicPath] = newPublicPath;
      
      movedCount++;
    } catch (error) {
      console.error(`  ✗ Erreur pour ${move.originalPath}:`, error);
    }
  }
  
  // Sauvegarder le mapping
  const reportsDir = path.join(ROOT_DIR, 'reports');
  await mkdir(reportsDir, { recursive: true });
  await writeFile(
    path.join(reportsDir, 'asset-moves-mapping.json'),
    JSON.stringify(mapping, null, 2)
  );
  
  return movedCount;
}

// Fonction principale
async function main() {
  const args = process.argv.slice(2);
  const writeMode = args.includes('--write');
  
  console.log('🚀 Normalisation et déplacement des assets\n');
  console.log(`Mode: ${writeMode ? '✍️  ÉCRITURE' : '🔍 SIMULATION'}\n`);
  
  try {
    // Trouver les assets à déplacer
    const moves = await findAssetsToMove();
    
    if (moves.length === 0) {
      console.log('\n✅ Aucun asset à déplacer, tout est déjà bien organisé!');
      return;
    }
    
    // Afficher un résumé par raison
    const byReason = moves.reduce((acc, move) => {
      acc[move.reason] = (acc[move.reason] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('\n📊 Résumé par type:');
    for (const [reason, count] of Object.entries(byReason)) {
      console.log(`  • ${reason}: ${count}`);
    }
    
    // Appliquer les déplacements
    const movedCount = await applyMoves(moves, !writeMode);
    
    console.log('\n' + '─'.repeat(50));
    console.log(`📊 Total: ${movedCount} assets traités`);
    console.log('─'.repeat(50));
    
    if (!writeMode) {
      console.log('\n💡 Pour appliquer ces changements, exécutez:');
      console.log('  tsx scripts/normalize-and-move-assets.ts --write\n');
    } else {
      console.log('\n✅ Mapping sauvegardé dans reports/asset-moves-mapping.json');
      console.log('⚠️  N\'oubliez pas de mettre à jour les références dans le code!');
      console.log('   Exécutez: npm run fix:images\n');
    }
    
  } catch (error) {
    console.error('\n❌ Erreur fatale:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { main, findAssetsToMove, applyMoves };

