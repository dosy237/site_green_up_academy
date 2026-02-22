import { useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import {
  Plus,
  Trash2,
  Edit2,
  X,
  Save,
  Users,
  Calendar,
  Zap,
  TrendingUp,
} from 'lucide-react';

interface ProgramFormData {
  id?: string;
  title: string;
  level: string;
  duration: string;
  description: string;
  objectives: string[];
  prerequisites: string[];
  numberOfSeats: number;
  applicationDeadline: string;
  professors: string[];
  image: string;
  status: 'open' | 'closed' | 'full';
  tuition: string;
  startDate: string;
}

export function CMSPrograms({ onSave }: { onSave: () => void }): JSX.Element {
  const { content, addProgram, updateProgram, deleteProgram } = useContent();
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [formData, setFormData] = useState<ProgramFormData>({
    title: '',
    level: 'Licence',
    duration: '1 an',
    description: '',
    objectives: [],
    prerequisites: [],
    numberOfSeats: 30,
    applicationDeadline: '',
    professors: [],
    image: 'https://via.placeholder.com/400x300?text=Formation',
    status: 'open',
    tuition: 'Gratuit',
    startDate: new Date().toISOString().split('T')[0],
  });

  const handleAddNew = () => {
    setFormData({
      title: '',
      level: 'Licence',
      duration: '1 an',
      description: '',
      objectives: [],
      prerequisites: [],
      numberOfSeats: 30,
      applicationDeadline: '',
      professors: [],
      image: 'https://via.placeholder.com/400x300?text=Formation',
      status: 'open',
      tuition: 'Gratuit',
      startDate: new Date().toISOString().split('T')[0],
    });
    setSelectedProgram(null);
    setIsEditing(true);
  };

  const handleEditProgram = (program: ProgramFormData & { id: string }) => {
    setFormData(program);
    setSelectedProgram(program.id);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('Le titre est requis');
      return;
    }

    if (selectedProgram) {
      updateProgram(selectedProgram, formData);
    } else {
      addProgram(formData);
    }

    onSave();
    setIsEditing(false);
    setSelectedProgram(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedProgram(null);
  };

  const handleDeleteProgram = (programId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      deleteProgram(programId);
      onSave();
    }
  };

  const handleArrayAdd = (field: 'objectives' | 'prerequisites' | 'professors', value: string) => {
    if (value && !formData[field].includes(value)) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value],
      });
    }
  };

  const handleArrayRemove = (field: 'objectives' | 'prerequisites' | 'professors', value: string) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter(item => item !== value),
    });
  };

  // Filtrer les formations
  const filteredPrograms = content.programs.filter((p) => {
    if (filterLevel !== 'all' && p.level !== filterLevel) return false;
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-500/20 text-green-400';
      case 'closed':
        return 'bg-red-500/20 text-red-400';
      case 'full':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return 'Ouvert aux candidatures';
      case 'closed':
        return 'Fermé';
      case 'full':
        return 'Complet';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestion des Formations</h2>
          <p className="text-gray-400 mt-1">
            {filteredPrograms.length} formation{filteredPrograms.length !== 1 ? 's' : ''}
            {' '}
            ({content.programs.filter((p) => p.status === 'open').length} ouverte{content.programs.filter((p) => p.status === 'open').length !== 1 ? 's' : ''})
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            Nouvelle formation
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-gray-800 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">
              {selectedProgram ? 'Modifier la formation' : 'Nouvelle formation'}
            </h3>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Titre de la formation
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                placeholder="Ex: Licence en Développement Durable"
              />
            </div>

            {/* Level and Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Niveau</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                >
                  <option>Licence</option>
                  <option>Master</option>
                  <option>Doctorat</option>
                  <option>Certification</option>
                  <option>Formation Continue</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Durée</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  placeholder="Ex: 1 an, 2 ans, 6 mois"
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                URL Image couverture
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                placeholder="https://..."
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Cover"
                  className="mt-3 h-40 object-cover rounded-lg w-full"
                />
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                placeholder="Description complète de la formation..."
                rows={4}
              />
            </div>

            {/* Key Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre de places
                </label>
                <input
                  type="number"
                  value={formData.numberOfSeats}
                  onChange={(e) => setFormData({ ...formData, numberOfSeats: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Frais de scolarité
                </label>
                <input
                  type="text"
                  value={formData.tuition}
                  onChange={(e) => setFormData({ ...formData, tuition: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  placeholder="Ex: 500€/an, Gratuit"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date de début
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Clôture des candidatures
                </label>
                <input
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Statut
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'open' | 'closed' | 'full' })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
              >
                <option value="open">Ouvert aux candidatures</option>
                <option value="full">Complet</option>
                <option value="closed">Fermé</option>
              </select>
            </div>

            {/* Objectives */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Objectifs pédagogiques
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  id="objectiveInput"
                  placeholder="Ajouter un objectif..."
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.currentTarget;
                      handleArrayAdd('objectives', input.value.trim());
                      input.value = '';
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = document.getElementById('objectiveInput') as HTMLInputElement;
                    handleArrayAdd('objectives', input.value.trim());
                    input.value = '';
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  Ajouter
                </button>
              </div>
              <div className="space-y-2">
                {formData.objectives.map(obj => (
                  <div key={obj} className="flex items-center justify-between px-3 py-2 bg-gray-700 rounded-lg">
                    <span className="text-gray-300 text-sm">• {obj}</span>
                    <button
                      onClick={() => handleArrayRemove('objectives', obj)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Prérequis
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  id="prerequisiteInput"
                  placeholder="Ajouter un prérequis..."
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.currentTarget;
                      handleArrayAdd('prerequisites', input.value.trim());
                      input.value = '';
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = document.getElementById('prerequisiteInput') as HTMLInputElement;
                    handleArrayAdd('prerequisites', input.value.trim());
                    input.value = '';
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  Ajouter
                </button>
              </div>
              <div className="space-y-2">
                {formData.prerequisites.map(prereq => (
                  <div key={prereq} className="flex items-center justify-between px-3 py-2 bg-gray-700 rounded-lg">
                    <span className="text-gray-300 text-sm">{prereq}</span>
                    <button
                      onClick={() => handleArrayRemove('prerequisites', prereq)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Professors */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Professeurs/Responsables
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  id="professorInput"
                  placeholder="Nom du professeur..."
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.currentTarget;
                      handleArrayAdd('professors', input.value.trim());
                      input.value = '';
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = document.getElementById('professorInput') as HTMLInputElement;
                    handleArrayAdd('professors', input.value.trim());
                    input.value = '';
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  Ajouter
                </button>
              </div>
              <div className="space-y-2">
                {formData.professors.map(prof => (
                  <div key={prof} className="flex items-center justify-between px-3 py-2 bg-gray-700 rounded-lg">
                    <span className="text-gray-300 text-sm">👨‍🏫 {prof}</span>
                    <button
                      onClick={() => handleArrayRemove('professors', prof)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-700">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              >
                <Save className="w-4 h-4" />
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
            >
              <option value="all">Tous les niveaux</option>
              <option value="Licence">Licence</option>
              <option value="Master">Master</option>
              <option value="Doctorat">Doctorat</option>
              <option value="Certification">Certification</option>
              <option value="Formation Continue">Formation Continue</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="open">Ouvert</option>
              <option value="full">Complet</option>
              <option value="closed">Fermé</option>
            </select>
          </div>

          {/* List */}
          {filteredPrograms.length === 0 ? (
            <div className="text-center py-12 bg-gray-800 rounded-lg">
              <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Aucune formation correspondante</p>
              <button
                onClick={handleAddNew}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              >
                <Plus className="w-4 h-4" />
                Créer la première formation
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredPrograms.map((program) => (
                <div
                  key={program.id}
                  className="bg-gray-800 rounded-xl p-6 hover:border-green-500/30 border border-gray-700 transition"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-white">{program.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded ${getStatusColor(program.status)}`}>
                              {getStatusLabel(program.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">{program.description}</p>
                          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              {program.level}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {program.duration}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {program.numberOfSeats} places
                            </span>
                            {program.tuition && (
                              <>
                                <span>•</span>
                                <span>{program.tuition}</span>
                              </>
                            )}
                          </div>
                          {program.professors && program.professors.length > 0 && (
                            <p className="text-xs text-gray-400 mt-2">
                              Responsable(s): {program.professors.join(', ')}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-4 border-t border-gray-700 pt-4">
                        <button
                          onClick={() => handleEditProgram(program)}
                          className="p-2 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProgram(program.id)}
                          className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
