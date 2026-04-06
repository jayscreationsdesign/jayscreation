import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getUserPoints } from '@/lib/loyalty';

export async function GET(request: NextRequest) {
  try {
    
    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }
    
    // Obtenir les points de l'utilisateur
    const pointsData = await getUserPoints(user.id);
    
    if (!pointsData) {
      // Créer un compte de fidélité si inexistant
      const { createLoyaltyAccount } = await import('@/lib/loyalty');
      const newAccount = await createLoyaltyAccount(user.id);
      
      return NextResponse.json({
        success: true,
        points: newAccount.points,
        total_earned: newAccount.total_earned,
        tier: newAccount.tier
      });
    }
    
    return NextResponse.json({
      success: true,
      points: pointsData.points,
      total_earned: pointsData.total_earned,
      tier: pointsData.tier
    });
    
  } catch (error) {
    console.error('Erreur API loyalty points:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
