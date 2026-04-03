import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Récupération des statistiques globales
    const [
      { count: totalCommandes },
      { data: commandesData },
      { count: totalProducts }
    ] = await Promise.all([
      supabase.from('commandes').select('*', { count: 'exact', head: true }),
      supabase.from('commandes').select('total, statut, created_at'),
      supabase.from('products').select('*', { count: 'exact', head: true })
    ]);

    // Calcul du chiffre d'affaires
    const chiffreAffaires = commandesData
      ?.filter(c => c.statut === 'payée')
      ?.reduce((sum, c) => sum + (c.total || 0), 0) || 0;

    // Calcul du panier moyen
    const panierMoyen = totalCommandes && totalCommandes > 0 
      ? chiffreAffaires / totalCommandes 
      : 0;

    // Calcul des taux (simulés pour l'instant)
    const tauxConversion = 2.5; // À calculer avec les vraies données de visites
    const tauxAbandon = 15.2; // À calculer avec les vraies données

    // Nombre total de clients (simulé pour l'instant)
    const totalClients = commandesData?.length || 0;

    const stats = {
      totalClients,
      totalCommandes: totalCommandes || 0,
      chiffreAffaires,
      panierMoyen,
      tauxConversion,
      tauxAbandon
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Erreur stats dashboard:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    );
  }
}
