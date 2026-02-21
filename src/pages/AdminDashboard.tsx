
import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  Save,
  Layout,
  BookOpen,
  MessageSquare,
  Phone,
  Settings,
  Plus,
  Trash,
  Image as ImageIcon
} from 'lucide-react';

interface Program {
  id: number;
  title: string;
  description: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  program: string;
  quote: string;
  rating: number;
}

interface WhyChooseUsItem {
  id: number;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  icon: string;
}

interface CTADate {
  label: string;
  sub: string;
}

interface SiteContent {
  hero: { title: string; subtitle: string };
  programs: Program[];
  testimonials: Testimonial[];
  whyChooseUs: WhyChooseUsItem[];
  contact: { director: string; email: string; phone: string; address: string };
  cta: { title: string; subtitle: string; dates: CTADate[] };
  partners: any[];
}

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [content, setContent] = useState<SiteContent | null>(null);
  const [activeTab, setActiveTab] = useState('general');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Load content on mount
  useEffect(() => {
    fetch('http://localhost:4000/api/content')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error('Failed to load content', err));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email === 'admin@green-up.com' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Identifiants incorrects');
    }
  };

  const saveContent = async () => {
    if (!content) return;
    setSaveStatus('saving');
    try {
      const res = await fetch('http://localhost:4000/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      setSaveStatus('error');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mot de passe</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-white">
              Connexion
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  if (!content) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full pt-20">
        <div className="px-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800">CMS Admin</h2>
          <p className="text-sm text-gray-500">Gestion du contenu</p>
        </div>
        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center px-6 py-3 ${activeTab === 'general' ? 'bg-primary/10 text-primary border-r-4 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Layout className="w-5 h-5 mr-3" /> Général
          </button>
          <button
            onClick={() => setActiveTab('programs')}
            className={`w-full flex items-center px-6 py-3 ${activeTab === 'programs' ? 'bg-primary/10 text-primary border-r-4 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <BookOpen className="w-5 h-5 mr-3" /> Programmes
          </button>
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center px-6 py-3 ${activeTab === 'testimonials' ? 'bg-primary/10 text-primary border-r-4 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <MessageSquare className="w-5 h-5 mr-3" /> Témoignages
          </button>
          <button
            onClick={() => setActiveTab('whyChooseUs')}
            className={`w-full flex items-center px-6 py-3 ${activeTab === 'whyChooseUs' ? 'bg-primary/10 text-primary border-r-4 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Settings className="w-5 h-5 mr-3" /> Atouts
          </button>
          <button
            onClick={() => setActiveTab('cta')}
            className={`w-full flex items-center px-6 py-3 ${activeTab === 'cta' ? 'bg-primary/10 text-primary border-r-4 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <ImageIcon className="w-5 h-5 mr-3" /> Appel à l'action
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`w-full flex items-center px-6 py-3 ${activeTab === 'contact' ? 'bg-primary/10 text-primary border-r-4 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Phone className="w-5 h-5 mr-3" /> Contact
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8 pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {activeTab === 'general' && 'Configuration Générale'}
            {activeTab === 'programs' && 'Programmes de formation'}
            {activeTab === 'testimonials' && 'Témoignages étudiants'}
            {activeTab === 'whyChooseUs' && 'Pourquoi nous choisir ?'}
            {activeTab === 'cta' && 'Bandeau d\'appel à l\'action'}
            {activeTab === 'contact' && 'Informations de contact'}
          </h1>
          <Button onClick={saveContent} className="bg-green-600 text-white hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            {saveStatus === 'saving' ? 'Enregistrement...' : saveStatus === 'saved' ? 'Enregistré !' : 'Enregistrer'}
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          
          {/* GENERAL TAB */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Section Hero (Accueil)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Titre principal</label>
                    <input
                      className="w-full p-2 border rounded"
                      value={content.hero.title}
                      onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Sous-titre</label>
                    <textarea
                      className="w-full p-2 border rounded"
                      rows={3}
                      value={content.hero.subtitle}
                      onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROGRAMS TAB */}
          {activeTab === 'programs' && (
            <div className="space-y-6">
              {content.programs.map((prog, idx) => (
                <div key={idx} className="border p-4 rounded bg-gray-50 relative">
                  <button 
                    onClick={() => {
                      const newProgs = content.programs.filter((_, i) => i !== idx);
                      setContent({ ...content, programs: newProgs });
                    }}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                  <div className="grid gap-4">
                    <input
                      className="w-full p-2 border rounded font-bold"
                      value={prog.title}
                      onChange={(e) => {
                        const newProgs = [...content.programs];
                        newProgs[idx].title = e.target.value;
                        setContent({ ...content, programs: newProgs });
                      }}
                    />
                    <textarea
                      className="w-full p-2 border rounded"
                      value={prog.description}
                      onChange={(e) => {
                        const newProgs = [...content.programs];
                        newProgs[idx].description = e.target.value;
                        setContent({ ...content, programs: newProgs });
                      }}
                    />
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full border-dashed"
                onClick={() => setContent({
                  ...content,
                  programs: [...content.programs, { id: Date.now(), title: 'Nouveau Programme', description: 'Description...' }]
                })}
              >
                <Plus className="w-4 h-4 mr-2" /> Ajouter un programme
              </Button>
            </div>
          )}

          {/* TESTIMONIALS TAB */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              {content.testimonials.map((testi, idx) => (
                <div key={idx} className="border p-4 rounded bg-gray-50 relative">
                  <button 
                    onClick={() => {
                      const newTestis = content.testimonials.filter((_, i) => i !== idx);
                      setContent({ ...content, testimonials: newTestis });
                    }}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500">Nom</label>
                      <input
                        className="w-full p-2 border rounded"
                        value={testi.name}
                        onChange={(e) => {
                          const newTestis = [...content.testimonials];
                          newTestis[idx].name = e.target.value;
                          setContent({ ...content, testimonials: newTestis });
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Rôle</label>
                      <input
                        className="w-full p-2 border rounded"
                        value={testi.role}
                        onChange={(e) => {
                          const newTestis = [...content.testimonials];
                          newTestis[idx].role = e.target.value;
                          setContent({ ...content, testimonials: newTestis });
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Entreprise</label>
                      <input
                        className="w-full p-2 border rounded"
                        value={testi.company}
                        onChange={(e) => {
                          const newTestis = [...content.testimonials];
                          newTestis[idx].company = e.target.value;
                          setContent({ ...content, testimonials: newTestis });
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Programme suivi</label>
                      <input
                        className="w-full p-2 border rounded"
                        value={testi.program}
                        onChange={(e) => {
                          const newTestis = [...content.testimonials];
                          newTestis[idx].program = e.target.value;
                          setContent({ ...content, testimonials: newTestis });
                        }}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs text-gray-500">Citation</label>
                      <textarea
                        className="w-full p-2 border rounded"
                        rows={3}
                        value={testi.quote}
                        onChange={(e) => {
                          const newTestis = [...content.testimonials];
                          newTestis[idx].quote = e.target.value;
                          setContent({ ...content, testimonials: newTestis });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full border-dashed"
                onClick={() => setContent({
                  ...content,
                  testimonials: [...content.testimonials, {
                    id: Date.now(),
                    name: 'Nouveau Témoin',
                    role: 'Étudiant',
                    company: 'Entreprise',
                    image: 'https://randomuser.me/api/portraits/lego/1.jpg',
                    program: 'Programme',
                    quote: 'Mon avis...',
                    rating: 5
                  }]
                })}
              >
                <Plus className="w-4 h-4 mr-2" /> Ajouter un témoignage
              </Button>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Directeur de l'établissement</label>
                <input
                  className="w-full p-2 border rounded"
                  value={content.contact.director}
                  onChange={(e) => setContent({ ...content, contact: { ...content.contact, director: e.target.value } })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email de contact (et réception des candidatures)</label>
                <input
                  className="w-full p-2 border rounded"
                  value={content.contact.email}
                  onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Note : Cet email sera utilisé comme destinataire pour le formulaire de contact et les candidatures.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Téléphone</label>
                <input
                  className="w-full p-2 border rounded"
                  value={content.contact.phone}
                  onChange={(e) => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Adresse</label>
                <input
                  className="w-full p-2 border rounded"
                  value={content.contact.address}
                  onChange={(e) => setContent({ ...content, contact: { ...content.contact, address: e.target.value } })}
                />
              </div>
            </div>
          )}

          {/* CTA TAB */}
          {activeTab === 'cta' && (
            <div className="space-y-6">
               <div>
                  <label className="block text-sm font-medium mb-1">Titre</label>
                  <input
                    className="w-full p-2 border rounded"
                    value={content.cta.title}
                    onChange={(e) => setContent({ ...content, cta: { ...content.cta, title: e.target.value } })}
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1">Sous-titre</label>
                  <textarea
                    className="w-full p-2 border rounded"
                    rows={3}
                    value={content.cta.subtitle}
                    onChange={(e) => setContent({ ...content, cta: { ...content.cta, subtitle: e.target.value } })}
                  />
               </div>
               <div className="grid md:grid-cols-3 gap-4">
                  {content.cta.dates.map((date, idx) => (
                    <div key={idx} className="border p-3 rounded">
                       <label className="block text-xs font-medium mb-1">Label (ex: 30 Juin)</label>
                       <input
                          className="w-full p-1 border rounded mb-2"
                          value={date.label}
                          onChange={(e) => {
                            const newDates = [...content.cta.dates];
                            newDates[idx].label = e.target.value;
                            setContent({ ...content, cta: { ...content.cta, dates: newDates } });
                          }}
                        />
                        <label className="block text-xs font-medium mb-1">Sous-titre (ex: Clôture)</label>
                        <input
                          className="w-full p-1 border rounded"
                          value={date.sub}
                          onChange={(e) => {
                            const newDates = [...content.cta.dates];
                            newDates[idx].sub = e.target.value;
                            setContent({ ...content, cta: { ...content.cta, dates: newDates } });
                          }}
                        />
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* WHY CHOOSE US TAB */}
          {activeTab === 'whyChooseUs' && (
             <div className="space-y-6">
               <p className="text-sm text-gray-500 mb-4">
                 Icônes disponibles : Zap, Users, MapPin, Briefcase, Award, Globe
               </p>
               {content.whyChooseUs.map((item, idx) => (
                 <div key={idx} className="border p-4 rounded bg-gray-50 relative">
                    <div className="grid md:grid-cols-2 gap-4">
                       <div>
                         <label className="text-xs text-gray-500">Titre</label>
                         <input
                           className="w-full p-2 border rounded"
                           value={item.title}
                           onChange={(e) => {
                             const newItems = [...content.whyChooseUs];
                             newItems[idx].title = e.target.value;
                             setContent({ ...content, whyChooseUs: newItems });
                           }}
                         />
                       </div>
                       <div>
                         <label className="text-xs text-gray-500">Icône</label>
                         <input
                           className="w-full p-2 border rounded"
                           value={item.icon}
                           onChange={(e) => {
                             const newItems = [...content.whyChooseUs];
                             newItems[idx].icon = e.target.value;
                             setContent({ ...content, whyChooseUs: newItems });
                           }}
                         />
                       </div>
                       <div className="md:col-span-2">
                         <label className="text-xs text-gray-500">Description</label>
                         <textarea
                           className="w-full p-2 border rounded"
                           value={item.description}
                           onChange={(e) => {
                             const newItems = [...content.whyChooseUs];
                             newItems[idx].description = e.target.value;
                             setContent({ ...content, whyChooseUs: newItems });
                           }}
                         />
                       </div>
                       <div>
                         <label className="text-xs text-gray-500">Statistique (ex: 40+)</label>
                         <input
                           className="w-full p-2 border rounded"
                           value={item.stat}
                           onChange={(e) => {
                             const newItems = [...content.whyChooseUs];
                             newItems[idx].stat = e.target.value;
                             setContent({ ...content, whyChooseUs: newItems });
                           }}
                         />
                       </div>
                       <div>
                         <label className="text-xs text-gray-500">Label Stat (ex: Projets/an)</label>
                         <input
                           className="w-full p-2 border rounded"
                           value={item.statLabel}
                           onChange={(e) => {
                             const newItems = [...content.whyChooseUs];
                             newItems[idx].statLabel = e.target.value;
                             setContent({ ...content, whyChooseUs: newItems });
                           }}
                         />
                       </div>
                    </div>
                 </div>
               ))}
             </div>
          )}

        </div>
      </div>
    </div>
  );
}
