import { Construction } from 'lucide-react';
import { devNotice, site } from '../content';
import { CTAButton, Reassurance, Reveal } from './ui';

export default function DevNotice() {
  return (
    <section id={devNotice.id} aria-labelledby="devnotice-title" className="bg-white px-4 py-20 sm:px-6 sm:py-24">
      <Reveal className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-brand-800 px-6 py-12 text-center shadow-2xl shadow-brand-900/20 sm:px-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 -right-16 size-64 rounded-full bg-mint-500/25 blur-3xl animate-blob" />
          <div className="absolute -bottom-20 -left-10 size-64 rounded-full bg-brand-500/40 blur-3xl animate-blob" style={{ animationDelay: '-8s' }} />
        </div>
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-100 px-3 py-1 text-sm font-semibold text-accent-700">
            <Construction aria-hidden="true" className="size-4" />
            {devNotice.eyebrow}
          </span>
          <h2 id="devnotice-title" className="mt-5 text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
            {devNotice.title}
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-3 text-lg text-brand-50">
            {devNotice.text.map((p, i) => (
              <p key={i} className={i === devNotice.text.length - 1 ? 'font-semibold text-white' : undefined}>
                {p}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center gap-5">
            <CTAButton size="lg" />
            <Reassurance tone="dark" />
          </div>
          <p className="mx-auto mt-8 max-w-xl text-xs text-brand-200 italic">{site.provisionalNotice}</p>
        </div>
      </Reveal>
    </section>
  );
}
