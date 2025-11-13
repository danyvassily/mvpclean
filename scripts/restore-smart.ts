#!/usr/bin/env tsx
/**
 * Script intelligent de restauration avec normalisation des noms de fichiers
 * Gère les variations : espaces/tirets, accents, majuscules, underscores
 */

import fs from 'fs';
import path from 'path';

interface LFSPointer {
  filePath: string;
  isPointer: boolean;
  oid: string;
  size: number;
}

interface FileIndex {
  [normalizedName: string]: string[]; // Nom normalisé -> chemins réels
}

/**
 * Normalise un nom de fichier pour la comparaison
 */
function normalizeFileName(fileName: string): string {
  return fileName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Enlever les accents
    .replace(/[_\s-]+/g, '-') // Unifier tirets, underscores, espaces
    .replace(/\.jpe?g$/i, '.jpg') // Normaliser extensions JPEG
    .replace(/\.png$/i, '.png');
}

/**
 * Indexe tous les fichiers du dossier de sauvegarde
 */
async function indexBackupFiles(backupDir: string): Promise<FileIndex> {
  const index: FileIndex = {};
  
  async function scanDir(dir: string): Promise<void> {
    try {
      const items = await fs.promises.readdir(dir, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        
        if (item.isDirectory()) {
          // Ignorer certains dossiers
          if (
            item.name === 'node_modules' ||
            item.name === '.git' ||
            item.name === '.next' ||
            item.name.startsWith('.')
          ) {
            continue;
          }
          await scanDir(fullPath);
        } else if (item.isFile()) {
          // Indexer les images uniquement
          if (/\.(jpe?g|png|gif|webp)$/i.test(item.name)) {
            const normalized = normalizeFileName(item.name);
            if (!index[normalized]) {
              index[normalized] = [];
            }
            index[normalized].push(fullPath);
          }
        }
      }
    } catch (error) {
      // Ignorer les erreurs de permission
      if ((error as NodeJS.ErrnoException).code !== 'EACCES') {
        console.error(`Erreur lors de la lecture de ${dir}:`, error);
      }
    }
  }
  
  await scanDir(backupDir);
  return index;
}

/**
 * Vérifie si un fichier est un pointeur LFS
 */
async function isLFSPointer(filePath: string): Promise<boolean> {
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const lines = content.split('\n').slice(0, 5);
    return lines.some((line) => line.includes('git-lfs.github.com'));
  } catch {
    return false;
  }
}

/**
 * Copie un fichier
 */
async function copyFile(src: string, dest: string): Promise<void> {
  const destDir = path.dirname(dest);
  await fs.promises.mkdir(destDir, { recursive: true });
  await fs.promises.copyFile(src, dest);
}

async function main() {
  const args = process.argv.slice(2);
  const backupDirIndex = args.indexOf('--backup-dir');
  const dryRun = args.includes('--dry-run');
  
  if (backupDirIndex === -1 || !args[backupDirIndex + 1]) {
    console.error('❌ Usage: tsx scripts/restore-smart.ts --backup-dir /chemin/vers/sauvegarde');
    console.error('');
    console.error('Options:');
    console.error('  --backup-dir <path>  Chemin vers le dossier de sauvegarde');
    console.error('  --dry-run            Simuler sans copier les fichiers');
    process.exit(1);
  }
  
  const backupDir = path.resolve(args[backupDirIndex + 1]);
  
  if (!fs.existsSync(backupDir)) {
    console.error(`❌ Le dossier de sauvegarde n'existe pas: ${backupDir}`);
    process.exit(1);
  }
  
  console.log('🧠 Restauration INTELLIGENTE des fichiers LFS\n');
  console.log(`📂 Dossier de sauvegarde: ${backupDir}`);
  console.log(`🎯 Mode: ${dryRun ? 'SIMULATION (dry-run)' : 'COPIE RÉELLE'}\n`);
  
  // Lire le rapport LFS
  const lfsReportPath = path.join(process.cwd(), 'reports/lfs-images.json');
  
  if (!fs.existsSync(lfsReportPath)) {
    console.error('❌ Fichier reports/lfs-images.json introuvable');
    console.error('   Exécutez d\'abord: npm run audit:images');
    process.exit(1);
  }
  
  const lfsPointers: LFSPointer[] = JSON.parse(
    fs.readFileSync(lfsReportPath, 'utf-8')
  );
  
  console.log(`📊 Total de pointeurs LFS: ${lfsPointers.length}\n`);
  console.log('🔍 Indexation du dossier de sauvegarde...');
  
  const fileIndex = await indexBackupFiles(backupDir);
  const indexedCount = Object.keys(fileIndex).length;
  
  console.log(`✅ ${indexedCount} fichiers indexés\n`);
  console.log('⏳ Recherche et copie des fichiers...\n');
  
  let found = 0;
  let copied = 0;
  let notFound = 0;
  let alreadyReal = 0;
  const errors: string[] = [];
  const notFoundFiles: string[] = [];
  
  for (let i = 0; i < lfsPointers.length; i++) {
    const pointer = lfsPointers[i];
    const fileName = path.basename(pointer.filePath);
    const progress = `[${i + 1}/${lfsPointers.length}]`;
    
    // Vérifier si c'est toujours un pointeur LFS
    const stillPointer = await isLFSPointer(pointer.filePath);
    
    if (!stillPointer) {
      console.log(`${progress} ✅ ${fileName} - Déjà un vrai fichier`);
      alreadyReal++;
      continue;
    }
    
    // Chercher dans l'index avec nom normalisé
    const normalized = normalizeFileName(fileName);
    const matches = fileIndex[normalized];
    
    if (!matches || matches.length === 0) {
      console.log(`${progress} ❌ ${fileName} - NON TROUVÉ`);
      notFound++;
      notFoundFiles.push(fileName);
      continue;
    }
    
    // Prendre le premier match (ou le plus pertinent)
    const sourcePath = matches[0];
    const sourceFileName = path.basename(sourcePath);
    
    console.log(`${progress} ✅ ${fileName} - TROUVÉ: ${sourceFileName}`);
    if (sourceFileName !== fileName) {
      console.log(`${progress}    📝 Nom différent: "${sourceFileName}" → "${fileName}"`);
    }
    found++;
    
    // Copier le fichier
    if (!dryRun) {
      try {
        await copyFile(sourcePath, pointer.filePath);
        console.log(`${progress}    📋 Copié vers: ${pointer.filePath}`);
        copied++;
      } catch (error) {
        console.error(`${progress}    ❌ Erreur de copie:`, error);
        errors.push(`${fileName}: ${error}`);
      }
    } else {
      console.log(`${progress}    📋 SERAIT copié vers: ${pointer.filePath}`);
    }
    
    console.log('');
  }
  
  // Résumé
  console.log('\n' + '═'.repeat(70));
  console.log('  RÉSUMÉ DE LA RESTAURATION INTELLIGENTE');
  console.log('═'.repeat(70));
  console.log(`✅ Fichiers trouvés:           ${found}`);
  console.log(`📋 Fichiers copiés:            ${copied}`);
  console.log(`✔️  Déjà vrais fichiers:        ${alreadyReal}`);
  console.log(`❌ Fichiers NON trouvés:       ${notFound}`);
  console.log(`⚠️  Erreurs:                    ${errors.length}`);
  console.log('═'.repeat(70));
  
  // Afficher un échantillon des fichiers non trouvés
  if (notFoundFiles.length > 0) {
    console.log('\n⚠️  FICHIERS NON TROUVÉS (échantillon, max 20):\n');
    notFoundFiles.slice(0, 20).forEach((f) => console.log(`   • ${f}`));
    if (notFoundFiles.length > 20) {
      console.log(`   ... et ${notFoundFiles.length - 20} autres`);
    }
    console.log('');
  }
  
  if (errors.length > 0) {
    console.log('\n❌ ERREURS:\n');
    errors.forEach((e) => console.log(`   • ${e}`));
    console.log('');
  }
  
  if (dryRun) {
    console.log('\n💡 Mode simulation - Aucun fichier n\'a été copié');
    console.log('   Pour copier réellement, retirez --dry-run\n');
  } else if (copied > 0) {
    console.log('\n🎉 SUCCÈS! Fichiers restaurés!\n');
    console.log('📝 PROCHAINES ÉTAPES:\n');
    console.log('1. Désactiver Git LFS:');
    console.log('   rm .gitattributes\n');
    console.log('2. Vérifier:');
    console.log('   npm run audit:images\n');
    console.log('3. Commiter:');
    console.log('   git add .');
    console.log('   git commit -m "feat: restore missing LFS images from backup"\n');
    console.log('4. Pusher:');
    console.log('   git checkout -b feat/images-restored');
    console.log('   git push -u origin feat/images-restored\n');
  }
  
  // Code de sortie
  if (!dryRun && notFound > 0) {
    console.log(`⚠️  ${notFound} fichiers n'ont pas été trouvés`);
    console.log('   Vous pouvez les chercher manuellement ou les ignorer\n');
  }
}

main().catch(console.error);

