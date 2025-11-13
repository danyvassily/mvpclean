#!/usr/bin/env ts-node
/**
 * Script pour mettre à jour automatiquement les références d'images dans le code
 * 
 * Ce script utilise le mapping généré par normalize-and-move-assets.ts
 * pour mettre à jour toutes les références dans les fichiers source
 */

import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);

const ROOT_DIR = path.resolve(__dirname, '..');
const REPORTS_DIR = path.join(ROOT_DIR, 'reports');
const MAPPING_FILE = path.join(REPORTS_DIR, 'asset-moves-mapping.json');

interface UpdateStats {
  filesScanned: number;
  filesModified: number;
  referencesUpdated: number;
  errors: string[];
}

// Scanner récursivement les fichiers source
async function scanSourceFiles(dir: string, extensions: string[]): Promise<string[]> {
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
          entry.name === 'public') {
        continue;
      }
      
      if (entry.isDirectory()) {
        const subResults = await scanSourceFiles(fullPath, extensions);
        results.push(...subResults);
      } else if (entry.isFile()) {
        if (extensions.some(ext => fullPath.endsWith(ext))) {
          results.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.warn(`Erreur scan ${dir}:`, error);
  }
  
  return results;
}

// Mettre à jour les références dans un fichier
async function updateFileReferences(
  filePath: string,
  mapping: Record<string, string>,
  dryRun: boolean
): Promise<{ modified: boolean; updates: number }> {
  try {
    const content = await readFile(filePath, 'utf-8');
    let newContent = content;
    let updates = 0;
    
    // Remplacer chaque ancien chemin par le nouveau
    for (const [oldPath, newPath] of Object.entries(mapping)) {
      // Échapper les caractères spéciaux regex
      const escapedOld = oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedOld, 'g');
      
      const matches = content.match(regex);
      if (matches) {
        newContent = newContent.replace(regex, newPath);
        updates += matches.length;
      }
    }
    
    if (updates > 0 && !dryRun) {
      await writeFile(filePath, newContent);
    }
    
    return {
      modified: updates > 0,
      updates,
    };
  } catch (error) {
    throw new Error(`Erreur mise à jour ${filePath}: ${error}`);
  }
}

// Fonction principale
async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--write');
  
  console.log('🔄 Mise à jour des références d\'images dans le code\n');
  console.log(`Mode: ${dryRun ? '🔍 SIMULATION' : '✍️  ÉCRITURE'}\n`);
  
  const stats: UpdateStats = {
    filesScanned: 0,
    filesModified: 0,
    referencesUpdated: 0,
    errors: [],
  };
  
  try {
    // Charger le mapping
    console.log('📂 Chargement du mapping...');
    const mappingContent = await readFile(MAPPING_FILE, 'utf-8');
    const mapping: Record<string, string> = JSON.parse(mappingContent);
    
    const mappingCount = Object.keys(mapping).length;
    console.log(`   ✓ ${mappingCount} mappings chargés\n`);
    
    if (mappingCount === 0) {
      console.log('⚠️  Aucun mapping trouvé. Exécutez d\'abord:');
      console.log('   tsx scripts/normalize-and-move-assets.ts --write\n');
      return;
    }
    
    // Scanner les fichiers source
    console.log('🔍 Scan des fichiers source...');
    const extensions = ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss', '.json', '.md', '.mdx'];
    const sourceFiles = await scanSourceFiles(ROOT_DIR, extensions);
    stats.filesScanned = sourceFiles.length;
    console.log(`   ✓ ${sourceFiles.length} fichiers à scanner\n`);
    
    // Mettre à jour chaque fichier
    console.log(`${dryRun ? '🔍 Simulation' : '🔧 Application'} des mises à jour:\n`);
    
    for (const file of sourceFiles) {
      try {
        const result = await updateFileReferences(file, mapping, dryRun);
        
        if (result.modified) {
          const relativePath = path.relative(ROOT_DIR, file);
          console.log(`  ${dryRun ? '→' : '✓'} ${relativePath}: ${result.updates} références`);
          stats.filesModified++;
          stats.referencesUpdated += result.updates;
        }
      } catch (error) {
        const errorMsg = `${file}: ${error}`;
        stats.errors.push(errorMsg);
        console.error(`  ✗ ${errorMsg}`);
      }
    }
    
    // Afficher le résumé
    console.log('\n' + '─'.repeat(60));
    console.log('📊 RÉSUMÉ');
    console.log('─'.repeat(60));
    console.log(`📁 Fichiers scannés:         ${stats.filesScanned}`);
    console.log(`📝 Fichiers modifiés:        ${stats.filesModified}`);
    console.log(`🔄 Références mises à jour:  ${stats.referencesUpdated}`);
    console.log(`❌ Erreurs:                  ${stats.errors.length}`);
    console.log('─'.repeat(60));
    
    if (dryRun && stats.filesModified > 0) {
      console.log('\n💡 Pour appliquer ces changements, exécutez:');
      console.log('   tsx scripts/update-code-references.ts --write\n');
    } else if (!dryRun && stats.filesModified > 0) {
      console.log('\n✅ Mises à jour appliquées avec succès!\n');
    } else {
      console.log('\n✅ Aucune référence à mettre à jour\n');
    }
    
  } catch (error) {
    console.error('\n❌ Erreur fatale:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { main, updateFileReferences };

