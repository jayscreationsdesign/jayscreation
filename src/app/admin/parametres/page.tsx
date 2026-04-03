'use client';

import { useState, useEffect } from 'react';
import { 
  Mail, 
  Settings, 
  Bell, 
  Package, 
  Users, 
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

export default function Parametres() {
  const [settings, setSettings] = useState({
    emails: {
      expediteur_general: 'contact@jayscreationsdesign.fr',
      expediteur_commandes: 'commande@jayscreationsdesign.fr',
      notification_admin: 'contact@jayscreationsdesign.fr'
    },
    notifications: {
      nouveau_compte: true,
      validation_commande: true,
      demande_devis: true,
      rupture_stock: true,
      paiement_non_finalise: true
    },
    stock: {
      seuil_stock_bas: 5
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/parametres');
      const data = await response.json();
      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Erreur paramètres:', error);
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/parametres', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        alert('Paramètres sauvegardés avec succès');
      } else {
        throw new Error('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      alert('Erreur lors de la sauvegarde des paramètres');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const response = await fetch('/api/admin/parametres/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData),
      });

      if (response.ok) {
        alert('Mot de passe changé avec succès');
        setPasswordData({ current_password: '', new_password: '', confirm_password: '' });
      } else {
        throw new Error('Erreur lors du changement de mot de passe');
      }
    } catch (error) {
      console.error('Erreur mot de passe:', error);
      alert('Erreur lors du changement de mot de passe');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600">
          Configuration de votre boutique
        </p>
      </div>

      {/* Email Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <Mail className="h-5 w-5 text-[#8B4513] mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Gestion des e-mails</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse d'expéditeur générale
            </label>
            <input
              type="email"
              value={settings.emails.expediteur_general}
              onChange={(e) => setSettings({
                ...settings,
                emails: { ...settings.emails, expediteur_general: e.target.value }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse d'expéditeur pour les commandes
            </label>
            <input
              type="email"
              value={settings.emails.expediteur_commandes}
              onChange={(e) => setSettings({
                ...settings,
                emails: { ...settings.emails, expediteur_commandes: e.target.value }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse de notification admin
            </label>
            <input
              type="email"
              value={settings.emails.notification_admin}
              onChange={(e) => setSettings({
                ...settings,
                emails: { ...settings.emails, notification_admin: e.target.value }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <Bell className="h-5 w-5 text-[#8B4513] mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Notifications par e-mail</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email admin lors de la création d'un compte client</p>
              <p className="text-sm text-gray-500">Recevoir une notification quand un nouveau client s'inscrit</p>
            </div>
            <button
              onClick={() => setSettings({
                ...settings,
                notifications: { ...settings.notifications, nouveau_compte: !settings.notifications.nouveau_compte }
              })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications.nouveau_compte ? 'bg-[#8B4513]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.nouveau_compte ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email admin lors de la validation d'une commande</p>
              <p className="text-sm text-gray-500">Recevoir une notification quand une commande est validée</p>
            </div>
            <button
              onClick={() => setSettings({
                ...settings,
                notifications: { ...settings.notifications, validation_commande: !settings.notifications.validation_commande }
              })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications.validation_commande ? 'bg-[#8B4513]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.validation_commande ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email admin lors d'une nouvelle demande de devis</p>
              <p className="text-sm text-gray-500">Recevoir une notification pour chaque demande de devis</p>
            </div>
            <button
              onClick={() => setSettings({
                ...settings,
                notifications: { ...settings.notifications, demande_devis: !settings.notifications.demande_devis }
              })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications.demande_devis ? 'bg-[#8B4513]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.demande_devis ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email admin lors d'une rupture de stock</p>
              <p className="text-sm text-gray-500">Alerte quand un produit est en rupture de stock</p>
            </div>
            <button
              onClick={() => setSettings({
                ...settings,
                notifications: { ...settings.notifications, rupture_stock: !settings.notifications.rupture_stock }
              })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications.rupture_stock ? 'bg-[#8B4513]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.rupture_stock ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email admin lors d'un paiement non finalisé</p>
              <p className="text-sm text-gray-500">Alerte pour les commandes abandonnées avant paiement</p>
            </div>
            <button
              onClick={() => setSettings({
                ...settings,
                notifications: { ...settings.notifications, paiement_non_finalise: !settings.notifications.paiement_non_finalise }
              })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications.paiement_non_finalise ? 'bg-[#8B4513]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.paiement_non_finalise ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Stock Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <Package className="h-5 w-5 text-[#8B4513] mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Gestion des stocks</h2>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seuil d'alerte de stock bas
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              min="0"
              value={settings.stock.seuil_stock_bas}
              onChange={(e) => setSettings({
                ...settings,
                stock: { ...settings.stock, seuil_stock_bas: parseInt(e.target.value) || 0 }
              })}
              className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            />
            <span className="text-sm text-gray-500">
              Alerte envoyée quand le stock atteint ce niveau
            </span>
          </div>
        </div>
      </div>

      {/* Password Change */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <Settings className="h-5 w-5 text-[#8B4513] mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Changer le mot de passe</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe actuel
            </label>
            <div className="relative">
              <input
                type={showPasswords ? 'text' : 'password'}
                value={passwordData.current_password}
                onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nouveau mot de passe
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={passwordData.new_password}
              onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmer le nouveau mot de passe
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={passwordData.confirm_password}
              onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            />
          </div>

          <button
            onClick={handlePasswordChange}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Changer le mot de passe
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          disabled={loading}
          className="flex items-center px-6 py-3 bg-[#8B4513] text-white rounded-lg hover:bg-[#6b3410] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Sauvegarde...' : 'Sauvegarder les paramètres'}
        </button>
      </div>
    </div>
  );
}
