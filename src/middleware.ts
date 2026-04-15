import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rtttjomxnchffqqaafxa.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0dHRqb214bmNoZmZxcWFhZnhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MjM1NDAsImV4cCI6MjA5MDA5OTU0MH0.gaglop45XZ9EDRmQACbiDTSWw5FmU7yrMrh24aUxdaI'
)

export async function middleware(req: NextRequest) {
  // TEMPORAIREMENT DÉSACTIVÉ POUR PERMETTRE LA REDIRECTION ADMIN
  // La page admin sera protégée côté client après la redirection
  console.log('Middleware désactivé temporairement pour redirection admin')
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}
