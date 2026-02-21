import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Zap, Shield, Leaf, Clock, Award, Euro } from 'lucide-react';
export function ProgramsPage() {
  const [filter, setFilter] = useState('all');
  const programs = [
  {
    id: 1,
    title: 'Bachelor Performance Énergétique',
    type: 'bachelor',
    duration: '3 ans',
    level: 'Bac+3',
    price: 'Gratuit (Alternance)',
    image:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    description:
    'Devenez expert en efficacité énergétique des bâtiments et des procédés industriels.',
    icon: Zap,
    color: 'text-yellow-500'
  },
  {
    id: 2,
    title: 'Bachelor Developpement logiciel ',
    type: 'bachelor',
    duration: '3 ans',
    level: 'Bac+3',
    price: 'Gratuit (Alternance)',
    image:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    description:
    'Devenez expert en efficacité énergétique des bâtiments et des procédés industriels.',
    icon: Zap,
    color: 'text-yellow-500'
  },
  {
    id: 3,
    title: 'Bachelor design ',
    type: 'bachelor',
    duration: '3 ans',
    level: 'Bac+3',
    price: 'Gratuit (Alternance)',
    image:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    description:
    'Devenez expert en efficacité énergétique des bâtiments et des procédés industriels.',
    icon: Zap,
    color: 'text-yellow-500'
  },
  {
    id: 4,
    title: 'Bachelor Sécurité et Administration Réseaux',
    type: 'bachelor',
    duration: '3 ans',
    level: 'Bac+3',
    price: 'Gratuit (Alternance)',
    image:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    description:
    'Devenez expert en efficacité énergétique des bâtiments et des procédés industriels.',
    icon: Zap,
    color: 'text-yellow-500'
  }, 
  {
    id: 5,
    title: 'Master Cybersécurité & Green IT',
    type: 'master',
    duration: '2 ans',
    level: 'Bac+5',
    price: 'Gratuit (Alternance)',
    image:
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    description:
    'Apprenez à sécuriser les infrastructures tout en minimisant leur empreinte carbone.',
    icon: Shield,
    color: 'text-blue-500'
  },
  {
    id: 6,
    title: 'Master Performance Énergétique',
    type: 'master',
    duration: '2 ans',
    level: 'Bac+5',
    price: 'Gratuit (Alternance)',
    image:
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    description:
    "Expertise avancée en audit et rénovation énergétique pour l'industrie et le bâtiment.",
    icon: Zap,
    color: 'text-green-500'
  },
  {
    id: 7,
    title: 'Master Management Durable',
    type: 'master',
    duration: '2 ans',
    level: 'Bac+5',
    price: 'Gratuit (Alternance)',
    image:
    'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?auto=format&fit=crop&w=800&q=80',
    description:
    'Pilotez la stratégie RSE et la transition écologique des entreprises.',
    icon: Leaf,
    color: 'text-primary'
  },
  {
    id: 8,
    title: "Chargé d'Affaires Rénovation",
    type: 'continue',
    duration: '6 mois',
    level: 'Certificat',
    price: 'Sur devis',
    image:
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    description:
    'Formation intensive pour piloter des projets de rénovation énergétique.',
    icon: Award,
    color: 'text-accent'
  },
  {
    id: 6,
    title: 'Audit Énergétique',
    type: 'continue',
    duration: '3 mois',
    level: 'Certificat',
    price: 'Sur devis',
    image:
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    description:
    'Maîtrisez les outils et méthodes pour réaliser des audits réglementaires.',
    icon: Award,
    color: 'text-accent'
  }];

  const filteredPrograms =
  filter === 'all' ? programs : programs.filter((p) => p.type === filter);
  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Hero Banner */}
      <div className="bg-primary py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nos Formations
          </h1>
          <p className="text-xl opacity-90">
            Des cursus d'excellence pour les métiers de demain.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
          {
            id: 'all',
            label: 'Toutes les formations'
          },
          {
            id: 'bachelor',
            label: 'Bachelors'
          },
          {
            id: 'master',
            label: 'Masters'
          },
          {
            id: 'continue',
            label: 'Formation Continue'
          }].
          map((tab) =>
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all ${filter === tab.id ? 'bg-accent text-white shadow-lg scale-105' : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>

              {tab.label}
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) =>
          <Card
            key={program.id}
            className="flex flex-col h-full p-0 overflow-hidden group border-0 shadow-lg">

              <div className="relative h-48 overflow-hidden">
                <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                <div className="absolute top-4 right-4 bg-white dark:bg-dark-surface px-3 py-1 rounded-full text-xs font-bold shadow-md uppercase tracking-wide text-primary">
                  {program.type}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-accent" />
                    {program.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-accent" />
                    {program.level}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                  {program.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow text-sm leading-relaxed">
                  {program.description}
                </p>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-primary font-bold">
                    <Euro className="h-4 w-4" />
                    {program.price}
                  </div>
                  <Button
                  size="sm"
                  variant="outline"
                  className="hover:bg-primary hover:text-white hover:border-primary">

                    Détails
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>);

}