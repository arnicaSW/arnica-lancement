import { m } from 'framer-motion';
import { howItWorks } from '../content';
import { icons } from '../lib/icons';
import { Reveal, SectionHeading } from './ui';

export default function HowItWorks() {
  return (
    <section
      id={howItWorks.id}
      aria-labelledby="how-title"
      className="bg-gradient-to-b from-brand-50 to-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="how-title" eyebrow={howItWorks.eyebrow} title={howItWorks.title} intro={howItWorks.intro} />

        <div className="relative mt-14">
          {/* Ligne qui relie les étapes (bureau) */}
          <m.div
            aria-hidden="true"
            className="absolute top-10 right-[16%] left-[16%] hidden h-1 origin-left rounded-full bg-gradient-to-r from-brand-300 via-mint-400 to-accent-400 md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
            {howItWorks.steps.map((step, i) => {
              const Icon = icons[step.icon];
              return (
                <Reveal as="li" key={step.title} delay={0.2 + i * 0.25} className="text-center">
                  <div className="relative mx-auto grid size-20 place-items-center rounded-full bg-white shadow-lg ring-4 ring-brand-50">
                    <Icon aria-hidden="true" className="size-8 text-brand-600" />
                    <span className="absolute -top-1 -right-1 grid size-8 place-items-center rounded-full bg-accent-600 text-sm font-bold text-white shadow">
                      <span className="sr-only">Étape </span>
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-brand-900">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-muted">{step.text}</p>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
