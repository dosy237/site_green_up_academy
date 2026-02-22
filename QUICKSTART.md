# 🚀 Quick Start - CMS GreenUp Academy

Bienvenue dans le CMS GreenUp Academy! Ce guide explique comment accéder et utiliser le système rapidement.

## 1️⃣ Accéder au Dashboard

### Démarrer le site
```bash
# Terminal 1 - Frontend
cd /path/to/site_green_up/site
npm run dev

# Terminal 2 - Backend (optionnel, pour emails)
cd /path/to/site_green_up/site/server
npm start
```

### Se connecter
1. Rendez-vous sur **http://localhost:5173**
2. Vous verrez une page de connexion
3. **Identifiants par défaut**:
   - Username: `admin`
   - Password: `gua2026`

4. Après connexion, cliquez sur **"Dashboard CMS"** dans le header

## 2️⃣ Navigation du Dashboard

Le dashboard a **8 sections principales**:

| Section | Fonction | Status |
|---------|----------|--------|
| **Accueil Dashboard** | Vue d'ensemble, statistiques | ✅ Prêt |
| **Hero & Titre** | Éditer le titre/image principale | ✅ Prêt |
| **Formations** | Ajouter/modifier/supprimer formations | ✅ Prêt |
| **Équipe & Gouvernance** | Gérer l'équipe | 🟡 Stub |
| **Actualités** | Publier/modifier articles | ✅ Prêt |
| **Messagerie** | Voir messages de contact/candidatures | ✅ Prêt |
| **Galerie Media** | Gérer images | 🟡 Stub |
| **Paramètres** | Configuration générale | 🟡 Stub |

> 🟡 = À compléter dans une prochaine version

## 3️⃣ Cas d'usage courants

### 📰 Publier un nouvel article

1. Cliquez sur **"Actualités"** dans le sidebar
2. Cliquez sur **"Nouvel article"**
3. Remplissez les champs:
   - **Titre**: "Mon super article"
   - **Auteur**: Votre nom
   - **Image couverture**: URL de l'image (ou placeholder)
   - **Contenu**: L'article complet (supporte Markdown!)
   - **Extrait**: Petit résumé (apparaît sur la page blog)
   - **Tags**: Catégories (optionnel)
4. Cochez **"Publié"** pour rendre visible publiquement
5. Cliquez **"Enregistrer"**

**Résultat**: L'article apparaît immédiatement sur la page Blog publique! 🎉

---

### 🎓 Ajouter une nouvelle formation

1. Cliquez sur **"Formations"** dans le sidebar
2. Cliquez sur **"Nouvelle formation"**
3. Remplissez les informations:
   - **Titre**: "Licence Développement Durable"
   - **Niveau**: Sélectionnez (Licence, Master, etc)
   - **Durée**: "2 ans"
   - **Description**: Description détaillée
   - **Nombre de places**: 30
   - **Status**: "Ouvert aux candidatures"
   - **Objectifs pédagogiques**: Ajouter 3-4 objectifs
   - **Prérequis**: Ce qu'il faut comme connaissances
   - **Professeurs**: Noms des responsables
4. Cliquez **"Enregistrer"**

**Résultat**: La formation apparaît sur la page Formations! 🎓

---

### 💬 Répondre à un message

1. Cliquez sur **"Messagerie"** dans le sidebar
2. Sélectionnez un message non lu
3. Lisez le message
4. Cliquez **"Répondre"**
5. Tapez votre réponse
6. Cliquez **"Envoyer"**

**Résultat**: Une email est envoyée au demandeur + réponse stockée dans le dashboard 📧

---

### ✏️ Modifier le titre principal du site

1. Cliquez sur **"Hero & Titre"** dans le sidebar
2. Cliquez sur **"Éditer"**
3. Modifiez:
   - **Titre**
   - **Sous-titre**
   - **Texte du bouton CTA** (Call-to-action)
4. Cliquez **"Enregistrer"**

**Résultat**: Les modifications apparaissent immédiatement sur la page d'accueil du site! 🏠

---

## 4️⃣ Points clés à retenir

### 📍 **Synchronisation en temps réel**
- Quand vous modifiez un contenu dans le dashboard
- **Le site publique se met à jour automatiquement**
- Pas besoin de redémarrer le serveur ou recharger la page
- La sauvegarde se fait dans localStorage

### 🔐 **Sécurité**
- Seuls les admins peuvent accéder au dashboard
- Votre session expire après 8 heures (pour sécurité)
- Les données sont sauvegardées dans localStorage du navigateur

### 💾 **Sauvegarde**
- **Tout est automatiquement sauvegardé** lors de chaque modification
- Pour sauvegarder ailleurs: utilisez l'export de contenu (futur)
- Votre problématique: ce qui se passe sur le dashboard reste sur ce navigateur

### 🖼️ **Images**
- Pour les images, mettez l'URL d'une image externe
- Ou uploadez une image et récupérez son URL
- C'est recommandé d'utiliser Unsplash, Pexels, ou votre propre serveur

---

## 5️⃣ Signaler les bugs & demander des features

### Quand vous trouvez un problème:
- Notez **exactement** ce que vous essayez de faire
- Dites **ce qui s'est passé** (au lieu de ce qui devrait se passer)
- Donnez **des détails** (navigateur, appareil, screenshots)

### Bugs connus 🐛
- [ ] Section "Équipe" - pas encore implémentée
- [ ] Section "Media" - pas encore implémentée
- [ ] Section "Paramètres" - pas encore implémentée
- [ ] Emails ne sont pas envoyés (configuration Gmail requise)

---

## 6️⃣ Structure des données (pour développeurs)

Les contenus sont organisés comme ceci:

```javascript
{
  // Contenu du site
  hero: {
    title: "...",
    subtitle: "...",
    ctaText: "...",
    ...
  },
  programs: [
    { id: "prog1", title: "...", ... },
    { id: "prog2", title: "...", ... },
  ],
  blog: [
    { id: "post1", title: "...", content: "...", ... },
    { id: "post2", title: "...", content: "...", ... },
  ],
  messages: [
    { id: "msg1", type: "contact", ... },
    { id: "msg2", type: "application", ... },
  ],
  // ... other sections
}
```

**Lieu de stockage**: `localStorage['greenup_cms_content']`

---

## 7️⃣ FAQ

### ❓ Mon article ne s'affiche pas sur le site

**Vérifications**:
1. Est-ce que vous avez coché "Publié" ?
2. Avez-vous cliqué "Enregistrer" ?
3. Vérifiez console du navigateur (F12) pour les erreurs
4. Rechargez la page publique (Ctrl+R)

---

### ❓ Je veux changer les couleurs du site

**Actuellement**: Les couleurs sont en dur dans le code Tailwind CSS

**Pour changer**: Contactez un développeur ou demandez in à customiser les couleurs dans le CMS (futur feature)

---

### ❓ Comment je fais une sauvegarde de mon contenu ?

**Actuellement**: Tout est sauvegardé localement dans ce navigateur

**Pour sauvegarder ailleurs**:
1. Votre contenu peut être exporté en JSON (à venir)
2. Ou accédez directement localStorage depuis console: `localStorage.getItem('greenup_cms_content')`

---

### ❓ Qu'est-ce qui se passe si je ferme mon navigateur ?

**Pas de panique!** Vos données sont sauvegardées dans localStorage du navigateur
- Elles persistent même après fermeture
- Vous retrouvez tout en vous reconnectant

---

## 📞 Besoin d'aide ?

Si quelque chose ne fonctionne pas:
1. **Vérifiez la console** (F12 -> Console)
2. **Notez le message d'erreur**
3. **Contactez un développeur** avec les détails

---

## 🎓 Prochaines étapes

Le CMS est en développement actif. Voici ce qui arrive:

- [ ] Section "Équipe" - complète
- [ ] Section "Media" - galerie d'images
- [ ] Section "Parameters" - configuration générale
- [ ] Système d'email - fonctionnel
- [ ] Versioning - historique des modifications
- [ ] Scheduling - programmer la publication d'articles

---

**Bienvenue dans le CMS GreenUp Academy! 🌱**

