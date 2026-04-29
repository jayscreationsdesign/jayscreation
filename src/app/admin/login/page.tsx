'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabase-client';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Vérifier si l'utilisateur a le rôle admin
        const { data: profile } = await supabaseClient
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (!profile || profile.role !== 'admin') {
          throw new Error('Accès non autorisé. Vous devez avoir un rôle administrateur.');
        }

        router.push('/admin');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-[#E8D5B7]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#3C2415] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-[#C8A96E] font-bold text-2xl font-['Playfair_Display'] italic">
              JC
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#3C2415] mb-2 font-['Playfair_Display']">
            Jay's Creations
          </h1>
          <p className="text-[#6B6B6B]">
            Espace d'administration
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-[#FDEDEC] border border-[#E8D5B7] text-[#C0392B] px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#3C2415] mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-[#E8D5B7] rounded-lg focus:ring-2 focus:ring-[#C8A96E] focus:border-[#C8A96E] transition-colors"
              placeholder="contact@jayscreationsdesign.fr"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#3C2415] mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[#E8D5B7] rounded-lg focus:ring-2 focus:ring-[#C8A96E] focus:border-[#C8A96E] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#C8A96E] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#3C2415] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-[#F5EFE6] rounded-lg border border-[#E8D5B7]">
          <h3 className="font-semibold text-[#3C2415] mb-2">Accès administrateur</h3>
          <div className="space-y-1 text-sm text-[#6B6B6B]">
            <p>• Utilisez votre email Supabase</p>
            <p>• Votre compte doit avoir le rôle "admin"</p>
            <p>• Contactez l'administrateur si nécessaire</p>
          </div>
        </div>

        {/* Lien vers le site */}
        <div className="mt-6 text-center">
          <Link 
            href="/" 
            className="text-[#C8A96E] hover:text-[#3C2415] text-sm underline transition-colors"
          >
            ← Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
}
