import { hero } from '../content';
import { plantSvg } from '../lib/plants';
import { categoryColors } from './Categories';

/** Pousses décoratives (catégorie, position en %). Celle marquée « open » est en fleur. */
const pins = [
  { x: 22, y: 30, category: 'restauration', delay: '0s' },
  { x: 70, y: 22, category: 'bien-etre', delay: '-1.5s' },
  { x: 78, y: 62, category: 'sport', delay: '-3s' },
  { x: 30, y: 70, category: 'commerces', delay: '-4.5s' },
  { x: 56, y: 80, category: 'loisirs', delay: '-2.2s', open: true },
];

function Plant({ category, open = false }: { category: string; open?: boolean }) {
  return (
    <div
      className={`rs-plant h-[3.25rem] w-10 ${open ? 'is-open' : ''}`}
      dangerouslySetInnerHTML={{ __html: plantSvg(category, categoryColors[category]?.hex ?? 'var(--color-brand-700)', true) }}
    />
  );
}

export default function HeroIllustration() {
  return (
    <figure className="relative">
      <div
        role="img"
        aria-label={hero.illustrationLabel}
        className="relative aspect-[6/5] overflow-hidden rounded-[2rem] border border-white bg-mint-50 shadow-2xl shadow-brand-900/15"
      >
        {/* Fond de carte stylisé */}
        <svg aria-hidden="true" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
          <rect width="600" height="500" fill="var(--color-mint-50)" />
          {/* Océan */}
          <path
            d="M0 330 C 80 300 120 360 200 350 C 280 340 300 420 380 430 C 450 440 520 470 600 460 L600 500 L0 500 Z"
            fill="var(--color-brand-100)"
          />
          <path
            d="M0 360 C 90 335 130 390 210 382 C 290 374 310 450 390 458 C 460 466 530 490 600 488"
            fill="none"
            stroke="var(--color-brand-200)"
            strokeWidth="3"
            strokeDasharray="10 10"
          />
          {/* Parcs */}
          <circle cx="120" cy="120" r="55" fill="var(--color-mint-100)" />
          <circle cx="480" cy="300" r="45" fill="var(--color-mint-100)" />
          {/* Routes */}
          <g stroke="#fff" strokeLinecap="round" fill="none">
            <path d="M-10 210 C 150 190 300 260 610 200" strokeWidth="16" />
            <path d="M300 -10 C 280 120 340 260 300 510" strokeWidth="14" />
            <path d="M60 -10 C 120 140 80 260 160 340" strokeWidth="9" />
            <path d="M610 90 C 470 120 420 60 340 40" strokeWidth="9" />
            <path d="M420 510 C 430 400 520 360 610 380" strokeWidth="9" />
          </g>
          {/* Zone de proximité autour du lieu de travail */}
          <circle cx="300" cy="225" r="140" fill="var(--color-brand-600)" fillOpacity="0.06" stroke="var(--color-brand-600)" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="6 8" />
        </svg>

        {/* Lieu de travail (établissement de santé) avec onde de pulsation */}
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute inset-0 rounded-2xl bg-brand-500/40 animate-pulse-ring" />
          <span className="absolute inset-0 rounded-2xl bg-brand-500/30 animate-pulse-ring" style={{ animationDelay: '1.5s' }} />
          <span className="relative grid size-14 place-items-center rounded-2xl bg-brand-700 shadow-lg">
            <svg viewBox="0 0 24 24" className="size-7" fill="#fff">
              <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z" />
            </svg>
          </span>
        </div>

        {/* Repères d'offres qui flottent */}
        {pins.map((p, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <div className="animate-float" style={{ animationDelay: p.delay }}>
              <Plant category={p.category} open={p.open} />
            </div>
          </div>
        ))}

        {/* Mini-carte d'offre (exemple) */}
        <div
          aria-hidden="true"
          className="absolute top-[8%] left-[5%] w-44 rounded-2xl bg-white/95 p-3 shadow-xl animate-float sm:w-52"
          style={{ animationDelay: '-2s', animationDuration: '7s' }}
        >
          <p className="text-[0.65rem] font-semibold tracking-wide text-accent-700 uppercase">Exemple</p>
          <p className="mt-0.5 text-sm font-bold text-brand-900">Restaurant</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="rounded-full bg-mint-100 px-2 py-0.5 text-xs font-bold text-mint-700">-10 %</span>
            <span className="text-xs text-muted">à 600 m</span>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute right-[5%] bottom-[7%] w-44 rounded-2xl bg-white/95 p-3 shadow-xl animate-float sm:w-52"
          style={{ animationDelay: '-4s', animationDuration: '8s' }}
        >
          <p className="text-[0.65rem] font-semibold tracking-wide text-accent-700 uppercase">Exemple</p>
          <p className="mt-0.5 text-sm font-bold text-brand-900">Salle de sport</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="rounded-full bg-accent-100 px-2 py-0.5 text-xs font-bold text-accent-700">1 mois offert</span>
            <span className="text-xs text-muted">à 1,2 km</span>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">Illustration : offres fictives</figcaption>
    </figure>
  );
}
