import {
  StorageError,
  type ContactSubmission,
  type InterestStorage,
  type InterestSubmission,
  type PartnerSubmission,
  type SurveyAnswers,
} from './types';

/**
 * Supabase via son API REST (PostgREST), sans SDK : aucune dépendance
 * supplémentaire, donc une page plus légère.
 * Les tables n'autorisent que l'INSERT pour le rôle public (voir supabase/schema.sql).
 */
export function createSupabaseStorage(
  url: string,
  key: string,
  tables: { interest: string; survey: string; contacts: string; partners: string },
): InterestStorage {
  const base = `${url.replace(/\/$/, '')}/rest/v1/`;
  const headers: Record<string, string> = {
    apikey: key,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal',
  };
  // Les anciennes clés « anon » sont des JWT et vont aussi dans Authorization ;
  // les nouvelles clés « sb_publishable_… » se passent uniquement dans `apikey`.
  if (!key.startsWith('sb_')) headers.Authorization = `Bearer ${key}`;

  async function insert(table: string, row: Record<string, unknown>, okStatuses: number[] = []) {
    const res = await fetch(base + encodeURIComponent(table), {
      method: 'POST',
      headers,
      body: JSON.stringify(row),
    });
    if (res.ok || okStatuses.includes(res.status)) return;
    throw new StorageError(`Supabase a répondu ${res.status}`);
  }

  return {
    name: 'supabase',
    submit: (d: InterestSubmission) =>
      // 409 = e-mail déjà inscrit : traité comme un succès, sans le révéler à l'internaute.
      insert(
        tables.interest,
        {
          first_name: d.firstName,
          email: d.email,
          profession: d.profession,
          establishment_type: d.establishmentType,
          location: d.location,
          categories: d.categories,
          consent: d.consent,
          consent_text: d.consentText,
          source: d.source,
        },
        [409],
      ),
    submitSurvey: (answers: SurveyAnswers) => insert(tables.survey, { answers }),
    submitContact: (d: ContactSubmission) =>
      insert(
        tables.contacts,
        { email: d.email, consent: d.consent, consent_text: d.consentText, source: d.source },
        [409],
      ),
    submitPartner: (d: PartnerSubmission) =>
      insert(tables.partners, {
        business_name: d.businessName,
        category: d.category,
        location: d.location,
        contact_name: d.contactName,
        role: d.role,
        email: d.email,
        phone: d.phone,
        offer_type: d.offerType,
        google_maps_url: d.googleMapsUrl,
        message: d.message,
        consent: d.consent,
        consent_text: d.consentText,
        source: d.source,
      }),
  };
}
