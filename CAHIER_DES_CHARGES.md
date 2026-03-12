# CAHIER DES CHARGES COMPLET
## Green Up Academy - Plateforme Numérique

**Date:** 12 Mars 2026  
**Version:** 1.0  
**Statut:** En cours de développement  

---

## TABLE DES MATIÈRES

1. [1. CONTEXTE ET OBJECTIFS](#1-contexte-et-objectifs)
2. [2. DESCRIPTION FONCTIONNELLE](#2-description-fonctionnelle)
3. [3. SPÉCIFICATIONS TECHNIQUES](#3-spécifications-techniques)
4. [4. ARCHITECTURE DE LA PLATEFORME](#4-architecture-de-la-plateforme)
5. [5. PLAN DE DÉPLOIEMENT](#5-plan-de-déploiement)
6. [6. GESTION DE CONTENU (CMS)](#6-gestion-de-contenu-cms)
7. [7. SÉCURITÉ ET CONFORMITÉ](#7-sécurité-et-conformité)
8. [8. MAINTENANCE ET SUPPORT](#8-maintenance-et-support)
9. [9. CALENDRIER DE DÉPLOIEMENT](#9-calendrier-de-déploiement)
10. [10. BUDGETS ET RESSOURCES](#10-budgets-et-ressources)

---

## 1. CONTEXTE ET OBJECTIFS

### 1.1 Présentation du Projet

**Green Up Academy** est une école d'excellence spécialisée dans les métiers de la **transition écologique**, du **Green IT** (informatique responsable) et de la **performance énergétique**.

Le projet consiste à développer une **plateforme web complète et performante** servant à:
- Présenter l'établissement et ses valeurs
- Promouvoir les formations proposées
- Gérer les candidatures et admissions
- Faciliter la collaboration étudiante via un CMS
- Assurer une expérience utilisateur optimale sur tous les appareils

### 1.2 Objectifs Stratégiques

**Visibilité numérique:** Présenter l'école comme leader dans son domaine  
**Acquisition d'étudiants:** Attirer des candidats qualifiés  
**Engagement:** Créer une communauté étudiante active  
**Accessibilité:** Solution disponible 24/7 pour tous les appareils  
**Performance:** Temps de chargement < 3 secondes  

### 1.3 Bénéfices pour Green Up Academy

- Réduction du coût d'acquisition par étudiant
- Meilleure segmentation des candidats
- Communication directe avec la communauté
- Analytics et suivi des performances
- Maintenance facilitée avec un CMS intégré

---

## 2. DESCRIPTION FONCTIONNELLE

### 2.1 Pages Principales

#### Page d'Accueil
La vitrine principale du projet avec:
- **Hero section:** Message d'accroche + CTA principal
- **Section partenaires:** Logos des partenaires académiques
- **Programmes destacados:** Aperçu des 3 formations principales
- **Témoignages:** Points de vue d'étudiants et anciens
- **Simulateur carbone:** Outil interactif educatif
- **Appel à action:** "Postuler maintenant" et "Découvrir l'école"

#### Page Programmes de Formation
- Liste complète des formations (Bac+3 et Bac+5)
- Détails de chaque programme: durée, rythme, places, débouchés
- Modules et contenus pédagogiques par semestre
- Modal responsive pour consulter chaque programme
- Bouton "Se postuler" qui redirige vers admissions

Programmes disponibles:
1. Bachelor Administration des Entreprises (Bac+3)
2. Bachelor Design (Bac+3)
3. Bachelor Développement Logiciel (Bac+3)
4. Bachelor Réseaux et Sécurité (Bac+3)
5. Master Cybersécurité & Green IT (Bac+5)

#### Page Vie Étudiante
- Description du campus
- **Clubs & Associations:**
  - BDE Green Spirit (organisation des événements)
  - Club Tech & Éthique (débats et ateliers)
  - Green Sports (activités physiques)
- Affichage complet des bureaux avec noms et postes
- Événements et activités programmés
- Organisations responsif avec popovers

#### Page École / Gouvernance
- Historique et valeurs de Green Up Academy
- Organigramme de direction
- Gouvernance et structure
- Partenariats stratégiques
- Accréditations et certifications

#### Page Recherche & Innovation
- Projets de recherche en cours
- Publications scientifiques
- Partenariats avec organismes de recherche
- Innovations étudiantes

#### Page Blog
- Actualités et articles
- Retours d'expériences étudiants
- Conseils de formation
- Contenu SEO optimisé

#### Page Contact
- Formulaire de contact
- Localisation du campus (Boussy-Saint-Antoine, Essonne)
- Horaires et moyens de communication
- Intégration carte interactive

#### Page Admissions
- Processus d'admission expliqué
- Critères de sélection
- Formulaire de candidature complet
- Upload de documents (CV, lettre de motivation, etc.)
- Calendrier de sélection

### 2.2 Fonctionnalités Clés

#### Thème de Couleurs
- **Thème par défaut:** LIGHT (clair)
- **Thème sombre:** Optionnel pour accessibilité
- Palette principale:
  - Vert primaire: #059669 (Green Up)
  - Gris: #696969 (Professionnel)
  - Bleu secondaire: #0EA5E9
  - Orange accent: #F59E0B

#### Navigation Responsive
- Header sticky avec logo et menu
- Menu mobile adapté aux petits écrans
- Breadcrumbs sur les pages imbriquées
- Boutons CTA visibles partout

#### Médias et Images
- Gallerie photo du campus
- Portfolio des projects étudiants
- Images haute qualité optimisées pour le web
- Support des formats modernes (WebP)

#### Animations et UX
- Transitions fluides au défilement
- Hover effects sur les éléments interactifs
- Marquee animé pour les partenaires (50s de vitesse)
- Particules animées en arrière-plan
- Loading states clairs

#### Authentification & Dashboard Admin
- Login sécurisé pour administrateurs
- Dashboard CMS pour gérer le contenu
- Gestion des utilisateurs
- Logs d'activité

#### Collecte de Données
- Formulaire de candituature complet
- Upload de fichiers (CV, diplômes)
- Validation des données
- Sauvegarde sécurisée en base de données
- Export pour l'équipe admissions

---

## 3. SPÉCIFICATIONS TECHNIQUES

### 3.1 Stack Technologique

#### Frontend
```
Framework: React 18.3.1
Langage: TypeScript 5.5
Build Tool: Vite 5.2
Styling: Tailwind CSS 3.4
UI Components: lucide-react
Bundler: Vite (optimisé pour production)
```

#### Backend
```
Runtime: Node.js (LTS)
Framework: Express.js 4.18
Database: JSON (file-based pour MVP)
ORM: Intégration future (MongoDB/PostgreSQL)
Authentication: JWT (JSON Web Tokens)
Upload: Multer 1.4
Email: Nodemailer 6.9
```

#### Outils & Dépendances
```
Package Manager: npm 9.2
Version Control: Git
CI/CD: GitHub Actions (futur)
Linting: ESLint 8.50
Testing: Jest (futur)
```

### 3.2 Environnements

#### Environnement de Développement (Dev)
- **Local:** npm run dev
- **Port Frontend:** http://localhost:5173
- **Port Backend:** http://localhost:5000
- **Base de données:** Fichiers locaux (server/data/)

#### Environnement de Test (Staging)
- Déploiement sur Render.com
- URL: À définir lors du déploiement
- Base de données: MongoDB Atlas (optionnel)

#### Environnement de Production
- Deux options:
  1. **Render.com** (phase actuelle)
  2. **Hostinger** (phase future)

### 3.3 Configuration des Builds

#### Build Frontend
```bash
npm run build
# Génère: dist/
# Optimisations: Code splitting, minification, tree-shaking
```

#### Build Backend
```bash
npm install --production
# Dépendances optimisées pour production
```

### 3.4 Performance

- **Metrics cibles:**
  - First Contentful Paint (FCP): < 1.5s
  - Largest Contentful Paint (LCP): < 2.5s
  - Cumulative Layout Shift (CLS): < 0.1
  - Time to Interactive (TTI): < 3s

- **Optimisations:**
  - Code splitting par route
  - Image lazy-loading
  - CSS compression
  - Gzip compression
  - CDN pour les assets statiques

---

## 4. ARCHITECTURE DE LA PLATEFORME

### 4.1 Diagramme Global

```
┌─────────────────────────────────────────────────────────┐
│                    UTILISATEURS                          │
└─────────────────────────────────────────────────────────┘
                             │
                ┌────────────┼────────────┐
                ▼            ▼            ▼
          [Web]    [Mobile]    [AI Bot]
                │            │            │
                └────────────┼────────────┘
                             │
                   ┌─────────▼─────────┐
                   │   Vite frontend   │
                   │  (React + TS)     │
                   └─────────┬─────────┘
                             │
                ┌────────────▼────────────┐
                │    Express.js API       │
                │   (Node.js Backend)     │
                └────────────┬────────────┘
                             │
            ┌────────────────┼────────────────┐
            ▼                ▼                ▼
        [Database]      [File Storage]   [Email Service]
        (JSON/MongoDB)   (Multer)        (Nodemailer)
```

### 4.2 Structure des Dossiers

```
site_green_up/
├── site/                          # Frontend Vite
│   ├── src/
│   │   ├── components/           # Composants React
│   │   ├── pages/                # Pages (Home, Programs, etc.)
│   │   ├── hooks/                # Custom hooks (useAuth, useDarkMode)
│   │   ├── contexts/             # Context API (AuthContext)
│   │   ├── lib/                  # Utilitaires (API, ContentManager)
│   │   └── App.tsx               # Point d'entrée
│   ├── vite.config.ts            # Configuration Vite
│   ├── tailwind.config.js        # Config Tailwind
│   ├── package.json              # Dépendances frontend
│   └── dist/                     # Build production (généré)
│
└── server/                        # Backend Node.js
    ├── index.js                  # Point d'entrée
    ├── server.js                 # Configuration Express
    ├── data/                     # Données (JSON)
    │   ├── users.json
    │   ├── applications.json
    │   ├── content.json
    │   ├── messages.json
    │   ├── news.json
    │   └── analytics.json
    ├── uploads/                  # Fichiers uploadés
    ├── package.json              # Dépendances backend
    └── node_modules/
```

### 4.3 Flux de Données

```
USER REQUEST → Frontend (React)
                      ↓
              API Call (fetch/axios)
                      ↓
              Express.js Route Handler
                      ↓
         Validation & Processing
                      ↓
            Database/File Read
                      ↓
              JSON Response
                      ↓
           Frontend State Update
                      ↓
              RE-RENDER UI
                      ↓
            DISPLAY TO USER
```

---

## 5. PLAN DE DÉPLOIEMENT

### 5.1 Phase 1: Déploiement sur Render.com (ACTUEL)

#### Avantages de Render.com
- Intégration directe avec GitHub
- Déploiement automatique à chaque push
- SSL/HTTPS gratuit
- Base gratuite (tier Free)
- Support du Node.js et du statique
- Interface simple et intuitive

#### 📋 Procédure Détaillée

##### A. Préparation du Projet

1. **Vérifier la structure du projet:**
```bash
Dossier 'site/' avec package.json
Dossier 'server/' avec package.json
Fichier .gitignore à jour
package-lock.json en versionage
```

2. **Configuration du build frontend (site/):**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```
Le build produit un dossier `dist/` statique.

3. **Configuration du serveur (server/):**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

##### B. Création des Services Render

**Service 1: Frontend (React)**

1. Aller sur [render.com](https://render.com)
2. Créer un nouveau **Static Site**
3. Configurer:
   - **Name:** green-up-academy-frontend
   - **GitHub Repo:** dosy237/site_green_up_academy
   - **Branch:** main
   - **Build Command:** `cd site && npm install && npm run build`
   - **Publish Directory:** `site/dist`
4. Déployer

**Service 2: Backend (Express API)**

1. Créer un nouveau **Web Service**
2. Configurer:
   - **Name:** green-up-academy-api
   - **GitHub Repo:** dosy237/site_green_up_academy
   - **Branch:** main
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm start`
   - **Environment:** Node
3. Ajouter les variables d'environnement (si nécessaire):
   ```
   NODE_ENV=production
   PORT=5000
   ```
4. Déployer

##### C. Configuration CORS (Important!)

Dans `server/server.js`, configurer CORS pour le frontend:

```javascript
const cors = require('cors');

const allowedOrigins = [
  'https://green-up-academy-frontend.onrender.com',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

##### D. Configuration API (Frontend)

Dans `src/lib/api.ts`, mettre à jour l'URL:

```typescript
// Développement
const DEV_API = 'http://localhost:5000';

// Production (Render)
const PROD_API = 'https://green-up-academy-api.onrender.com';

export const apiUrl = (path: string) => {
  const baseUrl = import.meta.env.MODE === 'production' ? PROD_API : DEV_API;
  return `${baseUrl}${path}`;
};
```

##### E. DNS et Domaine Personnalisé (Optionnel, phase 2)

1. À venir sur **Hostinger** ou autre registrar
2. Rediriger vers Render avec:
   - CNAME: render.com
   - Ou utiliser Render's DNS

#### Déploiement Automatique

Chaque push sur `main` triggère:
1. ✅ Build du frontend (Vite)
2. ✅ Build du backend (npm install)
3. ✅ Déploiement des deux services
4. 📧 Notification de succès/erreur

---

### 5.2 Phase 2: Migration vers Hostinger (FUTUR)

#### Quand passer à Hostinger?

Quand l'école aura:
- Un domaine personnalisé (.fr ou autre)
- Besoins en bande passante stables
- Budget pour l'hébergement payant
- Préférence pour plus de contrôle serveur

#### 📋 Procédure Migration Hostinger

##### A. Préparation Hostinger

1. **Créer un compte Hostinger** (hpanel.hostinger.com)
2. **Choisir l'offre:**
   - Recommandé: **Hosting Cloud** ou **VPS**
   - Support Node.js + Nginx/Apache
3. **Acheter domaine** (greenupacademy.fr ou similaire)

##### B. Build et Préparation pour Production

```bash
# Frontend
cd site
npm run build
# Génère: site/dist/ (prêt pour production)

# Backend
cd server
npm install --production
# Optimise les dépendances
```

##### C. Déploiement sur Hostinger

Deux approches:

**Option 1: Via FTP/SFTP** (Plus simple)
```bash
# 1. Compresser les fichiers:
zip -r dist.zip site/dist/
zip -r server.zip server/

# 2. Uploader via FTP sur Hostinger
# 3. Extraire dans public_html/
# 4. Configurer Node.js dans cPanel
```

**Option 2: Via Git Direct** (Recommandé)
```bash
# 1. Sur serveur Hostinger:
git clone https://github.com/dosy237/site_green_up_academy.git
cd site_green_up
npm run build

# 2. Configurer reverse proxy Nginx
sudo nano /etc/nginx/sites-available/default
```

Configuration Nginx exemple:
```nginx
server {
    listen 80;
    server_name greenupacademy.fr www.greenupacademy.fr;
    root /home/user/public_html/site/dist;
    
    # Frontend
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API Backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

##### D. SSL/HTTPS sur Hostinger

1. **Let's Encrypt gratuit** (recommandé):
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d greenupacademy.fr -d www.greenupacademy.fr
   ```

2. **Ou via cPanel:** AutoSSL (genéralement automatique)

##### E. Base de Données Professionnelle

Migrer de JSON vers:

**Option A: MongoDB Atlas** (Cloud)
```bash
npm install mongodb
# Ajouter string de connexion en variable d'env
```

**Option B: PostgreSQL Local**
```bash
sudo apt install postgresql
# Créer DB et tables
# Utiliser pg ou Sequelize ORM
```

---

## 6. GESTION DE CONTENU (CMS)

### 6.1 Architecture CMS

Le CMS actuel est **intégré au backend** avec:
- Dashboard d'administration (CMSDashboard.tsx)
- Authentification JWT
- Gestion des pages par section

### 6.2 Sections Gérables

| Section | Éditable | Localisation |
|---------|----------|--------------|
| Hero | ✅ Oui | Homepage |
| Programs | ✅ Oui | ProgramsPage |
| Blog | ✅ Oui | BlogPage |
| Programmes | ✅ Oui | StudentLife |
| Messages | ✅ Oui | Messages de contact |
| Gouvernance | ✅ Oui | GovernancePage |

### 6.3 Accès au CMS

**Login Admin:**
- URL: `/dashboard`
- Redirection automatique si non-authentifié
- Credentials sécurisés en environnement

**Fonctionnalités:**
- Édition de texte/contenu
- Upload d'images
- Statistiques d'accès
- Gestion des candidatures
- Gestion des utilisateurs

### 6.4 Données Managées

```
server/data/
├── content.json      # Contenu des pages
├── users.json        # Utilisateurs admin
├── applications.json # Candidatures
├── messages.json     # Messages de contact
├── news.json         # Articles blog
├── analytics.json    # Stats de visite
```

**Exemple structure content.json:**
```json
{
  "pages": {
    "home": {
      "hero": {
        "title": "Devenez acteur de la transition",
        "subtitle": "Formez-vous aux métiers de demain...",
        "cta_text": "Postuler maintenant"
      },
      "programs": [...]
    }
  }
}
```

---

## 7. SÉCURITÉ ET CONFORMITÉ

### 7.1 Sécurité des Données

#### Authentification
- JWT (JSON Web Tokens) pour sessions
- Mot de passe hashé (bcrypt recommandé)
- Expiration de sessions: 24h

#### Validation des Entrées
- Validation frontend (Zod/Yup futur)
- Validation backend stricte
- Sanitization des données
- Protection CSRF

#### Logging & Monitoring
- Logs des erreurs en production
- Tracking des uploads
- Audit trail pour actions admin
- Alert sur anomalies

### 7.2 Protection des Fichiers

#### Upload Sécurisé
```javascript
// Multer config (server/server.js)
const multer = require('multer');
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    // Timestamp + original nom
    cb(null, Date.now() + '_' + file.originalname);
  }
});

// Restrictions
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    // Seulement PDF, DOC, XLS, JPG, PNG
    const allowed = /pdf|doc|docx|xls|xlsx|jpg|jpeg|png/;
    if (allowed.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non autorisé'));
    }
  }
});
```

#### Gestion des Uploads
- Fichiers stockés hors web root (sécurité)
- Accès via API authentifiée uniquement
- Suppression automatique après 30 jours (optionnel)

### 7.3 Conformité Légale

#### RGPD (Règlement Européen)
- Politique de confidentialité visible
- Droit d'accès aux données personnelles
- Droit à l'oubli (suppression)
- Consentement explicite pour emails
- Clause de traitement des données

#### Mentions Légales
- Responsable de publication
- Hébergeur et responsable technique
- Conditions d'utilisation
- Politique de cookies

### 7.4 Certificats SSL/TLS

- **Render:** Automatique (HTTPS gratuit)
- **Hostinger:** Let's Encrypt gratuit ou payant
- **Certificat wildcard:** Pour déploiements multiples

---

## 8. MAINTENANCE ET SUPPORT

### 8.1 Plan de Maintenance

#### Maintenance Régulière

**Quotidienne:**
- Monitoring des erreurs
- Vérification uptime (99.9% cible)
- Alerte sur dysfonctionnements

**Hebdomadaire:**
- Audit de sécurité
- Statistiques d'utilisation
- Backup des données

**Mensuelle:**
- Mise à jour des dépendances
- 🧹 Nettoyage des fichiers
- Audit de sécurité complète
- Rapport de performance

**Annuelle:**
- Audit du code complet
- 🔄 Refactorisation si nécessaire
- Planification des évolutions

#### Core Team

| Rôle | Responsabilité | Contact |
|------|---|---|
| **Lead Dev** | Architecture & déploiement | TBD |
| **Backend Dev** | API, sécurité, BDD | TBD |
| **Frontend Dev** | UI/UX, performances | TBD |
| **DevOps** | Infrastructure, monitoring | TBD |
| **Content Manager** | CMS, articles | TBD |

### 8.2 Escalade des Problèmes

```
🟢 VERT - Tout OK
  ↓
🟡 ORANGE - Dégradation de service
  → Alert notifiée en 30 min
  → Équipe de support contactée
  ↓
🔴 ROUGE - Service indisponible
  → Alert immédiate
  → Équipe d'urgence activée
  → Objectif: restoration < 1h
```

### 8.3 Backup & Disaster Recovery

#### Stratégie Backup

**Données:**
- Daily backup des fichiers JSON
- Sauvegarde hebdo sur stockage externe (Google Drive/AWS)
- Rétention: 90 jours minimum

**Database (future MongoDB):**
- MongoDB Atlas: Auto-backup journalier
- Retention: 35 jours
- Point-in-time recovery disponible

**Code:**
- GitHub: Versioning complet
- Branches de backup automatiques
- CD pipeline pour restauration rapide

#### 🔄 Procédure Restauration

1. **Détecter l'incident** (monitoring)
2. **Identifier le point de restauration** (timestamp)
3. **Restaurer la data** (< 5 minutes)
4. **Vérifier l'intégrité** (tests)
5. **Notifier les utilisateurs** (si impacte)
6. **Pré-mortem analysis** (causes)
7. **Implémenter corrections** (lessons learned)

---

## 9. CALENDRIER DE DÉPLOIEMENT

### 📅 Timeline de Déploiement

#### Phase 1: Préparation (Désormais - Mars 2026)

| Tâche | Deadline | Statut |
|-------|----------|--------|
| Tests finaux en local | 15 Mars 2026 | ⏳ En cours |
| Création comptes Render | 16 Mars 2026 | ⏳ Pending |
| Configuration environnements | 17 Mars 2026 | ⏳ Pending |
| Tests Render staging | 18 Mars 2026 | ⏳ Pending |

#### Phase 2: Go-Live Production (Mars 2026)

| Tâche | Date | Responsable |
|-------|------|-------------|
| Push vers main | 19 Mars 2026 | Dev Team |
| Déploiement frontend Render | 19 Mars 2026 | DevOps |
| Déploiement backend Render | 19 Mars 2026 | DevOps |
| Tests de production | 19-20 Mars 2026 | QA |
| **LANCEMENT OFFICIEL** | **20 Mars 2026** |
| Support live | 20 Mars onwards | Support Team |

#### Phase 3: Post-Launch (Mars-Avril 2026)

- Monitoring intensive (48h)
- 🐛 Hotfix sur bugs trouvés
- Analytics & optimisations
- 📝 Documentation finale

#### Phase 4: Migration Hostinger (Q2 2026)

| Étape | Timeline |
|-------|----------|
| Planification détaillée | Avril 2026 |
| Préparation Hostinger | Mai 2026 |
| Migration en dry-run | Juin 2026 |
| Migration production | Juin 2026 |
| Monitoring post-migration | Juin-Juillet 2026 |

---

## 10. BUDGETS ET RESSOURCES

### 10.1 Coûts Mensuels (Render)

| Service | Coût | Justification |
|---------|------|---|
| Frontend (Static) | Gratuit | Tier Free Render |
| Backend (Web Service) | $7-12/mois | Dyno Render (Starter) |
| Domaine (futur) | ~€10/an | Registrar tiers |
| **TOTAL** | **~€1-2/mois** | Très économique |

### 10.2 Coûts Hostinger (Estimation, Phase 2)

| Service | Coût Annuel | Notes |
|---------|-----------|-------|
| Hosting Cloud | €3-6/mois | Recommandé |
| Domaine .fr | €10-15/an | Enregistrement |
| SSL (Premium) | Gratuit | Let's Encrypt |
| Email business | ~€20/an | Optionnel |
| **TOTAL ANNUEL** | **€50-100** | Très abordable |

### 10.3 Ressources Requises

#### 👥 Équipe

```
Minimum Viable:
├── 1 Full-Stack Dev (30% temps)
├── 1 DevOps/SysAdmin (20% temps)
└── 1 Content Manager (2-3h/semaine)

Étendue (idéale):
├── 1 Lead Dev (50%)
├── 2 Devs (100% total)
├── 1 DevOps (40%)
├── 1 Designer UX/UI (20%)
├── 1 Content Manager (100%)
└── 1 QA/Tester (30%)
```

#### Matériel

- 2-3 ordinateurs portables (Dev)
- 1 serveur local de test (optionnel)
- Licences logiciels (VS Code gratuit ✅)

#### Formation Requise

- Node.js & Express basics
- React fundamentals
- Tailwind CSS
- Git workflow
- Deployment concepts

---

## 11. POINTS DE CONTACT & ESCALADE

### 📞 Support Tiers

| Issue | Contact | Délai |
|-------|---------|-------|
| Site indisponible | DevOps on-call | 15 min |
| Bugs frontend | Frontend Lead | 4h |
| Bugs backend | Backend Lead | 4h |
| CMS non accessible | Tech Lead | 2h |
| Contenu à modifier | Content Manager | 24h |
| Questions client | Project Manager | 48h |

### 🔗 Ressources Externes

- **Render Docs:** https://render.com/docs
- **Vite Docs:** https://vitejs.dev
- **Express Docs:** https://expressjs.com
- **Tailwind Docs:** https://tailwindcss.com
- **GitHub Repo:** https://github.com/dosy237/site_green_up_academy

---

## 12. APPROBATIONS ET SIGNATURES

**Approuvé par:**

| Rôle | Nom | Date | Signature |
|------|------|------|-----------|
| Director | TBD | | |
| Tech Lead | TBD | | |
| Product Manager | TBD | | |

---

## 📝 NOTES FINALES

Ce cahier des charges est un **document vivant**. Il doit être:
- ✅ Actualisé avec les évolutions
- ✅ Revisité mensuellement
- ✅ Partagé avec toute l'équipe
- ✅ Accessible à tous les stakeholders

**Version 1.0** - 12 Mars 2026  
**Prochaine révision:** 12 Avril 2026

---

**Questions? Suggestions?** Contactez l'équipe technique.

