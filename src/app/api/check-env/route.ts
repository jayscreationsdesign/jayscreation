export async function GET() {
  return Response.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'MANQUANT',
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
      ? 'PRÉSENTE (' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0,20) + '...)' 
      : 'MANQUANTE',
  })
}
