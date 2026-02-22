import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Program {
  id: string;
  title: string;
  type: 'bachelor' | 'master' | 'continue';
  duration: string;
  level: string;
  price: string;
  image: string;
  description: string;
  highlights: string[];
  color: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  category: 'direction' | 'board' | 'scientific';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  program: string;
  quote: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  author: string;
  published: boolean;
  reactions: Record<string, string[]>; // emoji -> array of userIds
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface Lab {
  id: string;
  title: string;
  description: string;
  projects: number;
  icon: string;
}

export interface Club {
  id: string;
  name: string;
  desc: string;
  icon: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
}

export interface Application {
  id: string;
  date: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  birthPlace: string;
  nationality: string;
  address: string;
  diploma: string;
  school: string;
  specialite: string;
  year: string;
  gpa: string;
  program: string;
  programNiveau: string;
  startDate: string;
  motivation: string;
  experience: string;
  files: string[];
  status: 'nouveau' | 'en_etude' | 'accepté' | 'refusé';
  read: boolean;
  adminReply?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
}

export interface WhyItem {
  id: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  icon: string;
}

export interface SiteData {
  // ── Global
  schoolName: string;
  schoolTagline: string;
  schoolDescription: string;
  logo: string;

  // ── Hero
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroCtaText: string;

  // ── Contact
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  contactDirector: string;
  socialFacebook: string;
  socialLinkedin: string;
  socialInstagram: string;
  socialTwitter: string;
  socialYoutube: string;

  // ── CTA Section
  ctaTitle: string;
  ctaSubtitle: string;
  ctaDates: { label: string; sub: string }[];

  // ── Programmes
  programs: Program[];

  // ── Équipe
  team: TeamMember[];

  // ── Témoignages
  testimonials: Testimonial[];

  // ── Blog
  posts: BlogPost[];

  // ── Candidatures
  applications: Application[];

  // ── Partenaires
  partners: Partner[];

  // ── WhyChooseUs
  whyChooseUs: WhyItem[];

  // ── Recherche
  labs: Lab[];

  // ── Vie étudiante
  clubs: Club[];
  events: Event[];
  campusImages: string[];

  // ── Footer newsletter
  newsletterTitle: string;
  newsletterSubtitle: string;
}

// ─── Données initiales ────────────────────────────────────────────────────────
const DEFAULT_DATA: SiteData = {
  schoolName: 'Green Up Academy',
  schoolTagline: "L'école de référence pour les métiers de la transition écologique et du numérique responsable.",
  schoolDescription: "Green Up Academy forme les experts de demain en performance énergétique, développement durable et numérique responsable.",
  logo: '/src/Frame%205.svg',

  heroTitle: "Devenez l'Expert de la Transition Écologique",
  heroSubtitle: "Formez-vous aux métiers de demain avec nos parcours d'excellence en performance énergétique, RSE et développement durable.",
  heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
  heroCtaText: 'Postuler maintenant',

  contactEmail: 'dosyca35@gmail.com',
  contactPhone: '(+33) 7 51 36 09 44',
  contactAddress: 'Boussy-Saint-Antoine, 91480 Essonne, France',
  contactDirector: 'Charles Giscard Fongang',
  socialFacebook: '#',
  socialLinkedin: '#',
  socialInstagram: '#',
  socialTwitter: '#',
  socialYoutube: '#',

  ctaTitle: "Prêt à transformer votre avenir ?",
  ctaSubtitle: "Rejoignez la prochaine promotion de leaders de la transition écologique. Places limitées, candidatures ouvertes jusqu'au 30 juin 2026.",
  ctaDates: [
    { label: '30 Juin', sub: 'Clôture candidatures' },
    { label: '6 formations', sub: 'Disponibles' },
    { label: '48h', sub: 'Réponse admission' },
  ],

  programs: [
    {
      id: 'p1', title: 'Bachelor Performance Énergétique', type: 'bachelor',
      duration: '3 ans', level: 'Bac+3', price: 'Gratuit (Alternance)',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      description: 'Devenez expert en efficacité énergétique des bâtiments et des procédés industriels.',
      highlights: ['Audit énergétique', 'Réglementation thermique', 'BIM & Modélisation'],
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'p2', title: 'Bachelor Développement Logiciel', type: 'bachelor',
      duration: '3 ans', level: 'Bac+3', price: 'Gratuit (Alternance)',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      description: 'Maîtrisez le développement web et mobile, de la conception au déploiement.',
      highlights: ['React / Node.js', 'Architecture logicielle', 'DevOps'],
      color: 'from-blue-500 to-cyan-600',
    },
    {
      id: 'p3', title: 'Bachelor Design', type: 'bachelor',
      duration: '3 ans', level: 'Bac+3', price: 'Gratuit (Alternance)',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
      description: 'Créez des expériences visuelles et numériques qui marquent les esprits.',
      highlights: ['UX/UI Design', 'Motion Design', 'Identité visuelle'],
      color: 'from-violet-500 to-purple-600',
    },
    {
      id: 'p4', title: 'Bachelor Sécurité et Administration Réseaux', type: 'bachelor',
      duration: '3 ans', level: 'Bac+3', price: 'Gratuit (Alternance)',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      description: 'Protégez les infrastructures et gérez les systèmes d\'information.',
      highlights: ['Sécurité des SI', 'Administration réseau', 'Cloud Computing'],
      color: 'from-slate-500 to-gray-700',
    },
    {
      id: 'p5', title: 'Master Cybersécurité & Green IT', type: 'master',
      duration: '2 ans', level: 'Bac+5', price: 'Gratuit (Alternance)',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      description: 'Sécurisez les infrastructures numériques tout en minimisant leur impact environnemental.',
      highlights: ['Sécurité avancée', 'Data centers verts', 'IA éthique'],
      color: 'from-blue-600 to-indigo-700',
    },
    {
      id: 'p6', title: 'Master Performance Énergétique', type: 'master',
      duration: '2 ans', level: 'Bac+5', price: 'Gratuit (Alternance)',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
      description: "Expertise avancée en audit et rénovation énergétique pour l'industrie et le bâtiment.",
      highlights: ['Audit réglementaire', 'BEMS', 'Financement RE'],
      color: 'from-green-500 to-emerald-700',
    },
    {
      id: 'p7', title: 'Master Management Durable', type: 'master',
      duration: '2 ans', level: 'Bac+5', price: 'Gratuit (Alternance)',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?auto=format&fit=crop&w=800&q=80',
      description: 'Pilotez la stratégie RSE et la transition écologique des entreprises.',
      highlights: ['Stratégie RSE', 'Finance durable', 'Conduite du changement'],
      color: 'from-amber-500 to-orange-600',
    },
  ],

  team: [
    {
      id: 't1', name: 'Charles Giscard Fongang', role: 'Président', category: 'direction',
      bio: "Ancien directeur RSE d'un groupe du CAC40, expert en stratégie durable.",
      image: '/PRESI.jpeg',
    },
    {
      id: 't2', name: 'Nadie Belocime', role: 'Directrice Générale', category: 'direction',
      bio: "Docteur en Sciences de l'Environnement, 15 ans d'expérience dans l'enseignement supérieur.",
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      id: 't3', name: 'Pierre Martin', role: 'Directeur Pédagogique', category: 'direction',
      bio: "Ingénieur pédagogique spécialisé dans les méthodes d'apprentissage actives.",
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    ...Array.from({ length: 8 }, (_, i) => ({
      id: `b${i+1}`,
      name: `Membre Conseil ${i+1}`,
      role: i % 2 === 0 ? 'Expert Industriel' : 'Représentant Académique',
      bio: 'Membre du conseil d\'administration engagé dans la transformation écologique.',
      image: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 10}.jpg`,
      category: 'board' as const,
    })),
  ],

  testimonials: [
    {
      id: 'test1', name: 'Alexandre Dubois', role: 'Ingénieur Green IT', company: 'Capgemini',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      program: 'Master Cybersécurité & Green IT 2024', rating: 5,
      quote: "La formation m'a donné toutes les compétences pour réussir dans le numérique responsable. Aujourd'hui, j'aide les grandes entreprises à réduire l'empreinte carbone de leurs systèmes.",
    },
    {
      id: 'test2', name: 'Sarah Martin', role: 'Cheffe de projet RSE', company: "L'Oréal",
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      program: 'Master Management Durable 2023', rating: 5,
      quote: "L'alternance chez L'Oréal pendant ma formation a été un véritable tremplin. Les cours étaient directement applicables et l'équipe pédagogique exceptionnelle.",
    },
    {
      id: 'test3', name: 'Lucas Bernard', role: 'Ingénieur Efficacité Énergétique', company: 'EDF',
      image: 'https://randomuser.me/api/portraits/men/86.jpg',
      program: 'Bachelor Performance Énergétique 2022', rating: 5,
      quote: "Une formation complète qui m'a donné toutes les compétences techniques et relationnelles pour réussir. Le réseau d'anciens est un vrai plus.",
    },
  ],

  posts: [
    {
      id: 'post1',
      title: "L'impact du Green IT sur la consommation mondiale",
      excerpt: "Analyse des dernières tendances pour réduire l'empreinte carbone du numérique.",
      content: "Le numérique représente aujourd'hui environ 4% des émissions mondiales de gaz à effet de serre, un chiffre qui pourrait doubler d'ici 2025. Face à cette réalité, le Green IT s'impose comme une discipline incontournable pour les entreprises soucieuses de leur impact environnemental.\n\nNos étudiants en Master Cybersécurité & Green IT travaillent directement sur ces problématiques avec nos partenaires industriels, développant des solutions concrètes pour optimiser la consommation des data centers et réduire le cycle de vie des équipements numériques.",
      date: '28 Jan 2026',
      category: 'Green IT',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      author: 'Équipe pédagogique',
      published: true,
      reactions: {},
      comments: [],
    },
    {
      id: 'post2',
      title: 'Rénovation énergétique : les nouvelles normes 2026',
      excerpt: "Tout ce qu'il faut savoir sur la réglementation RE2020 et ses évolutions.",
      content: "La réglementation environnementale RE2020 continue d'évoluer en 2026, avec de nouvelles exigences sur la performance énergétique des bâtiments neufs et rénovés. Pour les professionnels du secteur, ces changements représentent à la fois un défi et une opportunité.\n\nNotre Bachelor Performance Énergétique prépare précisément les étudiants à maîtriser ces réglementations et à accompagner les maîtres d'ouvrage dans leurs projets de rénovation.",
      date: '25 Jan 2026',
      category: 'Réglementation',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      author: 'Direction pédagogique',
      published: true,
      reactions: {},
      comments: [],
    },
    {
      id: 'post3',
      title: 'Retour sur le Hackathon Climat',
      excerpt: 'Nos étudiants ont brillé lors de cette édition avec 3 projets primés.',
      content: "Le Hackathon Climat 2026 a réuni plus de 500 participants provenant de 30 écoles françaises. Green Up Academy s'est distinguée avec 3 projets dans le top 10 et une victoire dans la catégorie 'Innovation Énergétique'.\n\nL'équipe gagnante a développé une application mobile permettant aux copropriétés de suivre en temps réel leur consommation énergétique et d'identifier les postes de dépenses à optimiser.",
      date: '15 Jan 2026',
      category: 'Vie Étudiante',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      author: 'Service Communication',
      published: true,
      reactions: {},
      comments: [],
    },
  ],

  applications: [],

  partners: [
    { id: 'par1', name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', website: '#' },
    { id: 'par2', name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg', website: '#' },
    { id: 'par3', name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', website: '#' },
    { id: 'par4', name: 'EDF', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/EDF_logo.svg/800px-EDF_logo.svg.png', website: '#' },
  ],

  whyChooseUs: [
    { id: 'w1', title: 'Innovation Pédagogique', description: "Méthodes d'apprentissage actives, projets réels avec des entreprises partenaires, et technologies de pointe.", stat: '40+', statLabel: 'Projets/an', icon: 'Zap' },
    { id: 'w2', title: '100% Alternance', description: 'Immersion professionnelle totale. Vous êtes rémunéré pendant vos études et opérationnel dès la sortie.', stat: '0€', statLabel: 'Frais de scolarité', icon: 'Briefcase' },
    { id: 'w3', title: 'Experts de Terrain', description: 'Nos intervenants sont des professionnels en activité, leaders dans leurs domaines respectifs.', stat: '85%', statLabel: 'Pros en activité', icon: 'Users' },
    { id: 'w4', title: 'Réseau Alumni', description: 'Rejoignez une communauté de diplômés actifs dans les meilleures entreprises du secteur.', stat: '500+', statLabel: 'Diplômés placés', icon: 'Award' },
  ],

  labs: [
    { id: 'l1', title: 'Green IT Lab', description: 'Optimisation de la consommation énergétique des data centers et algorithmes frugaux.', projects: 12, icon: 'Cpu' },
    { id: 'l2', title: 'Energy Performance Lab', description: 'Nouveaux matériaux isolants et systèmes de gestion intelligente des bâtiments (BMS).', projects: 8, icon: 'Microscope' },
    { id: 'l3', title: 'Sustainable Business Lab', description: 'Modèles économiques circulaires et finance verte pour la transition.', projects: 5, icon: 'Globe' },
  ],

  clubs: [
    { id: 'c1', name: 'Green Tech Club', desc: 'Projets tech éco-responsables et veille technologique.', icon: 'Leaf' },
    { id: 'c2', name: 'Association Sportive', desc: 'Sports collectifs, bien-être et cohésion d\'équipe.', icon: 'Activity' },
    { id: 'c3', name: 'Junior Entreprise', desc: 'Missions réelles pour des clients professionnels.', icon: 'Briefcase' },
    { id: 'c4', name: 'Bureau Des Étudiants', desc: 'Organisation des événements culturels et festifs.', icon: 'Music' },
  ],

  events: [
    { id: 'e1', title: 'Forum des Alternances', date: '15 Mar 2026', location: 'Campus Principal', type: 'Carrières' },
    { id: 'e2', title: 'Hackathon Énergie', date: '28 Mar 2026', location: 'En ligne', type: 'Innovation' },
    { id: 'e3', title: 'Portes Ouvertes', date: '12 Avr 2026', location: 'Campus Principal', type: 'Information' },
  ],

  campusImages: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
  ],

  newsletterTitle: "Restez informé de la transition",
  newsletterSubtitle: "Recevez nos actualités, conseils carrière et invitations aux événements.",
};

// ─── Context ──────────────────────────────────────────────────────────────────
interface SiteContextType {
  data: SiteData;
  update: (patch: Partial<SiteData>) => void;
  updateProgram: (id: string, patch: Partial<Program>) => void;
  deleteProgram: (id: string) => void;
  addProgram: (prog: Program) => void;
  updateTeamMember: (id: string, patch: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  addTeamMember: (m: TeamMember) => void;
  updateTestimonial: (id: string, patch: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  addTestimonial: (t: Testimonial) => void;
  updatePost: (id: string, patch: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  addPost: (p: BlogPost) => void;
  addApplication: (a: Application) => void;
  updateApplication: (id: string, patch: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
  updatePartner: (id: string, patch: Partial<Partner>) => void;
  deletePartner: (id: string) => void;
  addPartner: (p: Partner) => void;
  updateWhyItem: (id: string, patch: Partial<WhyItem>) => void;
  updateLab: (id: string, patch: Partial<Lab>) => void;
  deleteLab: (id: string) => void;
  addLab: (l: Lab) => void;
  updateClub: (id: string, patch: Partial<Club>) => void;
  deleteClub: (id: string) => void;
  addClub: (c: Club) => void;
  updateEvent: (id: string, patch: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  addEvent: (e: Event) => void;
  reactToPost: (postId: string, emoji: string, userId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
  deleteComment: (postId: string, commentId: string) => void;
  resetToDefaults: () => void;
}

const SiteContext = createContext<SiteContextType | null>(null);

const STORAGE_KEY = 'greenup_site_data_v3';

function loadData(): SiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DATA;
    const stored = JSON.parse(raw);
    // Merge pour ne pas perdre de nouveaux champs
    return { ...DEFAULT_DATA, ...stored };
  } catch {
    return DEFAULT_DATA;
  }
}

function saveData(data: SiteData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Erreur sauvegarde localStorage:', e);
  }
}

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(loadData);

  // Persistance auto
  useEffect(() => { saveData(data); }, [data]);

  const update = useCallback((patch: Partial<SiteData>) => {
    setData(d => ({ ...d, ...patch }));
  }, []);

  // ── Programs ─────────────────────────────────────────────────────────────
  const updateProgram = useCallback((id: string, patch: Partial<Program>) => {
    setData(d => ({ ...d, programs: d.programs.map(p => p.id === id ? { ...p, ...patch } : p) }));
  }, []);
  const deleteProgram = useCallback((id: string) => {
    setData(d => ({ ...d, programs: d.programs.filter(p => p.id !== id) }));
  }, []);
  const addProgram = useCallback((prog: Program) => {
    setData(d => ({ ...d, programs: [...d.programs, prog] }));
  }, []);

  // ── Team ─────────────────────────────────────────────────────────────────
  const updateTeamMember = useCallback((id: string, patch: Partial<TeamMember>) => {
    setData(d => ({ ...d, team: d.team.map(m => m.id === id ? { ...m, ...patch } : m) }));
  }, []);
  const deleteTeamMember = useCallback((id: string) => {
    setData(d => ({ ...d, team: d.team.filter(m => m.id !== id) }));
  }, []);
  const addTeamMember = useCallback((m: TeamMember) => {
    setData(d => ({ ...d, team: [...d.team, m] }));
  }, []);

  // ── Testimonials ──────────────────────────────────────────────────────────
  const updateTestimonial = useCallback((id: string, patch: Partial<Testimonial>) => {
    setData(d => ({ ...d, testimonials: d.testimonials.map(t => t.id === id ? { ...t, ...patch } : t) }));
  }, []);
  const deleteTestimonial = useCallback((id: string) => {
    setData(d => ({ ...d, testimonials: d.testimonials.filter(t => t.id !== id) }));
  }, []);
  const addTestimonial = useCallback((t: Testimonial) => {
    setData(d => ({ ...d, testimonials: [...d.testimonials, t] }));
  }, []);

  // ── Posts ─────────────────────────────────────────────────────────────────
  const updatePost = useCallback((id: string, patch: Partial<BlogPost>) => {
    setData(d => ({ ...d, posts: d.posts.map(p => p.id === id ? { ...p, ...patch } : p) }));
  }, []);
  const deletePost = useCallback((id: string) => {
    setData(d => ({ ...d, posts: d.posts.filter(p => p.id !== id) }));
  }, []);
  const addPost = useCallback((p: BlogPost) => {
    setData(d => ({ ...d, posts: [p, ...d.posts] }));
  }, []);

  // ── Reactions & Comments ──────────────────────────────────────────────────
  const reactToPost = useCallback((postId: string, emoji: string, userId: string) => {
    setData(d => ({
      ...d,
      posts: d.posts.map(p => {
        if (p.id !== postId) return p;
        const reactions = { ...p.reactions };
        // Retirer toute réaction précédente de cet user
        Object.keys(reactions).forEach(e => {
          reactions[e] = reactions[e].filter(uid => uid !== userId);
          if (reactions[e].length === 0) delete reactions[e];
        });
        // Ajouter nouvelle réaction (ou désactiver si même emoji)
        const already = p.reactions[emoji]?.includes(userId);
        if (!already) {
          reactions[emoji] = [...(reactions[emoji] || []), userId];
        }
        return { ...p, reactions };
      }),
    }));
  }, []);

  const addComment = useCallback((postId: string, comment: Comment) => {
    setData(d => ({
      ...d,
      posts: d.posts.map(p => p.id === postId ? { ...p, comments: [...p.comments, comment] } : p),
    }));
  }, []);

  const deleteComment = useCallback((postId: string, commentId: string) => {
    setData(d => ({
      ...d,
      posts: d.posts.map(p => p.id === postId
        ? { ...p, comments: p.comments.filter(c => c.id !== commentId) }
        : p),
    }));
  }, []);

  // ── Applications ──────────────────────────────────────────────────────────
  const addApplication = useCallback((a: Application) => {
    setData(d => ({ ...d, applications: [a, ...d.applications] }));
  }, []);
  const updateApplication = useCallback((id: string, patch: Partial<Application>) => {
    setData(d => ({ ...d, applications: d.applications.map(a => a.id === id ? { ...a, ...patch } : a) }));
  }, []);
  const deleteApplication = useCallback((id: string) => {
    setData(d => ({ ...d, applications: d.applications.filter(a => a.id !== id) }));
  }, []);

  // ── Partners ──────────────────────────────────────────────────────────────
  const updatePartner = useCallback((id: string, patch: Partial<Partner>) => {
    setData(d => ({ ...d, partners: d.partners.map(p => p.id === id ? { ...p, ...patch } : p) }));
  }, []);
  const deletePartner = useCallback((id: string) => {
    setData(d => ({ ...d, partners: d.partners.filter(p => p.id !== id) }));
  }, []);
  const addPartner = useCallback((p: Partner) => {
    setData(d => ({ ...d, partners: [...d.partners, p] }));
  }, []);

  // ── WhyChooseUs ───────────────────────────────────────────────────────────
  const updateWhyItem = useCallback((id: string, patch: Partial<WhyItem>) => {
    setData(d => ({ ...d, whyChooseUs: d.whyChooseUs.map(w => w.id === id ? { ...w, ...patch } : w) }));
  }, []);

  // ── Labs ──────────────────────────────────────────────────────────────────
  const updateLab = useCallback((id: string, patch: Partial<Lab>) => {
    setData(d => ({ ...d, labs: d.labs.map(l => l.id === id ? { ...l, ...patch } : l) }));
  }, []);
  const deleteLab = useCallback((id: string) => {
    setData(d => ({ ...d, labs: d.labs.filter(l => l.id !== id) }));
  }, []);
  const addLab = useCallback((l: Lab) => {
    setData(d => ({ ...d, labs: [...d.labs, l] }));
  }, []);

  // ── Clubs ─────────────────────────────────────────────────────────────────
  const updateClub = useCallback((id: string, patch: Partial<Club>) => {
    setData(d => ({ ...d, clubs: d.clubs.map(c => c.id === id ? { ...c, ...patch } : c) }));
  }, []);
  const deleteClub = useCallback((id: string) => {
    setData(d => ({ ...d, clubs: d.clubs.filter(c => c.id !== id) }));
  }, []);
  const addClub = useCallback((c: Club) => {
    setData(d => ({ ...d, clubs: [...d.clubs, c] }));
  }, []);

  // ── Events ────────────────────────────────────────────────────────────────
  const updateEvent = useCallback((id: string, patch: Partial<Event>) => {
    setData(d => ({ ...d, events: d.events.map(e => e.id === id ? { ...e, ...patch } : e) }));
  }, []);
  const deleteEvent = useCallback((id: string) => {
    setData(d => ({ ...d, events: d.events.filter(e => e.id !== id) }));
  }, []);
  const addEvent = useCallback((e: Event) => {
    setData(d => ({ ...d, events: [...d.events, e] }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setData(DEFAULT_DATA);
  }, []);

  return (
    <SiteContext.Provider value={{
      data, update,
      updateProgram, deleteProgram, addProgram,
      updateTeamMember, deleteTeamMember, addTeamMember,
      updateTestimonial, deleteTestimonial, addTestimonial,
      updatePost, deletePost, addPost,
      addApplication, updateApplication, deleteApplication,
      updatePartner, deletePartner, addPartner,
      updateWhyItem,
      updateLab, deleteLab, addLab,
      updateClub, deleteClub, addClub,
      updateEvent, deleteEvent, addEvent,
      reactToPost, addComment, deleteComment,
      resetToDefaults,
    }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside SiteProvider');
  return ctx;
}