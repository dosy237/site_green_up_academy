import { useEffect, useState } from 'react';
import { ArrowRight, Play, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { ParticleBackground } from './ParticleBackground';
import { apiUrl } from '../../lib/api';
export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState({
    title: "Devenez l'Expert de la Transition Écologique",
    subtitle: "Formez-vous aux métiers de demain avec nos parcours d'excellence en performance énergétique, RSE et développement durable."
  });

  useEffect(() => {
    setIsVisible(true);
    fetch(apiUrl('/api/content'))
      .then(res => res.json())
      .then(data => {
        if (data.hero) setContent(data.hero);
      })
      .catch(err => console.error("Error fetching hero content:", err));
  }, []);
  const stats = [
  {
    value: '100%',
    label: 'Alternance',
    suffix: ''
  },
  {
    value: '95',
    label: "Taux d'insertion",
    suffix: '%'
  },
  {
    value: '20',
    label: 'Entreprises partenaires',
    suffix: '+'
  }];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white dark:bg-[#0F1410]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <ParticleBackground />
        {/* Gradient orbs avec couleurs charte */}
        <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-[#1FAB89]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#696969]/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Content - 7 columns */}
          <div className="lg:col-span-7 space-y-8">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#1FAB89]/10 border border-[#1FAB89]/30 backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FAB89] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1FAB89]"></span>
              </span>
              <span className="text-sm font-semibold text-[#1FAB89]">
                Admissions 2026 — Places limitées
              </span>
              <Sparkles className="h-4 w-4 text-[#1FAB89]" />
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1
                className={`text-5xl sm:text-6xl lg:text-7xl font-heading tracking-tight transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                <span className="block text-[#1F1F1F] dark:text-[#F5F7F3]">
                  Devenez acteur
                </span>
                <span className="block text-[#1F1F1F] dark:text-[#F5F7F3]">
                  de la
                </span>
                <span className="relative inline-block">
                  <span className="text-gradient font-heading">
                    transition
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none">

                    <path
                      d="M2 10C50 4 150 2 298 8"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      strokeLinecap="round" />

                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0"
                        y1="0"
                        x2="300"
                        y2="0">

                        <stop stopColor="#2D5016" />
                        <stop offset="1" stopColor="#FFD55F" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>
            </div>

            {/* Description */}
            <p
              className={`text-lg text-[#696969] max-w-xl leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

              L'école d'excellence pour les métiers de la{' '}
              <strong className="text-[#1FAB89]">performance énergétique</strong>,
              du <strong className="text-[#2D5016]">Green IT</strong> et du{' '}
              <strong className="text-[#2D5016]">numerique responsable</strong>.
              Formez-vous aux compétences les plus recherchées.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

              <Button
                size="lg"
                className="group bg-[#1FAB89] hover:bg-[#15896B] text-white border-none shadow-lg hover:shadow-xl transition-all duration-300">

                <span>Postuler maintenant</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group border-2 border-[#E8EBE3] hover:border-[#2D5016] hover:bg-[#F5F7F3] text-[#1F1F1F]">

                <Play className="mr-2 h-5 w-5 text-[#2D5016]" />
                <span>Découvrir l'école</span>
              </Button>
            </div>

            {/* Trust badges */}
            <div
              className={`flex items-center gap-6 pt-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) =>
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-[#0F1410] overflow-hidden shadow-lg">

                    <img
                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`}
                    alt="Student"
                    className="w-full h-full object-cover" />

                  </div>
                )}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-[#2D2D2D]">
                  Rejoignez notre communauté
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual - 5 columns */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>

              {/* Main Image Container */}
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-[2.5rem] border-2 border-dashed border-primary/30 animate-spin-slow"></div>

                {/* Image */}
                <div className="relative rounded-[2rem] overflow-hidden shadow-dramatic">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                    alt="Étudiants Green Up Academy"
                    className="w-full aspect-[4/5] object-cover" />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Play className="h-6 w-6 text-white fill-white" />
                      </div>
                      <div className="text-white">
                        <p className="font-semibold text-lg">
                          Visite virtuelle
                        </p>
                        <p className="text-white/80 text-sm">
                          Découvrez notre campus
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -top-6 -right-6 bg-white dark:bg-dark-card p-4 rounded-2xl shadow-card-hover animate-float z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-xl">
                      #1
                    </div>
                    <div>
                      <p className="font-bold text-light-text dark:text-dark-text">
                        École Green IT
                      </p>
                      <p className="text-xs text-light-muted dark:text-dark-muted">
                        en France
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-4 -left-8 bg-white dark:bg-dark-card p-5 rounded-2xl shadow-card-hover z-10"
                  style={{
                    animationDelay: '2s'
                  }}>

                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <svg className="w-16 h-16 -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="4" />

                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="url(#progress)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray="176"
                          strokeDashoffset="9" />

                        <defs>
                          <linearGradient id="progress">
                            <stop stopColor="#059669" />
                            <stop offset="1" stopColor="#F59E0B" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-bold text-primary">
                        95%
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-light-text dark:text-dark-text">
                        Insertion pro
                      </p>
                      <p className="text-xs text-light-muted dark:text-dark-muted">
                        à 6 mois
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 bg-gradient-to-r from-primary via-primary-dark to-primary py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center text-white transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{
                transitionDelay: `${500 + index * 100}ms`
              }}>

                <p className="text-4xl md:text-5xl font-bold mb-1">
                  {stat.value}
                  <span className="text-accent">{stat.suffix}</span>
                </p>
                <p className="text-white/80 text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-light-muted dark:text-dark-muted">
        <span className="text-xs font-medium tracking-wider uppercase">
          Découvrir
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </div>
    </section>);

}