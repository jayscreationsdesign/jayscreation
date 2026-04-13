-- Mise à jour de la table commandes pour la validation par email
-- Ajout des colonnes nécessaires pour le système de validation

-- Ajout de la colonne admin_token pour la validation par email
ALTER TABLE commandes 
ADD COLUMN IF NOT EXISTS admin_token TEXT UNIQUE;

-- Ajout de la colonne payment_intent_id pour les remboursements Stripe
ALTER TABLE commandes 
ADD COLUMN IF NOT EXISTS payment_intent_id TEXT;

-- Ajout de la colonne token_used pour marquer les tokens comme utilisés
ALTER TABLE commandes 
ADD COLUMN IF NOT EXISTS token_used BOOLEAN DEFAULT FALSE;

-- Mise à jour des statuts possibles pour inclure 'pending' et 'confirmed'
ALTER TABLE commandes 
DROP CONSTRAINT IF EXISTS commandes_statut_check;

ALTER TABLE commandes 
ADD CONSTRAINT commandes_statut_check 
CHECK (statut IN ('en_attente', 'payee', 'annulee', 'pending', 'confirmed', 'cancelled'));

-- Index pour optimiser la recherche par admin_token
CREATE INDEX IF NOT EXISTS idx_commandes_admin_token ON commandes(admin_token);

-- Index pour optimiser la recherche par payment_intent_id
CREATE INDEX IF NOT EXISTS idx_commandes_payment_intent_id ON commandes(payment_intent_id);

-- Commentaires pour documentation
COMMENT ON COLUMN commandes.admin_token IS 'Token unique pour validation de commande par email';
COMMENT ON COLUMN commandes.payment_intent_id IS 'ID du paiement Stripe pour les remboursements';
COMMENT ON COLUMN commandes.token_used IS 'Indique si le token de validation a été utilisé';
