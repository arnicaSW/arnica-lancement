import {
  StorageError,
  type ContactSubmission,
  type InterestStorage,
  type InterestSubmission,
  type PartnerSubmission,
  type SurveyAnswers,
} from './types';

/** Alternative : Formspree (50 envois/mois en gratuit, hébergé aux États-Unis). */
export function createFormspreeStorage(formId: string): InterestStorage {
  const post = async (payload: Record<string, unknown>) => {
    const res = await fetch(`https://formspree.io/f/${encodeURIComponent(formId)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new StorageError(`Formspree a répondu ${res.status}`);
  };
  const flatten = (o: Record<string, unknown>) =>
    Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : v]));

  return {
    name: 'formspree',
    submit: (d: InterestSubmission) => post({ type: 'interet', ...flatten({ ...d }) }),
    submitSurvey: (a: SurveyAnswers) => post({ type: 'questionnaire', ...flatten(a) }),
    submitContact: (d: ContactSubmission) => post({ type: 'contact', ...d }),
    submitPartner: (d: PartnerSubmission) => post({ type: 'commerce', ...d }),
  };
}
