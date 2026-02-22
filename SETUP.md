# 🌱 Green Up Academy - Guide de Démarrage

> Système d'authentification complet avec dashboard administrateur CMS

## 📋 Vue d'ensemble

Un site web complet pour l'école Green Up Academy avec :
- ✅ **Authentification sécurisée** (JWT)
- ✅ **Dashboard administrateur** pour modifier le contenu du site (CMS)
- ✅ **Contrôle d'accès** - Seul l'admin peut accéder au dashboard
- ✅ **Interface responsive** pour tous les utilisateurs
- ✅ **Architecture moderne** - React + TypeScript + Express

## 🚀 Installation rapide

### 1. **Frontend** (React + Vite)

```bash
# À la racine du projet
npm install

# Démarrer le serveur de développement
npm run dev
```

Le site sera accessible sur: **http://localhost:5173**

### 2. **Backend** (Node.js + Express)

```bash
# Naviguer au dossier server
cd server

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Démarrer le serveur
npm run dev
```

Le serveur sera accessible sur: **http://localhost:4000**

---

## 🔑 Authentification par défaut

| Identifiant | Mot de passe | Rôle |
|-------------|--------------|------|
| `admin`     | `gua2026`    | Admin |

⚠️ **IMPORTANT**: Changez le mot de passe avant d'aller en production!

---

## 📚 Architecture

### Frontend (React + TypeScript)

```
src/
├── contexts/
│   └── AuthContext.tsx          # Gestion globale de l'authentification
├── pages/
│   ├── LoginPage.tsx            # Page de connexion
│   ├── AdminDashboard.tsx       # Dashboard administrateur (CMS)
│   └── ...autres pages
├── components/
│   └── layout/
│       └── Header.tsx           # Header avec menu utilisateur
├── App.tsx                      # Route protégée du dashboard
└── index.tsx                    # Point d'entrée
```

### Backend (Node.js + Express)

```
server/
├── index.js                    # Serveur Express + API
├── .env.example               # Configuration d'exemple
├── data/
│   ├── content.json           # Contenu du site
│   ├── users.json             # Utilisateurs (généré)
│   └── ...autres données
└── uploads/                   # Fichiers uploadés
```

---

## 🔐 Flux d'authentification

```
1. Utilisateur -> Page de login
2. Soumet username + password
3. Backend vérifie les identifiants
4. Backend génère un JWT token
5. Frontend stocke le token en localStorage
6. JWT utilisé pour toutes les requêtes API

📌 Token valide 8 heures
```

### Routes API

```
POST /api/auth/login              # Connexion (public)
GET  /api/auth/me                 # Vérifier le token (protégé)
POST /api/auth/change-password    # Changer le mot de passe admin (protégé)
```

---

## 🛡️ Contrôle d'accès

### Frontend Protection

```typescript
// Dans App.tsx
if (user?.role !== 'admin') {
  // Accès refusé au dashboard
  return <AccessDenied />;
}
```

### Navigation

- **Utilisateurs normaux** → Page d'accueil + onglets publics (pas de dashboard)
- **Administrateur** → Page d'accueil + onglets + **Dashboard** (CMS)

---

## 🎨 Fonctionnalités du Dashboard

Le dashboard administrateur permet de modifier:
- 📝 Contenu de la page d'accueil
- 🏫 Programmes et formations
- 👥 Équipe et gouvernance
- 📰 Blog et actualités
- 💬 Témoignages
- 🔧 Configuration générale

---

## 🔧 Configuration

### Frontend (`.env` optionnel)

```env
VITE_API_URL=http://localhost:4000
```

### Backend (`.env` requis)

```env
# Serveur
PORT=4000
ADMIN_EMAIL=contact@green-up-academy.com
JWT_SECRET=changez_cette_valeur_en_production

# Email (Gmail)
GMAIL_CLIENT_ID=...
GMAIL_CLIENT_SECRET=...
GMAIL_REFRESH_TOKEN=...
GMAIL_USER=...
```

---

## 📧 Configuration Email

### Option 1: OAuth2 Gmail (Recommandé)

1. Allez sur [Google Cloud Console](https://console.cloud.google.com)
2. Activez Gmail API
3. Créez une application OAuth2
4. Allez sur [OAuth 2.0 Playground](https://developers.google.com/oauthplayground)
5. Obtenez les tokens
6. Mettez à jour `.env`

### Option 2: App Password Gmail

1. Allez sur [Google Account Security](https://myaccount.google.com)
2. Activez 2FA
3. Générez un App Password
4. Utilisez EMAIL_USER et EMAIL_PASS dans `.env`

---

## 🚀 Commandes utiles

### Frontend

```bash
npm run dev       # Démarrer le serveur d'dev
npm run build     # Compiler pour la production
npm run preview   # Prévisualiser la production
```

### Backend

```bash
npm run dev       # Démarrer avec nodemon
npm start         # Démarrer simplement
```

---

## 🐛 Dépannage

### ❌ "Connexion refused" sur /api/auth/login

**Solution**: Vérifiez que le serveur backend tourne:
```bash
cd server && npm run dev
```

### ❌ "Token invalid"

**Solution**: Nettoyez le localStorage:
```javascript
localStorage.removeItem('authToken');
```

### ❌ "Port 4000 già in use"

**Solution**: Changez le port dans `.env`:
```env
PORT=5000
```

Et mettez à jour `vite.config.ts`:
```typescript
target: 'http://localhost:5000'
```

---

## 🔄 Ajouter un nouvel administrateur

### Via le fichier `data/users.json`:

```json
[
  { "id": "1", "username": "admin", "password": "gua2026", "role": "admin" },
  { "id": "2", "username": "nouveau_admin", "password": "motdepasse123", "role": "admin" }
]
```

---

## ⚠️ À faire avant la production

- [ ] Changez `JWT_SECRET` dans `.env`
- [ ] Changez le mot de passe admin par défaut
- [ ] Configurez l'email (Gmail OAuth2)
- [ ] Activez HTTPS
- [ ] Configurez CORS pour votre domaine
- [ ] Mettez en place une base de données (au lieu de JSON)
- [ ] Hashez les mots de passe (bcrypt)

---

## 📞 Support

Pour toute question, contactez: **contact@green-up-academy.com**

---

## 📄 Licence

© 2026 Green Up Academy. Tous droits réservés.
