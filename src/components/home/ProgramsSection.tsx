import { useState } from 'react';
import { ArrowRight, Clock, Award, Users, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
const programs = [
{
  id: 1,
  title: 'Bachelor Developpement logiciel ',
  subtitle: 'Le fondement de votre expertise',
  duration: '3 ans',
  level: 'Bac+3',
  students: '10 ',
  image:
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  color: 'from-emerald-500 to-teal-600',
  description:
  "Maîtrisez l'efficacité énergétique des bâtiments et des procédés industriels. Une formation complète alliant théorie et pratique terrain.",
  highlights: [
  'Audit énergétique',
  'Réglementation thermique',
  'BIM & Modélisation']

},
{
  id: 2,
  title: 'Master Cybersécurité & Green IT',
  subtitle: "L'alliance du numérique responsable",
  duration: '2 ans',
  level: 'Bac+5',
  students: '4',
  image:
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
  color: 'from-blue-500 to-indigo-600',
  description:
  'Sécurisez les infrastructures numériques tout en minimisant leur impact environnemental. Le profil le plus recherché du marché.',
  highlights: ['Sécurité des SI', 'Data centers verts', 'IA éthique']
},
{
    id: 3,
    title: 'Bachelor design ',
    subtitle: "devenez expert en conception visuelle et experience utilisateur ",
    duration: '3 ans',
    level: 'Bac+3',
    students: '10',
    image:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    color: 'from-purple-500 to-pink-600',
    description:
    'Devenez expert en efficacité énergétique des bâtiments et des procédés industriels.',
      highlights: ['design ui ux ', 'Design graphique ', 'motion design ']

  },
];

export function ProgramsSection() {
  const [activeProgram, setActiveProgram] = useState(0);
  return (
    <section className="py-32 bg-light-surface dark:bg-dark-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Nos Formations
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
              Des cursus d'<span className="text-gradient">excellence</span>
            </h2>
            <p className="text-lg text-light-muted dark:text-dark-muted">
              Formations diplômantes reconnues par l'État, conçues avec les
              leaders de l'industrie pour répondre aux défis de demain.
            </p>
          </div>
          <Button variant="outline" className="self-start lg:self-auto group">
            Tous les programmes
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Programs Grid - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8">
          {/* Program Cards - Left side */}
          <div className="col-span-5 space-y-4">
            {programs.map((program, index) =>
            <div
              key={program.id}
              className={`group cursor-pointer p-6 rounded-2xl transition-all duration-500 ${activeProgram === index ? 'bg-white dark:bg-dark-card shadow-card-hover scale-[1.02]' : 'bg-transparent hover:bg-white/50 dark:hover:bg-dark-card/50'}`}
              onMouseEnter={() => setActiveProgram(index)}
              onMouseLeave={() => {}}>

                <div className="flex items-start gap-4">
                  <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center text-white font-bold text-xl shrink-0 transition-transform duration-300 ${activeProgram === index ? 'scale-110' : ''}`}>

                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                    className={`font-bold text-lg mb-1 transition-colors ${activeProgram === index ? 'text-primary' : 'text-light-text dark:text-dark-text'}`}>

                      {program.title}
                    </h3>
                    <p className="text-sm text-light-muted dark:text-dark-muted mb-3">
                      {program.subtitle}
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1 text-light-muted dark:text-dark-muted">
                        <Clock className="h-3.5 w-3.5" /> {program.duration}
                      </span>
                      <span className="flex items-center gap-1 text-light-muted dark:text-dark-muted">
                        <Award className="h-3.5 w-3.5" /> {program.level}
                      </span>
                      <span className="flex items-center gap-1 text-light-muted dark:text-dark-muted">
                        <Users className="h-3.5 w-3.5" /> {program.students}{' '}
                        places
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                  className={`h-5 w-5 text-light-muted dark:text-dark-muted transition-all duration-300 ${activeProgram === index ? 'translate-x-1 text-primary' : ''}`} />

                </div>
              </div>
            )}
          </div>

          {/* Active Program Detail - Right side */}
          <div className="col-span-7 relative">
            <div className="sticky top-32">
              <div className="relative rounded-3xl overflow-hidden shadow-dramatic group">
                {/* Image with overlay */}
                <div className="aspect-[4/3] relative">
                  <img
                    src={programs[activeProgram].image}
                    alt={programs[activeProgram].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div
                    className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${programs[activeProgram].color} text-white text-xs font-semibold mb-4`}>

                    {programs[activeProgram].level} •{' '}
                    {programs[activeProgram].duration}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">
                    {programs[activeProgram].title}
                  </h3>
                  <p className="text-white/80 mb-6 max-w-lg">
                    {programs[activeProgram].description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {programs[activeProgram].highlights.map((highlight, i) =>
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">

                        {highlight}
                      </span>
                    )}
                  </div>

                  <Button className="bg-white text-light-text hover:bg-white/90 border-none shadow-lg">
                    Découvrir le programme
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden grid gap-6">
          {programs.map((program) =>
          <div
            key={program.id}
            className="group bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">

              <div className="aspect-video relative">
                <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div
                className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${program.color} text-white text-xs font-semibold`}>

                  {program.level}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-light-text dark:text-dark-text mb-2">
                  {program.title}
                </h3>
                <p className="text-light-muted dark:text-dark-muted text-sm mb-4">
                  {program.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-light-muted dark:text-dark-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {program.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {program.students}{' '}
                      places
                    </span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-primary">
                    Détails <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}