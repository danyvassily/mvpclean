#!/usr/bin/env tsx
/**
 * Script pour restaurer automatiquement les fichiers LFS manquants
 * depuis un dossier de sauvegarde
 */

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface LFSPointer {
  filePath: string;
  isPointer: boolean;
  oid: string;
  size: number;
}

interface RestoreResult {
  found: number;
  copied: number;
  notFound: number;
  alreadyReal: number;
  errors: string[];
}

/**
 * Recherche récursive d'un fichier dans un dossier
 */
async function findFileRecursive(
  startDir: string,
  fileName: string
): Promise<string | null> {
  try {
    const items = await fs.promises.readdir(startDir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(startDir, item.name);

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

        const found = await findFileRecursive(fullPath, fileName);
        if (found) return found;
      } else if (item.isFile() && item.name === fileName) {
        return fullPath;
      }
    }
  } catch (error) {
    // Ignorer les erreurs de permission
    if ((error as NodeJS.ErrnoException).code !== 'EACCES') {
      console.error(`Erreur lors de la lecture de ${startDir}:`, error);
    }
  }

  return null;
}

/**
 * Vérifie si un fichier est un pointeur LFS
 */
async function isLFSPointer(filePath: string): Promise<boolean> {
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const lines = content.split('\n').slice(0, 5); // Lire les 5 premières lignes

    return lines.some((line) => line.includes('git-lfs.github.com'));
  } catch {
    return false;
  }
}

/**
 * Copie un fichier en créant les dossiers nécessaires
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
    console.error('❌ Usage: tsx scripts/restore-from-backup.ts --backup-dir /chemin/vers/sauvegarde');
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

  console.log('🔍 Restauration des fichiers LFS depuis la sauvegarde\n');
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

  console.log(`📊 Total de pointeurs LFS à restaurer: ${lfsPointers.length}\n`);
  console.log('⏳ Recherche des fichiers dans la sauvegarde...\n');

  const result: RestoreResult = {
    found: 0,
    copied: 0,
    notFound: 0,
    alreadyReal: 0,
    errors: [],
  };

  const notFoundFiles: string[] = [];

  for (let i = 0; i < lfsPointers.length; i++) {
    const pointer = lfsPointers[i];
    const fileName = path.basename(pointer.filePath);
    const progress = `[${i + 1}/${lfsPointers.length}]`;

    // Vérifier si c'est toujours un pointeur LFS
    const stillPointer = await isLFSPointer(pointer.filePath);

    if (!stillPointer) {
      console.log(`${progress} ✅ ${fileName} - Déjà un vrai fichier`);
      result.alreadyReal++;
      continue;
    }

    // Chercher le fichier dans la sauvegarde
    console.log(`${progress} 🔍 Recherche de ${fileName}...`);
    const foundPath = await findFileRecursive(backupDir, fileName);

    if (!foundPath) {
      console.log(`${progress} ❌ ${fileName} - NON TROUVÉ dans la sauvegarde`);
      result.notFound++;
      notFoundFiles.push(fileName);
      continue;
    }

    console.log(`${progress} ✅ ${fileName} - TROUVÉ: ${foundPath}`);
    result.found++;

    // Copier le fichier
    if (!dryRun) {
      try {
        await copyFile(foundPath, pointer.filePath);
        console.log(`${progress}    📋 Copié vers: ${pointer.filePath}`);
        result.copied++;
      } catch (error) {
        console.error(`${progress}    ❌ Erreur de copie:`, error);
        result.errors.push(`${fileName}: ${error}`);
      }
    } else {
      console.log(`${progress}    📋 SERAIT copié vers: ${pointer.filePath}`);
    }

    console.log('');
  }

  // Résumé
  console.log('\n' + '═'.repeat(70));
  console.log('  RÉSUMÉ DE LA RESTAURATION');
  console.log('═'.repeat(70));
  console.log(`✅ Fichiers trouvés:           ${result.found}`);
  console.log(`📋 Fichiers copiés:            ${result.copied}`);
  console.log(`✔️  Déjà vrais fichiers:        ${result.alreadyReal}`);
  console.log(`❌ Fichiers NON trouvés:       ${result.notFound}`);
  console.log(`⚠️  Erreurs:                    ${result.errors.length}`);
  console.log('═'.repeat(70));

  if (notFoundFiles.length > 0) {
    console.log('\n⚠️  FICHIERS NON TROUVÉS DANS LA SAUVEGARDE:\n');
    notFoundFiles.forEach((f) => console.log(`   • ${f}`));
    console.log('');
    console.log('💡 Ces fichiers peuvent être:');
    console.log('   - Absents de votre sauvegarde');
    console.log('   - Renommés différemment');
    console.log('   - Dans un sous-dossier non exploré');
    console.log('');
  }

  if (result.errors.length > 0) {
    console.log('\n❌ ERREURS RENCONTRÉES:\n');
    result.errors.forEach((e) => console.log(`   • ${e}`));
    console.log('');
  }

  if (dryRun) {
    console.log('\n💡 Mode simulation (dry-run) - Aucun fichier n\'a été copié');
    console.log('   Pour copier réellement, retirez l\'option --dry-run\n');
  } else if (result.copied > 0) {
    console.log('\n🎉 SUCCÈS! Fichiers restaurés depuis la sauvegarde!');
    console.log('\n📝 PROCHAINES ÉTAPES:\n');
    console.log('1. Désactiver Git LFS:');
    console.log('   rm .gitattributes\n');
    console.log('2. Vérifier les images:');
    console.log('   npm run audit:images\n');
    console.log('3. Commiter les changements:');
    console.log('   git add .');
    console.log('   git commit -m "feat: restore missing LFS images from backup"\n');
    console.log('4. Pusher (nouvelle branche ou nouveau repo):\n');
    console.log('   # Option A: Nouvelle branche');
    console.log('   git checkout -b feat/images-restored');
    console.log('   git push -u origin feat/images-restored\n');
    console.log('   # Option B: Nouveau repo');
    console.log('   git remote remove origin');
    console.log('   git remote add origin git@github.com:USERNAME/nouveau-repo.git');
    console.log('   git push -u origin main --force\n');
  }
}

main().catch(console.error);

