"use client"

import { useState, useEffect } from 'react'
import { getUser, getUserProfile, updateUserProfile } from '@/lib/auth'
import { User, Mail, Phone, MapPin, Save } from 'lucide-react'

export default function ProfilPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    adresse_livraison: '',
    ville: '',
    code_postal: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getUser()
      
      if (!currentUser) {
        window.location.href = '/connexion'
        return
      }

      setUser(currentUser)

      const userProfile = await getUserProfile(currentUser.id)
      
      if (userProfile) {
        setProfile(userProfile)
        setFormData({
          prenom: userProfile.prenom || '',
          nom: userProfile.nom || '',
          telephone: userProfile.telephone || '',
          adresse_livraison: userProfile.adresse_livraison || '',
          ville: userProfile.ville || '',
          code_postal: userProfile.code_postal || ''
        })
      } else {
        // Utiliser les métadonnées de l'utilisateur si pas de profil
        setFormData({
          prenom: currentUser.user_metadata?.prenom || '',
          nom: currentUser.user_metadata?.nom || '',
          telephone: '',
          adresse_livraison: '',
          ville: '',
          code_postal: ''
        })
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      // Mettre à jour le profil dans Supabase
      const result = await updateUserProfile(user.id, formData)
      
      if (result.error) {
        setMessage('Erreur lors de la mise à jour du profil')
      } else {
        setProfile(result.data)
        setMessage('Profil mis à jour avec succès')
        
        // Effacer le message après 3 secondes
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('Erreur lors de la mise à jour du profil')
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513]"></div>
          <p className="mt-4 text-gray-600">Chargement de votre profil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Profil</h1>
          <p className="text-gray-600">Gérez vos informations personnelles</p>
        </div>

        {/* Message de succès/erreur */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('succès') 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Informations personnelles */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Informations personnelles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                      placeholder="Jean"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                      placeholder="Dupont"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="votre@email.com"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">L'email ne peut pas être modifié</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>
            </div>

            {/* Adresse de livraison */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Adresse de livraison
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse complète
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      name="adresse_livraison"
                      value={formData.adresse_livraison}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                      placeholder="123 Rue de la République"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ville
                    </label>
                    <input
                      type="text"
                      name="ville"
                      value={formData.ville}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                      placeholder="Paris"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Code postal
                    </label>
                    <input
                      type="text"
                      name="code_postal"
                      value={formData.code_postal}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-[#8B4513]"
                      placeholder="75001"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton de sauvegarde */}
            <div className="flex justify-end pt-6 border-t border-[#8B4513]">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-[#8B4513] text-white px-6 py-2 rounded-lg hover:bg-[#6b3410] hover:text-[#D4A574] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
