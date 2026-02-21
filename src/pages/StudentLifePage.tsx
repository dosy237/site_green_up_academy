import { useState } from 'react';
import { Calendar, Users, Coffee, Music, MapPin, ChevronRight, X, Trophy, UserCheck, Activity } from 'lucide-react';

export function StudentLifePage() {
  const [selectedClub, setSelectedClub] = useState<string | null>(null);

  const events = [
    {
      date: '04 Mars',
      title: 'Green Up Talk Space',
      desc: 'Conférences et échanges autour du numérique responsable',
      color: 'bg-primary'
    },
    {
      date: 'Avril 2026',
      title: 'Publication projets Green Hackathon',
      desc: 'Découvrez les projets réalisés lors du hackathon de développement',
      color: 'bg-accent'
    },
    {
      date: '18 Mai',
      title: 'Conférence du Numérique',
      desc: 'Grande conférence annuelle sur les enjeux du numérique de demain',
      color: 'bg-secondary'
    }
  ];

  const clubs = [
    {
      id: 'bde',
      name: 'BDE Green Spirit',
      icon: Users,
      desc: "Organisation des événements étudiants, intégration et vie de campus.",
      color: 'bg-primary',
      bureauSortant: [
        { nom: 'Aminata Koné', poste: 'Présidente' },
        { nom: 'Kevin Mensah', poste: 'Vice-Président' },
        { nom: 'Fatou Diallo', poste: 'Trésorière' },
        { nom: 'Ibrahim Sy', poste: 'Secrétaire Général' },
      ],
      bureauEntrant: [
        { nom: 'Clara Owono', poste: 'Présidente' },
        { nom: 'Nathan Ekwueme', poste: 'Vice-Président' },
        { nom: 'Lucie Bambara', poste: 'Trésorière' },
        { nom: 'Moussa Traoré', poste: 'Secrétaire Général' },
      ],
      activites: [
        {
          titre: '🏆 Green Hackathon Dev',
          statut: 'en-cours',
          detail: "Le BDE Green Spirit organise actuellement un hackathon de développement. Les équipes travaillent sur des solutions innovantes pour la transition numérique. Les résultats seront publiés en avril 2026."
        }
      ]
    },
    {
      id: 'tech',
      name: 'Club Tech & Éthique',
      icon: Coffee,
      desc: 'Débats et ateliers sur le numérique responsable.',
      color: 'bg-blue-500',
      bureauSortant: [
        { nom: 'Raphaël Ndjock', poste: 'Président' },
        { nom: 'Yasmine Hassane', poste: 'Vice-Présidente' },
      ],
      bureauEntrant: [
        { nom: 'Pierre Akono', poste: 'Président' },
        { nom: 'Aïssatou Barry', poste: 'Vice-Présidente' },
      ],
      activites: []
    },
    {
      id: 'sports',
      name: 'Green Sports',
      icon: Music,
      desc: 'Running, escalade et yoga pour les étudiants.',
      color: 'bg-orange-500',
      bureauSortant: [
        { nom: 'Samuel Bilong', poste: 'Président' },
        { nom: 'Mariame Coulibaly', poste: 'Vice-Présidente' },
      ],
      bureauEntrant: [
        { nom: 'Thierry Nguema', poste: 'Président' },
        { nom: 'Nadia Ouédraogo', poste: 'Vice-Présidente' },
      ],
      activites: []
    }
  ];

  const activeClub = clubs.find(c => c.id === selectedClub);

  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-dark-bg">
      {/* Hero */}
      <div className="relative h-96">
        <img
          src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1600&q=80"
          alt="Campus life"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Vie Étudiante</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Campus */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Un Campus à Boussy-Saint-Antoine
              </h2>
              <div className="flex items-start gap-2 mb-4 text-primary">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  Boussy-Saint-Antoine, Essonne (91) — Île-de-France
                </p>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Notre campus est un lieu de vie et d'apprentissage conçu pour le bien-être des étudiants.
                Espaces de coworking, équipements modernes, environnement calme propice à la concentration —
                tout est pensé pour votre réussite.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
                  className="rounded-lg"
                  alt="Campus 1"
                />
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                  className="rounded-lg"
                  alt="Campus 2"
                />
              </div>
            </section>

            {/* Clubs */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Associations & Clubs
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                Cliquez sur un club pour voir ses membres et activités.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {clubs.map((club) => (
                  <div
                    key={club.id}
                    onClick={() => setSelectedClub(club.id)}
                    className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-2xl p-5 flex items-start gap-4 cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all duration-200 group"
                  >
                    <div className={`${club.color} p-3 rounded-xl text-white shrink-0 group-hover:scale-110 transition-transform`}>
                      <club.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {club.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{club.desc}</p>
                      {club.activites.length > 0 && (
                        <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                          🔴 {club.activites.length} activité en cours
                        </span>
                      )}
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary shrink-0 mt-1 transition-colors" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar événements */}
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Prochains Événements
              </h3>
              <div className="space-y-6">
                {events.map((event, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className={`${event.color} text-white text-xs font-bold px-3 py-2 rounded-lg text-center min-w-[64px] leading-tight shrink-0`}>
                      {event.date}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{event.title}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{event.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MODAL CLUB ===== */}
      {activeClub && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedClub(null)}
        >
          <div
            className="bg-white dark:bg-dark-surface rounded-3xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`${activeClub.color} rounded-t-3xl p-6 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <activeClub.icon className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">{activeClub.name}</h2>
              </div>
              <button
                onClick={() => setSelectedClub(null)}
                className="text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">

              {/* Activités en cours */}
              <div>
                <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-3">
                  <Activity className="h-5 w-5 text-primary" />
                  Activités
                </h3>
                {activeClub.activites.length === 0 ? (
                  <p className="text-gray-400 dark:text-gray-500 italic text-sm bg-gray-50 dark:bg-dark-bg rounded-xl p-4 text-center">
                    Aucune activité publiée pour le moment.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {activeClub.activites.map((act, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl border-l-4 border-primary bg-primary/5 dark:bg-primary/10"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{act.titre}</p>
                          {act.statut === 'en-cours' && (
                            <span className="shrink-0 text-xs bg-primary text-white px-2 py-0.5 rounded-full font-medium animate-pulse">
                              En cours
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{act.detail}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bureaux côte à côte */}
              <div className="grid grid-cols-2 gap-4">
                {/* Bureau Sortant */}
                <div className="bg-gray-50 dark:bg-dark-bg rounded-2xl p-4">
                  <h3 className="flex items-center gap-2 font-bold text-gray-700 dark:text-gray-300 text-sm mb-3">
                    <UserCheck className="h-4 w-4 text-gray-400" />
                    Bureau Sortant
                  </h3>
                  <div className="space-y-2">
                    {activeClub.bureauSortant.map((m, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-500">
                          {m.nom.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{m.nom}</p>
                          <p className="text-xs text-gray-400">{m.poste}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bureau Entrant */}
                <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-4 border border-primary/20">
                  <h3 className="flex items-center gap-2 font-bold text-primary text-sm mb-3">
                    <Trophy className="h-4 w-4" />
                    Bureau Entrant
                  </h3>
                  <div className="space-y-2">
                    {activeClub.bureauEntrant.map((m, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                          {m.nom.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">{m.nom}</p>
                          <p className="text-xs text-primary/70">{m.poste}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}