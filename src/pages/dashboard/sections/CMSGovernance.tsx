import React, { useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import { Trash2, Edit2, Plus, Image as ImageIcon } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'direction' | 'board' | 'scientific';
  bio: string;
  image: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  department?: string;
}

const CATEGORIES = {
  direction: { label: 'Direction', icon: '👔', color: 'bg-red-100 dark:bg-red-900' },
  board: { label: 'Conseil d\'administration', icon: '🏛️', color: 'bg-blue-100 dark:bg-blue-900' },
  scientific: { label: 'Comité scientifique', icon: '🔬', color: 'bg-purple-100 dark:bg-purple-900' },
};

export const CMSGovernance: React.FC = () => {
  const { content, addTeamMember, updateTeamMember, deleteTeamMember } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: '',
    role: '',
    category: 'direction',
    bio: '',
    image: '',
    email: '',
    phone: '',
    linkedin: '',
    department: '',
  });

  const teamMembers = content.team || [];

  const handleAddMember = () => {
    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      category: 'direction',
      bio: '',
      image: '',
      email: '',
      phone: '',
      linkedin: '',
      department: '',
    });
    setShowForm(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData(member);
    setShowForm(true);
  };

  const handleSaveMember = () => {
    if (!formData.name || !formData.role) {
      alert('Veuillez remplir le nom et le rôle');
      return;
    }

    if (editingId) {
      updateTeamMember(editingId, formData as TeamMember);
    } else {
      addTeamMember(formData as TeamMember);
    }

    setShowForm(false);
    setEditingId(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setFormData({ ...formData, image: evt.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
      deleteTeamMember(id);
    }
  };

  const groupedMembers = {
    direction: teamMembers.filter((m) => m.category === 'direction'),
    board: teamMembers.filter((m) => m.category === 'board'),
    scientific: teamMembers.filter((m) => m.category === 'scientific'),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gouvernance</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Gérez la direction, le conseil et le comité scientifique</p>
        </div>
        <button
          onClick={handleAddMember}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Plus size={20} />
          Ajouter un membre
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {editingId ? 'Modifier le membre' : 'Nouveau membre'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Colonne gauche - Infos de base */}
            <div className="space-y-4">
              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ex: Charles Giscard Fongang"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>

              {/* Rôle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rôle / Titre
                </label>
                <input
                  type="text"
                  value={formData.role || ''}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="ex: Président fondateur"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>

              {/* Catégorie */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Catégorie
                </label>
                <select
                  value={formData.category || 'direction'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as TeamMember['category'],
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="direction">👔 Direction</option>
                  <option value="board">🏛️ Conseil d'administration</option>
                  <option value="scientific">🔬 Comité scientifique</option>
                </select>
              </div>

              {/* Département */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Département / Spécialité
                </label>
                <input
                  type="text"
                  value={formData.department || ''}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="ex: Pédagogie, Finances, Environnement"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Colonne droite - Photo et contacts */}
            <div className="space-y-4">
              {/* Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Photo officielle
                </label>
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="member-image-input"
                    />
                    <label
                      htmlFor="member-image-input"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <ImageIcon size={24} className="text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Cliquer pour uploader
                      </span>
                    </label>
                  </div>
                  {formData.image && (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="Aperçu"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => setFormData({ ...formData, image: '' })}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+33 (0)1 23 45 67 89"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                value={formData.linkedin || ''}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Biographie */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Biographie
            </label>
            <textarea
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Parcours, diplômes, expériences principales..."
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3 justify-end">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSaveMember}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              {editingId ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </div>
      )}

      {/* Groupes par catégorie */}
      <div className="space-y-8">
        {Object.entries(groupedMembers).map(([categoryKey, members]) => (
          <div key={categoryKey}>
            {/* En-tête de catégorie */}
            <div className={`mb-4 p-3 rounded-lg ${CATEGORIES[categoryKey as keyof typeof CATEGORIES].color}`}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-2xl">
                  {CATEGORIES[categoryKey as keyof typeof CATEGORIES].icon}
                </span>
                {CATEGORIES[categoryKey as keyof typeof CATEGORIES].label}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {members.length} membre{members.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Grille de membres */}
            {members.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                  >
                    {/* Photo */}
                    <div className="h-52 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-5xl">
                          
                        </div>
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-3">
                        {member.role}
                      </p>

                      {member.department && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-1">
                          {member.department}
                        </p>
                      )}

                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
                        {member.bio}
                      </p>

                      {/* Contacts */}
                      <div className="flex flex-wrap gap-2 mb-4 text-xs">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            title={member.email}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            Email
                          </a>
                        )}
                        {member.phone && (
                          <a
                            href={`tel:${member.phone}`}
                            title={member.phone}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            Téléphone
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Voir sur LinkedIn"
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                          >
                            in
                          </a>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditMember(member)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                          <Edit2 size={16} />
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                        >
                          <Trash2 size={16} />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 mb-8">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Aucun membre dans cette catégorie
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {teamMembers.length === 0 && !showForm && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Aucun membre pour le moment</p>
          <button
            onClick={handleAddMember}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus size={20} />
            Ajouter le premier membre
          </button>
        </div>
      )}
    </div>
  );
};
