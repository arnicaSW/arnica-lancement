/**
 * Pousses de la carte : une forme de plante par catégorie, dans un pot à la couleur de la catégorie.
 * Au clic, la pousse grandit et une fleur d'arnica éclot à son sommet (voir .rs-plant dans index.css).
 * Chaînes SVG statiques (aucune donnée utilisateur) : utilisables dans Leaflet et en React.
 */

const LEAF = 'var(--color-mint-600)';
const LEAF_DARK = 'var(--color-mint-700)';
const LEAF_LIGHT = 'var(--color-mint-400)';

/** Feuillage propre à chaque catégorie (dessiné au-dessus du pot, zone 0–40 × 2–36). */
const foliage: Record<string, string> = {
  // Restauration : deux cotylédons ronds, la pousse classique
  restauration: `
    <path d="M20 36V21" stroke="${LEAF_DARK}" stroke-width="2.6" stroke-linecap="round"/>
    <ellipse cx="13" cy="19" rx="7.5" ry="4.6" transform="rotate(-25 13 19)" fill="${LEAF}"/>
    <ellipse cx="27" cy="17" rx="7.5" ry="4.6" transform="rotate(25 27 17)" fill="${LEAF}"/>`,
  // Sport : tige élancée, feuilles pointues alternées
  sport: `
    <path d="M20 36V9" stroke="${LEAF_DARK}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M20 28Q10 27 8 19Q16 20 20 28Z" fill="${LEAF}"/>
    <path d="M20 21Q30 20 32 12Q24 13 20 21Z" fill="${LEAF}"/>
    <path d="M20 12Q15.5 7 20 2Q24.5 7 20 12Z" fill="${LEAF_LIGHT}"/>`,
  // Loisirs & culture : vrille qui s'enroule, une feuille
  loisirs: `
    <path d="M20 36C20 28 16.5 24 20 18C23.5 12 30 14 29 19.5C28 24 22.5 22 24.5 18.5" fill="none" stroke="${LEAF_DARK}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M19.6 29Q9 29 7 21Q16 21 19.6 29Z" fill="${LEAF}"/>
    <circle cx="24.5" cy="18.5" r="2.2" fill="${LEAF_LIGHT}"/>`,
  // Commerces de proximité : trèfle à trois feuilles rondes
  commerces: `
    <path d="M20 36V18" stroke="${LEAF_DARK}" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="14.5" cy="16.5" r="6" fill="${LEAF}"/>
    <circle cx="25.5" cy="16.5" r="6" fill="${LEAF}"/>
    <circle cx="20" cy="8.5" r="6" fill="${LEAF_LIGHT}"/>`,
  // Bien-être : brin de lavande, petits boutons le long de la tige
  'bien-etre': `
    <path d="M20 36V6" stroke="${LEAF_DARK}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M20 34Q12 32 10.5 26Q17 27 20 34Z" fill="${LEAF}"/>
    <path d="M20 34Q28 32 29.5 26Q23 27 20 34Z" fill="${LEAF}"/>
    <g fill="${LEAF_LIGHT}">
      <ellipse cx="17" cy="9" rx="2.6" ry="3.4"/><ellipse cx="23" cy="9" rx="2.6" ry="3.4"/>
      <ellipse cx="17" cy="15" rx="2.6" ry="3.4"/><ellipse cx="23" cy="15" rx="2.6" ry="3.4"/>
      <ellipse cx="20" cy="5" rx="2.4" ry="3.2"/>
    </g>`,
  // Services du quotidien : grande feuille en cœur avec nervure
  services: `
    <path d="M20 36Q20 29 20.5 25" stroke="${LEAF_DARK}" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M20.5 26C8.5 22.5 8 9.5 20.5 4C33 9.5 32.5 22.5 20.5 26Z" fill="${LEAF}"/>
    <path d="M20.5 24V8M20.5 16L15 12M20.5 19L26 15" stroke="#fff" stroke-opacity=".55" stroke-width="1.3" stroke-linecap="round" fill="none"/>`,
};

/** Fleur d'arnica miniature qui éclot au sommet quand la pousse est ouverte. */
const bloom = `
  <g class="rs-bloom" transform="translate(20 9) scale(.3)">
    <g fill="var(--color-accent-600)" stroke="#fff" stroke-width="2">
      ${[0, 60, 120, 180, 240, 300].map((a) => `<ellipse cx="0" cy="-15" rx="8" ry="14" transform="rotate(${a})"/>`).join('')}
    </g>
    <circle r="8.5" fill="var(--color-mint-600)" stroke="#fff" stroke-width="2"/>
  </g>`;

/** Pot coloré selon la catégorie, liseré blanc pour rester lisible sur la carte. */
const pot = (color: string) => `
  <path d="M10.5 41H29.5L27 51H13Z" fill="${color}" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>
  <rect x="7.5" y="36" width="25" height="6" rx="2.2" fill="${color}" stroke="#fff" stroke-width="1.6"/>`;

export const PLANT_SIZE = { width: 40, height: 52 } as const;

/** SVG complet d'une pousse. `withBloom` ajoute la fleur (cachée tant que la pousse n'est pas ouverte). */
export function plantSvg(category: string, potColor: string, withBloom = false): string {
  const leaves = foliage[category] ?? foliage.restauration;
  return `<svg viewBox="0 0 40 52" width="40" height="52" aria-hidden="true" focusable="false" overflow="visible"><g class="rs-stem">${leaves}</g>${withBloom ? bloom : ''}${pot(potColor)}</svg>`;
}
