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
  { id: 'd2', category: 'sport', title: 'Salle de sport (exemple)', offer: '1 mois offert à l’inscription', town: 'Saint-Nazaire', address: 'Adresse d’exemple, 44600 Saint-Nazaire', lat: 47.2615, lng: -2.2600 },
  { id: 'd3', category: 'bien-etre', title: 'Institut de bien-être (exemple)', offer: '-15 % sur les massages', town: 'Pornichet', address: 'Adresse d’exemple, 44380 Pornichet', lat: 47.2637, lng: -2.3365 },
  { id: 'd4', category: 'loisirs', title: 'Activité nautique (exemple)', offer: '-20 % sur l’initiation', town: 'La Baule-Escoublac', address: 'Adresse d’exemple, 44500 La Baule-Escoublac', lat: 47.2845, lng: -2.3802 },
  { id: 'd5', category: 'commerces', title: 'Commerce de proximité (exemple)', offer: '-10 % toute l’année', town: 'Guérande', address: 'Adresse d’exemple, 44350 Guérande', lat: 47.3262, lng: -2.4245 },
  { id: 'd6', category: 'restauration', title: 'Crêperie (exemple)', offer: 'Boisson offerte avec le menu', town: 'Le Croisic', address: 'Adresse d’exemple, 44490 Le Croisic', lat: 47.2905, lng: -2.5055 },
  { id: 'd7', category: 'services', title: 'Garage automobile (exemple)', offer: '-15 % sur la main-d’œuvre', town: 'Trignac', address: 'Adresse d’exemple, 44570 Trignac', lat: 47.3150, lng: -2.1925 },
  { id: 'd8', category: 'services', title: 'Pressing (exemple)', offer: '-20 % sur le linge professionnel', town: 'Montoir-de-Bretagne', address: 'Adresse d’exemple, 44550 Montoir-de-Bretagne', lat: 47.3275, lng: -2.1530 },
  { id: 'd9', category: 'sport', title: 'Piscine / aquaforme (exemple)', offer: 'Tarif réduit sur la carte 10 entrées', town: 'Saint-André-des-Eaux', address: 'Adresse d’exemple, 44117 Saint-André-des-Eaux', lat: 47.3135, lng: -2.3075 },
  { id: 'd10', category: 'loisirs', title: 'Cinéma (exemple)', offer: 'Tarif réduit toute la semaine', town: 'Saint-Nazaire', address: 'Adresse d’exemple, 44600 Saint-Nazaire', lat: 47.2795, lng: -2.2155 },
  { id: 'd11', category: 'bien-etre', title: 'Salon de coiffure (exemple)', offer: '-10 % sur les prestations', town: 'Le Pouliguen', address: 'Adresse d’exemple, 44510 Le Pouliguen', lat: 47.2725, lng: -2.4320 },
  { id: 'd12', category: 'commerces', title: 'Boulangerie (exemple)', offer: 'Une viennoiserie offerte le matin', town: 'Batz-sur-Mer', address: 'Adresse d’exemple, 44740 Batz-sur-Mer', lat: 47.2780, lng: -2.4790 },
  { id: 'd13', category: 'restauration', title: 'Brasserie (exemple)', offer: 'Café offert avec le plat du jour', town: 'Saint-Nazaire', address: 'Adresse d’exemple, 44600 Saint-Nazaire', lat: 47.2975, lng: -2.2050 },
  { id: 'd14', category: 'restauration', title: 'Pizzeria (exemple)', offer: '-15 % sur les pizzas à emporter', town: 'La Baule-Escoublac', address: 'Adresse d’exemple, 44500 La Baule-Escoublac', lat: 47.2940, lng: -2.4060 },
  { id: 'd15', category: 'restauration', title: 'Boulangerie-pâtisserie (exemple)', offer: 'Une boisson chaude offerte le matin', town: 'Guérande', address: 'Adresse d’exemple, 44350 Guérande', lat: 47.3340, lng: -2.4380 },
  { id: 'd16', category: 'restauration', title: 'Restaurant de poisson (exemple)', offer: '-10 % le midi en semaine', town: 'La Turballe', address: 'Adresse d’exemple, 44420 La Turballe', lat: 47.3462, lng: -2.5055 },
  { id: 'd17', category: 'restauration', title: 'Crêperie (exemple)', offer: 'Dessert offert pour une galette achetée', town: 'Saint-Brevin-les-Pins', address: 'Adresse d’exemple, 44250 Saint-Brevin-les-Pins', lat: 47.2475, lng: -2.1655 },
  { id: 'd18', category: 'commerces', title: 'Fleuriste (exemple)', offer: '-10 % sur les bouquets', town: 'Saint-Nazaire', address: 'Adresse d’exemple, 44600 Saint-Nazaire', lat: 47.2840, lng: -2.2420 },
  { id: 'd19', category: 'commerces', title: 'Librairie (exemple)', offer: '-5 % sur tous les livres', town: 'Pornichet', address: 'Adresse d’exemple, 44380 Pornichet', lat: 47.2735, lng: -2.3260 },
  { id: 'd20', category: 'commerces', title: 'Épicerie fine (exemple)', offer: '-10 % dès 30 € d’achat', town: 'Le Croisic', address: 'Adresse d’exemple, 44490 Le Croisic', lat: 47.2926, lng: -2.5118 },
  { id: 'd21', category: 'commerces', title: 'Primeur (exemple)', offer: 'Un panier de saison à prix réduit', town: 'Trignac', address: 'Adresse d’exemple, 44570 Trignac', lat: 47.3230, lng: -2.1830 },
  { id: 'd22', category: 'commerces', title: 'Boutique de vêtements (exemple)', offer: '-15 % hors soldes', town: 'Saint-Lyphard', address: 'Adresse d’exemple, 44410 Saint-Lyphard', lat: 47.3980, lng: -2.3060 },
  { id: 'd23', category: 'bien-etre', title: 'Institut de beauté (exemple)', offer: '-20 % sur le premier soin', town: 'Saint-Nazaire', address: 'Adresse d’exemple, 44600 Saint-Nazaire', lat: 47.2500, lng: -2.2920 },
  { id: 'd24', category: 'bien-etre', title: 'Spa (exemple)', offer: 'Accès détente à -25 % en semaine', town: 'La Baule-Escoublac', address: 'Adresse d’exemple, 44500 La Baule-Escoublac', lat: 47.2805, lng: -2.3620 },
  { id: 'd25', category: 'bien-etre', title: 'Sophrologue (exemple)', offer: 'Première séance offerte', town: 'Guérande', address: 'Adresse d’exemple, 44350 Guérande', lat: 47.3180, lng: -2.4120 },
  { id: 'd26', category: 'bien-etre', title: 'Barbier (exemple)', offer: '-10 % sur la coupe', town: 'Montoir-de-Bretagne', address: 'Adresse d’exemple, 44550 Montoir-de-Bretagne', lat: 47.3330, lng: -2.1440 },
  { id: 'd27', category: 'bien-etre', title: 'Salon de massage (exemple)', offer: '-15 % après une garde de nuit', town: 'Batz-sur-Mer', address: 'Adresse d’exemple, 44740 Batz-sur-Mer', lat: 47.2820, lng: -2.4700 },
  { id: 'd28', category: 'loisirs', title: 'Bowling (exemple)', offer: 'Une partie offerte pour deux jouées', town: 'Saint-Nazaire', address: 'Adresse d’exemple, 44600 Saint-Nazaire', lat: 47.3050, lng: -2.2650 },
  { id: 'd29', category: 'loisirs', title: 'Location de vélos (exemple)', offer: '-20 % à la journée', town: 'Pornichet', address: 'Adresse d’exemple, 44380 Pornichet', lat: 47.2700, lng: -2.3530 },
  { id: 'd30', category: 'loisirs', title: 'Visite en barque (exemple)', offer: 'Tarif réduit sur la balade', town: 'Saint-Joachim', address: 'Adresse d’exemple, 44720 Saint-Joachim', lat: 47.3825, lng: -2.1935 },
  { id: 'd31', category: 'loisirs', title: 'Théâtre (exemple)', offer: 'Place à tarif réduit', town: 'Saint-Nazaire', address: 'Adresse d’exemple, 44600 Saint-Nazaire', lat: 47.2730, lng: -2.2025 },
  { id: 'd32', category: 'loisirs', title: 'Escape game (exemple)', offer: '-15 % par équipe', town: 'Saint-André-des-Eaux', address: 'Adresse d’exemple, 44117 Saint-André-des-Eaux', lat: 47.3215, lng: -2.3020 },
  { id: 'd33', category: 'sport', title: 'Club de yoga (exemple)', offer: 'Deux cours d’essai offerts', town: 'Saint-Nazaire', address: 'Adresse d’exemple, 44600 Saint-Nazaire', lat: 47.2910, lng: -2.2250 },
  { id: 'd34', category: 'sport', title: 'École de surf (exemple)', offer: '-20 % sur les stages', town: 'Le Pouliguen', address: 'Adresse d’exemple, 44510 Le Pouliguen', lat: 47.2760, lng: -2.4185 },
  { id: 'd35', category: 'sport', title: 'Salle d’escalade (exemple)', offer: 'Entrée découverte offerte', town: 'Trignac', address: 'Adresse d’exemple, 44570 Trignac', lat: 47.3080, lng: -2.2010 },
  { id: 'd36', category: 'sport', title: 'Club de tennis (exemple)', offer: 'Cotisation réduite la première année', town: 'Piriac-sur-Mer', address: 'Adresse d’exemple, 44420 Piriac-sur-Mer', lat: 47.3790, lng: -2.5420 },
  { id: 'd37', category: 'services', title: 'Auto-école (exemple)', offer: '-10 % sur le forfait code', town: 'Saint-Nazaire', address: 'Adresse d’exemple, 44600 Saint-Nazaire', lat: 47.2700, lng: -2.2450 },
  { id: 'd38', category: 'services', title: 'Cordonnerie (exemple)', offer: '-15 % sur les réparations', town: 'Guérande', address: 'Adresse d’exemple, 44350 Guérande', lat: 47.3390, lng: -2.4200 },
  { id: 'd39', category: 'services', title: 'Garde d’enfants (exemple)', offer: 'Frais d’inscription offerts', town: 'Donges', address: 'Adresse d’exemple, 44480 Donges', lat: 47.3200, lng: -2.0750 },
  { id: 'd40', category: 'services', title: 'Réparation de vélos (exemple)', offer: 'Révision à prix réduit', town: 'Mesquer', address: 'Adresse d’exemple, 44420 Mesquer', lat: 47.3990, lng: -2.4580 },
];

/** Centre et zoom de la carte : Saint-Nazaire ↔ presqu'île guérandaise */
export const mapView = { center: { lat: 47.322, lng: -2.31 }, zoom: 11 };
