-- Table loyalty_points
CREATE TABLE loyalty_points (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  points INTEGER DEFAULT 0 NOT NULL,
  total_earned INTEGER DEFAULT 0 NOT NULL,
  tier TEXT DEFAULT 'petale' CHECK (tier IN ('petale', 'orchidee', 'diamant')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Un seul enregistrement par utilisateur
CREATE UNIQUE INDEX idx_loyalty_user ON loyalty_points(user_id);

-- RLS
ALTER TABLE loyalty_points ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own loyalty" ON loyalty_points
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage loyalty" ON loyalty_points
  FOR ALL USING (true);

-- Table loyalty_transactions
CREATE TABLE loyalty_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN (
    'purchase', 'signup', 'birthday', 'review', 'referral', 'instagram', 'reward_redeemed', 'manual'
  )),
  points INTEGER NOT NULL, -- positif = gagné, négatif = dépensé
  description TEXT,
  reference_id TEXT, -- ID commande, ID avis, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE loyalty_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions" ON loyalty_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Table loyalty_rewards
CREATE TABLE loyalty_rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reward_type TEXT NOT NULL CHECK (reward_type IN (
    'free_shipping', 'discount_5', 'discount_15', 'free_product', 'custom_creation'
  )),
  points_spent INTEGER NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'used', 'expired')) NOT NULL,
  coupon_code TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE loyalty_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own rewards" ON loyalty_rewards
  FOR SELECT USING (auth.uid() = user_id);
