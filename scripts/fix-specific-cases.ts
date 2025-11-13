#!/usr/bin/env ts-node
/**
 * Script pour corriger les cas spécifiques critiques
 * 
 * Ce script se concentre sur :
 * 1. Le logo de la navbar
 * 2. L'image header de la page d'accueil
 * 3. Les chemins avec %2F encodés
 * 4. Les imports d'images qui doivent devenir des chaînes
 */

import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const access = promisify(fs.access);

const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

interface SpecificFix {
  file: string;
  issue: string;
  fix: string;
  applied: boolean;
}

// Trouver tous les fichiers TSX
async function findTSXFiles(dir: string): Promise<string[]> {
  const results: string[] = [];
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.name.startsWith('.') || 
          entry.name === 'node_modules' || 
          entry.name === '.next') {
        continue;
      }
      
      if (entry.isDirectory()) {
        const subResults = await findTSXFiles(fullPath);
        results.push(...subResults);
      } else if (entry.isFile() && (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts'))) {
        results.push(fullPath);
      }
    }
  } catch (error) {
    console.warn(`Erreur scan ${dir}:`, error);
  }
  
  return results;
}

// Trouver le bon logo
async function findBestLogo(): Promise<string | null> {
  const logoPaths = [
    'images/logos/logo.svg',
    'images/logos/logo.png',
    'photos-web-lastours/logo/logo.png',
    'logo-chateau-lastours.png',
    'photos-web-lastours/logo/Logo black Chateau 1.png',
  ];
  
  for (const logoPath of logoPaths) {
    try {
      const fullPath = path.join(PUBLIC_DIR, logoPath);
      await access(fullPath, fs.constants.F_OK);
      return '/' + logoPath;
    } catch {
      // Continuer
    }
  }
  
  return null;
}

// Trouver la meilleure image hero
async function findBestHero(): Promise<string | null> {
  const heroPaths = [
    'images/heroes/images/heroes/chateau-lastours-hero.jpg',
    'chateau-lastours-hero.jpg',
    'hero.jpg',
    'photos-web-lastours/photos-general/Chateau Lastours (21).jpg',
  ];
  
  for (const heroPath of heroPaths) {
    try {
      const fullPath = path.join(PUBLIC_DIR, heroPath);
      await access(fullPath, fs.constants.F_OK);
      return '/' + heroPath;
    } catch {
      // Continuer
    }
  }
  
  return null;
}

// Corriger le logo dans la navbar
async function fixNavbarLogo(files: string[], logoPath: string, dryRun: boolean): Promise<SpecificFix[]> {
  const fixes: SpecificFix[] = [];
  
  // Chercher les composants de navigation
  const navFiles = files.filter(f => 
    f.toLowerCase().includes('nav') || 
    f.toLowerCase().includes('header') ||
    f.toLowerCase().includes('menu')
  );
  
  for (const file of navFiles) {
    try {
      const content = await readFile(file, 'utf-8');
      
      // Patterns à rechercher
      const patterns = [
        /src=["']([^"']*logo[^"']*)["']/gi,
        /<Image[^>]+src=["']([^"']*logo[^"']*)["']/gi,
      ];
      
      let newContent = content;
      let hasChanges = false;
      
      for (const pattern of patterns) {
        const matches = [...content.matchAll(pattern)];
        for (const match of matches) {
          const oldSrc = match[1];
          
          // Si ce n'est pas déjà le bon chemin
          if (oldSrc !== logoPath && !oldSrc.includes('placeholder')) {
            newContent = newContent.replace(oldSrc, logoPath);
            hasChanges = true;
            
            fixes.push({
              file: path.relative(ROOT_DIR, file),
              issue: `Logo incorrect: ${oldSrc}`,
              fix: `Remplacé par: ${logoPath}`,
              applied: !dryRun,
            });
          }
        }
      }
      
      if (hasChanges && !dryRun) {
        await writeFile(file, newContent);
      }
    } catch (error) {
      console.warn(`Erreur traitement ${file}:`, error);
    }
  }
  
  return fixes;
}

// Corriger l'image hero de la page d'accueil
async function fixHomeHero(files: string[], heroPath: string, dryRun: boolean): Promise<SpecificFix[]> {
  const fixes: SpecificFix[] = [];
  
  // Chercher les composants Hero ou de la page d'accueil
  const heroFiles = files.filter(f => 
    f.toLowerCase().includes('hero') || 
    f.toLowerCase().includes('home') ||
    f.includes('/page.tsx')
  );
  
  for (const file of heroFiles) {
    try {
      const content = await readFile(file, 'utf-8');
      
      // Chercher les images hero avec des problèmes
      const patterns = [
        /src=["']([^"']*hero[^"']*)["']/gi,
        /src=["']([^"']*chateau[^"']*header[^"']*)["']/gi,
        /src=["']([^"']*%2F[^"']*)["']/gi, // Chemins encodés
      ];
      
      let newContent = content;
      let hasChanges = false;
      
      for (const pattern of patterns) {
        const matches = [...content.matchAll(pattern)];
        for (const match of matches) {
          const oldSrc = match[1];
          
          // Décoder si encodé
          const decodedSrc = decodeURIComponent(oldSrc);
          
          // Si ce n'est pas déjà le bon chemin ou si c'est encodé
          if ((oldSrc !== heroPath && !oldSrc.includes('placeholder')) || oldSrc.includes('%2F')) {
            newContent = newContent.replace(oldSrc, heroPath);
            hasChanges = true;
            
            fixes.push({
              file: path.relative(ROOT_DIR, file),
              issue: `Hero image incorrect ou encodée: ${oldSrc}`,
              fix: `Remplacé par: ${heroPath}`,
              applied: !dryRun,
            });
          }
        }
      }
      
      if (hasChanges && !dryRun) {
        await writeFile(file, newContent);
      }
    } catch (error) {
      console.warn(`Erreur traitement ${file}:`, error);
    }
  }
  
  return fixes;
}

// Supprimer les imports d'images et les remplacer par des chaînes
async function fixImageImports(files: string[], dryRun: boolean): Promise<SpecificFix[]> {
  const fixes: SpecificFix[] = [];
  
  for (const file of files) {
    try {
      const content = await readFile(file, 'utf-8');
      const lines = content.split('\n');
      
      let newContent = content;
      let hasChanges = false;
      
      // Chercher les imports d'images
      const importPattern = /import\s+(\w+)\s+from\s+["']([^"']*\.(png|jpg|jpeg|webp|avif|svg|gif))["']/gi;
      const matches = [...content.matchAll(importPattern)];
      
      for (const match of matches) {
        const varName = match[1];
        const importPath = match[2];
        const fullMatch = match[0];
        
        // Déterminer le chemin public
        let publicPath = importPath;
        if (importPath.startsWith('@/public/')) {
          publicPath = importPath.replace('@/public', '');
        } else if (importPath.startsWith('./') || importPath.startsWith('../')) {
          // Résoudre le chemin relatif
          const fileDir = path.dirname(file);
          const resolvedPath = path.resolve(fileDir, importPath);
          publicPath = '/' + path.relative(PUBLIC_DIR, resolvedPath);
        }
        
        // Supprimer l'import
        newContent = newContent.replace(fullMatch, `// ${fullMatch} // Converti en chaîne`);
        
        // Remplacer les utilisations de la variable par la chaîne
        const varUsagePattern = new RegExp(`{${varName}}|${varName}`, 'g');
        newContent = newContent.replace(varUsagePattern, `"${publicPath}"`);
        
        hasChanges = true;
        
        fixes.push({
          file: path.relative(ROOT_DIR, file),
          issue: `Import d'image: ${varName} from ${importPath}`,
          fix: `Converti en chaîne: "${publicPath}"`,
          applied: !dryRun,
        });
      }
      
      if (hasChanges && !dryRun) {
        await writeFile(file, newContent);
      }
    } catch (error) {
      console.warn(`Erreur traitement ${file}:`, error);
    }
  }
  
  return fixes;
}

// Fonction principale
async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--write');
  
  console.log('🎯 Correction des cas spécifiques critiques\n');
  console.log(`Mode: ${dryRun ? '🔍 SIMULATION' : '✍️  ÉCRITURE'}\n`);
  
  try {
    // Trouver le meilleur logo et hero
    console.log('🔍 Recherche des assets optimaux...');
    const logoPath = await findBestLogo();
    const heroPath = await findBestHero();
    
    console.log(`   Logo: ${logoPath || '❌ Non trouvé'}`);
    console.log(`   Hero: ${heroPath || '❌ Non trouvé'}\n`);
    
    if (!logoPath || !heroPath) {
      console.log('⚠️  Certains assets critiques sont manquants');
      console.log('   Vérifiez que les fichiers sont bien présents dans /public\n');
    }
    
    // Scanner les fichiers
    console.log('📁 Scan des fichiers source...');
    const files = await findTSXFiles(ROOT_DIR);
    console.log(`   ✓ ${files.length} fichiers trouvés\n`);
    
    // Appliquer les corrections
    const allFixes: SpecificFix[] = [];
    
    if (logoPath) {
      console.log('🔧 Correction du logo navbar...');
      const logoFixes = await fixNavbarLogo(files, logoPath, dryRun);
      allFixes.push(...logoFixes);
      console.log(`   ${logoFixes.length} corrections\n`);
    }
    
    if (heroPath) {
      console.log('🔧 Correction du hero home...');
      const heroFixes = await fixHomeHero(files, heroPath, dryRun);
      allFixes.push(...heroFixes);
      console.log(`   ${heroFixes.length} corrections\n`);
    }
    
    console.log('🔧 Correction des imports d\'images...');
    const importFixes = await fixImageImports(files, dryRun);
    allFixes.push(...importFixes);
    console.log(`   ${importFixes.length} corrections\n`);
    
    // Afficher le résumé
    console.log('─'.repeat(60));
    console.log('📊 RÉSUMÉ DES CORRECTIONS');
    console.log('─'.repeat(60));
    
    if (allFixes.length > 0) {
      for (const fix of allFixes) {
        console.log(`\n${fix.applied ? '✓' : '→'} ${fix.file}`);
        console.log(`  Issue: ${fix.issue}`);
        console.log(`  Fix: ${fix.fix}`);
      }
      
      console.log('\n' + '─'.repeat(60));
      console.log(`Total: ${allFixes.length} corrections${dryRun ? ' (simulation)' : ' appliquées'}`);
      console.log('─'.repeat(60));
    } else {
      console.log('✅ Aucune correction nécessaire');
      console.log('─'.repeat(60));
    }
    
    if (dryRun && allFixes.length > 0) {
      console.log('\n💡 Pour appliquer ces corrections, exécutez:');
      console.log('   tsx scripts/fix-specific-cases.ts --write\n');
    }
    
  } catch (error) {
    console.error('\n❌ Erreur fatale:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { main, fixNavbarLogo, fixHomeHero, fixImageImports };

