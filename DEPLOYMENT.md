# 🚀 Stratégie de Déploiement avec GitHub Actions

## 📋 Vue d'ensemble

Ce projet utilise **GitHub Actions** pour automatiser les déploiements du frontend et du backend indépendamment.

## 🌳 Structure des branches

```
main (développement)
  ├── Déclenche: deploy-frontend.yml + deploy-backend.yml
  └── À merger après des tests

deploy-frontend (optionnel)
  └── Déclenche UNIQUEMENT le déploiement frontend

deploy-backend (optionnel)
  └── Déclenche UNIQUEMENT le déploiement backend
```

## ⚙️ Workflows disponibles

### 1️⃣ **deploy-frontend.yml**
**Déclenché quand il y a des changements dans:**
- `src/**` (code React)
- `public/**` (assets)
- `index.html`
- `vite.config.ts`
- `package.json`

**Actions:**
1. ✅ Installe les dépendances
2. 🔨 Build avec Vite
3. 🚀 Déploie sur Vercel/Netlify/S3 (à configurer)

### 2️⃣ **deploy-backend.yml**
**Déclenché quand il y a des changements dans:**
- `server/**` (code Node.js)
- `Dockerfile`
- `docker-compose.yml`
- `package.json`

**Actions:**
1. ✅ Installe les dépendances
2. 🧪 Run les tests
3. 🐳 Build Docker image (optionnel)
4. 🚀 Déploie (SSH/Heroku/AWS/Docker)

## 🔧 Configuration requise

### Étape 1: Configurer les secrets GitHub

Allez sur: `GitHub → Settings → Secrets and variables → Actions`

**Pour le FRONTEND, créez:**
```
VERCEL_TOKEN=votre_token_vercel
# ou
NETLIFY_AUTH_TOKEN=votre_token_netlify
# ou
AWS_ACCESS_KEY_ID=votre_cle
AWS_SECRET_ACCESS_KEY=votre_secret
```

**Pour le BACKEND, créez:**
```
DEPLOY_HOST=votre_serveur.com
DEPLOY_USER=username
DEPLOY_KEY=votre_clé_ssh_privée
# ou pour Heroku:
HEROKU_API_KEY=votre_token_heroku
```

### Étape 2: Configurer les commandes de déploiement

Éditez les workflows pour remplacer les `run:` placeholders:

**Frontend (Exemple avec Netlify):**
```yaml
- name: Deploy to Netlify
  run: |
    npm install -g netlify-cli
    netlify deploy --prod --site ${{ secrets.NETLIFY_SITE_ID }} --auth ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

**Backend (Exemple avec SSH):**
```yaml
- name: Deploy via SSH
  run: |
    mkdir -p ~/.ssh
    echo "${{ secrets.DEPLOY_KEY }}" > ~/.ssh/id_rsa
    chmod 600 ~/.ssh/id_rsa
    ssh -o StrictHostKeyChecking=no ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }} 'cd /app/site_green_up && git pull origin main && npm install && npm run build && pm2 restart server'
```

### Étape 3: Utiliser les branches

**Option A - Déploiement depuis `main` (recommandé)**
```bash
# Le push vers main déclenche les 2 déploiements
git push origin main
```

**Option B - Déploiement séparé (avancé)**
```bash
# Déployer UNIQUEMENT le frontend
git push origin deploy-frontend

# Déployer UNIQUEMENT le backend
git push origin deploy-backend

# Déployer les deux
git push origin main
```

## 📊 Statut des déploiements

Consultez les déploiements: `GitHub → Actions`

Vous verrez:
- ✅ Déploiements réussis (vert)
- ❌ Déploiements échoués (rouge)
- ⏳ Déploiements en cours

## 🎯 Bonnes pratiques

1. **Toujours faire un push vers `main`** après des tests locaux
2. **Vérifier les Actions avant de passer en prod**
3. **Ajouter des tests** dans les workflows
4. **Utiliser des variables d'environnement** pour les configs sensibles
5. **Monitor les logs** en cas d'erreur

## 🔄 Exemple de flux de travail

```
1. Développement local
   ↓
2. git commit && git push origin feature-branch
   ↓
3. Créer une PR sur main
   ↓
4. Tests/Revue du code
   ↓
5. Merge vers main
   ↓
6. ✅ GitHub Actions déclenche les déploiements auto
   ↓
7. Frontend + Backend déployés en parallèle 🚀
```

## ⚠️ Troubleshooting

**❌ Deployment échoué?**
- Vérifiez les secrets GitHub
- Consultez les logs des Actions
- Vérifiez les chemins des fichiers

**❌ Mauvaise branche déployée?**
- Vérifiez les conditions `on.push.branches`
- Assurez-vous de faire le push vers la bonne branche

**❌ Déploiement très lent?**
- Ajoutez du cache npm
- Optimisez les dépendances
- Utilisez du CDN pour les assets

## 📚 Ressources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Upload artifacts](https://github.com/actions/upload-artifact)
- [Deploy to Vercel](https://vercel.com/docs/cli/deploy)
- [Deploy to Netlify](https://docs.netlify.com/netlify-cli/overview/)
