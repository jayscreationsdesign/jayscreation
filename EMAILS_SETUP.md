# Configuration Email - Jay's Creations Design

## Configuration SMTP Supabase (Option A - Recommandée)

Pour que la fonctionnalité "Mot de passe oublié" fonctionne, vous devez configurer le SMTP personnalisé dans Supabase.

### Étapes de configuration :

1. **Connectez-vous à Supabase Dashboard**
   - URL : https://rtttjomxnchffqqaafxa.supabase.co
   - Authentifiez-vous avec votre compte

2. **Accédez aux paramètres SMTP**
   - Allez dans `Authentication` → `Settings` → `SMTP Settings`
   - Cochez `Enable Custom SMTP`

3. **Configurez les paramètres SMTP IONOS**
   ```
   Host: smtp.ionos.fr
   Port: 587
   User: contact@jayscreationsdesign.fr
   Pass: [VOTRE_MOT_DE_PASSE_IONOS]
   Sender email: contact@jayscreationsdesign.fr
   Sender name: Jay's Creations Design
   ```

4. **Testez la configuration**
   - Cliquez sur "Test SMTP Settings"
   - Vérifiez que l'email de test est bien reçu

## Template Email Reset Password

### Personnalisation du template :

1. **Accédez aux templates email**
   - Allez dans `Authentication` → `Email Templates` → `Reset Password`

2. **Configurez le sujet**
   ```
   Subject: Réinitialisation de votre mot de passe — Jay's Creations Design
   ```

3. **Configurez le corps du message (HTML)**
   ```html
   <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF7F2; padding: 40px 20px;">
     <div style="background: #FFFFFF; border-radius: 12px; padding: 32px; text-align: center;">
       <h1 style="font-family: 'Playfair Display', serif; color: #333; font-size: 24px;">
         Réinitialisation de votre mot de passe
       </h1>
       <p style="color: #666; font-size: 15px; line-height: 1.6;">
         Bonjour,<br><br>
         Vous avez demandé la réinitialisation de votre mot de passe sur Jay's Creations Design.
         Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe.
       </p>
       <a href="{{ .ConfirmationURL }}" style="display: inline-block; background: #C8A96E; color: #FFFFFF; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 15px; margin: 20px 0;">
         Réinitialiser mon mot de passe
       </a>
       <p style="color: #999; font-size: 12px; margin-top: 24px;">
         Si vous n'avez pas fait cette demande, ignorez simplement cet email.<br>
         Ce lien expire dans 24 heures.
       </p>
     </div>
     <div style="text-align: center; margin-top: 20px; color: #999; font-size: 11px;">
       Jay's Creations Design — Papeterie Personnalisée<br>
       15 Quai d'Asnières, 92390 Villeneuve-la-Garenne<br>
       📞 07 49 07 28 61 — 🌐 jayscreationsdesign.fr
     </div>
   </div>
   ```

## Pages créées

### 1. Page de connexion améliorée
- **Fichier** : `src/app/connexion/page.tsx`
- **Ajout** : Lien "Mot de passe oublié ?" sous le champ mot de passe

### 2. Page mot de passe oublié
- **URL** : `/mot-de-passe-oublie`
- **Fichier** : `src/app/mot-de-passe-oublie/page.tsx`
- **Fonctionnalité** : Envoi d'email de réinitialisation

### 3. Page nouveau mot de passe
- **URL** : `/nouveau-mot-de-passe`
- **Fichier** : `src/app/nouveau-mot-de-passe/page.tsx`
- **Fonctionnalité** : Création du nouveau mot de passe

## Flux utilisateur

1. **Utilisateur oublié son mot de passe**
   - Clique sur "Mot de passe oublié ?" sur la page de connexion
   - Arrive sur `/mot-de-passe-oublie`
   - Saisit son email et clique sur "Envoyer le lien"

2. **Réception de l'email**
   - Supabase envoie un email avec le lien de réinitialisation
   - L'email utilise le template personnalisé Jay's Creations
   - Lien pointe vers `/nouveau-mot-de-passe` avec les tokens

3. **Création du nouveau mot de passe**
   - L'utilisateur arrive sur `/nouveau-mot-de-passe`
   - Saisit et confirme son nouveau mot de passe
   - Le mot de passe est mis à jour dans Supabase
   - Redirection automatique vers `/compte`

## Sécurité

- **Pas d'indication sur l'existence de l'email** : Message générique "Si un compte existe..."
- **Tokens expirants** : Les liens expirent après 24 heures
- **Validation forte** : Minimum 8 caractères pour les mots de passe
- **HTTPS requis** : Toutes les communications sont sécurisées

## Design

- **Cohérence visuelle** : Même style que le reste du site
- **Couleurs Jay's Creations** : Crème (#FAF7F2), or (#C8A96E), brun (#8B4513)
- **Typographie** : Playfair Display (titres), Inter (texte)
- **Responsive** : Adaptation parfaite sur mobile

## Dépannage

### Problèmes courants :

1. **Email non reçu**
   - Vérifiez les spams
   - Vérifiez la configuration SMTP dans Supabase
   - Testez l'envoi d'email depuis Supabase

2. **Lien invalide**
   - Le lien a expiré (24h)
   - L'utilisateur a déjà utilisé le lien
   - Tokens corrompus

3. **Erreur de mise à jour**
   - Vérifiez la connexion internet
   - Assurez-vous que les tokens sont valides
   - Contactez le support si persiste

### Test rapide :

1. Allez sur `/connexion`
2. Cliquez sur "Mot de passe oublié ?"
3. Saisissez votre email
4. Vérifiez la réception de l'email
5. Cliquez sur le lien dans l'email
6. Créez votre nouveau mot de passe

La fonctionnalité est maintenant opérationnelle ! 🎉
