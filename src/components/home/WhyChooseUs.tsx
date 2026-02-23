import { useEffect, useState } from 'react';
import {
  Zap,
  Users,
  MapPin,
  Briefcase,
  Award,
  Globe,
  ArrowUpRight,
} from 'lucide-react';
import { apiUrl } from '../../lib/api';

const iconMap: Record<string, any> = {
  Zap, Users, MapPin, Briefcase, Award, Globe,
};

export function WhyChooseUs() {
  const [features, setFeatures] = useState<any[]>([]);

  useEffect(() => {
    fetch(apiUrl('/api/content'))
      .then(res => res.json())
      .then(data => {
        if (data.whyChooseUs) setFeatures(data.whyChooseUs);
      })
      .catch(err => console.error(err));
  }, []);

  if (features.length === 0) return null;

  return (
    <section className="py-20 sm:py-32 bg-light-bg dark:bg-dark-bg relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Pourquoi nous choisir
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4 sm:mb-6">
            Une école{' '}
            <span className="font-display italic text-gradient">différente</span>
          </h2>
          <p className="text-base sm:text-lg text-light-muted dark:text-dark-muted leading-relaxed">
            Nous ne formons pas seulement des étudiants, nous façonnons les
            leaders de la transition écologique de demain.
          </p>
        </div>

        {/* Features Grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-dark-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover-lift border border-transparent hover:border-primary/20 transition-all duration-500"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary mb-5 sm:mb-6 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-light group-hover:text-white transition-all duration-300">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-bold text-light-text dark:text-dark-text mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted mb-5 sm:mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Stat */}
                  <div className="flex items-end justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div>
                      <p className="text-2xl sm:text-3xl font-bold text-gradient">{feature.stat}</p>
                      <p className="text-xs text-light-muted dark:text-dark-muted mt-0.5">{feature.statLabel}</p>
                    </div>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-light-muted dark:text-dark-muted group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                      <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}