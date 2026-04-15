import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error || !session) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // Vérifier que l'utilisateur est bien anais.manne@gmail.com
    if (session.user.email !== 'anais.manne@gmail.com') {
      return NextResponse.json({ authenticated: false }, { status: 403 })
    }

    return NextResponse.json({ 
      authenticated: true, 
      user: {
        email: session.user.email,
        id: session.user.id
      }
    })

  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
