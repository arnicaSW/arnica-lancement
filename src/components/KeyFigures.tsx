import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { keyFigures } from '../content';
import { Reveal } from './ui';

function Counter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce || value === 0) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function KeyFigures() {
  return (
    <section aria-labelledby="figures-title" className="bg-gradient-to-br from-brand-700 via-brand-800 to-mint-700 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="figures-title" className="sr-only">
          {keyFigures.title}
        </h2>
        <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {keyFigures.items.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.1} className="flex flex-col">
              <dt className="order-2 mt-2 text-sm text-brand-100 sm:text-base">{f.label}</dt>
              <dd className="order-1 text-4xl font-extrabold text-white sm:text-5xl">
                {/* Valeur réelle pour les lecteurs d'écran, compteur animé pour l'affichage */}
                <span className="sr-only">
                  {f.prefix}
                  {f.value}
                  {f.suffix}
                </span>
                <span aria-hidden="true">
                  <Counter value={f.value} prefix={f.prefix} suffix={f.suffix} />
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
