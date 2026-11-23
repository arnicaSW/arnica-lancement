import { Mail } from 'lucide-react';
import { useContext } from 'react';
import { footer, partnerPage, site } from '../content';
import { LegalContext } from './legal/LegalDialog';
import { CTAButton, Logo, Reassurance, Reveal } from './ui';

/** L'adresse n'est cliquable qu'une fois renseignée dans content.ts */
const hasEmail = /^[^\s@[\]]+@[^\s@[\]]+\.[^\s@[\]]+$/.test(site.contactEmail);

export default function Footer({ compact = false }: { compact?: boolean }) {
  const openLegal = useContext(LegalContext);
  const linkClass =
    'rounded text-left text-brand-100 underline-offset-4 transition-colors hover:text-white hover:underline';

  return (
    <footer className="bg-brand-900 text-brand-100">
      {/* Dernier appel à l'action */}
      {!compact && (
      <div className="border-b border-white/10">
        <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
          <p className="max-w-2xl text-2xl font-bold text-balance text-white sm:text-3xl">{footer.ctaTitle}</p>
          <p className="text-lg text-brand-100">{footer.ctaText}</p>
          <CTAButton size="lg" />
          <Reassurance tone="dark" />
        </Reveal>
      </div>
      )}

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr]">
        <div>
          <Logo tone="dark" />
          <p className="mt-4 max-w-md text-sm">{footer.about}</p>
          <p className="mt-3 max-w-md text-xs text-brand-200 italic">{site.provisionalNotice}</p>
        </div>
        <nav aria-label="Informations légales">
          <ul className="space-y-3 text-sm">
            <li>
              <a className={linkClass} href={`#${partnerPage.id}`}>
                {footer.legalLinks.partners}
              </a>
            </li>
            <li>
              <button type="button" className={linkClass} onClick={() => openLegal('mentions')}>
                {footer.legalLinks.mentions}
              </button>
            </li>
            <li>
              <button type="button" className={linkClass} onClick={() => openLegal('privacy')}>
                {footer.legalLinks.privacy}
              </button>
            </li>
            <li className="flex items-center gap-2">
              <Mail aria-hidden="true" className="size-4" />
              {hasEmail ? (
                <a className={linkClass} href={`mailto:${site.contactEmail}`}>
                  {footer.legalLinks.contact} : {site.contactEmail}
                </a>
              ) : (
                <span>
                  {footer.legalLinks.contact} : {site.contactEmail}
                </span>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-brand-200 sm:px-6">
          {footer.copyright} · {footer.credits}
        </p>
      </div>
    </footer>
  );
}
