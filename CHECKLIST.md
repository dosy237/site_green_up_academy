# ✅ Checklist - Green Up Academy

## 🚀 INSTALLATION & DÉMARRAGE

### Frontend
- [ ] `npm install` terminé
- [ ] `npm run dev` fonctionne
- [ ] Site accessible sur http://localhost:5173
- [ ] Pas d'erreurs dans la console

### Backend
- [ ] `cd server && npm install` terminé
- [ ] `server/.env` créé
- [ ] `npm run dev` dans le dossier server
- [ ] Serveur tourne sur http://localhost:4000
- [ ] Rép. `data/` créée automatiquement

---

## 🔐 AUTHENTIFICATION

### Page de Login
- [ ] Accessible immédiatement en arrivant sur le site
- [ ] Champs "Identifiant" et "Mot de passe"
- [ ] Bouton "Se connecter"
- [ ] Design cohérent (vert/blanc)

### Connexion avec admin/gua2026
- [ ] ✅ Login réussit
- [ ] 🔒 Token stocké en localStorage
- [ ] ➡️ Redirection vers l'accueil
- [ ] 👤 Nom "admin" affiché en haut à droite
- [ ] 🏷️ Badge "Admin" visible
- [ ] 🚪 Bouton "Déconnexion" présent

### Essais négatifs
- [ ] ❌ Credentials invalides → Erreur affichée
- [ ] ❌ Champs vides → Message d'erreur
- [ ] ❌ Token expiré → Redirige vers login

---

## 📱 NAVIGATION & PAGES

### En tant qu'utilisateur normal (si implémenté)
- [ ] Page Accueil visible
- [ ] Onglets publics accessibles (Programmes, Blog, etc.)
- [ ] ❌ Pas d'option "Dashboard" dans le menu
- [ ] ❌ Dashboard non accessible directement

### En tant qu'admin
- [ ] Page Accueil visible
- [ ] Tous les onglets publics accessibles
- [ ] ✅ Option "Dashboard" visible dans le menu
- [ ] ✅ Dashboard accessible et fonctionnel
- [ ] ✅ Accès sans restriction

---

## 👤 HEADER & USER MENU

### Avant connexion
- [ ] Page de login affichée
- [ ] Pas de menu utilisateur

### Après connexion
- [ ] Menu utilisateur visible en haut à droite
- [ ] Affiche le nom d'utilisateur (admin)
- [ ] Affiche le rôle (Badge "Admin")
- [ ] Bouton "Déconnexion" (icône déconnexion)
- [ ] Bouton "Thème" (soleil/lune) fonctionnel

### Déconnexion
- [ ] Clique sur "Déconnexion"
- [ ] localStorage vidé
- [ ] Redirige vers LoginPage
- [ ] Menu utilisateur disparu

---

## 📊 DASHBOARD

### Accès au Dashboard
- [ ] Admin peut accéder au Dashboard
- [ ] Dashboard se charge sans erreur
- [ ] Interface CMS visible
- [ ] Tous les modules présents

### Si non-admin essaie d'accéder
- [ ] Message "Accès refusé" affiché
- [ ] Bouton "Retour à l'accueil" présent
- [ ] Pas d'accès au dashboard

---

## 🌙 THÈME CLAIR/SOMBRE

- [ ] Bouton thème visible (soleil/lune)
- [ ] Clique → change le thème
- [ ] Sauvegardé en localStorage
- [ ] Persiste après refresh

---

## 🔗 API & BACKEND

### Routes de login
- [ ] `POST /api/auth/login` reçoit username/password
- [ ] Retourne token + user data
- [ ] Erreur 401 si credentials invalides

### Vérification token
- [ ] `GET /api/auth/me` avec token valide
- [ ] Retourne les infos utilisateur
- [ ] Erreur 403 si token invalide/absent

### Changement password
- [ ] `POST /api/auth/change-password` fonctionne
- [ ] Vérifie l'ancien mot de passe
- [ ] Met à jour le nouveau (si admins le font)

---

## 📧 EMAIL (Optionnel)

### Configuration
- [ ] `.env` a EMAIL_USER et EMAIL_PASS (ou OAuth2)
- [ ] Email simulé s'affiche en console si pas configuré

### Envoi emails
- [ ] Nouvelles candidatures → Email envoyé
- [ ] Admin reçoit les candidatures
- [ ] Candidat reçoit confirmation

---

## 🛡️ SÉCURITÉ

### JWT Token
- [ ] Token valide 8 heures
- [ ] Stocké en localStorage (côté client)
- [ ] Envoyé dans les headers (`Authorization: Bearer ...`)
- [ ] Validé côté serveur à chaque requête

### Mots de passe
- [ ] ⚠️ Actuellement en clair (À améliorer avec bcrypt!)
- [ ] Changez de ceux par défaut en production
- [ ] Utilisez HTTPS en production

---

## 🐛 DÉPANNAGE

### Si erreur "Cannot POST /api/auth/login"
- [ ] ✅ Le serveur backend tourne? (`npm run dev` dans `server/`)
- [ ] ✅ Port 4000 libre?
- [ ] ✅ Affichez les erreurs du terminal backend

### Si erreur CORS
- [ ] ✅ Backend a `cors` installé
- [ ] ✅ Le proxy Vite est configuré dans `vite.config.ts`
- [ ] ✅ Vite redirige `/api` vers `http://localhost:4000`

### Si localStorage vide après refresh
- [ ] ✅ Vérifiez que le token est bien sauvegardé
- [ ] ✅ Vérifiez que `GET /api/auth/me` retourne 200

---

## 📋 AVANT MISE EN PRODUCTION

- [ ] Changez `JWT_SECRET` dans `.env`
- [ ] Changez le mot de passe admin par défaut
- [ ] Haschez les mots de passe (bcrypt)
- [ ] Configurez l'email (Gmail OAuth2)
- [ ] Activez HTTPS
- [ ] Mettez à jour les URLs (localhost → domaine réel)
- [ ] Configurez CORS pour votre domaine
- [ ] Utilisez une vraie base de données (MongoDB, PostgreSQL)
- [ ] Testez sur mobile/tablet
- [ ] Vérifiez les performances (Lighthouse)
- [ ] Configurez les variables d'environnement sécurisées

---

## 📞 SUPPORT

Besoin d'aide? Consultez:
- 📖 [README.md](./README.md) - Vue d'ensemble
- 🔧 [SETUP.md](./SETUP.md) - Configuration détaillée
- 📧 contact@green-up-academy.com

---

**Tout fonctionne?** 🎉 Vous êtes prêt à développer!
