// ─────────────────────────────────────────────────────────────────────
//  api.ts — URL backend selon l'environnement
//
//  La variable VITE_API_URL est récupérée depuis le fichier .env
//  lors du build (Vite).
// ─────────────────────────────────────────────────────────────────────

const BASE = import.meta.env.VITE_API_URL;

export function apiUrl(path: string): string {
  return `${BASE}${path}`;
}
