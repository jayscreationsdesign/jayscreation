import { NextRequest, NextResponse } from 'next/server';
import { AdminAuthService } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { login, password } = body;

    if (!login || !password) {
      return NextResponse.json(
        { error: 'Identifiants manquants' },
        { status: 400 }
      );
    }

    const session = await AdminAuthService.login({ login, password });

    return NextResponse.json({
      success: true,
      token: session.token,
      user: {
        id: session.user.id,
        email: session.user.email,
        login: session.user.login,
        nom: session.user.nom,
        prenom: session.user.prenom,
        role: session.user.role
      }
    });
  } catch (error: any) {
    console.error('Erreur login admin:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur de connexion' },
      { status: 401 }
    );
  }
}
