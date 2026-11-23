import type { InterestStorage } from './types';

/** Stockage factice pour développer sans clé : rien ne quitte le navigateur. */
const fake = (label: string) => async (data: unknown) => {
  await new Promise((r) => setTimeout(r, 700));
  if (import.meta.env.DEV) console.info(`[arnica · mock] ${label} simulé`, data);
};

export const mockStorage: InterestStorage = {
  name: 'mock',
  submit: fake('inscription'),
  submitSurvey: fake('questionnaire'),
  submitContact: fake('contact'),
  submitPartner: fake('demande commerce'),
};
