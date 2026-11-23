/**
 * Point d'entrée unique du stockage. Le reste du site n'utilise que `storage`.
 * Changez de fournisseur avec VITE_STORAGE_PROVIDER dans le fichier .env.
 */
import { createFormspreeStorage } from './formspree';
import { mockStorage } from './mock';
import { createSupabaseStorage } from './supabase';
import { StorageError, type InterestStorage } from './types';

export type { ContactSubmission, InterestStorage, InterestSubmission, PartnerSubmission, SurveyAnswers } from './types';

function misconfigured(reason: string): InterestStorage {
  if (import.meta.env.DEV) console.warn(`[arnica] Stockage mal configuré : ${reason}`);
  const fail = () => Promise.reject(new StorageError(reason));
  return { name: 'misconfigured', submit: fail, submitSurvey: fail, submitContact: fail, submitPartner: fail };
}

function resolveStorage(): InterestStorage {
  const env = import.meta.env;
  const provider = (env.VITE_STORAGE_PROVIDER || (env.DEV ? 'mock' : '')).toLowerCase();

  switch (provider) {
    case 'supabase':
      if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY)
        return misconfigured('VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY manquant');
      return createSupabaseStorage(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY, {
        interest: env.VITE_SUPABASE_TABLE || 'interest_signups',
        survey: env.VITE_SUPABASE_SURVEY_TABLE || 'survey_responses',
        contacts: env.VITE_SUPABASE_CONTACT_TABLE || 'survey_contacts',
        partners: env.VITE_SUPABASE_PARTNER_TABLE || 'partner_leads',
      });
    case 'formspree':
      if (!env.VITE_FORMSPREE_ID) return misconfigured('VITE_FORMSPREE_ID manquant');
      return createFormspreeStorage(env.VITE_FORMSPREE_ID);
    case 'mock':
      return mockStorage;
    default:
      return misconfigured('VITE_STORAGE_PROVIDER absent ou inconnu');
  }
}

export const storage = resolveStorage();
