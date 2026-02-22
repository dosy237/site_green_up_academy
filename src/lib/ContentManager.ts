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

const INITIAL_CONTENT: ContentData = {
  hero: {
    title: "Devenez l'Expert de la Transition Écologique",
    subtitle: "Formez-vous aux métiers de demain avec nos parcours d'excellence.",
    backgroundImage: '',
    ctaText: 'Candidater maintenant',
    ctaHref: '/admissions',
  },
  programs: [
    {
      id: 'prog-1',
      title: 'Bachelor Administration',
      level: 'Bac+3',
      duration: '3 ans',
      description: 'Gestion et management en alternance',
      fullDescription: 'Formation complète en gestion d\'entreprise...',
      icon: 'Briefcase',
      color: '#1FAB89',
      highlights: ['Manager de projet', 'Chef de service'],
      image: '',
      type: 'bachelor',
    },
  ],
  about: {
    title: 'Notre Mission',
    description: 'Green Up Academy forme les leaders de la transition écologique',
    mission: 'Créer les experts de demain',
    vision: 'Former 1000 experts d\'ici 2030',
    values: ['Innovation', 'Durabilité', 'Excellence'],
  },
  whyChooseUs: [],
  testimonials: [],
  partners: [],
  header: {
    logoText: 'Green Up Academy',
    logoImage: '',
    navLinks: [
      { label: 'Accueil', href: '/' },
      { label: 'Programmes', href: '/programs' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  footer: {
    description: 'L\'école de la transition écologique',
    copyright: '© 2026 Green Up Academy',
    links: [],
  },
  contact: {
    email: 'contact@green-up-academy.com',
    phone: '(+33) 7 51 36 09 44',
    address: '15 rue des halles, 75001 Paris',
    director: 'Jean Dupont',
    hours: 'Lun-Ven 9h-17h',
    social: {
      linkedin: 'https://linkedin.com/...',
      instagram: 'https://instagram.com/...',
      facebook: 'https://facebook.com/...',
      twitter: 'https://twitter.com/...',
    },
  },
  ctaDates: {
    title: 'Prêt à transformer votre avenir ?',
    subtitle: 'Candidatures 2026 ouvertes',
    dates: [
      { label: '30 Juin', date: '2026-06-30', description: 'Clôture candidatures' },
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
        return { ...INITIAL_CONTENT, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Erreur chargement contenu:', error);
    }
    return { ...INITIAL_CONTENT };
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.content));
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
