# Scripts d'administration

## Créer un utilisateur admin

### Méthode 1: Script Node.js (recommandée)

1. Installez les dépendances:
```bash
npm install @supabase/supabase-js dotenv
```

2. Exécutez le script:
```bash
node scripts/create-admin.js
```

### Méthode 2: Dashboard Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Connectez-vous à votre projet
3. Allez dans **Authentication** > **Users**
4. Cliquez **"Add user"**
5. Entrez: `admin@jayscreationsdesign.fr`
6. Cochez **"Auto-verify user"**
7. Définissez un mot de passe
8. Allez dans **Table Editor** > **profiles**
9. Ajoutez une ligne avec:
   - `id`: l'UUID de l'utilisateur créé
   - `email`: admin@jayscreationsdesign.fr
   - `role`: admin

### Méthode 3: SQL direct

Dans le dashboard Supabase, allez dans **SQL Editor** et exécutez:

```sql
-- Remplacez VOTRE_UUID par l'UUID de l'utilisateur
INSERT INTO profiles (id, email, role, created_at, updated_at)
VALUES (
  'VOTRE_UUID',
  'admin@jayscreationsdesign.fr', 
  'admin',
  NOW(),
  NOW()
);
```

## Accès admin

Une fois le compte créé:
- URL: https://jayscreation.vercel.app/admin
- Email: admin@jayscreationsdesign.fr
- Mot de passe: celui défini lors de la création
