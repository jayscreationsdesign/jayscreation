# Checklist Stripe Live

## Avant de passer en live :
- [ ] Activer le compte Stripe (vérification d'identité complétée)
- [ ] Récupérer les clés live : `sk_live_...` et `pk_live_...` 
- [ ] Remplacer dans Vercel > Settings > Environment Variables :
  - STRIPE_SECRET_KEY --> clé sk_live_...
  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY --> clé pk_live_...
- [ ] Configurer le webhook Stripe en live :
  - URL : https://www.jayscreationsdesign.fr/api/webhook
  - Événements : checkout.session.completed, payment_intent.succeeded
  - Récupérer le nouveau webhook secret et le mettre dans STRIPE_WEBHOOK_SECRET sur Vercel
- [ ] Vérifier que allow_promotion_codes: true est activé (pour BIENVENUE10)
- [ ] Tester un paiement réel de 1 pour vérifier le tunnel complet
- [ ] Redéployer : vercel --prod

## Après le passage en live :
- [ ] Faire un achat test avec une vraie carte
- [ ] Vérifier que l'email de confirmation arrive
- [ ] Vérifier que la commande apparaît dans Supabase
- [ ] Vérifier que la commande apparaît dans le dashboard Stripe
