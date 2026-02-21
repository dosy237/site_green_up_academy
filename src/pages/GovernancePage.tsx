import { useState } from 'react';
import { Card } from '../components/ui/Card';
export function GovernancePage() {
  const [activeTab, setActiveTab] = useState('direction');
  const direction = [
  {
    name: 'CHARLES GISCARD FONGANG ',
    role: 'Président',
    bio: "Ancien directeur RSE d'un groupe du CAC40, expert en stratégie durable.",
    image: 'PRESI.jpeg'
  },
  {
    name: 'Nadie belocime ',
    role: 'Directrice Générale',
    bio: "Docteur en Sciences de l'Environnement, 15 ans d'expérience dans l'enseignement supérieur.",
    image: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    name: 'Pierre Martin',
    role: 'Directeur Pédagogique',
    bio: "Ingénieur pédagogique spécialisé dans les méthodes d'apprentissage actives.",
    image: 'https://randomuser.me/api/portraits/men/3.jpg'
  }];

  const board = Array(8).
  fill(null).
  map((_, i) => ({
    name: `Membre ${i + 1}`,
    role: i % 2 === 0 ? 'Expert Industriel' : 'Représentant Académique',
    image: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 10}.jpg`
  }));
  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="bg-white dark:bg-dark-surface py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Gouvernance
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Une équipe dirigeante engagée et un conseil d'administration
            prestigieux pour guider la stratégie de l'école.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {[
          {
            id: 'direction',
            label: 'Direction'
          },
          {
            id: 'board',
            label: "Conseil d'Administration"
          },
          {
            id: 'scientific',
            label: 'Direction Scientifique'
          }].
          map((tab) =>
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gray-100'}`}>

              {tab.label}
            </button>
          )}
        </div>

        {/* Content */}
        <div className="animate-fade-in-up">
          {activeTab === 'direction' &&
          <div className="grid md:grid-cols-3 gap-8">
              {direction.map((member, index) =>
            <Card key={index} className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-primary/20">
                    <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover" />

                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {member.bio}
                  </p>
                </Card>
            )}
            </div>
          }

          {activeTab === 'board' &&
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {board.map((member, index) =>
            <Card key={index} className="flex items-center gap-4 p-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover" />

                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                      {member.name}
                    </h3>
                    <p className="text-gray-500 text-xs">{member.role}</p>
                  </div>
                </Card>
            )}
            </div>
          }

          {activeTab === 'scientific' &&
          <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                Le comité scientifique est composé de 12 chercheurs
                internationaux...
              </p>
            </div>
          }
        </div>
      </div>
    </div>);

}