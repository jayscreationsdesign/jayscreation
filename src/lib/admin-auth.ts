import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from './supabase';
import type { AdminUser, AdminLogin, AdminSession } from '@/types/admin';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

export class AdminAuthService {
  // Authentification admin
  static async login(credentials: AdminLogin): Promise<AdminSession> {
    const { login, password } = credentials;

    // Recherche de l'admin par login ou email
    const { data: admin, error } = await supabase
      .from('admin_users')
      .select('*')
      .or(`login.eq.${login},email.eq.${login}`)
      .eq('actif', true)
      .single();

    if (error || !admin) {
      throw new Error('Identifiants incorrects');
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
    if (!isPasswordValid) {
      throw new Error('Identifiants incorrects');
    }

    // Mise à jour de la dernière connexion
    await supabase
      .from('admin_users')
      .update({ derniere_connexion: new Date().toISOString() })
      .eq('id', admin.id);

    // Génération du token JWT
    const token = jwt.sign(
      { 
        id: admin.id, 
        email: admin.email, 
        login: admin.login,
        role: admin.role 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      user: admin,
      token
    };
  }

  // Vérification du token JWT
  static verifyToken(token: string): AdminUser {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      return decoded as AdminUser;
    } catch (error) {
      throw new Error('Token invalide ou expiré');
    }
  }

  // Middleware pour vérifier l'authentification
  static async requireAuth(request: Request): Promise<AdminUser> {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Token manquant');
    }

    const token = authHeader.substring(7);
    return this.verifyToken(token);
  }

  // Création d'un nouvel admin (pour le super_admin)
  static async createAdmin(adminData: {
    email: string;
    login: string;
    password: string;
    nom: string;
    prenom: string;
    role?: 'admin' | 'super_admin';
  }): Promise<AdminUser> {
    const { email, login, password, nom, prenom, role = 'admin' } = adminData;

    // Hash du mot de passe
    const passwordHash = await bcrypt.hash(password, 12);

    const { data, error } = await supabase
      .from('admin_users')
      .insert({
        email,
        login,
        password_hash: passwordHash,
        nom,
        prenom,
        role
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Erreur lors de la création de l'admin: ${error.message}`);
    }

    return data;
  }

  // Changement de mot de passe
  static async changePassword(adminId: string, oldPassword: string, newPassword: string): Promise<void> {
    // Récupération de l'admin
    const { data: admin, error } = await supabase
      .from('admin_users')
      .select('password_hash')
      .eq('id', adminId)
      .single();

    if (error || !admin) {
      throw new Error('Admin non trouvé');
    }

    // Vérification de l'ancien mot de passe
    const isOldPasswordValid = await bcrypt.compare(oldPassword, admin.password_hash);
    if (!isOldPasswordValid) {
      throw new Error('Ancien mot de passe incorrect');
    }

    // Hash du nouveau mot de passe
    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    // Mise à jour
    const { error: updateError } = await supabase
      .from('admin_users')
      .update({ password_hash: newPasswordHash })
      .eq('id', adminId);

    if (updateError) {
      throw new Error(`Erreur lors de la mise à jour du mot de passe: ${updateError.message}`);
    }
  }
}
