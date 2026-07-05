import { apiUrl } from '../lib/api';
import React, { useState, useRef } from 'react';
import {
  Check, ArrowRight, ArrowLeft, X,
  User, GraduationCap, Star, FileText, ChevronDown, AlertCircle, Loader2
} from 'lucide-react';

// ─── Formations ───────────────────────────────────────────────────────────────
const FORMATIONS = [
  { value: 'bachelor-admin',  label: 'Bachelor Administration des Entreprises', niveau: 'Bac+3' },
  { value: 'bachelor-design', label: 'Bachelor Design',                          niveau: 'Bac+3' },
  { value: 'bachelor-dev',    label: 'Bachelor Développement Fullstack',          niveau: 'Bac+3' },
  { value: 'bachelor-reseau', label: 'Bachelor Infrastructures Réseau Sécurisé',  niveau: 'Bac+3' },
  { value: 'master-cyber',    label: 'Mastère Cybersécurité & Green IT',          niveau: 'Bac+5' },
  { value: 'master-energie',  label: 'Mastère Performance Énergétique',           niveau: 'Bac+5' },
];

const DIPLOMES = [
  'Baccalauréat', 'Bac+1', 'Bac+2 (BTS / BUT / DUT)',
  'Bac+3 (Licence / Bachelor)', 'Bac+4 (Master 1)', 'Bac+5 et plus', 'Autre',
];
const ANNEES = ['2021', '2022', '2023', '2024', '2025', '2026 (en cours)'];

// ─── Limites — DOIT correspondre exactement à index.js ────────────────────────
// index.js : FILE_LIMITS = { cv:1.5, letter:1.0, diploma:2.0, id:1.5, photo:1.0 }
// index.js : TOTAL_MAX_MB = 4
const TOTAL_MAX_MB = 4; // 4 Mo total max (aligné avec le backend)

const UPLOAD_DOCS = [
  {
    key:      'cv'      as const,
    label:    'Curriculum Vitae',
    desc:     'Votre CV à jour',
    accept:   '.pdf,.doc,.docx',
    acceptLabel: 'PDF, DOC, DOCX',
    maxMb:    1.5,   // aligné avec FILE_LIMITS.cv
    required: true,
  },
  {
    key:      'diploma' as const,
    label:    'Relevés de notes / Diplôme',
    desc:     'Derniers relevés ou diplôme obtenu',
    accept:   '.pdf,.jpg,.jpeg,.png',
    acceptLabel: 'PDF, JPG, PNG',
    maxMb:    2.0,   // aligné avec FILE_LIMITS.diploma
    required: true,
  },
  {
    key:      'id'      as const,
    label:    "Pièce d'identité",
    desc:     'CNI ou passeport (recto verso)',
    accept:   '.pdf,.jpg,.jpeg,.png',
    acceptLabel: 'PDF, JPG, PNG',
    maxMb:    1.5,   // aligné avec FILE_LIMITS.id
    required: true,
  },
  {
    key:      'letter'  as const,
    label:    'Lettre de motivation (optionnel)',
    desc:     'Si vous en avez une en version PDF',
    accept:   '.pdf,.doc,.docx',
    acceptLabel: 'PDF, DOC, DOCX',
    maxMb:    1.0,   // aligné avec FILE_LIMITS.letter
    required: false,
  },
] as const;

type FileKey = typeof UPLOAD_DOCS[number]['key'];

interface FormData {
  lastName: string; firstName: string; email: string; phone: string;
  birthDate: string; birthPlace: string; nationality: string; address: string;
  diploma: string; school: string; year: string; gpa: string; specialite: string;
  program: string; startDate: string; motivation: string; experience: string;
}

type FileState = Record<FileKey, File | null>;

const INIT: FormData = {
  lastName: '', firstName: '', email: '', phone: '',
  birthDate: '', birthPlace: '', nationality: '', address: '',
  diploma: 'Baccalauréat', school: '', year: '2024', gpa: '', specialite: '',
  program: 'bachelor-admin', startDate: 'Septembre 2026', motivation: '', experience: '',
};
const INIT_FILES: FileState = { cv: null, diploma: null, id: null, letter: null };

// ─── Utilitaire ───────────────────────────────────────────────────────────────
const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 Ko';
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`;
};

// ─── Composant : champ texte / textarea ───────────────────────────────────────
function Field({
  label, name, type = 'text', value, onChange, error, placeholder, required,
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string; placeholder?: string; required?: boolean;
}) {
  const base = 'w-full px-4 py-3 rounded-xl border text-sm text-[#2D2D2D] dark:text-white bg-white dark:bg-[#2A2A2A] outline-none transition-all';
  const ok  = 'border-[#E0E0E0] dark:border-[#3A3A3A] focus:border-[#1FAB89] focus:ring-2 focus:ring-[#1FAB89]/20';
  const bad = 'border-red-400 focus:ring-2 focus:ring-red-200';
  return (
    <div>
      <label className="block text-xs font-semibold text-[#696969] uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-[#1FAB89] ml-0.5">*</span>}
      </label>
      {type === 'textarea'
        ? <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={5}
            className={`${base} ${error ? bad : ok} resize-none`} />
        : <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
            className={`${base} ${error ? bad : ok}`} />
      }
      {error && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><X className="h-3 w-3" />{error}</p>}
    </div>
  );
}

// ─── Composant : select ───────────────────────────────────────────────────────
function SelectField({
  label, name, value, onChange, options, required,
}: {
  label: string; name: string; value: string; required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#696969] uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-[#1FAB89] ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select name={name} value={value} onChange={onChange}
          className="w-full px-4 py-3 pr-10 rounded-xl border border-[#E0E0E0] dark:border-[#3A3A3A] text-sm text-[#2D2D2D] dark:text-white bg-white dark:bg-[#2A2A2A] outline-none appearance-none focus:border-[#1FAB89] focus:ring-2 focus:ring-[#1FAB89]/20 transition-all">
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#696969] pointer-events-none" />
      </div>
    </div>
  );
}

// ─── Composant : zone upload d'un fichier ─────────────────────────────────────
function UploadZone({
  label, desc, accept, acceptLabel, maxMb, required,
  file, onFile, error,
}: {
  label: string; desc: string; accept: string; acceptLabel: string;
  maxMb: number; required: boolean;
  file: File | null; onFile: (f: File | null, err?: string) => void; error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const maxBytes = maxMb * 1024 * 1024;

  const handleFile = (f: File | null) => {
    if (!f) { onFile(null); return; }

    // Vérification type MIME via extension (le MIME réel est vérifié côté serveur)
    const ext = f.name.split('.').pop()?.toLowerCase() || '';
    const allowedExt = accept.replace(/\./g, '').split(',');
    if (!allowedExt.includes(ext)) {
      onFile(null, `Format non autorisé. Utilisez : ${acceptLabel}`);
      return;
    }

    // Vérification taille individuelle
    if (f.size > maxBytes) {
      onFile(null, `Fichier trop lourd (${formatSize(f.size)}). Limite : ${maxMb} Mo pour ce document.`);
      return;
    }

    onFile(f);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0] ?? null);
    // Reset input pour permettre re-sélection du même fichier
    if (inputRef.current) inputRef.current.value = '';
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    handleFile(e.dataTransfer.files?.[0] ?? null);
  };

  const hasFile = !!file;
  const pct = file ? Math.min(100, (file.size / maxBytes) * 100) : 0;
  const nearLimit = pct > 75;

  return (
    <div>
      <label className="block text-xs font-semibold text-[#696969] uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-[#1FAB89] ml-0.5">*</span>}
        <span className="ml-2 text-[#B0B0B0] normal-case font-normal">max {maxMb} Mo</span>
      </label>

      <div
        onClick={() => !hasFile && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all
          ${hasFile
            ? 'border-[#1FAB89] bg-[#1FAB89]/5 dark:bg-[#1FAB89]/10'
            : dragging
              ? 'border-[#1FAB89] bg-[#1FAB89]/5 scale-[1.01]'
              : error
                ? 'border-red-400 bg-red-50 dark:bg-red-900/10 cursor-pointer'
                : 'border-dashed border-[#E0E0E0] dark:border-[#3A3A3A] hover:border-[#1FAB89]/60 hover:bg-[#F0FDF9] cursor-pointer'
          }`}
      >
        {/* Icône état */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all
          ${hasFile ? 'bg-[#1FAB89] shadow-md shadow-[#1FAB89]/30' : error ? 'bg-red-100 dark:bg-red-900/20' : 'bg-[#F0F0F0] dark:bg-[#2A2A2A]'}`}>
          {hasFile
            ? <Check className="h-6 w-6 text-white" />
            : error
              ? <AlertCircle className="h-6 w-6 text-red-400" />
              : <FileText className="h-6 w-6 text-[#B0B0B0]" />
          }
        </div>

        {/* Texte */}
        <div className="flex-1 min-w-0">
          {hasFile ? (
            <>
              <p className="text-sm font-bold text-[#1FAB89]">Fichier sélectionné</p>
              <p className="text-xs text-[#696969] truncate mt-0.5">{file.name}</p>
              {/* Barre de taille */}
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex-1 h-1.5 bg-[#E0E0E0] dark:bg-[#3A3A3A] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${nearLimit ? 'bg-amber-400' : 'bg-[#1FAB89]'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className={`text-xs font-semibold shrink-0 ${nearLimit ? 'text-amber-500' : 'text-[#696969]'}`}>
                  {formatSize(file.size)} / {maxMb} Mo
                </span>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-[#2D2D2D] dark:text-white">
                Glisser-déposer ou <span className="text-[#1FAB89] underline underline-offset-2">parcourir</span>
              </p>
              <p className="text-xs text-[#696969] mt-0.5">{desc}</p>
              <p className="text-xs text-[#B0B0B0] mt-0.5">{acceptLabel}</p>
            </>
          )}
        </div>

        {/* Bouton supprimer */}
        {hasFile && (
          <button
            type="button"
            onClick={e => { e.stopPropagation(); onFile(null); }}
            className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 hover:bg-red-200 flex items-center justify-center transition-all shrink-0"
            title="Supprimer ce fichier"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}

        <input ref={inputRef} type="file" className="hidden" accept={accept} onChange={onChange} />
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
          <AlertCircle className="h-3 w-3 shrink-0" />{error}
        </p>
      )}
    </div>
  );
}

// ─── Composant : jauge du total ────────────────────────────────────────────────
function TotalSizeBar({ files }: { files: FileState }) {
  const totalBytes = Object.values(files).reduce((s, f) => s + (f?.size || 0), 0);
  if (totalBytes === 0) return null;

  const totalMb   = totalBytes / (1024 * 1024);
  const pct       = Math.min(100, (totalMb / TOTAL_MAX_MB) * 100);
  const isOver    = totalMb > TOTAL_MAX_MB;
  const isWarn    = pct > 75 && !isOver;

  return (
    <div className={`rounded-xl border px-4 py-3 ${
      isOver ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
             : isWarn ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800'
             : 'bg-[#F0FDF9] border-[#1FAB89]/20'
    }`}>
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-xs font-semibold text-[#696969] uppercase tracking-wider">Total des fichiers</p>
        <p className={`text-sm font-bold ${isOver ? 'text-red-600' : isWarn ? 'text-amber-600' : 'text-[#1FAB89]'}`}>
          {formatSize(totalBytes)} / {TOTAL_MAX_MB} Mo
        </p>
      </div>
      <div className="h-2 bg-[#E0E0E0] dark:bg-[#3A3A3A] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isOver ? 'bg-red-500' : isWarn ? 'bg-amber-400' : 'bg-[#1FAB89]'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {isOver && (
        <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1">
          <AlertCircle className="h-3 w-3 shrink-0" />
          Dépassement de {(totalMb - TOTAL_MAX_MB).toFixed(2)} Mo. Supprimez ou réduisez un fichier.
        </p>
      )}
      {isWarn && (
        <p className="text-xs text-amber-600 mt-1.5">
          Vous approchez de la limite ({TOTAL_MAX_MB} Mo max).
        </p>
      )}
    </div>
  );
}

// ─── Page principale ───────────────────────────────────────────────────────────
export function AdmissionsPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [step, setStep]             = useState(1);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isLoading, setLoading]     = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [form, setForm]             = useState<FormData>(INIT);
  const [errors, setErrors]         = useState<Record<string, string>>({});
  const [files, setFiles]           = useState<FileState>(INIT_FILES);

  const formation = FORMATIONS.find(f => f.value === form.program)!;

  const STEPS = [
    { n: 1, label: 'Identité',   icon: User          },
    { n: 2, label: 'Parcours',   icon: GraduationCap },
    { n: 3, label: 'Motivation', icon: Star          },
    { n: 4, label: 'Documents',  icon: FileText      },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(err => { const n = { ...err }; delete n[name]; return n; });
  };

  // Gestion d'un fichier : vérifie taille individuelle ET total global
  const handleFile = (key: FileKey) => (f: File | null, fileErr?: string) => {
    if (fileErr) {
      // Erreur de type ou taille individuelle signalée par UploadZone
      setErrors(err => ({ ...err, [key]: fileErr }));
      return;
    }

    if (f) {
      // Vérification du total AVANT d'accepter
      const futureFiles = { ...files, [key]: f };
      const totalBytes  = Object.values(futureFiles).reduce((s, x) => s + (x?.size || 0), 0);
      const totalMb     = totalBytes / (1024 * 1024);

      if (totalMb > TOTAL_MAX_MB) {
        setErrors(err => ({
          ...err,
          [key]: `Impossible d'ajouter ce fichier : le total atteindrait ${totalMb.toFixed(2)} Mo (limite : ${TOTAL_MAX_MB} Mo).`,
        }));
        return;
      }
    }

    setFiles(prev => ({ ...prev, [key]: f }));
    setErrors(err => { const n = { ...err }; delete n[key]; return n; });
  };

  // ── Validation par étape ────────────────────────────────────────────────────
  const validate = (s: number): boolean => {
    const e: Record<string, string> = {};

    if (s === 1) {
      if (!form.lastName.trim())    e.lastName    = 'Nom requis';
      if (!form.firstName.trim())   e.firstName   = 'Prénom requis';
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide';
      if (!form.phone.trim())       e.phone       = 'Téléphone requis';
      if (!form.birthDate)          e.birthDate   = 'Date de naissance requise';
      if (!form.nationality.trim()) e.nationality = 'Nationalité requise';
    }
    if (s === 2) {
      if (!form.school.trim())     e.school     = 'Établissement requis';
      if (!form.specialite.trim()) e.specialite = 'Spécialité requise';
    }
    if (s === 3) {
      if (form.motivation.trim().length < 50) e.motivation = 'Motivation trop courte (50 caractères min.)';
    }
    if (s === 4) {
      // Fichiers obligatoires
      if (!files.cv)      e.cv      = 'Votre CV est obligatoire';
      if (!files.diploma) e.diploma = 'Les relevés de notes sont obligatoires';
      if (!files.id)      e.id      = "La pièce d'identité est obligatoire";

      // Erreurs de taille déjà présentes
      ['cv', 'diploma', 'id', 'letter'].forEach(k => {
        if (errors[k]) e[k] = errors[k];
      });

      // Vérification total (dernier garde-fou)
      const totalMb = Object.values(files).reduce((s, f) => s + (f?.size || 0), 0) / (1024 * 1024);
      if (totalMb > TOTAL_MAX_MB) {
        e['total-files'] = `Total (${totalMb.toFixed(2)} Mo) dépasse la limite de ${TOTAL_MAX_MB} Mo.`;
      }
    }

    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = Object.keys(e)[0];
      const el = document.querySelector(`[name="${first}"]`) || document.querySelector(`.error-${first}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    return true;
  };

  const next = () => { if (validate(step)) { setStep(s => s + 1); window.scrollTo(0, 0); } };
  const back = () => { setStep(s => Math.max(1, s - 1)); window.scrollTo(0, 0); };

  // ── Soumission ──────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(step)) return;
    setLoading(true);
    setSubmitError('');

    try {
      const fd = new FormData();
      fd.append('firstName',     form.firstName);
      fd.append('lastName',      form.lastName);
      fd.append('email',         form.email);
      fd.append('phone',         form.phone);
      fd.append('birthDate',     form.birthDate);
      fd.append('birthPlace',    form.birthPlace);
      fd.append('nationality',   form.nationality);
      fd.append('address',       form.address);
      fd.append('diploma',       form.diploma);
      fd.append('school',        form.school);
      fd.append('specialite',    form.specialite);
      fd.append('year',          form.year);
      fd.append('gpa',           form.gpa);
      fd.append('program',       formation.label);
      fd.append('programNiveau', formation.niveau);
      fd.append('startDate',     form.startDate);
      fd.append('motivation',    form.motivation);
      fd.append('experience',    form.experience);

      if (files.cv)      fd.append('cv',      files.cv,      files.cv.name);
      if (files.letter)  fd.append('letter',  files.letter,  files.letter.name);
      if (files.diploma) fd.append('diploma', files.diploma, files.diploma.name);
      if (files.id)      fd.append('id',      files.id,      files.id.name);

      const res = await fetch(apiUrl('/api/send-application'), { method: 'POST', body: fd });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        // Erreur 413 = taille dépassée côté serveur
        if (res.status === 413) {
          throw new Error(data.error || `Fichiers trop volumineux (${res.status}). Réduisez la taille de vos documents.`);
        }
        throw new Error(data.error || `Erreur serveur (${res.status})`);
      }

      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Erreur inconnue');

      setSubmitted(true);
      window.scrollTo(0, 0);

    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Une erreur est survenue';
      if (msg.toLowerCase().includes('failed to fetch') || msg.includes('networkerror')) {
        setSubmitError('Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.');
      } else {
        setSubmitError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Écran confirmation ──────────────────────────────────────────────────────
  if (isSubmitted) return (
    <div className="pt-20 min-h-screen bg-[#F0F0F0] dark:bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-10 max-w-md w-full text-center border border-[#E0E0E0] dark:border-[#2A2A2A] shadow-xl">
        <div className="w-20 h-20 bg-[#1FAB89]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-14 h-14 bg-[#1FAB89] rounded-full flex items-center justify-center animate-bounce">
            <Check className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-[#2D2D2D] dark:text-white mb-2">Candidature soumise !</h2>
        <p className="text-[#696969] dark:text-[#B0B0B0] mb-6 text-sm leading-relaxed">
          Merci <strong className="text-[#2D2D2D] dark:text-white">{form.firstName} {form.lastName}</strong> !<br />
          Votre dossier pour <strong className="text-[#1FAB89]">{formation.label}</strong> a bien été transmis.<br />
          Vous recevrez une réponse sous <strong>48h</strong> à <strong>{form.email}</strong>.
        </p>
        <div className="bg-[#F0FDF9] border border-[#1FAB89]/20 rounded-2xl p-4 text-left mb-4">
          <p className="text-xs font-bold text-[#1FAB89] uppercase tracking-wider mb-2">Documents joints</p>
          <div className="space-y-1">
            {UPLOAD_DOCS.map(d => (
              <div key={d.key} className="flex items-center gap-2 text-xs">
                {files[d.key]
                  ? <><Check className="h-3.5 w-3.5 text-[#1FAB89]" /><span className="text-[#2D2D2D] dark:text-white truncate">{files[d.key]?.name}</span></>
                  : <><span className="text-[#B0B0B0]">—</span><span className="text-[#B0B0B0]">{d.label} non fourni</span></>
                }
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-2xl p-4 text-left mb-6 space-y-2">
          {[['Formation', formation.label], ['Rentrée', form.startDate], ['Email', form.email]].map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm">
              <span className="text-[#696969]">{k}</span>
              <span className="text-[#2D2D2D] dark:text-white font-medium text-right max-w-[60%] truncate">{v}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setSubmitted(false); setStep(1); setForm(INIT); setFiles(INIT_FILES); setErrors({});
            onNavigate?.('home');
          }}
          className="w-full flex items-center justify-center gap-2 bg-[#1FAB89] hover:bg-[#15896B] text-white py-3 rounded-xl font-bold transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
        </button>
      </div>
    </div>
  );

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="pt-20 min-h-screen bg-[#F0F0F0] dark:bg-[#0A0A0A]">

      {/* Hero */}
      <div className="bg-[#1FAB89] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
        />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#15896B] rounded-full blur-3xl opacity-40" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Déposer ma candidature</h1>
          <p className="text-white/80">Admissions 2026 · Formations en alternance · 100% gratuit</p>
          <div className="my-4 inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm border border-white/30">
            Clôture des candidatures : <strong>30 juillet 2026</strong>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {['6 formations', 'Réponse sous 48h', '100% gratuit'].map(t => (
              <div key={t} className="bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-sm border border-white/20">{t}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 pb-20">

        {/* Stepper */}
        <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-5 mb-5 border border-[#E0E0E0] dark:border-[#2A2A2A]">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s, i) => {
              const Icon   = s.icon;
              const done   = step > s.n;
              const active = step === s.n;
              return (
                <React.Fragment key={s.n}>
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all
                      ${done ? 'bg-[#1FAB89] border-[#1FAB89] text-white'
                             : active ? 'border-[#1FAB89] bg-[#1FAB89]/10 text-[#1FAB89]'
                             : 'border-[#E0E0E0] bg-[#F0F0F0] text-[#696969]'}`}>
                      {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block
                      ${active ? 'text-[#1FAB89]' : done ? 'text-[#696969]' : 'text-[#B0B0B0]'}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 transition-all ${step > s.n ? 'bg-[#1FAB89]' : 'bg-[#E0E0E0]'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div className="w-full h-1.5 bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
            <div className="h-full bg-[#1FAB89] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-[#696969] mt-1.5 text-right">Étape {step} / {STEPS.length}</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl border border-[#E0E0E0] dark:border-[#2A2A2A] p-6 sm:p-8 space-y-5">

            {/* ── ÉTAPE 1 — IDENTITÉ ─────────────────────────────────────── */}
            {step === 1 && <>
              <div>
                <h2 className="text-xl font-bold text-[#2D2D2D] dark:text-white mb-1">Informations personnelles</h2>
                <p className="text-sm text-[#696969]">Ces données constituent votre dossier de candidature.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Nom"    name="lastName"  value={form.lastName}  onChange={handleChange} error={errors.lastName}  placeholder="DUPONT" required />
                <Field label="Prénom" name="firstName" value={form.firstName} onChange={handleChange} error={errors.firstName} placeholder="Jean"   required />
              </div>
              <Field label="Adresse email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="jean.dupont@email.com" required />
              <Field label="Téléphone"     name="phone" type="tel"   value={form.phone} onChange={handleChange} error={errors.phone} placeholder="+33 6 12 34 56 78"    required />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Date de naissance" name="birthDate"  type="date" value={form.birthDate}  onChange={handleChange} error={errors.birthDate} required />
                <Field label="Lieu de naissance" name="birthPlace"             value={form.birthPlace}  onChange={handleChange} placeholder="Paris, France" />
              </div>
              <Field label="Nationalité"    name="nationality" value={form.nationality} onChange={handleChange} error={errors.nationality} placeholder="Française" required />
              <Field label="Adresse complète" name="address"   value={form.address}    onChange={handleChange} placeholder="15 rue de la Paix, 75001 Paris" />
            </>}

            {/* ── ÉTAPE 2 — PARCOURS ─────────────────────────────────────── */}
            {step === 2 && <>
              <div>
                <h2 className="text-xl font-bold text-[#2D2D2D] dark:text-white mb-1">Parcours académique</h2>
                <p className="text-sm text-[#696969]">Renseignez votre dernier diplôme obtenu ou en cours.</p>
              </div>
              <SelectField label="Diplôme le plus élevé" name="diploma" value={form.diploma}
                onChange={e => handleChange(e as React.ChangeEvent<HTMLSelectElement>)}
                options={DIPLOMES.map(d => ({ value: d, label: d }))} required />
              <Field label="Établissement" name="school" value={form.school} onChange={handleChange} error={errors.school}
                placeholder="Lycée Victor Hugo / Université Paris 1…" required />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Spécialité / Filière" name="specialite" value={form.specialite} onChange={handleChange}
                  error={errors.specialite} placeholder="Terminale S, BTS SIO…" required />
                <SelectField label="Année d'obtention" name="year" value={form.year}
                  onChange={e => handleChange(e as React.ChangeEvent<HTMLSelectElement>)}
                  options={ANNEES.map(y => ({ value: y, label: y }))} />
              </div>
              <Field label="Moyenne / Mention (optionnel)" name="gpa" value={form.gpa} onChange={handleChange}
                placeholder="12.5/20, Mention Bien…" />
            </>}

            {/* ── ÉTAPE 3 — FORMATION & MOTIVATION ───────────────────────── */}
            {step === 3 && <>
              <div>
                <h2 className="text-xl font-bold text-[#2D2D2D] dark:text-white mb-1">Formation & motivation</h2>
                <p className="text-sm text-[#696969]">Choisissez votre formation et exprimez votre motivation.</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#696969] uppercase tracking-wider mb-2">
                  Formation souhaitée <span className="text-[#1FAB89]">*</span>
                </label>
                {(['bachelor', 'master'] as const).map(type => (
                  <div key={type} className="mb-3">
                    <p className="text-xs text-[#696969] font-bold uppercase mb-2">
                      {type === 'bachelor' ? 'Bachelors — Bac+3' : 'Masters — Bac+5'}
                    </p>
                    {FORMATIONS.filter(f => f.value.startsWith(type)).map(f => (
                      <label key={f.value} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all mb-1.5
                        ${form.program === f.value ? 'border-[#1FAB89] bg-[#1FAB89]/5' : 'border-[#E0E0E0] dark:border-[#3A3A3A] hover:border-[#1FAB89]/50'}`}>
                        <input type="radio" name="program" value={f.value} checked={form.program === f.value} onChange={handleChange} className="accent-[#1FAB89]" />
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${form.program === f.value ? 'text-[#1FAB89]' : 'text-[#2D2D2D] dark:text-white'}`}>{f.label}</p>
                          <p className="text-xs text-[#696969]">{f.niveau} · Alternance · Gratuit</p>
                        </div>
                        {form.program === f.value && <Check className="h-4 w-4 text-[#1FAB89] shrink-0" />}
                      </label>
                    ))}
                  </div>
                ))}
              </div>
              <SelectField label="Rentrée souhaitée" name="startDate" value={form.startDate}
                onChange={e => handleChange(e as React.ChangeEvent<HTMLSelectElement>)}
                options={[
                  { value: 'Septembre 2026', label: 'Septembre 2026' },
                  { value: 'Janvier 2027',   label: 'Janvier 2027 (si disponible)' },
                ]} />
              <Field
                label={`Lettre de motivation (${form.motivation.length} car. · min. 50)`}
                name="motivation" type="textarea" value={form.motivation} onChange={handleChange}
                error={errors.motivation} required
                placeholder="Expliquez pourquoi vous souhaitez rejoindre Green Up Academy. Quels sont vos objectifs ?"
              />
              <Field
                label="Expériences professionnelles (optionnel)"
                name="experience" type="textarea" value={form.experience} onChange={handleChange}
                placeholder="Stages, jobs étudiants, projets personnels, bénévolat…"
              />
            </>}

            {/* ── ÉTAPE 4 — DOCUMENTS ────────────────────────────────────── */}
            {step === 4 && <>
              <div>
                <h2 className="text-xl font-bold text-[#2D2D2D] dark:text-white mb-1">Documents à joindre</h2>
                <p className="text-sm text-[#696969] mb-1">
                  Les champs <span className="text-[#1FAB89] font-bold">*</span> sont obligatoires.
                </p>
                {/* Récapitulatif des limites */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    <AlertCircle className="h-3 w-3" /> 1 Mo max par fichier (lettre)
                  </span>
                  <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    <AlertCircle className="h-3 w-3" /> {TOTAL_MAX_MB} Mo max au total
                  </span>
                </div>
              </div>

              {/* Zones upload */}
              {UPLOAD_DOCS.map(doc => (
                <UploadZone
                  key={doc.key}
                  label={doc.label}
                  desc={doc.desc}
                  accept={doc.accept}
                  acceptLabel={doc.acceptLabel}
                  maxMb={doc.maxMb}
                  required={doc.required}
                  file={files[doc.key]}
                  onFile={handleFile(doc.key)}
                  error={(errors as Record<string, string>)[doc.key]}
                />
              ))}

              {/* Jauge totale */}
              <TotalSizeBar files={files} />

              {/* Erreur total si dépassement */}
              {errors['total-files'] && (
                <div className="error-total-files flex items-start gap-2 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                  <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600 dark:text-red-400">{errors['total-files']}</p>
                </div>
              )}

              {/* Récapitulatif dossier */}
              <div className="bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-2xl p-5 border border-[#E0E0E0] dark:border-[#3A3A3A]">
                <p className="text-xs font-bold text-[#696969] uppercase tracking-wider mb-3">Récapitulatif du dossier</p>
                {[
                  ['Candidat',  `${form.firstName} ${form.lastName}`],
                  ['Email',     form.email],
                  ['Formation', formation.label],
                  ['Niveau',    formation.niveau],
                  ['Rentrée',   form.startDate],
                  ['Diplôme',   form.diploma],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm py-1.5 border-b border-[#E0E0E0] dark:border-[#3A3A3A] last:border-0">
                    <span className="text-[#696969]">{k}</span>
                    <span className="text-[#2D2D2D] dark:text-white font-medium text-right max-w-[55%] truncate">{v}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#696969] text-center leading-relaxed">
                En soumettant ce formulaire, vos données seront traitées par Green Up Academy
                uniquement dans le cadre de votre candidature, conformément au RGPD.
              </p>
            </>}
          </div>

          {/* Erreur soumission */}
          {submitError && (
            <div className="mt-4 flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4 gap-3">
            {step > 1
              ? <button type="button" onClick={back}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#E0E0E0] dark:border-[#3A3A3A] bg-white dark:bg-[#1A1A1A] text-[#696969] dark:text-[#B0B0B0] font-semibold hover:border-[#1FAB89] hover:text-[#1FAB89] transition-all text-sm">
                  <ArrowLeft className="h-4 w-4" /> Précédent
                </button>
              : <div />
            }
            {step < STEPS.length
              ? <button type="button" onClick={next}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1FAB89] hover:bg-[#15896B] text-white font-bold transition-all text-sm shadow-lg shadow-[#1FAB89]/20">
                  Continuer <ArrowRight className="h-4 w-4" />
                </button>
              : <button type="submit" disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1FAB89] hover:bg-[#15896B] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold transition-all text-sm shadow-lg shadow-[#1FAB89]/20">
                  {isLoading
                    ? <><Loader2 className="h-4 w-4 animate-spin" /> Envoi en cours…</>
                    : <><Check className="h-4 w-4" /> Envoyer ma candidature</>
                  }
                </button>
            }
          </div>
        </form>
      </div>
    </div>
  );
}