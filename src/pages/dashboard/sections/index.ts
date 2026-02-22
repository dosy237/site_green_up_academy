// Stubs pour les sections du dashboard - à compléter

import React from 'react';
import { useContent } from '../../../hooks/useContent';

export function CMSPrograms({ onSave }: { onSave: () => void }) {
  const { content, addProgram, updateProgram, deleteProgram } = useContent();
  return <div className="p-6 bg-gray-800 rounded-xl"><p>Gestion des formations - à implémenter</p></div>;
}

export function CMSTeam({ onSave }: { onSave: () => void }) {
  const { content, updateAbout } = useContent();
  return <div className="p-6 bg-gray-800 rounded-xl"><p>Gestion de l'équipe - à implémenter</p></div>;
}

export function CMSBlog({ onSave }: { onSave: () => void }) {
  const { content, addBlogPost, updateBlogPost, deleteBlogPost } = useContent();
  return <div className="p-6 bg-gray-800 rounded-xl"><p>Gestion du blog - à implémenter</p></div>;
}

export function CMSMedia() {
  return <div className="p-6 bg-gray-800 rounded-xl"><p>Gestion des médias - à implémenter</p></div>;
}

export function CMSSettings({ onSave }: { onSave: () => void }) {
  return <div className="p-6 bg-gray-800 rounded-xl"><p>Paramètres - à implémenter</p></div>;
}
