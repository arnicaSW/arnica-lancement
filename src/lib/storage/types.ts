/** Données envoyées par le formulaire d'intérêt. */
export interface InterestSubmission {
  firstName: string | null;
  email: string;
  profession: string;
  establishmentType: string;
  location: string;
  categories: string[];
  consent: true;
  /** Texte exact du consentement accepté (preuve RGPD) */
  consentText: string;
  /** Provenance (utile si vous ajoutez d'autres pages ou campagnes) */
  source: string;
}

/** Réponses ANONYMES au questionnaire : aucune donnée d'identification. */
export type SurveyAnswers = Record<string, string | string[] | number | null>;

/** Contact facultatif laissé à la fin du questionnaire, stocké à part (sans lien avec les réponses). */
export interface ContactSubmission {
  email: string;
  consent: true;
  consentText: string;
  source: string;
}

/** Commerce ou entreprise intéressé·e par un partenariat (stocké à part). */
export interface PartnerSubmission {
  businessName: string;
  category: string;
  location: string;
  contactName: string;
  role: string | null;
  email: string;
  phone: string | null;
  offerType: string | null;
  googleMapsUrl: string | null;
  message: string | null;
  consent: true;
  consentText: string;
  source: string;
}

/**
 * Contrat que doit respecter tout fournisseur de stockage.
 * Pour en ajouter un (Odoo, Airtable, API maison…) : créez un fichier
 * qui exporte un objet de ce type et déclarez-le dans ./index.ts.
 */
export interface InterestStorage {
  readonly name: string;
  /** Formulaire d'intérêt. Résout si l'inscription est enregistrée (ou déjà existante), rejette sinon. */
  submit(data: InterestSubmission): Promise<void>;
  /** Questionnaire approfondi (anonyme). */
  submitSurvey(answers: SurveyAnswers): Promise<void>;
  /** Contact facultatif pour un échange ultérieur. */
  submitContact(data: ContactSubmission): Promise<void>;
  /** Formulaire des commerces et entreprises. */
  submitPartner(data: PartnerSubmission): Promise<void>;
}

export class StorageError extends Error {}
