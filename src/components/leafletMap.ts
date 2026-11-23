/**
 * Carte interactive Leaflet + OpenStreetMap (gratuite, sans clé).
 * Module chargé à la demande : Leaflet n'est téléchargé que lorsque la carte approche de l'écran.
 */
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { googleMapsLink, type DemoOffer } from '../data/demoOffers';
import { PLANT_SIZE, plantSvg } from '../lib/plants';

export interface DemoMapHandle {
  setFilter(category: string | null): void;
  /** Centre la carte sur une offre et ouvre sa bulle */
  focus(offerId: string): void;
  destroy(): void;
}

/** Repère « pousse » : la taille de base reste petite, elle grandit quand la bulle s'ouvre. */
function plantIcon(category: string, color: string) {
  return L.divIcon({
    className: 'rs-marker',
    iconSize: [PLANT_SIZE.width, PLANT_SIZE.height],
    iconAnchor: [PLANT_SIZE.width / 2, PLANT_SIZE.height],
    // La pousse ouverte mesure ~1,6 × sa taille : la bulle s'ouvre au-dessus de la fleur
    popupAnchor: [0, -Math.round(PLANT_SIZE.height * 1.6) - 4],
    html: `<div class="rs-plant">${plantSvg(category, color, true)}</div>`,
  });
}

/** Bulle d'info : nom, promotion, adresse, lien Google Maps (construite en DOM, sans innerHTML de données). */
function popupContent(offer: DemoOffer, opts: { badge: string; linkLabel: string; categoryLabel: string }) {
  const el = (tag: string, cls: string, text?: string) => {
    const n = document.createElement(tag);
    n.className = cls;
    if (text) n.textContent = text;
    return n;
  };
  const root = el('div', 'rs-pop');
  root.append(el('p', 'rs-pop-badge', opts.badge));
  root.append(el('p', 'rs-pop-cat', opts.categoryLabel));
  root.append(el('p', 'rs-pop-title', offer.title));
  root.append(el('p', 'rs-pop-deal', offer.offer));

  const addr = el('p', 'rs-pop-addr');
  addr.innerHTML =
    '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
  addr.append(document.createTextNode(offer.address));
  root.append(addr);

  const a = el('a', 'rs-pop-link', `${opts.linkLabel} ↗`) as HTMLAnchorElement;
  a.href = googleMapsLink(offer);
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  root.append(a);
  return root;
}

export function createDemoMap(
  el: HTMLElement,
  opts: {
    center: { lat: number; lng: number };
    zoom: number;
    offers: DemoOffer[];
    colors: Record<string, string>;
    labels: Record<string, string>;
    badge: string;
    linkLabel: string;
    reduceMotion: boolean;
  },
): DemoMapHandle {
  const map = L.map(el, {
    center: opts.center,
    zoom: opts.zoom,
    scrollWheelZoom: false, // la molette fait défiler la page, pas la carte
    zoomAnimation: !opts.reduceMotion,
    fadeAnimation: !opts.reduceMotion,
    markerZoomAnimation: !opts.reduceMotion,
  });
  // Molette activée seulement après un clic dans la carte
  map.on('focus click', () => map.scrollWheelZoom.enable());
  map.on('blur mouseout', () => map.scrollWheelZoom.disable());

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">les contributeurs OpenStreetMap</a>',
  }).addTo(map);

  const markers = opts.offers.map((offer) => {
    const marker = L.marker([offer.lat, offer.lng], {
      icon: plantIcon(offer.category, opts.colors[offer.category] ?? 'var(--color-brand-700)'),
      title: `${offer.title}, ${offer.town}`,
      alt: `${offer.title}, ${offer.town}`,
      keyboard: true,
      riseOnHover: true,
    }).bindPopup(
      () => popupContent(offer, { badge: opts.badge, linkLabel: opts.linkLabel, categoryLabel: opts.labels[offer.category] ?? '' }),
      { className: 'rs-popup', maxWidth: 280, minWidth: 220, autoPanPaddingTopLeft: [20, 60], autoPanPaddingBottomRight: [20, 20] },
    );
    // La pousse grandit (et fleurit) pendant que sa bulle est ouverte
    marker.on('popupopen', () => {
      marker.getElement()?.querySelector('.rs-plant')?.classList.add('is-open');
      marker.setZIndexOffset(1000);
    });
    marker.on('popupclose', () => {
      marker.getElement()?.querySelector('.rs-plant')?.classList.remove('is-open');
      marker.setZIndexOffset(0);
    });
    marker.addTo(map);
    return { offer, marker };
  });

  return {
    setFilter(category) {
      map.closePopup();
      for (const { offer, marker } of markers) {
        const visible = !category || offer.category === category;
        if (visible && !map.hasLayer(marker)) marker.addTo(map);
        if (!visible && map.hasLayer(marker)) marker.remove();
      }
    },
    focus(offerId) {
      const found = markers.find((m) => m.offer.id === offerId);
      if (!found) return;
      if (!map.hasLayer(found.marker)) found.marker.addTo(map);
      // Ouvre la bulle une fois le déplacement terminé, pour qu'elle se recadre correctement
      map.once('moveend', () => found.marker.openPopup());
      map.setView(found.marker.getLatLng(), Math.max(map.getZoom(), 14), { animate: !opts.reduceMotion });
    },
    destroy() {
      map.remove();
    },
  };
}
