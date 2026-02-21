require('dotenv').config();
const express    = require('express');
const bodyParser = require('body-parser');
const multer     = require('multer');
const cors       = require('cors');
const nodemailer = require('nodemailer');
const fs         = require('fs');
const path       = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ──────────────────────────────────────────────────────────────────────────────
// CONFIGURATION EMAIL GMAIL
// ──────────────────────────────────────────────────────────────────────────────
// 1. Activez la validation en 2 étapes sur Google
// 2. Sécurité → Mots de passe des applications → "GreenUpSite"
// 3. Copiez le mot de passe 16 caractères dans votre .env :
//    EMAIL_USER=votre.email@gmail.com
//    EMAIL_PASS=xxxx_xxxx_xxxx_xxxx

const CONTENT_FILE      = path.join(__dirname, 'content.json');
const APPLICATIONS_FILE = path.join(__dirname, 'applications.json');
const ADMIN_EMAIL       = 'dosyca35@gmail.com';

// ──────────────────────────────────────────────────────────────────────────────
// CONTENU CMS INITIAL
// ──────────────────────────────────────────────────────────────────────────────
const initialContent = {
  hero: {
    title: "Devenez l'Expert de la Transition Écologique",
    subtitle: "Formez-vous aux métiers de demain avec nos parcours d'excellence.",
  },
  programs: [
    { id: 1, title: 'Bachelor Administration des Entreprises', description: 'Gestion, management et entrepreneuriat en alternance.' },
    { id: 2, title: 'Bachelor Design',                          description: 'UX/UI, design graphique et création visuelle en alternance.' },
    { id: 3, title: 'Bachelor Développement Logiciel',           description: 'Web, mobile et applications full-stack en alternance.' },
    { id: 4, title: 'Bachelor Administration Réseau',            description: 'Infrastructure, sécurité et systèmes en alternance.' },
    { id: 5, title: 'Master Cybersécurité & Green IT',           description: 'Sécurité numérique et sobriété énergétique.' },
    { id: 6, title: 'Master Performance Énergétique',            description: 'Audit, rénovation et efficacité des bâtiments.' },
  ],
  whyChooseUs: [
    { id:1, title:'Innovation Pédagogique', description:"Méthodes actives, projets réels.", stat:'40+', statLabel:'Projets/an', icon:'Zap' },
    { id:2, title:'100% Alternance',         description:'Rémunéré pendant les études.',    stat:'0€',  statLabel:'Frais',        icon:'Briefcase' },
    { id:3, title:'Experts de Terrain',      description:'Intervenants pro en activité.',   stat:'85%', statLabel:'Pros actifs',   icon:'Users' },
  ],
  testimonials: [],
  cta: {
    title: "Prêt à transformer votre avenir ?",
    subtitle: "Candidatures 2026 ouvertes. Places limitées.",
    dates: [
      { label:"30 Juin",       sub:"Clôture candidatures" },
      { label:"6 formations",  sub:"Disponibles"          },
      { label:"48h",           sub:"Réponse admission"    },
    ],
  },
  contact: {
    director: 'Charles Giscard Fongang',
    email:    ADMIN_EMAIL,
    phone:    '(+33) 7 51 36 09 44',
    address:  'Boussy-Saint-Antoine, 91480 Essonne',
  },
  partners: [],
};

// Init fichiers persistants
if (!fs.existsSync(CONTENT_FILE)) {
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(initialContent, null, 2));
} else {
  try {
    const current = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
    let changed = false;
    for (const key of Object.keys(initialContent)) {
      if (current[key] === undefined) { current[key] = initialContent[key]; changed = true; }
    }
    if (changed) fs.writeFileSync(CONTENT_FILE, JSON.stringify(current, null, 2));
  } catch {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(initialContent, null, 2));
  }
}
if (!fs.existsSync(APPLICATIONS_FILE)) {
  fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify([], null, 2));
}

const upload     = multer({ storage: multer.memoryStorage() });
const PORT       = process.env.PORT || 4000;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// ──────────────────────────────────────────────────────────────────────────────
// ENDPOINT — CONTACT SIMPLE
// ──────────────────────────────────────────────────────────────────────────────
app.post('/api/send', async (req, res) => {
  const { name, email, subject, message } = req.body;
  const mailOptions = {
    from:    `"Green Up Academy" <${process.env.EMAIL_USER || ADMIN_EMAIL}>`,
    replyTo: email,
    to:      ADMIN_EMAIL,
    subject: subject || `Nouveau message de ${name}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;">
      <div style="background:#1FAB89;padding:20px;border-radius:10px 10px 0 0;">
        <h2 style="color:white;margin:0;">📩 Message de contact</h2>
      </div>
      <div style="background:#f9f9f9;padding:20px;border-radius:0 0 10px 10px;">
        <p><b>Nom :</b> ${name}</p><p><b>Email :</b> ${email}</p><p><b>Sujet :</b> ${subject}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:12px 0;">
        <p><b>Message :</b></p>
        <p style="background:white;padding:12px;border-radius:8px;border-left:3px solid #1FAB89;">${message.replace(/\n/g,'<br>')}</p>
      </div></div>`,
    text: `Nom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`,
  };
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('[SIMULATION] Email contact:', { name, email, subject });
      return res.json({ success: true });
    }
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error('Erreur email contact:', err);
    res.status(500).json({ error: 'Erreur envoi.' });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// ENDPOINT — CANDIDATURE COMPLÈTE
// ──────────────────────────────────────────────────────────────────────────────
app.post('/api/send-application', upload.array('files'), async (req, res) => {
  try {
    const {
      firstName, lastName, email, phone,
      birthDate, birthPlace, nationality, address,
      diploma, school, specialite, year, gpa,
      program, programNiveau, startDate,
      motivation, experience,
    } = req.body;

    const fullName = `${firstName} ${lastName}`;
    const now = new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'long', year:'numeric' });

    const attachments = (req.files || []).map(f => ({
      filename:    f.originalname,
      content:     f.buffer,
      contentType: f.mimetype,
    }));

    // ── 1. Sauvegarder dans applications.json (messagerie du dashboard) ──────
    let applications = [];
    try { applications = JSON.parse(fs.readFileSync(APPLICATIONS_FILE, 'utf8')); } catch {}

    const newApp = {
      id:          Date.now(),
      date:        new Date().toISOString(),
      firstName,   lastName, fullName,
      email,       phone,
      birthDate,   birthPlace, nationality, address,
      diploma,     school, specialite, year, gpa,
      program,     programNiveau, startDate,
      motivation,  experience,
      files:       (req.files || []).map(f => f.originalname),
      status:      'nouveau',   // nouveau | en_etude | accepté | refusé
      read:        false,
    };

    applications.unshift(newApp);
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(applications, null, 2));
    console.log(`\n📥 [CANDIDATURE] ${fullName} → ${program} (${programNiveau})`);
    console.log(`   Email: ${email} | Rentrée: ${startDate}`);
    console.log(`   Fichiers: ${(req.files||[]).map(f=>f.originalname).join(', ') || 'Aucun'}\n`);

    // ── 2. Email si credentials disponibles ──────────────────────────────────
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('[SIMULATION] Emails non envoyés (pas de credentials EMAIL_USER/EMAIL_PASS).');
      return res.json({ success: true, message: 'Candidature enregistrée' });
    }

    // ─── Email formaté → admin ────────────────────────────────────────────────
    const htmlAdmin = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
  body{font-family:'Segoe UI',Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px;}
  .c{max-width:680px;margin:0 auto;background:white;border-radius:14px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.10);}
  .hd{background:linear-gradient(135deg,#1FAB89,#15896B);padding:32px;text-align:center;}
  .hd h1{color:white;margin:0;font-size:22px;} .hd p{color:rgba(255,255,255,.82);margin:6px 0 0;font-size:14px;}
  .badge{display:inline-block;background:rgba(255,255,255,.20);color:white;border-radius:20px;padding:4px 16px;font-size:13px;margin-top:10px;}
  .prog{background:#1FAB89;color:white;border-radius:10px;padding:14px 20px;margin:20px 24px;}
  .prog h3{margin:0;font-size:17px;} .prog p{margin:4px 0 0;font-size:13px;opacity:.85;}
  .sec{padding:20px 24px;border-bottom:1px solid #f0f0f0;}
  .sec:last-child{border-bottom:none;}
  .stitle{font-size:12px;font-weight:700;color:#1FAB89;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;padding-left:10px;border-left:3px solid #1FAB89;}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .field{background:#f8f8f8;border-radius:8px;padding:10px 14px;}
  .flabel{font-size:11px;color:#999;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px;}
  .fvalue{font-size:14px;color:#2D2D2D;font-weight:500;}
  .motiv{background:#f8fffe;border-left:3px solid #1FAB89;border-radius:8px;padding:16px;font-size:14px;color:#444;line-height:1.7;}
  .ft{background:#2D2D2D;padding:18px;text-align:center;}
  .ft p{color:#999;font-size:12px;margin:3px 0;}
</style></head>
<body><div class="c">
  <div class="hd">
    <h1>📋 Nouvelle Candidature</h1>
    <p>Reçue le ${now}</p>
    <div class="badge">Green Up Academy — Admissions 2026</div>
  </div>

  <div class="prog">
    <h3>${program}</h3>
    <p>${programNiveau} · Rentrée : ${startDate}</p>
  </div>

  <div class="sec">
    <div class="stitle">Informations personnelles</div>
    <div class="grid">
      <div class="field"><div class="flabel">Nom</div><div class="fvalue">${lastName.toUpperCase()}</div></div>
      <div class="field"><div class="flabel">Prénom</div><div class="fvalue">${firstName}</div></div>
      <div class="field"><div class="flabel">Email</div><div class="fvalue">${email}</div></div>
      <div class="field"><div class="flabel">Téléphone</div><div class="fvalue">${phone}</div></div>
      <div class="field"><div class="flabel">Date de naissance</div><div class="fvalue">${birthDate || '—'}</div></div>
      <div class="field"><div class="flabel">Lieu de naissance</div><div class="fvalue">${birthPlace || '—'}</div></div>
      <div class="field"><div class="flabel">Nationalité</div><div class="fvalue">${nationality || '—'}</div></div>
      <div class="field"><div class="flabel">Adresse</div><div class="fvalue">${address || '—'}</div></div>
    </div>
  </div>

  <div class="sec">
    <div class="stitle">Parcours académique</div>
    <div class="grid">
      <div class="field"><div class="flabel">Diplôme</div><div class="fvalue">${diploma}</div></div>
      <div class="field"><div class="flabel">Année</div><div class="fvalue">${year}</div></div>
      <div class="field"><div class="flabel">Établissement</div><div class="fvalue">${school}</div></div>
      <div class="field"><div class="flabel">Spécialité</div><div class="fvalue">${specialite}</div></div>
      ${gpa ? `<div class="field"><div class="flabel">Moyenne / Mention</div><div class="fvalue">${gpa}</div></div>` : ''}
    </div>
  </div>

  <div class="sec">
    <div class="stitle">Lettre de motivation</div>
    <div class="motiv">${(motivation || '').replace(/\n/g,'<br>')}</div>
    ${experience ? `<div style="margin-top:14px;"><div class="stitle">Expériences professionnelles</div><div class="motiv">${experience.replace(/\n/g,'<br>')}</div></div>` : ''}
  </div>

  <div class="sec">
    <div class="stitle">Documents joints</div>
    <div class="grid">
      ${['cv','lettre','diplomes','identite'].map(k => {
        const f = (req.files||[]).find(f => f.fieldname === 'files' && f.originalname.startsWith(k));
        return `<div class="field"><div class="flabel">${k==='cv'?'CV':k==='lettre'?'Lettre de motivation':k==='diplomes'?'Relevés de notes':"Pièce d'identité"}</div>
          <div class="fvalue">${f ? '✅ '+f.originalname.replace(k+'_','') : '❌ Non fourni'}</div></div>`;
      }).join('')}
    </div>
  </div>

  <div class="ft">
    <p style="color:#1FAB89;font-weight:700;">Green Up Academy</p>
    <p>Boussy-Saint-Antoine, Essonne (91) · ${ADMIN_EMAIL}</p>
    <p style="margin-top:6px;font-size:11px;">Message généré automatiquement depuis le formulaire de candidature.</p>
  </div>
</div></body></html>`;

    // ─── Email de confirmation → candidat ─────────────────────────────────────
    const htmlConfirm = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:'Segoe UI',Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px;">
<div style="max-width:600px;margin:0 auto;background:white;border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.1);">
  <div style="background:linear-gradient(135deg,#1FAB89,#15896B);padding:32px;text-align:center;">
    <div style="font-size:48px;margin-bottom:8px;">✅</div>
    <h1 style="color:white;margin:0;font-size:22px;">Candidature reçue !</h1>
    <p style="color:rgba(255,255,255,.82);margin:6px 0 0;font-size:14px;">Green Up Academy — Admissions 2026</p>
  </div>
  <div style="padding:32px;">
    <p style="font-size:16px;color:#2D2D2D;margin-top:0;">Bonjour <strong>${firstName}</strong>,</p>
    <p style="color:#696969;line-height:1.7;font-size:14px;">
      Nous avons bien reçu votre candidature pour la formation<br>
      <strong style="color:#1FAB89;font-size:16px;">${program}</strong><br>
      Notre équipe pédagogique l'étudiera dans les meilleurs délais.
    </p>
    <div style="background:#f0fdf9;border:1px solid #d1fae5;border-radius:10px;padding:20px;margin:20px 0;">
      <p style="margin:0 0 12px;font-weight:700;color:#1FAB89;font-size:13px;">📋 RÉCAPITULATIF</p>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr><td style="padding:5px 0;color:#696969;width:40%">Formation</td><td style="color:#2D2D2D;font-weight:600">${program}</td></tr>
        <tr><td style="padding:5px 0;color:#696969">Niveau</td><td style="color:#2D2D2D;font-weight:600">${programNiveau}</td></tr>
        <tr><td style="padding:5px 0;color:#696969">Rentrée souhaitée</td><td style="color:#2D2D2D;font-weight:600">${startDate}</td></tr>
        <tr><td style="padding:5px 0;color:#696969">Votre email</td><td style="color:#2D2D2D;font-weight:600">${email}</td></tr>
        <tr><td style="padding:5px 0;color:#696969">Délai de réponse</td><td style="color:#1FAB89;font-weight:700">⏱ Sous 48h ouvrées</td></tr>
      </table>
    </div>
    <p style="color:#696969;font-size:13px;line-height:1.6;">
      Des questions ? Contactez-nous :<br>
      📧 <a href="mailto:${ADMIN_EMAIL}" style="color:#1FAB89">${ADMIN_EMAIL}</a><br>
      📞 <strong>(+33) 7 51 36 09 44</strong>
    </p>
  </div>
  <div style="background:#2D2D2D;padding:18px;text-align:center;">
    <p style="color:#1FAB89;font-weight:700;margin:0 0 4px;">Green Up Academy</p>
    <p style="color:#999;font-size:12px;margin:0;">Boussy-Saint-Antoine, Essonne (91)</p>
  </div>
</div></body></html>`;

    await Promise.all([
      transporter.sendMail({
        from:        `"Green Up Academy — Admissions" <${process.env.EMAIL_USER}>`,
        replyTo:     email,
        to:          ADMIN_EMAIL,
        subject:     `[CANDIDATURE] ${program} — ${fullName}`,
        html:        htmlAdmin,
        attachments,
      }),
      transporter.sendMail({
        from:    `"Green Up Academy — Admissions" <${process.env.EMAIL_USER}>`,
        to:      email,
        subject: `✅ Candidature reçue — ${program}`,
        html:    htmlConfirm,
      }),
    ]);

    console.log(`[EMAIL] Admin: ${ADMIN_EMAIL} ✓ | Candidat: ${email} ✓`);
    res.json({ success: true, message: 'Candidature envoyée avec succès' });

  } catch (err) {
    console.error('Erreur candidature:', err);
    // On retourne succès car la candidature est déjà sauvegardée localement
    res.json({ success: true, message: 'Candidature enregistrée (erreur email)' });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// ENDPOINTS — MESSAGERIE CANDIDATURES (Dashboard)
// ──────────────────────────────────────────────────────────────────────────────

// GET — lire toutes les candidatures
app.get('/api/applications', (req, res) => {
  try {
    res.json(JSON.parse(fs.readFileSync(APPLICATIONS_FILE, 'utf8')));
  } catch {
    res.json([]);
  }
});

// PATCH — marquer comme lu / changer statut
app.patch('/api/applications/:id', (req, res) => {
  try {
    const { id }     = req.params;
    const { status, read } = req.body;
    let apps = JSON.parse(fs.readFileSync(APPLICATIONS_FILE, 'utf8'));
    const idx = apps.findIndex(a => a.id === parseInt(id));
    if (idx === -1) return res.status(404).json({ error: 'Introuvable' });
    if (status !== undefined) apps[idx].status = status;
    if (read   !== undefined) apps[idx].read   = read;
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(apps, null, 2));
    res.json({ success: true, application: apps[idx] });
  } catch (err) {
    res.status(500).json({ error: 'Erreur mise à jour' });
  }
});

// DELETE — supprimer une candidature
app.delete('/api/applications/:id', (req, res) => {
  try {
    let apps = JSON.parse(fs.readFileSync(APPLICATIONS_FILE, 'utf8'));
    apps = apps.filter(a => a.id !== parseInt(req.params.id));
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(apps, null, 2));
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Erreur suppression' });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// ENDPOINTS — CMS
// ──────────────────────────────────────────────────────────────────────────────
app.get('/api/content', (req, res) => {
  try { res.json(JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'))); }
  catch { res.status(500).json({ error: 'Lecture impossible' }); }
});

app.post('/api/content', (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object') return res.status(400).json({ error: 'Données invalides' });
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch { res.status(500).json({ error: 'Sauvegarde impossible' }); }
});

// ──────────────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur Green Up Academy — port ${PORT}`);
  console.log(`📧 Email admin : ${ADMIN_EMAIL}`);
  console.log(`📁 Candidatures : ${APPLICATIONS_FILE}`);
  console.log(`📝 CMS : ${CONTENT_FILE}\n`);
});