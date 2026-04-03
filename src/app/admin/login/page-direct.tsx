'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginDirect() {
  const [credentials, setCredentials] = useState({
    login: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth/login-direct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur de connexion');
      }

      // Stocker le token et rediriger
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B4513] to-[#6b3410] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#8B4513] mb-2">
            Jay's Creations Design
          </h1>
          <p className="text-gray-600">
            Espace d'administration (Mode Direct)
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="login" className="block text-sm font-medium text-gray-700 mb-2">
              Identifiant
            </label>
            <input
              id="login"
              type="text"
              required
              value={credentials.login}
              onChange={(e) => setCredentials({ ...credentials, login: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              placeholder="anais"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#8B4513] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#6b3410] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Infos de connexion */}
        <div className="mt-8 p-4 bg-[#FAF7F2] rounded-lg border border-[#E8E4DF]">
          <h3 className="font-semibold text-[#8B4513] mb-2">Identifiants de test :</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p><strong>Identifiant :</strong> anais</p>
            <p><strong>Mot de passe :</strong> Anais-Admin-2026!</p>
          </div>
        </div>

        {/* Lien vers le site */}
        <div className="mt-6 text-center">
          <Link 
            href="/" 
            className="text-[#8B4513] hover:text-[#6b3410] text-sm underline"
          >
            ← Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
}
