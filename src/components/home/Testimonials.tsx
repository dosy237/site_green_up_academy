import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
const testimonials = [
  // 10 étudiants en 1ère année
  {
    id: 1,
    name: 'Aminata Koné',
    role: 'Étudiante en alternance',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant1.png',
    program: 'Licence 1 – Dev Web',
    quote: "Dès la première semaine, j'ai compris que cette école était différente. Les cours sont concrets et les formateurs vraiment disponibles. Je ne regrette pas mon choix.",
    rating: 5
  },
  {
    id: 2,
    name: 'Kevin Mensah',
    role: 'Apprenti développeur',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant2.png',
    program: 'Licence 1 – Dev Web',
    quote: "L'ambiance est super et les projets qu'on réalise sont vraiment professionnels. En quelques mois, j'ai déjà un portfolio solide pour décrocher mon alternance.",
    rating: 5
  },
  {
    id: 3,
    name: 'Fatou Diallo',
    role: 'Étudiante en formation',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant3.png',
    program: 'Licence 1 – Design',
    quote: "Je voulais une formation où je pourrais apprendre et travailler en même temps. Green Up Academy m'a offert exactement ça, avec un accompagnement personnalisé.",
    rating: 5
  },
  {
    id: 4,
    name: 'Jean-Baptiste Nkurunziza',
    role: 'Alternant cybersécurité',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant4.png',
    program: 'Licence 1 – Sécurité & Réseau',
    quote: "Les intervenants sont des professionnels du secteur. Ce qu'on apprend en cours, on l'applique directement en entreprise. C'est une formation très valorisante.",
    rating: 5
  },
  {
    id: 5,
    name: 'Sophie Tran',
    role: 'Étudiante en alternance',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant5.png',
    program: 'Licence 1 – Dev Web',
    quote: "Green Up Academy m'a aidée à construire mon projet professionnel. Le suivi est régulier et les profs prennent vraiment le temps d'expliquer. Je recommande à 100%.",
    rating: 5
  },
  {
    id: 6,
    name: 'Moussa Traoré',
    role: 'Apprenti réseau',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant6.png',
    program: 'Licence 1 – Sécurité & Réseau',
    quote: "Venir d'une reconversion professionnelle était un défi, mais l'école m'a accompagné à chaque étape. Aujourd'hui je me sens vraiment compétent dans mon domaine.",
    rating: 5
  },
  {
    id: 7,
    name: 'Clara Owono',
    role: 'Étudiante designer',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant7.png',
    program: 'Licence 1 – Design',
    quote: "La pédagogie par projets est vraiment efficace. On apprend en faisant, et les retours des formateurs sont constructifs. C'est motivant du début à la fin.",
    rating: 5
  },
  {
    id: 8,
    name: 'Ibrahim Sy',
    role: 'Apprenti développeur',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant8.png',
    program: 'Licence 1 – Dev Web',
    quote: "En première année, j'ai déjà participé à un projet réel pour une PME. Cette expérience m'a ouvert les yeux sur ce que je veux faire de ma carrière.",
    rating: 5
  },
  {
    id: 9,
    name: 'Lucie Bambara',
    role: 'Étudiante en alternance',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant9.png',
    program: 'Licence 1 – Design',
    quote: "L'école est moderne, les équipements aussi. On travaille sur des outils professionnels dès la première année. Ça change vraiment la donne pour trouver une alternance.",
    rating: 5
  },
  {
    id: 10,
    name: 'Nathan Ekwueme',
    role: 'Alternant IT',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant10.png',
    program: 'Licence 1 – Sécurité & Réseau',
    quote: "Ce que j'apprécie le plus, c'est la bienveillance de toute l'équipe pédagogique. On se sent soutenu et poussé à donner le meilleur de soi-même.",
    rating: 5
  },
  // 10 étudiants en 3ème année
  {
    id: 11,
    name: 'Donfack Synthia',
    role: 'Étudiante Licence 3',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant11.png',
    program: 'Licence 3 – Dev Web',
    quote: "Trois ans après mes débuts ici, je peux dire que Green Up Academy m'a transformée professionnellement. Je travaille aujourd'hui chez un grand groupe et je gère des projets réels.",
    rating: 5
  },
  {
    id: 12,
    name: 'Raphaël Ndjock',
    role: 'Développeur Full Stack',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant12.png',
    program: 'Licence 3 – Dev Web',
    quote: "En 3ème année, le niveau technique est vraiment élevé. On maîtrise des stacks modernes et on est prêt pour le marché du travail bien avant la fin de la formation.",
    rating: 5
  },
  {
    id: 13,
    name: 'Aïssatou Barry',
    role: 'Ingénieure Cybersécurité',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant13.png',
    program: 'Licence 3 – Sécurité & Réseau',
    quote: "Green Up Academy m'a donné les outils pour évoluer rapidement. Dès ma 3ème année, j'avais déjà reçu une offre d'emploi de mon entreprise d'alternance.",
    rating: 5
  },
  {
    id: 14,
    name: 'Pierre Akono',
    role: 'Designer UX/UI Senior',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant14.png',
    program: 'Licence 3 – Design',
    quote: "Le portfolio que j'ai construit pendant ces 3 années m'a ouvert beaucoup de portes. Les projets réalisés avec les entreprises partenaires font vraiment la différence.",
    rating: 5
  },
  {
    id: 15,
    name: 'Mariame Coulibaly',
    role: 'Chargée de projet IT',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant15.png',
    program: 'Licence 3 – Dev Web',
    quote: "Ce que j'ai appris ici va bien au-delà du technique. La gestion de projet, le travail en équipe, la communication client — tout ça est enseigné avec sérieux.",
    rating: 5
  },
  {
    id: 16,
    name: 'Samuel Bilong',
    role: 'Expert Réseau',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant16.png',
    program: 'Licence 3 – Sécurité & Réseau',
    quote: "Arriver en 3ème année, c'est être en confiance totale. La progression est bien pensée et on voit clairement l'évolution entre la première et la dernière année.",
    rating: 5
  },
  {
    id: 17,
    name: 'Yasmine Hassane',
    role: 'Développeuse Mobile',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant17.png',
    program: 'Licence 3 – Dev Web',
    quote: "J'ai choisi Green Up Academy pour son sérieux et son côté humain. Trois ans plus tard, je n'aurais pas fait un autre choix. C'est une école qui prépare vraiment à la réalité.",
    rating: 5
  },
  {
    id: 18,
    name: 'Fabrice Ombolo',
    role: 'Analyste Sécurité',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant18.png',
    program: 'Licence 3 – Sécurité & Réseau',
    quote: "Les certifications préparées en 3ème année ont vraiment boosté mon CV. Mon employeur était impressionné par le niveau de compétence acquis ici.",
    rating: 5
  },
  {
    id: 19,
    name: 'Nadia Ouédraogo',
    role: 'Designer Graphique',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant19.png',
    program: 'Licence 3 – Design',
    quote: "La dernière année est intense mais tellement enrichissante. On travaille sur des briefs réels, on rencontre des clients, et on défend nos projets face à des professionnels.",
    rating: 5
  },
  {
    id: 20,
    name: 'Thierry Nguema',
    role: 'Chef de projet Digital',
    company: 'GREEN UP ACADEMY',
    image: '/src/assets/images/etudiants/etudiant20.png',
    program: 'Licence 3 – Dev Web',
    quote: "Green Up Academy m'a appris à aller au bout des choses. Le niveau d'exigence en 3ème année forge le caractère et prépare réellement au monde professionnel.",
    rating: 5
  }
];


export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState(testimonials);

  // Fetch testimonials from API
  useState(() => {
    fetch('http://localhost:4000/api/content')
      .then(res => res.json())
      .then(content => {
        if (content.testimonials && content.testimonials.length > 0) {
          setData(content.testimonials);
        }
      })
      .catch(err => console.error(err));
  });

  const nextTestimonial = () => {
    setData(prevData => {
       setActiveIndex((prev) => (prev + 1) % prevData.length);
       return prevData;
    });
  };
  const prevTestimonial = () => {
    setData(prevData => {
      setActiveIndex(
        (prev) => (prev - 1 + prevData.length) % prevData.length
      );
      return prevData;
    });
  };
  return (
    <section className="py-32 bg-gradient-to-br from-primary via-primary-dark to-emerald-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-semibold mb-4 backdrop-blur-sm">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ils ont{' '}
            <span className="font-display italic text-accent-light">
              réussi
            </span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Découvrez les parcours inspirants de nos anciens étudiants,
            aujourd'hui acteurs de la transition.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-dramatic">
            {/* Quote icon */}
            <div className="absolute -top-6 left-12 w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-lg">
              <Quote className="h-6 w-6 text-white" />
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-center">
              {/* Image */}
              <div className="md:col-span-4">
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img
                      src={data[activeIndex].image}
                      alt={data[activeIndex].name}
                      className="w-full h-full object-cover" />

                  </div>
                  {/* Company badge */}
                  <div className="absolute -bottom-4 -right-4 bg-white dark:bg-dark-surface px-4 py-2 rounded-xl shadow-lg">
                    <p className="text-sm font-bold text-light-text dark:text-dark-text">
                      {data[activeIndex].company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(data[activeIndex].rating || 5)].map((_, i) =>
                  <svg
                    key={i}
                    className="w-5 h-5 text-accent"
                    fill="currentColor"
                    viewBox="0 0 20 20">

                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  )}
                </div>

                <blockquote className="text-xl md:text-2xl text-light-text dark:text-dark-text leading-relaxed mb-6 font-medium">
                  "{data[activeIndex].quote}"
                </blockquote>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg text-light-text dark:text-dark-text">
                      {data[activeIndex].name}
                    </p>
                    <p className="text-light-muted dark:text-dark-muted">
                      {data[activeIndex].role}
                    </p>
                    <p className="text-sm text-primary font-medium">
                      {data[activeIndex].program}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-light-muted dark:text-dark-muted hover:border-primary hover:text-primary transition-colors">

                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                {data.map((_, index) =>
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-300 dark:bg-gray-600'}`} />

                )}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-light-muted dark:text-dark-muted hover:border-primary hover:text-primary transition-colors">

                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>);

}