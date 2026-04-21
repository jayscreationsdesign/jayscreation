import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rtttjomxnchffqqaafxa.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function updateKinderBueno() {
  console.log('Mise à jour du produit Kinder Bueno...')

  try {
    // Mettre à jour le produit Kinder Bueno avec la nouvelle image
    const { data, error } = await supabase
      .from('products')
      .update({
        image_principale: '/images/products/Kinder bueno1.png',
        images: ['/images/products/Kinder bueno1.png']
      })
      .eq('slug', 'kinder-bueno')
      .select()

    if (error) {
      console.log('ERREUR mise à jour:', error.message)
      process.exit(1)
    }

    if (data && data.length > 0) {
      console.log('Kinder Bueno mis à jour avec succès !')
      console.log('Image principale:', data[0].image_principale)
      console.log('Galerie d\'images:', data[0].images)
    } else {
      console.log('Aucun produit trouvé avec le slug "kinder-bueno"')
    }

  } catch (error) {
    console.log('ERREUR:', error.message)
    process.exit(1)
  }
}

updateKinderBueno()
