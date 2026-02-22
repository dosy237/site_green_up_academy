# 🎯 Prochaines Étapes - Actions Prioritaires

## 1. Vérification Rapide (5-10 minutes)

### ✅ Tester que ça marche
```bash
# Terminal 1 - Frontend
cd site && npm run dev
# Devrait afficher: Local:   http://localhost:5173

# Terminal 2 - Backend (optionnel)
cd site/server && npm start  
# Devrait afficher: Server running on port 4000
```

### ✅ Accéder au CMS
1. Ouvrir http://localhost:5173
2. Voir la page de login
3. **Entrer**: admin / gua2026
4. Cliquer sur **"Dashboard CMS"** dans le header
5. Vérifier que le dashboard s'affiche

### ✅ Test Basic
1. Aller à **"Actualités"** dans le sidebar
2. Cliquer **"Nouvel article"**
3. Remplir quelques champs
4. Cliquer **"Enregistrer"**
5. Vérifier que l'article apparaît dans la liste

**Si tout fonctionne**: ✅ CMS est prêt!

---

## 2. Configuration Email (CRITIQUE)

### 📧 Pourquoi c'est important
- Admission applications ne reçoivent pas d'email de confirmation
- Contact form ne reçoit pas de notification
- Dashboard replies ne peuvent pas envoyer email

### 🔧 Comment configurer

#### Option A: Gmail App Password (Plus simple ⭐)

1. Aller sur https://myaccount.google.com/apppasswords
2. Sélectionner "Mail" et "Windows"
3. Générer le mot de passe
4. Créer `.env` dans le dossier `server/`:
```env
GMAIL_USER=dosyca35@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```
5. Relancer le backend: `npm start`

#### Option B: Gmail OAuth2 (Plus complexe)

1. Créer project Google Cloud
2. Créer OAuth2 credentials
3. Mettre dans `.env`:
```env
GMAIL_CLIENT_ID=...
GMAIL_CLIENT_SECRET=...
GMAIL_REFRESH_TOKEN=...
```

### ✅ Tester après config
```bash
# Depuis la racine du projet
curl -X POST http://localhost:4000/api/send-test \
  -H "Content-Type: application/json" \
  -d '{
    "to": "dosyca35@gmail.com",
    "subject": "Test Email",
    "text": "Si vous recevez ça, ça marche!"
  }'
```

Si vous recevez l'email: ✅ Email fonctionne!

---

## 3. Intégration Pages Existantes (IMPORTANT)

### Pourquoi c'est nécessaire
Les pages actuelles affichent du contenu hardcoded. Pour que le CMS fonctionne, elles doivent utiliser `useContent()`.

### Pages à Intégrer (par ordre de priorité)

#### 1️⃣ HomePage (LA PLUS IMPORTANTE)
- Utilise Hero, Programs, Features, Testimonials
- **Fichier**: `src/pages/HomePage.tsx`
- **Changement**:
```tsx
// AVANT:
export function HomePage() {
  const hero = { title: "...", subtitle: "..." };  // Hardcoded
  
// APRÈS:
import { useContent } from '../hooks/useContent';

export function HomePage() {
  const { content } = useContent();
  // content.hero, content.programs, content.features...
```

#### 2️⃣ ProgramsPage
- Utilise programs/formations
- **Fichier**: `src/pages/ProgramsPage.tsx`
- **Changement**: Utiliser `content.programs` de useContent()

#### 3️⃣ BlogPage  
- Utilise articles
- **Fichier**: `src/pages/BlogPage.tsx`
- **Changement**: Utiliser `content.blog` de useContent()

#### 4️⃣ ContactPage
- Intégrer ContentManager pour stocker messages
- **Fichier**: `src/pages/ContactPage.tsx`
- **Changement**: 
  - `const { addMessage } = useContent();`
  - Appeler `addMessage()` au lieu de form submit direct

#### 5️⃣ AdmissionsPage
- Intégrer pour candidatures
- **Fichier**: `src/pages/AdmissionsPage.tsx`
- **Changement**: Similar à ContactPage

### Pattern à utiliser partout
```tsx
import { useContent } from '../hooks/useContent';
import { useContent } from '../contexts/AuthContext'; // Si besoin

export function SomePage() {
  const { content, updateHero, addBlogPost } = useContent();
  
  return (
    <>
      <Hero hero={content.hero} />
      <Programs programs={content.programs} />
    </>
  );
}
```

---

## 4. Sections du Dashboard À Compléter

### 🟡 CMSTeam (Équipe & Gouvernance)
- **Statut**: Stub placeholder uniquement
- **À faire**: 
  - Form pour ajouter/modifier membres
  - Champs: nom, role, bio, photo, contact
  - Catégories: direction, conseil, scientifique

### 🟡 CMSMedia (Galerie d'images)
- **Statut**: Stub placeholder uniquement
- **À faire**:
  - Uploader d'images
  - Stockage base64 en localStorage
  - Compression d'images (pour ne pas surcharger localStorage)
  - Sélection pour formations/articles

### 🟡 CMSSettings (Configuration)
- **Statut**: Stub placeholder uniquement
- **À faire**:
  - Contact info (email, téléphone)
  - Réseaux sociaux
  - Infos légales/mentions
  - Footer config

---

## 5. Checkliste Opérationnelle

### Pour que le CMS soit 100% fonctionnel:

```
Semaine 1:
□ Tester le CMS de base (5 min)
□ Configurer Gmail (15 min)
□ Intégrer HomePage (30 min) [PRIORITÉ]
□ Intégrer BlogPage (30 min) [PRIORITÉ]
□ Tester articles et formations (10 min)

Semaine 2:
□ Intégrer ContactPage (20 min) [PRIORITÉ]
□ Intégrer AdmissionsPage (20 min) [PRIORITÉ]
□ Tester emails complet (15 min)
□ Intégrer ProgramsPage (15 min)
□ Créer CMSTeam section (1 heure)

Semaine 3:
□ Créer CMSMedia section (1 heure)
□ Créer CMSSettings (30 min)
□ Tests complets du system (1 heure)
□ Correction bugs (2 heures)
□ Documentation utilisateur (1 heure)
```

---

## 6. Commandes Utiles

### Démarrer le système
```bash
# Terminal 1
cd site && npm run dev

# Terminal 2  
cd site/server && npm start
```

### Consultation logs
```bash
# Frontend - F12 dans navigateur > Console
# Backend - Check terminal output

# Check localStorage dans console:
JSON.parse(localStorage.getItem('greenup_cms_content'))
```

### Réinitialiser le CMS
```javascript
// Dans console navigateur (F12):
localStorage.removeItem('greenup_cms_content');
location.reload();
```

---

## 7. Ressources & Fichiers

### Documentation Disponible
- [QUICKSTART.md](QUICKSTART.md) - Guide utilisateur rapide
- [CMS_IMPLEMENTATION.md](CMS_IMPLEMENTATION.md) - Architecture technique
- [STATUS.md](STATUS.md) - Statut détaillé du projet
- [COMPLETION_SUMMARY.md](COMPLETION_SUMMARY.md) - Ce qui a été fait

### Code Principal
- [ContentManager.ts](src/lib/ContentManager.ts) - Cœur du CMS
- [useContent.ts](src/hooks/useContent.ts) - Hook React
- [CMSDashboard.tsx](src/pages/CMSDashboard.tsx) - UI principale
- [CMSBlog.tsx](src/pages/dashboard/sections/CMSBlog.tsx) - Section blog
- [CMSPrograms.tsx](src/pages/dashboard/sections/CMSPrograms.tsx) - Section formations

---

## 8. Problèmes Potentiels & Solutions

### ❌ "Cannot find module ContentManager"
**Solution**: Vérifiez l'import path:
```tsx
import { useContent } from '../hooks/useContent';  // ✅ Correct
import { useContent } from './hooks/useContent';   // ❌ Mauvais
```

### ❌ "Dashboard n'affiche rien"
**Solution**:
1. Vérifier vous êtes connecté (check localStorage authToken)
2. Vérifier user.role === 'admin'
3. Check console F12 pour erreurs
4. Reload page (Ctrl+R)

### ❌ "localStorage limit exceeded"
**Solution**: Supprimer les images volumineuses
```jsx
// Votre localStorage ne supporte ~5-10MB
// Les images base64 sont très volumineuses
// Utilisez des URLs externes au lieu de stocker en local
```

### ❌ "Messages n'apparais pas"
**Solution**:
1. Vérifier `content.messages` dans console
2. Vérifier que `addMessage()` a été appelé
3. Vérifier ContentManager.ts n'a pas d'erreurs

---

## 9. Contact & Support

Si vous rencontrez des problèmes:

1. **Check les logs** - F12 dans navigateur (frontend) et terminal (backend)
2. **Vérifiez localStorage** - `localStorage.getItem('greenup_cms_content')`
3. **Vérifiez authToken** - `localStorage.getItem('authToken')`
4. **Testez un rechargement complet** - Ctrl+R (frontend) 

---

## 10. Prochaine Phase de Développement

Une fois les 5 premières étapes complètes, le CMS sera **100% fonctionnel** et prêt pour production.

Pour amélioration future:
- Analytics
- Image compression
- Versioning/historique
- Scheduling publications
- Multi-language
- Backup automatique

---

## 📌 TL;DR (Les 3 trucs les plus importants)

### 1️⃣ Vérifiez que ça marche
```bash
npm run dev  # dans le dossier site
# Accédez à http://localhost:5173
# Login: admin/gua2026
```

### 2️⃣ Configurez Gmail email
- Créer App Password sur Google
- Mettre dans `server/.env`
- Tester avec curl

### 3️⃣ Intégrez les pages
- HomePage DOIT utiliser `useContent()`
- ProgramsPage DOIT utiliser `useContent()`  
- BlogPage DOIT utiliser `useContent()`
- ContactPage DOIT appeler `addMessage()`
- AdmissionsPage DOIT appeler `addMessage()`

**Without these, the CMS won't work for users!**

---

**✅ Le CMS est prêt. À vous de jouer! 🚀**

