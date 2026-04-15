import { supabaseAdmin } from '@/lib/supabase-client'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = supabaseAdmin

    // Vérifier l'authentification admin
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    if (authError || !session || session.user.email !== 'anais.manne@gmail.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Récupérer tous les profils clients avec stats
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select(`
        *,
        orders:orders(count),
        total_spent:orders(total.sum())
      `)
      .eq('role', 'customer')
      .order('created_at', { ascending: false })
      .limit(30)

    if (error) throw error

    return NextResponse.json(profiles || [])
  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 })
  }
}
