# Configuration SMTP IONOS - PowerShell

## 🚀 Script PowerShell pour configurer SMTP

J'ai créé un script PowerShell adapté pour Windows afin de configurer votre SMTP IONOS dans Supabase.

## 📋 Étapes de configuration

### 1. Configurez les variables d'environnement dans PowerShell

```powershell
# Variables Supabase (à obtenir depuis votre dashboard)
$env:SUPABASE_PROJECT_REF = "rtttjomxnchffqqaafxa"
$env:SUPABASE_SERVICE_KEY = "votre_cle_service_role_ici"

# Variables IONOS (déjà dans votre .env.local)
$env:IONOS_SMTP_HOST = "smtp.ionos.fr"
$env:IONOS_SMTP_PORT = "587"
$env:IONOS_EMAIL_USER = "contact@jayscreationsdesign.fr"
$env:IONOS_EMAIL_PASS = "Kenays238."
$env:IONOS_ADMIN_EMAIL = "contact@jayscreationsdesign.fr"
```

### 2. Exécutez le script PowerShell

```powershell
npm run setup-smtp-ps
```

Ou directement :

```powershell
powershell -ExecutionPolicy Bypass -File scripts/setup-smtp-powershell.ps1
```

## 🔧 Obtenir les variables Supabase

### Project Reference
1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. **Settings** → **General**
4. Copiez le **Project Reference** (ex: `rtttjomxnchffqqaafxa`)

### Service Role Key
1. Dans le même projet
2. **Settings** → **API**
3. Copiez la **service_role** key (commence par `eyJ...`)

## 🧪 Test de configuration

Après l'exécution du script :

1. **Test rapide** :
   ```powershell
   npm run test-smtp
   ```

2. **Test réel** :
   - Lancez le serveur : `npm run dev`
   - Créez un compte sur http://localhost:3000/connexion
   - Vérifiez l'email de bienvenue

## 📊 Monitoring

### Logs Supabase
- Dashboard → **Logs** → **Auth**
- Cherchez les logs d'envoi d'emails
- Confirmez l'absence de "email rate limit exceeded"

### PowerShell Output
Le script affichera :
- ✅ Validation de la configuration
- 📡 Envoi vers Supabase
- ✅ Confirmation de succès

## 🛠️ Dépannage PowerShell

### Problèmes courants

#### "Execution Policy"
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Variables non trouvées
```powershell
# Vérifiez les variables
Get-ChildItem Env: | Where-Object Name -like "*SUPABASE*"
Get-ChildItem Env: | Where-Object Name -like "*IONOS*"
```

#### Erreur 401/403/404
- **401** : Vérifiez votre `SUPABASE_SERVICE_KEY`
- **403** : Permissions insuffisantes
- **404** : Vérifiez votre `SUPABASE_PROJECT_REF`

## 🎯 Avantages du script PowerShell

- ✅ Compatible Windows PowerShell
- ✅ Gestion des erreurs détaillée
- ✅ Messages colorés et clairs
- ✅ Validation automatique
- ✅ Instructions d'aide intégrées

## 📝 Résumé rapide

1. **Configurez les variables** dans PowerShell
2. **Exécutez** : `npm run setup-smtp-ps`
3. **Testez** avec un nouveau compte utilisateur

Votre SMTP IONOS sera configuré et fonctionnel ! 🎉
