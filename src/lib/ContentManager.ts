// Content Manager - Gestion centralisée du contenu du site via localStorage
// Tous les éléments du site sont gérés ici

export interface ContentData {
  // Hero
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    ctaText: string;
    ctaHref: string;
  };

  // Formations/Programs
  programs: Program[];

  // À propos
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
    values: string[];
  };

  // Pourquoi nous
  whyChooseUs: Feature[];

  // Témoignages
  testimonials: Testimonial[];

  // Partenaires
  partners: Partner[];

  // Header
  header: {
    logoText: string;
    logoImage: string;
    navLinks: NavLink[];
  };

  // Footer
  footer: {
    description: string;
    copyright: string;
    links: FooterLink[];
  };

  // Contact
  contact: {
    email: string;
    phone: string;
    address: string;
    director: string;
    hours: string;
    social: SocialLinks;
  };

  // CTA & Dates
  ctaDates: {
    title: string;
    subtitle: string;
    dates: CtaDate[];
  };

  // Blog/Actualités
  blog: BlogPost[];

  // Messages (Contact + Candidatures)
  messages: Message[];

  // Candidatures
  applications: Application[];

  // Team / Gouvernance
  team?: TeamMember[];

  // Student Activities / Vie Étudiante
  studentActivities?: StudentActivity[];
}

export interface Program {
  id: string;
  title: string;
  level: string;
  duration: string;
  description: string;
  fullDescription: string;
  icon: string;
  color: string;
  highlights: string[];
  image: string;
  type: 'bachelor' | 'master';
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  stat: string;
  statLabel: string;
}

export interface Testimonial {
  id: string;
  name: string;
  author?: string;
  role: string;
  company: string;
  text: string;
  quote?: string;
  rating: number;
  image: string;
  program: string;
  year?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLinks {
  linkedin: string;
  instagram: string;
  facebook: string;
  twitter: string;
}

export interface CtaDate {
  label: string;
  date: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  coverImage?: string;
  author: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  slug?: string;
  category: string;
  published: boolean;
  views: number;
  comments: BlogComment[];
  reactions: Record<string, string[]>; // emoji -> [userIds]
  tags?: string[];
}

export interface BlogComment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface Message {
  id: string;
  type: 'contact' | 'application' | 'admin-reply';
  subject: string;
  from: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
  replied: boolean;
  replies: Message[];
  applicationData?: Application;
}

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  date: string;
  status: 'new' | 'reviewing' | 'accepted' | 'rejected';
  motivation: string;
  cv: string; // base64
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category?: 'direction' | 'board' | 'scientific';
  bio?: string;
  image?: string;
  email?: string;
  phone?: string;
}

export interface StudentActivity {
  id: string;
  title: string;
  category?: string;
  description: string;
  image?: string;
  date?: string;
  location?: string;
  contact?: string;
  isActive?: boolean;
}

// ─────────────────────────────────────────────────────────────────
// CONTENT MANAGER
// ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'gua_content';

const CONTENT_VERSION = 4; // Incrémenter à chaque mise à jour des données initiales

const INITIAL_CONTENT: ContentData = {
  hero: {
    title: "Devenez l'Expert de la Transition Écologique",
    subtitle: "Formez-vous aux métiers de demain avec nos parcours d'excellence en performance énergétique, RSE et développement durable.",
    backgroundImage: '',
    ctaText: 'Candidater maintenant',
    ctaHref: '/admissions',
  },

  // ── 4 Bachelors + 2 Masters ──────────────────────────────────────────────
  programs: [
    {
      id: 'prog-1', type: 'bachelor',
      title: 'Bachelor Administration des Entreprises', level: 'Bac+3', duration: '3 ans',
      description: "Formez-vous à la gestion globale d'une entreprise : administration, finance, ressources humaines et stratégie.",
      fullDescription: "Formation complète en gestion d'entreprise alliant comptabilité, droit, RH, marketing et management de projet. 100% alternance, 0€ de frais.",
      icon: 'Building2', color: 'from-emerald-500 to-teal-600',
      highlights: ['Comptabilité & Finance', 'RH & Management', 'Droit des affaires', 'Marketing digital', 'Gestion de projet', 'Entrepreneuriat'],
      image: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prog-2', type: 'bachelor',
      title: 'Bachelor Design', level: 'Bac+3', duration: '3 ans',
      description: "Maîtrisez les outils et les méthodes du design contemporain : identité visuelle, interfaces numériques, UX research et motion design.",
      fullDescription: "Formation design complète couvrant le graphisme, l'UX/UI, le motion design et les outils professionnels (Figma, Adobe Suite). 100% alternance.",
      icon: 'Palette', color: 'from-purple-500 to-pink-600',
      highlights: ['Figma & Prototypage', 'Adobe Illustrator & Photoshop', 'UX Research', 'Typography & Color', 'Motion Design', 'Design System'],
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prog-3', type: 'bachelor',
      title: 'Bachelor Développement Logiciel', level: 'Bac+3', duration: '3 ans',
      description: "Devenez développeur full-stack opérationnel en 3 ans. Du front-end au back-end, maîtrisez les frameworks modernes.",
      fullDescription: "Formation full-stack complète : JavaScript/TypeScript, React, Node.js, SQL, MongoDB, Git et méthodes agiles. 100% alternance, 0€ de frais.",
      icon: 'Monitor', color: 'from-blue-500 to-cyan-600',
      highlights: ['JavaScript / TypeScript', 'React & Node.js', 'Python', 'SQL & MongoDB', 'Git & CI/CD', 'Docker'],
      image: 'https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prog-4', type: 'bachelor',
      title: 'Bachelor Administration Réseau', level: 'Bac+3', duration: '3 ans',
      description: "Maîtrisez l'infrastructure informatique des entreprises : configuration réseau, administration système et virtualisation.",
      fullDescription: "Formation réseau et systèmes complète : Cisco, Linux, Windows Server, Active Directory, virtualisation VMware et cybersécurité. 100% alternance.",
      icon: 'Network', color: 'from-orange-500 to-red-600',
      highlights: ['Cisco & routage', 'Linux & Windows Server', 'Active Directory', 'Virtualisation (VMware)', 'VPN & Firewall', 'VLAN & switching'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prog-5', type: 'master',
      title: 'Master Cybersécurité & Green IT', level: 'Bac+5', duration: '2 ans',
      description: "Formez-vous à la double expertise la plus recherchée : sécuriser les SI tout en réduisant leur empreinte écologique.",
      fullDescription: "Master expert en sécurité offensive/défensive, SOC, ISO 27001, Green IT et écoconception des SI. 100% alternance, 0€ de frais.",
      icon: 'Shield', color: 'from-slate-600 to-gray-800',
      highlights: ['Pentest & CTF', 'SOC & SIEM', 'Cryptographie', 'Green IT & écoconception', 'ISO 27001', 'Cloud Security'],
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prog-6', type: 'master',
      title: 'Master Performance Énergétique', level: 'Bac+5', duration: '2 ans',
      description: "Devenez expert en efficacité énergétique des bâtiments. Maîtrisez l'audit, la RE2020, le BIM et les énergies renouvelables.",
      fullDescription: "Master expert en audit énergétique, RE2020, BIM, énergies renouvelables et GTB/GTC pour piloter la transition énergétique. 100% alternance.",
      icon: 'Zap', color: 'from-yellow-500 to-green-600',
      highlights: ['Audit énergétique', 'RE2020 & BBC', 'BIM & modélisation', 'Énergies renouvelables', 'GTB/GTC', 'Management de projet'],
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    },
  ],

  about: {
    title: 'Notre Mission',
    description: 'Green Up Academy forme les leaders de la transition écologique et du numérique responsable.',
    mission: "Former des experts opérationnels, engagés et éco-responsables pour les entreprises de demain.",
    vision: "Devenir la référence nationale de la formation en alternance sur les métiers de la transition écologique et numérique.",
    values: ['Innovation', 'Durabilité', 'Excellence', 'Alternance', 'Engagement'],
  },

  whyChooseUs: [
    { id: 'why-1', title: 'Innovation Pédagogique', description: "Méthodes d'apprentissage actives, projets réels avec des entreprises partenaires, et technologies de pointe.", stat: '40+', statLabel: 'Projets/an',        icon: 'Zap'      },
    { id: 'why-2', title: '100% Alternance',        description: 'Immersion professionnelle totale. Vous êtes rémunéré pendant vos études et opérationnel dès la sortie.',             stat: '0€',  statLabel: 'Frais de scolarité', icon: 'Briefcase' },
    { id: 'why-3', title: 'Experts de Terrain',     description: 'Nos intervenants sont des professionnels en activité, leaders dans leurs domaines respectifs.',                        stat: '85%', statLabel: 'Pros en activité',  icon: 'Users'     },
  ],

  // ── 10 témoignages réels ─────────────────────────────────────────────────
  testimonials: [
    {
      id: 't-1',
      name: 'Donfack Synthia Caroline',
      role: 'Étudiante – Présidente du Club IT',
      company: 'GREEN UP ACADEMY',
      program: 'Bachelor 3 – Développement Logiciel',
      image: '/images/etudiant/etudiant1.jpeg',
      rating: 5,
      text: "Dès la première semaine, j'ai compris que cette école était différente. Les cours sont concrets et les formateurs vraiment disponibles. Je ne regrette pas mon choix.",
      quote: "Dès la première semaine, j'ai compris que cette école était différente. Les cours sont concrets et les formateurs vraiment disponibles. Je ne regrette pas mon choix.",
    },
    {
      id: 't-2',
      name: 'Nguefack Saurelle',
      role: 'Étudiante – Présidente de la BDE',
      company: 'GREEN UP ACADEMY',
      program: 'Bachelor 1 – Cybersécurité',
      image: '/images/etudiant/etudiant2.jpeg',
      rating: 5,
      text: "L'ambiance est super et les projets qu'on réalise sont vraiment professionnels. En quelques mois, j'ai déjà un portfolio solide pour décrocher mon alternance.",
      quote: "L'ambiance est super et les projets qu'on réalise sont vraiment professionnels. En quelques mois, j'ai déjà un portfolio solide pour décrocher mon alternance.",
    },
    {
      id: 't-3',
      name: 'Pokam Brunelle',
      role: 'Étudiante en formation',
      company: 'GREEN UP ACADEMY',
      program: 'Bachelor 1 – Administration Réseau',
      image: '/images/etudiant/etudiant3.jpeg',
      rating: 5,
      text: "Je voulais une formation où je pourrais apprendre et travailler en même temps. Green Up Academy m'a offert exactement ça, avec un accompagnement personnalisé.",
      quote: "Je voulais une formation où je pourrais apprendre et travailler en même temps. Green Up Academy m'a offert exactement ça, avec un accompagnement personnalisé.",
    },
    {
      id: 't-4',
      name: 'Tankou Raoult',
      role: 'Étudiant',
      company: 'GREEN UP ACADEMY',
      program: 'Bachelor 3 – Design UI/UX',
      image: '/images/etudiant/etudiant4.jpeg',
      rating: 5,
      text: "Les intervenants sont des professionnels du secteur. Ce qu'on apprend en cours, on l'applique directement en entreprise. C'est une formation très valorisante.",
      quote: "Les intervenants sont des professionnels du secteur. Ce qu'on apprend en cours, on l'applique directement en entreprise. C'est une formation très valorisante.",
    },
    {
      id: 't-5',
      name: 'Sophie Tran',
      role: 'Étudiante en alternance',
      company: 'GREEN UP ACADEMY',
      program: 'Licence 1 – Dev Web',
      image: '/images/etudiant/etudiant5.jpeg',
      rating: 5,
      text: "Green Up Academy m'a aidée à construire mon projet professionnel. Le suivi est régulier et les profs prennent vraiment le temps d'expliquer. Je recommande à 100%.",
      quote: "Green Up Academy m'a aidée à construire mon projet professionnel. Le suivi est régulier et les profs prennent vraiment le temps d'expliquer. Je recommande à 100%.",
    },
    {
      id: 't-6',
      name: 'Leslie Fayelle',
      role: 'Étudiante – Responsable Communication BDE',
      company: 'GREEN UP ACADEMY',
      program: 'Bachelor 3 – Développement Fullstack',
      image: '/images/etudiant/etudiant6.jpg',
      rating: 5,
      text: "Choisir la Green Up Academy a été un vrai tournant pour moi. Grâce à une pédagogie axée sur la pratique et un accompagnement de qualité, j'ai pu acquérir rapidement des compétences solides malgré mon parcours initial différent. Ce que j'apprécie particulièrement, c'est l'ambiance bienveillante et la dynamique de promotion.",
      quote: "Choisir la Green Up Academy a été un vrai tournant pour moi. Grâce à une pédagogie axée sur la pratique et un accompagnement de qualité, j'ai pu acquérir rapidement des compétences solides malgré mon parcours initial différent. Ce que j'apprécie particulièrement, c'est l'ambiance bienveillante et la dynamique de promotion.",
    },
    {
      id: 't-7',
      name: 'Prisca Elaba',
      role: 'Étudiante',
      company: 'GREEN UP ACADEMY',
      program: 'Bachelor 3 – Développement Fullstack',
      image: '/images/etudiant/etudiant7.jpeg',
      rating: 5,
      text: "Je tiens à exprimer toute ma reconnaissance à l'école Green Up Académie pour la qualité de son enseignement et son accompagnement exceptionnel. Grâce à cette école, j'ai pu développer mes compétences, gagner en confiance et mieux préparer mon avenir. Les enseignants sont attentifs, disponibles et toujours prêts à encourager les étudiants à donner le meilleur d'eux-mêmes.",
      quote: "Je tiens à exprimer toute ma reconnaissance à l'école Green Up Académie pour la qualité de son enseignement et son accompagnement exceptionnel. Grâce à cette école, j'ai pu développer mes compétences, gagner en confiance et mieux préparer mon avenir.",
    },
    {
      id: 't-8',
      name: 'Loic Kamga',
      role: 'Étudiant',
      company: 'GREEN UP ACADEMY',
      program: 'Bachelor 3 –  Réseau',
      image: '/images/etudiant/etudiant8.jpeg',
      rating: 5,
      text: "Je poursuis actuellement ma formation au sein de la Green Up Academy Paris et je vis une expérience très enrichissante. La formation est incroyable et l'apprentissage est constant et progressif. Chaque jour, je développe davantage mes compétences grâce à des professeurs compétents, disponibles et investis.",
      quote: "Je poursuis actuellement ma formation au sein de la Green Up Academy Paris et je vis une expérience très enrichissante. La formation est incroyable et l'apprentissage est constant et progressif. Chaque jour, je développe davantage mes compétences grâce à des professeurs compétents, disponibles et investis.",
    },
    {
      id: 't-9',
      name: 'Lucie Bambara',
      role: 'Étudiante en alternance',
      company: 'GREEN UP ACADEMY',
      program: 'Licence 1 – Design',
      image: '/images/etudiant/etudiant9.jpeg',
      rating: 5,
      text: "L'école est moderne, les équipements aussi. On travaille sur des outils professionnels dès la première année. Ça change vraiment la donne pour trouver une alternance.",
      quote: "L'école est moderne, les équipements aussi. On travaille sur des outils professionnels dès la première année. Ça change vraiment la donne pour trouver une alternance.",
    },
    {
      id: 't-10',
      name: 'Nathan Ekwueme',
      role: 'Alternant IT',
      company: 'GREEN UP ACADEMY',
      program: 'Licence 1 – Sécurité & Réseau',
      image: '/images/etudiant/etudiant10.jpeg',
      rating: 5,
      text: "Ce que j'apprécie le plus, c'est la bienveillance de toute l'équipe pédagogique. On se sent soutenu et poussé à donner le meilleur de soi-même.",
      quote: "Ce que j'apprécie le plus, c'est la bienveillance de toute l'équipe pédagogique. On se sent soutenu et poussé à donner le meilleur de soi-même.",
    },
  ],

  partners: [
    { id: 'p-1', name: 'Google',    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',          description: 'Partenaire technologique' },
    { id: 'p-2', name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg', description: 'Partenaire technologique' },
    { id: 'p-3', name: 'Amazon',    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',               description: 'Partenaire cloud'         },
  ],

  header: {
    logoText: 'Green Up Academy',
    logoImage: '',
    navLinks: [
      { label: 'Accueil',    href: '/'           },
      { label: 'Programmes', href: '/programs'   },
      { label: 'Admissions', href: '/admissions' },
      { label: 'Contact',    href: '/contact'    },
    ],
  },

  footer: {
    description: "L'école de la transition écologique et du numérique responsable.",
    copyright: '© 2026 Green Up Academy. Tous droits réservés.',
    links: [],
  },

  contact: {
    email: 'contact@green-up-academy.com',
    phone: '(+33) 7 51 36 09 44',
    address: '15 rue des halles, 75001 Paris',
    director: 'Charles Giscard Fongang',
    hours: 'Lun-Ven 9h-18h',
    social: {
      linkedin:  'https://linkedin.com/',
      instagram: 'https://instagram.com/',
      facebook:  'https://facebook.com/',
      twitter:   'https://twitter.com/',
    },
  },

  ctaDates: {
    title: 'Prêt à transformer votre avenir ?',
    subtitle: "Rejoignez la prochaine promotion de leaders de la transition écologique. Places limitées, candidatures ouvertes jusqu'au 30 juin 2026.",
    dates: [
      { label: '30 Juin',    date: '2026-06-30', description: 'Clôture candidatures' },
      { label: '260 places', date: '',           description: 'Toutes formations'    },
      { label: '48h',        date: '',           description: 'Réponse admission'    },
    ],
  },

  blog: [],
  messages: [],
  applications: [],
  team: [],
  studentActivities: [],
};

export class ContentManager {
  private static instance: ContentManager;
  private content: ContentData;

  private constructor() {
    this.content = this.loadFromStorage();
  }

  static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager();
    }
    return ContentManager.instance;
  }

  private loadFromStorage(): ContentData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Migration automatique : si la version stockée est obsolète, on recharge les données initiales
        // L'admin n'a plus jamais besoin de faire localStorage.removeItem manuellement
        if (!parsed.__version || parsed.__version < CONTENT_VERSION) {
          console.info(`[ContentManager] Migration v${parsed.__version ?? 0} → v${CONTENT_VERSION}, rechargement des données initiales.`);
          return { ...INITIAL_CONTENT };
        }
        return { ...INITIAL_CONTENT, ...parsed };
      }
    } catch (error) {
      console.error('Erreur chargement contenu:', error);
    }
    return { ...INITIAL_CONTENT };
  }

  private saveToStorage(): void {
    try {
      const payload = { ...this.content, __version: CONTENT_VERSION };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      // Notifie useContent dans le même onglet (l'event natif 'storage' ne se déclenche pas dans l'onglet émetteur)
      window.dispatchEvent(new StorageEvent('storage', {
        key: STORAGE_KEY,
        newValue: JSON.stringify(payload),
        storageArea: localStorage,
      }));
    } catch (error) {
      console.error('Erreur sauvegarde contenu:', error);
    }
  }

  // ─── GETTERS ────────────────────────────────────────────────────────
  getAll(): ContentData {
    return { ...this.content };
  }

  getHero() {
    return { ...this.content.hero };
  }

  getPrograms() {
    return [...this.content.programs];
  }

  getProgram(id: string) {
    return this.content.programs.find(p => p.id === id);
  }

  getAbout() {
    return { ...this.content.about };
  }

  getWhyChooseUs() {
    return [...this.content.whyChooseUs];
  }

  getTestimonials() {
    return [...this.content.testimonials];
  }

  getPartners() {
    return [...this.content.partners];
  }

  getHeader() {
    return { ...this.content.header };
  }

  getFooter() {
    return { ...this.content.footer };
  }

  getContact() {
    return { ...this.content.contact };
  }

  getCtaDates() {
    return { ...this.content.ctaDates };
  }

  getBlog() {
    return [...this.content.blog];
  }

  getBlogPost(id: string) {
    return this.content.blog.find(p => p.id === id);
  }

  getMessages() {
    return [...this.content.messages];
  }

  getApplications() {
    return [...this.content.applications];
  }

  // ─── SETTERS: HERO ──────────────────────────────────────────────────
  updateHero(data: Partial<ContentData['hero']>): void {
    this.content.hero = { ...this.content.hero, ...data };
    this.saveToStorage();
  }

  // ─── SETTERS: PROGRAMS ──────────────────────────────────────────────
  addProgram(program: Program): void {
    this.content.programs.push(program);
    this.saveToStorage();
  }

  updateProgram(id: string, data: Partial<Program>): void {
    const program = this.content.programs.find(p => p.id === id);
    if (program) {
      Object.assign(program, data);
      this.saveToStorage();
    }
  }

  deleteProgram(id: string): void {
    this.content.programs = this.content.programs.filter(p => p.id !== id);
    this.saveToStorage();
  }

  // ─── SETTERS: ABOUT ─────────────────────────────────────────────────
  updateAbout(data: Partial<ContentData['about']>): void {
    this.content.about = { ...this.content.about, ...data };
    this.saveToStorage();
  }

  // ─── SETTERS: WHY CHOOSE US ─────────────────────────────────────────
  addFeature(feature: Feature): void {
    this.content.whyChooseUs.push(feature);
    this.saveToStorage();
  }

  updateFeature(id: string, data: Partial<Feature>): void {
    const feature = this.content.whyChooseUs.find(f => f.id === id);
    if (feature) {
      Object.assign(feature, data);
      this.saveToStorage();
    }
  }

  deleteFeature(id: string): void {
    this.content.whyChooseUs = this.content.whyChooseUs.filter(f => f.id !== id);
    this.saveToStorage();
  }

  // ─── SETTERS: TESTIMONIALS ─────────────────────────────────────────
  addTestimonial(testimonial: Testimonial): void {
    this.content.testimonials.push(testimonial);
    this.saveToStorage();
  }

  updateTestimonial(id: string, data: Partial<Testimonial>): void {
    const testimonial = this.content.testimonials.find(t => t.id === id);
    if (testimonial) {
      Object.assign(testimonial, data);
      this.saveToStorage();
    }
  }

  deleteTestimonial(id: string): void {
    this.content.testimonials = this.content.testimonials.filter(t => t.id !== id);
    this.saveToStorage();
  }

  // ─── SETTERS: BLOG ──────────────────────────────────────────────────
  addBlogPost(post: BlogPost): void {
    this.content.blog.push(post);
    this.saveToStorage();
  }

  updateBlogPost(id: string, data: Partial<BlogPost>): void {
    const post = this.content.blog.find(p => p.id === id);
    if (post) {
      Object.assign(post, data);
      this.saveToStorage();
    }
  }

  deleteBlogPost(id: string): void {
    this.content.blog = this.content.blog.filter(p => p.id !== id);
    this.saveToStorage();
  }

  // ─── SETTERS: BLOG COMMENTS & REACTIONS ────────────────────────────
  addBlogComment(postId: string, comment: BlogComment): void {
    const post = this.content.blog.find(p => p.id === postId);
    if (post) {
      post.comments.push(comment);
      this.saveToStorage();
    }
  }

  deleteBlogComment(postId: string, commentId: string): void {
    const post = this.content.blog.find(p => p.id === postId);
    if (post) {
      post.comments = post.comments.filter(c => c.id !== commentId);
      this.saveToStorage();
    }
  }

  addBlogReaction(postId: string, emoji: string, userId: string): void {
    const post = this.content.blog.find(p => p.id === postId);
    if (post) {
      if (!post.reactions[emoji]) {
        post.reactions[emoji] = [];
      }
      // Un seul emoji par utilisateur
      const hasReacted = Object.values(post.reactions).some(users => users.includes(userId));
      if (!hasReacted) {
        post.reactions[emoji].push(userId);
        this.saveToStorage();
      }
    }
  }

  removeBlogReaction(postId: string, emoji: string, userId: string): void {
    const post = this.content.blog.find(p => p.id === postId);
    if (post && post.reactions[emoji]) {
      post.reactions[emoji] = post.reactions[emoji].filter(u => u !== userId);
      this.saveToStorage();
    }
  }

  // ─── SETTERS: MESSAGES ──────────────────────────────────────────────
  addMessage(message: Message): void {
    this.content.messages.push(message);
    this.saveToStorage();
  }

  markMessageAsRead(messageId: string): void {
    const message = this.content.messages.find(m => m.id === messageId);
    if (message) {
      message.read = true;
      this.saveToStorage();
    }
  }

  addMessageReply(messageId: string, reply: Message): void {
    const message = this.content.messages.find(m => m.id === messageId);
    if (message) {
      message.replies.push(reply);
      message.replied = true;
      this.saveToStorage();
    }
  }

  deleteMessage(messageId: string): void {
    this.content.messages = this.content.messages.filter(m => m.id !== messageId);
    this.saveToStorage();
  }

  // ─── SETTERS: APPLICATIONS ──────────────────────────────────────────
  addApplication(app: Application): void {
    this.content.applications.push(app);
    this.content.messages.push({
      id: `msg-app-${app.id}`,
      type: 'application',
      subject: `Candidature - ${app.program}`,
      from: `${app.firstName} ${app.lastName}`,
      email: app.email,
      message: app.motivation,
      date: app.date,
      read: false,
      replied: false,
      replies: [],
      applicationData: app,
    });
    this.saveToStorage();
  }

  updateApplicationStatus(appId: string, status: 'new' | 'reviewing' | 'accepted' | 'rejected'): void {
    const app = this.content.applications.find(a => a.id === appId);
    if (app) {
      app.status = status;
      this.saveToStorage();
    }
  }

  deleteApplication(appId: string): void {
    this.content.applications = this.content.applications.filter(a => a.id !== appId);
    this.content.messages = this.content.messages.filter(m => m.applicationData?.id !== appId);
    this.saveToStorage();
  }

  // ─── SETTERS: TEAM / GOVERNANCE ────────────────────────────────────
  addTeamMember(member: TeamMember): void {
    if (!this.content.team) {
      this.content.team = [];
    }
    this.content.team.push({ ...member, id: member.id || `team-${Date.now()}` });
    this.saveToStorage();
  }

  updateTeamMember(id: string, data: Partial<TeamMember>): void {
    if (!this.content.team) return;
    const member = this.content.team.find(m => m.id === id);
    if (member) {
      Object.assign(member, data);
      this.saveToStorage();
    }
  }

  deleteTeamMember(id: string): void {
    if (!this.content.team) return;
    this.content.team = this.content.team.filter(m => m.id !== id);
    this.saveToStorage();
  }

  // ─── SETTERS: STUDENT ACTIVITIES ───────────────────────────────────
  addStudentActivity(activity: StudentActivity): void {
    if (!this.content.studentActivities) {
      this.content.studentActivities = [];
    }
    this.content.studentActivities.push({ ...activity, id: activity.id || `activity-${Date.now()}` });
    this.saveToStorage();
  }

  updateStudentActivity(id: string, data: Partial<StudentActivity>): void {
    if (!this.content.studentActivities) return;
    const activity = this.content.studentActivities.find(a => a.id === id);
    if (activity) {
      Object.assign(activity, data);
      this.saveToStorage();
    }
  }

  deleteStudentActivity(id: string): void {
    if (!this.content.studentActivities) return;
    this.content.studentActivities = this.content.studentActivities.filter(a => a.id !== id);
    this.saveToStorage();
  }

  // ─── SETTERS: AUTRES ────────────────────────────────────────────────
  updateAboutSection(data: Partial<ContentData['about']>): void {
    this.content.about = { ...this.content.about, ...data };
    this.saveToStorage();
  }

  updateContactSection(data: Partial<ContentData['contact']>): void {
    this.content.contact = { ...this.content.contact, ...data };
    this.saveToStorage();
  }

  updateHeader(data: Partial<ContentData['header']>): void {
    this.content.header = { ...this.content.header, ...data };
    this.saveToStorage();
  }

  updateFooter(data: Partial<ContentData['footer']>): void {
    this.content.footer = { ...this.content.footer, ...data };
    this.saveToStorage();
  }

  // ─── EXPORT/IMPORT ──────────────────────────────────────────────────
  export(): string {
    return JSON.stringify(this.content, null, 2);
  }

  import(data: string): boolean {
    try {
      const parsed = JSON.parse(data);
      this.content = { ...INITIAL_CONTENT, ...parsed };
      this.saveToStorage();
      return true;
    } catch {
      return false;
    }
  }

  reset(): void {
    this.content = { ...INITIAL_CONTENT };
    this.saveToStorage();
  }
}

export default ContentManager.getInstance();