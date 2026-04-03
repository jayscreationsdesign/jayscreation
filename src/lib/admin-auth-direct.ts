import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Configuration en dur pour éviter les problèmes de variables
const ADMIN_USER = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  email: 'contact@jayscreationsdesign.fr',
  login: 'anais',
  password_hash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6QJw/2Ej7W', // Anais-Admin-2026!
  nom: 'Manne',
  prenom: 'Anais',
  role: 'super_admin'
};

const JWT_SECRET = 'jay-secret-admin-2026-secure-key-change-me-in-production';

export class AdminAuthServiceDirect {
  static async login(credentials: { login: string; password: string }) {
    const { login, password } = credentials;

    // Vérification directe sans base de données
    if (login !== ADMIN_USER.login) {
      throw new Error('Identifiants incorrects');
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, ADMIN_USER.password_hash);
    if (!isPasswordValid) {
      throw new Error('Identifiants incorrects');
    }

    // Génération du token JWT
    const token = jwt.sign(
      { 
        id: ADMIN_USER.id, 
        email: ADMIN_USER.email, 
        login: ADMIN_USER.login,
        role: ADMIN_USER.role 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      user: ADMIN_USER,
      token
    };
  }

  static verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      return decoded as typeof ADMIN_USER;
    } catch (error) {
      throw new Error('Token invalide ou expiré');
    }
  }

  static async requireAuth(request: Request) {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Token manquant');
    }

    const token = authHeader.substring(7);
    return this.verifyToken(token);
  }
}
