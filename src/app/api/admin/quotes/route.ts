import { supabaseAdmin } from '@/lib/supabase-client'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = supabaseAdmin

    // Vérifier l'authentification admin
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    if (authError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Vérifier le rôle admin dans la table profils
    const { data: profile } = await supabase
      .from('profils')
      .select('role')
      .eq('id', session.user.id)
      .maybeSingle()

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Récupérer tous les devis avec infos clients
    const { data: quotes, error } = await supabase
      .from('quotes')
      .select(`
        *,
        customer:profiles(
          first_name,
          last_name,
          email
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Formater les données pour le dashboard
    const formattedQuotes = quotes.map(quote => ({
      ...quote,
      customer_name: quote.customer ? 
        `${quote.customer.first_name} ${quote.customer.last_name}` : 
        'Client inconnu',
      customer_email: quote.customer?.email || 'email@inconnu.com'
    }))

    return NextResponse.json(formattedQuotes)

  } catch (error) {
    console.error('Error fetching quotes:', error)
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 })
  }
}
