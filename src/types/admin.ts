export interface AdminUser {
  id: string;
  email: string;
  login: string;
  nom: string;
  prenom: string;
  role: 'admin' | 'super_admin';
  actif: boolean;
  derniere_connexion: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminLogin {
  login: string;
  password: string;
}

export interface AdminSession {
  user: AdminUser;
  token: string;
}

export interface DashboardStats {
  totalClients: number;
  totalCommandes: number;
  chiffreAffaires: number;
  panierMoyen: number;
  tauxConversion: number;
  tauxAbandon: number;
}

export interface CommandeStats {
  id: string;
  created_at: string;
  total: number;
  statut: string;
  client_nom: string;
  client_email: string;
  client_telephone?: string;
  adresse_livraison?: string;
  articles: any[];
}

export interface ProductStats {
  id: string;
  nom: string;
  prix: number;
  stock: number;
 categorie: string;
  actif: boolean;
  ventes: number;
}
