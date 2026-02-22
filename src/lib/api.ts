/**
 * Configuration de l'URL de l'API
 * En développement : http://localhost:4000
 * En production : URL relative (même domaine)
 */
export const API_BASE = import.meta.env.PROD
  ? ''
  : 'http://localhost:4000';

export const apiUrl = (path: string) => `${API_BASE}${path}`;