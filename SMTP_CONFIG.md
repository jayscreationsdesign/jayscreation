# Configuration SMTP IONOS pour Supabase

## Contexte
Remplacement du service email gratuit de Supabase (limité à 2-3 emails/heure) par le SMTP IONOS payant.

## Configuration IONOS

### Informations SMTP
- **Serveur SMTP**: smtp.ionos.com
- **Port**: 465 (SSL/TLS) ou 587 (TLS/STARTTLS)
- **Utilisateur SMTP**: contact@jayscreationsdesign.fr
- **Mot de passe SMTP**: À renseigner dans les variables d'environnement
- **From / sender**: "Jay's Creations Design" <contact@jayscreationsdesign.fr>

## Étapes de configuration

### 1. Variables d'environnement (.env.local)

Ajouter ces variables à votre fichier `.env.local` :

```bash
# Configuration SMTP IONOS pour Supabase
SMTP_HOST=smtp.ionos.com
SMTP_PORT=465
SMTP_USER=contact@jayscreationsdesign.fr
SMTP_PASS=votre_mot_de_passe_ionos_ici
SMTP_SENDER_NAME="Jay's Creations Design"
SMTP_ADMIN_EMAIL=contact@jayscreationsdesign.fr
```

### 2. Configuration Supabase (via API)

Utiliser l'API Supabase pour configurer le SMTP personnalisé :

```bash
curl -X PATCH 'https://api.supabase.com/v1/projects/{project_ref}/config/auth' \
  -H 'Authorization: Bearer {service_role_key}' \
  -H 'Content-Type: application/json' \
  -d '{
    "external_email_enabled": true,
    "smtp_host": "smtp.ionos.com",
    "smtp_port": 465,
    "smtp_user": "contact@jayscreationsdesign.fr",
    "smtp_pass": "votre_mot_de_passe_ionos",
    "smtp_admin_email": "contact@jayscreationsdesign.fr",
    "smtp_sender_name": "Jay'\''s Creations Design"
  }'
```

**Remplacer :**
- `{project_ref}` : votre référence de projet Supabase
- `{service_role_key}` : votre clé de service Supabase
- `votre_mot_de_passe_ionos` : votre mot de passe IONOS

### 3. Configuration alternative (via Dashboard Supabase)

1. Aller sur https://supabase.com/dashboard
2. Sélectionner votre projet
3. Aller dans **Settings** → **Authentication**
4. Descendre dans **Email Templates**
5. Activer **"Use custom SMTP"**
6. Renseigner les informations SMTP IONOS

## Scénario de test

### Test d'inscription client

1. **Créer un nouveau compte client** :
   - Aller sur `/connexion`
   - Créer un nouveau compte avec un email de test (ex: Gmail)
   - Vérifier l'envoi de l'email de bienvenue

2. **Vérifier dans les logs Supabase** :
   - Dashboard → Logs → Auth
   - Chercher les logs d'envoi d'emails
   - Confirmer qu'il n'y a plus de "email rate limit exceeded"

3. **Vérifier réception email** :
   - Vérifier la boîte de réception de l'email de test
   - Confirmer que l'email vient bien de "Jay's Creations Design" <contact@jayscreationsdesign.fr>

### Test de reset mot de passe

1. Utiliser la fonction "Mot de passe oublié"
2. Vérifier la réception de l'email de reset
3. Confirmer que le lien fonctionne

## Bonnes pratiques

### Limites et recommandations

- **IONOS** : généralement 100-500 emails/heure selon votre abonnement
- **Ne pas envoyer** des milliers d'emails d'un coup
- **Utiliser** des délais entre les envois massifs
- **Monitorer** les logs Supabase pour les erreurs

### Sécurité

- **Jamais** hardcoder le mot de passe SMTP dans le code
- **Utiliser** toujours les variables d'environnement
- **Changer** le mot de passe régulièrement
- **Limiter** l'accès aux variables d'environnement

## Maintenance

### Changer le mot de passe SMTP

1. Mettre à jour la variable d'environnement `SMTP_PASS`
2. Redémarrer l'application Next.js
3. Si nécessaire, mettre à jour la configuration Supabase via l'API

### Monitoring

- **Dashboard Supabase** → Logs → Auth
- **Dashboard IONOS** → Statistiques d'envoi
- **Surveiller** les taux de rebond (bounce rate)

## Dépannage

### Problèmes courants

1. **Emails non envoyés** :
   - Vérifier les identifiants SMTP
   - Confirmer le port (465 vs 587)
   - Vérifier les logs Supabase

2. **Emails marqués comme spam** :
   - Vérifier les enregistrements SPF/DKIM
   - Utiliser un sujet et contenu appropriés
   - Éviter les liens suspects

3. **Limites dépassées** :
   - Vérifier les limites IONOS
   - Implémenter des délais entre les envois
   - Utiliser des queues d'envoi pour les gros volumes

## Documentation Supabase

- [Send emails with custom SMTP](https://supabase.com/docs/guides/auth/custom-smtp)
- [Auth Configuration](https://supabase.com/docs/guides/auth/auth-helpers)

---

**Important** : Cette configuration remplace complètement le service email Supabase par défaut. Assurez-vous que toutes les variables d'environnement sont correctement configurées avant de déployer en production.
