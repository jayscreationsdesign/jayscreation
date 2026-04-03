import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Test de connexion Supabase
    const { data, error } = await supabase.from('profiles').select('count').limit(1)
    
    return NextResponse.json({
      status: 'ok',
      supabase: {
        configured: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        connected: !error,
        error: error?.message
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
