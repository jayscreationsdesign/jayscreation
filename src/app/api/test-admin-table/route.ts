import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('login', 'anais');

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        tableExists: false
      });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Utilisateur admin non trouvé dans la table',
        tableExists: true,
        adminCount: 0
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Table admin_users trouvée',
      tableExists: true,
      adminCount: data.length,
      adminFound: {
        id: data[0].id,
        login: data[0].login,
        email: data[0].email,
        nom: data[0].nom,
        prenom: data[0].prenom,
        role: data[0].role,
        actif: data[0].actif
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      tableExists: false
    });
  }
}
