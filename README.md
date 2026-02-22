# 🌱 Green Up Academy - Site Officiel

> Plateforme complète avec système d'authentification et dashboard CMS pour l'école Green Up Academy

## ✨ Fonctionnalités principales

- 🔐 **Système d'authentification sécurisé** avec JWT
- 📊 **Dashboard administrateur (CMS)** pour modifier le contenu du site
- 🛡️ **Contrôle d'accès** - Seuls les administrateurs accèdent au dashboard
- 📱 **Design responsive** - Mobile, tablet, desktop
- 🌙 **Mode sombre/clair** - Thème personnalisable
- ⚡ **Technologie moderne** - React 18, TypeScript, Tailwind CSS, Vite
- 🚀 **Backend complet** - Node.js + Express + MongoDB/JSON

## 🚀 Démarrage rapide

### 1️⃣ Installation du Frontend

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Accédez à: **http://localhost:5173**

### 2️⃣ Installation du Backend

```bash
# Naviguer au dossier serveur
cd server

# Installer les dépendances
npm install

# Démarrer le serveur backend
npm run dev
```

Le serveur backend tourne sur: **http://localhost:4000**

## 🔑 Identifiants par défaut

| Identifiant | Mot de passe | Rôle |
|-------------|--------------|------|
| `admin`     | `gua2026`    | Administrateur |

⚠️ **Changez le mot de passe immédiatement en production!**

## 📖 Documentation détaillée

Pour une documentation complète sur:
- L'authentification et les routes API
- Le système de rôles
- La configuration de l'email
- Le déploiement en production

👉 Consultez [SETUP.md](./SETUP.md)

## 🏗️ Architecture

### Stack Frontend
- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utility-first
- **Vite** - Build tool ultrarapide
- **Lucide React** - Icônes

### Stack Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **JWT** - Authentification
- **Nodemailer** - Emails (optional)
- **Multer** - Upload de fichiers

## 📁 Structure du projet

```
.
├── src/
│   ├── contexts/AuthContext.tsx      # Gestion globale de l'authentification
│   ├── pages/
│   │   ├── LoginPage.tsx             # Page de connexion
│   │   ├── AdminDashboard.tsx        # Dashboard administrateur
│   │   ├── HomePage.tsx              # Page d'accueil
│   │   └── ...
│   ├── components/                   # Composants réutilisables
│   ├── hooks/                        # Hooks personnalisés
│   ├── App.tsx                       # Routeur principal
│   └── index.tsx                     # Point d'entrée
│
├── server/
│   ├── index.js                      # Serveur Express + API
│   ├── .env                          # Variables d'environnement
│   ├── data/                         # Données (JSON)
│   └── uploads/                      # Fichiers uploadés
│
├── public/                           # Fichiers statiques
├── vite.config.ts                    # Configuration Vite
├── tailwind.config.js                # Configuration Tailwind
└── SETUP.md                          # Guide détaillé
```

## 🔐 Système d'authentification

### Flux de connexion

```
1. Utilisateur accède au site
   ↓
2. S'il n'est pas authentifié → Page de login
   ↓
3. Soumet ses identifiants
   ↓
4. Backend vérifie + génère JWT token
   ↓
5. Token stocké en localStorage (8h)
   ↓
6. Accès à la page d'accueil et ses onglets
   ↓
7. Admins → Accès au Dashboard CMS
```

### Routes API

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/auth/login` | Connexion utilisateur |
| `GET` | `/api/auth/me` | Vérifier le token |
| `POST` | `/api/auth/change-password` | Changer le mot de passe (admin) |

## 🎯 Utilisation du Dashboard

### Pages accessibles via le dashboard

- **Contenu d'accueil** - Hero, section Pourquoi nous, etc.
- **Programmes** - Ajouter/modifier/supprimer les formations
- **Équipe** - Gestion des membres (direction, conseil, scientifique)
- **Blog** - Publier et gérer les articles
- **Témoignages** - Ajouter des retours d'étudiants
- **Candidatures** - Voir les demandes d'admission
- **Paramètres** - Configuration générale du site

## 🛠️ Configuration

### Frontend
- Aucune configuration requise pour le développement local
- Le proxy Vite redirige automatiquement `/api` vers `http://localhost:4000`

### Backend
1. Copiez `.env.example` en `.env`
2. Remplissez les variables d'environnement
3. (Optionnel) Configurez l'email Gmail

Voir [SETUP.md](./SETUP.md) pour plus de détails.

## 📦 Scripts disponibles

### Frontend

```bash
npm run dev      # Démarrer le développement
npm run build    # Compiler pour la production
npm run preview  # Prévisualiser la production
npm run lint     # Vérifier les erreurs (si ESLint est configuré)
```

### Backend

```bash
npm run dev      # Démarrer avec nodemon (auto-reload)
npm start        # Démarrer simplement
```

## 🌐 Déploiement

### Frontend (Vercel, Netlify, etc.)

```bash
npm run build
# Déployez le dossier dist/
```

### Backend

Hébergez sur:
- Heroku
- Railway
- Render
- AWS / Google Cloud / Azure
- Votre propre serveur VPS

## ❓ FAQ

**Q: Puis-je utiliser une base de données?**
Oui, remplacez les fichiers JSON par MongoDB/PostgreSQL dans `server/index.js`

**Q: Comment ajouter un nouvel administrateur?**
Modifiez le fichier `server/data/users.json` ou ajoutez une route d'administration

**Q: Comment sécuriser les mots de passe?**
Utilisez bcrypt pour hasher les mots de passe:
```bash
npm install bcrypt
```

**Q: Est-ce que j'ai besoin de configurer l'email?**
Non, c'est optionnel pour le développement. Les emails s'affichent dans la console.

## 🚨 Avant la production

- [ ] Changez `JWT_SECRET` dans `.env`
- [ ] Changez le mot de passe admin par défaut
- [ ] Configurez HTTPS
- [ ] Mettez à jour CORS pour votre domaine
- [ ] Hashez les mots de passe avec bcrypt
- [ ] Utilisez une base de données (pas JSON)
- [ ] Configurez l'email (Gmail OAuth2)
- [ ] Activez les variables d'environnement sécurisées

## 📞 Support

**Email**: contact@green-up-academy.com  
**Téléphone**: (+33) 7 51 36 09 44  
**Localisation**: 15 rue des halles, 75001 Paris

## 📄 Licence

© 2026 Green Up Academy. Tous droits réservés.

---

**Prêt à commencer?** 👉 `npm install && npm run dev`
