import React, { useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import { Trash2, Edit2, Plus, Image as ImageIcon } from 'lucide-react';
import { Testimonial } from '../../../lib/ContentManager';

export const CMSTestimonials: React.FC = () => {
  const { content, addTestimonial, updateTestimonial, deleteTestimonial } = useContent();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    role: '',
    company: '',
    program: '',
    year: new Date().getFullYear().toString(),
    text: '',
    quote: '',
    rating: 5,
    image: '',
  });

  const testimonials = content.testimonials || [];

  const handleAddTestimonial = () => {
    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      company: '',
      program: '',
      year: new Date().getFullYear().toString(),
      text: '',
      quote: '',
      rating: 5,
      image: '',
    });
    setShowForm(true);
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData(testimonial);
    setShowForm(true);
  };

  const handleSaveTestimonial = () => {
    if (!formData.name || !formData.text) {
      alert('Veuillez remplir le nom et le témoignage');
      return;
    }

    const testimonialData: Testimonial = {
      id: editingId || Date.now().toString(),
      name: formData.name || '',
      role: formData.role || '',
      company: formData.company || '',
      program: formData.program || '',
      year: formData.year || new Date().getFullYear().toString(),
      text: formData.text || '',
      quote: formData.quote || formData.text || '',
      rating: formData.rating || 5,
      image: formData.image || '',
    };

    if (editingId) {
      updateTestimonial(editingId, testimonialData);
    } else {
      addTestimonial(testimonialData);
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

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) {
      deleteTestimonial(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Témoignages</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Gérez les témoignages de vos étudiants et diplômés</p>
        </div>
        <button
          onClick={handleAddTestimonial}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Plus size={20} />
          Ajouter un témoignage
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {editingId ? 'Modifier le témoignage' : 'Nouveau témoignage'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Colonne gauche - Infos */}
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
                  placeholder="ex: Marie Dubois"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>

              {/* Rôle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rôle / Poste
                </label>
                <input
                  type="text"
                  value={formData.role || ''}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="ex: Ingénieur développement"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>

              {/* Entreprise */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Entreprise
                </label>
                <input
                  type="text"
                  value={formData.company || ''}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="ex: TechCorp France"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>

              {/* Formation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Formation suivie
                </label>
                <input
                  type="text"
                  value={formData.program || ''}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  placeholder="ex: Master Cybersécurité"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>

              {/* Année de graduation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Année de diplôme
                </label>
                <input
                  type="text"
                  value={formData.year || new Date().getFullYear()}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="ex: 2023"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>

              {/* Note / Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notation ⭐ (1-5)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        formData.rating === star
                          ? 'bg-yellow-400 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {star}⭐
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne droite - Photo et témoignage */}
            <div className="space-y-4">
              {/* Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Photo de profil
                </label>
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="testimonial-image-input"
                    />
                    <label
                      htmlFor="testimonial-image-input"
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

          {/* Témoignage */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Témoignage
            </label>
            <textarea
              value={formData.text || ''}
              onChange={(e) => setFormData({ ...formData, text: e.target.value, quote: e.target.value })}
              placeholder="Écrivez le témoignage de l'étudiant..."
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
              onClick={handleSaveTestimonial}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              {editingId ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </div>
      )}

      {/* Liste des témoignages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            {/* Photo */}
            <div className="h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden">
              {testimonial.image ? (
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                  
                </div>
              )}
            </div>

            {/* Contenu */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h3>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                    {testimonial.role}
                  </p>
                </div>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating || 0)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                {testimonial.company && <span>{testimonial.company}</span>}
                {testimonial.company && testimonial.program && <span> · </span>}
                {testimonial.program && <span>{testimonial.program}</span>}
              </p>

              <p className="text-sm text-gray-700 dark:text-gray-300 italic mb-3 line-clamp-3">
                "{testimonial.text}"
              </p>

              {testimonial.year && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Diplômé en {testimonial.year}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditTestimonial(testimonial)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  <Edit2 size={16} />
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
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

      {testimonials.length === 0 && !showForm && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Aucun témoignage pour le moment</p>
          <button
            onClick={handleAddTestimonial}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus size={20} />
            Ajouter le premier témoignage
          </button>
        </div>
      )}
    </div>
  );
};
