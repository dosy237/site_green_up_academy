import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// ── Imports locaux (src/lib/etudiant/) ─────────────────────────────────────────
import img1 from '../../lib/etudiant/etudiant1.jpeg';
import img2 from '../../lib/etudiant/etudiant2.jpeg';
import img3 from '../../lib/etudiant/etudiant3.jpeg';
import img4 from '../../lib/etudiant/etudiant4.jpeg';
import img5 from '../../lib/etudiant/etudiant5.jpg';
import img6 from '../../lib/etudiant/etudiant6.jpg';
import img7 from '../../lib/etudiant/etudiant7.jpeg';

// ── Photos en ligne pour les étudiants 8, 9, 10 ────────────────────────────────
const img8  = 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=200&q=80';
const img9  = 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=200&q=80';
const img10 = 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=200&q=80';

// ── Données ────────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Donfack Synthia Caroline',
    role: 'Étudiante – Présidente du Club IT',
    program: 'Bachelor 3 – Développement Logiciel',
    image: img1,
    rating: 5,
    quote: "Dès la première semaine, j'ai compris que cette école était différente. Les cours sont concrets et les formateurs vraiment disponibles. Je ne regrette pas mon choix.",
  },
  {
    id: 't-2',
    name: 'Nguefack Saurelle',
    role: 'Étudiante – Présidente de la BDE',
    program: 'Bachelor 1 – Cybersécurité',
    image: img2,
    rating: 5,
    quote: "L'ambiance est super et les projets qu'on réalise sont vraiment professionnels. En quelques mois, j'ai déjà un portfolio solide pour décrocher mon alternance.",
  },
  {
    id: 't-3',
    name: 'Pokam Brunelle',
    role: 'Étudiante en formation',
    program: 'Bachelor 1 – Administration Réseau',
    image: img3,
    rating: 5,
    quote: "Je voulais une formation où je pourrais apprendre et travailler en même temps. Green Up Academy m'a offert exactement ça, avec un accompagnement personnalisé.",
  },
  {
    id: 't-4',
    name: 'Tankou Raoult',
    role: 'Étudiant – Designer',
    program: 'Bachelor 3 – Design UI/UX',
    image: img4,
    rating: 5,
    quote: "Les intervenants sont des professionnels du secteur. Ce qu'on apprend en cours, on l'applique directement en entreprise. C'est une formation très valorisante.",
  },
  
  {
    id: 't-5',
    name: 'Leslie Fayelle',
    role: 'Étudiante – Responsable Communication BDE',
    program: 'Bachelor 3 – Développement Fullstack',
    image: img5,
    rating: 5,
    quote: "Choisir la Green Up Academy a été un vrai tournant. Grâce à une pédagogie axée sur la pratique, j'ai pu acquérir rapidement des compétences solides. J'apprécie particulièrement l'ambiance bienveillante.",
  },
  {
    id: 't-6',
    name: 'Prisca Elaba',
    role: 'Étudiante',
    program: 'Bachelor 3 – Développement Fullstack',
    image: img6,
    rating: 5,
    quote: "Je tiens à exprimer toute ma reconnaissance à Green Up Academy pour la qualité de son enseignement. J'ai pu développer mes compétences, gagner en confiance et mieux préparer mon avenir.",
  },
  {
    id: 't-7',
    name: 'Loic Kamga',
    role: 'Étudiant',
    program: 'Bachelor 3 – Réseau',
    image: img7,
    rating: 5,
    quote: "Je vis une expérience très enrichissante à Green Up Academy Paris. La formation est incroyable, l'apprentissage est constant et progressif grâce à des professeurs compétents et investis.",
  },
  {
    id: 't-8',
    name: 'Lucie Bambara',
    role: 'Étudiante en alternance',
    program: 'Licence 1 – Design',
    image: img8,
    rating: 5,
    quote: "L'école est moderne, les équipements aussi. On travaille sur des outils professionnels dès la première année. Ça change vraiment la donne pour trouver une alternance.",
  },
  {
    id: 't-9',
    name: 'Nathan Ekwueme',
    role: 'Alternant IT',
    program: 'Licence 1 – Sécurité & Réseau',
    image: img9,
    rating: 5,
    quote: "Ce que j'apprécie le plus, c'est la bienveillance de toute l'équipe pédagogique. On se sent soutenu et poussé à donner le meilleur de soi-même.",
  },
];

// ── Composant ──────────────────────────────────────────────────────────────────
export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const current = TESTIMONIALS[activeIndex];
  const total   = TESTIMONIALS.length;

  const prev = () => setActiveIndex(i => (i - 1 + total) % total);
  const next = () => setActiveIndex(i => (i + 1) % total);

  return (
    <section className="py-32 bg-gradient-to-br from-primary via-primary-dark to-emerald-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-semibold mb-4 backdrop-blur-sm">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ils ont{' '}
            <span className="font-display italic text-accent-light">réussi</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Découvrez les parcours inspirants de nos étudiants, aujourd'hui acteurs de la transition.
          </p>
        </div>

        {/* Miniatures cliquables */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveIndex(i)}
              title={t.name}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                i === activeIndex
                  ? 'border-white scale-110 shadow-lg shadow-white/30'
                  : 'border-white/30 opacity-60 hover:opacity-100 hover:border-white/70 hover:scale-105'
              }`}
            >
              <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-dramatic">

            {/* Icône quote */}
            <div className="absolute -top-6 left-12 w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-lg">
              <Quote className="h-6 w-6 text-white" />
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-center">

              {/* Photo */}
              <div className="md:col-span-4">
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      key={current.id}
                      src={current.image}
                      alt={current.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-white dark:bg-dark-surface px-4 py-2 rounded-xl shadow-lg">
                    <p className="text-sm font-bold text-light-text dark:text-dark-text">GREEN UP ACADEMY</p>
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="md:col-span-8">
                {/* Étoiles */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(current.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Citation */}
                <blockquote className="text-xl md:text-2xl text-light-text dark:text-dark-text leading-relaxed mb-6 font-medium">
                  "{current.quote}"
                </blockquote>

                {/* Identité */}
                <div>
                  <p className="font-bold text-lg text-light-text dark:text-dark-text">{current.name}</p>
                  <p className="text-light-muted dark:text-dark-muted">{current.role}</p>
                  <p className="text-sm text-primary font-medium mt-0.5">{current.program}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={prev}
                aria-label="Témoignage précédent"
                className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-light-muted dark:text-dark-muted hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Témoignage suivant"
                className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-light-muted dark:text-dark-muted hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}