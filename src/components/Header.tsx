import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { nav, survey } from '../content';
import { CTAButton, Logo } from './ui';

export default function Header({ subpage = false }: { subpage?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-md shadow-brand-900/5 backdrop-blur-md' : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="rounded-lg" aria-label="arnica, retour en haut de page">
          <Logo />
        </a>
        {subpage ? (
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            {survey.backToSite}
          </a>
        ) : (
        <>
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-brand-800 transition-colors hover:bg-brand-50 hover:text-brand-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <CTAButton size="sm" label={nav.cta} />
        </>
        )}
      </div>
    </header>
  );
}
