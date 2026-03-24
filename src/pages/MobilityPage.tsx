import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Globe, CheckCircle, Users, Mail, ChevronDown, ChevronUp } from 'lucide-react';

export function MobilityPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header avec image de fond */}
      <div className="relative bg-gradient-to-r from-primary to-primary-dark py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Globe className="h-12 w-12 animate-bounce" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Mobilité Internationale</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Programme Erasmus+ — Étudiez dans une université européenne partenaire et développez vos compétences internationales
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-all">
              Nous Contacter
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 border border-white text-white font-semibold rounded-lg hover:bg-white/30 transition-all">
              Télécharger le guide
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Qu'est-ce qu'Erasmus+ ? */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <Globe className="h-8 w-8 text-primary" />
            Qu'est-ce qu'Erasmus+ ?
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <Card className="p-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Erasmus+ est le programme européen de mobilité permettant aux étudiants de réaliser une partie de leur formation (semestre ou année complète) dans une université partenaire en Europe.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Green Up Academy est membre du programme Erasmus+, ce qui signifie que nos étudiants peuvent partir en mobilité dans nos universités partenaires, avec une aide financière de l'Union européenne.
              </p>
            </Card>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/images/etudiant/code.jpeg" 
                alt="Campus Erasmus+" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Pourquoi partir en mobilité ? */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Pourquoi partir en mobilité Erasmus+ ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Expérience Internationale', desc: 'Étudiez dans un cadre européen, découvrez une nouvelle culture et une nouvelle pédagogie.' },
              { title: 'Développement Personnel', desc: 'Gagnez en autonomie, en confiance et en adaptabilité face à un environnement nouveau.' },
              { title: 'Reconnaissance Académique', desc: 'Vos crédits ECTS sont reconnus automatiquement grâce au système Erasmus+.' },
              { title: 'Aide Financière', desc: 'Recevez une bourse mensuelle de l\'Union européenne pour couvrir vos frais de subsistence.' },
              { title: 'Réseau Professionnel', desc: 'Construisez un réseau international d\'étudiants et de professionnels du secteur.' },
              { title: 'Employabilité', desc: 'Améliorez votre CV avec une expérience de mobilité très prisée par les employeurs.' },
            ].map((item, i) => (
              <Card key={i} className="p-6 text-center hover:shadow-lg transition-all">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Conditions d'éligibilité */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-primary" />
            Conditions d'éligibilité
          </h2>
          <Card className="p-8">
            <ul className="space-y-4">
              {[
                'Être inscrit en 2ème ou 3ème année de Bachelor',
                'Être inscrit en Master (Bac+5)',
                'Avoir validé sa 1ère année de formation',
                'Avoir un niveau de langue requis selon la destination (A2/B1 recommandé)',
                'Être en règle avec ses obligations académiques et administratives',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400">{item}</span>
                </div>
              ))}
            </ul>
          </Card>
        </section>

        {/* Destinations */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Destinations Partenaires
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { country: 'Espagne', cities: 'Madrid, Barcelone, Valence', color: 'from-red-500/20 to-yellow-500/20' },
              { country: 'Allemagne', cities: 'Berlin, Munich, Cologne', color: 'from-gray-500/20 to-red-500/20' },
              { country: 'Belgique', cities: 'Bruxelles, Anvers, Liège', color: 'from-yellow-500/20 to-black/20' },
              { country: 'Portugal', cities: 'Lisbonne, Porto', color: 'from-green-500/20 to-red-500/20' },
              { country: 'Italie', cities: 'Milan, Rome, Naples', color: 'from-green-500/20 to-red-500/20' },
              { country: 'Pays-Bas', cities: 'Amsterdam, Rotterdam', color: 'from-red-500/20 to-blue-500/20' },
            ].map((item, i) => (
              <Card key={i} className={`p-6 bg-gradient-to-br ${item.color} border-2 border-primary/10 hover:border-primary/30 transition-all`}>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{item.country}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.cities}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Bourse Erasmus+ - avec image */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Bourse Erasmus+
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                  La bourse mensuelle Erasmus+ varie selon le pays de destination, classés en 3 groupes par l'Union européenne. Vous percevrez une allocation mensuelle complète pour couvrir vos frais de subsistence.
                </p>
              </Card>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/images/etudiant/campus.jpeg" 
                alt="Campus international" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { group: 'Groupe 1 (Coûts élevés)', countries: 'Autriche, Belgique, Danemark, Finlande, France, Allemagne, Pays-Bas, Suède...', monthly: '280€ - 320€/mois' },
              { group: 'Groupe 2 (Coûts moyens)', countries: 'Bulgarie, Croatie, Pologne, Roumanie, Slovaquie...', monthly: '220€ - 260€/mois' },
              { group: 'Groupe 3 (Coûts bas)', countries: 'Albanie, Turquie, Ukraine, Géorgie...', monthly: '160€ - 220€/mois' },
            ].map((item, i) => (
              <Card key={i} className="p-6 border-2 border-primary/20 hover:shadow-lg transition-all">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.group}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">{item.countries}</p>
                <p className="text-lg font-bold text-primary">{item.monthly}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Étapes pour candidater */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Étapes pour candidater
          </h2>
          <div className="space-y-4">
            {[
              { num: '1', title: 'Se renseigner', desc: 'Contacter le bureau de mobilité pour connaître les destinations et les partenaires' },
              { num: '2', title: 'Préparer le dossier', desc: 'Rassembler CV, lettre de motivation, relevés de notes, justificatif de niveau de langue' },
              { num: '3', title: 'Validation pédagogique', desc: 'Soumettre votre dossier pour validation auprès de l\'équipe pédagogique' },
              { num: '4', title: 'Signature du contrat', desc: 'Signer le contrat pédagogique Erasmus+ avec l\'université partenaire' },
              { num: '5', title: 'Préparation au départ', desc: 'Suivi administratif et pédagogique avant le départ' },
              { num: '6', title: 'Départ en mobilité', desc: 'Commencer votre semestre ou année à l\'étranger' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 md:gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white font-bold text-lg flex items-center justify-center shrink-0">
                    {item.num}
                  </div>
                  {i < 5 && <div className="w-1 h-16 bg-gradient-to-b from-primary to-transparent mt-2"></div>}
                </div>
                <Card className="flex-1 p-6 hover:shadow-lg transition-all">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Questions Fréquemment Posées
          </h2>
          <div className="space-y-4">
            {[
              { q: 'Combien de temps dure une mobilité ?', a: 'La durée recommandée est de 4 à 12 mois. Pour les Bachelors, un semestre ou une année en 3ème année. Pour les Mastères, 6 à 12 mois.' },
              { q: 'La bourse couvre-t-elle tous les frais ?', a: 'La bourse couvre ~70-80% des frais de subsistence (loyer, nourriture). Elle ne couvre pas le voyage aller-retour.' },
              { q: 'Comment les crédits ECTS sont-ils reconnus ?', a: 'Automatiquement grâce au système Erasmus+. Un contrat pédagogique garantit la correspondance des cursus.' },
              { q: 'Y a-t-il une langue requise ?', a: 'La langue dépend de la destination. Green Up Academy proposera des cours de langue préparatoires.' },
              { q: 'Que se passe-t-il si je ne valide pas mes crédits ?', a: 'Vous pourrez suivre des cours de rattrapage à l\'étranger ou à Green Up Academy après votre retour.' },
            ].map((item, i) => (
              <Card key={i} className="border">
                <button
                  onClick={() => toggleFaq(`faq${i}`)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white text-left">{item.q}</h3>
                  {expandedFaq === `faq${i}` ? (
                    <ChevronUp className="h-5 w-5 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                  )}
                </button>
                {expandedFaq === `faq${i}` && (
                  <div className="border-t px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <Card className="p-12 text-center bg-gradient-to-r from-primary/10 to-primary-dark/10 border-primary/20">
            <Mail className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Envie de partir en mobilité ?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Contactez notre bureau de mobilité internationale pour plus d'informations sur les destinations disponibles et les modalités de candidature.
            </p>
            <a
              href="mailto:mobilite@green-up-academy.com"
              className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors"
            >
              mobilite@green-up-academy.com
            </a>
          </Card>
        </section>
      </div>
    </div>
  );
}
