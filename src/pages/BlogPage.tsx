// React default import not required with new JSX transform
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar, Tag } from 'lucide-react';
export function BlogPage() {
  const posts = [
  {
    title: "L'impact du Green IT sur la consommation mondiale",
    excerpt:
    "Analyse des dernières tendances pour réduire l'empreinte carbone du numérique.",
    date: '28 Jan 2026',
    category: 'Green IT',
    image:
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Rénovation énergétique : les nouvelles normes 2026',
    excerpt:
    "Tout ce qu'il faut savoir sur la réglementation RE2020 et ses évolutions.",
    date: '25 Jan 2026',
    category: 'Réglementation',
    image:
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Retour sur le Hackathon Climat',
    excerpt:
    'Nos étudiants ont brillé lors de cette édition avec 3 projets primés.',
    date: '15 Jan 2026',
    category: 'Vie Étudiante',
    image:
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
  }];

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="bg-white dark:bg-dark-surface py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Actualités
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Veille technologique, vie de l'école et insights durables.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {posts.map((post, index) =>
            <Card
              key={index}
              className="flex flex-col md:flex-row gap-6 overflow-hidden p-0">

                <div className="md:w-1/3 h-48 md:h-auto">
                  <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover" />

                </div>
                <div className="p-6 md:py-6 md:pr-6 md:pl-0 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1 text-accent">
                      <Tag className="h-4 w-4" /> {post.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-primary cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {post.excerpt}
                  </p>
                  <Button variant="outline" size="sm" className="w-fit">
                    Lire la suite
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                Catégories
              </h3>
              <div className="space-y-2">
                {[
                'Green IT',
                'Performance Énergétique',
                'Vie Étudiante',
                'Réglementation',
                'Carrières'].
                map((cat) =>
                <div
                  key={cat}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded cursor-pointer transition-colors">

                    <span className="text-gray-600 dark:text-gray-300">
                      {cat}
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded-full">
                      {(Math.random() * 10).toFixed(0)}
                    </span>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6 bg-primary text-white">
              <h3 className="font-bold text-xl mb-2">Newsletter</h3>
              <p className="text-white/80 text-sm mb-4">
                Recevez notre veille hebdomadaire sur la transition écologique.
              </p>
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 rounded-lg text-gray-900 mb-2" />

              <Button className="w-full bg-accent hover:bg-accent-dark text-white border-none">
                S'abonner
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>);

}