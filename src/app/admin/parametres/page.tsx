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
  EyeOff,
  CreditCard,
  Truck,
  Receipt,
  Globe,
  Shield,
  Database,
  Smartphone,
  Palette,
  ShoppingBag,
  FileText,
  Key
} from 'lucide-react';

export default function Parametres() {
  const [activeTab, setActiveTab] = useState('boutique');
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  
  const [settings, setSettings] = useState({
    // Boutique
    boutique: {
      nom: "Jay's Creations Design",
      description: "Créations artisanales uniques et personnalisées",
      email_contact: 'contact@jayscreationsdesign.fr',
      telephone: '+33 6 12 34 56 78',
      adresse: '123 Rue de la Création, 75001 Paris',
      siret: '12345678901234',
      devise: 'EUR',
      pays: 'FR'
    },
    
    // Emails
    emails: {
      expediteur_general: 'contact@jayscreationsdesign.fr',
      expediteur_commandes: 'commande@jayscreationsdesign.fr',
      notification_admin: 'contact@jayscreationsdesign.fr',
      smtp_host: 'smtp.gmail.com',
      smtp_port: 587,
      smtp_user: '',
      smtp_password: ''
    },
    
    // Notifications
    notifications: {
      nouveau_compte: true,
      validation_commande: true,
      demande_devis: true,
      rupture_stock: true,
      paiement_non_finalise: true,
      nouvelle_commande: true,
      message_chat: true
    },
    
    // Paiements
    paiements: {
      stripe_enabled: true,
      stripe_public_key: '',
      stripe_secret_key: '',
      paypal_enabled: false,
      paypal_client_id: '',
      paypal_secret: '',
      mode_sandbox: true
    },
    
    // Livraison
    livraison: {
      frais_livraison_national: 5.99,
      frais_livraison_international: 15.99,
      livraison_gratite_minimum: 50.00,
      delai_standard: '3-5 jours ouvrés',
      delai_express: '24-48h',
      transporteur_par_defaut: 'Colissimo'
    },
    
    // Taxes
    taxes: {
      tva_par_defaut: 20.0,
      tva_reduite: 5.5,
      produit_tva_reduite: false,
      afficher_taxes: true,
      calcul_tva_automatique: true
    },
    
    // Stock
    stock: {
      seuil_stock_bas: 5,
      gestion_stock_activee: true,
      vente_stock_epuise: false,
      notification_rupture: true
    },
    
    // Sécurité
    securite: {
      double_authentification: false,
      session_timeout: 3600,
      log_actions: true,
      backup_automatic: true,
      backup_frequency: 'daily'
    },
    
    // Apparence
    apparence: {
      theme_couleur: '#8B4513',
      theme_couleur_secondaire: '#D4A574',
      police_principale: 'Playfair Display',
      police_secondaire: 'Inter',
      logo_url: '',
      favicon_url: '',
      maintenance_mode: false
    }
  });
  
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
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
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

  const tabs = [
    { id: 'boutique', label: 'Boutique', icon: ShoppingBag },
    { id: 'emails', label: 'Emails', icon: Mail },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'paiements', label: 'Paiements', icon: CreditCard },
    { id: 'livraison', label: 'Livraison', icon: Truck },
    { id: 'taxes', label: 'Taxes', icon: Receipt },
    { id: 'stock', label: 'Stock', icon: Package },
    { id: 'securite', label: 'Sécurité', icon: Shield },
    { id: 'apparence', label: 'Apparence', icon: Palette },
    { id: 'compte', label: 'Compte', icon: Users }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'boutique':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Nom de la boutique</label>
                <input
                  type="text"
                  value={settings.boutique.nom}
                  onChange={(e) => setSettings({
                    ...settings,
                    boutique: { ...settings.boutique, nom: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Email de contact</label>
                <input
                  type="email"
                  value={settings.boutique.email_contact}
                  onChange={(e) => setSettings({
                    ...settings,
                    boutique: { ...settings.boutique, email_contact: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Téléphone</label>
                <input
                  type="tel"
                  value={settings.boutique.telephone}
                  onChange={(e) => setSettings({
                    ...settings,
                    boutique: { ...settings.boutique, telephone: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">SIRET</label>
                <input
                  type="text"
                  value={settings.boutique.siret}
                  onChange={(e) => setSettings({
                    ...settings,
                    boutique: { ...settings.boutique, siret: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A0785A] mb-2">Description</label>
              <textarea
                value={settings.boutique.description}
                onChange={(e) => setSettings({
                  ...settings,
                  boutique: { ...settings.boutique, description: e.target.value }
                })}
                rows={3}
                className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A0785A] mb-2">Adresse</label>
              <textarea
                value={settings.boutique.adresse}
                onChange={(e) => setSettings({
                  ...settings,
                  boutique: { ...settings.boutique, adresse: e.target.value }
                })}
                rows={2}
                className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
              />
            </div>
          </div>
        );

      case 'emails':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Expéditeur général</label>
                <input
                  type="email"
                  value={settings.emails.expediteur_general}
                  onChange={(e) => setSettings({
                    ...settings,
                    emails: { ...settings.emails, expediteur_general: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Expéditeur commandes</label>
                <input
                  type="email"
                  value={settings.emails.expediteur_commandes}
                  onChange={(e) => setSettings({
                    ...settings,
                    emails: { ...settings.emails, expediteur_commandes: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Notification admin</label>
                <input
                  type="email"
                  value={settings.emails.notification_admin}
                  onChange={(e) => setSettings({
                    ...settings,
                    emails: { ...settings.emails, notification_admin: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Hôte SMTP</label>
                <input
                  type="text"
                  value={settings.emails.smtp_host}
                  onChange={(e) => setSettings({
                    ...settings,
                    emails: { ...settings.emails, smtp_host: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Port SMTP</label>
                <input
                  type="number"
                  value={settings.emails.smtp_port}
                  onChange={(e) => setSettings({
                    ...settings,
                    emails: { ...settings.emails, smtp_port: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Utilisateur SMTP</label>
                <input
                  type="text"
                  value={settings.emails.smtp_user}
                  onChange={(e) => setSettings({
                    ...settings,
                    emails: { ...settings.emails, smtp_user: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A0785A] mb-2">Mot de passe SMTP</label>
              <div className="relative">
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={settings.emails.smtp_password}
                  onChange={(e) => setSettings({
                    ...settings,
                    emails: { ...settings.emails, smtp_password: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A0785A]"
                >
                  {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-[#FFF8F0] rounded-lg">
                <div>
                  <p className="font-medium text-[#2C1A0E]">
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                  <p className="text-sm text-[#A0785A]">
                    {key === 'nouveau_compte' && 'Recevoir une notification quand un nouveau client s\'inscrit'}
                    {key === 'validation_commande' && 'Recevoir une notification quand une commande est validée'}
                    {key === 'demande_devis' && 'Recevoir une notification pour chaque demande de devis'}
                    {key === 'rupture_stock' && 'Alerte quand un produit est en rupture de stock'}
                    {key === 'paiement_non_finalise' && 'Alerte pour les commandes abandonnées avant paiement'}
                    {key === 'nouvelle_commande' && 'Recevoir une notification pour chaque nouvelle commande'}
                    {key === 'message_chat' && 'Recevoir une notification pour chaque nouveau message chat'}
                  </p>
                </div>
                <button
                  onClick={() => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, [key]: !value }
                  })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-[#8B4513]' : 'bg-[#E8D5C0]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        );

      case 'paiements':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#2C1A0E]">Stripe</h3>
              <div className="flex items-center justify-between p-4 bg-[#FFF8F0] rounded-lg">
                <div>
                  <p className="font-medium text-[#2C1A0E]">Activer Stripe</p>
                  <p className="text-sm text-[#A0785A]">Accepter les paiements par carte bancaire</p>
                </div>
                <button
                  onClick={() => setSettings({
                    ...settings,
                    paiements: { ...settings.paiements, stripe_enabled: !settings.paiements.stripe_enabled }
                  })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.paiements.stripe_enabled ? 'bg-[#8B4513]' : 'bg-[#E8D5C0]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.paiements.stripe_enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#A0785A] mb-2">Clé publique Stripe</label>
                  <input
                    type="text"
                    value={settings.paiements.stripe_public_key}
                    onChange={(e) => setSettings({
                      ...settings,
                      paiements: { ...settings.paiements, stripe_public_key: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#A0785A] mb-2">Clé secrète Stripe</label>
                  <input
                    type="password"
                    value={settings.paiements.stripe_secret_key}
                    onChange={(e) => setSettings({
                      ...settings,
                      paiements: { ...settings.paiements, stripe_secret_key: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#2C1A0E]">PayPal</h3>
              <div className="flex items-center justify-between p-4 bg-[#FFF8F0] rounded-lg">
                <div>
                  <p className="font-medium text-[#2C1A0E]">Activer PayPal</p>
                  <p className="text-sm text-[#A0785A]">Accepter les paiements PayPal</p>
                </div>
                <button
                  onClick={() => setSettings({
                    ...settings,
                    paiements: { ...settings.paiements, paypal_enabled: !settings.paiements.paypal_enabled }
                  })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.paiements.paypal_enabled ? 'bg-[#8B4513]' : 'bg-[#E8D5C0]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.paiements.paypal_enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#A0785A] mb-2">Client ID PayPal</label>
                  <input
                    type="text"
                    value={settings.paiements.paypal_client_id}
                    onChange={(e) => setSettings({
                      ...settings,
                      paiements: { ...settings.paiements, paypal_client_id: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#A0785A] mb-2">Secret PayPal</label>
                  <input
                    type="password"
                    value={settings.paiements.paypal_secret}
                    onChange={(e) => setSettings({
                      ...settings,
                      paiements: { ...settings.paiements, paypal_secret: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#FFF8F0] rounded-lg">
              <div>
                <p className="font-medium text-[#2C1A0E]">Mode Sandbox</p>
                <p className="text-sm text-[#A0785A]">Utiliser l'environnement de test</p>
              </div>
              <button
                onClick={() => setSettings({
                  ...settings,
                  paiements: { ...settings.paiements, mode_sandbox: !settings.paiements.mode_sandbox }
                })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.paiements.mode_sandbox ? 'bg-[#8B4513]' : 'bg-[#E8D5C0]'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.paiements.mode_sandbox ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        );

      case 'livraison':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Frais de livraison (France)</label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.livraison.frais_livraison_national}
                  onChange={(e) => setSettings({
                    ...settings,
                    livraison: { ...settings.livraison, frais_livraison_national: parseFloat(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Frais de livraison (International)</label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.livraison.frais_livraison_international}
                  onChange={(e) => setSettings({
                    ...settings,
                    livraison: { ...settings.livraison, frais_livraison_international: parseFloat(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Livraison gratuite à partir de</label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.livraison.livraison_gratite_minimum}
                  onChange={(e) => setSettings({
                    ...settings,
                    livraison: { ...settings.livraison, livraison_gratite_minimum: parseFloat(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Transporteur par défaut</label>
                <select
                  value={settings.livraison.transporteur_par_defaut}
                  onChange={(e) => setSettings({
                    ...settings,
                    livraison: { ...settings.livraison, transporteur_par_defaut: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                >
                  <option value="Colissimo">Colissimo</option>
                  <option value="Chronopost">Chronopost</option>
                  <option value="UPS">UPS</option>
                  <option value="€L">€L</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Délai livraison standard</label>
                <input
                  type="text"
                  value={settings.livraison.delai_standard}
                  onChange={(e) => setSettings({
                    ...settings,
                    livraison: { ...settings.livraison, delai_standard: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Délai livraison express</label>
                <input
                  type="text"
                  value={settings.livraison.delai_express}
                  onChange={(e) => setSettings({
                    ...settings,
                    livraison: { ...settings.livraison, delai_express: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 'taxes':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">TVA par défaut (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.taxes.tva_par_defaut}
                  onChange={(e) => setSettings({
                    ...settings,
                    taxes: { ...settings.taxes, tva_par_defaut: parseFloat(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">TVA réduite (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.taxes.tva_reduite}
                  onChange={(e) => setSettings({
                    ...settings,
                    taxes: { ...settings.taxes, tva_reduite: parseFloat(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#FFF8F0] rounded-lg">
                <div>
                  <p className="font-medium text-[#2C1A0E]">Produits avec TVA réduite</p>
                  <p className="text-sm text-[#A0785A]">Certains produits peuvent bénéficier de la TVA réduite</p>
                </div>
                <button
                  onClick={() => setSettings({
                    ...settings,
                    taxes: { ...settings.taxes, produit_tva_reduite: !settings.taxes.produit_tva_reduite }
                  })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.taxes.produit_tva_reduite ? 'bg-[#8B4513]' : 'bg-[#E8D5C0]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.taxes.produit_tva_reduite ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#FFF8F0] rounded-lg">
                <div>
                  <p className="font-medium text-[#2C1A0E]">Afficher les taxes</p>
                  <p className="text-sm text-[#A0785A]">Afficher les taxes sur les prix et dans le panier</p>
                </div>
                <button
                  onClick={() => setSettings({
                    ...settings,
                    taxes: { ...settings.taxes, afficher_taxes: !settings.taxes.afficher_taxes }
                  })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.taxes.afficher_taxes ? 'bg-[#8B4513]' : 'bg-[#E8D5C0]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.taxes.afficher_taxes ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#FFF8F0] rounded-lg">
                <div>
                  <p className="font-medium text-[#2C1A0E]">Calcul automatique TVA</p>
                  <p className="text-sm text-[#A0785A]">Calculer automatiquement la TVA selon le pays du client</p>
                </div>
                <button
                  onClick={() => setSettings({
                    ...settings,
                    taxes: { ...settings.taxes, calcul_tva_automatique: !settings.taxes.calcul_tva_automatique }
                  })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.taxes.calcul_tva_automatique ? 'bg-[#8B4513]' : 'bg-[#E8D5C0]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.taxes.calcul_tva_automatique ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        );

      case 'stock':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#A0785A] mb-2">Seuil d'alerte de stock bas</label>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  min="0"
                  value={settings.stock.seuil_stock_bas}
                  onChange={(e) => setSettings({
                    ...settings,
                    stock: { ...settings.stock, seuil_stock_bas: parseInt(e.target.value) || 0 }
                  })}
                  className="w-32 px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
                <span className="text-sm text-[#A0785A]">
                  Alerte envoyée quand le stock atteint ce niveau
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#FFF8F0] rounded-lg">
                <div>
                  <p className="font-medium text-[#2C1A0E]">Gestion du stock activée</p>
                  <p className="text-sm text-[#A0785A]">Suivre les quantités en stock pour chaque produit</p>
                </div>
                <button
                  onClick={() => setSettings({
                    ...settings,
                    stock: { ...settings.stock, gestion_stock_activee: !settings.stock.gestion_stock_activee }
                  })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.stock.gestion_stock_activee ? 'bg-[#8B4513]' : 'bg-[#E8D5C0]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.stock.gestion_stock_activee ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#FFF8F0] rounded-lg">
                <div>
                  <p className="font-medium text-[#2C1A0E]">Autoriser vente stock épuisé</p>
                  <p className="text-sm text-[#A0785A]">Permettre les commandes même si le stock est à 0</p>
                </div>
                <button
                  onClick={() => setSettings({
                    ...settings,
                    stock: { ...settings.stock, vente_stock_epuise: !settings.stock.vente_stock_epuise }
                  })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.stock.vente_stock_epuise ? 'bg-[#8B4513]' : 'bg-[#E8D5C0]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.stock.vente_stock_epuise ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#FFF8F0] rounded-lg">
                <div>
                  <p className="font-medium text-[#2C1A0E]">Notification rupture de stock</p>
                  <p className="text-sm text-[#A0785A]">Envoyer une alerte email en cas de rupture</p>
                </div>
                <button
                  onClick={() => setSettings({
                    ...settings,
                    stock: { ...settings.stock, notification_rupture: !settings.stock.notification_rupture }
                  })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.stock.notification_rupture ? 'bg-[#8B4513]' : 'bg-[#E8D5C0]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.stock.notification_rupture ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        );

      case 'securite':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#FFF8F0] rounded-lg">
                <div>
                  <p className="font-medium text-[#2C1A0E]">Double authentification</p>
                  <p className="text-sm text-[#A0785A]">Exiger une double authentification pour l'accès admin</p>
                </div>
                <button
                  onClick={() => setSettings({
                    ...settings,
                    securite: { ...settings.securite, double_authentification: !settings.securite.double_authentification }
                  })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.securite.double_authentification ? 'bg-[#8B4513]' : 'bg-[#E8D5C0]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.securite.double_authentification ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#FFF8F0] rounded-lg">
                <div>
                  <p className="font-medium text-[#2C1A0E]">Journal des actions</p>
                  <p className="text-sm text-[#A0785A]">Enregistrer toutes les actions administratives</p>
                </div>
                <button
                  onClick={() => setSettings({
                    ...settings,
                    securite: { ...settings.securite, log_actions: !settings.securite.log_actions }
                  })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.securite.log_actions ? 'bg-[#8B4513]' : 'bg-[#E8D5C0]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.securite.log_actions ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#FFF8F0] rounded-lg">
                <div>
                  <p className="font-medium text-[#2C1A0E]">Sauvegarde automatique</p>
                  <p className="text-sm text-[#A0785A]">Effectuer des sauvegardes automatiques</p>
                </div>
                <button
                  onClick={() => setSettings({
                    ...settings,
                    securite: { ...settings.securite, backup_automatic: !settings.securite.backup_automatic }
                  })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.securite.backup_automatic ? 'bg-[#8B4513]' : 'bg-[#E8D5C0]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.securite.backup_automatic ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Durée de session (secondes)</label>
                <input
                  type="number"
                  value={settings.securite.session_timeout}
                  onChange={(e) => setSettings({
                    ...settings,
                    securite: { ...settings.securite, session_timeout: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Fréquence de sauvegarde</label>
                <select
                  value={settings.securite.backup_frequency}
                  onChange={(e) => setSettings({
                    ...settings,
                    securite: { ...settings.securite, backup_frequency: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                >
                  <option value="daily">Quotidienne</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuelle</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'apparence':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Couleur principale</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={settings.apparence.theme_couleur}
                    onChange={(e) => setSettings({
                      ...settings,
                      apparence: { ...settings.apparence, theme_couleur: e.target.value }
                    })}
                    className="w-12 h-12 border border-[#E8D5C0] rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.apparence.theme_couleur}
                    onChange={(e) => setSettings({
                      ...settings,
                      apparence: { ...settings.apparence, theme_couleur: e.target.value }
                    })}
                    className="flex-1 px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Couleur secondaire</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={settings.apparence.theme_couleur_secondaire}
                    onChange={(e) => setSettings({
                      ...settings,
                      apparence: { ...settings.apparence, theme_couleur_secondaire: e.target.value }
                    })}
                    className="w-12 h-12 border border-[#E8D5C0] rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.apparence.theme_couleur_secondaire}
                    onChange={(e) => setSettings({
                      ...settings,
                      apparence: { ...settings.apparence, theme_couleur_secondaire: e.target.value }
                    })}
                    className="flex-1 px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Police principale</label>
                <select
                  value={settings.apparence.police_principale}
                  onChange={(e) => setSettings({
                    ...settings,
                    apparence: { ...settings.apparence, police_principale: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                >
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Police secondaire</label>
                <select
                  value={settings.apparence.police_secondaire}
                  onChange={(e) => setSettings({
                    ...settings,
                    apparence: { ...settings.apparence, police_secondaire: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                >
                  <option value="Inter">Inter</option>
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">URL du logo</label>
                <input
                  type="url"
                  value={settings.apparence.logo_url}
                  onChange={(e) => setSettings({
                    ...settings,
                    apparence: { ...settings.apparence, logo_url: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">URL du favicon</label>
                <input
                  type="url"
                  value={settings.apparence.favicon_url}
                  onChange={(e) => setSettings({
                    ...settings,
                    apparence: { ...settings.apparence, favicon_url: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#FFF8F0] rounded-lg">
              <div>
                <p className="font-medium text-[#2C1A0E]">Mode maintenance</p>
                <p className="text-sm text-[#A0785A]">Mettre le site en mode maintenance</p>
              </div>
              <button
                onClick={() => setSettings({
                  ...settings,
                  apparence: { ...settings.apparence, maintenance_mode: !settings.apparence.maintenance_mode }
                })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.apparence.maintenance_mode ? 'bg-red-600' : 'bg-[#E8D5C0]'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.apparence.maintenance_mode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        );

      case 'compte':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#2C1A0E]">Changer le mot de passe</h3>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Mot de passe actuel</label>
                <div className="relative">
                  <input
                    type={showPasswords ? 'text' : 'password'}
                    value={passwordData.current_password}
                    onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A0785A]"
                  >
                    {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Nouveau mot de passe</label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={passwordData.new_password}
                  onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0785A] mb-2">Confirmer le nouveau mot de passe</label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={passwordData.confirm_password}
                  onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E8D5C0] rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                />
              </div>
              <button
                onClick={handlePasswordChange}
                className="bg-[#8B4513] text-white px-4 py-2 rounded-lg hover:bg-[#6b3410] transition-colors"
              >
                Changer le mot de passe
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#2C1A0E] font-['Playfair_Display']">Paramètres</h1>
        <p className="text-[#A0785A]">
          Configuration de votre boutique et préférences
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-[#E8D5C0]">
        <div className="flex flex-wrap border-b border-[#E8D5C0]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#8B4513] border-b-2 border-[#8B4513] bg-[#FFF8F0]'
                    : 'text-[#A0785A] hover:text-[#2C1A0E] hover:bg-[#FFF8F0]'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
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
