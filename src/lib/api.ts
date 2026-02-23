// ─────────────────────────────────────────────────────────────────────
//  api.ts — URL backend selon l'environnement
//
//  ▶ EN LOCAL  : garde localhost:4000 (développement)
//  ▶ AVANT DE PUSH : change PROD_BACKEND par ton URL Render
//    et passe IS_PROD à true
// ─────────────────────────────────────────────────────────────────────

const IS_PROD = true; // ← mettre true avant de push en production

const DEV_BACKEND  = 'http://localhost:4000';
const PROD_BACKEND = 'https://site-green-up-academy-backend.onrender.com';

const BASE = IS_PROD ? PROD_BACKEND : DEV_BACKEND;

export function apiUrl(path: string): string {
  return `${BASE}${path}`;
}