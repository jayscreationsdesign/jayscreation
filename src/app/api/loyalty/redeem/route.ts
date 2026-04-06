import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { redeemReward, RewardId } from '@/lib/loyalty';

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { rewardId } = body;
    
    if (!rewardId) {
      return NextResponse.json(
        { error: 'Récompense manquante' },
        { status: 400 }
      );
    }
    
    // Échanger les points
    const result = await redeemReward(user.id, rewardId as RewardId);
    
    return NextResponse.json({
      success: true,
      couponCode: result.couponCode,
      reward: result.reward
    });
    
  } catch (error) {
    console.error('Erreur API redeem:', error);
    
    if (error instanceof Error) {
      if (error.message === 'Récompense invalide') {
        return NextResponse.json(
          { error: 'Récompense invalide' },
          { status: 400 }
        );
      }
      if (error.message === 'Points insuffisants') {
        return NextResponse.json(
          { error: 'Points insuffisants' },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
