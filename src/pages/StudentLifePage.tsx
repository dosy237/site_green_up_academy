// React default import not required with new JSX transform
import { Card } from '../components/ui/Card';
import { Calendar, Users, Coffee, Music } from 'lucide-react';
export function StudentLifePage() {
  const events = [
  {
    date: '15 Oct',
    title: 'Green Hackathon',
    desc: '48h pour innover pour la planète'
  },
  {
    date: '22 Oct',
    title: 'Conférence Climat',
    desc: 'Avec Jean-Marc Jancovici'
  },
  {
    date: '05 Nov',
    title: 'Afterwork Alumni',
    desc: 'Réseautage et convivialité'
  }];

  const clubs = [
  {
    name: 'BDE Green Spirit',
    icon: Users,
    desc: "Organisation des soirées et week-ends d'intégration."
  },
  {
    name: 'Club Tech & Éthique',
    icon: Coffee,
    desc: 'Débats et ateliers sur le numérique responsable.'
  },
  {
    name: 'Green Sports',
    icon: Music,
    desc: 'Running, escalade et yoga pour les étudiants.'
  }];

  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-dark-bg">
      {/* Hero */}
      <div className="relative h-96">
        <img
          src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1600&q=80"
          alt="Campus life"
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Vie Étudiante</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Un Campus au Cœur de Paris
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Situé à Châtelet, notre campus de 2000m² est un lieu de vie et
                d'apprentissage conçu pour le bien-être. Espaces de coworking,
                cafétéria bio, fablab... tout est pensé pour votre réussite.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
                  className="rounded-lg"
                  alt="Campus 1" />

                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                  className="rounded-lg"
                  alt="Campus 2" />

              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Associations & Clubs
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {clubs.map((club, index) =>
                <Card key={index} className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      <club.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {club.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {club.desc}
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-dark-surface p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Prochains Événements
              </h3>
              <div className="space-y-6">
                {events.map((event, index) =>
                <div key={index} className="flex gap-4 items-start">
                    <div className="bg-white dark:bg-dark-bg px-3 py-2 rounded-lg text-center shadow-sm border border-gray-100 dark:border-gray-700 min-w-[60px]">
                      <span className="block text-xs font-bold text-accent uppercase">
                        {event.date.split(' ')[1]}
                      </span>
                      <span className="block text-xl font-bold text-gray-900 dark:text-white">
                        {event.date.split(' ')[0]}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {event.desc}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}