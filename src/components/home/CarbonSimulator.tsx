import { useState, createElement } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Car, Home, Plane, RefreshCw } from 'lucide-react';
export function CarbonSimulator() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([0, 0, 0]);
  const questions = [
  {
    icon: Car,
    question: 'Comment vous déplacez-vous au quotidien ?',
    options: [
    {
      label: 'Vélo / Marche / Transports',
      value: 0.5
    },
    {
      label: 'Voiture électrique / Hybride',
      value: 2
    },
    {
      label: 'Voiture thermique',
      value: 4
    }]

  },
  {
    icon: Home,
    question: 'Quel est votre type de logement ?',
    options: [
    {
      label: 'Appartement récent (BBC)',
      value: 1.5
    },
    {
      label: 'Appartement ancien',
      value: 3
    },
    {
      label: 'Maison individuelle',
      value: 5
    }]

  },
  {
    icon: Plane,
    question: 'Combien de vols par an ?',
    options: [
    {
      label: 'Aucun',
      value: 0
    },
    {
      label: '1 à 2 vols (Europe)',
      value: 2
    },
    {
      label: 'Plus de 2 vols ou Long courrier',
      value: 6
    }]

  }];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[step] = value;
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const total = newAnswers.reduce((a, b) => a + b, 0);
      setScore(total);
      setStep(questions.length);
    }
  };
  const reset = () => {
    setStep(0);
    setScore(0);
    setAnswers([0, 0, 0]);
  };
  return (
    <section className="py-24 bg-primary/5 dark:bg-primary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simulateur d'Empreinte Carbone
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Prenez conscience de votre impact et découvrez comment agir.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto overflow-hidden border-0 shadow-2xl">
          <div className="p-8">
            {step < questions.length ?
            <div className="space-y-8 animate-fade-in-up">
                <div className="flex justify-center mb-6">
                  {questions.map((_, i) =>
                <div
                  key={i}
                  className={`h-2 w-16 mx-1 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`} />

                )}
                </div>

                <div className="text-center">
                  {createElement(questions[step].icon, {
                  className: 'h-12 w-12 mx-auto text-primary mb-4'
                })}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                    {questions[step].question}
                  </h3>

                  <div className="grid gap-4">
                    {questions[step].options.map((option, index) =>
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.value)}
                    className="p-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:bg-primary/5 transition-all text-left font-medium text-gray-700 dark:text-gray-300">

                        {option.label}
                      </button>
                  )}
                  </div>
                </div>
              </div> :

            <div className="text-center animate-fade-in-up">
                <div className="mb-6 inline-block p-6 rounded-full bg-green-100 dark:bg-green-900/30">
                  <span className="text-5xl font-bold text-primary">
                    {score.toFixed(1)}
                  </span>
                  <span className="text-xl text-gray-600 dark:text-gray-400 block mt-1">
                    tonnes CO2/an
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {score < 5 ?
                'Bravo ! Vous avez une empreinte faible.' :
                'Vous pouvez encore progresser !'}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  La moyenne française est d'environ 9 tonnes. Pour atteindre
                  les objectifs climatiques, nous devons viser 2 tonnes.
                  <br />
                  <br />
                  <strong>
                    La solution ? Se former pour transformer la société.
                  </strong>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg">Découvrir nos formations</Button>
                  <Button
                  variant="outline"
                  onClick={reset}
                  icon={<RefreshCw className="h-4 w-4" />}>

                    Recommencer
                  </Button>
                </div>
              </div>
            }
          </div>
        </Card>
      </div>
    </section>);

}