import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  Save, Layout, BookOpen, MessageSquare, Phone, Settings,
  Plus, Trash, Image as ImageIcon, Inbox, Eye, EyeOff,
  CheckCircle, XCircle, Clock, ChevronDown, ChevronUp,
  Mail, User, GraduationCap, FileText, Calendar, Download
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Program     { id:number; title:string; description:string }
interface Testimonial { id:number; name:string; role:string; company:string; image:string; program:string; quote:string; rating:number }
interface WhyItem     { id:number; title:string; description:string; stat:string; statLabel:string; icon:string }
interface CTADate     { label:string; sub:string }
interface SiteContent {
  hero:         { title:string; subtitle:string };
  programs:     Program[];
  testimonials: Testimonial[];
  whyChooseUs:  WhyItem[];
  contact:      { director:string; email:string; phone:string; address:string };
  cta:          { title:string; subtitle:string; dates:CTADate[] };
  partners:     any[];
}
interface Application {
  id:number; date:string; firstName:string; lastName:string; fullName:string;
  email:string; phone:string; birthDate:string; birthPlace:string; nationality:string; address:string;
  diploma:string; school:string; specialite:string; year:string; gpa:string;
  program:string; programNiveau:string; startDate:string;
  motivation:string; experience:string;
  files:string[]; status:'nouveau'|'en_etude'|'accepté'|'refusé'; read:boolean;
}

const STATUS_CONFIG = {
  nouveau:   { label:'Nouveau',    color:'bg-blue-100 text-blue-700',   icon:Mail },
  en_etude:  { label:'En étude',   color:'bg-amber-100 text-amber-700', icon:Clock },
  accepté:   { label:'Accepté',    color:'bg-green-100 text-green-700', icon:CheckCircle },
  refusé:    { label:'Refusé',     color:'bg-red-100 text-red-700',     icon:XCircle },
};

// ─── Composant carte candidature ─────────────────────────────────────────────
function ApplicationCard({ app, onUpdate, onDelete }: {
  app: Application;
  onUpdate: (id:number, patch:{status?:string; read?:boolean}) => void;
  onDelete: (id:number) => void;
}) {
  const [open, setOpen] = useState(false);
  const st = STATUS_CONFIG[app.status] || STATUS_CONFIG.nouveau;

  const toggle = () => {
    setOpen(o => !o);
    if (!app.read) onUpdate(app.id, { read: true });
  };

  return (
    <div className={`bg-white rounded-2xl border transition-all ${app.read ? 'border-gray-200' : 'border-[#1FAB89] shadow-md shadow-[#1FAB89]/10'}`}>
      {/* ── En-tête ── */}
      <div className="flex items-center gap-4 p-4 cursor-pointer" onClick={toggle}>
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#1FAB89]/15 flex items-center justify-center shrink-0 text-[#1FAB89] font-bold text-sm">
          {app.firstName?.[0]}{app.lastName?.[0]}
        </div>
        {/* Info principale */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {!app.read && <span className="w-2 h-2 rounded-full bg-[#1FAB89] shrink-0"/>}
            <p className="font-bold text-[#2D2D2D] text-sm truncate">{app.firstName} {app.lastName}</p>
          </div>
          <p className="text-xs text-[#696969] truncate">{app.program} · {app.programNiveau}</p>
          <p className="text-xs text-[#B0B0B0]">{new Date(app.date).toLocaleDateString('fr-FR',{day:'2-digit',month:'short',year:'numeric'})}</p>
        </div>
        {/* Statut + toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.color}`}>{st.label}</span>
          {open ? <ChevronUp className="h-4 w-4 text-[#696969]"/> : <ChevronDown className="h-4 w-4 text-[#696969]"/>}
        </div>
      </div>

      {/* ── Détail ── */}
      {open && (
        <div className="border-t border-[#F0F0F0] p-4 space-y-4">

          {/* Actions statut */}
          <div>
            <p className="text-xs font-semibold text-[#696969] uppercase tracking-wider mb-2">Changer le statut</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                <button key={key} onClick={()=>onUpdate(app.id,{status:key})}
                  className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-all
                    ${app.status===key ? cfg.color+' border-transparent' : 'border-[#E0E0E0] text-[#696969] hover:border-[#1FAB89] hover:text-[#1FAB89]'}`}>
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid infos */}
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Email',        app.email],
              ['Téléphone',    app.phone],
              ['Naissance',    app.birthDate || '—'],
              ['Nationalité',  app.nationality || '—'],
              ['Diplôme',      app.diploma],
              ['Établissement',app.school],
              ['Spécialité',   app.specialite],
              ['Année',        app.year],
              ['Rentrée',      app.startDate],
              ['Adresse',      app.address || '—'],
            ].map(([k,v])=>(
              <div key={k} className="bg-[#F0F0F0] rounded-xl p-3">
                <p className="text-xs text-[#696969] mb-0.5">{k}</p>
                <p className="text-sm font-semibold text-[#2D2D2D] break-words">{v}</p>
              </div>
            ))}
          </div>

          {/* Motivation */}
          <div>
            <p className="text-xs font-semibold text-[#696969] uppercase tracking-wider mb-1.5">Lettre de motivation</p>
            <div className="bg-[#F0F0F0] rounded-xl p-3 text-sm text-[#2D2D2D] leading-relaxed whitespace-pre-wrap border-l-4 border-[#1FAB89]">
              {app.motivation || <span className="text-[#B0B0B0] italic">Non renseignée</span>}
            </div>
          </div>

          {/* Expériences */}
          {app.experience && (
            <div>
              <p className="text-xs font-semibold text-[#696969] uppercase tracking-wider mb-1.5">Expériences</p>
              <div className="bg-[#F0F0F0] rounded-xl p-3 text-sm text-[#2D2D2D] leading-relaxed whitespace-pre-wrap">
                {app.experience}
              </div>
            </div>
          )}

          {/* Documents */}
          {app.files?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-[#696969] uppercase tracking-wider mb-2">Documents joints ({app.files.length})</p>
              <div className="flex flex-wrap gap-2">
                {app.files.map((f,i)=>(
                  <span key={i} className="flex items-center gap-1.5 text-xs bg-[#1FAB89]/10 text-[#1FAB89] px-3 py-1.5 rounded-full font-medium">
                    <Download className="h-3 w-3"/>{f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Supprimer */}
          <div className="flex justify-end pt-2 border-t border-[#F0F0F0]">
            <button onClick={()=>{ if(confirm('Supprimer cette candidature ?')) onDelete(app.id); }}
              className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors">
              <Trash className="h-3.5 w-3.5"/> Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Dashboard principal ──────────────────────────────────────────────────────
export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm]             = useState({ email:'', password:'' });
  const [content, setContent]                 = useState<SiteContent|null>(null);
  const [applications, setApplications]       = useState<Application[]>([]);
  const [activeTab, setActiveTab]             = useState('messagerie');
  const [saveStatus, setSaveStatus]           = useState<'idle'|'saving'|'saved'|'error'>('idle');
  const [appFilter, setAppFilter]             = useState<string>('all');

  useEffect(() => {
    fetch('http://localhost:4000/api/content')
      .then(r=>r.json()).then(setContent).catch(console.error);
    fetch('http://localhost:4000/api/applications')
      .then(r=>r.json()).then(setApplications).catch(()=>setApplications([]));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email==='admin@green-up.com' && loginForm.password==='admin123') {
      setIsAuthenticated(true);
    } else { alert('Identifiants incorrects'); }
  };

  const saveContent = async () => {
    if (!content) return;
    setSaveStatus('saving');
    try {
      const res = await fetch('http://localhost:4000/api/content', {
        method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(content),
      });
      setSaveStatus(res.ok ? 'saved' : 'error');
      if (res.ok) setTimeout(()=>setSaveStatus('idle'), 2000);
    } catch { setSaveStatus('error'); }
  };

  const updateApplication = async (id:number, patch:any) => {
    setApplications(apps => apps.map(a => a.id===id ? {...a,...patch} : a));
    try {
      await fetch(`http://localhost:4000/api/applications/${id}`, {
        method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify(patch),
      });
    } catch {}
  };

  const deleteApplication = async (id:number) => {
    setApplications(apps => apps.filter(a => a.id!==id));
    try { await fetch(`http://localhost:4000/api/applications/${id}`, { method:'DELETE' }); } catch {}
  };

  const unreadCount = applications.filter(a=>!a.read).length;

  const filteredApps = appFilter==='all'
    ? applications
    : applications.filter(a => a.status===appFilter);

  // ── Login ──────────────────────────────────────────────────────────────────
  if (!isAuthenticated) return (
    <div className="min-h-screen bg-[#F0F0F0] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full border border-[#E0E0E0] shadow-xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#1FAB89]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Layout className="h-7 w-7 text-[#1FAB89]"/>
          </div>
          <h1 className="text-2xl font-bold text-[#2D2D2D]">Administration</h1>
          <p className="text-sm text-[#696969] mt-1">Green Up Academy</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          {[{label:'Email',type:'email',key:'email'},{label:'Mot de passe',type:'password',key:'password'}].map(f=>(
            <div key={f.key}>
              <label className="block text-xs font-semibold text-[#696969] uppercase tracking-wider mb-1.5">{f.label}</label>
              <input type={f.type} value={(loginForm as any)[f.key]}
                onChange={e=>setLoginForm(l=>({...l,[f.key]:e.target.value}))}
                className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] text-sm outline-none focus:border-[#1FAB89] focus:ring-2 focus:ring-[#1FAB89]/20"/>
            </div>
          ))}
          <button type="submit" className="w-full bg-[#1FAB89] hover:bg-[#15896B] text-white py-3 rounded-xl font-bold transition-all mt-2">
            Se connecter
          </button>
          <p className="text-xs text-center text-[#B0B0B0]">admin@green-up.com / admin123</p>
        </form>
      </div>
    </div>
  );

  if (!content) return <div className="min-h-screen flex items-center justify-center text-[#696969]">Chargement…</div>;

  const TABS = [
    { id:'messagerie',   label:'Messagerie',  icon:Inbox,        badge: unreadCount > 0 ? unreadCount : null },
    { id:'general',      label:'Général',     icon:Layout,       badge:null },
    { id:'programs',     label:'Programmes',  icon:BookOpen,     badge:null },
    { id:'testimonials', label:'Témoignages', icon:MessageSquare,badge:null },
    { id:'whyChooseUs',  label:'Atouts',      icon:Settings,     badge:null },
    { id:'cta',          label:'CTA',         icon:ImageIcon,    badge:null },
    { id:'contact',      label:'Contact',     icon:Phone,        badge:null },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* ── Sidebar ── */}
      <div className="w-64 bg-white shadow-lg fixed h-full pt-20 flex flex-col">
        <div className="px-6 mb-6">
          <h2 className="text-lg font-bold text-[#2D2D2D]">Admin</h2>
          <p className="text-xs text-[#696969]">Green Up Academy</p>
        </div>
        <nav className="space-y-0.5 flex-1 overflow-y-auto">
          {TABS.map(tab=>{
            const Icon=tab.icon; const active=activeTab===tab.id;
            return (
              <button key={tab.id} onClick={()=>setActiveTab(tab.id)}
                className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-all
                  ${active?'bg-[#1FAB89]/10 text-[#1FAB89] border-r-4 border-[#1FAB89]':'text-[#696969] hover:bg-gray-50'}`}>
                <Icon className="w-4 h-4 mr-3"/>
                {tab.label}
                {tab.badge && (
                  <span className="ml-auto bg-[#1FAB89] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Contenu principal ── */}
      <div className="ml-64 flex-1 p-8 pt-24">

        {/* Header avec bouton save (sauf messagerie) */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-[#2D2D2D]">
            {TABS.find(t=>t.id===activeTab)?.label}
            {activeTab==='messagerie' && applications.length>0 && (
              <span className="ml-2 text-sm font-normal text-[#696969]">({applications.length} candidature{applications.length>1?'s':''})</span>
            )}
          </h1>
          {activeTab!=='messagerie' && (
            <button onClick={saveContent}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all
                ${saveStatus==='saved'?'bg-green-100 text-green-700':'bg-[#1FAB89] text-white hover:bg-[#15896B]'}`}>
              <Save className="w-4 h-4"/>
              {saveStatus==='saving'?'Enregistrement…':saveStatus==='saved'?'Enregistré !':'Enregistrer'}
            </button>
          )}
        </div>

        {/* ══════════════════════════════════════════════════════════════
            TAB — MESSAGERIE CANDIDATURES
        ══════════════════════════════════════════════════════════════ */}
        {activeTab==='messagerie' && (
          <div>
            {/* Stats rapides */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label:'Total',      val:applications.length,                               color:'text-[#2D2D2D]' },
                { label:'Non lues',   val:unreadCount,                                        color:'text-[#1FAB89]' },
                { label:'En étude',   val:applications.filter(a=>a.status==='en_etude').length, color:'text-amber-600' },
                { label:'Acceptées',  val:applications.filter(a=>a.status==='accepté').length,  color:'text-green-600' },
              ].map((s,i)=>(
                <div key={i} className="bg-white rounded-2xl p-4 border border-[#E0E0E0] text-center">
                  <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
                  <p className="text-xs text-[#696969] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { id:'all',      label:'Toutes',     count:applications.length },
                { id:'nouveau',  label:'Nouvelles',  count:applications.filter(a=>a.status==='nouveau').length },
                { id:'en_etude', label:'En étude',   count:applications.filter(a=>a.status==='en_etude').length },
                { id:'accepté',  label:'Acceptées',  count:applications.filter(a=>a.status==='accepté').length },
                { id:'refusé',   label:'Refusées',   count:applications.filter(a=>a.status==='refusé').length },
              ].map(f=>(
                <button key={f.id} onClick={()=>setAppFilter(f.id)}
                  className={`text-sm px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2
                    ${appFilter===f.id?'bg-[#1FAB89] text-white shadow':'bg-white text-[#696969] border border-[#E0E0E0] hover:border-[#1FAB89] hover:text-[#1FAB89]'}`}>
                  {f.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${appFilter===f.id?'bg-white/20':'bg-[#F0F0F0] text-[#696969]'}`}>{f.count}</span>
                </button>
              ))}
            </div>

            {/* Liste candidatures */}
            {filteredApps.length === 0
              ? (
                <div className="bg-white rounded-2xl border border-[#E0E0E0] p-16 text-center">
                  <Inbox className="h-12 w-12 text-[#E0E0E0] mx-auto mb-3"/>
                  <p className="text-[#696969] font-medium">Aucune candidature</p>
                  <p className="text-xs text-[#B0B0B0] mt-1">Les candidatures du formulaire apparaîtront ici.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredApps.map(app=>(
                    <ApplicationCard key={app.id} app={app} onUpdate={updateApplication} onDelete={deleteApplication}/>
                  ))}
                </div>
              )
            }
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB — GÉNÉRAL
        ══════════════════════════════════════════════════════════════ */}
        {activeTab==='general' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold">Section Hero (Accueil)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titre principal</label>
                <input className="w-full p-2 border rounded" value={content.hero.title}
                  onChange={e=>setContent({...content,hero:{...content.hero,title:e.target.value}})}/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sous-titre</label>
                <textarea className="w-full p-2 border rounded" rows={3} value={content.hero.subtitle}
                  onChange={e=>setContent({...content,hero:{...content.hero,subtitle:e.target.value}})}/>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB — PROGRAMMES
        ══════════════════════════════════════════════════════════════ */}
        {activeTab==='programs' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            {content.programs.map((prog,idx)=>(
              <div key={idx} className="border p-4 rounded-lg bg-gray-50 relative">
                <button onClick={()=>setContent({...content,programs:content.programs.filter((_,i)=>i!==idx)})}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"><Trash className="w-4 h-4"/></button>
                <div className="grid gap-3">
                  <input className="w-full p-2 border rounded font-bold" value={prog.title}
                    onChange={e=>{const p=[...content.programs];p[idx].title=e.target.value;setContent({...content,programs:p});}}/>
                  <textarea className="w-full p-2 border rounded" rows={2} value={prog.description}
                    onChange={e=>{const p=[...content.programs];p[idx].description=e.target.value;setContent({...content,programs:p});}}/>
                </div>
              </div>
            ))}
            <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-[#1FAB89] hover:text-[#1FAB89] transition-all flex items-center justify-center gap-2 text-sm font-medium"
              onClick={()=>setContent({...content,programs:[...content.programs,{id:Date.now(),title:'Nouveau Programme',description:'Description…'}]})}>
              <Plus className="w-4 h-4"/> Ajouter un programme
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB — TÉMOIGNAGES
        ══════════════════════════════════════════════════════════════ */}
        {activeTab==='testimonials' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            {content.testimonials.map((t,idx)=>(
              <div key={idx} className="border p-4 rounded-lg bg-gray-50 relative">
                <button onClick={()=>setContent({...content,testimonials:content.testimonials.filter((_,i)=>i!==idx)})}
                  className="absolute top-2 right-2 text-red-500"><Trash className="w-4 h-4"/></button>
                <div className="grid grid-cols-2 gap-3">
                  {[['Nom','name'],['Rôle','role'],['Entreprise','company'],['Image URL','image'],['Programme','program']].map(([lbl,key])=>(
                    <div key={key}>
                      <label className="text-xs text-gray-500 mb-1 block">{lbl}</label>
                      <input className="w-full p-2 border rounded text-sm" value={(t as any)[key]}
                        onChange={e=>{const ts=[...content.testimonials];(ts[idx] as any)[key]=e.target.value;setContent({...content,testimonials:ts});}}/>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <label className="text-xs text-gray-500 mb-1 block">Citation</label>
                  <textarea className="w-full p-2 border rounded text-sm" rows={3} value={t.quote}
                    onChange={e=>{const ts=[...content.testimonials];ts[idx].quote=e.target.value;setContent({...content,testimonials:ts});}}/>
                </div>
              </div>
            ))}
            <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-[#1FAB89] hover:text-[#1FAB89] transition-all flex items-center justify-center gap-2 text-sm font-medium"
              onClick={()=>setContent({...content,testimonials:[...content.testimonials,{id:Date.now(),name:'Nouveau',role:'Étudiant',company:'Entreprise',image:'https://randomuser.me/api/portraits/lego/1.jpg',program:'Programme',quote:'Mon avis…',rating:5}]})}>
              <Plus className="w-4 h-4"/> Ajouter un témoignage
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB — ATOUTS
        ══════════════════════════════════════════════════════════════ */}
        {activeTab==='whyChooseUs' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <p className="text-sm text-gray-500">Icônes disponibles : Zap, Users, Briefcase, Award, Globe</p>
            {content.whyChooseUs.map((item,idx)=>(
              <div key={idx} className="border p-4 rounded-lg bg-gray-50">
                <div className="grid grid-cols-2 gap-3">
                  {[['Titre','title'],['Stat','stat'],['Label stat','statLabel'],['Icône','icon']].map(([lbl,key])=>(
                    <div key={key}>
                      <label className="text-xs text-gray-500 mb-1 block">{lbl}</label>
                      <input className="w-full p-2 border rounded text-sm" value={(item as any)[key]}
                        onChange={e=>{const w=[...content.whyChooseUs];(w[idx] as any)[key]=e.target.value;setContent({...content,whyChooseUs:w});}}/>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <label className="text-xs text-gray-500 mb-1 block">Description</label>
                  <textarea className="w-full p-2 border rounded text-sm" rows={2} value={item.description}
                    onChange={e=>{const w=[...content.whyChooseUs];w[idx].description=e.target.value;setContent({...content,whyChooseUs:w});}}/>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB — CTA
        ══════════════════════════════════════════════════════════════ */}
        {activeTab==='cta' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Titre</label>
              <input className="w-full p-2 border rounded" value={content.cta.title}
                onChange={e=>setContent({...content,cta:{...content.cta,title:e.target.value}})}/>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sous-titre</label>
              <textarea className="w-full p-2 border rounded" rows={2} value={content.cta.subtitle}
                onChange={e=>setContent({...content,cta:{...content.cta,subtitle:e.target.value}})}/>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {content.cta.dates.map((d,idx)=>(
                <div key={idx} className="border p-3 rounded-lg">
                  <label className="text-xs text-gray-500 block mb-1">Label</label>
                  <input className="w-full p-1 border rounded mb-2 text-sm" value={d.label}
                    onChange={e=>{const dates=[...content.cta.dates];dates[idx].label=e.target.value;setContent({...content,cta:{...content.cta,dates}});}}/>
                  <label className="text-xs text-gray-500 block mb-1">Sous-titre</label>
                  <input className="w-full p-1 border rounded text-sm" value={d.sub}
                    onChange={e=>{const dates=[...content.cta.dates];dates[idx].sub=e.target.value;setContent({...content,cta:{...content.cta,dates}});}}/>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB — CONTACT
        ══════════════════════════════════════════════════════════════ */}
        {activeTab==='contact' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <p className="text-sm text-[#696969] bg-[#1FAB89]/5 border border-[#1FAB89]/20 rounded-lg p-3">
              ℹ️ L'email de contact est utilisé comme destinataire des candidatures et messages. Il est automatiquement synchronisé avec <strong>dosyca35@gmail.com</strong>.
            </p>
            {[
              ['Directeur','director'],['Email','email'],['Téléphone','phone'],['Adresse','address'],
            ].map(([lbl,key])=>(
              <div key={key}>
                <label className="block text-sm font-medium mb-1">{lbl}</label>
                <input className="w-full p-2 border rounded" value={(content.contact as any)[key]}
                  onChange={e=>setContent({...content,contact:{...content.contact,[key]:e.target.value}})}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}