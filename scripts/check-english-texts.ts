#!/usr/bin/env tsx

/**
 * Script de vérification des textes anglais dans le projet
 * Ce script parcourt tous les fichiers et identifie les textes anglais qui pourraient être visibles par l'utilisateur
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

const SRC_DIR = './src'
const ENGLISH_PATTERNS = [
  // Boutons et actions communs
  /\b(Submit|Cancel|Save|Delete|Edit|Close|Loading|Search|Back|Next|Previous)\b/g,
  /\b(Sign in|Sign up|Sign out|Logout|Login|Register)\b/g,
  /\b(My account|My orders|My profile|My cart)\b/g,
  /\b(Add to cart|Remove from cart|Checkout|Shop|Buy now)\b/g,
  /\b(Out of stock|In stock|No results|No items|Empty)\b/g,
  
  // Messages et états
  /\b(Welcome|Thank you|Please|Your|Success|Error|Warning)\b/g,
  /\b(Required|Optional|Continue|Finish|Start|Try again)\b/g,
  /\b(Home|About|Contact|Help|Settings|Profile|Terms|Privacy)\b/g,
  
  // Placeholders et champs
  /\b(Enter your|Search products|Your email|Your password|Your name)\b/g,
  /\b(First name|Last name|Phone number|Address|City|Country)\b/g,
  
  // Messages de succès/erreur
  /\b(Account created|Password updated|Order placed|Payment successful)\b/g,
  /\b(Added to cart|Removed from cart|Changes saved|Logged out)\b/g,
  
  // Navigation
  /\b(Back to|Return to|Go to|View more|Show less|Read more)\b/g,
  /\b(Filter|Sort|Apply|Reset|Clear|Select|Choose)\b/g,
]

const EXCLUDED_DIRS = [
  'node_modules',
  '.next',
  '.git',
  'scripts',
  'public',
  'dist',
  'build'
]

const EXCLUDED_FILES = [
  'error-messages.ts',
  'ui-translations.ts',
  'smtp-config.ts',
  'stripe-coupon.ts',
  'smartRecommendations.ts',
  'products.ts',
  'images.ts'
]

function isTextFile(filePath: string): boolean {
  const ext = extname(filePath).toLowerCase()
  return ['.tsx', '.ts', '.jsx', '.js'].includes(ext)
}

function scanDirectory(dir: string, results: string[] = []): string[] {
  try {
    const files = readdirSync(dir)
    
    for (const file of files) {
      const filePath = join(dir, file)
      const stat = statSync(filePath)
      
      if (stat.isDirectory()) {
        if (!EXCLUDED_DIRS.includes(file)) {
          scanDirectory(filePath, results)
        }
      } else if (isTextFile(filePath) && !EXCLUDED_FILES.some(excluded => filePath.includes(excluded))) {
        results.push(filePath)
      }
    }
  } catch (error) {
    console.log(`Impossible de lire le répertoire ${dir}:`, error)
  }
  
  return results
}

function findEnglishTexts(filePath: string): string[] {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const matches: string[] = []
    
    // Ignorer les lignes de commentaires et les imports
    const lines = content.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      // Ignorer les commentaires, imports, exports, et les noms de variables/fonctions
      if (line.trim().startsWith('//') || 
          line.trim().startsWith('*') || 
          line.trim().startsWith('import') || 
          line.trim().startsWith('export') ||
          line.includes('interface ') ||
          line.includes('type ') ||
          line.includes('const ') ||
          line.includes('function ') ||
          line.includes('class ')) {
        continue
      }
      
      // Chercher les textes entre guillemets qui pourraient être affichés
      const quotedTexts = line.match(/"([^"]+)"/g) || []
      const singleQuotedTexts = line.match(/'([^']+)'/g) || []
      const templateTexts = line.match(/`([^`]+)`/g) || []
      
      const allTexts = [...quotedTexts, ...singleQuotedTexts, ...templateTexts]
      
      for (const text of allTexts) {
        const cleanText = text.slice(1, -1) // Enlever les guillemets
        
        // Vérifier si c'est un texte anglais qui pourrait être affiché
        for (const pattern of ENGLISH_PATTERNS) {
          if (pattern.test(cleanText)) {
            // Ignorer si c'est dans un console.log ou une variable
            if (!line.includes('console.') && 
                !line.includes('const ') && 
                !line.includes('let ') && 
                !line.includes('var ') &&
                !line.includes('className=') &&
                !line.includes('style=')) {
              matches.push(cleanText)
              break
            }
          }
        }
      }
    }
    
    return matches
  } catch (error) {
    console.log(`Erreur de lecture du fichier ${filePath}:`, error)
    return []
  }
}

function main() {
  console.log('🔍 Recherche de textes anglais dans le projet...\n')
  
  const files = scanDirectory(SRC_DIR)
  console.log(`📁 ${files.length} fichiers analysés\n`)
  
  const findings: { file: string; texts: string[] }[] = []
  let totalMatches = 0
  
  for (const file of files) {
    const englishTexts = findEnglishTexts(file)
    if (englishTexts.length > 0) {
      findings.push({ file, texts: englishTexts })
      totalMatches += englishTexts.length
    }
  }
  
  if (findings.length === 0) {
    console.log('✅ Aucun texte anglais trouvé dans les fichiers visibles par l\'utilisateur!')
    console.log('\n🎉 Le projet semble entièrement traduit en français.')
  } else {
    console.log(`⚠️  ${totalMatches} textes anglais trouvés dans ${findings.length} fichiers:\n`)
    
    for (const finding of findings) {
      console.log(`📄 ${finding.file}:`)
      for (const text of finding.texts) {
        console.log(`   • "${text}"`)
      }
      console.log('')
    }
    
    console.log('\n💡 Suggestions:')
    console.log('1. Utilisez translateError() pour les messages d\'erreur')
    console.log('2. Utilisez translateUIText() pour les textes UI')
    console.log('3. Utilisez translateButtonText() pour les boutons')
    console.log('4. Utilisez translatePlaceholder() pour les placeholders')
  }
  
  console.log('\n📊 Résumé:')
  console.log(`• Fichiers analysés: ${files.length}`)
  console.log(`• Fichiers avec textes anglais: ${findings.length}`)
  console.log(`• Total des textes anglais: ${totalMatches}`)
}

main()
