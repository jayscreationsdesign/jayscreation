const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const dir = 'public/images/products'

async function compress() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'))
  
  console.log(`\ud83d\udcf8 ${files.length} images à traiter...`)
  
  for (const file of files) {
    const input = path.join(dir, file)
    const stats = fs.statSync(input)
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2)
    
    // Ne compresser que si > 500KB
    if (stats.size < 500000) {
      console.log(`\u23ed\ufe0f  ${file} (${sizeMB}MB) - déjà optimisé`)
      continue
    }

    const tempOutput = path.join(dir, `temp_${file}`)
    
    try {
      await sharp(input)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .png({ quality: 85, compressionLevel: 9 })
        .toFile(tempOutput)
      
      const newStats = fs.statSync(tempOutput)
      const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2)
      
      // Remplacer l'original seulement si le nouveau est plus petit
      if (newStats.size < stats.size) {
        fs.unlinkSync(input)
        fs.renameSync(tempOutput, input)
        console.log(`\u2705 ${file} : ${sizeMB}MB \u2192 ${newSizeMB}MB`)
      } else {
        fs.unlinkSync(tempOutput)
        console.log(`\u23ed\ufe0f  ${file} (${sizeMB}MB) - déjà optimal`)
      }
    } catch (err) {
      console.error(`\u274c ${file} : ${err.message}`)
      if (fs.existsSync(tempOutput)) fs.unlinkSync(tempOutput)
    }
  }
  
  console.log('\ud83c\udf89 Compression terminée !')
}

compress()
