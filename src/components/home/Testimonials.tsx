import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
const testimonials = [
{
  id: 1,
  name: 'donfack synthia c.',
  role: 'Etudiante ',
  company: 'GREEN UP ACADEMY',
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
  program: 'LICENCE 3 DEV',
  quote:
  "Green Up Academy m'a permis de transformer ma passion pour l'informatique en une carrière qui a du sens. Aujourd'hui, j'aide les grandes entreprises à réduire l'empreinte carbone de leurs systèmes d'information.",
  rating: 5
},
{
  id: 2,
  name: 'Sarah Martin',
  role: 'Cheffe de projet RSE',
  company: "L'Oréal",
  image: 'https://randomuser.me/api/portraits/women/44.jpg',
  program: 'Master Management Durable 2023',
  quote:
  "L'alternance chez L'Oréal pendant ma formation a été un véritable tremplin. Les cours étaient directement applicables et l'équipe pédagogique exceptionnelle. Je recommande à 100%.",
  rating: 5
},
{
  id: 3,
  name: 'Lucas Bernard',
  role: 'Ingénieur Efficacité Énergétique',
  company: 'EDF',
  image: 'https://randomuser.me/api/portraits/men/86.jpg',
  program: 'Bachelor Performance Énergétique 2022',
  quote:
  "Une formation complète qui m'a donné toutes les compétences techniques et relationnelles pour réussir. Le réseau d'anciens est un vrai plus pour trouver des opportunités.",
  rating: 5
}];

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