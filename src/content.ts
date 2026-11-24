/**
 * ─────────────────────────────────────────────────────────────
 *  CONTENU DU SITE arnica
 *  Tous les textes de la page sont ici : modifiez-les librement.
 *  Les textes juridiques (mentions légales, confidentialité) sont dans l’export `legal`.
 * ─────────────────────────────────────────────────────────────
 */
import type { IconName } from './lib/icons';

/* ── Informations générales ─────────────────────────────────── */
export const site = {
  name: 'arnica',
  /** Structure porteuse du projet */
  organisation: 'arnica',
  tagline: 'Des avantages pour celles et ceux qui soignent',
  zone: "Saint-Nazaire et la presqu'île guérandaise",
  contactEmail: 'arnica.communication@gmail.com',
  /** Mention discrète : affichée sous l'encart « projet en développement » et dans le pied de page */
  provisionalNotice:
    'Projet en phase de développement : le nom « arnica » et le design de ce site sont provisoires et pourront évoluer d’ici le lancement de la plateforme.',
};

/* ── Bandeau « en développement » (haut de page) ───────────── */
export const devBanner = {
  label: 'Projet en développement',
  text: 'Votre inscription nous aide à convaincre les commerces partenaires.',
  linkLabel: 'En savoir plus',
};

/* ── Navigation ─────────────────────────────────────────────── */
export const nav = {
  skipLink: 'Aller au contenu principal',
  links: [
    { href: '#avantages', label: 'Avantages' },
    { href: '#fonctionnement', label: 'Comment ça marche' },
    { href: '#carte', label: 'Carte' },
    { href: '#faq', label: 'FAQ' },
    { href: '#partenaires', label: 'Commerces' },
  ],
  cta: 'Je suis intéressé·e',
};

/* ── Bouton d'appel à l'action (répété sur la page) ─────────── */
export const cta = {
  label: 'Je suis intéressé·e',
  reassurance: ['Gratuit', 'Sans engagement', 'Données protégées'],
};

/* ── Hero ───────────────────────────────────────────────────── */
export const hero = {
  eyebrow: "Bientôt à Saint-Nazaire et sur la presqu'île guérandaise",
  titleStart: 'Vous prenez soin de nous.',
  titleHighlight: 'À notre tour de prendre soin de vous.',
  subtitle:
    'arnica réunira sur une seule carte des réductions négociées pour le personnel de santé, auprès des commerces et entreprises près de chez vous ou de votre lieu de travail. Public, privé ou libéral : c’est pour vous.',
  secondaryCta: 'Voir comment ça marche',
  illustrationLabel:
    'Illustration : une carte stylisée avec des repères d’offres autour d’un lieu de travail.',
};

/* ── Bénéfices ──────────────────────────────────────────────── */
export const benefits = {
  id: 'avantages',
  eyebrow: 'Pourquoi arnica',
  title: 'Un coup de pouce concret, pensé pour votre quotidien',
  intro:
    'Horaires décalés, gardes, journées à rallonge : vous donnez beaucoup. arnica veut vous rendre un peu de ce que vous apportez à tous.',
  items: [
    {
      icon: 'Wallet' as IconName,
      title: 'Plus de pouvoir d’achat',
      text: 'Des réductions négociées pour vous sur ce que vous faites déjà : repas, sport, loisirs, courses, services.',
    },
    {
      icon: 'HeartHandshake' as IconName,
      title: 'Une vraie reconnaissance',
      text: 'Des commerçants et entreprises du territoire qui disent merci, concrètement, à celles et ceux qui soignent.',
    },
    {
      icon: 'MapPin' as IconName,
      title: 'Près de chez vous… ou du travail',
      text: 'Une carte pour trouver en un coup d’œil les offres autour de votre domicile ou de votre établissement.',
    },
    {
      icon: 'Smartphone' as IconName,
      title: 'Simple et rapide',
      text: 'Pensé pour le mobile : quelques secondes entre deux services suffisent pour trouver une offre.',
    },
  ],
};

/* ── Comment ça marche ──────────────────────────────────────── */
export const howItWorks = {
  id: 'fonctionnement',
  eyebrow: 'Comment ça marche',
  title: 'Trois étapes, et c’est tout',
  intro: 'Voici comment fonctionnera la plateforme une fois lancée.',
  steps: [
    {
      icon: 'UserPlus' as IconName,
      title: 'Je m’inscris',
      text: 'Une inscription rapide et gratuite, réservée aux professionnel·les de santé.',
    },
    {
      icon: 'Map' as IconName,
      title: 'Je découvre les offres autour de moi',
      text: 'Je parcours la carte et je filtre par catégorie, près de chez moi ou de mon travail.',
    },
    {
      icon: 'BadgePercent' as IconName,
      title: 'Je profite de mes réductions',
      text: 'Je présente mon accès arnica chez le partenaire et je bénéficie de l’avantage.',
    },
  ],
};

/* ── Catégories d'avantages ─────────────────────────────────── */
// L'« id » est enregistré en base : ne le modifiez pas sans mettre à jour supabase/schema.sql
export const categories = {
  id: 'categories',
  eyebrow: 'Les avantages visés',
  title: 'Des avantages dans tous les moments de votre vie',
  intro:
    'Voici les familles d’offres que nous voulons proposer. Dites-nous lesquelles comptent le plus pour vous dans le formulaire.',
  items: [
    { id: 'restauration', icon: 'UtensilsCrossed' as IconName, label: 'Restauration', text: 'Restaurants, boulangeries, pauses déjeuner et repas après la garde.' },
    { id: 'sport', icon: 'Dumbbell' as IconName, label: 'Sport', text: 'Salles de sport, piscines, clubs et cours collectifs.' },
    { id: 'loisirs', icon: 'Ticket' as IconName, label: 'Loisirs & culture', text: 'Cinéma, sorties, activités nautiques, culture et découvertes.' },
    { id: 'commerces', icon: 'ShoppingBag' as IconName, label: 'Commerces de proximité', text: 'Boutiques, artisans et commerces du quotidien près de chez vous.' },
    { id: 'bien-etre', icon: 'Flower2' as IconName, label: 'Bien-être', text: 'Massages, soins, coiffure, détente pour récupérer.' },
    { id: 'services', icon: 'Wrench' as IconName, label: 'Services du quotidien', text: 'Garage, pressing, garde d’enfants, aide à domicile, mobilité.' },
  ],
};

/* ── Carte de démonstration ─────────────────────────────────── */
export const demoMap = {
  id: 'carte',
  eyebrow: 'Aperçu de la plateforme',
  title: 'À quoi ressemblera la carte',
  intro:
    "Une démonstration sur Saint-Nazaire et la presqu'île guérandaise : déplacez-vous sur la carte et cliquez sur un repère pour découvrir l’offre, l’adresse et le lien vers Google Maps.",
  disclaimer:
    'Démonstration : tous les repères sont fictifs et illustratifs. Aucun commerce n’est partenaire à ce jour.',
  loading: 'Chargement de la carte…',
  loadError: 'La carte n’a pas pu être chargée. Vérifiez votre connexion et réessayez.',
  googleLink: 'Voir sur Google Maps',
  linkNote:
    'Pour ces exemples, le lien ouvre la commune. À terme, il mènera directement à la fiche Google Maps du commerce partenaire.',
  filterLabel: 'Filtrer par catégorie',
  allLabel: 'Toutes',
  markerBadge: 'Exemple d’offre – illustratif',
  listTitle: 'Exemples d’offres',
  mapLabel: "Carte de démonstration de Saint-Nazaire et de la presqu'île guérandaise",
};

/* ── Mention « projet en développement » ────────────────────── */
export const devNotice = {
  id: 'projet',
  eyebrow: 'Où en est le projet ?',
  title: 'arnica se construit avec vous',
  text: [
    'arnica est actuellement en phase de développement.',
    'C’est grâce à votre inscription que nous pourrons aller à la rencontre des commerces et entreprises partenaires pour leur proposer de rejoindre le réseau.',
    'Plus nous serons nombreux, plus les avantages seront intéressants.',
  ],
};

/* ── Chiffres clés (uniquement des faits sur le projet) ─────── */
export const keyFigures = {
  title: 'arnica en quelques chiffres',
  items: [
    { value: 100, prefix: '', suffix: ' %', label: 'gratuit et sans engagement' },
    { value: 30, prefix: '< ', suffix: ' s', label: 'pour manifester votre intérêt' },
    { value: 6, prefix: '', suffix: '', label: 'catégories d’avantages visées' },
    { value: 0, prefix: '', suffix: '', label: 'donnée personnelle revendue, jamais' },
  ],
};

/* ── Formulaire ─────────────────────────────────────────────── */
// Les « value » sont enregistrées en base : ne les modifiez pas sans mettre à jour supabase/schema.sql
export const form = {
  id: 'inscription',
  eyebrow: 'Rejoindre le mouvement',
  title: 'Je suis intéressé·e par arnica',
  intro:
    'Moins de 30 secondes. Nous vous préviendrons dès que des offres seront disponibles près de chez vous.',
  requiredHint: 'Les champs marqués d’un astérisque (*) sont obligatoires.',
  fields: {
    firstName: { label: 'Prénom', hint: 'Facultatif', placeholder: 'Camille' },
    email: { label: 'Adresse e-mail', placeholder: 'camille@exemple.fr' },
    profession: { label: 'Profession', placeholder: 'Choisissez votre profession' },
    establishment: { label: 'Type d’établissement' },
    location: {
      label: 'Code postal ou ville',
      hint: 'Domicile ou lieu de travail',
      placeholder: '44600 ou Saint-Nazaire',
    },
    categories: { label: 'Quels avantages vous intéressent ?', hint: 'Plusieurs choix possibles, facultatif' },
  },
  professions: [
    { value: 'infirmier', label: 'Infirmier·e' },
    { value: 'aide-soignant', label: 'Aide-soignant·e' },
    { value: 'medecin', label: 'Médecin' },
    { value: 'administratif', label: 'Personnel administratif' },
    { value: 'medico-social', label: 'Médico-social' },
    { value: 'autre', label: 'Autre' },
  ],
  establishmentTypes: [
    { value: 'public', label: 'Public' },
    { value: 'prive', label: 'Privé' },
    { value: 'liberal', label: 'Libéral' },
  ],
  consent: {
    text: 'J’accepte qu’arnica conserve ces informations pour me tenir informé·e du lancement et mesurer l’intérêt pour le projet. Je peux me désinscrire à tout moment.',
    privacyLink: 'Lire la politique de confidentialité',
  },
  submit: 'Je suis intéressé·e',
  submitting: 'Envoi en cours…',
  errors: {
    summary: 'Merci de corriger les champs signalés.',
    emailRequired: 'Indiquez votre adresse e-mail.',
    emailInvalid: 'Cette adresse e-mail ne semble pas valide (exemple : nom@domaine.fr).',
    professionRequired: 'Choisissez votre profession.',
    establishmentRequired: 'Choisissez un type d’établissement.',
    locationRequired: 'Indiquez un code postal ou une ville.',
    consentRequired: 'Votre accord est nécessaire pour enregistrer votre inscription.',
    network:
      'L’envoi n’a pas abouti. Vérifiez votre connexion puis réessayez. Si le problème persiste, écrivez-nous.',
  },
  success: {
    title: 'Merci, c’est noté !',
    text: 'Votre intérêt compte : il nous aide à convaincre les commerces partenaires. Nous vous écrirons dès qu’arnica sera disponible près de chez vous.',
    share: 'Parlez-en à vos collègues : plus nous serons nombreux, plus les avantages seront intéressants.',
    shareButton: 'Partager arnica',
    shareCopied: 'Lien copié !',
  },
  moreHelp: {
    title: 'Aidez-nous encore plus',
    text: 'Un questionnaire anonyme de 5 minutes pour mieux comprendre vos besoins et construire une plateforme vraiment utile.',
    button: 'Répondre au questionnaire (5 min)',
  },
};

/* ── FAQ ────────────────────────────────────────────────────── */
export const faq = {
  id: 'faq',
  eyebrow: 'Questions fréquentes',
  title: 'Vous vous posez des questions ?',
  items: [
    {
      q: 'Est-ce gratuit ?',
      a: 'Oui. L’inscription est gratuite et sans engagement. Elle sert à mesurer l’intérêt des professionnel·les de santé pour le projet.',
    },
    {
      q: 'Qui peut s’inscrire ?',
      a: 'Tous les professionnel·les de santé et du médico-social : personnel hospitalier, soignant·es, médecins, personnel administratif, en établissement public, privé ou en libéral.',
    },
    {
      q: 'Que faites-vous de mes données ?',
      a: 'Elles servent seulement à vous informer du lancement et à présenter aux futurs partenaires des statistiques globales et anonymes (par exemple, le nombre d’inscrit·es par profession). Elles sont hébergées dans l’Union européenne, ne sont jamais revendues, et vous pouvez demander leur suppression à tout moment.',
    },
    {
      q: 'Quand la plateforme sera-t-elle disponible ?',
      a: 'Le projet est en phase d’étude. Nous allons d’abord rencontrer les commerces et entreprises de Saint-Nazaire et de la presqu’île guérandaise. Vous serez prévenu·e par e-mail dès le lancement.',
    },
  ],
};

/* ── Pied de page ───────────────────────────────────────────── */
export const footer = {
  ctaTitle: 'Vous aussi, vous méritez qu’on prenne soin de vous.',
  ctaText: 'Manifestez votre intérêt en moins de 30 secondes.',
  about:
    "Projet de plateforme d'avantages pour les professionnel·les de santé, en phase d'étude à Saint-Nazaire et sur la presqu'île guérandaise.",
  legalLinks: {
    mentions: 'Mentions légales',
    privacy: 'Politique de confidentialité',
    contact: 'Contact',
    partners: 'Commerces : devenir partenaire',
  },
  credits: 'Fond de carte © les contributeurs OpenStreetMap.',
  copyright: `© ${new Date().getFullYear()} arnica`,
};

/* ── Pages légales (affichées dans une fenêtre) ─────────────── */
export const legal = {
  close: 'Fermer',
  mentions: {
    title: 'Mentions légales',
    sections: [
      {
        heading: 'Éditeur du site',
        body: [
          'Nom : arnica',
          'Contact : arnica.communication@gmail.com',
          'Responsable de la publication : Colas Holtzscherer (colas.holtz@gmail.com)',
        ],
      },
      {
        heading: 'Hébergement',
        body: [
          'Site hébergé par Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis.',
          'Données d’inscription hébergées par Supabase, sur des serveurs situés dans l’Union européenne (région Paris).',
        ],
      },
      {
        heading: 'Propriété intellectuelle',
        body: [
          'Les textes et illustrations de ce site sont la propriété de l’éditeur, sauf mention contraire. Fond de carte © les contributeurs OpenStreetMap (licence ODbL).',
          'Le nom « arnica » et le design du site sont provisoires et pourront évoluer d’ici le lancement de la plateforme.',
        ],
      },
      {
        heading: 'Données d’exemple',
        body: [
          'Les offres affichées sur la carte de démonstration sont fictives et purement illustratives. Elles ne correspondent à aucun commerce ni partenariat existant.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Politique de confidentialité',
    sections: [
      {
        heading: 'Responsable du traitement',
        body: ['arnica, joignable à arnica.communication@gmail.com.'],
      },
      {
        heading: 'Données collectées',
        body: [
          'Formulaire d’intérêt : adresse e-mail (obligatoire), prénom (facultatif), profession, type d’établissement, code postal ou ville, catégories d’avantages qui vous intéressent, ainsi que la date et le texte de votre consentement.',
          'Formulaire commerces : nom de l’établissement, secteur, commune, nom, fonction, e-mail et téléphone professionnels du contact, type d’avantage envisagé, lien Google Maps et message. Ces données servent uniquement à vous recontacter au sujet d’un partenariat ; elles sont conservées au plus 3 ans après notre dernier échange.',
          'Questionnaire approfondi : réponses anonymes, enregistrées sans e-mail, sans nom et sans lien avec le formulaire d’intérêt. Si vous acceptez d’être recontacté·e, votre adresse est enregistrée à part, sans vos réponses, et sert uniquement à vous proposer un échange sur le projet.',
        ],
      },
      {
        heading: 'Finalités et base légale',
        body: [
          'Vos données servent à : (1) vous informer du lancement d’arnica ; (2) mesurer l’intérêt pour le projet et présenter aux futurs partenaires des statistiques globales et anonymes.',
          'Base légale : votre consentement (article 6.1.a du RGPD), que vous pouvez retirer à tout moment.',
        ],
      },
      {
        heading: 'Destinataires et hébergement',
        body: [
          'Seule l’équipe d’arnica a accès à vos données. Elles ne sont ni vendues ni cédées. Aucune donnée nominative n’est transmise aux commerces partenaires.',
          'Elles sont hébergées par Supabase dans l’Union européenne (région Paris).',
        ],
      },
      {
        heading: 'Durée de conservation',
        body: [
          '12 mois après votre inscription. Vos données sont ensuite supprimées.',
        ],
      },
      {
        heading: 'Vos droits',
        body: [
          'Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition, de limitation et de portabilité. Écrivez-nous à arnica.communication@gmail.com.',
          'Vous pouvez également adresser une réclamation à la CNIL (www.cnil.fr).',
        ],
      },
      {
        heading: 'Cookies et services tiers',
        body: [
          'Ce site ne dépose aucun cookie et n’utilise aucun outil de mesure d’audience.',
          'Le fond de la carte de démonstration est fourni par OpenStreetMap : pour l’afficher, votre navigateur contacte les serveurs de la Fondation OpenStreetMap, qui reçoivent votre adresse IP (sans cookie). Les liens « Voir sur Google Maps » ouvrent le site de Google dans un nouvel onglet, uniquement si vous cliquez dessus.',
        ],
      },
    ],
  },
};

/* ── Questionnaire approfondi (#questionnaire) ──────────────── */
/**
 * Chaque question :
 *  - type 'single'  : un seul choix (boutons)        - type 'select' : liste déroulante
 *  - type 'multi'   : plusieurs choix (max = limite)  - type 'scale'  : échelle de 1 à 5
 *  - type 'text'    : réponse libre (facultative)
 *  - optionsFrom    : reprend les réponses cochées d'une autre question
 * Les « value » sont enregistrées en base. Vous pouvez ajouter ou retirer des options librement.
 */
export type SurveyOption = { value: string; label: string };
export type SurveyQuestion = {
  id: string;
  type: 'single' | 'select' | 'multi' | 'scale' | 'text';
  label: string;
  hint?: string;
  required?: boolean;
  max?: number;
  options?: SurveyOption[];
  optionsFrom?: string;
  emptyText?: string;
  placeholder?: string;
  scaleLabels?: [string, string];
  noneOption?: SurveyOption;
};
export type SurveyStep = { id: string; title: string; intro?: string; questions: SurveyQuestion[] };

const aidOptions: SurveyOption[] = [
  { value: 'cgos', label: 'CGOS' },
  { value: 'cse', label: 'CSE / comité d’entreprise' },
  { value: 'cnas', label: 'CNAS' },
  { value: 'cos', label: 'COS / amicale du personnel' },
  { value: 'action-sociale-employeur', label: 'Action sociale de mon employeur' },
  { value: 'action-logement', label: 'Action Logement' },
  { value: 'plateformes-avantages', label: 'Plateformes de réductions en ligne' },
  { value: 'mutuelle', label: 'Services de ma mutuelle' },
  { value: 'autre', label: 'Autre' },
];

export const survey = {
  id: 'questionnaire',
  backToSite: 'Retour au site',
  title: 'Aidez-nous à construire arnica',
  intro:
    'Environ 5 minutes. Vos réponses sont anonymes : nous ne vous demandons ni nom, ni e-mail, ni information sur votre santé. Seules les questions marquées d’un astérisque (*) sont obligatoires.',
  start: 'Commencer',
  next: 'Suivant',
  previous: 'Précédent',
  submit: 'Envoyer mes réponses',
  submitting: 'Envoi en cours…',
  stepLabel: (n: number, total: number) => `Étape ${n} sur ${total}`,
  maxReached: (max: number) => `${max} choix maximum`,
  draftNote: 'Vos réponses sont gardées sur cet appareil tant que vous n’avez pas envoyé le questionnaire.',
  requiredError: 'Merci de répondre à cette question.',
  networkError: 'L’envoi n’a pas abouti. Vérifiez votre connexion puis réessayez.',
  openTextWarning: 'N’indiquez ni nom ni information sur votre santé.',

  steps: [
    {
      id: 'profil',
      title: 'Votre profil',
      questions: [
        {
          id: 'profession',
          type: 'select',
          label: 'Quel est votre métier ?',
          required: true,
          placeholder: 'Choisissez votre métier',
          options: [
            { value: 'infirmier', label: 'Infirmier·e' },
            { value: 'aide-soignant', label: 'Aide-soignant·e' },
            { value: 'medecin', label: 'Médecin' },
            { value: 'sage-femme', label: 'Sage-femme' },
            { value: 'reeducation', label: 'Kinésithérapeute, ergothérapeute, autre rééducation' },
            { value: 'pharmacie', label: 'Pharmacien·ne, préparateur·rice' },
            { value: 'medico-technique', label: 'Manipulateur·rice radio, technicien·ne de labo' },
            { value: 'cadre', label: 'Cadre de santé, encadrement' },
            { value: 'administratif', label: 'Personnel administratif' },
            { value: 'medico-social', label: 'Médico-social (éducateur·rice, AES, AMP…)' },
            { value: 'technique', label: 'Logistique, technique, hôtellerie' },
            { value: 'etudiant', label: 'Étudiant·e, interne' },
            { value: 'autre', label: 'Autre' },
          ],
        },
        {
          id: 'sector',
          type: 'single',
          label: 'Dans quel secteur exercez-vous ?',
          required: true,
          options: [
            { value: 'public', label: 'Public' },
            { value: 'prive', label: 'Privé' },
            { value: 'liberal', label: 'Libéral' },
            { value: 'autre', label: 'Autre' },
          ],
        },
        {
          id: 'structure',
          type: 'select',
          label: 'Dans quel type de structure ?',
          placeholder: 'Choisissez un type de structure',
          options: [
            { value: 'hopital', label: 'Hôpital, CHU, centre hospitalier' },
            { value: 'clinique', label: 'Clinique' },
            { value: 'ehpad', label: 'EHPAD, résidence pour personnes âgées' },
            { value: 'medico-social', label: 'Établissement médico-social (handicap, protection de l’enfance…)' },
            { value: 'domicile', label: 'Soins ou aide à domicile (SSIAD, HAD…)' },
            { value: 'cabinet', label: 'Cabinet, maison ou centre de santé' },
            { value: 'pharmacie-labo', label: 'Pharmacie, laboratoire' },
            { value: 'autre', label: 'Autre' },
          ],
        },
        {
          id: 'seniority',
          type: 'single',
          label: 'Depuis combien de temps exercez-vous ?',
          options: [
            { value: 'moins-2', label: 'Moins de 2 ans' },
            { value: '2-5', label: '2 à 5 ans' },
            { value: '6-10', label: '6 à 10 ans' },
            { value: '11-20', label: '11 à 20 ans' },
            { value: 'plus-20', label: 'Plus de 20 ans' },
          ],
        },
        {
          id: 'region',
          type: 'select',
          label: 'Dans quelle région travaillez-vous ?',
          placeholder: 'Choisissez votre région',
          options: [
            { value: 'pays-de-la-loire', label: 'Pays de la Loire' },
            { value: 'bretagne', label: 'Bretagne' },
            { value: 'auvergne-rhone-alpes', label: 'Auvergne-Rhône-Alpes' },
            { value: 'bourgogne-franche-comte', label: 'Bourgogne-Franche-Comté' },
            { value: 'centre-val-de-loire', label: 'Centre-Val de Loire' },
            { value: 'corse', label: 'Corse' },
            { value: 'grand-est', label: 'Grand Est' },
            { value: 'hauts-de-france', label: 'Hauts-de-France' },
            { value: 'ile-de-france', label: 'Île-de-France' },
            { value: 'normandie', label: 'Normandie' },
            { value: 'nouvelle-aquitaine', label: 'Nouvelle-Aquitaine' },
            { value: 'occitanie', label: 'Occitanie' },
            { value: 'paca', label: 'Provence-Alpes-Côte d’Azur' },
            { value: 'outre-mer', label: 'Outre-mer' },
            { value: 'hors-france', label: 'Hors de France' },
          ],
        },
      ],
    },
    {
      id: 'aides',
      title: 'Les aides que vous connaissez',
      intro: 'Comités, organismes ou plateformes qui proposent des aides, avantages ou réductions aux salarié·es.',
      questions: [
        {
          id: 'knownAids',
          type: 'multi',
          label: 'Quelles aides ou quels organismes connaissez-vous ?',
          hint: 'Plusieurs choix possibles',
          options: aidOptions,
          noneOption: { value: 'aucun', label: 'Je n’en connais aucun' },
        },
        {
          id: 'usedAids',
          type: 'multi',
          label: 'Lesquels avez-vous déjà utilisés ?',
          hint: 'Plusieurs choix possibles',
          optionsFrom: 'knownAids',
          emptyText: 'Cochez d’abord les organismes que vous connaissez dans la question précédente.',
          noneOption: { value: 'aucun', label: 'Aucun' },
        },
        {
          id: 'heardFrom',
          type: 'multi',
          label: 'Comment en avez-vous entendu parler ?',
          hint: 'Plusieurs choix possibles',
          options: [
            { value: 'collegues', label: 'Par des collègues' },
            { value: 'employeur', label: 'Par mon employeur, les RH' },
            { value: 'syndicat', label: 'Par un syndicat' },
            { value: 'affichage', label: 'Affichage, journal ou intranet interne' },
            { value: 'reseaux-sociaux', label: 'Réseaux sociaux' },
            { value: 'internet', label: 'Recherche sur internet' },
            { value: 'formation', label: 'Pendant mes études ou une formation' },
            { value: 'autre', label: 'Autre' },
          ],
        },
        {
          id: 'satisfaction',
          type: 'scale',
          label: 'Quel est votre niveau de satisfaction vis-à-vis de ces aides ?',
          scaleLabels: ['Pas du tout satisfait·e', 'Très satisfait·e'],
          noneOption: { value: 'sans-avis', label: 'Je n’en utilise pas / sans avis' },
        },
      ],
    },
    {
      id: 'besoins',
      title: 'Vos besoins',
      questions: [
        {
          id: 'priorities',
          type: 'multi',
          max: 3,
          label: 'Quels domaines sont prioritaires pour vous ?',
          hint: 'Jusqu’à 3 choix',
          options: [
            { value: 'restauration', label: 'Restauration, tickets restaurant' },
            { value: 'complementaire-sante', label: 'Complémentaire santé' },
            { value: 'logement', label: 'Logement' },
            { value: 'transport', label: 'Transport, mobilité, stationnement' },
            { value: 'garde-enfants', label: 'Garde d’enfants' },
            { value: 'loisirs', label: 'Loisirs, vacances, culture' },
            { value: 'sport-bien-etre', label: 'Sport, bien-être' },
            { value: 'soutien-psy', label: 'Soutien psychologique' },
            { value: 'formation', label: 'Formation' },
            { value: 'courses', label: 'Courses et services du quotidien' },
            { value: 'autre', label: 'Autre' },
          ],
        },
        {
          id: 'unmetNeed',
          type: 'text',
          label: 'Quel besoin n’est pas couvert aujourd’hui ?',
          hint: 'Facultatif',
          placeholder: 'Ex. : une solution de garde quand je travaille de nuit…',
        },
      ],
    },
    {
      id: 'freins',
      title: 'Ce qui vous freine',
      questions: [
        {
          id: 'barriers',
          type: 'multi',
          label: 'Qu’est-ce qui vous empêche d’utiliser certaines aides ?',
          hint: 'Plusieurs choix possibles',
          options: [
            { value: 'information', label: 'Manque d’information' },
            { value: 'demarches', label: 'Démarches trop longues ou compliquées' },
            { value: 'eligibilite', label: 'Critères d’éligibilité' },
            { value: 'temps', label: 'Manque de temps' },
            { value: 'horaires', label: 'Offres incompatibles avec mes horaires' },
            { value: 'distance', label: 'Offres trop loin de chez moi ou du travail' },
            { value: 'peu-interessant', label: 'Avantages peu intéressants' },
            { value: 'droits', label: 'Je ne savais pas que j’y avais droit' },
            { value: 'autre', label: 'Autre' },
          ],
          noneOption: { value: 'aucun', label: 'Rien ne me freine' },
        },
      ],
    },
    {
      id: 'attentes',
      title: 'Vos attentes pour le site',
      questions: [
        {
          id: 'features',
          type: 'multi',
          label: 'Quelles fonctionnalités vous seraient utiles ?',
          hint: 'Plusieurs choix possibles',
          options: [
            { value: 'carte', label: 'Carte des offres près de chez moi ou du travail' },
            { value: 'simulateur', label: 'Simulateur d’éligibilité aux aides' },
            { value: 'recherche-metier', label: 'Recherche par métier' },
            { value: 'alertes', label: 'Alertes sur les nouvelles offres' },
            { value: 'annuaire', label: 'Annuaire des organismes' },
            { value: 'horaires-decales', label: 'Offres adaptées aux horaires décalés' },
            { value: 'carte-numerique', label: 'Carte d’avantages sur mon téléphone' },
            { value: 'autre', label: 'Autre' },
          ],
        },
        {
          id: 'devices',
          type: 'multi',
          label: 'Sur quel support l’utiliseriez-vous ?',
          options: [
            { value: 'telephone', label: 'Téléphone' },
            { value: 'ordinateur', label: 'Ordinateur' },
            { value: 'tablette', label: 'Tablette' },
          ],
        },
        {
          id: 'moments',
          type: 'multi',
          label: 'À quel moment de la journée ?',
          hint: 'Plusieurs choix possibles',
          options: [
            { value: 'avant-travail', label: 'Avant le travail' },
            { value: 'pause', label: 'Pendant une pause' },
            { value: 'apres-travail', label: 'Après le travail ou la garde' },
            { value: 'soir', label: 'Le soir' },
            { value: 'repos', label: 'Les jours de repos' },
            { value: 'indifferent', label: 'Pas de moment précis' },
          ],
        },
        {
          id: 'idea',
          type: 'text',
          label: 'Une idée ou une remarque ?',
          hint: 'Facultatif',
          placeholder: 'Tout ce qui pourrait rendre arnica utile pour vous…',
        },
      ],
    },
  ] satisfies SurveyStep[],

  /** Dernière étape : contact facultatif, enregistré séparément des réponses */
  contact: {
    title: 'Échanger avec nous ? (facultatif)',
    intro:
      'Nous aimerions parfois approfondir avec quelques professionnel·les, par un court échange. Si vous êtes d’accord, laissez votre e-mail. Sinon, envoyez directement vos réponses.',
    emailLabel: 'Adresse e-mail',
    emailPlaceholder: 'camille@exemple.fr',
    emailInvalid: 'Cette adresse e-mail ne semble pas valide.',
    consent:
      'J’accepte d’être recontacté·e par arnica pour un échange sur le projet. Mon adresse est enregistrée séparément de mes réponses, qui restent anonymes. Je peux retirer mon accord à tout moment.',
    consentRequired: 'Cochez cette case pour que nous puissions enregistrer votre adresse, ou videz le champ e-mail.',
    privacyLink: 'Politique de confidentialité',
  },

  success: {
    title: 'Merci infiniment !',
    text: 'Vos réponses vont directement guider la construction de la plateforme et nos échanges avec les futurs partenaires.',
    back: 'Retour au site',
  },
};

/* ── Commerces & entreprises : encart sur l'accueil ─────────── */
export const partnerInvite = {
  id: 'commerces',
  eyebrow: 'Commerçant·e, entreprise ?',
  title: 'Faites partie des premiers partenaires d’arnica',
  text: 'Vous tenez un commerce, un restaurant, une salle de sport ou une entreprise de services à Saint-Nazaire ou sur la presqu’île guérandaise ? Proposez un avantage au personnel de santé et faites-vous connaître d’une clientèle locale et fidèle.',
  points: ['Une visibilité locale sur la carte arnica', 'Un geste de reconnaissance envers les soignant·es', 'Sans engagement à ce stade'],
  button: 'Je représente un commerce',
};

/* ── Page partenaires (#partenaires) ────────────────────────── */
export const partnerPage = {
  id: 'partenaires',
  backToSite: 'Retour au site',
  hero: {
    eyebrow: 'Espace commerces & entreprises',
    title: 'Faites grandir votre activité en prenant soin de celles et ceux qui soignent',
    text: 'arnica réunira sur une carte les avantages réservés au personnel de santé : hôpitaux, cliniques, EHPAD, libéraux, médico-social… Rejoignez le réseau dès sa création à Saint-Nazaire et sur la presqu’île guérandaise.',
    cta: 'Manifester mon intérêt',
    reassurance: ['Gratuit et sans engagement', 'Réponse sous quelques jours', 'Vous choisissez votre avantage'],
  },
  benefits: {
    eyebrow: 'Pourquoi rejoindre arnica',
    title: 'Un partenariat utile pour vous… et pour eux',
    items: [
      { icon: 'MapPin' as IconName, title: 'Visibilité locale', text: 'Votre établissement apparaît sur la carte arnica, avec votre offre et un lien direct vers votre fiche Google Maps.' },
      { icon: 'UserPlus' as IconName, title: 'Une nouvelle clientèle', text: 'Des professionnel·les qui vivent et travaillent près de chez vous, souvent à des horaires où l’on cherche une adresse de confiance.' },
      { icon: 'HeartHandshake' as IconName, title: 'Une image engagée', text: 'Affichez votre soutien concret aux soignant·es du territoire, un engagement que vos client·es remarquent.' },
      { icon: 'BadgePercent' as IconName, title: 'Une offre à votre main', text: 'Réduction, produit offert, tarif préférentiel, offre ponctuelle : vous définissez l’avantage qui convient à votre activité.' },
    ],
  },
  steps: {
    eyebrow: 'Comment ça se passe',
    title: 'Trois étapes simples',
    items: [
      { icon: 'Ticket' as IconName, title: 'Je manifeste mon intérêt', text: 'Le formulaire ci-dessous prend 2 minutes. Il ne vous engage à rien.' },
      { icon: 'HeartHandshake' as IconName, title: 'Nous échangeons ensemble', text: 'Nous vous recontactons pour présenter le projet et construire avec vous une offre adaptée.' },
      { icon: 'Map' as IconName, title: 'Je rejoins la carte', text: 'Au lancement, votre établissement et votre avantage apparaissent sur arnica.' },
    ],
  },
  notice:
    'arnica est en phase d’étude : les modalités du partenariat (fonctionnement, éventuels frais, durée) sont en cours de définition et seront présentées lors de notre échange. Manifester votre intérêt n’engage à rien.',
  form: {
    id: 'formulaire-partenaire',
    eyebrow: 'Formulaire commerces',
    title: 'Votre établissement est intéressé ?',
    intro: 'Laissez-nous vos coordonnées : nous revenons vers vous pour en discuter.',
    requiredHint: 'Les champs marqués d’un astérisque (*) sont obligatoires.',
    fields: {
      business: { label: 'Nom de l’établissement', placeholder: 'Votre commerce ou entreprise' },
      category: { label: 'Secteur d’activité', placeholder: 'Choisissez un secteur' },
      location: { label: 'Commune ou code postal', placeholder: '44500 ou La Baule-Escoublac' },
      contactName: { label: 'Votre nom et prénom', placeholder: 'Camille Martin' },
      role: { label: 'Votre fonction', hint: 'Facultatif', placeholder: 'Gérant·e, responsable marketing…' },
      email: { label: 'E-mail professionnel', placeholder: 'contact@votre-commerce.fr' },
      phone: { label: 'Téléphone', hint: 'Facultatif', placeholder: '06 12 34 56 78' },
      offerType: { label: 'Quel type d’avantage envisageriez-vous ?', hint: 'Facultatif' },
      googleMapsUrl: { label: 'Lien de votre fiche Google Maps', hint: 'Facultatif', placeholder: 'https://maps.app.goo.gl/…' },
      message: { label: 'Un message, une question ?', hint: 'Facultatif', placeholder: 'Vos horaires, une idée d’offre, une question…' },
    },
    categories: [
      { value: 'restauration', label: 'Restauration, boulangerie, café' },
      { value: 'sport', label: 'Sport, salle de sport, club' },
      { value: 'loisirs', label: 'Loisirs, culture, sorties' },
      { value: 'commerces', label: 'Commerce de proximité' },
      { value: 'bien-etre', label: 'Bien-être, coiffure, soins' },
      { value: 'services', label: 'Services du quotidien (garage, pressing…)' },
      { value: 'autre', label: 'Autre' },
    ],
    offerTypes: [
      { value: 'reduction', label: 'Réduction en %' },
      { value: 'produit-offert', label: 'Produit ou service offert' },
      { value: 'tarif-preferentiel', label: 'Tarif préférentiel' },
      { value: 'offre-ponctuelle', label: 'Offre ponctuelle' },
      { value: 'a-definir', label: 'À définir ensemble' },
    ],
    consent:
      'J’accepte qu’arnica utilise ces informations pour me recontacter au sujet d’un partenariat. Elles ne sont ni vendues ni cédées, et je peux demander leur suppression à tout moment.',
    privacyLink: 'Politique de confidentialité',
    submit: 'Envoyer ma demande',
    submitting: 'Envoi en cours…',
    errors: {
      summary: 'Merci de corriger les champs signalés.',
      required: 'Ce champ est obligatoire.',
      email: 'Cette adresse e-mail ne semble pas valide (exemple : nom@domaine.fr).',
      url: 'Ce lien ne semble pas valide. Il doit commencer par https://',
      consent: 'Votre accord est nécessaire pour que nous puissions vous recontacter.',
      network: 'L’envoi n’a pas abouti. Vérifiez votre connexion puis réessayez, ou écrivez-nous à arnica.communication@gmail.com.',
    },
    success: {
      title: 'Merci, votre demande est bien reçue !',
      text: 'Nous revenons vers vous très vite pour vous présenter arnica et imaginer ensemble votre avantage.',
      back: 'Retour au site',
    },
  },
  faq: [
    { q: 'Combien ça coûte ?', a: 'Les modalités sont en cours de définition pendant la phase d’étude. Manifester votre intérêt est gratuit et ne vous engage à rien : nous vous présenterons les conditions lors de notre échange.' },
    { q: 'Quel avantage dois-je proposer ?', a: 'C’est vous qui choisissez : réduction, produit offert, tarif préférentiel ou offre ponctuelle. Nous pouvons vous aider à trouver une offre attractive et réaliste pour votre activité.' },
    { q: 'Comment les soignant·es prouveront-ils leur statut ?', a: 'Le mode de vérification (carte, application, code) fait partie des points que nous définissons pendant la phase d’étude. Votre avis nous intéresse.' },
    { q: 'Quand la plateforme sera-t-elle lancée ?', a: 'Nous rencontrons d’abord les commerces et recueillons l’intérêt des professionnel·les de santé. La date de lancement dépendra du nombre de partenaires réunis.' },
  ],
  faqTitle: 'Questions fréquentes des commerces',
};
