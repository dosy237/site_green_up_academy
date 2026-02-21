
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  Check,
  Upload,
  ArrowRight,
  ArrowLeft,
  User,
  GraduationCap,
  FileText
} from 'lucide-react';

export function AdmissionsPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [programs, setPrograms] = useState<string[]>([]);
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    diploma: 'Baccalauréat',
    school: '',
    year: '',
    gpa: '',
    program: '',
    motivation: '',
  });

  useEffect(() => {
    fetch('http://localhost:4000/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.programs && Array.isArray(data.programs)) {
           const progTitles = data.programs.map((p: any) => p.title);
           setPrograms(progTitles);
           setForm(f => ({ ...f, program: progTitles[0] || '' }));
        }
      })
      .catch(err => console.error("Failed to fetch programs", err));
  }, []);

  const [files, setFiles] = useState<Record<string, File | null>>({
    'CV': null,
    'Lettre de Motivation': null,
    'Relevés de notes': null,
    "Pièce d'identité": null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  const handleFileChange = (docName: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [docName]: file }));
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (currentStep === 1) {
      if (!form.lastName.trim()) newErrors.lastName = 'Ce champ est requis';
      if (!form.firstName.trim()) newErrors.firstName = 'Ce champ est requis';
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email invalide';
      if (!form.phone.trim()) newErrors.phone = 'Téléphone requis';
    }
    
    if (currentStep === 2) {
      if (!form.school.trim()) newErrors.school = "Établissement requis";
      if (!form.year.trim()) newErrors.year = "Année requise";
    }

    if (currentStep === 3) {
      if (!form.motivation.trim() || form.motivation.length < 20) {
        newErrors.motivation = 'Veuillez détailler votre motivation (min 20 caractères)';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
      const firstError = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstError)[0];
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      setErrors({});
    }

    return isValid;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Build form data
    const formData = new FormData();
    formData.append('name', `${form.firstName} ${form.lastName}`);
    formData.append('email', form.email);
    formData.append('subject', `Candidature: ${form.program}`);
    
    const message = `
      CANDIDATURE - Green Up Academy
      
      INFORMATIONS PERSONNELLES
      Nom: ${form.lastName}
      Prénom: ${form.firstName}
      Email: ${form.email}
      Téléphone: ${form.phone}

      PARCOURS
      Diplôme: ${form.diploma}
      Établissement: ${form.school}
      Année: ${form.year}
      Moyenne: ${form.gpa}

      CHOIX & MOTIVATION
      Programme: ${form.program}
      Motivation: ${form.motivation}
    `;
    formData.append('message', message);

    // Append files
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append('files', file);
      }
    });

    try {
      const res = await fetch('http://localhost:4000/api/send-application', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setIsSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        alert("Une erreur est survenue lors de l'envoi.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion au serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Infos Personnelles', icon: User },
    { number: 2, title: 'Parcours', icon: GraduationCap },
    { number: 3, title: 'Motivation', icon: FileText },
    { number: 4, title: 'Documents', icon: Upload }
  ];

  if (isSubmitted) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center animate-fade-in-up">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Candidature Reçue !
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Nous avons bien reçu votre dossier. Notre équipe pédagogique l'étudiera dans les plus brefs délais.
          </p>
          <Button onClick={() => window.location.href = '/'} className="w-full">
            Retour à l'accueil
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">Espace Candidature</h1>
          <p className="opacity-90">Rejoignez l'école de la transition écologique</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -z-10" />
            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = step >= s.number;
              const isCurrent = step === s.number;
              return (
                <div key={s.number} className="flex flex-col items-center bg-gray-50 dark:bg-dark-bg px-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`text-xs mt-2 font-medium ${isCurrent ? 'text-primary' : 'text-gray-500'}`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Card className="p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Vos informations</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nom *</label>
                    <input name="lastName" value={form.lastName} onChange={handleChange} className={`w-full p-2 rounded border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} dark:bg-dark-bg`} />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Prénom *</label>
                    <input name="firstName" value={form.firstName} onChange={handleChange} className={`w-full p-2 rounded border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} dark:bg-dark-bg`} />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} className={`w-full p-2 rounded border ${errors.email ? 'border-red-500' : 'border-gray-300'} dark:bg-dark-bg`} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Téléphone *</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} className={`w-full p-2 rounded border ${errors.phone ? 'border-red-500' : 'border-gray-300'} dark:bg-dark-bg`} />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Votre parcours</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Dernier diplôme *</label>
                    <select name="diploma" value={form.diploma} onChange={handleChange} className="w-full p-2 rounded border border-gray-300 dark:bg-dark-bg">
                      <option>Baccalauréat</option>
                      <option>Bac +2</option>
                      <option>Licence / Bachelor</option>
                      <option>Master</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Établissement *</label>
                    <input name="school" value={form.school} onChange={handleChange} className={`w-full p-2 rounded border ${errors.school ? 'border-red-500' : 'border-gray-300'} dark:bg-dark-bg`} />
                    {errors.school && <p className="text-red-500 text-xs mt-1">{errors.school}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Année *</label>
                    <input name="year" value={form.year} onChange={handleChange} placeholder="AAAA" className={`w-full p-2 rounded border ${errors.year ? 'border-red-500' : 'border-gray-300'} dark:bg-dark-bg`} />
                    {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Moyenne</label>
                    <input name="gpa" value={form.gpa} onChange={handleChange} className="w-full p-2 rounded border border-gray-300 dark:bg-dark-bg" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Votre projet</h2>
                <div>
                  <label className="block text-sm font-medium mb-1">Programme visé *</label>
                  <select name="program" value={form.program} onChange={handleChange} className="w-full p-2 rounded border border-gray-300 dark:bg-dark-bg">
                    {programs.length > 0 ? (
                      programs.map((p, i) => (
                        <option key={i} value={p}>{p}</option>
                      ))
                    ) : (
                      <option>Chargement des programmes...</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Motivations *</label>
                  <textarea name="motivation" rows={5} value={form.motivation} onChange={handleChange} className={`w-full p-2 rounded border ${errors.motivation ? 'border-red-500' : 'border-gray-300'} dark:bg-dark-bg`} placeholder="Pourquoi souhaitez-vous nous rejoindre ?" />
                  {errors.motivation && <p className="text-red-500 text-xs mt-1">{errors.motivation}</p>}
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Documents</h2>
                <p className="text-sm text-gray-500">Formats acceptés : PDF, JPG, PNG (Max 5Mo)</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.keys(files).map((key) => (
                    <div key={key} className="border border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <p className="font-medium text-sm mb-2">{key}</p>
                      <input
                        type="file"
                        id={key}
                        className="hidden"
                        accept=".pdf,.jpg,.png"
                        onChange={(e) => handleFileChange(key, e.target.files ? e.target.files[0] : null)}
                      />
                      <label htmlFor={key} className="cursor-pointer inline-block px-3 py-1 bg-white border border-gray-200 rounded text-sm hover:shadow-sm">
                        {files[key] ? 'Modifier' : 'Choisir un fichier'}
                      </label>
                      {files[key] && (
                        <p className="text-green-600 text-xs mt-2 truncate">
                          ✓ {files[key]?.name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Précédent
                </Button>
              ) : (
                <div />
              )}
              
              {step < 4 ? (
                <Button type="button" onClick={handleNext}>
                  Suivant <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading} className="bg-primary text-white">
                  {isLoading ? 'Envoi en cours...' : 'Envoyer ma candidature'}
                </Button>
              )}
            </div>

          </form>
        </Card>
      </div>
    </div>
  );
}
