import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';
import { nav, partnerPage, survey } from './content';
import Benefits from './components/Benefits';
import Categories from './components/Categories';
import DemoMap from './components/DemoMap';
import DevBanner from './components/DevBanner';
import DevNotice from './components/DevNotice';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import InterestForm from './components/InterestForm';
import KeyFigures from './components/KeyFigures';
import PartnerInvite from './components/PartnerInvite';
import LegalDialog, { LegalContext, type LegalKind } from './components/legal/LegalDialog';

// Pages secondaires téléchargées seulement si on les ouvre
const Survey = lazy(() => import('./components/Survey'));
const PartnerPage = lazy(() => import('./components/PartnerPage'));

type Route = 'accueil' | 'questionnaire' | 'partenaires';
/** Routage minimal par ancre : #questionnaire et #partenaires sont des pages, le reste l'accueil */
function routeFromHash(): Route {
  const h = window.location.hash.slice(1);
  if (h === survey.id) return 'questionnaire';
  if (h === partnerPage.id) return 'partenaires';
  return 'accueil';
}

export default function App() {
  const [legal, setLegal] = useState<LegalKind | null>(null);
  const [route, setRoute] = useState<Route>(routeFromHash);

  // Lien direct vers une section (ex. /#carte) : défiler une fois la page affichée
  useEffect(() => {
    const h = window.location.hash;
    if (routeFromHash() !== 'accueil' || h.length < 2) return;
    requestAnimationFrame(() => {
      try {
        document.querySelector(h)?.scrollIntoView();
      } catch {
        /* ancre invalide : on reste en haut */
      }
    });
  }, []);

  useEffect(() => {
    const onHash = () => {
      const next = routeFromHash();
      setRoute((prev) => {
        if (prev !== next) {
          // Après le changement de vue : haut de page, ou section visée par l'ancre
          requestAnimationFrame(() => {
            const target = next === 'accueil' && window.location.hash ? document.querySelector(window.location.hash) : null;
            if (target) target.scrollIntoView();
            else window.scrollTo(0, 0);
          });
        }
        return next;
      });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    // reducedMotion="user" : Framer Motion coupe les déplacements si l'utilisateur·rice le demande
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <LegalContext.Provider value={setLegal}>
          <a
            href="#contenu"
            onClick={(e) => {
              // Ne change pas l'ancre (sinon on quitterait la page en cours)
              e.preventDefault();
              document.getElementById('contenu')?.focus();
            }}
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-brand-800 focus:shadow-lg"
          >
            {nav.skipLink}
          </a>
          <DevBanner />
          <Header subpage={route !== 'accueil'} />
          <main id="contenu" tabIndex={-1} className="outline-none">
            {route !== 'accueil' ? (
              <Suspense fallback={<div className="min-h-[80vh]" />}>
                {route === 'questionnaire' ? <Survey /> : <PartnerPage />}
              </Suspense>
            ) : (
              <>
                <Hero />
                <Benefits />
                <HowItWorks />
                <Categories />
                <DemoMap />
                <DevNotice />
                <KeyFigures />
                <InterestForm />
                <PartnerInvite />
                <FAQ />
              </>
            )}
          </main>
          <Footer compact={route !== 'accueil'} />
          <LegalDialog kind={legal} onClose={() => setLegal(null)} />
        </LegalContext.Provider>
      </LazyMotion>
    </MotionConfig>
  );
}
