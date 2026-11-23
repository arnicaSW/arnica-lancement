import { categories } from '../content';
import { icons } from '../lib/icons';
import { Reveal, SectionHeading } from './ui';

export const categoryColors: Record<string, { bg: string; text: string; hex: string }> = {
  restauration: { bg: 'bg-accent-50', text: 'text-accent-700', hex: 'var(--color-accent-600)' },
  sport: { bg: 'bg-brand-100', text: 'text-brand-700', hex: 'var(--color-brand-700)' },
  loisirs: { bg: 'bg-violet-100', text: 'text-violet-800', hex: '#6D28D9' },
  commerces: { bg: 'bg-amber-100', text: 'text-amber-800', hex: '#B45309' },
  'bien-etre': { bg: 'bg-mint-100', text: 'text-mint-700', hex: 'var(--color-mint-700)' },
  services: { bg: 'bg-slate-100', text: 'text-slate-700', hex: '#475569' },
};

export default function Categories() {
  return (
    <section id={categories.id} aria-labelledby="categories-title" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="categories-title"
          eyebrow={categories.eyebrow}
          title={categories.title}
          intro={categories.intro}
        />
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.items.map((cat, i) => {
            const Icon = icons[cat.icon];
            const c = categoryColors[cat.id];
            return (
              <Reveal as="li" key={cat.id} delay={i * 0.06}>
                <article className="group flex h-full items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-brand-900/5">
                  <span
                    className={`grid size-12 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${c.bg} ${c.text}`}
                  >
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <div>
                    <h3 className="font-bold text-brand-900">{cat.label}</h3>
                    <p className="mt-1 text-sm text-muted">{cat.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
