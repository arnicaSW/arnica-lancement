import { m, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cta } from '../content';

/* ── Apparition au défilement ───────────────────────────────── */
const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li' | 'article';
}) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

/* ── En-tête de section ─────────────────────────────────────── */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = 'center',
  tone = 'light',
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
}) {
  const dark = tone === 'dark';
  return (
    <Reveal className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p
        className={`text-sm font-semibold tracking-wide uppercase ${dark ? 'text-mint-200' : 'text-mint-700'}`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl ${dark ? 'text-white' : 'text-brand-900'}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-lg text-pretty ${dark ? 'text-brand-100' : 'text-muted'}`}>{intro}</p>
      )}
    </Reveal>
  );
}

/* ── Bouton « Je suis intéressé·e » ─────────────────────────── */
export function CTAButton({
  size = 'md',
  label = cta.label,
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-7 py-4 text-lg',
  };
  return (
    <a
      href="#inscription"
      onClick={focusFormSoon}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-accent-600 font-semibold text-white shadow-lg shadow-accent-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-accent-700 hover:shadow-xl hover:shadow-accent-600/30 active:translate-y-0 active:scale-[0.98] ${sizes[size]} ${className}`}
    >
      {label}
      <ArrowRight
        aria-hidden="true"
        className="size-[1.1em] transition-transform duration-200 group-hover:translate-x-1"
      />
    </a>
  );
}

/** Après le défilement vers le formulaire, place le focus sur le premier champ (clavier, lecteurs d'écran). */
function focusFormSoon() {
  window.setTimeout(() => {
    document.getElementById('field-firstName')?.focus({ preventScroll: true });
  }, 600);
}

/* ── Pastilles de réassurance ───────────────────────────────── */
export function Reassurance({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
      {cta.reassurance.map((item) => (
        <li
          key={item}
          className={`flex items-center gap-1.5 ${tone === 'dark' ? 'text-brand-50' : 'text-brand-800'}`}
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 text-mint-500" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0z"
              clipRule="evenodd"
            />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ── Logo arnica ────────────────────────────────────────────── */
/** Fleur d'arnica : 6 pétales orange, cœur vert (couleurs de la charte). */
export function ArnicaFlower({ className = '', title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="-32 -32 64 64" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <g fill="var(--color-accent-600)">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse key={a} cx="0" cy="-15" rx="8" ry="14" transform={`rotate(${a})`} />
        ))}
      </g>
      <circle r="8.5" fill="var(--color-mint-600)" />
    </svg>
  );
}

/**
 * Logo : fleur seule + « arnica » sur fond clair ;
 * pastille blanche + « arnica » blanc sur fond foncé (comme sur la charte).
 */
export function Logo({ tone = 'light', size = 'md' }: { tone?: 'light' | 'dark'; size?: 'md' | 'lg' }) {
  const dark = tone === 'dark';
  const big = size === 'lg';
  return (
    <span className="flex items-center gap-2">
      {dark ? (
        <span className={`grid shrink-0 place-items-center rounded-full bg-white ${big ? 'size-12' : 'size-10'}`}>
          <ArnicaFlower className={big ? 'size-10' : 'size-8'} />
        </span>
      ) : (
        <ArnicaFlower className={`shrink-0 ${big ? 'size-11' : 'size-9'}`} />
      )}
      <span
        className={`font-bold leading-none tracking-tight ${big ? 'text-4xl' : 'text-[1.7rem]'} ${dark ? 'text-white' : 'text-brand-700'}`}
      >
        arnica
      </span>
    </span>
  );
}
