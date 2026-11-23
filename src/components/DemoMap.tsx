import { useInView, useReducedMotion } from 'framer-motion';
import { ExternalLink, Info, Loader2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { categories, demoMap } from '../content';
import { demoOffers, googleMapsLink, mapView } from '../data/demoOffers';
import { categoryColors } from './Categories';
import { plantSvg } from '../lib/plants';

/** Petite pousse (légende des catégories) — SVG statique généré par lib/plants */
function PlantBadge({ category, color, className = 'h-6 w-5' }: { category: string; color: string; className?: string }) {
  return <span aria-hidden="true" className={`inline-block shrink-0 [&>svg]:h-full [&>svg]:w-full ${className}`} dangerouslySetInnerHTML={{ __html: plantSvg(category, color) }} />;
}
import type { DemoMapHandle } from './leafletMap';
import { SectionHeading } from './ui';

type Status = 'idle' | 'loading' | 'ready' | 'error';

export default function DemoMap() {
  const [status, setStatus] = useState<Status>('idle');
  const [filter, setFilter] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<DemoMapHandle | null>(null);
  const reduceMotion = useReducedMotion() ?? false;
  // La carte (et Leaflet) ne se chargent que lorsque la section approche de l'écran
  const nearViewport = useInView(sectionRef, { once: true, margin: '400px 0px' });

  const labels = useMemo(() => Object.fromEntries(categories.items.map((c) => [c.id, c.label])), []);
  const colors = useMemo(
    () => Object.fromEntries(Object.entries(categoryColors).map(([k, v]) => [k, v.hex])),
    [],
  );

  useEffect(() => {
    if (!nearViewport || handleRef.current || !containerRef.current) return;
    let cancelled = false;
    setStatus('loading');
    import('./leafletMap')
      .then(({ createDemoMap }) => {
        if (cancelled || !containerRef.current) return;
        handleRef.current = createDemoMap(containerRef.current, {
          ...mapView,
          offers: demoOffers,
          colors,
          labels,
          badge: demoMap.markerBadge,
          linkLabel: demoMap.googleLink,
          reduceMotion,
        });
        setStatus('ready');
      })
      .catch(() => !cancelled && setStatus('error'));
    return () => {
      cancelled = true;
    };
  }, [nearViewport, attempt, colors, labels, reduceMotion]);

  useEffect(() => () => handleRef.current?.destroy(), []);
  useEffect(() => handleRef.current?.setFilter(filter), [filter, status]);

  const usedCategories = categories.items.filter((c) => demoOffers.some((o) => o.category === c.id));
  const visibleOffers = demoOffers.filter((o) => !filter || o.category === filter);

  return (
    <section
      ref={sectionRef}
      id={demoMap.id}
      aria-labelledby="map-title"
      className="bg-gradient-to-b from-white to-mint-50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="map-title" eyebrow={demoMap.eyebrow} title={demoMap.title} intro={demoMap.intro} />

        <p
          role="note"
          className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-accent-300 bg-accent-50 p-4 text-sm text-accent-700 sm:items-center"
        >
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 sm:mt-0" />
          <span className="font-semibold">{demoMap.disclaimer}</span>
        </p>

        <fieldset className="mt-8">
          <legend className="sr-only">{demoMap.filterLabel}</legend>
          <div className="flex flex-wrap justify-center gap-2">
            {[{ id: null as string | null, label: demoMap.allLabel }, ...usedCategories.map((c) => ({ id: c.id as string | null, label: c.label }))].map(
              (c) => {
                const active = filter === c.id;
                return (
                  <button
                    key={c.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(c.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-200 active:scale-95 ${
                      active
                        ? 'border-brand-700 bg-brand-700 text-white shadow-md'
                        : 'border-brand-200 bg-white text-brand-800 hover:border-brand-500 hover:bg-brand-50'
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {c.id && <PlantBadge category={c.id} color={colors[c.id]} className="-my-1 h-5 w-4" />}
                      {c.label}
                    </span>
                  </button>
                );
              },
            )}
          </div>
        </fieldset>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_20rem]">
          {/* Carte */}
          <div className="relative h-[26rem] min-w-0 overflow-hidden rounded-3xl border-4 border-brand-200 bg-brand-50 shadow-xl shadow-brand-900/10 sm:h-[32rem] lg:h-auto lg:min-h-[32rem]">
            <span className="pointer-events-none absolute bottom-3 left-3 z-[450] rounded-full bg-accent-600 px-3 py-1 text-xs font-bold tracking-wide text-white uppercase shadow">
              Démonstration · offres fictives
            </span>
            <div ref={containerRef} role="region" aria-label={demoMap.mapLabel} className="absolute inset-0" />

            {status !== 'ready' && (
              <div className="absolute inset-0 z-[400] grid place-items-center bg-brand-50/90 p-6 text-center">
                {status === 'error' ? (
                  <div>
                    <p role="alert" className="text-sm font-semibold text-accent-700">
                      {demoMap.loadError}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setStatus('idle');
                        setAttempt((n) => n + 1);
                      }}
                      className="mt-3 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
                    >
                      Réessayer
                    </button>
                  </div>
                ) : (
                  <p className="flex items-center gap-2 text-sm font-medium text-brand-800">
                    <Loader2 aria-hidden="true" className="size-5 animate-spin" />
                    {demoMap.loading}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Liste des offres : alternative accessible ; un clic centre la carte sur l'offre */}
          <div className="flex min-w-0 flex-col rounded-3xl border border-brand-100 bg-white">
            <h3 className="border-b border-brand-100 px-4 py-3 text-sm font-semibold text-brand-900">
              {demoMap.listTitle} ({visibleOffers.length})
            </h3>
            <ul className="max-h-[22rem] divide-y divide-brand-50 overflow-y-auto lg:max-h-[29rem]">
              {visibleOffers.map((o) => (
                <li key={o.id} className="px-4 py-3">
                  <div className="flex items-start gap-2">
                    <PlantBadge category={o.category} color={colors[o.category]} className="h-7 w-[1.35rem]" />
                    <div className="min-w-0 text-sm">
                      <button
                        type="button"
                        onClick={() => handleRef.current?.focus(o.id)}
                        disabled={status !== 'ready'}
                        className="text-left font-semibold text-brand-900 underline-offset-2 hover:underline disabled:no-underline"
                      >
                        {o.title}
                        <span className="sr-only"> : afficher sur la carte</span>
                      </button>
                      <p className="text-muted">
                        {o.town} · <span className="font-medium text-mint-700">{o.offer}</span>
                      </p>
                      <a
                        href={googleMapsLink(o)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-900 hover:underline"
                      >
                        {demoMap.googleLink}
                        <ExternalLink aria-hidden="true" className="size-3" />
                        <span className="sr-only"> (nouvel onglet)</span>
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-auto border-t border-brand-100 px-4 py-3 text-xs text-muted">{demoMap.linkNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
