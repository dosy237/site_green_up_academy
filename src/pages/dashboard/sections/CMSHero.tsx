import { useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import { Edit2, Save, X } from 'lucide-react';

export function CMSHero({ onSave }: { onSave: () => void }) {
  const { content, updateHero } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(content.hero);

  const handleSave = () => {
    updateHero(formData);
    setIsEditing(false);
    onSave();
  };

  if (!isEditing) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Hero / Accueil</h1>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition"
          >
            <Edit2 className="w-4 h-4" />
            Modifier
          </button>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
          <div>
            <p className="text-gray-400 text-sm mb-1">Titre</p>
            <p className="text-lg font-semibold">{content.hero.title}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Sous-titre</p>
            <p className="text-gray-300">{content.hero.subtitle}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Texte CTA</p>
            <p className="text-gray-300">{content.hero.ctaText}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Éditer Hero</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2 transition"
          >
            <X className="w-4 h-4" />
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition"
          >
            <Save className="w-4 h-4" />
            Enregistrer
          </button>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Titre</label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Sous-titre</label>
          <textarea
            value={formData.subtitle}
            onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Texte du bouton CTA</label>
          <input
            type="text"
            value={formData.ctaText}
            onChange={e => setFormData({ ...formData, ctaText: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Lien CTA</label>
          <input
            type="text"
            value={formData.ctaHref}
            onChange={e => setFormData({ ...formData, ctaHref: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
