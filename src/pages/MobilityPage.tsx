import React, { useState } from 'react';
import { 
  Globe, CheckCircle, Users, Mail, ChevronDown, ChevronUp, 
  MapPin, GraduationCap, Plane, Compass, Euro, Search, Sparkles, Send
} from 'lucide-react';

// Composant de base pour garder le code DRY
const CardLayout = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-[35px] shadow-xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

export function MobilityPage() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const whyErasmus = [
    { title: 'Expérience Internationale', desc: 'Étudiez dans un cadre européen, découvrez une nouvelle culture.', icon: <Globe /> },
    { title: 'Développement Personnel', desc: 'Gagnez en autonomie, en confiance et en adaptabilité.', icon: <Compass /> },
    { title: 'Reconnaissance Académique', desc: 'Vos crédits ECTS sont reconnus automatiquement.', icon: <GraduationCap /> },
    { title: 'Aide Financière', desc: 'Recevez une bourse mensuelle pour couvrir vos frais.', icon: <Euro /> },
    { title: 'Réseau Professionnel', desc: 'Construisez un réseau international d\'étudiants.', icon: <Users /> },
    { title: 'Employabilité', desc: 'Améliorez votre CV avec une expérience très prisée.', icon: <CheckCircle /> },
  ];

  const eligibility = [
    'Être inscrit en 2ème ou 3ème année de Bachelor',
    'Être inscrit en Master (Bac+5)',
    'Avoir validé sa 1ère année de formation',
    'Avoir un niveau de langue requis (A2/B1 recommandé)',
    'Être en règle avec ses obligations académiques',
  ];

  // --- DESTINATIONS SANS IMAGES AVEC DESIGN ÉPURÉ ---
  const destinations = [
    { country: 'Espagne', cities: 'Madrid, Barcelone, Valence', color: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10' },
    { country: 'Allemagne', cities: 'Berlin, Munich, Cologne', color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10' },
    { country: 'Belgique', cities: 'Bruxelles, Anvers, Liège', color: 'bg-red-50 text-red-600 dark:bg-red-500/10' },
    { country: 'Portugal', cities: 'Lisbonne, Porto', color: 'bg-green-50 text-green-600 dark:bg-green-500/10' },
    { country: 'Italie', cities: 'Milan, Rome, Naples', color: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10' },
    { country: 'Pays-Bas', cities: 'Amsterdam, Rotterdam', color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10' },
  ];

  const steps = [
    { num: '01', title: 'Se renseigner', desc: 'Contacter le bureau de mobilité pour les destinations.' },
    { num: '02', title: 'Préparer le dossier', desc: 'Rassembler CV, lettre de motivation et notes.' },
    { num: '03', title: 'Validation', desc: 'Soumettre votre dossier à l\'équipe pédagogique.' },
    { num: '04', title: 'Signature', desc: 'Signer le contrat avec l\'université partenaire.' },
    { num: '05', title: 'Préparation', desc: 'Suivi administratif avant le grand départ.' },
    { num: '06', title: 'Départ', desc: 'Commencer votre semestre ou année à l\'étranger.' },
  ];

  const faqs = [
    { q: 'Combien de temps dure une mobilité ?', a: 'La durée recommandée est de 4 à 12 mois. Pour les Bachelors, un semestre ou une année en 3ème année. Pour les Mastères, 6 à 12 mois.' },
    { q: 'La bourse couvre-t-elle tous les frais ?', a: 'La bourse couvre ~70-80% des frais de subsistence (loyer, nourriture). Elle ne couvre pas le voyage aller-retour.' },
    { q: 'Comment les crédits ECTS sont-ils reconnus ?', a: 'Automatiquement grâce au système Erasmus+. Un contrat pédagogique garantit la correspondance des cursus.' },
    { q: 'Y a-t-il une langue requise ?', a: 'La langue dépend de la destination. Green Up Academy proposera des cours de langue préparatoires.' },
    { q: 'Que se passe-t-il si je ne valide pas mes crédits ?', a: 'Vous pourrez suivre des cours de rattrapage à l\'étranger ou à Green Up Academy après votre retour.' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-slate-950 transition-colors font-sans overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <span className="inline-block py-2 px-4 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
              ✨ Destinations 2026 Ouvertes
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-8 text-slate-900 dark:text-white">
              Votre Aventure <br />
              <span className="text-primary relative inline-block">
                Erasmus+
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-yellow-400 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" /></svg>
              </span>
              <br /> Commence Ici.
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
              Rejoignez le programme de mobilité internationale de Green Up Academy et étudiez dans les meilleures universités d'Europe.
            </p>
            
            <div className="bg-white dark:bg-slate-800 p-4 rounded-[40px] shadow-2xl shadow-primary/10 border border-slate-100 dark:border-slate-700 flex flex-wrap gap-4 items-center max-w-2xl">
              <div className="flex-1 min-w-[150px] px-6 border-r border-slate-100 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Programme</p>
                <p className="font-bold dark:text-white text-lg">Études Europe</p>
              </div>
              <div className="flex-1 min-w-[150px] px-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Durée</p>
                <p className="font-bold dark:text-white text-lg">6 à 12 Mois</p>
              </div>
              <button className="bg-primary p-5 rounded-[25px] text-white hover:scale-105 transition-all shadow-lg shadow-primary/30">
                <Search size={28} />
              </button>
            </div>
          </div>

          <div className="relative h-[600px] hidden lg:block">
            <div className="absolute top-0 right-0 w-[280px] h-[400px] rounded-full overflow-hidden border-[12px] border-white dark:border-slate-900 shadow-2xl rotate-6 z-20">
              <img src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover" alt="Étudiants" />
            </div>
            <div className="absolute bottom-0 left-0 w-[320px] h-[450px] rounded-[150px] overflow-hidden border-[12px] border-white dark:border-slate-900 shadow-2xl -rotate-6 z-10">
              <img src="https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover" alt="Campus" />
            </div>
            <div className="absolute top-1/4 -left-10 w-24 h-24 bg-yellow-400 rounded-3xl flex items-center justify-center animate-bounce shadow-xl z-30">
              <Plane size={40} className="text-white -rotate-45" />
            </div>
          </div>
        </div>
      </section>

      {/* --- AVANTAGES --- */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-4xl font-bold dark:text-white">Pourquoi Partir ?</h2>
          <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {whyErasmus.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-24 h-44 rounded-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent group-hover:border-primary group-hover:bg-primary/5 transition-all flex items-center justify-center mb-6 overflow-hidden">
                <div className="text-primary scale-[1.8] group-hover:scale-[1.4] transition-transform duration-500">{item.icon}</div>
              </div>
              <p className="font-bold text-sm leading-tight dark:text-slate-200">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION INFO --- */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <CardLayout className="p-10 lg:p-20 relative overflow-hidden">
          <Sparkles className="absolute top-10 right-10 text-primary/10" size={120} />
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h2 className="text-4xl font-bold mb-8 dark:text-white">C'est quoi Erasmus+ ?</h2>
              <div className="space-y-6 text-lg text-slate-500 dark:text-slate-400">
                <p>Erasmus+ est le programme phare de l'Union Européenne qui permet d'étudier à l'étranger sans frais d'inscription supplémentaires dans l'université d'accueil.</p>
                <p className="p-6 bg-primary/5 border-l-4 border-primary rounded-r-2xl font-medium italic">
                  "En tant que membre, Green Up Academy facilite toutes vos démarches et vous assure une bourse mensuelle garantie."
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
                <CheckCircle className="text-primary" /> Éligibilité Express
              </h3>
              {eligibility.map((text, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </CardLayout>
      </section>

      {/* --- DESTINATIONS (NOUVEAU DESIGN SANS IMAGES / SANS BOUTONS) --- */}
      <section className="bg-slate-50 dark:bg-slate-900/30 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-bold dark:text-white">Nos Destinations Stars</h2>
            <button className="text-primary font-bold hover:underline">Découvrir la carte →</button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {destinations.map((dest, i) => (
              <CardLayout key={i} className="p-8 group cursor-pointer hover:border-primary transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${dest.color}`}>
                  <MapPin size={28} />
                </div>
                <h3 className="text-3xl font-black mb-3 dark:text-white group-hover:text-primary transition-colors">{dest.country}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed mb-4">
                  {dest.cities}
                </p>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2 text-primary font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  En savoir plus <ChevronUp className="rotate-90" size={18} />
                </div>
              </CardLayout>
            ))}
          </div>
        </div>
      </section>

      {/* --- LE PARCOURS --- */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center mb-20 dark:text-white underline decoration-yellow-400 decoration-4 underline-offset-8">
          Votre Parcours en 6 Étapes
        </h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8 relative">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 border-4 border-primary text-primary rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-xl rotate-3">
                {step.num}
              </div>
              <h4 className="font-bold mb-3 dark:text-white">{step.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[70%] w-full h-[2px] bg-slate-100 dark:bg-slate-800 -z-10"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="max-w-4xl mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center mb-16 italic dark:text-white">Le Coin des Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-[30px] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-sm">
              <button 
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full p-6 flex justify-between items-center text-left hover:bg-slate-50 dark:hover:bg-slate-800 rounded-[25px] transition-all"
              >
                <span className="font-bold text-lg dark:text-white pr-4">{faq.q}</span>
                <div className={`shrink-0 p-2 rounded-full transition-all ${expandedFaq === i ? 'bg-primary text-white rotate-180' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                  <ChevronDown size={24} />
                </div>
              </button>
              {expandedFaq === i && (
                <div className="p-8 pt-2 text-slate-500 dark:text-slate-400 border-t border-slate-50 dark:border-slate-800 mt-2 text-lg leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="bg-slate-950 rounded-[60px] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10">
            <h2 className="text-5xl lg:text-6xl font-bold mb-10">Prêt à décoller ? 🚀</h2>
            <p className="text-slate-400 text-xl mb-14 max-w-2xl mx-auto leading-relaxed">
              Ne laissez pas passer votre chance de vivre une expérience qui changera votre vie. Notre équipe vous accompagne de A à Z.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="mailto:mobilite@green-up-academy.com" 
                className="flex items-center gap-3 px-12 py-6 bg-primary rounded-3xl font-black text-xl hover:scale-105 transition-all shadow-xl shadow-primary/40"
              >
                <Send size={24} /> Postuler Maintenant
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}