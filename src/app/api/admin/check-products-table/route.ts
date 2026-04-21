import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Vérifier la structure de la table products
    const { data: columns, error: columnsError } = await supabase
      .from('products')
      .select('*')
      .limit(1)

    if (columnsError) {
      return NextResponse.json({ 
        error: 'Erreur lors de la vérification de la table products',
        details: columnsError 
      }, { status: 500 })
    }

    // Obtenir les informations sur les colonnes
    const { data: tableInfo, error: tableError } = await supabase
      .rpc('get_table_columns', { table_name: 'products' })

    return NextResponse.json({
      message: 'Structure de la table products',
      sampleData: columns,
      tableInfo: tableInfo || 'Non disponible',
      columnsError: tableError
    })

  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ 
      error: 'Erreur serveur',
      details: error 
    }, { status: 500 })
  }
}
