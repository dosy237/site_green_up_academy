
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ------------------------------------------------------------------
// CONFIGURATION DE L'EMAIL (GMAIL)
// ------------------------------------------------------------------
// Pour utiliser Gmail, vous devez créer un "Mot de passe d'application" :
// 1. Activez la validation en deux étapes sur votre compte Google (Sécurité > Validation en deux étapes).
// 2. Allez dans Sécurité > Mots de passe des applications.
// 3. Sélectionnez "Messagerie" et "Autre (nom personnalisé)" -> "GreenUpSite".
// 4. Copiez le mot de passe de 16 caractères généré.
// 5. Mettez-le dans votre fichier .env :
//    EMAIL_USER=votre.email@gmail.com
//    EMAIL_PASS=le_mot_de_passe_de_16_caracteres
// ------------------------------------------------------------------

const CONTENT_FILE = path.join(__dirname, 'content.json');

// Données initiales complètes du site (CMS)
const initialContent = {
  hero: {
    title: "Devenez l'Expert de la Transition Écologique",
    subtitle: "Formez-vous aux métiers de demain avec nos parcours d'excellence en performance énergétique, RSE et développement durable.",
  },
  programs: [
    { id: 1, title: 'Bachelor Performance Énergétique', description: 'Formation post-bac pour maîtriser les bases de l\'efficacité énergétique.' },
    { id: 2, title: 'Master Cybersécurité & Green IT', description: 'Alliez sécurité numérique et sobriété énergétique.' },
    { id: 3, title: 'Bachelor en développement d\'application', description: 'Devenez un expert en développement web et mobile.' },
    { id: 4, title: 'Design', description: 'Maîtrisez les outils de création graphique et UX/UI.' },
    { id: 5, title: 'Sécurité et réseau', description: 'Protégez les infrastructures et les données des entreprises.' },
    { id: 6, title: 'Master Management Durable', description: 'Pilotez la stratégie RSE des entreprises.' }
  ],
  whyChooseUs: [
    { 
      id: 1, 
      title: 'Innovation Pédagogique', 
      description: "Méthodes d'apprentissage actives, projets réels avec des entreprises partenaires, et technologies de pointe.",
      stat: '40+',
      statLabel: 'Projets/an',
      icon: 'Zap'
    },
    { 
      id: 2, 
      title: '100% Alternance', 
      description: 'Immersion professionnelle totale. Vous êtes rémunéré pendant vos études et opérationnel dès la sortie.',
      stat: '0€',
      statLabel: 'Frais de scolarité',
      icon: 'Briefcase'
    },
    { 
      id: 3, 
      title: 'Experts de Terrain', 
      description: 'Nos intervenants sont des professionnels en activité, leaders dans leurs domaines respectifs.',
      stat: '85%',
      statLabel: 'Pros en activité',
      icon: 'Users'
    }
  ],
  testimonials: [
    {
      id: 1,
      name: 'Thomas Dubois',
      role: 'Consultant Green IT',
      company: 'Capgemini',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      program: 'Master Green IT 2024',
      quote: "Green Up Academy m'a permis de transformer ma passion pour l'informatique en une carrière qui a du sens. Aujourd'hui, j'aide les grandes entreprises à réduire l'empreinte carbone de leurs systèmes d'information.",
      rating: 5
    },
    {
      id: 2,
      name: 'Sarah Martin',
      role: 'Cheffe de projet RSE',
      company: "L'Oréal",
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      program: 'Master Management Durable 2023',
      quote: "L'alternance chez L'Oréal pendant ma formation a été un véritable tremplin. Les cours étaient directement applicables et l'équipe pédagogique exceptionnelle. Je recommande à 100%.",
      rating: 5
    },
    {
      id: 3,
      name: 'Lucas Bernard',
      role: 'Ingénieur Efficacité Énergétique',
      company: 'EDF',
      image: 'https://randomuser.me/api/portraits/men/86.jpg',
      program: 'Bachelor Performance Énergétique 2022',
      quote: "Une formation complète qui m'a donné toutes les compétences techniques et relationnelles pour réussir. Le réseau d'anciens est un vrai plus pour trouver des opportunités.",
      rating: 5
    }
  ],
  cta: {
    title: "Prêt à transformer votre avenir ?",
    subtitle: "Rejoignez la prochaine promotion de leaders de la transition écologique. Places limitées, candidatures ouvertes jusqu'au 30 juin 2025.",
    dates: [
      { label: "30 Juin", sub: "Clôture candidatures" },
      { label: "260 places", sub: "Toutes formations" },
      { label: "48h", sub: "Réponse admission" }
    ]
  },
  contact: {
    director: 'Charles Giscard Fongang',
    email: 'dosyca35@gmail.com',
    phone: '(+33) 7 51 36 09 44',
    address: '15 rue des halles, 75001 Paris'
  },
  partners: [
    { id: 1, name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { id: 2, name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { id: 3, name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" }
  ]
};

// Initialisation du fichier de contenu
if (!fs.existsSync(CONTENT_FILE)) {
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(initialContent, null, 2));
} else {
  // Merge simple pour s'assurer que tous les champs existent
  try {
    const current = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
    let changed = false;
    const keys = Object.keys(initialContent);
    for (const key of keys) {
      if (!current[key]) {
        current[key] = initialContent[key];
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(current, null, 2));
    }
  } catch (e) {
    console.error("Erreur lecture content.json, réinitialisation:", e);
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(initialContent, null, 2));
  }
}

const upload = multer({ storage: multer.memoryStorage() });
const PORT = process.env.PORT || 4000;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint pour envoyer un email de contact simple
app.post('/api/send', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Récupérer l'email de destination depuis le CMS ou fallback
  let recipient = 'dosyca35@gmail.com';
  try {
    const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
    if (content.contact && content.contact.email) recipient = content.contact.email;
  } catch (e) {}

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: recipient,
    subject: subject || `Nouveau message de ${name}`,
    text: `Nom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`,
  };

  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Simulation envoi email (pas de credentials):', mailOptions);
      return res.json({ success: true, message: 'Email simulé' });
    }
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email envoyé' });
  } catch (err) {
    console.error('Erreur envoi email:', err);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
  }
});

// Endpoint pour envoyer une candidature avec pièces jointes
app.post('/api/send-application', upload.array('files'), async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    let recipient = 'dosyca35@gmail.com';
    try {
      const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
      if (content.contact && content.contact.email) recipient = content.contact.email;
    } catch (e) {}

    const attachments = (req.files || []).map((f) => ({
      filename: f.originalname,
      content: f.buffer,
    }));

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: recipient,
      subject: subject || `Candidature de ${name}`,
      text: message,
      attachments,
    };

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Simulation candidature (pas de credentials):', mailOptions);
      return res.json({ success: true, message: 'Candidature simulée' });
    }
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Candidature envoyée' });
  } catch (err) {
    console.error('Erreur envoi candidature:', err);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de la candidature.' });
  }
});

// API CMS : Lire le contenu
app.get('/api/content', (req, res) => {
  try {
    const data = fs.readFileSync(CONTENT_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Impossible de lire le contenu' });
  }
});

// API CMS : Sauvegarder le contenu
app.post('/api/content', (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Données invalides' });
    }
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (err) {
    console.error("Erreur sauvegarde:", err);
    res.status(500).json({ error: 'Impossible de sauvegarder le contenu' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
