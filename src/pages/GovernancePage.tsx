import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Mail, BookOpen, FlaskConical } from 'lucide-react';

export function GovernancePage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [activeTab, setActiveTab] = useState('direction');

  const direction = [
    {
      name: 'Charles Giscard Fongang',
      role: 'Président & Directeur Pédagogique',
      bio: "Fondateur de Green Up Academy, expert en stratégie numérique et transition écologique. Il pilote la vision pédagogique et académique de l'école.",
      image: '/images/enseignants/charles.png'
    },
    {
      name: 'Nady Belocime',
      role: 'Directrice Générale',
      bio: "Responsable de la gestion opérationnelle et du développement de l'école. Elle accompagne les étudiants et pilote les partenariats stratégiques.",
      image: '/images/enseignants/nady.png'
    }
  ];

  const equipe = [
    { name: 'Meryl Dupont', role: 'Responsable Pédagogique', image: '/images/enseignants/meryl.png' },
    { name: 'Salif Koné', role: 'Formateur Dev Web', image: '/images/enseignants/salif.png' },
    { name: 'Salamé Diallo', role: 'Formatrice Design', image: '/images/enseignants/salame.png' },
    { name: 'Basile Starynkevich', role: 'Formateur Cybersécurité', image: '/images/enseignants/basil.png' },
    { name: 'Mathieu Renard', role: 'Formateur Réseau', image: '/images/enseignants/math.png' },
    { name: 'Sophie Manager', role: 'Responsable Administrative', image: '/images/enseignants/manager.png' },
  ];

  const scientifique = [
    {
      name: 'Charles Giscard Fongang',
      image: '/images/enseignants/charles.png',
      travaux: [
        'Intelligence artificielle appliquée à la transition écologique',
        'Optimisation énergétique des systèmes numériques',
        'Pédagogie par projets dans l\'enseignement supérieur'
      ]
    },
    {
      name: 'Basile Starynkevich',
      image: '/images/enseignants/basil.png',
      travaux: [
        'Cybersécurité des infrastructures critiques',
        'Green IT et sobriété numérique',
        'Architecture réseau éco-responsable'
      ]
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <div className="bg-white dark:bg-dark-surface py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Gouvernance</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Une équipe dirigeante engagée et une équipe pédagogique de qualité pour guider chaque étudiant vers la réussite.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {[
            { id: 'direction', label: 'Direction' },
            { id: 'board', label: 'Équipe Pédagogique' },
            { id: 'scientific', label: 'Direction Scientifique' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gray-100'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="animate-fade-in-up">

          {/* DIRECTION */}
          {activeTab === 'direction' && (
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {direction.map((member, index) => (
                <Card key={index} className="text-center p-8">
                  <div className="w-36 h-36 mx-auto rounded-full overflow-hidden mb-6 border-4 border-primary/20">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1FAB89&color=fff&size=200`; }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                </Card>
              ))}
            </div>
          )}

          {/* ÉQUIPE PÉDAGOGIQUE */}
          {activeTab === 'board' && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {equipe.map((member, index) => (
                <Card key={index} className="flex items-center gap-4 p-5">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1FAB89&color=fff&size=100`; }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{member.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{member.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* DIRECTION SCIENTIFIQUE */}
          {activeTab === 'scientific' && (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {scientifique.map((member, index) => (
                <Card key={index} className="p-8">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1FAB89&color=fff&size=150`; }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                      <p className="text-primary text-sm font-medium flex items-center gap-1 mt-1">
                        <FlaskConical className="h-4 w-4" /> Chercheur & Formateur
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" /> Travaux & Domaines de recherche
                    </p>
                    <ul className="space-y-2">
                      {member.travaux.map((t, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <span className="text-primary font-bold mt-0.5">•</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter désactivée — remplacée par un message */}
        <div className="mt-20 bg-white dark:bg-dark-surface rounded-2xl p-8 text-center border border-gray-100 dark:border-gray-800 max-w-2xl mx-auto">
          <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Restez informé</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            L'abonnement à notre newsletter sera bientôt disponible. 
            En attendant, <a href="mailto:contact@green-up-academy.com" className="text-primary font-medium hover:underline">contactez-nous par email</a> pour recevoir nos actualités.
          </p>
        </div>
      </div>
    </div>
  );
}