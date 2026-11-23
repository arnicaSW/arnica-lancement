/**
 * OFFRES FICTIVES pour la carte de démonstration.
 * Aucun nom de commerce réel. Positions approximatives au centre des communes,
 * légèrement décalées : elles ne désignent aucun établissement existant.
 */
export interface DemoOffer {
  id: string;
  category: string; // doit correspondre à un id de content.categories
  title: string;
  offer: string;
  town: string;
  /** Adresse affichée dans la bulle (fictive pour les exemples) */
  address: string;
  lat: number;
  lng: number;
  /**
   * Lien vers la fiche Google Maps de l'établissement (comme dans le prototype Odoo).
   * Laissez vide pour les exemples : le bouton ouvre alors la commune sur Google Maps.
   */
  googleMapsUrl?: string;
}

/** Lien « Voir sur Google Maps » : fiche de l'établissement si connue, sinon la commune. */
export function googleMapsLink(offer: DemoOffer): string {
  if (offer.googleMapsUrl) return offer.googleMapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(offer.town + ', France')}`;
}

export const demoOffers: DemoOffer[] = [
  { id: 'd1', category: 'restauration', title: 'Restaurant (exemple)', offer: '-10 % sur l’addition', town: 'Saint-Nazaire', address: 'Adresse d’exemple, 44600 Saint-Nazaire', lat: 47.2752, lng: -2.2085 },
  { id: 'd2', category: 'sport', title: 'Salle de sport (exemple)', offer: '1 mois offert à l’inscription', town: 'Saint-Nazaire', address: 'Adresse d’exemple, 44600 Saint-Nazaire', lat: 47.2668, lng: -2.2296 },
  { id: 'd3', category: 'bien-etre', title: 'Institut de bien-être (exemple)', offer: '-15 % sur les massages', town: 'Pornichet', address: 'Adresse d’exemple, 44380 Pornichet', lat: 47.2637, lng: -2.3365 },
  { id: 'd4', category: 'loisirs', title: 'Activité nautique (exemple)', offer: '-20 % sur l’initiation', town: 'La Baule-Escoublac', address: 'Adresse d’exemple, 44500 La Baule-Escoublac', lat: 47.2845, lng: -2.3802 },
  { id: 'd5', category: 'commerces', title: 'Commerce de proximité (exemple)', offer: '-10 % toute l’année', town: 'Guérande', address: 'Adresse d’exemple, 44350 Guérande', lat: 47.3262, lng: -2.4245 },
  { id: 'd6', category: 'restauration', title: 'Crêperie (exemple)', offer: 'Boisson offerte avec le menu', town: 'Le Croisic', address: 'Adresse d’exemple, 44490 Le Croisic', lat: 47.2905, lng: -2.5055 },
  { id: 'd7', category: 'services', title: 'Garage automobile (exemple)', offer: '-15 % sur la main-d’œuvre', town: 'Trignac', address: 'Adresse d’exemple, 44570 Trignac', lat: 47.3150, lng: -2.1925 },
  { id: 'd8', category: 'services', title: 'Pressing (exemple)', offer: '-20 % sur le linge professionnel', town: 'Montoir-de-Bretagne', address: 'Adresse d’exemple, 44550 Montoir-de-Bretagne', lat: 47.3275, lng: -2.1530 },
  { id: 'd9', category: 'sport', title: 'Piscine / aquaforme (exemple)', offer: 'Tarif réduit sur la carte 10 entrées', town: 'Saint-André-des-Eaux', address: 'Adresse d’exemple, 44117 Saint-André-des-Eaux', lat: 47.3135, lng: -2.3075 },
  { id: 'd10', category: 'loisirs', title: 'Cinéma (exemple)', offer: 'Tarif réduit toute la semaine', town: 'Saint-Nazaire', address: 'Adresse d’exemple, 44600 Saint-Nazaire', lat: 47.2808, lng: -2.2160 },
  { id: 'd11', category: 'bien-etre', title: 'Salon de coiffure (exemple)', offer: '-10 % sur les prestations', town: 'Le Pouliguen', address: 'Adresse d’exemple, 44510 Le Pouliguen', lat: 47.2725, lng: -2.4320 },
  { id: 'd12', category: 'commerces', title: 'Boulangerie (exemple)', offer: 'Une viennoiserie offerte le matin', town: 'Batz-sur-Mer', address: 'Adresse d’exemple, 44740 Batz-sur-Mer', lat: 47.2780, lng: -2.4790 },
];

/** Centre et zoom de la carte : Saint-Nazaire ↔ presqu'île guérandaise */
export const mapView = { center: { lat: 47.295, lng: -2.33 }, zoom: 11 };
