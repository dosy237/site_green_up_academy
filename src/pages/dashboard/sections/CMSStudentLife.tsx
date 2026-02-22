import React, { useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import { Trash2, Edit2, Plus, Image as ImageIcon, Calendar, MapPin } from 'lucide-react';

interface StudentActivity {
  id: string;
  title: string;
  category: 'club' | 'event' | 'activity' | 'association';
  description: string;
  image: string;
  date?: string;
  location?: string;
  contact?: string;
  contactEmail?: string;
  members?: number;
  isActive: boolean;
}

const CATEGORIES = {
  club: { label: 'Club', icon: 'Club', color: 'bg-blue-100 dark:bg-blue-900' },
  event: { label: 'Événement', icon: 'Événement', color: 'bg-purple-100 dark:bg-purple-900' },
  activity: { label: 'Activité', icon: 'Activité', color: 'bg-green-100 dark:bg-green-900' },
  association: { label: 'Association', icon: 'Association', color: 'bg-orange-100 dark:bg-orange-900' },
};

export const CMSStudentLife: React.FC = () => {
  const { content, addStudentActivity, updateStudentActivity, deleteStudentActivity } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<StudentActivity>>({
    title: '',
    category: 'club',
    description: '',
    image: '',
    date: '',
    location: '',
    contact: '',
    contactEmail: '',
    members: 0,
    isActive: true,
  });

  const activities = content.studentActivities || [];

  const handleAddActivity = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'club',
      description: '',
      image: '',
      date: '',
      location: '',
      contact: '',
      contactEmail: '',
      members: 0,
      isActive: true,
    });
    setShowForm(true);
  };

  const handleEditActivity = (activity: StudentActivity) => {
    setEditingId(activity.id);
    setFormData(activity);
    setShowForm(true);
  };

  const handleSaveActivity = () => {
    if (!formData.title || !formData.description) {
      alert('Veuillez remplir le titre et la description');
      return;
    }

    if (editingId) {
      updateStudentActivity(editingId, formData as StudentActivity);
    } else {
      addStudentActivity(formData as StudentActivity);
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

  const handleDeleteActivity = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) {
      deleteStudentActivity(id);
    }
  };

  const groupedActivities = {
    club: activities.filter((a) => a.category === 'club'),
    event: activities.filter((a) => a.category === 'event'),
    activity: activities.filter((a) => a.category === 'activity'),
    association: activities.filter((a) => a.category === 'association'),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Vie Étudiante</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Gérez les clubs, événements et activités des étudiants</p>
        </div>
        <button
          onClick={handleAddActivity}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Plus size={20} />
          Ajouter une activité
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {editingId ? 'Modifier l\'activité' : 'Nouvelle activité'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Colonne gauche - Infos de base */}
            <div className="space-y-4">
              {/* Titre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="ex: Club d'IoT et capteurs"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>

              {/* Catégorie */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Catégorie
                </label>
                <select
                  value={formData.category || 'club'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as StudentActivity['category'],
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="club">Club</option>
                  <option value="event">Événement</option>
                  <option value="activity">Activité</option>
                  <option value="association">Association</option>
                </select>
              </div>

              {/* Statut */}
              <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive !== false}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Activité actuellement active
                </label>
              </div>

              {/* Contact principal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Responsable / Contact
                </label>
                <input
                  type="text"
                  value={formData.contact || ''}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="Nom du responsable"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>

              {/* Email de contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail || ''}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="contact@example.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Colonne droite - Photo et infos pratiques */}
            <div className="space-y-4">
              {/* Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Photo / Bannière
                </label>
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="activity-image-input"
                    />
                    <label
                      htmlFor="activity-image-input"
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

              {/* Infos pratiques */}
              <div className="space-y-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                {/* Date */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Calendar size={16} />
                    Date de lancement
                  </label>
                  <input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Lieu */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <MapPin size={16} />
                    Lieu / Campus
                  </label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="ex: Campus Boussy-Saint-Antoine"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>

                {/* Nombre de membres */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre de membres
                  </label>
                  <input
                    type="number"
                    value={formData.members || 0}
                    onChange={(e) => setFormData({ ...formData, members: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Décrivez l'activité, ses objectifs, ses activités principales..."
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
              onClick={handleSaveActivity}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              {editingId ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </div>
      )}

      {/* Groupes par catégorie */}
      <div className="space-y-8">
        {Object.entries(groupedActivities).map(([categoryKey, categoryActivities]) => (
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
                {categoryActivities.length} élément{categoryActivities.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Grille d'activités */}
            {categoryActivities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {categoryActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`rounded-lg shadow-md overflow-hidden border transition-shadow hover:shadow-lg ${
                      activity.isActive
                        ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                        : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-75'
                    }`}
                  >
                    {/* Image */}
                    <div className="h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
                      {activity.image ? (
                        <img
                          src={activity.image}
                          alt={activity.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                          {CATEGORIES[activity.category as keyof typeof CATEGORIES].icon}
                        </div>
                      )}
                      {!activity.isActive && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg">
                          INACTIF
                        </div>
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                        {activity.title}
                      </h3>

                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-3">
                        {activity.description}
                      </p>

                      {/* Infos pratiques */}
                      <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 mb-4">
                        {activity.date && (
                          <p className="flex items-center gap-2">
                            <Calendar size={14} />
                            {new Date(activity.date).toLocaleDateString('fr-FR')}
                          </p>
                        )}
                        {activity.location && (
                          <p className="flex items-center gap-2">
                            <MapPin size={14} />
                            {activity.location}
                          </p>
                        )}
                        {activity.members && activity.members > 0 && (
                          <p className="flex items-center gap-2">
                            {activity.members} membre{activity.members !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>

                      {/* Contact */}
                      {(activity.contact || activity.contactEmail) && (
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mb-4 text-xs">
                          {activity.contact && (
                            <p className="text-gray-600 dark:text-gray-400">
                              <strong>Responsable:</strong> {activity.contact}
                            </p>
                          )}
                          {activity.contactEmail && (
                            <a
                              href={`mailto:${activity.contactEmail}`}
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              {activity.contactEmail}
                            </a>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditActivity(activity)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                          <Edit2 size={16} />
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDeleteActivity(activity.id)}
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
                  Aucune activité dans cette catégorie
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {activities.length === 0 && !showForm && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Aucune activité pour le moment</p>
          <button
            onClick={handleAddActivity}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus size={20} />
            Ajouter la première activité
          </button>
        </div>
      )}
    </div>
  );
};
