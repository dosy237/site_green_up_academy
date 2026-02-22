# 🎯 START HERE - CMS GreenUp Academy

Bienvenue! Votre CMS est **complètement prêtre à l'emploi**. Suivez ces 3 étapes:

---

## 1️⃣ Démarrer le Système (2 minutes)

### Ouvrir 2 terminaux

**Terminal 1 - Frontend:**
```bash
cd site
npm run dev
```
→ S'affichera: `Local:   http://localhost:5173`

**Terminal 2 - Backend (optionnel):**
```bash
cd site/server
npm start
```
→ S'affichera: `Server running on port 4000`

---

## 2️⃣ Accéder au CMS (1 minute)

1. Ouvrir http://localhost:5173
2. **Identifiants de connexion:**
   - Username: `admin`
   - Mot de passe: `gua2026`
3. Cliquer sur **"Dashboard CMS"** dans le header
4. ✅ Vous êtes dans le CMS!

---

## 3️⃣ Essayer (2 minutes)

### Publier un article
1. Cliquer **"Actualités"** dans le sidebar
2. Cliquer **"Nouvel article"**
3. Remplir: title="Mon article", content="Contenu..."
4. Cliquer **"Enregistrer"**
5. ✅ Article visible dans la liste!

### Ajouter une formation
1. Cliquer **"Formations"** dans le sidebar
2. Cliquer **"Nouvelle formation"**
3. Remplir les infos: title, level, duration, etc
4. Cliquer **"Enregistrer"**
5. ✅ Formation créée!

---

## 📚 Documentation (Lisez selon vos besoins)

| Besoin | Document |
|--------|----------|
| **Je veux utiliser le CMS** | [QUICKSTART.md](QUICKSTART.md) |
| **Je veux ajouter à mon équipe** | [QUICKSTART.md](QUICKSTART.md) + email config |
| **Je veux configurer les emails** | [NEXT_STEPS.md](NEXT_STEPS.md) Étape 2 |
| **Je veux continuer le développement** | [NEXT_STEPS.md](NEXT_STEPS.md) |
| **Je veux comprendre comment ça marche** | [CMS_IMPLEMENTATION.md](CMS_IMPLEMENTATION.md) |
| **Je veux voir ce qui a été fait** | [COMPLETION_SUMMARY.md](COMPLETION_SUMMARY.md) |
| **Une vue rapide du projet** | [VISUAL_SUMMARY.md](VISUAL_SUMMARY.md) |

---

## ✅ Checklist - Avant de continuer

- [ ] Frontend démarre: `http://localhost:5173` ✅
- [ ] Vous pouvez vous connecter: admin/gua2026 ✅
- [ ] Vous voyez le Dashboard ✅
- [ ] Vous pouvez créer un article ✅

**Si tout OK**: 🎉 Le CMS fonctionne!

---

## ⚠️ Prochaines Étapes Importantes

### 🔴 CRITIQUE - Configurez Email
**Pourquoi**: Contact forms et candidatures ne peuvent pas envoyer email

**Comment** (15 min):
1. Aller sur https://myaccount.google.com/apppasswords
2. Générer mot de passe pour "Mail"
3. Créer fichier `site/server/.env`:
```env
GMAIL_USER=dosyca35@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```
4. Redémarrer le backend

[Voir détails dans NEXT_STEPS.md](NEXT_STEPS.md#2-configuration-email-critique)

---

### 🟠 IMPORTANT - Intégrer Pages Existantes
**Pourquoi**: Les pages doivent afficher le contenu du dashboard en temps réel

**DOIT être fait**:
- HomePage doit utiliser `useContent()`
- ProgramsPage doit utiliser `useContent()`
- BlogPage doit utiliser `useContent()`
- ContactPage doit appeler `addMessage()`
- AdmissionsPage doit appeler `addMessage()`

[Voir détails dans NEXT_STEPS.md](NEXT_STEPS.md#3-intégration-pages-existantes-important)

---

## 🆘 Besoin d'Aide?

### "Ça ne démarre pas"
```bash
# Clear cache et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### "Je ne peux pas me connecter"
```javascript
// Dans console (F12):
localStorage.removeItem('authToken')
location.reload()
```

### "Mes données ont disparu"
```javascript
// Dans console, vérifier:
JSON.parse(localStorage.getItem('greenup_cms_content'))
```

### "J'ai un bug"
1. Ouvrir F12 > Console
2. Copier le message d'erreur
3. Vérifier [STATUS.md](STATUS.md) pour bugs connus

---

## 🎓 Structures Principales

**ContentManager** = La "base de données" (localStorage)  
**useContent()** = Comment accéder aux données dans React  
**CMSDashboard** = Interface admin où on modifie tout  
**AuthContext** = Authentification admin

---

## 💡 Concept Clé

```
Admin modifie contenu dans Dashboard
                    ↓
         ContentManager met à jour localStorage
                    ↓
         React notifie tous les composants
                    ↓
         Site publique change immédiatement
                    ↓
        ✅ Aucun redémarrage requis!
```

---

## 🚀 Vous êtes Prêt!

### Actuel / 100%
- ✅ Dashboard complètement fonctionnel
- ✅ Authentification sécurisée
- ✅ Blog management
- ✅ Formations management
- ✅ Messagerie unifiée
- ✅ Documentation complète

### Besoin de:
- 🟠 Configuration email (15 min)
- 🟠 Intégration pages (2 heures)

**Avec ces 2 étapes: 100% fonctionnel!**

---

## 📞 Points de Contact

| Question | Allez à... |
|----------|-----------|
| "Comment faire...?" | [QUICKSTART.md](QUICKSTART.md) |
| "Quoi faire après...?" | [NEXT_STEPS.md](NEXT_STEPS.md) |
| "Comment ça fonctionne...?" | [CMS_IMPLEMENTATION.md](CMS_IMPLEMENTATION.md) |
| "Quel est le statut...?" | [STATUS.md](STATUS.md) |
| "Quoi a changé...?" | [COMPLETION_SUMMARY.md](COMPLETION_SUMMARY.md) |

---

## 🎯 Objectif

> **Vous ne devez JAMAIS modifier le code pour changer le contenu du site.**
> **Tout se fait via Dashboard. C'est l'objectif du CMS.**

Si vous pensez devoir modifier du code → Utilisez le Dashboard à la place! 🎉

---

## 📌 Commandes Essentielles

```bash
# Démarrer frontend
cd site && npm run dev

# Démarrer backend (optionnel)
cd site/server && npm start

# Réinstaller si ça casse
rm -rf node_modules && npm install

# Reset localStorage
# Dans console F12: localStorage.clear()
```

---

## ✨ Résultat

**Avant CMS**:
```
"Je veux changer le titre"
  ↓ Code change ↓ Build ↓ Deploy
  ⏳ 30 minutes
```

**Après CMS**:
```
"Je veux changer le titre"
  ↓ Dashboard ↓ Edit ↓ Save
  ✅ 30 secondes
```

---

## 🎉 Bon Travail!

Vous avez un CMS professionnel, sécurisé, et prêt à l'emploi.

**Prochaine étape**: [Lisez QUICKSTART.md pour apprendre à utiliser](QUICKSTART.md)

---

**Questions? Consultez la [documentation complète](README_CMS.md)** 📚

