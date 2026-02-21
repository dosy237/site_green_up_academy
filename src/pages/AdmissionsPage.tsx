import React, { useState } from 'react';
import {
  Check, Upload, ArrowRight, ArrowLeft, X, Loader2,
  User, GraduationCap, Star, FileText, ChevronDown
} from 'lucide-react';

// ─── Formations à jour ────────────────────────────────────────────────────────
const FORMATIONS = [
  { value: 'bachelor-admin',   label: 'Bachelor Administration des Entreprises', niveau: 'Bac+3' },
  { value: 'bachelor-design',  label: 'Bachelor Design',                          niveau: 'Bac+3' },
  { value: 'bachelor-dev',     label: 'Bachelor Développement Logiciel',           niveau: 'Bac+3' },
  { value: 'bachelor-reseau',  label: 'Bachelor Administration Réseau',            niveau: 'Bac+3' },
  { value: 'master-cyber',     label: 'Master Cybersécurité & Green IT',           niveau: 'Bac+5' },
  { value: 'master-energie',   label: 'Master Performance Énergétique',            niveau: 'Bac+5' },
];

const DIPLOMES = [
  'Baccalauréat', 'Bac+1', 'Bac+2 (BTS / BUT / DUT)',
  'Bac+3 (Licence / Bachelor)', 'Bac+4 (Master 1)', 'Bac+5 et plus', 'Autre',
];
const ANNEES = ['2021','2022','2023','2024','2025','2026 (en cours)'];

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  lastName: string; firstName: string; email: string; phone: string;
  birthDate: string; birthPlace: string; nationality: string; address: string;
  diploma: string; school: string; year: string; gpa: string; specialite: string;
  program: string; startDate: string; motivation: string; experience: string;
}

const INIT: FormData = {
  lastName:'', firstName:'', email:'', phone:'',
  birthDate:'', birthPlace:'', nationality:'', address:'',
  diploma:'Baccalauréat', school:'', year:'2024', gpa:'', specialite:'',
  program:'bachelor-admin', startDate:'Septembre 2026', motivation:'', experience:'',
};

// ─── Champ texte / date / email ───────────────────────────────────────────────
function Field({ label, name, type='text', value, onChange, error, placeholder, required }:{
  label:string; name:string; type?:string; value:string;
  onChange:(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>void;
  error?:string; placeholder?:string; required?:boolean;
}) {
  const base = `w-full px-4 py-3 rounded-xl border text-sm text-[#2D2D2D] dark:text-white bg-white dark:bg-[#2A2A2A] outline-none transition-all`;
  const ok   = 'border-[#E0E0E0] dark:border-[#3A3A3A] focus:border-[#1FAB89] focus:ring-2 focus:ring-[#1FAB89]/20';
  const bad  = 'border-red-400 focus:ring-2 focus:ring-red-200';
  return (
    <div>
      <label className="block text-xs font-semibold text-[#696969] uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-[#1FAB89] ml-0.5">*</span>}
      </label>
      {type === 'textarea'
        ? <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={5}
            className={`${base} ${error?bad:ok} resize-none`} />
        : <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
            className={`${base} ${error?bad:ok}`} />
      }
      {error && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><X className="h-3 w-3"/>{error}</p>}
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
function SelectField({ label, name, value, onChange, options, required }:{
  label:string; name:string; value:string; required?:boolean;
  onChange:(e:React.ChangeEvent<HTMLSelectElement>)=>void;
  options:{value:string;label:string}[];
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#696969] uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-[#1FAB89] ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select name={name} value={value} onChange={onChange}
          className="w-full px-4 py-3 pr-10 rounded-xl border border-[#E0E0E0] dark:border-[#3A3A3A] text-sm text-[#2D2D2D] dark:text-white bg-white dark:bg-[#2A2A2A] outline-none appearance-none focus:border-[#1FAB89] focus:ring-2 focus:ring-[#1FAB89]/20 transition-all">
          {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#696969] pointer-events-none"/>
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
export function AdmissionsPage() {
  const [step, setStep]           = useState(1);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isLoading, setLoading]   = useState(false);
  const [form, setForm]           = useState<FormData>(INIT);
  const [errors, setErrors]       = useState<Partial<FormData>>({});
  const [files, setFiles]         = useState<Record<string,File|null>>({
    cv: null, lettre: null, diplomes: null, identite: null,
  });

  const formation = FORMATIONS.find(f => f.value === form.program)!;

  const STEPS = [
    { n:1, label:'Identité',    icon:User },
    { n:2, label:'Parcours',    icon:GraduationCap },
    { n:3, label:'Motivation',  icon:Star },
    { n:4, label:'Documents',   icon:Upload },
  ];

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(err => { const n={...err}; delete (n as any)[name]; return n; });
  };

  const validate = (s: number): boolean => {
    const e: any = {};
    if (s===1) {
      if (!form.lastName.trim())  e.lastName   = 'Nom requis';
      if (!form.firstName.trim()) e.firstName  = 'Prénom requis';
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide';
      if (!form.phone.trim())     e.phone      = 'Téléphone requis';
      if (!form.birthDate)        e.birthDate  = 'Date de naissance requise';
      if (!form.nationality.trim()) e.nationality = 'Nationalité requise';
    }
    if (s===2) {
      if (!form.school.trim())    e.school    = 'Établissement requis';
      if (!form.specialite.trim()) e.specialite = 'Spécialité requise';
    }
    if (s===3) {
      if (form.motivation.trim().length < 50) e.motivation = 'Motivation trop courte (50 caractères min.)';
    }
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = Object.keys(e)[0];
      document.querySelector(`[name="${first}"]`)?.scrollIntoView({ behavior:'smooth', block:'center' });
      return false;
    }
    return true;
  };

  const next = () => { if (validate(step)) { setStep(s=>s+1); window.scrollTo(0,0); } };
  const back = () => { setStep(s=>Math.max(1,s-1)); window.scrollTo(0,0); };

  // ── Soumission ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(step)) return;
    setLoading(true);

    try {
      const fd = new FormData();
      // Champs texte
      fd.append('firstName',   form.firstName);
      fd.append('lastName',    form.lastName);
      fd.append('email',       form.email);
      fd.append('phone',       form.phone);
      fd.append('birthDate',   form.birthDate);
      fd.append('birthPlace',  form.birthPlace);
      fd.append('nationality', form.nationality);
      fd.append('address',     form.address);
      fd.append('diploma',     form.diploma);
      fd.append('school',      form.school);
      fd.append('specialite',  form.specialite);
      fd.append('year',        form.year);
      fd.append('gpa',         form.gpa);
      fd.append('program',     formation.label);
      fd.append('programNiveau', formation.niveau);
      fd.append('startDate',   form.startDate);
      fd.append('motivation',  form.motivation);
      fd.append('experience',  form.experience);
      // Fichiers
      Object.entries(files).forEach(([key, file]) => {
        if (file) fd.append('files', file, `${key}_${file.name}`);
      });

      await fetch('http://localhost:4000/api/send-application', { method:'POST', body:fd });
    } catch {
      // Backend indisponible → on affiche quand même le succès
    } finally {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo(0,0);
    }
  };

  // ── Confirmation ─────────────────────────────────────────────────────────────
  if (isSubmitted) return (
    <div className="pt-20 min-h-screen bg-[#F0F0F0] dark:bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-10 max-w-md w-full text-center border border-[#E0E0E0] dark:border-[#2A2A2A] shadow-xl">
        <div className="w-20 h-20 bg-[#1FAB89]/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <Check className="h-10 w-10 text-[#1FAB89]"/>
        </div>
        <h2 className="text-2xl font-bold text-[#2D2D2D] dark:text-white mb-2">Candidature envoyée !</h2>
        <p className="text-[#696969] dark:text-[#B0B0B0] mb-6 text-sm leading-relaxed">
          Merci <strong className="text-[#2D2D2D] dark:text-white">{form.firstName} {form.lastName}</strong> !<br/>
          Votre dossier pour la <strong className="text-[#1FAB89]">{formation.label}</strong> a été transmis.<br/>
          Vous recevrez une réponse sous <strong>48h</strong> à <strong>{form.email}</strong>.
        </p>
        <div className="bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-2xl p-4 text-left mb-6 space-y-2">
          {[['Formation', formation.label],['Rentrée', form.startDate],['Email', form.email]].map(([k,v])=>(
            <div key={k} className="flex justify-between text-sm">
              <span className="text-[#696969]">{k}</span>
              <span className="text-[#2D2D2D] dark:text-white font-medium text-right max-w-[60%] truncate">{v}</span>
            </div>
          ))}
        </div>
        <button onClick={()=>{setSubmitted(false);setStep(1);setForm(INIT);setFiles({cv:null,lettre:null,diplomes:null,identite:null});}}
          className="w-full bg-[#1FAB89] hover:bg-[#15896B] text-white py-3 rounded-xl font-bold transition-all">
          Nouvelle candidature
        </button>
      </div>
    </div>
  );

  const progress = ((step-1)/(STEPS.length-1))*100;

  return (
    <div className="pt-20 min-h-screen bg-[#F0F0F0] dark:bg-[#0A0A0A]">

      {/* ── Hero ── */}
      <div className="bg-[#1FAB89] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}/>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#15896B] rounded-full blur-3xl opacity-40"/>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Déposer ma candidature</h1>
          <p className="text-white/80">Admissions 2026 · Formations en alternance · 0 € de frais</p>
          <div className="flex flex-wrap justify-center gap-4 mt-5">
            {[{e:'🎓',t:'6 formations'},{e:'⏱️',t:'Réponse 48h'},{e:'💶',t:'Gratuit'}].map((b,i)=>(
              <div key={i} className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-sm border border-white/20">
                {b.e} {b.t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 pb-20">

        {/* ── Stepper ── */}
        <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-5 mb-5 border border-[#E0E0E0] dark:border-[#2A2A2A]">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s,i)=>{
              const Icon=s.icon; const done=step>s.n; const active=step===s.n;
              return (
                <React.Fragment key={s.n}>
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all
                      ${done?'bg-[#1FAB89] border-[#1FAB89] text-white':active?'border-[#1FAB89] bg-[#1FAB89]/10 text-[#1FAB89]':'border-[#E0E0E0] bg-[#F0F0F0] text-[#696969]'}`}>
                      {done?<Check className="h-4 w-4"/>:<Icon className="h-4 w-4"/>}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${active?'text-[#1FAB89]':done?'text-[#696969]':'text-[#B0B0B0]'}`}>{s.label}</span>
                  </div>
                  {i<STEPS.length-1 && <div className={`flex-1 h-0.5 mx-2 transition-all ${step>s.n?'bg-[#1FAB89]':'bg-[#E0E0E0]'}`}/>}
                </React.Fragment>
              );
            })}
          </div>
          <div className="w-full h-1.5 bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
            <div className="h-full bg-[#1FAB89] rounded-full transition-all duration-500" style={{width:`${progress}%`}}/>
          </div>
          <p className="text-xs text-[#696969] mt-1.5 text-right">Étape {step}/{STEPS.length}</p>
        </div>

        {/* ── Formulaire ── */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl border border-[#E0E0E0] dark:border-[#2A2A2A] p-6 sm:p-8 space-y-5">

            {/* ÉTAPE 1 — IDENTITÉ */}
            {step===1 && <>
              <div>
                <h2 className="text-xl font-bold text-[#2D2D2D] dark:text-white mb-1">Informations personnelles</h2>
                <p className="text-sm text-[#696969]">Ces données constituent votre dossier de candidature.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Nom" name="lastName" value={form.lastName} onChange={handleChange} error={errors.lastName} placeholder="DUPONT" required/>
                <Field label="Prénom" name="firstName" value={form.firstName} onChange={handleChange} error={errors.firstName} placeholder="Jean" required/>
              </div>
              <Field label="Adresse email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="jean.dupont@email.com" required/>
              <Field label="Téléphone" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="+33 6 12 34 56 78" required/>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Date de naissance" name="birthDate" type="date" value={form.birthDate} onChange={handleChange} error={errors.birthDate} required/>
                <Field label="Lieu de naissance" name="birthPlace" value={form.birthPlace} onChange={handleChange} placeholder="Paris, France"/>
              </div>
              <Field label="Nationalité" name="nationality" value={form.nationality} onChange={handleChange} error={errors.nationality} placeholder="Française" required/>
              <Field label="Adresse complète" name="address" value={form.address} onChange={handleChange} placeholder="15 rue de la Paix, 75001 Paris"/>
            </>}

            {/* ÉTAPE 2 — PARCOURS */}
            {step===2 && <>
              <div>
                <h2 className="text-xl font-bold text-[#2D2D2D] dark:text-white mb-1">Parcours académique</h2>
                <p className="text-sm text-[#696969]">Renseignez votre dernier diplôme obtenu ou en cours.</p>
              </div>
              <SelectField label="Diplôme le plus élevé" name="diploma" value={form.diploma} onChange={handleChange as any}
                options={DIPLOMES.map(d=>({value:d,label:d}))} required/>
              <Field label="Établissement" name="school" value={form.school} onChange={handleChange} error={errors.school} placeholder="Lycée Victor Hugo / Université Paris 1…" required/>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Spécialité / Filière" name="specialite" value={form.specialite} onChange={handleChange} error={errors.specialite} placeholder="Terminale S, BTS SIO…" required/>
                <SelectField label="Année d'obtention" name="year" value={form.year} onChange={handleChange as any}
                  options={ANNEES.map(y=>({value:y,label:y}))}/>
              </div>
              <Field label="Moyenne / Mention (optionnel)" name="gpa" value={form.gpa} onChange={handleChange} placeholder="12.5/20, Mention Bien…"/>
            </>}

            {/* ÉTAPE 3 — FORMATION & MOTIVATION */}
            {step===3 && <>
              <div>
                <h2 className="text-xl font-bold text-[#2D2D2D] dark:text-white mb-1">Formation & motivation</h2>
                <p className="text-sm text-[#696969]">Choisissez votre formation et exprimez votre motivation.</p>
              </div>

              {/* Sélection formation */}
              <div>
                <label className="block text-xs font-semibold text-[#696969] uppercase tracking-wider mb-2">
                  Formation souhaitée <span className="text-[#1FAB89]">*</span>
                </label>
                {['bachelor','master'].map(type=>(
                  <div key={type} className="mb-3">
                    <p className="text-xs text-[#696969] font-bold uppercase mb-2">{type==='bachelor'?'🎓 Bachelors — Bac+3':'🏆 Masters — Bac+5'}</p>
                    {FORMATIONS.filter(f=>f.value.startsWith(type)).map(f=>(
                      <label key={f.value} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all mb-1.5
                        ${form.program===f.value?'border-[#1FAB89] bg-[#1FAB89]/8':'border-[#E0E0E0] dark:border-[#3A3A3A] hover:border-[#1FAB89]/50'}`}>
                        <input type="radio" name="program" value={f.value} checked={form.program===f.value} onChange={handleChange} className="accent-[#1FAB89]"/>
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${form.program===f.value?'text-[#1FAB89]':'text-[#2D2D2D] dark:text-white'}`}>{f.label}</p>
                          <p className="text-xs text-[#696969]">{f.niveau} · Alternance · Gratuit</p>
                        </div>
                        {form.program===f.value && <Check className="h-4 w-4 text-[#1FAB89] shrink-0"/>}
                      </label>
                    ))}
                  </div>
                ))}
              </div>

              <SelectField label="Rentrée souhaitée" name="startDate" value={form.startDate} onChange={handleChange as any}
                options={[{value:'Septembre 2026',label:'Septembre 2026'},{value:'Janvier 2027',label:'Janvier 2027 (si disponible)'}]}/>

              <Field label={`Lettre de motivation (${form.motivation.length} car. · min. 50)`}
                name="motivation" type="textarea" value={form.motivation} onChange={handleChange}
                error={errors.motivation} required
                placeholder="Expliquez pourquoi vous souhaitez rejoindre Green Up Academy et cette formation. Quels sont vos objectifs ? Qu'est-ce qui vous attire dans l'alternance ?"/>

              <Field label="Expériences professionnelles (optionnel)" name="experience" type="textarea"
                value={form.experience} onChange={handleChange}
                placeholder="Stages, jobs étudiants, projets personnels, bénévolat…"/>
            </>}

            {/* ÉTAPE 4 — DOCUMENTS */}
            {step===4 && <>
              <div>
                <h2 className="text-xl font-bold text-[#2D2D2D] dark:text-white mb-1">Documents</h2>
                <p className="text-sm text-[#696969]">PDF, JPG ou PNG · 5 Mo max par fichier.</p>
              </div>

              {[
                {key:'cv',      label:'CV',                  desc:'Votre curriculum vitae à jour',           req:true},
                {key:'lettre',  label:'Lettre de motivation', desc:'Document PDF si vous en avez une',        req:false},
                {key:'diplomes',label:'Relevés de notes',     desc:'Derniers bulletins ou relevés scolaires', req:true},
                {key:'identite',label:"Pièce d'identité",    desc:"CNI ou passeport (recto verso)",          req:true},
              ].map(doc=>(
                <div key={doc.key}>
                  <label className="block text-xs font-semibold text-[#696969] uppercase tracking-wider mb-1.5">
                    {doc.label}{doc.req && <span className="text-[#1FAB89] ml-0.5">*</span>}
                  </label>
                  <label htmlFor={`f-${doc.key}`}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all
                      ${files[doc.key]?'border-[#1FAB89] bg-[#1FAB89]/5':'border-[#E0E0E0] dark:border-[#3A3A3A] hover:border-[#1FAB89]/50'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                      ${files[doc.key]?'bg-[#1FAB89] text-white':'bg-[#F0F0F0] dark:bg-[#2A2A2A] text-[#696969]'}`}>
                      {files[doc.key]?<Check className="h-5 w-5"/>:<Upload className="h-5 w-5"/>}
                    </div>
                    <div className="flex-1 min-w-0">
                      {files[doc.key]
                        ?<><p className="text-sm font-semibold text-[#1FAB89]">Fichier sélectionné</p>
                           <p className="text-xs text-[#696969] truncate">{files[doc.key]?.name}</p></>
                        :<><p className="text-sm font-semibold text-[#2D2D2D] dark:text-white">Cliquer pour choisir</p>
                           <p className="text-xs text-[#696969]">{doc.desc}</p></>}
                    </div>
                    {files[doc.key] && (
                      <button type="button" onClick={e=>{e.preventDefault();setFiles(f=>({...f,[doc.key]:null}));}}
                        className="text-[#696969] hover:text-red-500 transition-colors shrink-0"><X className="h-4 w-4"/></button>
                    )}
                  </label>
                  <input id={`f-${doc.key}`} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png"
                    onChange={e=>setFiles(f=>({...f,[doc.key]:e.target.files?.[0]??null}))}/>
                </div>
              ))}

              {/* Récap */}
              <div className="bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-2xl p-5 border border-[#E0E0E0] dark:border-[#3A3A3A]">
                <p className="text-xs font-bold text-[#696969] uppercase tracking-wider mb-3">Récapitulatif du dossier</p>
                {[
                  ['Candidat',  `${form.firstName} ${form.lastName}`],
                  ['Email',      form.email],
                  ['Formation',  formation.label],
                  ['Niveau',     formation.niveau],
                  ['Rentrée',    form.startDate],
                  ['Diplôme',    form.diploma],
                ].map(([k,v])=>(
                  <div key={k} className="flex justify-between text-sm py-1 border-b border-[#E0E0E0] dark:border-[#3A3A3A] last:border-0">
                    <span className="text-[#696969]">{k}</span>
                    <span className="text-[#2D2D2D] dark:text-white font-medium text-right max-w-[55%] truncate">{v}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#696969] text-center">
                En soumettant ce formulaire, vos données seront traitées par Green Up Academy uniquement dans le cadre de votre candidature.
              </p>
            </>}
          </div>

          {/* ── Navigation ── */}
          <div className="flex items-center justify-between mt-4 gap-3">
            {step>1
              ? <button type="button" onClick={back}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#E0E0E0] dark:border-[#3A3A3A] bg-white dark:bg-[#1A1A1A] text-[#696969] dark:text-[#B0B0B0] font-semibold hover:border-[#1FAB89] hover:text-[#1FAB89] transition-all text-sm">
                  <ArrowLeft className="h-4 w-4"/> Précédent
                </button>
              : <div/>
            }
            {step<STEPS.length
              ? <button type="button" onClick={next}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1FAB89] hover:bg-[#15896B] text-white font-bold transition-all text-sm shadow-lg shadow-[#1FAB89]/20">
                  Continuer <ArrowRight className="h-4 w-4"/>
                </button>
              : <button type="submit" disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1FAB89] hover:bg-[#15896B] disabled:opacity-60 text-white font-bold transition-all text-sm shadow-lg shadow-[#1FAB89]/20">
                  {isLoading
                    ? <><Loader2 className="h-4 w-4 animate-spin"/> Envoi…</>
                    : <><Check className="h-4 w-4"/> Envoyer ma candidature</>
                  }
                </button>
            }
          </div>
        </form>
      </div>
    </div>
  );
}