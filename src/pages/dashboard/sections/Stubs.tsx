import React from 'react';
import { useContent } from '../../../hooks/useContent';

export function CMSPrograms({ onSave }: { onSave: () => void }): JSX.Element {
  return <div className="p-6 bg-gray-800 rounded-xl"><p>Gestion des formations - à compléter</p></div>;
}

export function CMSTeam({ onSave }: { onSave: () => void }): JSX.Element {
  return <div className="p-6 bg-gray-800 rounded-xl"><p>Gestion de l'équipe - à compléter</p></div>;
}

export function CMSBlog({ onSave }: { onSave: () => void }): JSX.Element {
  return <div className="p-6 bg-gray-800 rounded-xl"><p>Gestion du blog - à compléter</p></div>;
}

export function CMSMedia(): JSX.Element {
  return <div className="p-6 bg-gray-800 rounded-xl"><p>Gestion des médias - à compléter</p></div>;
}

export function CMSSettings({ onSave }: { onSave: () => void }): JSX.Element {
  return <div className="p-6 bg-gray-800 rounded-xl"><p>Paramètres - à compléter</p></div>;
}
