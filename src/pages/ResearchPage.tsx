// React default import not required with new JSX transform
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Microscope, Cpu, Globe, ArrowRight } from 'lucide-react';
export function ResearchPage({ onNavigate }: { onNavigate?: (page: string) => void }) {  const labs = [
  {
    title: 'Green IT Lab',
    icon: Cpu,
    desc: 'Optimisation de la consommation énergétique des data centers et algorithmes frugaux.',
    projects: 12
  },
  {
    title: 'Energy Performance Lab',
    icon: Microscope,
    desc: 'Nouveaux matériaux isolants et systèmes de gestion intelligente des bâtiments (BMS).',
    projects: 8
  },
  {
    title: 'Sustainable Business Lab',
    icon: Globe,
    desc: 'Modèles économiques circulaires et finance verte pour la transition.',
    projects: 5
  }];

  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-dark-bg">
      {/* Hero */}
      <div className="bg-secondary/10 dark:bg-secondary/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">
                Innovation
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Recherche &{' '}
                <span className="text-secondary">Développement</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Notre pôle de recherche appliquée travaille sur les solutions
                concrètes pour accélérer la transition écologique. Nos étudiants
                participent activement à ces projets innovants.
              </p>
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary-dark text-white">

                Découvrir nos projets
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80"
                alt="Laboratoire de recherche"
                className="rounded-2xl shadow-2xl" />

              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-dark-surface p-6 rounded-xl shadow-xl border-l-4 border-accent max-w-xs">
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  25+
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Projets de recherche actifs en 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Labs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Nos Laboratoires
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Trois pôles d'excellence pour couvrir l'ensemble des enjeux de la
            transition.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {labs.map((lab, index) =>
          <Card
            key={index}
            className="text-center hover:border-secondary/50 transition-colors group">

              <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                <lab.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {lab.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                {lab.desc}
              </p>
              <button
  onClick={() => onNavigate && onNavigate('contact')}
  className="inline-flex items-center text-secondary font-medium text-sm hover:underline cursor-pointer"
>
  {lab.projects} Projets en cours
  <ArrowRight className="ml-1 h-4 w-4" />
</button>
            </Card>
          )}
        </div>
        <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-8 italic">
         Cliquez sur un projet pour nous contacter et en savoir plus.
        </p>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 dark:bg-dark-surface py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Vous avez un projet innovant ?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Nous collaborons avec des startups et des grands groupes pour
            développer les technologies de demain.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">

            Proposer un partenariat
          </Button>
        </div>
      </div>
    </div>);

}