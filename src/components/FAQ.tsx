import { AnimatePresence, m } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { faq } from '../content';
import { Reveal, SectionHeading } from './ui';

type FAQProps = { id?: string; eyebrow?: string; title?: string; items?: { q: string; a: string }[] };

export default function FAQ({ id = faq.id, eyebrow = faq.eyebrow, title = faq.title, items = faq.items }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} />
        <Reveal className="mt-10">
          <ul className="divide-y divide-brand-100 rounded-3xl border border-brand-100 bg-white">
            {items.map((item, i) => {
              const isOpen = open === i;
              const btnId = `${id}-btn-${i}`;
              const panelId = `${id}-panel-${i}`;
              return (
                <li key={item.q}>
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 rounded-3xl px-5 py-5 text-left text-lg font-semibold text-brand-900 transition-colors hover:text-brand-600 sm:px-6"
                    >
                      {item.q}
                      <ChevronDown
                        aria-hidden="true"
                        className={`size-5 shrink-0 text-brand-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-muted sm:px-6">{item.a}</p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
