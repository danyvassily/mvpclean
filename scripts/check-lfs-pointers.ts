#!/usr/bin/env ts-node
/**
 * Script pour vérifier et remedier les pointeurs Git LFS
 * 
 * Ce script :
 * 1. Scanne tous les fichiers images dans /public
 * 2. Détecte ceux qui sont des pointeurs LFS (pas des binaires réels)
 * 3. Propose des solutions de remediation
 */

import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';

const exec = promisify(execCallback);
const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const stat = promisify(fs.stat);

const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const REPORTS_DIR = path.join(ROOT_DIR, 'reports');
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.gif'];

interface LFSPointer {
  filePath: string;
  relativePath: string;
  isPointer: boolean;
  version?: string;
  oid?: string;
  size?: number;
  fileSize: number;
}

interface LFSReport {
  totalImages: number;
  lfsPointers: number;
  realFiles: number;
  pointers: LFSPointer[];
  hasLFSInstalled: boolean;
  canPull: boolean;
  remediationSteps: string[];
}

// Vérifier si un fichier est un pointeur LFS
async function checkLFSPointer(filePath: string): Promise<LFSPointer> {
  const fileStats = await stat(filePath);
  const result: LFSPointer = {
    filePath,
    relativePath: path.relative(ROOT_DIR, filePath),
    isPointer: false,
    fileSize: fileStats.size,
  };
  
  // Les pointeurs LFS sont généralement très petits (< 200 bytes)
  if (fileStats.size > 200) {
    return result;
  }
  
  try {
    const content = await readFile(filePath, 'utf-8');
    const lines = content.split('\n');
    
    if (lines[0]?.trim().startsWith('version https://git-lfs.github.com/spec')) {
      result.isPointer = true;
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('version ')) {
          result.version = trimmed.split(' ')[1];
        } else if (trimmed.startsWith('oid sha256:')) {
          result.oid = trimmed.substring('oid sha256:'.length);
        } else if (trimmed.startsWith('size ')) {
          result.size = parseInt(trimmed.split(' ')[1]);
        }
      }
    }
  } catch (error) {
    // Si on ne peut pas lire en UTF-8, c'est probablement un vrai fichier binaire
  }
  
  return result;
}

// Scanner récursivement pour trouver les images
async function scanImages(dir: string): Promise<string[]> {
  const results: string[] = [];
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.name.startsWith('.') || entry.name === 'node_modules') {
        continue;
      }
      
      if (entry.isDirectory()) {
        const subResults = await scanImages(fullPath);
        results.push(...subResults);
      } else if (entry.isFile()) {
        const ext = path.extname(fullPath).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
          results.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.warn(`Erreur scan ${dir}:`, error);
  }
  
  return results;
}

// Vérifier si Git LFS est installé
async function checkLFSInstalled(): Promise<boolean> {
  try {
    const { stdout } = await exec('git lfs version');
    return stdout.includes('git-lfs');
  } catch {
    return false;
  }
}

// Vérifier si on peut puller depuis LFS
async function checkCanPull(): Promise<boolean> {
  try {
    // Vérifier si on est dans un repo git
    await exec('git rev-parse --git-dir');
    
    // Vérifier si LFS est configuré
    const { stdout } = await exec('git lfs ls-files');
    return true;
  } catch {
    return false;
  }
}

// Générer le rapport LFS
async function generateLFSReport(pointers: LFSPointer[]): Promise<LFSReport> {
  const hasLFS = await checkLFSInstalled();
  const canPull = hasLFS && await checkCanPull();
  
  const report: LFSReport = {
    totalImages: pointers.length,
    lfsPointers: pointers.filter(p => p.isPointer).length,
    realFiles: pointers.filter(p => !p.isPointer).length,
    pointers: pointers.filter(p => p.isPointer),
    hasLFSInstalled: hasLFS,
    canPull,
    remediationSteps: [],
  };
  
  // Générer les étapes de remediation
  if (report.lfsPointers > 0) {
    report.remediationSteps.push(
      `⚠️  ${report.lfsPointers} pointeurs Git LFS détectés`
    );
    
    if (!hasLFS) {
      report.remediationSteps.push(
        '',
        '1️⃣  Installer Git LFS:',
        '   • macOS: brew install git-lfs',
        '   • Ubuntu: apt-get install git-lfs',
        '   • Windows: téléchargez depuis https://git-lfs.github.com/',
        ''
      );
    }
    
    if (hasLFS && canPull) {
      report.remediationSteps.push(
        '',
        '2️⃣  Récupérer les fichiers binaires:',
        '   git lfs pull --include="public/**"',
        '',
        '3️⃣  Vérifier que les fichiers ont été téléchargés:',
        '   npm run audit:images',
        '',
        '4️⃣  (Optionnel) Retirer LFS pour ces extensions:',
        '   Éditez .gitattributes et supprimez les lignes:',
        '   *.png filter=lfs diff=lfs merge=lfs -text',
        '   *.jpg filter=lfs diff=lfs merge=lfs -text',
        '   etc.',
        '',
        '5️⃣  Commiter les vrais fichiers:',
        '   git add .',
        '   git commit -m "chore: convert LFS pointers to real files"',
        ''
      );
    } else if (hasLFS && !canPull) {
      report.remediationSteps.push(
        '',
        '⚠️  Git LFS est installé mais non configuré pour ce repo',
        '',
        '1️⃣  Initialiser LFS:',
        '   git lfs install',
        '',
        '2️⃣  Puis suivre les étapes ci-dessus',
        ''
      );
    } else {
      report.remediationSteps.push(
        '',
        '❌ Impossible de récupérer les fichiers LFS',
        '   Vous devez obtenir les fichiers originaux d\'une autre source',
        ''
      );
    }
  } else {
    report.remediationSteps.push('✅ Aucun pointeur LFS détecté, tous les fichiers sont des binaires réels');
  }
  
  return report;
}

// Fonction principale
async function main() {
  console.log('🔍 Vérification des pointeurs Git LFS\n');
  
  try {
    // Scanner toutes les images
    console.log('📁 Scan des images dans /public...');
    const allImages = await scanImages(PUBLIC_DIR);
    console.log(`   Trouvé: ${allImages.length} images\n`);
    
    // Vérifier chaque image
    console.log('🔎 Vérification des pointeurs LFS...');
    const results: LFSPointer[] = [];
    
    for (const imagePath of allImages) {
      const result = await checkLFSPointer(imagePath);
      results.push(result);
      
      if (result.isPointer) {
        console.log(`   ⚠️  LFS: ${result.relativePath} (${result.size} bytes réels)`);
      }
    }
    
    // Générer le rapport
    const report = await generateLFSReport(results);
    
    // Sauvegarder le rapport
    await mkdir(REPORTS_DIR, { recursive: true });
    await writeFile(
      path.join(REPORTS_DIR, 'lfs-pointers-detailed.json'),
      JSON.stringify(report, null, 2)
    );
    
    // Afficher le résumé
    console.log('\n' + '═'.repeat(60));
    console.log('📊 RÉSUMÉ');
    console.log('═'.repeat(60));
    console.log(`📸 Total d'images:           ${report.totalImages}`);
    console.log(`✅ Fichiers binaires réels:  ${report.realFiles}`);
    console.log(`⚠️  Pointeurs LFS:            ${report.lfsPointers}`);
    console.log(`🔧 Git LFS installé:         ${report.hasLFSInstalled ? 'Oui' : 'Non'}`);
    console.log(`🔄 Peut puller depuis LFS:   ${report.canPull ? 'Oui' : 'Non'}`);
    console.log('═'.repeat(60));
    
    // Afficher les étapes de remediation
    if (report.remediationSteps.length > 0) {
      console.log('\n📋 ÉTAPES DE REMEDIATION:\n');
      for (const step of report.remediationSteps) {
        console.log(step);
      }
    }
    
    console.log(`\n💾 Rapport détaillé sauvegardé: reports/lfs-pointers-detailed.json\n`);
    
    // Code de sortie
    if (report.lfsPointers > 0) {
      console.log('⚠️  Action requise: des pointeurs LFS ont été détectés');
      process.exit(1);
    } else {
      console.log('✅ Aucun pointeur LFS, tout est OK!');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('\n❌ Erreur fatale:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { main, checkLFSPointer, scanImages };

