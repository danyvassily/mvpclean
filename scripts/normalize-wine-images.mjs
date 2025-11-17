#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..')
const sourceDir = path.join(projectRoot, 'public', 'asset', 'assets sauvegarde', 'page', 'Nos Cuvée-ok')
const targetDir = path.join(projectRoot, 'public', 'images', 'vins')
const pdfTargetDir = path.join(projectRoot, 'public', 'fiche-technique')

// Créer les dossiers cibles s'ils n'existent pas
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true })
}

if (!fs.existsSync(pdfTargetDir)) {
  fs.mkdirSync(pdfTargetDir, { recursive: true })
}

// Fonction pour normaliser un nom de fichier
function normalizeFilename(filename) {
  const [name, ...extParts] = filename.split('.')
  const ext = extParts.join('.').toLowerCase()
  
  const normalized = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9.-]/g, '-') // Remplace caractères spéciaux par tirets
    .replace(/-+/g, '-') // Remplace tirets multiples par un seul
    .replace(/^-|-$/g, '') // Supprime tirets au début/fin
  
  return `${normalized}.${ext}`
}

// Mapping des fichiers à copier (images avec fond transparent "-sf" de préférence)
const imageMappings = {
  // Gamme Domeni
  'blanc-domeni-sf.png': 'Gamme Domeni/Page Cuvée Domeni blanc/BLANC_DOMENI_sf.png',
  'rose-domeni-sf.png': 'Gamme Domeni/Page Cuvée domeni Rosé/ROSE DOMENI-sf.png',
  'rouge-domeni-sf.png': 'Gamme Domeni/Page Cuvée Domeni Rouge/ROUGE_DOMENI_sf.png',
  
  // Gamme Opus
  'blanc-opus-sf.png': 'Gamme Opus/Page Cuvée Opus Blanc/BLANC_OPUS_sf.png',
  'rouge-opus-sf.png': 'Gamme Opus/Page Cuvée Opus Rouge/ROUGE_OPUS_sf.png',
  
  // Gamme Méthode Ancestrale
  'la-methode-blanc-st.png': 'Gamme Méthode Ancestral/Page Méthode Blanche/LA_METHODE_BLANC_st.png',
  'la-methode-rose-sf.png': 'Gamme Méthode Ancestral/Page Méthode Rosé/LA_METHODE_ROSE_SF.png',
  
  // Gamme Perlé
  'blanc-perle-sf.png': 'Gamme perlé/Page cuvée Perlé/BLANC_PERLE_sf.png',
  
  // Gamme Poussin
  'poussin-blanc-sf.png': 'Gamme poussin/Page Cuvée poussin Blanc/POUSSIN BLANC-SF.png',
  'poussin-rose-sf.png': 'Gamme poussin/Page Cuvée Poussin Rosé/POUSSIN ROSE-SF.png',
  
  // Gamme Petrichor
  'petrichor-st.png': 'Gamme Petrichor/Page Cuvée Pertichor Rouge/PETRICHOR_st.png',
  'petrichor-ros-sf.png': 'Gamme Petrichor/Page Cuvée Petrichor Rosé/PETRICHOR__Ros_SF.png',
  
  // Gamme Confidentiel
  'claire-de-lune-sf.png': 'Gamme Confidentiel/Page cuvée Claire de Lune/CLAIRE_DE_LUNE_sf.png',
  'pigeonnier-sf.png': 'Gamme Confidentiel/Page Cuvée Pigeonnier/PIGEONNIER_sf.png',
}

// Mapping des PDFs (fiches techniques)
const pdfMappings = {
  'ft-blanc-domeni-2024.pdf': 'Gamme Domeni/Page Cuvée Domeni blanc/FT_blanc_Domeni 2024.pdf',
  'ft-rose-domeni-2024-1.pdf': 'Gamme Domeni/Page Cuvée domeni Rosé/FT_rosé_Domeni_2024 (1).pdf',
  'ft-rouge-domeni-2022.pdf': 'Gamme Domeni/Page Cuvée Domeni Rouge/FT_rouge_Domeni_2022.pdf',
  
  'ft-blanc-opus-2023.pdf': 'Gamme Opus/Page Cuvée Opus Blanc/FT_blanc_Opus_2023.pdf',
  'ft-rouge-opus-2021.pdf': 'Gamme Opus/Page Cuvée Opus Rouge/FT_rouge_opus_2021.pdf',
  
  'ft-la-methode-blanc.pdf': 'Gamme Méthode Ancestral/Page Méthode Blanche/FT_la_méthode_blanc.pdf',
  'ft-la-methode-rosee-23.pdf': 'Gamme Méthode Ancestral/Page Méthode Rosé/FT_la_méthode_rosée_23.pdf',
  
  'ft-perle-2023.pdf': 'Gamme perlé/Page cuvée Perlé/FT_perlé_2023.pdf',
  
  'ft-poussin-moelleux-2024.pdf': 'Gamme poussin/Page Cuvée poussin Blanc/FT_poussin_moelleux_2024.pdf',
  'ft-poussin-rose-moelleux-2024.pdf': 'Gamme poussin/Page Cuvée Poussin Rosé/FT_poussin rosé_moelleux_2024.pdf',
  
  'ft-rouge-petrichor-2020.pdf': 'Gamme Petrichor/Page Cuvée Pertichor Rouge/FT_Rouge_Petrichor_2020.pdf',
  'ft-rose-petrichor-2024.pdf': 'Gamme Petrichor/Page Cuvée Petrichor Rosé/FT_Rosé_Petrichor_2024.pdf',
  
  'ft-blanc-claire-de-lune-2023.pdf': 'Gamme Confidentiel/Page cuvée Claire de Lune/FT_blanc_claire_de_lune_2023.pdf',
  'ft-rouge-cuvee-du-pigeonnier-2022.pdf': 'Gamme Confidentiel/Page Cuvée Pigeonnier/FT_Rouge_Cuvée_du_Pigeonnier_2022.pdf',
}

let successCount = 0
let errorCount = 0
const errors = []

// Copier les images
console.log('📸 Copie des images de bouteilles...\n')
Object.entries(imageMappings).forEach(([targetName, sourcePath]) => {
  const fullSourcePath = path.join(sourceDir, sourcePath)
  const fullTargetPath = path.join(targetDir, targetName)
  
  try {
    if (fs.existsSync(fullSourcePath)) {
      fs.copyFileSync(fullSourcePath, fullTargetPath)
      console.log(`✅ ${targetName}`)
      successCount++
    } else {
      console.error(`❌ Source introuvable: ${sourcePath}`)
      errors.push({ file: targetName, error: 'Source introuvable' })
      errorCount++
    }
  } catch (error) {
    console.error(`❌ Erreur pour ${targetName}:`, error.message)
    errors.push({ file: targetName, error: error.message })
    errorCount++
  }
})

// Copier les PDFs
console.log('\n📄 Copie des fiches techniques (PDF)...\n')
Object.entries(pdfMappings).forEach(([targetName, sourcePath]) => {
  const fullSourcePath = path.join(sourceDir, sourcePath)
  const fullTargetPath = path.join(pdfTargetDir, targetName)
  
  try {
    if (fs.existsSync(fullSourcePath)) {
      fs.copyFileSync(fullSourcePath, fullTargetPath)
      console.log(`✅ ${targetName}`)
      successCount++
    } else {
      console.error(`❌ Source introuvable: ${sourcePath}`)
      errors.push({ file: targetName, error: 'Source introuvable' })
      errorCount++
    }
  } catch (error) {
    console.error(`❌ Erreur pour ${targetName}:`, error.message)
    errors.push({ file: targetName, error: error.message })
    errorCount++
  }
})

// Copier l'image hero de la page Nos Vins
console.log('\n🎨 Copie de l\'image hero...\n')
const heroSource = path.join(sourceDir, 'Photo entête de page cuvées blanc/Vin-Blanc-Rouge-Rosé-Bulles-Gaillac-Sud-Ouest-France.jpg')
const heroTarget = path.join(targetDir, 'vin-blanc-rouge-rose-bulles-gaillac-sud-ouest-france.jpg')

try {
  if (fs.existsSync(heroSource)) {
    fs.copyFileSync(heroSource, heroTarget)
    console.log('✅ vin-blanc-rouge-rose-bulles-gaillac-sud-ouest-france.jpg')
    successCount++
  } else {
    console.error('❌ Image hero introuvable')
    errors.push({ file: 'hero', error: 'Source introuvable' })
    errorCount++
  }
} catch (error) {
  console.error('❌ Erreur pour l\'image hero:', error.message)
  errors.push({ file: 'hero', error: error.message })
  errorCount++
}

// Résumé
console.log('\n' + '='.repeat(60))
console.log('📊 RÉSUMÉ')
console.log('='.repeat(60))
console.log(`✅ Fichiers copiés avec succès: ${successCount}`)
console.log(`❌ Erreurs: ${errorCount}`)

if (errors.length > 0) {
  console.log('\n❌ Détails des erreurs:')
  errors.forEach(({ file, error }) => {
    console.log(`   - ${file}: ${error}`)
  })
}

console.log('\n✨ Script terminé !\n')
process.exit(errorCount > 0 ? 1 : 0)

