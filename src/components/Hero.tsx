import { m } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { hero, howItWorks } from '../content';
import HeroIllustration from './HeroIllustration';
import { CTAButton, Reassurance } from './ui';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-gradient-to-br from-brand-50 via-white to-mint-50"
    >
      {/* Formes d'arrière-plan animées (décoratives) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 size-80 rounded-full bg-brand-200/50 blur-3xl animate-blob" />
        <div
          className="absolute top-1/3 -right-20 size-96 rounded-full bg-mint-200/50 blur-3xl animate-blob"
          style={{ animationDelay: '-6s' }}
        />
        <div
          className="absolute -bottom-32 left-1/3 size-72 rounded-full bg-accent-100/60 blur-3xl animate-blob"
          style={{ animationDelay: '-12s' }}
        />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-10 pb-16 sm:px-6 md:pt-16 lg:grid-cols-[1.1fr_1fr] lg:pb-24">
        <div>
          <m.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-1.5 rounded-full border border-mint-200 bg-white/80 px-3 py-1 text-sm font-medium text-mint-700"
          >
            <MapPin aria-hidden="true" className="size-4" />
            {hero.eyebrow}
          </m.p>

          {/* Le titre n'est pas masqué au chargement : il s'affiche immédiatement (meilleur LCP). */}
          <h1
            id="hero-title"
            className="mt-5 text-4xl leading-[1.1] font-extrabold tracking-tight text-balance text-brand-900 sm:text-5xl lg:text-6xl"
          >
            {hero.titleStart}{' '}
            <span className="animate-gradient bg-gradient-to-r from-brand-600 via-mint-600 to-brand-600 bg-[length:200%_auto] bg-clip-text text-transparent">
              {hero.titleHighlight}
            </span>
          </h1>

          <m.p {...fadeUp(0.15)} className="mt-6 max-w-xl text-lg text-pretty text-muted sm:text-xl">
            {hero.subtitle}
          </m.p>

          <m.div {...fadeUp(0.3)} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CTAButton size="lg" />
            <a
              href={`#${howItWorks.id}`}
              className="inline-flex items-center justify-center rounded-full px-5 py-3 font-semibold text-brand-700 underline-offset-4 transition-colors hover:bg-brand-50 hover:underline"
            >
              {hero.secondaryCta}
            </a>
          </m.div>

          <m.div {...fadeUp(0.45)} className="mt-6">
            <Reassurance />
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          <HeroIllustration />
        </m.div>
      </div>
    </section>
  );
}
