import { useState } from 'react';
import {
  Clock, Award, Users, CheckCircle, ArrowRight,
  X, BookOpen, Briefcase, TrendingUp, ChevronDown, ChevronUp,
  Monitor, Palette, Network, Shield, Zap, Building2
} from 'lucide-react';

interface Module { semestre: string; cours: string[] }
interface Program {
  id: number; type: 'bachelor' | 'master';
  title: string; subtitle: string; duration: string; level: string;
  rhythm: string; places: number; image: string; heroImage: string;
  icon: React.ElementType; isMaster: boolean;
  description: string; objectifs: string[]; debouches: string[]; competences: string[];
  modules: Module[];
}

const programs: Program[] = [
  {
    id: 1, type: 'bachelor', isMaster: false,
    title: 'Bachelor Administration des Entreprises',
    subtitle: 'Gestion, management & entrepreneuriat',
    duration: '3 ans', level: 'Bac+3', rhythm: '3 sem. entreprise / 1 sem. école', places: 30,
    image: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    icon: Building2,
    description: "Formez-vous à la gestion globale d'une entreprise : administration, finance, ressources humaines et stratégie. Une formation généraliste et opérationnelle qui prépare aux rôles de manager et d'entrepreneur.",
    objectifs: ["Maîtriser les fondamentaux de la gestion d'entreprise", 'Piloter des projets transversaux en équipe', 'Analyser des données financières et prendre des décisions stratégiques', 'Communiquer efficacement en contexte professionnel'],
    competences: ['Comptabilité & Finance', 'RH & Management', 'Droit des affaires', 'Marketing digital', 'Gestion de projet', 'Entrepreneuriat'],
    debouches: ['Assistant de direction', 'Chargé de gestion PME', 'Office manager', 'Responsable administratif', 'Consultant junior', 'Chef de projet'],
    modules: [
      { semestre: 'S1', cours: ['Fondamentaux de la comptabilité', 'Introduction au droit des affaires', 'Communication professionnelle', 'Excel & outils bureautiques'] },
      { semestre: 'S2', cours: ['Gestion financière', 'Marketing fondamental', 'Organisation & management', 'Anglais des affaires'] },
      { semestre: 'S3', cours: ['Droit du travail', 'Gestion des ressources humaines', "Fiscalité d'entreprise", 'Projet tutoré'] },
      { semestre: 'S4', cours: ['Analyse financière avancée', "Stratégie d'entreprise", 'Management de projet', 'Mémoire professionnel'] },
    ],
  },
  {
    id: 2, type: 'bachelor', isMaster: false,
    title: 'Bachelor Design',
    subtitle: 'UX/UI, design graphique & création visuelle',
    duration: '3 ans', level: 'Bac+3', rhythm: '3 sem. entreprise / 1 sem. école', places: 25,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
    icon: Palette,
    description: "Maîtrisez les outils et les méthodes du design contemporain : identité visuelle, interfaces numériques, UX research et motion design. Préparez-vous à concevoir des expériences utilisateur mémorables.",
    objectifs: ['Concevoir des interfaces intuitives et esthétiques', 'Maîtriser les outils professionnels (Figma, Adobe Suite)', 'Appliquer les principes UX Research et les tests utilisateurs', 'Construire une identité de marque cohérente'],
    competences: ['Figma & Prototypage', 'Adobe Illustrator & Photoshop', 'UX Research', 'Typography & Color', 'Motion Design', 'Design System'],
    debouches: ['Designer UI/UX', 'Graphiste', 'Motion designer', 'Web designer', 'Product designer', 'Art director junior'],
    modules: [
      { semestre: 'S1', cours: ['Fondamentaux du design graphique', 'Typographie & couleurs', 'Introduction à Figma', 'Histoire du design'] },
      { semestre: 'S2', cours: ['UX Research & personas', 'Adobe Suite avancé', 'Wireframing & prototypage', 'Design responsive'] },
      { semestre: 'S3', cours: ['Design system & composants', 'Motion design', 'Accessibilité numérique', 'Portfolio professionnel'] },
      { semestre: 'S4', cours: ['Direction artistique', 'UX Writing', 'Tests utilisateurs', 'Projet de fin de cycle'] },
    ],
  },
  {
    id: 3, type: 'bachelor', isMaster: false,
    title: 'Bachelor Développement Logiciel',
    subtitle: 'Web, mobile & applications full-stack',
    duration: '3 ans', level: 'Bac+3', rhythm: '3 sem. entreprise / 1 sem. école', places: 35,
    image: 'https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    icon: Monitor,
    description: "Devenez développeur full-stack opérationnel en 3 ans. Du front-end au back-end, maîtrisez les frameworks modernes, les bases de données et les bonnes pratiques du génie logiciel pour créer des applications robustes.",
    objectifs: ['Développer des applications web et mobiles complètes', 'Maîtriser les architectures modernes (REST, MVC, microservices)', 'Gérer des bases de données relationnelles et NoSQL', 'Collaborer avec Git et les méthodes agiles'],
    competences: ['JavaScript / TypeScript', 'React & Node.js', 'Python', 'SQL & MongoDB', 'Git & CI/CD', 'Docker'],
    debouches: ['Développeur front-end', 'Développeur back-end', 'Développeur full-stack', 'Développeur mobile', 'Tech lead junior', 'Intégrateur web'],
    modules: [
      { semestre: 'S1', cours: ['Algorithmique & logique', 'HTML/CSS fondamentaux', 'JavaScript ES6+', 'Bases de données SQL'] },
      { semestre: 'S2', cours: ['React.js', 'Node.js & Express', 'API REST', 'Git & méthodes agiles'] },
      { semestre: 'S3', cours: ['TypeScript', 'MongoDB & NoSQL', 'Tests unitaires', 'Projet full-stack'] },
      { semestre: 'S4', cours: ['React Native / mobile', 'Docker & déploiement', 'Sécurité applicative', 'Mémoire & soutenance'] },
    ],
  },
  {
    id: 4, type: 'bachelor', isMaster: false,
    title: 'Bachelor Administration Réseau',
    subtitle: 'Infrastructure, sécurité & systèmes',
    duration: '3 ans', level: 'Bac+3', rhythm: '3 sem. entreprise / 1 sem. école', places: 25,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    icon: Network,
    description: "Maîtrisez l'infrastructure informatique des entreprises : configuration réseau, administration système, virtualisation et supervision. Une formation terrain qui vous prépare directement aux métiers d'administrateur et technicien réseau.",
    objectifs: ['Concevoir et administrer des infrastructures réseau', 'Gérer des serveurs Linux et Windows Server', 'Mettre en place des solutions de virtualisation', 'Assurer la supervision et la sécurité des systèmes'],
    competences: ['Cisco & routage', 'Linux & Windows Server', 'Active Directory', 'Virtualisation (VMware)', 'VPN & Firewall', 'VLAN & switching'],
    debouches: ['Administrateur réseau', 'Technicien systèmes & réseaux', 'Support N2/N3', 'Ingénieur infrastructure junior', 'Responsable informatique PME', 'NOC Engineer'],
    modules: [
      { semestre: 'S1', cours: ['Fondamentaux des réseaux (TCP/IP)', 'Linux administration', 'Câblage & équipements actifs', 'Sécurité des systèmes'] },
      { semestre: 'S2', cours: ['Cisco CCNA', 'Windows Server', 'Active Directory & GPO', 'Virtualisation VMware'] },
      { semestre: 'S3', cours: ['VPN & Firewall', 'VLAN & routage avancé', 'Cloud (AWS/Azure bases)', "Projet d'infrastructure"] },
      { semestre: 'S4', cours: ['Supervision réseau (Zabbix)', 'Cybersécurité appliquée', 'Automatisation (Ansible)', 'Rapport de stage'] },
    ],
  },
  {
    id: 5, type: 'master', isMaster: true,
    title: 'Master Cybersécurité & Green IT',
    subtitle: 'Sécurité numérique & sobriété énergétique',
    duration: '2 ans', level: 'Bac+5', rhythm: '4 sem. entreprise / 1 sem. école', places: 20,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    icon: Shield,
    description: "Formez-vous à la double expertise la plus recherchée du marché : sécuriser les systèmes d'information tout en réduisant leur empreinte écologique. Un master unique qui allie cybersécurité avancée et Green IT.",
    objectifs: ["Auditer et sécuriser des systèmes d'information complexes", 'Concevoir des architectures résilientes et éco-responsables', 'Piloter la réponse à incident (SOC & CSIRT)', "Réduire l'empreinte carbone des infrastructures numériques"],
    competences: ['Pentest & CTF', 'SOC & SIEM', 'Cryptographie', 'Green IT & écoconception', 'ISO 27001', 'Cloud Security'],
    debouches: ['Ingénieur cybersécurité', 'Analyste SOC', 'Pentesteur', 'RSSI junior', 'Consultant Green IT', 'Architecte sécurité'],
    modules: [
      { semestre: 'S1', cours: ['Sécurité offensive (pentest)', 'Cryptographie appliquée', 'Green IT & sobriété numérique', 'Gouvernance SI'] },
      { semestre: 'S2', cours: ['SOC & SIEM (Splunk)', 'Forensics & réponse à incident', 'Cloud security', 'Mémoire de recherche S1'] },
      { semestre: 'S3', cours: ['ISO 27001 & RGPD', 'IA et sécurité', 'Écoconception des SI', 'Audit de sécurité'] },
      { semestre: 'S4', cours: ["Projet de fin d'études", 'Stage long (6 mois)', 'Certification préparée (CEH/OSCP)', 'Soutenance finale'] },
    ],
  },
  {
    id: 6, type: 'master', isMaster: true,
    title: 'Master Performance Énergétique',
    subtitle: 'Audit, rénovation & efficacité des bâtiments',
    duration: '2 ans', level: 'Bac+5', rhythm: '4 sem. entreprise / 1 sem. école', places: 20,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    icon: Zap,
    description: "Devenez expert en efficacité énergétique des bâtiments et des systèmes industriels. Maîtrisez l'audit, la réglementation thermique, la modélisation BIM et les énergies renouvelables pour piloter la transition énergétique.",
    objectifs: ['Réaliser des audits énergétiques réglementaires', 'Maîtriser la RE2020 et les normes BBC', 'Concevoir des solutions de rénovation thermique', 'Intégrer les énergies renouvelables dans les projets'],
    competences: ['Audit énergétique', 'RE2020 & BBC', 'BIM & modélisation', 'Énergies renouvelables', 'GTB/GTC', 'Management de projet'],
    debouches: ['Auditeur énergétique certifié', "Chargé d'affaires rénovation", 'Ingénieur efficacité énergétique', 'Consultant en transition énergétique', 'Responsable énergie', 'BIM manager énergie'],
    modules: [
      { semestre: 'S1', cours: ['Thermique du bâtiment', 'RE2020 & réglementation', 'Audit énergétique niveau 1', 'BIM introduction'] },
      { semestre: 'S2', cours: ['Énergies renouvelables', 'GTB/GTC & domotique', 'Audit niveau 2', 'Financement & aides (CEE, MaPrimeRénov)'] },
      { semestre: 'S3', cours: ['Rénovation globale BBC', 'BIM avancé (Revit)', 'Management de projet énergétique', 'Mémoire de recherche'] },
      { semestre: 'S4', cours: ['Projet de rénovation réel', 'Stage expert (6 mois)', 'Préparation certification RGE', 'Soutenance finale'] },
    ],
  },
];

// ─── Card ──────────────────────────────────────────────────────────────────────
function ProgramCard({ program, onSelect }: { program: Program; onSelect: (p: Program) => void }) {
  const Icon = program.icon;
  return (
    <div
      onClick={() => onSelect(program)}
      className="group bg-white dark:bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[#E0E0E0] dark:border-[#2A2A2A] hover:border-[#1FAB89] hover:shadow-xl hover:shadow-[#1FAB89]/10 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-[#15896B]/70 transition-all duration-300" />
        {/* Badge */}
        <div className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full ${program.isMaster ? 'bg-[#2D2D2D]' : 'bg-[#1FAB89]'}`}>
          {program.level}
        </div>
        {/* Icône */}
        <div className="absolute bottom-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
          <Icon className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-[#2D2D2D] dark:text-white mb-1 group-hover:text-[#1FAB89] transition-colors leading-snug">{program.title}</h3>
        <p className="text-xs text-[#696969] dark:text-[#B0B0B0] mb-4">{program.subtitle}</p>

        <div className="flex flex-wrap gap-3 mb-4">
          <span className="flex items-center gap-1 text-xs text-[#696969] dark:text-[#B0B0B0]"><Clock className="h-3.5 w-3.5 text-[#1FAB89]" />{program.duration}</span>
          <span className="flex items-center gap-1 text-xs text-[#696969] dark:text-[#B0B0B0]"><Users className="h-3.5 w-3.5 text-[#1FAB89]" />{program.places} places</span>
          <span className="flex items-center gap-1 text-xs text-[#696969] dark:text-[#B0B0B0]"><Award className="h-3.5 w-3.5 text-[#1FAB89]" />Gratuit (alternance)</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {program.competences.slice(0, 3).map((c, i) => (
            <span key={i} className="text-xs bg-[#F0F0F0] dark:bg-[#2A2A2A] text-[#696969] dark:text-[#B0B0B0] px-2 py-0.5 rounded-full">{c}</span>
          ))}
          {program.competences.length > 3 && (
            <span className="text-xs bg-[#1FAB89]/15 text-[#1FAB89] px-2 py-0.5 rounded-full font-medium">+{program.competences.length - 3}</span>
          )}
        </div>

        <div className="mt-auto w-full py-2.5 rounded-xl bg-[#1FAB89] text-white text-sm font-semibold flex items-center justify-center gap-2 group-hover:bg-[#15896B] transition-colors">
          Voir la formation <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function ProgramModal({ program, onClose, onApply }: { program: Program; onClose: () => void; onApply: () => void }) {
  const [openSem, setOpenSem] = useState<string | null>('S1');
  const Icon = program.icon;
  const semLabel = (s: string) => s === 'S1' ? '1ère année — Semestre 1' : s === 'S2' ? '1ère année — Semestre 2' : s === 'S3' ? '2ème année — Semestre 3' : '2ème année — Semestre 4';

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-[#1A1A1A] w-full sm:max-w-2xl sm:mx-4 rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto" onClick={e => e.stopPropagation()}>

        {/* Hero */}
        <div className="relative h-52 sm:h-64 overflow-hidden rounded-t-3xl">
          <img src={program.heroImage} alt={program.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-xl hover:bg-white/40 transition-all border border-white/20">
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-5 left-5 right-16">
            <div className={`inline-flex items-center gap-2 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 ${program.isMaster ? 'bg-[#2D2D2D]' : 'bg-[#1FAB89]'}`}>
              <Icon className="h-3.5 w-3.5" /> {program.level}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">{program.title}</h2>
            <p className="text-white/75 text-sm mt-0.5">{program.subtitle}</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Infos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Durée', value: program.duration, icon: Clock },
              { label: 'Niveau', value: program.level, icon: Award },
              { label: 'Places', value: `${program.places} max`, icon: Users },
              { label: 'Rythme', value: program.rhythm, icon: TrendingUp },
            ].map((item, i) => (
              <div key={i} className="bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-2xl p-3 text-center">
                <item.icon className="h-4 w-4 text-[#1FAB89] mx-auto mb-1" />
                <p className="text-xs text-[#696969] dark:text-[#B0B0B0]">{item.label}</p>
                <p className="text-xs font-bold text-[#2D2D2D] dark:text-white mt-0.5 leading-snug">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-[#2D2D2D] dark:text-white mb-2 flex items-center gap-2 text-sm"><BookOpen className="h-4 w-4 text-[#1FAB89]" />Présentation</h3>
            <p className="text-[#696969] dark:text-[#B0B0B0] text-sm leading-relaxed">{program.description}</p>
          </div>

          {/* Objectifs */}
          <div>
            <h3 className="font-bold text-[#2D2D2D] dark:text-white mb-3 flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-[#1FAB89]" />Objectifs pédagogiques</h3>
            <div className="space-y-2">
              {program.objectifs.map((o, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-[#696969] dark:text-[#B0B0B0]">
                  <span className="text-[#1FAB89] font-bold mt-0.5 shrink-0">✓</span>{o}
                </div>
              ))}
            </div>
          </div>

          {/* Compétences */}
          <div>
            <h3 className="font-bold text-[#2D2D2D] dark:text-white mb-3 flex items-center gap-2 text-sm"><TrendingUp className="h-4 w-4 text-[#1FAB89]" />Compétences développées</h3>
            <div className="flex flex-wrap gap-2">
              {program.competences.map((c, i) => (
                <span key={i} className="text-sm bg-[#1FAB89] text-white px-3 py-1 rounded-full font-medium">{c}</span>
              ))}
            </div>
          </div>

          {/* Programme accordéon */}
          <div>
            <h3 className="font-bold text-[#2D2D2D] dark:text-white mb-3 flex items-center gap-2 text-sm"><BookOpen className="h-4 w-4 text-[#1FAB89]" />Programme</h3>
            <div className="space-y-2">
              {program.modules.map((mod) => (
                <div key={mod.semestre} className="border border-[#E0E0E0] dark:border-[#2A2A2A] rounded-xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 bg-[#F0F0F0] dark:bg-[#2A2A2A] hover:bg-[#E0E0E0] dark:hover:bg-[#333] transition-colors"
                    onClick={() => setOpenSem(openSem === mod.semestre ? null : mod.semestre)}
                  >
                    <span className="font-semibold text-[#2D2D2D] dark:text-white text-sm">{semLabel(mod.semestre)}</span>
                    {openSem === mod.semestre ? <ChevronUp className="h-4 w-4 text-[#1FAB89]" /> : <ChevronDown className="h-4 w-4 text-[#696969]" />}
                  </button>
                  {openSem === mod.semestre && (
                    <div className="px-4 py-3 space-y-2 bg-white dark:bg-[#1A1A1A]">
                      {mod.cours.map((c, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-[#696969] dark:text-[#B0B0B0]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1FAB89] shrink-0" />{c}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Débouchés */}
          <div>
            <h3 className="font-bold text-[#2D2D2D] dark:text-white mb-3 flex items-center gap-2 text-sm"><Briefcase className="h-4 w-4 text-[#1FAB89]" />Débouchés professionnels</h3>
            <div className="grid grid-cols-2 gap-2">
              {program.debouches.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#696969] dark:text-[#B0B0B0] bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-xl px-3 py-2">
                  <ArrowRight className="h-3.5 w-3.5 text-[#1FAB89] shrink-0" />{d}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#F0F0F0] dark:bg-[#2A2A2A] border border-[#1FAB89]/20 rounded-2xl p-5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-bold text-[#2D2D2D] dark:text-white mb-1 text-sm">Formation 100% gratuite en alternance</p>
                <p className="text-xs text-[#696969] dark:text-[#B0B0B0]">Admissions 2026 ouvertes — {program.places} places disponibles</p>
              </div>
              <button
                onClick={onApply}
                className="shrink-0 bg-[#1FAB89] hover:bg-[#15896B] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-[#1FAB89]/30 flex items-center gap-2"
              >
                Postuler maintenant <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function ProgramsPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [filter, setFilter] = useState<'all' | 'bachelor' | 'master'>('all');
  const [selected, setSelected] = useState<Program | null>(null);

  const bachelors = programs.filter(p => p.type === 'bachelor');
  const masters   = programs.filter(p => p.type === 'master');

  const handleApply = () => { setSelected(null); onNavigate?.('admissions'); };

  const Divider = ({ label }: { label: string }) => (
    <div className="flex items-center gap-4 mb-6">
      <div className="h-px flex-1 bg-[#E0E0E0] dark:bg-[#2A2A2A]" />
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#1FAB89]" />
        <span className="text-xs font-bold text-[#696969] uppercase tracking-widest">{label}</span>
        <span className="w-2 h-2 rounded-full bg-[#1FAB89]" />
      </div>
      <div className="h-px flex-1 bg-[#E0E0E0] dark:bg-[#2A2A2A]" />
    </div>
  );

  return (
    <div className="pt-20 min-h-screen bg-[#F0F0F0] dark:bg-[#0A0A0A]">

      {/* Hero */}
      <div className="relative bg-[#1FAB89] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#15896B] rounded-full blur-3xl opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5 border border-white/30">
            🎓 Admissions 2026 — Places limitées
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Nos Formations</h1>
          <p className="text-lg text-white/85 max-w-2xl mx-auto mb-10">
            6 formations diplômantes 100% en alternance. Zéro frais de scolarité, 100% opérationnel dès la sortie.
          </p>
          <div className="flex flex-wrap justify-center gap-10">
            {[{ val: '6', label: 'Formations' }, { val: '0 €', label: 'Frais de scolarité' }, { val: '95%', label: "Taux d'insertion" }, { val: 'Bac+3 & Bac+5', label: 'Niveaux' }].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-white">{s.val}</p>
                <p className="text-sm text-white/70 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 flex justify-center gap-2 flex-wrap">
        {[
          { id: 'all',      label: 'Toutes',         count: programs.length },
          { id: 'bachelor', label: 'Bachelors Bac+3', count: bachelors.length },
          { id: 'master',   label: 'Masters Bac+5',   count: masters.length },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id as typeof filter)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              filter === f.id
                ? 'bg-[#1FAB89] text-white shadow-lg shadow-[#1FAB89]/30'
                : 'bg-white dark:bg-[#1A1A1A] text-[#696969] dark:text-[#B0B0B0] border border-[#E0E0E0] dark:border-[#2A2A2A] hover:border-[#1FAB89] hover:text-[#1FAB89]'
            }`}
          >
            {f.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${filter === f.id ? 'bg-white/20' : 'bg-[#F0F0F0] dark:bg-[#2A2A2A] text-[#696969]'}`}>{f.count}</span>
          </button>
        ))}
      </div>

      {/* Grilles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 space-y-12">

        {(filter === 'all' || filter === 'bachelor') && (
          <div>
            {filter === 'all' && <Divider label="Bachelors — Bac+3" />}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {(filter === 'all' ? bachelors : programs.filter(p => p.type === 'bachelor')).map(p => (
                <ProgramCard key={p.id} program={p} onSelect={setSelected} />
              ))}
            </div>
          </div>
        )}

        {(filter === 'all' || filter === 'master') && (
          <div>
            {filter === 'all' && <Divider label="Masters — Bac+5" />}
            <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto lg:max-w-2xl">
              {(filter === 'all' ? masters : programs.filter(p => p.type === 'master')).map(p => (
                <ProgramCard key={p.id} program={p} onSelect={setSelected} />
              ))}
            </div>
          </div>
        )}

        {/* CTA bas */}
        <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-10 border border-[#E0E0E0] dark:border-[#2A2A2A] text-center shadow-sm">
          <div className="w-14 h-14 bg-[#1FAB89]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award className="h-7 w-7 text-[#1FAB89]" />
          </div>
          <h2 className="text-2xl font-bold text-[#2D2D2D] dark:text-white mb-2">Une question sur nos formations ?</h2>
          <p className="text-[#696969] dark:text-[#B0B0B0] mb-6 max-w-lg mx-auto text-sm">
            Notre équipe pédagogique est disponible pour vous orienter vers la formation qui vous correspond.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => onNavigate?.('admissions')} className="bg-[#1FAB89] hover:bg-[#15896B] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-[#1FAB89]/30 flex items-center gap-2">
              Déposer ma candidature <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => onNavigate?.('contact')} className="bg-[#F0F0F0] dark:bg-[#2A2A2A] text-[#696969] dark:text-[#B0B0B0] hover:text-[#1FAB89] hover:border-[#1FAB89] px-6 py-3 rounded-xl font-bold text-sm border border-[#E0E0E0] dark:border-[#333] transition-all">
              Nous contacter
            </button>
          </div>
        </div>
      </div>

      {selected && <ProgramModal program={selected} onClose={() => setSelected(null)} onApply={handleApply} />}
    </div>
  );
}