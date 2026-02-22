import { useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import {
  Plus,
  Trash2,
  Edit2,
  X,
  Save,
  Eye,
  BarChart3,
  MessageSquare,
  Smile,
  FileText,
} from 'lucide-react';

interface BlogFormData {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  coverImage: string;
  published: boolean;
  createdAt: number;
  updatedAt: number;
  tags: string[];
  views: number;
  comments: never[];
  reactions: Record<string, string[]>;
}

export function CMSBlog({ onSave }: { onSave: () => void }): JSX.Element {
  const { content, addBlogPost, updateBlogPost, deleteBlogPost } = useContent();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author: 'Admin',
    coverImage: 'https://via.placeholder.com/600x400?text=Article',
    published: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    tags: [],
    views: 0,
    comments: [],
    reactions: {},
  });

  const handleAddNew = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      author: 'Admin',
      coverImage: 'https://via.placeholder.com/600x400?text=Article',
      published: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      tags: [],
      views: 0,
      comments: [],
      reactions: {},
    });
    setSelectedPost(null);
    setIsEditing(true);
  };

  const handleEditPost = (post: BlogFormData & { id: string }) => {
    setFormData(post);
    setSelectedPost(post.id);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('Le titre est requis');
      return;
    }

    const dataToSave = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
      updatedAt: Date.now(),
    };

    if (selectedPost) {
      updateBlogPost(selectedPost, dataToSave);
    } else {
      addBlogPost(dataToSave);
    }

    onSave();
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      deleteBlogPost(postId);
      onSave();
    }
  };

  const handleTagAdd = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag],
      });
    }
  };

  const handleTagRemove = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag),
    });
  };



  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestion des Actualités</h2>
          <p className="text-gray-400 mt-1">
            {content.blog.length} article{content.blog.length !== 1 ? 's' : ''}
            {' '}
            ({content.blog.filter(p => p.published).length} publié{content.blog.filter(p => p.published).length !== 1 ? 's' : ''})
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            Nouvel article
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-gray-800 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">
              {selectedPost ? 'Modifier l\'article' : 'Nouvel article'}
            </h3>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Titre */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Titre de l'article
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                placeholder="Titre de l'article..."
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                URL slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                placeholder="url-slug (auto-généré si vide)"
              />
            </div>

            {/* Auteur */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Auteur
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                placeholder="Nom de l'auteur"
              />
            </div>

            {/* Image couverture */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                URL Image couverture
              </label>
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                placeholder="https://..."
              />
              {formData.coverImage && (
                <img
                  src={formData.coverImage}
                  alt="Couverture"
                  className="mt-3 h-40 object-cover rounded-lg w-full"
                />
              )}
            </div>

            {/* Extrait */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Extrait/Résumé court
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                placeholder="Résumé de l'article..."
                rows={3}
              />
            </div>

            {/* Contenu */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contenu de l'article
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 font-mono text-sm"
                placeholder="Contenu complet de l'article (supporte Markdown)..."
                rows={10}
              />
              <p className="text-xs text-gray-400 mt-1">
                Supporte Markdown: **gras**, *italique*, # titre, etc.
              </p>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags/Catégories
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  id="tagInput"
                  placeholder="Ajouter un tag..."
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const input = e.currentTarget;
                      handleTagAdd(input.value.trim());
                      input.value = '';
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = document.getElementById('tagInput') as HTMLInputElement;
                    handleTagAdd(input.value.trim());
                    input.value = '';
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  Ajouter
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300 flex items-center gap-2"
                  >
                    {tag}
                    <button
                      onClick={() => handleTagRemove(tag)}
                      className="hover:text-red-400 transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-gray-300">Publié</span>
              </label>
              {!formData.published && (
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm">
                  Brouillon
                </span>
              )}
              {formData.published && (
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                  Publié
                </span>
              )}
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
        <div>
          {content.blog.length === 0 ? (
            <div className="text-center py-12 bg-gray-800 rounded-lg">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Aucun article pour le moment</p>
              <button
                onClick={handleAddNew}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              >
                <Plus className="w-4 h-4" />
                Créer le premier article
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {content.blog.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-800 rounded-xl p-6 hover:border-green-500/30 border border-gray-700 transition"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-32 h-32 flex-shrink-0">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-white">{post.title}</h3>
                            {post.published ? (
                              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                                Publié
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                                Brouillon
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 mb-3">{post.excerpt}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span>Par {post.author}</span>
                            <span>•</span>
                            <span>{new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.views} vues
                            </div>
                          </div>

                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {post.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Stats bar */}
                      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-700">
                        {/* Comments and Reactions */}
                        <button className="flex items-center gap-1 text-gray-400 hover:text-white transition text-sm">
                          <MessageSquare className="w-4 h-4" />
                          {post.comments?.length || 0} commentaires
                        </button>
                        <button className="flex items-center gap-1 text-gray-400 hover:text-white transition text-sm">
                          <Smile className="w-4 h-4" />
                          {Object.values(post.reactions || {}).reduce((acc: number, arr: unknown[]) => acc + (Array.isArray(arr) ? arr.length : 0), 0)} réactions
                        </button>
                        <button className="flex items-center gap-1 text-gray-400 hover:text-white transition text-sm">
                          <BarChart3 className="w-4 h-4" />
                          {post.views} vues
                        </button>

                        {/* Actions */}
                        <div className="ml-auto flex items-center gap-2">
                          <button
                            onClick={() => handleEditPost(post)}
                            className="p-2 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition"
                            title="Modifier"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
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
