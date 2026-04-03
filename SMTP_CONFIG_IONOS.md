# Configuration SMTP IONOS pour Supabase

## ✅ Configuration adaptée à vos variables existantes

### Variables d'environnement déjà configurées
Votre fichier `.env.local` contient déjà les bonnes variables :

```bash
# Configuration IONOS (déjà configurée)
IONOS_SMTP_HOST=smtp.ionos.fr
IONOS_SMTP_PORT=587
IONOS_EMAIL_USER=contact@jayscreationsdesign.fr
IONOS_EMAIL_PASS=Kenays238.
IONOS_ADMIN_EMAIL=contact@jayscreationsdesign.fr
```

### ⚠️ Variables manquantes à ajouter

Ajoutez ces 2 variables à votre `.env.local` :

```bash
# Variables manquantes pour Supabase
SUPABASE_PROJECT_REF=votre_ref_projet_supabase
SUPABASE_SERVICE_KEY=votre_cle_service_role
```

## 🚀 Étapes de configuration

### 1. Obtenir les variables Supabase manquantes

#### Option A : Via Dashboard Supabase
1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. **Settings** → **API**
4. Copiez :
   - **Project Reference** (ex: rtttjomxnchffqqaafxa)
   - **service_role** key

#### Option B : Via CLI (si installé)
```bash
supabase projects list
supabase status
```

### 2. Ajouter les variables manquantes

Ajoutez à votre `.env.local` :
```bash
SUPABASE_PROJECT_REF=rtttjomxnchffqqaafxa
SUPABASE_SERVICE_KEY=votre_cle_service_role_ici
```

### 3. Configuration Supabase (2 options)

#### Option A : Via Dashboard (recommandé)
1. Dashboard Supabase → **Settings** → **Authentication**
2. Activer **"Use custom SMTP"**
3. Renseigner :
   - **SMTP Host** : `smtp.ionos.fr`
   - **SMTP Port** : `587`
   - **SMTP User** : `contact@jayscreationsdesign.fr`
   - **SMTP Password** : `Kenays238.`
   - **Admin Email** : `contact@jayscreationsdesign.fr`
   - **Sender Name** : `Jay's Creations Design`

#### Option B : Via script automatique
```bash
npm run setup-smtp
```

## 🧪 Test de configuration

### Test rapide
```bash
npm run test-smtp
```

### Test manuel complet
1. Créez un nouveau compte sur : https://jayscreation.vercel.app/connexion
2. Vérifiez l'email de bienvenue
3. Consultez les logs Supabase

## 📊 Monitoring et validation

### Vérification de la configuration
```bash
curl -X GET http://localhost:3000/api/test-smtp
```

### Logs Supabase
- Dashboard → **Logs** → **Auth**
- Cherchez les logs d'envoi d'emails
- Confirmez l'absence de "email rate limit exceeded"

## 🎯 Points importants

### ✅ Avantages obtenus
- **Plus de limites** : 2-3 emails/heure → 100-500 emails/heure
- **Emails professionnels** avec votre domaine
- **Branding Jay's Creations** dans les emails
- **Delivery amélioré** avec SMTP dédié

### ⚠️ Bonnes pratiques
- **Ne pas envoyer** des milliers d'emails d'un coup
- **Utiliser** des délais entre les envois massifs
- **Monitorer** les logs régulièrement
- **Changer** le mot de passe si nécessaire

## 🛠️ Dépannage

### Problèmes courants
- **Erreur 401** : Vérifiez votre `SUPABASE_SERVICE_KEY`
- **Erreur 403** : Permissions insuffisantes
- **Erreur SMTP** : Identifiants IONOS incorrects
- **Email non reçu** : Vérifiez dossier spam

### Support technique
- **Documentation Supabase** : Custom SMTP
- **Support IONOS** : Configuration SMTP
- **Logs détaillés** : Dashboard Supabase

---

**Votre configuration est maintenant adaptée à vos variables existantes !** 🎉

Il ne vous manque que les 2 variables Supabase pour finaliser la configuration.
