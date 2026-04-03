# 📧 Guide de Configuration des Emails Automatiques

## 🎯 Objectif
Configurer un système d'emails automatiques professionnel pour Jay's Creations Design avec IONOS Email Marketing.

---

## 📋 Étapes de Configuration

### 1️⃣ Configuration des Variables d'Environnement

#### Fichiers créés automatiquement :
- ✅ `.env.local` - Configuration pour Next.js
- ✅ `supabase/.env` - Configuration pour Edge Functions

#### Variables à configurer dans `.env.local` :
```bash
# Identifiants IONOS Email Marketing
IONOS_EMAIL_USER=newsletter@jayscreationsdesign.fr
IONOS_EMAIL_PASS=votre_mot_de_passe_ionos

# Adresses emails
IONOS_TRANSACTIONAL_EMAIL=newsletter@jayscreationsdesign.fr
IONOS_ORDER_EMAIL=commande@jayscreationsdesign.fr
IONOS_ADMIN_EMAIL=contact@jayscreationsdesign.fr
```

#### Variables à configurer dans `supabase/.env` :
```bash
# Configuration SMTP
IONOS_EMAIL_HOST=smtp.ionos.de
IONOS_EMAIL_PORT=587
IONOS_EMAIL_SECURE=false
IONOS_EMAIL_USER=newsletter@jayscreationsdesign.fr
IONOS_EMAIL_PASS=votre_mot_de_passe_ionos_email_marketing

# Alternative Resend (recommandé)
RESEND_API_KEY=re_votre_cle_api_resend
```

---

### 2️⃣ Configuration IONOS Email Marketing

#### 📧 Créer l'email newsletter@jayscreationsdesign.fr :
1. Connectez-vous à [IONOS](https://login.ionos.com)
2. Allez dans "Email Marketing"
3. Créez une nouvelle adresse : `newsletter@jayscreationsdesign.fr`
4. Notez le mot de passe généré

#### 🔐 Obtenir les identifiants SMTP :
1. Dans IONOS Email Marketing > Paramètres > Paramètres SMTP
2. Notez :
   - Serveur : `smtp.ionos.de`
   - Port : `587`
   - Utilisateur : `newsletter@jayscreationsdesign.fr`
   - Mot de passe : celui que vous venez de créer

---

### 3️⃣ Configuration DNS (Important !)

#### 🌐 Dans votre gestionnaire DNS IONOS :

```dns
# 1. SPF (à ajouter à votre SPF existant)
Nom: @
Type: TXT
Valeur: v=spf1 include:mx.ionos.de include:emailing.ionos.de ~all

# 2. DKIM (fourni par IONOS)
Nom: ionos._domainkey
Type: TXT
Valeur: v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC... (valeur IONOS)

# 3. CNAME pour tracking
Nom: newsletter
Type: CNAME
Valeur: emailmarketing.ionos.de

# 4. DMARC (recommandé)
Nom: _dmarc
Type: TXT
Valeur: v=DMARC1; p=quarantine; rua=mailto:dmarc@jayscreationsdesign.fr
```

---

### 4️⃣ Configuration Supabase

#### ⚙️ Dans Supabase Dashboard :
1. Allez dans Settings > Auth > SMTP
2. Configurez :
   - SMTP Host : `smtp.ionos.de`
   - SMTP Port : `587`
   - SMTP User : `newsletter@jayscreationsdesign.fr`
   - SMTP Pass : votre mot de passe IONOS

---

### 5️⃣ Alternative : Resend (Recommandé)

#### 🚀 Pour une configuration plus simple :
1. Créez un compte sur [Resend](https://resend.com)
2. Vérifiez votre domaine `jayscreationsdesign.fr`
3. Obtenez votre clé API (commence par `re_`)
4. Configurez `RESEND_API_KEY` dans vos variables d'environnement

---

## 🧪 Tests et Validation

### 📧 Page de test intégrée :
Visitez : `https://votresite.com/test-emails`

### 🧪 Tests manuels recommandés :

1. **Email de bienvenue**
   - Créez un compte test
   - Vérifiez réception sur `newsletter@` et copie sur `contact@`

2. **Emails de commande**
   - Passez une commande test
   - Vérifiez email client et admin

3. **Demande de devis**
   - Remplissez formulaire devis
   - Vérifiez réception sur `contact@`

4. **Alertes stock**
   - Mettez un produit en stock faible
   - Vérifiez alerte sur `commande@`

---

## 🔍 Dépannage

### ❌ Emails non reçus :
1. Vérifiez les spams
2. Validez les enregistrements DNS (attendre 24-48h)
3. Testez avec [MXToolbox](https://mxtoolbox.com/)

### ⚠️ Erreurs SMTP :
1. Vérifiez identifiants dans `.env.local`
2. Testez connexion SMTP avec telnet
3. Consultez logs Supabase

### 🐛 Debug :
```javascript
// Dans console navigateur
console.log('Email config:', emailConfig.isConfigured());
console.log('Test email:', emailConfig.getTestEmail());
```

---

## 📞 Support

### 📚 Documentation utile :
- [IONOS Email Marketing](https://www.ionos.fr/email-marketing)
- [Supabase Auth SMTP](https://supabase.com/docs/guides/auth-smtp)
- [Resend Documentation](https://resend.com/docs)

### 🆘 En cas de problème :
1. Vérifiez cette documentation
2. Consultez les logs du navigateur
3. Testez avec des adresses email temporaires

---

## ✅ Checklist Finale

- [ ] Variables d'environnement configurées
- [ ] Email IONOS créé et activé
- [ ] Enregistrements DNS créés
- [ ] SMTP Supabase configuré
- [ ] Tests effectués avec succès
- [ ] Production déployée

---

**🎉 Votre système d'emails automatiques est prêt !**
