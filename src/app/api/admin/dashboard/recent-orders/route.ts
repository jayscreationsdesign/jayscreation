import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('commandes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      throw error;
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Erreur recent orders:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des commandes récentes' },
      { status: 500 }
    );
  }
}
