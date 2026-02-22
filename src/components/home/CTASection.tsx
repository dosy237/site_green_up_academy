import { ArrowRight, Calendar, Users, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
export function CTASection() {
  return (
    <section className="py-32 bg-light-bg dark:bg-dark-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
              Rentrée Octobre 2025
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-light-text dark:text-dark-text mb-6 leading-tight">
              Prêt à{' '}
              <span className="font-display italic text-gradient">
                transformer
              </span>{' '}
              votre avenir ?
            </h2>
            <p className="text-xl text-light-muted dark:text-dark-muted mb-8 leading-relaxed">
              Rejoignez la prochaine promotion de leaders de la transition
              écologique. Places limitées, candidatures ouvertes jusqu'au 30
              juin 2025.
            </p>

            {/* Key dates */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-light-surface dark:bg-dark-surface">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-light-text dark:text-dark-text">
                    30 Juin
                  </p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">
                    Clôture candidatures
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-light-surface dark:bg-dark-surface">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-light-text dark:text-dark-text">
                    260 places
                  </p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">
                    Toutes formations
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-light-surface dark:bg-dark-surface">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-light-text dark:text-dark-text">
                    48h
                  </p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">
                    Réponse admission
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-white border-none shadow-lg shine">

                Postuler maintenant
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Télécharger la brochure
              </Button>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main card */}
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-10 text-white shadow-dramatic">
                <h3 className="text-2xl font-bold mb-6">
                  Journées Portes Ouvertes
                </h3>

                <div className="space-y-4 mb-8">
                  {[
                  {
                    date: '03 Mars 2025',
                    time: '10h - 17h'
                  },
                  {
                    date: '12 Avril 2025',
                    time: '10h - 17h'
                  },
                  {
                    date: '17 Mai 2025',
                    time: '10h - 17h'
                  }].
                  map((event, index) =>
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/10 backdrop-blur-sm">

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <span className="font-semibold">{event.date}</span>
                      </div>
                      <span className="text-white/80">{event.time}</span>
                    </div>
                  )}
                </div>

                <Button className="w-full bg-white text-primary hover:bg-white/90 border-none">
                  S'inscrire à une JPO
                </Button>
              </div>

              {/* Floating element */}
              <div className="absolute -top-6 -right-6 bg-white dark:bg-dark-card p-6 rounded-2xl shadow-card-hover">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                    <span className="text-3xl font-bold text-accent">?</span>
                  </div>
                  <div>
                    <p className="font-bold text-light-text dark:text-dark-text">
                      Des questions ?
                    </p>
                    <p className="text-sm text-light-muted dark:text-dark-muted">
                      Chattez avec nous
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}