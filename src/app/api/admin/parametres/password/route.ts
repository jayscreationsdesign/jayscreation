import { NextRequest, NextResponse } from 'next/server';
import { AdminAuthService } from '@/lib/admin-auth';

export async function PATCH(request: NextRequest) {
  try {
    const { current_password, new_password, confirm_password } = await request.json();

    if (!current_password || !new_password || !confirm_password) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    if (new_password !== confirm_password) {
      return NextResponse.json(
        { error: 'Les mots de passe ne correspondent pas' },
        { status: 400 }
      );
    }

    // Récupérer l'admin depuis le token
    const admin = await AdminAuthService.requireAuth(request);
    
    // Changer le mot de passe
    await AdminAuthService.changePassword(admin.id, current_password, new_password);

    return NextResponse.json({ success: true, message: 'Mot de passe changé avec succès' });
  } catch (error: any) {
    console.error('Erreur changement mot de passe:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors du changement de mot de passe' },
      { status: 500 }
    );
  }
}
