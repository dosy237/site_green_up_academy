require('dotenv').config();
const express    = require('express');
const bodyParser = require('body-parser');
const multer     = require('multer');
const cors       = require('cors');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const fs         = require('fs');
const path       = require('path');
const crypto     = require('crypto');
const jwt        = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// ─── FICHIERS DE DONNÉES ────────────────────────────────────────────────────
const DATA_DIR          = path.join(__dirname, 'data');
const CONTENT_FILE      = path.join(DATA_DIR, 'content.json');
const APPLICATIONS_FILE = path.join(DATA_DIR, 'applications.json');
const MESSAGES_FILE     = path.join(DATA_DIR, 'messages.json');
const ANALYTICS_FILE    = path.join(DATA_DIR, 'analytics.json');
const NEWS_FILE         = path.join(DATA_DIR, 'news.json');
const USERS_FILE        = path.join(DATA_DIR, 'users.json');
const UPLOADS_DIR       = path.join(__dirname, 'uploads');
const PORT              = process.env.PORT || 4000;
const ADMIN_EMAIL       = process.env.ADMIN_EMAIL || 'dosyca35@gmail.com';
const JWT_SECRET        = process.env.JWT_SECRET || 'gua_secret_key_2026_change_in_production' ;

// Créer les dossiers
[DATA_DIR, UPLOADS_DIR].forEach(d => { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); });

// ─── GESTIONNAIRE DE FICHIERS UTILISATEURS ──────────────────────────────────
const initialUsers = [
  { id: '1', username: 'admin', password: 'gua2026', role: 'admin' }
];

function readUsers() {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify(initialUsers, null, 2));
      return initialUsers;
    }
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  } catch (err) {
    console.error('Erreur lecture utilisateurs:', err.message);
    return initialUsers;
  }
}

function saveUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Erreur sauvegarde utilisateurs:', err.message);
  }
}

// ─── CONFIGURATION GMAIL OAUTH2 ────────────────────────────────────────────
// Dans votre .env :
//   GMAIL_CLIENT_ID=votre_client_id
//   GMAIL_CLIENT_SECRET=votre_client_secret
//   GMAIL_REFRESH_TOKEN=votre_refresh_token
//   GMAIL_USER=dosyca35@gmail.com
//
// Pour obtenir le refresh token :
// 1. Google Cloud Console → APIs → Gmail API → Activer
// 2. OAuth 2.0 → Créer des identifiants → Application Web
// 3. URI de redirection : https://developers.google.com/oauthplayground
// 4. Aller sur https://developers.google.com/oauthplayground
// 5. Paramètres → cocher "Use your own OAuth credentials" → mettre client_id + secret
// 6. Scope : https://mail.google.com/
// 7. Autoriser → Exchange tokens → copier le refresh_token

function createTransporter() {
  // Mode OAuth2 (recommandé - plus sécurisé)
  if (process.env.GMAIL_CLIENT_ID && process.env.GMAIL_REFRESH_TOKEN) {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );
    oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER || ADMIN_EMAIL,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      },
    });
  }

  // Mode App Password (fallback)
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
  }

  return null;
}

async function sendEmail(options) {
  const transporter = createTransporter();
  if (!transporter) {
    console.log('[SIMULATION EMAIL]', options.subject, '→', options.to);
    return { simulated: true };
  }
  return transporter.sendMail({
    from: `"Green Up Academy" <${process.env.GMAIL_USER || process.env.EMAIL_USER || ADMIN_EMAIL}>`,
    ...options,
  });
}

// ─── UPLOAD ────────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext  = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${Date.now()}_${name}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB max

// Servir les uploads
app.use('/uploads', express.static(UPLOADS_DIR));

// ─── INITIALISATION DES DONNÉES ────────────────────────────────────────────
const initialContent = {
  hero: {
    title: "Devenez l'Expert de la Transition Écologique",
    subtitle: "Formez-vous aux métiers de demain avec nos parcours d'excellence.",
    backgroundImage: '',
    ctaText: 'Candidater maintenant',
    ctaSubText: 'Admissions 2026 ouvertes',
  },
  about: {
    title: "Notre Mission",
    text: "Green Up Academy forme les professionnels de demain aux enjeux de la transition écologique et numérique. Une école innovante, 100% en alternance, au cœur de l'Essonne.",
    vision: "Former 1000 experts de la transition écologique d'ici 2030.",
    values: ["Innovation", "Durabilité", "Excellence", "Engagement"],
    stats: [
      { label: "Étudiants formés", value: "250+" },
      { label: "Partenaires entreprises", value: "80+" },
      { label: "Taux d'insertion", value: "94%" },
      { label: "Années d'expérience", value: "5+" },
    ],
  },
  programs: [
    { id: 1, title: 'Bachelor Administration des Entreprises', level: 'Bac+3', duration: '3 ans', description: 'Gestion, management et entrepreneuriat en alternance.', icon: '🏢', color: '#1FAB89', details: 'Formation complète en gestion d\'entreprise avec focus sur le développement durable.', outcomes: ['Manager de projet', 'Chef de service', 'Entrepreneur'] },
    { id: 2, title: 'Bachelor Design',                          level: 'Bac+3', duration: '3 ans', description: 'UX/UI, design graphique et création visuelle en alternance.', icon: '🎨', color: '#4ECDC4', details: 'Maîtrisez les outils du design moderne avec une approche éco-responsable.', outcomes: ['UX Designer', 'Designer Graphique', 'Directeur Artistique'] },
    { id: 3, title: 'Bachelor Développement Logiciel',           level: 'Bac+3', duration: '3 ans', description: 'Web, mobile et applications full-stack en alternance.', icon: '💻', color: '#45B7D1', details: 'Développez des solutions numériques innovantes et sobres en énergie.', outcomes: ['Développeur Full-Stack', 'Ingénieur Logiciel', 'CTO'] },
    { id: 4, title: 'Bachelor Administration Réseau',            level: 'Bac+3', duration: '3 ans', description: 'Infrastructure, sécurité et systèmes en alternance.', icon: '🔗', color: '#96CEB4', details: 'Maîtrisez l\'infrastructure informatique moderne et éco-efficace.', outcomes: ['Administrateur Réseau', 'Ingénieur Cloud', 'DSI'] },
    { id: 5, title: 'Master Cybersécurité & Green IT',           level: 'Bac+5', duration: '2 ans', description: 'Sécurité numérique et sobriété énergétique.', icon: '🔒', color: '#FFEAA7', details: 'Devenez expert en cybersécurité avec une vision Green IT.', outcomes: ['RSSI', 'Consultant Cybersécurité', 'Ethical Hacker'] },
    { id: 6, title: 'Master Performance Énergétique',            level: 'Bac+5', duration: '2 ans', description: 'Audit, rénovation et efficacité des bâtiments.', icon: '⚡', color: '#DDA0DD', details: 'Spécialisez-vous dans l\'efficacité énergétique des bâtiments.', outcomes: ['Auditeur Énergétique', 'Consultant RSE', 'Directeur Développement Durable'] },
  ],
  whyChooseUs: [
    { id: 1, title: 'Innovation Pédagogique', description: "Méthodes actives, projets réels, hackathons et ateliers pratiques.", stat: '40+', statLabel: 'Projets/an', icon: 'Zap', color: '#1FAB89' },
    { id: 2, title: '100% Alternance',         description: 'Rémunéré pendant toute la durée de vos études.',    stat: '0€',  statLabel: 'Frais de scolarité', icon: 'Briefcase', color: '#4ECDC4' },
    { id: 3, title: 'Experts de Terrain',      description: 'Intervenants professionnels en activité dans leur domaine.',   stat: '85%', statLabel: 'Pros actifs',   icon: 'Users', color: '#45B7D1' },
    { id: 4, title: 'Insertion Garantie',      description: 'Accompagnement emploi et réseau entreprises actif.',   stat: '94%', statLabel: 'Taux insertion',   icon: 'TrendingUp', color: '#96CEB4' },
  ],
  testimonials: [
    { id: 1, name: 'Marie Dubois', program: 'Bachelor Dev Logiciel', year: '2023', text: 'Une formation exceptionnelle qui m\'a permis de décrocher un CDI dès la fin de mes études.', avatar: '', rating: 5, company: 'TechCorp Paris' },
    { id: 2, name: 'Karim Mansour', program: 'Master Cybersécurité', year: '2024', text: 'Le réseau entreprises de Green Up Academy est incroyable. J\'ai trouvé mon alternance en 2 semaines.', avatar: '', rating: 5, company: 'SecureNet' },
  ],
  cta: {
    title: "Prêt à transformer votre avenir ?",
    subtitle: "Candidatures 2026 ouvertes. Places limitées.",
    dates: [
      { label: "30 Juin", sub: "Clôture candidatures" },
      { label: "6 formations", sub: "Disponibles" },
      { label: "48h", sub: "Réponse admission" },
    ],
  },
  contact: {
    director: 'Charles Giscard Fongang',
    email: ADMIN_EMAIL,
    phone: '(+33) 7 51 36 09 44',
    address: 'Boussy-Saint-Antoine, 91480 Essonne',
    mapEmbed: '',
    hours: 'Lun–Ven : 9h–18h',
    socialLinks: {
      linkedin: '',
      instagram: '',
      facebook: '',
      twitter: '',
    },
  },
  partners: [
    { id: 1, name: 'Partenaire 1', logo: '', url: '', category: 'Entreprise' },
  ],
  admission: {
    title: "Candidatez en ligne",
    subtitle: "Rejoignez Green Up Academy pour la rentrée 2026",
    steps: [
      { num: 1, title: "Dépôt de dossier", desc: "Remplissez le formulaire et uploadez vos documents." },
      { num: 2, title: "Étude du dossier", desc: "Notre équipe pédagogique étudie votre candidature sous 48h." },
      { num: 3, title: "Entretien", desc: "Si votre profil correspond, nous vous contactons pour un entretien." },
      { num: 4, title: "Réponse", desc: "Vous recevez notre décision par email dans les 72h suivant l'entretien." },
    ],
    documentsRequired: [
      { key: 'cv', label: 'Curriculum Vitae (CV)', required: true, formats: 'PDF, DOC, DOCX', maxSize: '5MB' },
      { key: 'letter', label: 'Lettre de motivation', required: true, formats: 'PDF, DOC, DOCX', maxSize: '5MB' },
      { key: 'diploma', label: 'Relevé(s) de notes / Diplôme(s)', required: true, formats: 'PDF, JPG, PNG', maxSize: '10MB' },
      { key: 'id', label: "Pièce d'identité", required: true, formats: 'PDF, JPG, PNG', maxSize: '5MB' },
      { key: 'photo', label: 'Photo d\'identité', required: false, formats: 'JPG, PNG', maxSize: '2MB' },
    ],
    faq: [
      { q: "Quels sont les frais de scolarité ?", a: "Green Up Academy est 100% en alternance, donc 0€ de frais à votre charge. L'entreprise finance votre formation." },
      { q: "Quelle est la durée des formations ?", a: "Les Bachelors durent 3 ans (Bac+3) et les Masters 2 ans (Bac+5)." },
      { q: "Faut-il trouver son alternance soi-même ?", a: "Notre service relations entreprises vous accompagne dans votre recherche d'alternance." },
    ],
  },
  header: {
    logo: '',
    logoText: 'Green Up Academy',
    navLinks: [
      { label: 'Accueil', href: '#hero' },
      { label: 'Formations', href: '#programs' },
      { label: 'Pourquoi nous', href: '#why' },
      { label: 'Témoignages', href: '#testimonials' },
      { label: 'Actualités', href: '#news' },
      { label: 'Contact', href: '#contact' },
    ],
    ctaText: 'Candidater',
    ctaHref: '#admission',
  },
  footer: {
    description: "Former les experts de la transition écologique et numérique.",
    copyright: `© ${new Date().getFullYear()} Green Up Academy. Tous droits réservés.`,
    links: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Politique de confidentialité', href: '/confidentialite' },
    ],
  },
  seo: {
    title: "Green Up Academy — École de la Transition Écologique",
    description: "Formez-vous aux métiers de demain avec Green Up Academy. Bachelor et Master en alternance, 100% gratuit.",
    keywords: "école alternance, transition écologique, cybersécurité, développement logiciel, Essonne",
    ogImage: '',
  },
};

const initialNews = [
  { id: 1, title: "Ouverture des candidatures 2026", slug: "candidatures-2026", excerpt: "Les candidatures pour la rentrée 2026 sont officiellement ouvertes !", content: "...", image: "", date: new Date().toISOString(), author: "Green Up Academy", category: "Admissions", published: true, likes: 0, views: 0, tags: ["admission", "2026"] },
  { id: 2, title: "Green Up remporte le prix de l'Innovation Pédagogique", slug: "prix-innovation", excerpt: "Notre école primée pour ses méthodes innovantes.", content: "...", image: "", date: new Date(Date.now() - 7 * 86400000).toISOString(), author: "Équipe GUA", category: "Actualité", published: true, likes: 0, views: 0, tags: ["prix", "innovation"] },
];

const initialAnalytics = {
  pageViews: { total: 0, today: 0, thisWeek: 0, thisMonth: 0 },
  visitors: { total: 0, unique: 0 },
  dailyViews: [],
  pageBreakdown: {},
  applicationStats: { total: 0, nouveau: 0, en_etude: 0, accepte: 0, refuse: 0 },
  contactStats: { total: 0, todayTotal: 0 },
  newsStats: { totalLikes: 0, totalViews: 0 },
};

function initFile(file, data) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  }
}
function readJSON(file, fallback = []) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { return fallback; }
}
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

initFile(CONTENT_FILE,      initialContent);
initFile(APPLICATIONS_FILE, []);
initFile(MESSAGES_FILE,     []);
initFile(ANALYTICS_FILE,    initialAnalytics);
initFile(NEWS_FILE,         initialNews);

// ─── ANALYTICS MIDDLEWARE ───────────────────────────────────────────────────
app.use((req, res, next) => {
  if (req.method === 'GET' && req.path.startsWith('/api/track')) {
    return next();
  }
  next();
});

app.post('/api/track', (req, res) => {
  const { page, sessionId } = req.body;
  const analytics = readJSON(ANALYTICS_FILE, initialAnalytics);
  const today = new Date().toISOString().split('T')[0];

  analytics.pageViews.total = (analytics.pageViews.total || 0) + 1;

  // Daily breakdown
  if (!analytics.dailyViews) analytics.dailyViews = [];
  let dayEntry = analytics.dailyViews.find(d => d.date === today);
  if (!dayEntry) {
    dayEntry = { date: today, views: 0, visitors: new Set() };
    analytics.dailyViews.push(dayEntry);
  }
  dayEntry.views = (dayEntry.views || 0) + 1;

  // Keep only last 30 days
  analytics.dailyViews = analytics.dailyViews.slice(-30);

  // Page breakdown
  if (!analytics.pageBreakdown) analytics.pageBreakdown = {};
  analytics.pageBreakdown[page || '/'] = (analytics.pageBreakdown[page || '/'] || 0) + 1;

  writeJSON(ANALYTICS_FILE, analytics);
  res.json({ success: true });
});

app.get('/api/analytics', (req, res) => {
  const analytics = readJSON(ANALYTICS_FILE, initialAnalytics);
  const applications = readJSON(APPLICATIONS_FILE, []);
  const messages = readJSON(MESSAGES_FILE, []);
  const news = readJSON(NEWS_FILE, []);

  // Stats candidatures
  const appStats = {
    total: applications.length,
    nouveau:   applications.filter(a => a.status === 'nouveau').length,
    en_etude:  applications.filter(a => a.status === 'en_etude').length,
    accepte:   applications.filter(a => a.status === 'accepte').length,
    refuse:    applications.filter(a => a.status === 'refuse').length,
    unread:    applications.filter(a => !a.read).length,
  };

  // Stats messages
  const msgStats = {
    total: messages.length,
    unread: messages.filter(m => !m.read).length,
  };

  // Stats actualités
  const newsStats = {
    totalLikes:  news.reduce((s, n) => s + (n.likes || 0), 0),
    totalViews:  news.reduce((s, n) => s + (n.views || 0), 0),
    published:   news.filter(n => n.published).length,
    total:       news.length,
  };

  res.json({
    ...analytics,
    applicationStats: appStats,
    messageStats: msgStats,
    newsStats,
  });
});

// ─── CONTENU CMS ───────────────────────────────────────────────────────────
app.get('/api/content', (req, res) => {
  res.json(readJSON(CONTENT_FILE, initialContent));
});

app.post('/api/content', (req, res) => {
  try {
    const current = readJSON(CONTENT_FILE, initialContent);
    const updated = { ...current, ...req.body };
    writeJSON(CONTENT_FILE, updated);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Sauvegarde impossible' });
  }
});

// PATCH section spécifique
app.patch('/api/content/:section', (req, res) => {
  try {
    const content = readJSON(CONTENT_FILE, initialContent);
    content[req.params.section] = req.body;
    writeJSON(CONTENT_FILE, content);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Erreur mise à jour' });
  }
});

// ─── UPLOAD IMAGE ──────────────────────────────────────────────────────────
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Aucun fichier' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ success: true, url, filename: req.file.filename });
});

// ─── ACTUALITÉS ────────────────────────────────────────────────────────────
app.get('/api/news', (req, res) => {
  const news = readJSON(NEWS_FILE, []);
  const { published } = req.query;
  if (published === 'true') return res.json(news.filter(n => n.published));
  res.json(news);
});

app.post('/api/news', (req, res) => {
  const news = readJSON(NEWS_FILE, []);
  const item = {
    ...req.body,
    id:    Date.now(),
    date:  req.body.date || new Date().toISOString(),
    likes: 0,
    views: 0,
    slug:  req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  };
  news.unshift(item);
  writeJSON(NEWS_FILE, news);
  res.json({ success: true, item });
});

app.put('/api/news/:id', (req, res) => {
  const news = readJSON(NEWS_FILE, []);
  const idx  = news.findIndex(n => n.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Introuvable' });
  news[idx] = { ...news[idx], ...req.body, id: news[idx].id };
  writeJSON(NEWS_FILE, news);
  res.json({ success: true, item: news[idx] });
});

app.delete('/api/news/:id', (req, res) => {
  let news = readJSON(NEWS_FILE, []);
  news = news.filter(n => n.id !== parseInt(req.params.id));
  writeJSON(NEWS_FILE, news);
  res.json({ success: true });
});

// Like une actualité (public)
app.post('/api/news/:id/like', (req, res) => {
  const news = readJSON(NEWS_FILE, []);
  const item = news.find(n => n.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Introuvable' });
  item.likes = (item.likes || 0) + 1;
  writeJSON(NEWS_FILE, news);
  res.json({ success: true, likes: item.likes });
});

// Vue une actualité (public)
app.post('/api/news/:id/view', (req, res) => {
  const news = readJSON(NEWS_FILE, []);
  const item = news.find(n => n.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Introuvable' });
  item.views = (item.views || 0) + 1;
  writeJSON(NEWS_FILE, news);
  res.json({ success: true, views: item.views });
});

// ─── MESSAGES DE CONTACT ───────────────────────────────────────────────────
app.get('/api/messages', (req, res) => {
  res.json(readJSON(MESSAGES_FILE, []));
});

app.patch('/api/messages/:id', (req, res) => {
  const msgs = readJSON(MESSAGES_FILE, []);
  const idx  = msgs.findIndex(m => m.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Introuvable' });
  Object.assign(msgs[idx], req.body);
  writeJSON(MESSAGES_FILE, msgs);
  res.json({ success: true });
});

app.delete('/api/messages/:id', (req, res) => {
  let msgs = readJSON(MESSAGES_FILE, []);
  msgs = msgs.filter(m => m.id !== parseInt(req.params.id));
  writeJSON(MESSAGES_FILE, msgs);
  res.json({ success: true });
});

// ─── ENVOI DE CONTACT ──────────────────────────────────────────────────────
app.post('/api/send', async (req, res) => {
  const { name, email, subject, message, phone } = req.body;

  // Sauvegarder dans messages.json
  const msgs = readJSON(MESSAGES_FILE, []);
  const newMsg = {
    id: Date.now(), type: 'contact',
    name, email, phone, subject, message,
    date: new Date().toISOString(), read: false, archived: false,
  };
  msgs.unshift(newMsg);
  writeJSON(MESSAGES_FILE, msgs);

  // Envoyer par email
  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;">
    <div style="background:linear-gradient(135deg,#1FAB89,#15896B);padding:28px;border-radius:12px 12px 0 0;">
      <h2 style="color:white;margin:0;">📩 Nouveau message de contact</h2>
    </div>
    <div style="background:#f9f9f9;padding:24px;border-radius:0 0 12px 12px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px;color:#666;width:130px"><b>Nom</b></td><td style="padding:8px;">${name}</td></tr>
        <tr style="background:#f0f0f0"><td style="padding:8px;color:#666"><b>Email</b></td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
        ${phone ? `<tr><td style="padding:8px;color:#666"><b>Téléphone</b></td><td style="padding:8px;">${phone}</td></tr>` : ''}
        <tr style="background:#f0f0f0"><td style="padding:8px;color:#666"><b>Sujet</b></td><td style="padding:8px;">${subject || '—'}</td></tr>
      </table>
      <div style="margin-top:16px;background:white;padding:16px;border-left:4px solid #1FAB89;border-radius:4px;">
        <p style="margin:0;line-height:1.7;">${(message || '').replace(/\n/g, '<br>')}</p>
      </div>
      <p style="margin-top:16px;font-size:12px;color:#999;">Message reçu le ${new Date().toLocaleString('fr-FR')}</p>
    </div>
  </div>`;

  try {
    await sendEmail({ to: ADMIN_EMAIL, replyTo: email, subject: `📩 Contact: ${subject || `Message de ${name}`}`, html });
    res.json({ success: true });
  } catch (err) {
    console.error('Erreur email contact:', err.message);
    res.json({ success: true, warning: 'Sauvegardé mais email non envoyé' });
  }
});

// ─── CANDIDATURES ──────────────────────────────────────────────────────────
app.get('/api/applications', (req, res) => {
  res.json(readJSON(APPLICATIONS_FILE, []));
});

app.patch('/api/applications/:id', (req, res) => {
  const apps = readJSON(APPLICATIONS_FILE, []);
  const idx  = apps.findIndex(a => a.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Introuvable' });
  Object.assign(apps[idx], req.body);
  writeJSON(APPLICATIONS_FILE, apps);
  res.json({ success: true, application: apps[idx] });
});

app.delete('/api/applications/:id', (req, res) => {
  let apps = readJSON(APPLICATIONS_FILE, []);
  apps = apps.filter(a => a.id !== parseInt(req.params.id));
  writeJSON(APPLICATIONS_FILE, apps);
  res.json({ success: true });
});

// Répondre à une candidature
app.post('/api/applications/:id/reply', async (req, res) => {
  const { subject, message, status } = req.body;
  const apps = readJSON(APPLICATIONS_FILE, []);
  const app_ = apps.find(a => a.id === parseInt(req.params.id));
  if (!app_) return res.status(404).json({ error: 'Introuvable' });

  if (status) {
    app_.status = status;
    writeJSON(APPLICATIONS_FILE, apps);
  }

  const statusColors = { accepte: '#27ae60', refuse: '#e74c3c', en_etude: '#f39c12', nouveau: '#3498db' };
  const statusLabels = { accepte: '✅ Candidature acceptée', refuse: '❌ Candidature refusée', en_etude: '⏳ En cours d\'étude', nouveau: '📋 Nouveau' };

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
    <div style="background:linear-gradient(135deg,#1FAB89,#15896B);padding:32px;border-radius:12px 12px 0 0;text-align:center;">
      <h1 style="color:white;margin:0;font-size:22px;">Green Up Academy</h1>
      <p style="color:rgba(255,255,255,.8);margin:8px 0 0;">Service des Admissions</p>
    </div>
    <div style="background:white;padding:32px;">
      ${status ? `<div style="background:${statusColors[status]}15;border:1px solid ${statusColors[status]};border-radius:8px;padding:12px;margin-bottom:20px;text-align:center;font-weight:700;color:${statusColors[status]};">${statusLabels[status]}</div>` : ''}
      <p>Bonjour <strong>${app_.firstName}</strong>,</p>
      <div style="line-height:1.8;color:#444;">${message.replace(/\n/g, '<br>')}</div>
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
      <p style="font-size:13px;color:#888;">Pour toute question : <a href="mailto:${ADMIN_EMAIL}">${ADMIN_EMAIL}</a> — (+33) 7 51 36 09 44</p>
    </div>
    <div style="background:#2D2D2D;padding:16px;text-align:center;border-radius:0 0 12px 12px;">
      <p style="color:#1FAB89;margin:0;font-weight:700;">Green Up Academy</p>
      <p style="color:#999;font-size:12px;margin:4px 0 0;">Boussy-Saint-Antoine, Essonne (91)</p>
    </div>
  </div>`;

  try {
    await sendEmail({ to: app_.email, subject: subject || `Réponse à votre candidature — ${app_.program}`, html });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erreur envoi email: ' + err.message });
  }
});

// ─── CANDIDATURE COMPLÈTE AVEC FICHIERS ────────────────────────────────────
app.post('/api/send-application',
  upload.fields([
    { name: 'cv',      maxCount: 1 },
    { name: 'letter',  maxCount: 1 },
    { name: 'diploma', maxCount: 3 },
    { name: 'id',      maxCount: 1 },
    { name: 'photo',   maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        firstName, lastName, email, phone,
        birthDate, birthPlace, nationality, address,
        diploma, school, specialite, year, gpa,
        program, programNiveau, startDate,
        motivation, experience,
      } = req.body;

      const fullName = `${firstName} ${lastName}`;
      const files = req.files || {};

      // Sauvegarder la candidature
      const apps = readJSON(APPLICATIONS_FILE, []);
      const newApp = {
        id: Date.now(),
        date: new Date().toISOString(),
        firstName, lastName, fullName,
        email, phone, birthDate, birthPlace, nationality, address,
        diploma, school, specialite, year, gpa,
        program, programNiveau, startDate,
        motivation, experience,
        files: Object.entries(files).reduce((acc, [key, arr]) => {
          acc[key] = arr.map(f => ({ name: f.originalname, path: f.path, url: `/uploads/${f.filename}` }));
          return acc;
        }, {}),
        status: 'nouveau',
        read: false,
      };
      apps.unshift(newApp);
      writeJSON(APPLICATIONS_FILE, apps);

      // Email admin
      const filesList = Object.entries(files).map(([key, arr]) =>
        `<tr><td style="padding:6px;color:#666">${key.toUpperCase()}</td><td style="padding:6px;color:#1FAB89">✅ ${arr.map(f => f.originalname).join(', ')}</td></tr>`
      ).join('');

      const htmlAdmin = `
      <div style="font-family:Arial,sans-serif;max-width:680px;">
        <div style="background:linear-gradient(135deg,#1FAB89,#15896B);padding:32px;border-radius:12px 12px 0 0;text-align:center;">
          <h1 style="color:white;margin:0;">📋 Nouvelle Candidature</h1>
          <div style="background:rgba(255,255,255,.2);display:inline-block;padding:6px 20px;border-radius:20px;margin-top:10px;color:white;font-size:14px;">${program} — ${programNiveau}</div>
        </div>
        <div style="background:#f9f9f9;padding:24px;border-radius:0 0 12px 12px;">
          <h3 style="color:#1FAB89;border-bottom:2px solid #1FAB89;padding-bottom:8px;">👤 Identité</h3>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:6px;color:#666;width:40%"><b>Nom complet</b></td><td style="padding:6px">${fullName}</td></tr>
            <tr style="background:#f0f0f0"><td style="padding:6px;color:#666"><b>Email</b></td><td style="padding:6px"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:6px;color:#666"><b>Téléphone</b></td><td style="padding:6px">${phone}</td></tr>
            <tr style="background:#f0f0f0"><td style="padding:6px;color:#666"><b>Naissance</b></td><td style="padding:6px">${birthDate || '—'} à ${birthPlace || '—'}</td></tr>
            <tr><td style="padding:6px;color:#666"><b>Nationalité</b></td><td style="padding:6px">${nationality || '—'}</td></tr>
            <tr style="background:#f0f0f0"><td style="padding:6px;color:#666"><b>Adresse</b></td><td style="padding:6px">${address || '—'}</td></tr>
          </table>
          <h3 style="color:#1FAB89;border-bottom:2px solid #1FAB89;padding-bottom:8px;margin-top:20px;">🎓 Parcours académique</h3>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:6px;color:#666;width:40%"><b>Diplôme</b></td><td style="padding:6px">${diploma} (${year})</td></tr>
            <tr style="background:#f0f0f0"><td style="padding:6px;color:#666"><b>Établissement</b></td><td style="padding:6px">${school}</td></tr>
            <tr><td style="padding:6px;color:#666"><b>Spécialité</b></td><td style="padding:6px">${specialite}</td></tr>
            ${gpa ? `<tr style="background:#f0f0f0"><td style="padding:6px;color:#666"><b>Moyenne</b></td><td style="padding:6px">${gpa}</td></tr>` : ''}
          </table>
          <h3 style="color:#1FAB89;border-bottom:2px solid #1FAB89;padding-bottom:8px;margin-top:20px;">✍️ Motivation</h3>
          <div style="background:white;padding:16px;border-left:4px solid #1FAB89;border-radius:4px;line-height:1.7;">${(motivation || '').replace(/\n/g, '<br>')}</div>
          ${experience ? `<h3 style="color:#1FAB89;border-bottom:2px solid #1FAB89;padding-bottom:8px;margin-top:20px;">💼 Expérience</h3><div style="background:white;padding:16px;border-left:4px solid #4ECDC4;border-radius:4px;line-height:1.7;">${experience.replace(/\n/g, '<br>')}</div>` : ''}
          <h3 style="color:#1FAB89;border-bottom:2px solid #1FAB89;padding-bottom:8px;margin-top:20px;">📎 Documents joints</h3>
          <table style="width:100%;border-collapse:collapse;">${filesList || '<tr><td colspan="2" style="padding:8px;color:#e74c3c;">Aucun document fourni</td></tr>'}</table>
          <div style="margin-top:20px;background:#1FAB8910;border:1px solid #1FAB89;padding:12px;border-radius:8px;">
            <b>Rentrée souhaitée :</b> ${startDate} | <b>Programme :</b> ${program} | <b>Niveau :</b> ${programNiveau}
          </div>
        </div>
      </div>`;

      const htmlCandidat = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#1FAB89,#15896B);padding:32px;border-radius:12px 12px 0 0;text-align:center;">
          <div style="font-size:56px;margin-bottom:8px;">✅</div>
          <h1 style="color:white;margin:0;font-size:24px;">Candidature reçue !</h1>
          <p style="color:rgba(255,255,255,.8);margin:8px 0 0;">Green Up Academy — Admissions 2026</p>
        </div>
        <div style="background:white;padding:32px;">
          <p>Bonjour <strong>${firstName}</strong>,</p>
          <p style="color:#555;line-height:1.8;">Votre candidature pour la formation <strong style="color:#1FAB89">${program}</strong> a bien été reçue et enregistrée. Notre équipe pédagogique l'étudiera dans les meilleurs délais.</p>
          <div style="background:#f0fdf9;border:2px solid #1FAB89;border-radius:12px;padding:20px;margin:20px 0;">
            <p style="margin:0 0 12px;font-weight:700;color:#1FAB89;font-size:13px;text-transform:uppercase;">📋 Récapitulatif de votre candidature</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:6px 0;color:#666;width:45%">Formation</td><td style="color:#2D2D2D;font-weight:600">${program}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Niveau</td><td style="color:#2D2D2D;font-weight:600">${programNiveau}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Rentrée souhaitée</td><td style="color:#2D2D2D;font-weight:600">${startDate}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Délai de réponse</td><td style="color:#1FAB89;font-weight:700">⏱ Sous 48h ouvrées</td></tr>
            </table>
          </div>
          <div style="background:#FFF3CD;border:1px solid #FFEAA7;border-radius:8px;padding:16px;margin:16px 0;">
            <p style="margin:0;color:#856404;font-size:14px;"><strong>📝 Prochaine étape :</strong> Si votre dossier est retenu, vous serez contacté(e) pour un entretien de motivation. Gardez votre téléphone disponible !</p>
          </div>
          <p style="color:#666;font-size:14px;">Une question ? N'hésitez pas à nous contacter :<br>
          📧 <a href="mailto:${ADMIN_EMAIL}" style="color:#1FAB89">${ADMIN_EMAIL}</a><br>
          📞 <strong>(+33) 7 51 36 09 44</strong></p>
        </div>
        <div style="background:#2D2D2D;padding:18px;text-align:center;border-radius:0 0 12px 12px;">
          <p style="color:#1FAB89;margin:0;font-weight:700;">Green Up Academy</p>
          <p style="color:#999;font-size:12px;margin:4px 0 0;">Boussy-Saint-Antoine, Essonne (91)</p>
        </div>
      </div>`;

      try {
        await Promise.all([
          sendEmail({ to: ADMIN_EMAIL, replyTo: email, subject: `[CANDIDATURE] ${program} — ${fullName}`, html: htmlAdmin }),
          sendEmail({ to: email, subject: `✅ Candidature reçue — ${program} | Green Up Academy`, html: htmlCandidat }),
        ]);
        console.log(`[EMAIL] Admin ✓ | Candidat: ${email} ✓`);
      } catch (emailErr) {
        console.error('[EMAIL ERROR]', emailErr.message);
      }

      res.json({ success: true, message: 'Candidature enregistrée avec succès' });

    } catch (err) {
      console.error('Erreur candidature:', err);
      res.status(500).json({ error: 'Erreur serveur: ' + err.message });
    }
  }
);

// ─── PARTENAIRES ───────────────────────────────────────────────────────────
app.get('/api/partners', (req, res) => {
  const content = readJSON(CONTENT_FILE, initialContent);
  res.json(content.partners || []);
});

// ─── AUTHENTIFICATION ──────────────────────────────────────────────────────
// Middleware de vérification JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide' });
    }
    req.user = decoded;
    next();
  });
}

// Route de login
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Identifiants manquants' });
    }

    const users = readUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    // Générer un JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (err) {
    console.error('Erreur login:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route de vérification du token
app.get('/api/auth/me', verifyToken, (req, res) => {
  try {
    const users = readUsers();
    const user = users.find(u => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({
      id: user.id,
      username: user.username,
      role: user.role
    });
  } catch (err) {
    console.error('Erreur vérification:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route pour changer le mot de passe admin
app.post('/api/auth/change-password', verifyToken, (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Accès administrateur requis' });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Données manquantes' });
    }

    let users = readUsers();
    const user = users.find(u => u.id === req.user.id);

    if (!user || user.password !== currentPassword) {
      return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
    }

    user.password = newPassword;
    saveUsers(users);

    res.json({ success: true, message: 'Mot de passe mis à jour' });
  } catch (err) {
    console.error('Erreur changement password:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ─── STATUS SERVEUR ────────────────────────────────────────────────────────
app.get('/api/status', (req, res) => {
  const emailConfigured = !!(
    (process.env.GMAIL_CLIENT_ID && process.env.GMAIL_REFRESH_TOKEN) ||
    (process.env.EMAIL_USER && process.env.EMAIL_PASS)
  );
  res.json({
    status: 'ok',
    version: '2.0.0',
    emailConfigured,
    emailMode: process.env.GMAIL_CLIENT_ID ? 'OAuth2' : (process.env.EMAIL_USER ? 'App Password' : 'Non configuré'),
    adminEmail: ADMIN_EMAIL,
    timestamp: new Date().toISOString(),
  });
});

// ─── DÉMARRAGE ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Green Up Academy Server — Port ${PORT}`);
  console.log(`📧 Admin : ${ADMIN_EMAIL}`);
  console.log(`🔑 Email : ${process.env.GMAIL_CLIENT_ID ? 'OAuth2 Gmail' : process.env.EMAIL_USER ? 'App Password' : '⚠️  Non configuré'}`);
  console.log(`📁 Données : ${DATA_DIR}`);
  console.log(`\n📖 Config email dans .env :`);
  console.log(`   Option 1 (OAuth2 - recommandé) :`);
  console.log(`     GMAIL_CLIENT_ID=votre_client_id`);
  console.log(`     GMAIL_CLIENT_SECRET=votre_client_secret`);
  console.log(`     GMAIL_REFRESH_TOKEN=votre_refresh_token`);
  console.log(`     GMAIL_USER=${ADMIN_EMAIL}`);
  console.log(`   Option 2 (App Password) :`);
  console.log(`     EMAIL_USER=${ADMIN_EMAIL}`);
  console.log(`     EMAIL_PASS=xxxx_xxxx_xxxx_xxxx\n`);
});