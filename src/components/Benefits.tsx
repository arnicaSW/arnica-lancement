import { benefits } from '../content';
import { icons } from '../lib/icons';
import { Reveal, SectionHeading } from './ui';

const tones = [
  'bg-accent-50 text-accent-700',
  'bg-mint-100 text-mint-700',
  'bg-brand-100 text-brand-700',
  'bg-mint-100 text-mint-700',
];

export default function Benefits() {
  return (
    <section id={benefits.id} aria-labelledby="benefits-title" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="benefits-title" eyebrow={benefits.eyebrow} title={benefits.title} intro={benefits.intro} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.items.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal as="li" key={item.title} delay={i * 0.08}>
                <article className="group h-full rounded-3xl border border-brand-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5">
                  <span
                    className={`grid size-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${tones[i % tones.length]}`}
                  >
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-brand-900">{item.title}</h3>
                  <p className="mt-2 text-muted">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
