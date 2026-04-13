# Installation et Configuration du Système de Chat Support

## Étape 1 : Configuration Base de Données Supabase

1. Connectez-vous à votre projet Supabase
2. Allez dans "SQL Editor"
3. Exécutez le contenu du fichier `database/create-chat-tables.sql`
4. Allez dans "Settings" > "API" et active "Realtime" pour les tables :
   - `chat_sessions`
   - `chat_messages`

## Étape 2 : Configuration Variables d'Environnement

Copiez `.env.local.example` vers `.env.local` et configurez :

```bash
# Variables déjà existantes (vérifiez qu'elles sont correctes)
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon
SMTP_HOST=smtp.ionos.fr
SMTP_PORT=587
SMTP_USER=contact@jayscreationsdesign.fr
SMTP_PASS=votre_mot_de_passe_ionos

# Variables Twilio (optionnel)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+33749072861
```

## Étape 3 : Installation Dépendances

Les dépendances sont déjà installées :
- `twilio` (pour notifications WhatsApp)
- `nodemailer` (déjà présent pour emails)

## Étape 4 : Déploiement

```bash
git add .
git commit -m "feat: système chat support temps réel avec alertes"
git push origin main
vercel --prod
```

## Étape 5 : Test du Système

### Test Client :
1. Allez sur votre site
2. Le bouton chat apparaît en bas à droite
3. Cliquez pour ouvrir la fenêtre de chat
4. Envoyez un message test

### Test Admin :
1. Allez sur `/admin/login` pour vous connecter
2. Accédez à `/admin/chat`
3. Vous devriez voir la conversation apparaître en temps réel

### Test Notifications :
1. **Email** : Vous devriez recevoir un email à `contact@jayscreationsdesign.fr`
2. **WhatsApp** : Si Twilio est configuré, vous recevrez une notification WhatsApp

## Fonctionnalités

### Client :
- Bouton flottant avec badge de notification
- Messages en temps réel
- Réponses automatiques intelligentes
- Réponses rapides pré-définies
- Identification unique par localStorage

### Admin :
- Dashboard temps réel
- Filtre par statut (Ouvert/En cours)
- Gestion des conversations
- Réponses rapides admin
- Compteurs de messages non lus

### Notifications :
- **Email** : HTML élégant avec lien direct vers admin
- **WhatsApp** : Message court avec lien vers admin
- **Auto-réponses** : Basées sur le contenu du message

## Configuration Twilio (Optionnel)

Pour activer les notifications WhatsApp :

1. Créez un compte Twilio
2. Activez le Sandbox WhatsApp
3. Configurez les numéros d'envoi/réception
4. Ajoutez les variables d'environnement

## Dépannage

### Le chat n'apparaît pas :
- Vérifiez que vous n'êtes pas sur une page `/admin/*`
- Vérifiez les erreurs console

### Messages ne s'envoient pas :
- Vérifiez les variables Supabase
- Vérifiez que Realtime est activé

### Emails ne partent pas :
- Vérifiez la configuration SMTP Ionos
- Vérifiez les logs serveur

### WhatsApp ne fonctionne pas :
- Vérifiez les identifiants Twilio
- Le système fonctionne sans WhatsApp si Twilio n'est pas configuré

## Sécurité

- Le chat utilise localStorage pour l'identification anonyme
- L'accès admin nécessite une authentification
- Les variables d'environnement sont protégées
- Realtime est configuré avec permissions appropriées

## Support

Le système est maintenant prêt pour être utilisé ! Les clients peuvent contacter le support en temps réel et recevoir des réponses automatiques immédiates.
