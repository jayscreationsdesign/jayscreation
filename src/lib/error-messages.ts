// Traduction des messages d'erreur Supabase en français
// Utiliser translateError() partout où un message d'erreur est affiché à l'utilisateur

export const errorMessages: Record<string, string> = {
  // Authentification Supabase
  'Email not confirmed': 'Votre adresse email n\'a pas encore été confirmée. Vérifiez votre boîte mail.',
  'Invalid login credentials': 'Email ou mot de passe incorrect.',
  'User already registered': 'Un compte existe déjà avec cette adresse email.',
  'Password should be at least 6 characters': 'Le mot de passe doit contenir au moins 6 caractères.',
  'Failed to fetch': 'Erreur de connexion au serveur. Veuillez réessayer.',
  'Email rate limit exceeded': 'Trop de tentatives. Veuillez patienter quelques minutes.',
  'New password should be different from the old password': 'Le nouveau mot de passe doit être différent de l\'ancien.',
  'Signup requires a valid password': 'Veuillez saisir un mot de passe valide.',
  'Unable to validate email address: invalid format': 'Le format de l\'adresse email est invalide.',
  'Token has expired or is invalid': 'Le lien a expiré ou est invalide. Veuillez réessayer.',
  'For security purposes, you can only request this once every 60 seconds': 'Pour des raisons de sécurité, veuillez patienter 60 secondes avant de réessayer.',
  'Invalid password': 'Mot de passe incorrect.',
  'Too many requests': 'Trop de tentatives. Veuillez patienter quelques minutes.',
  'Database error saving new user': 'Erreur lors de la création du compte. Veuillez réessayer.',
  'To signup, please provide your email address': 'Veuillez fournir une adresse email pour vous inscrire.',
  'Only email addresses are allowed for signup': 'Seules les adresses email sont autorisées pour l\'inscription.',
  'Password is too short': 'Le mot de passe est trop court.',
  'Password is too long': 'Le mot de passe est trop long.',
  'Email address is invalid': 'L\'adresse email n\'est pas valide.',
  'Password should contain at least one character': 'Le mot de passe doit contenir au moins un caractère.',
  'Signup requires email confirmation': 'L\'inscription nécessite une confirmation par email.',
  
  // Erreurs générales
  'Network error': 'Erreur réseau',
  'Server error': 'Erreur serveur',
  'Unknown error': 'Erreur inconnue',
  'Permission denied': 'Permission refusée',
  'Access denied': 'Accès refusé',
  'Not found': 'Non trouvé',
  'Unauthorized': 'Non autorisé',
  'Forbidden': 'Interdit',
  'Request timeout': 'Délai d\'attente dépassé',
  'Connection failed': 'Connexion échouée',
  'Invalid request': 'Requête invalide',
  'Validation failed': 'Validation échouée',
  'Operation failed': 'Opération échouée',
  
  // Erreurs de formulaire
  'Required field': 'Champ obligatoire',
  'Invalid format': 'Format invalide',
  'Invalid email': 'Email invalide',
  'Invalid phone': 'Numéro de téléphone invalide',
  'Invalid address': 'Adresse invalide',
  'Field cannot be empty': 'Le champ ne peut pas être vide',
  'Minimum length': 'Longueur minimale requise',
  'Maximum length': 'Longueur maximale dépassée',
  'Passwords do not match': 'Les mots de passe ne correspondent pas',
  'Email already exists': 'Cet email est déjà utilisé',
  'User not found': 'Utilisateur non trouvé',
  'Invalid credentials': 'Identifiants invalides',
  
  // Erreurs de paiement
  'Payment failed': 'Paiement échoué',
  'Payment declined': 'Paiement refusé',
  'Insufficient funds': 'Fonds insuffisants',
  'Card expired': 'Carte expirée',
  'Invalid card': 'Carte invalide',
  'Payment processing error': 'Erreur lors du traitement du paiement',
  'Transaction failed': 'Transaction échouée',
  
  // Erreurs de panier
  'Cart is empty': 'Votre panier est vide',
  'Product not available': 'Produit non disponible',
  'Out of stock': 'Rupture de stock',
  'Insufficient stock': 'Stock insuffisant',
  'Invalid quantity': 'Quantité invalide',
  'Product removed': 'Produit retiré du panier',
  
  // Erreurs de commande
  'Order not found': 'Commande non trouvée',
  'Order cancelled': 'Commande annulée',
  'Order processing failed': 'Erreur lors du traitement de la commande',
  'Shipping error': 'Erreur de livraison',
  'Delivery failed': 'Échec de la livraison',
  
  // Messages de succès
  'Success': 'Succès',
  'Operation successful': 'Opération réussie',
  'Changes saved': 'Modifications enregistrées',
  'Item added': 'Article ajouté',
  'Item removed': 'Article retiré',
  'Updated successfully': 'Mis à jour avec succès',
  'Created successfully': 'Créé avec succès',
  'Deleted successfully': 'Supprimé avec succès',
  'Sent successfully': 'Envoyé avec succès',
}

export function translateError(message: string): string {
  return errorMessages[message] || message
}

// Fonction utilitaire pour traduire les messages d'erreur avec fallback
export function getTranslatedError(error: any): string {
  if (!error) return 'Une erreur est survenue.'
  
  const message = error.message || error.toString()
  return translateError(message)
}

// Messages de succès courants
export const successMessages: Record<string, string> = {
  'Account created successfully': 'Compte créé avec succès',
  'Password updated successfully': 'Mot de passe mis à jour avec succès',
  'Order placed successfully': 'Commande passée avec succès',
  'Profile updated successfully': 'Profil mis à jour avec succès',
  'Email sent successfully': 'Email envoyé avec succès',
  'Item added to cart': 'Article ajouté au panier',
  'Item removed from cart': 'Article retiré du panier',
  'Cart updated': 'Panier mis à jour',
  'Address saved': 'Adresse enregistrée',
  'Payment successful': 'Paiement effectué avec succès',
  'Order confirmed': 'Commande confirmée',
  'Settings saved': 'Paramètres enregistrés',
  'Changes saved': 'Modifications enregistrées',
  'Logged out successfully': 'Déconnexion réussie',
}

export function translateSuccess(message: string): string {
  return successMessages[message] || message
}
