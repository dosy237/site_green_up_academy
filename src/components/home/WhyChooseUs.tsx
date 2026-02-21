// React default import not required with new JSX transform
import { useEffect, useState } from 'react';
import {
  Zap,
  Users,
  MapPin,
  Briefcase,
  Award,
  Globe,
  ArrowUpRight } from
'lucide-react';

const iconMap: Record<string, any> = {
  Zap, Users, MapPin, Briefcase, Award, Globe
};

export function WhyChooseUs() {
  const [features, setFeatures] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.whyChooseUs) {
          setFeatures(data.whyChooseUs);
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (features.length === 0) return null;

  return (
    <section className="py-32 bg-light-bg dark:bg-dark-bg relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Pourquoi nous choisir
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-6">
            Une école{' '}
            <span className="font-display italic text-gradient">
              différente
            </span>
          </h2>
          <p className="text-lg text-light-muted dark:text-dark-muted">
            Nous ne formons pas seulement des étudiants, nous façonnons les
            leaders de la transition écologique de demain.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-dark-card rounded-3xl p-8 hover-lift border border-transparent hover:border-primary/20 transition-all duration-500">

                {/* Gradient background on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-light group-hover:text-white transition-all duration-300">
                    <Icon className="h-7 w-7" />
                  </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-light-muted dark:text-dark-muted mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Stat */}
                <div className="flex items-end justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="text-3xl font-bold text-gradient">
                      {feature.stat}
                    </p>
                    <p className="text-xs text-light-muted dark:text-dark-muted">
                      {feature.statLabel}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-light-muted dark:text-dark-muted group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>);

}