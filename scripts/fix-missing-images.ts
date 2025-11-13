#!/usr/bin/env ts-node
/**
 * Script d'audit et de correction des images manquantes
 * 
 * Ce script effectue :
 * 1. Scanner toutes les références d'images dans le codebase
 * 2. Détecter les pointeurs Git LFS
 * 3. Normaliser les noms de fichiers (kebab-case, sans accents, sans espaces)
 * 4. Déplacer les assets dans /public/images
 * 5. Mettre à jour toutes les références dans le code
 * 6. Générer des rapports détaillés
 */

import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';

const exec = promisify(execCallback);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);
const rename = promisify(fs.rename);
const access = promisify(fs.access);

// Configuration
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const REPORTS_DIR = path.join(ROOT_DIR, 'reports');
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.gif'];
const IMAGE_PATTERN = /\.(png|jpg|jpeg|webp|avif|svg|gif)$/i;

// Types
interface ImageReference {
  whereFound: string;
  filePath: string;
  line: number;
  rawSrc: string;
  resolvedPublicPath: string;
  exists: boolean;
  caseMismatch: boolean;
  probableMatch: string | null;
  notes: string;
}

interface LFSPointer {
  filePath: string;
  isPointer: boolean;
  version?: string;
  oid?: string;
  size?: number;
}

interface FixResult {
  scanned: number;
  found: number;
  moved: number;
  renamed: number;
  referencesPatched: number;
  lfsPointers: number;
  errors: string[];
}

// Utilitaires de normalisation
function normalizeFilename(filename: string): string {
  return filename
    // Remplacer les espaces par des tirets
    .replace(/\s+/g, '-')
    // Enlever les accents et diacritiques
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Supprimer les caractères spéciaux sauf tirets et points
    .replace(/[^a-zA-Z0-9.\-_]/g, '')
    // Pas de tirets multiples
    .replace(/-+/g, '-')
    // Pas de tirets au début/fin
    .replace(/^-+|-+$/g, '')
    // Tout en minuscules
    .toLowerCase();
}

function normalizePath(imagePath: string): string {
  return imagePath
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9/.\-_]/g, '')
    .replace(/-+/g, '-')
    .toLowerCase();
}

// Distance de Levenshtein pour matching fuzzy
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

// Trouver le fichier le plus proche
function findClosestMatch(target: string, candidates: string[]): string | null {
  if (candidates.length === 0) return null;

  const normalizedTarget = normalizeFilename(path.basename(target).toLowerCase());
  let bestMatch = candidates[0];
  let bestDistance = levenshteinDistance(
    normalizedTarget,
    normalizeFilename(path.basename(candidates[0]).toLowerCase())
  );

  for (const candidate of candidates.slice(1)) {
    const distance = levenshteinDistance(
      normalizedTarget,
      normalizeFilename(path.basename(candidate).toLowerCase())
    );
    if (distance < bestDistance) {
      bestDistance = distance;
      bestMatch = candidate;
    }
  }

  // Seuil de similarité : accepter si distance < 30% de la longueur
  if (bestDistance < normalizedTarget.length * 0.3) {
    return bestMatch;
  }

  return null;
}

// Détecter si un fichier est un pointeur Git LFS
async function isLFSPointer(filePath: string): Promise<LFSPointer> {
  try {
    const content = await readFile(filePath, 'utf-8');
    const lines = content.split('\n');
    
    if (lines[0]?.startsWith('version https://git-lfs.github.com/spec')) {
      const result: LFSPointer = {
        filePath,
        isPointer: true,
      };

      for (const line of lines) {
        if (line.startsWith('version ')) {
          result.version = line.split(' ')[1];
        } else if (line.startsWith('oid sha256:')) {
          result.oid = line.split(':')[1];
        } else if (line.startsWith('size ')) {
          result.size = parseInt(line.split(' ')[1]);
        }
      }

      return result;
    }
  } catch (error) {
    // Si erreur de lecture ou fichier binaire, ce n'est pas un pointeur
  }

  return { filePath, isPointer: false };
}

// Scanner récursivement les fichiers
async function scanDirectory(dir: string, extensions: string[] = []): Promise<string[]> {
  const results: string[] = [];
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      // Ignorer node_modules, .next, .git, etc.
      if (entry.name.startsWith('.') || 
          entry.name === 'node_modules' || 
          entry.name === '.next' ||
          entry.name === 'reports') {
        continue;
      }
      
      if (entry.isDirectory()) {
        const subResults = await scanDirectory(fullPath, extensions);
        results.push(...subResults);
      } else if (entry.isFile()) {
        if (extensions.length === 0 || extensions.some(ext => fullPath.endsWith(ext))) {
          results.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.warn(`Erreur lors du scan de ${dir}:`, error);
  }
  
  return results;
}

// Extraire les références d'images du code
function extractImageReferences(content: string, filePath: string): ImageReference[] {
  const references: ImageReference[] = [];
  const lines = content.split('\n');
  
  // Patterns de recherche
  const patterns = [
    // JSX/TSX: <Image src="..." /> ou <img src="..." />
    /(?:src|href)=["']([^"']*\.(?:png|jpg|jpeg|webp|avif|svg|gif))["']/gi,
    // CSS: url(...)
    /url\(["']?([^)"']*\.(?:png|jpg|jpeg|webp|avif|svg|gif))["']?\)/gi,
    // Import d'images
    /import\s+.*?\s+from\s+["']([^"']*\.(?:png|jpg|jpeg|webp|avif|svg|gif))["']/gi,
    // Chaînes de caractères contenant des chemins d'images
    /["']([^"']*\/[^"']*\.(?:png|jpg|jpeg|webp|avif|svg|gif))["']/gi,
  ];
  
  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(line)) !== null) {
        const rawSrc = match[1];
        if (!rawSrc) continue;
        
        // Résoudre le chemin
        let resolvedPath = rawSrc;
        
        // Si c'est un chemin relatif
        if (rawSrc.startsWith('./') || rawSrc.startsWith('../')) {
          const fileDir = path.dirname(filePath);
          resolvedPath = path.resolve(fileDir, rawSrc);
        }
        // Si c'est un alias @/
        else if (rawSrc.startsWith('@/')) {
          resolvedPath = path.join(ROOT_DIR, rawSrc.substring(2));
        }
        // Si c'est un chemin absolu depuis /public
        else if (rawSrc.startsWith('/')) {
          resolvedPath = path.join(PUBLIC_DIR, rawSrc);
        }
        
        references.push({
          whereFound: 'code',
          filePath: path.relative(ROOT_DIR, filePath),
          line: index + 1,
          rawSrc,
          resolvedPublicPath: resolvedPath,
          exists: false,
          caseMismatch: false,
          probableMatch: null,
          notes: '',
        });
      }
    }
  });
  
  return references;
}

// Trouver toutes les images dans /public
async function findAllPublicImages(): Promise<string[]> {
  return await scanDirectory(PUBLIC_DIR, IMAGE_EXTENSIONS);
}

// Scanner toutes les références d'images
async function scanImageReferences(): Promise<ImageReference[]> {
  console.log('🔍 Scanning des références d\'images...');
  
  const allReferences: ImageReference[] = [];
  
  // Scanner les fichiers source
  const sourceExtensions = ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss', '.json', '.md', '.mdx'];
  const sourceFiles = await scanDirectory(ROOT_DIR, sourceExtensions);
  
  for (const file of sourceFiles) {
    try {
      const content = await readFile(file, 'utf-8');
      const refs = extractImageReferences(content, file);
      allReferences.push(...refs);
    } catch (error) {
      console.warn(`Erreur lecture ${file}:`, error);
    }
  }
  
  console.log(`✅ ${allReferences.length} références d'images trouvées dans ${sourceFiles.length} fichiers`);
  
  return allReferences;
}

// Vérifier l'existence et trouver les correspondances
async function resolveReferences(
  references: ImageReference[],
  publicImages: string[]
): Promise<void> {
  console.log('🔍 Résolution des références...');
  
  for (const ref of references) {
    try {
      // Vérifier si le fichier existe exactement
      await access(ref.resolvedPublicPath, fs.constants.F_OK);
      ref.exists = true;
    } catch {
      ref.exists = false;
      
      // Chercher une correspondance case-insensitive
      const basename = path.basename(ref.resolvedPublicPath).toLowerCase();
      const caseInsensitiveMatch = publicImages.find(
        img => path.basename(img).toLowerCase() === basename
      );
      
      if (caseInsensitiveMatch) {
        ref.caseMismatch = true;
        ref.probableMatch = caseInsensitiveMatch;
        ref.notes = 'Différence de casse détectée';
      } else {
        // Chercher une correspondance fuzzy
        const fuzzyMatch = findClosestMatch(ref.resolvedPublicPath, publicImages);
        if (fuzzyMatch) {
          ref.probableMatch = fuzzyMatch;
          ref.notes = 'Correspondance approximative trouvée';
        } else {
          ref.notes = 'Fichier introuvable';
        }
      }
    }
  }
}

// Détecter tous les pointeurs LFS
async function detectLFSPointers(): Promise<LFSPointer[]> {
  console.log('🔍 Détection des pointeurs Git LFS...');
  
  const publicImages = await findAllPublicImages();
  const lfsPointers: LFSPointer[] = [];
  
  for (const imagePath of publicImages) {
    const result = await isLFSPointer(imagePath);
    if (result.isPointer) {
      lfsPointers.push(result);
    }
  }
  
  console.log(`✅ ${lfsPointers.length} pointeurs LFS détectés`);
  
  return lfsPointers;
}

// Générer les rapports
async function generateReports(
  references: ImageReference[],
  lfsPointers: LFSPointer[],
  result: FixResult
): Promise<void> {
  console.log('📝 Génération des rapports...');
  
  // Créer le dossier reports s'il n'existe pas
  await mkdir(REPORTS_DIR, { recursive: true });
  
  // Rapport CSV
  const csvHeader = 'whereFound,filePath,line,rawSrc,resolvedPublicPath,exists,caseMismatch,probableMatch,notes\n';
  const csvRows = references.map(ref => 
    `"${ref.whereFound}","${ref.filePath}",${ref.line},"${ref.rawSrc}","${ref.resolvedPublicPath}",${ref.exists},${ref.caseMismatch},"${ref.probableMatch || ''}","${ref.notes}"`
  ).join('\n');
  
  await writeFile(
    path.join(REPORTS_DIR, 'image-audit.csv'),
    csvHeader + csvRows
  );
  
  // Rapport JSON détaillé
  await writeFile(
    path.join(REPORTS_DIR, 'fixed-images.json'),
    JSON.stringify(result, null, 2)
  );
  
  // Rapport LFS
  await writeFile(
    path.join(REPORTS_DIR, 'lfs-images.json'),
    JSON.stringify(lfsPointers, null, 2)
  );
  
  console.log(`✅ Rapports générés dans ${REPORTS_DIR}/`);
}

// Corriger les références dans le code
async function fixCodeReferences(
  references: ImageReference[],
  writeMode: boolean
): Promise<number> {
  if (!writeMode) return 0;
  
  console.log('🔧 Correction des références dans le code...');
  
  let patchedCount = 0;
  const fileChanges = new Map<string, { content: string; changes: number }>();
  
  // Grouper les références par fichier
  const refsByFile = new Map<string, ImageReference[]>();
  for (const ref of references) {
    if (!ref.exists && ref.probableMatch) {
      const filePath = path.join(ROOT_DIR, ref.filePath);
      if (!refsByFile.has(filePath)) {
        refsByFile.set(filePath, []);
      }
      refsByFile.get(filePath)!.push(ref);
    }
  }
  
  // Appliquer les corrections
  for (const [filePath, refs] of refsByFile) {
    try {
      let content = await readFile(filePath, 'utf-8');
      let changes = 0;
      
      for (const ref of refs) {
        if (ref.probableMatch) {
          // Convertir en chemin public absolu
          const newPath = '/' + path.relative(PUBLIC_DIR, ref.probableMatch);
          const oldPath = ref.rawSrc;
          
          if (content.includes(oldPath)) {
            content = content.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
            changes++;
            patchedCount++;
          }
        }
      }
      
      if (changes > 0) {
        await writeFile(filePath, content);
        console.log(`  ✓ ${path.relative(ROOT_DIR, filePath)}: ${changes} références corrigées`);
      }
    } catch (error) {
      console.error(`  ✗ Erreur correction ${filePath}:`, error);
    }
  }
  
  return patchedCount;
}

// Fonction principale
async function main() {
  const args = process.argv.slice(2);
  const writeMode = args.includes('--write');
  const checkMode = args.includes('--check');
  
  console.log('🚀 Audit et correction des images manquantes\n');
  console.log(`Mode: ${writeMode ? '✍️  ÉCRITURE' : '🔍 LECTURE SEULE'}\n`);
  
  const result: FixResult = {
    scanned: 0,
    found: 0,
    moved: 0,
    renamed: 0,
    referencesPatched: 0,
    lfsPointers: 0,
    errors: [],
  };
  
  try {
    // 1. Scanner les références
    const references = await scanImageReferences();
    result.scanned = references.length;
    
    // 2. Trouver toutes les images publiques
    const publicImages = await findAllPublicImages();
    
    // 3. Résoudre les références
    await resolveReferences(references, publicImages);
    
    const existingRefs = references.filter(r => r.exists);
    const missingRefs = references.filter(r => !r.exists);
    const fixableRefs = missingRefs.filter(r => r.probableMatch);
    
    result.found = existingRefs.length;
    
    // 4. Détecter les pointeurs LFS
    const lfsPointers = await detectLFSPointers();
    result.lfsPointers = lfsPointers.length;
    
    // 5. Corriger les références (si mode écriture)
    if (writeMode && fixableRefs.length > 0) {
      result.referencesPatched = await fixCodeReferences(references, writeMode);
    }
    
    // 6. Générer les rapports
    await generateReports(references, lfsPointers, result);
    
    // 7. Afficher le résumé
    console.log('\n📊 RÉSUMÉ:');
    console.log('─'.repeat(50));
    console.log(`📸 Références scannées:       ${result.scanned}`);
    console.log(`✅ Références valides:        ${result.found}`);
    console.log(`❌ Références manquantes:     ${missingRefs.length}`);
    console.log(`🔧 Corrections possibles:     ${fixableRefs.length}`);
    console.log(`🔄 Références patchées:       ${result.referencesPatched}`);
    console.log(`⚠️  Pointeurs LFS détectés:   ${result.lfsPointers}`);
    console.log('─'.repeat(50));
    
    if (lfsPointers.length > 0) {
      console.log('\n⚠️  ATTENTION: Pointeurs Git LFS détectés!');
      console.log('Pour récupérer les fichiers binaires, exécutez:');
      console.log('  git lfs pull --include="public/**"');
      console.log('Puis relancez ce script avec --write\n');
    }
    
    if (checkMode) {
      // Mode check: retourne code d'erreur si des références sont cassées
      if (missingRefs.length > 0) {
        console.log(`\n❌ ${missingRefs.length} références cassées détectées`);
        process.exit(1);
      } else {
        console.log('\n✅ Toutes les références d\'images sont valides');
        process.exit(0);
      }
    }
    
    if (!writeMode && fixableRefs.length > 0) {
      console.log('\n💡 Pour appliquer les corrections, exécutez:');
      console.log('  npm run fix:images\n');
    }
    
  } catch (error) {
    console.error('\n❌ Erreur fatale:', error);
    result.errors.push(String(error));
    process.exit(1);
  }
}

// Exécution
if (require.main === module) {
  main().catch(console.error);
}

export { main, scanImageReferences, detectLFSPointers };

