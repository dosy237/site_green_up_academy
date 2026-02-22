# CMS GreenUp Academy - Plan d'implémentation complet

## 🎯 Objectif
Créer un système CMS React complet pour gérer tous les éléments du site (formations, blog, équipe, messagerie, images, etc.) via localStorage, sans backend.

## ✅ Fait

### 1. **ContentManager** (`src/lib/ContentManager.ts`)
- Gestion centralisée de TOUS les données de contenu via localStorage
- Getters/Setters pour chaque section du site
- Support des opérations CRUD complètes
- Persistance automatique

### 2. **Hook useContent()** (`src/hooks/useContent.ts`)
- Accès facile au contenu depuis n'importe quel composant React
- Mise à jour automatique de l'UI
- Callbacks pour toutes les opérations CRUD

### 3. **Dashboard Administrateur** (`src/pages/CMSDashboard.tsx`)
- Interface moderne et professionnelle
- Navigation par tabs
- Gestion des notifications
- Authentification intégrée

### 4. **Sections du Dashboard**
- `DashboardOverview.tsx` - Vue d'ensemble avec statistiques
- `CMSHero.tsx` - Édition de la section Hero
- `CMSMessages.tsx` - Messagerie complète (contact + candidatures + réponses)
- Stubs pour: Formations, Équipe, Blog, Media, Settings

### 5. **Système de Messagerie**
- Unification des messages de contact et candidatures
- Système de réponses email intégré
- Filtrage (tous/non lus/contact/candidatures)
- Marquer comme lu

## 📋 À faire - **ÉTAPES SUIVANTES**

### Phase 1: Intégration & Authentification
1. [ ] Mettre à jour App.tsx pour utiliser le nouveau CMSDashboard
2. [ ] Tester l'authentification admin et accès au dashboard
3. [ ] Fixer les imports dans les fichiers sections

### Phase 2: Sections du Dashboard (à compléter)
1. [ ] **CMSPrograms** - Ajouter/modifier/supprimer formations
   - Form d'édition
   - Galerie images
   - Sauvegarder sur chaque modification

2. [ ] **CMSTeam** - Gestion équipe + gouvernance
   - Ajouter/modifier/supprimer membres
   - Upload photo
   - Rôles (direction, conseil, scientifique)

3. [ ] **CMSBlog** - Gestion complète des actualités
   - Éditeur WYSIWYG pour contenu
   - Réactions (1 emoji par user)
   - Commentaires
   - Draft/Publish workflow

4. [ ] **CMSMedia** - Galerie d'images
   - Upload images
   - Compression/redimensionnement
   - Base64 pour localStorage

5. [ ] **CMSSettings** - Paramètres globaux
   - Header/Footer/Contact
   - SEO
   - Configuration générale

### Phase 3: Integration dans les pages existantes
Les pages doivent utiliser `useContent()` pour fetch les données dynamiquement:

```tsx
// Exemple pour une page
import { useContent } from '../hooks/useContent';

export function HomePage() {
  const { content } = useContent();
  
  return (
    <>
      <Hero hero={content.hero} />
      <ProgramsSection programs={content.programs} />
      ...
    </>
  );
}
```

**Pages à modifier:**
- [ ] HomePage.tsx - Utiliser hero, programs, whyChooseUs, testimonials, cta
- [ ] ProgramsPage.tsx - Utiliser content.programs
- [ ] BlogPage.tsx - Utiliser content.blog avec réactions/commentaires
- [ ] ContactPage.tsx - Intégrer messagerie
- [ ] AdmissionsPage.tsx - Intégrer messagerie + fixer les emails
- [ ] Autres pages...

### Phase 4: Système Email (Backend simple requis)

**Endpoints à créer** (`server/index.js`):
```javascript
POST /api/send-contact      // Envoyer message contact
POST /api/send-application  // Envoyer candidature
POST /api/send-reply        // Envoyer réponse admin
```

**Fonctionnalité:**
- Envoyer à dosyca35@gmail.com
- Stocker en messagerie dashboard
- Confirmation aux utilisateurs

### Phase 5: Features bonus (après les basiques)
- [ ] Brouillons d'articles
- [ ] Planification de publication
- [ ] Statistiques de lecture
- [ ] Export/Import de contenu
- [ ] Versioning des modifications

---

## 🔄 Flux de travail complet

### Admin veut modifier un texte de formation:
```
1. Va au Dashboard
2. Clique "Formations"
3. Sélectionne une formation
4. Modifie le titre/description
5. Clique "Enregistrer"
6. ContentManager sauvegarde en localStorage
7. Le hook useContent() notifie tous les composants
8. Site met à jour automatiquement
```

### Admin veut répondre à un message:
```
1. Dashboard > Messagerie
2. Sélectionne un message non lu
3. Clique "Répondre"
4. Tape sa réponse + email
5. Clique "Envoyer"
6. Email envoyé à l'utilisateur
7. Réponse stockée dans messagerie
8. Marqé comme "replied"
```

---

## 🖼️ Architecture des fichiers

```
src/
├── lib/
│   └── ContentManager.ts          # Gestion principale du contenu
├── hooks/
│   └── useContent.ts               # Hook React pour accès contenu
├── pages/
│   ├── CMSDashboard.tsx            # Dashboard principal
│   ├── dashboard/
│   │   └── sections/
│   │       ├── DashboardOverview.tsx
│   │       ├── CMSHero.tsx
│   │       ├── CMSMessages.tsx
│   │       ├── CMSPrograms.tsx     # À compléter
│   │       ├── CMSTeam.tsx         # À compléter
│   │       ├── CMSBlog.tsx         # À compléter
│   │       ├── CMSMedia.tsx        # À compléter
│   │       ├── CMSSettings.tsx     # À compléter
│   │       └── Stubs.tsx
│   └── ... autres pages

server/
└── index.js                         # Ajouter endpoints email
```

---

## 🚀 Prochaines étapes prioritaires

1. **Tester le système actuel**
   - Vérifier que ContentManager et useContent fonctionnent
   - Tester l'authentification et l'accès au dashboard

2. **Intégrer CMSBlog**
   - C'est un élément critique (actualités)
   - Permet de tester le workflow complet

3. **Fixer les bugs d'email**
   - Contact page
   - Admissions page

4. **Ajouter backend simple pour emails**
   - Endpoints manquants
   - Gmail integration

---

## 📞 Questions à résoudre

- [ ] Images: stockées en base64 dans localStorage? Ou références externes?
- [ ] Limite localStorage? (max 5-10MB selon navigateur)
- [ ] Faut-il un système de versioning/historique?
- [ ] Comment gérer les utilisateurs (ajouter d'autres admins)?
- [ ] Faut-il un système de brouillons avant publication?

---

## 🎓 Exemple d'utilisation du système

### Depuis une page quelconque:
```tsx
import { useContent } from '../hooks/useContent';

export function MyComponent() {
  const { 
    content,                    // Tous les données
    updateProgram,             // Mettre à jour une formation
    addBlogPost,              // Ajouter un article
    addMessage,               // Ajouter un message
  } = useContent();

  // Ces données seront à jour en temps réel
  return (
    <>
      {content.programs.map(prog => (
        <Program
          key={prog.id}
          program={prog}
          onUpdate={() => updateProgram(prog.id, {...})}
        />
      ))}
    </>
  );
}
```

---

**Version**: 1.0
**Créé**: 21 Février 2026
**Status**: Fondation prête, Sections à compléter
