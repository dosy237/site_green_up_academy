import React from 'react';

/**
 * DEPRECATED: Ce composant a été remplacé par CMSDashboard
 * Conservé pour la compatibilité à rebours avec les anciennes imports
 */
export const AdminDashboard: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  React.useEffect(() => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  }, [onNavigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <p className="text-gray-500">Redirection ...</p>
    </div>
  );
};
