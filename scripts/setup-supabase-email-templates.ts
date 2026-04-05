#!/usr/bin/env tsx

/**
 * Script de documentation pour la configuration des templates email Supabase
 * 
 * Ce script documente les templates à configurer manuellement dans :
 * Supabase Dashboard → Authentication → Email Templates
 */

console.log('📧 CONFIGURATION DES TEMPLATES EMAIL SUPABASE')
console.log('==========================================')
console.log('')
console.log('Étapes de configuration :')
console.log('1. Allez sur https://rtttjomxnchffqqaafxa.supabase.co')
console.log('2. Authentication → Email Templates')
console.log('3. Configurez chaque template avec le code ci-dessous')
console.log('')

// Template "Confirm signup"
console.log('🔹 TEMPLATE "Confirm signup"')
console.log('Subject: Confirmez votre adresse email — Jay\'s Creations Design')
console.log('')
console.log('Body (HTML):')
console.log('```html')
const confirmSignupTemplate = `<div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF7F2; padding: 40px 20px;">
  <div style="background: #FFFFFF; border-radius: 12px; padding: 32px; text-align: center;">
    <h1 style="font-family: 'Playfair Display', serif; color: #333; font-size: 24px;">
      Confirmez votre adresse email ✨
    </h1>
    <p style="color: #666; font-size: 15px; line-height: 1.6;">
      Bonjour,<br><br>
      Merci de vous être inscrit(e) chez Jay's Creations Design !<br>
      Cliquez sur le bouton ci-dessous pour confirmer votre adresse email.
    </p>
    <a href="{{ .ConfirmationURL }}" style="display: inline-block; background: #C8A96E; color: #FFFFFF; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 15px; margin: 20px 0;">
      Confirmer mon email
    </a>
    <p style="color: #999; font-size: 12px; margin-top: 24px;">
      Si vous n'avez pas créé de compte, ignorez cet email.
    </p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #999; font-size: 11px;">
    Jay's Creations Design — Papeterie Personnalisée<br>
    15 Quai d'Asnières, 92390 Villeneuve-la-Garenne<br>
    jayscreationsdesign.fr
  </div>
</div>`;
console.log(confirmSignupTemplate);
console.log('```')
console.log('')

// Template "Reset password"
console.log('🔹 TEMPLATE "Reset password"')
console.log('Subject: Réinitialisation de votre mot de passe — Jay\'s Creations Design')
console.log('')
console.log('Body (HTML):')
console.log('```html')
const resetPasswordTemplate = `<div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF7F2; padding: 40px 20px;">
  <div style="background: #FFFFFF; border-radius: 12px; padding: 32px; text-align: center;">
    <h1 style="font-family: 'Playfair Display', serif; color: #333; font-size: 24px;">
      Réinitialisation de votre mot de passe
    </h1>
    <p style="color: #666; font-size: 15px; line-height: 1.6;">
      Bonjour,<br><br>
      Vous avez demandé la réinitialisation de votre mot de passe.<br>
      Cliquez sur le bouton ci-dessous pour en créer un nouveau.
    </p>
    <a href="{{ .ConfirmationURL }}" style="display: inline-block; background: #C8A96E; color: #FFFFFF; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 15px; margin: 20px 0;">
      Réinitialiser mon mot de passe
    </a>
    <p style="color: #999; font-size: 12px; margin-top: 24px;">
      Si vous n'avez pas fait cette demande, ignorez cet email.<br>
      Ce lien expire dans 24 heures.
    </p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #999; font-size: 11px;">
    Jay's Creations Design — Papeterie Personnalisée<br>
    15 Quai d'Asnières, 92390 Villeneuve-la-Garenne<br>
    jayscreationsdesign.fr
  </div>
</div>`;
console.log(resetPasswordTemplate);
console.log('```')
console.log('')

console.log('📋 NOTES IMPORTANTES :')
console.log('• Utilisez les variables {{ .ConfirmationURL }} pour les liens')
console.log('• Les templates utilisent les couleurs Jay\'s Creations :')
console.log('  - Fond crème : #FAF7F2')
console.log('  - Or : #C8A96E')
console.log('  - Texte gris : #666, #999')
console.log('• Typographie : Playfair Display (titres), Inter (texte)')
console.log('• Design responsive et professionnel')
console.log('')

console.log('✅ Une fois configuré, testez avec une nouvelle inscription !')
console.log('')

export { confirmSignupTemplate, resetPasswordTemplate };
